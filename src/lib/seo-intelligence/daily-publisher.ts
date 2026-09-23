import { BlogRepository } from "../blog/repository";
import { QualityGateEngine } from "./quality-gate";
import { DistributionManager } from "../distribution/manager";
import { DailyPublishLog } from "./types";
import { TelegramNotifier } from "../notifications/telegram";
import fs from "fs";
import path from "path";

// In-memory set of daily publication keys to guarantee idempotency across warm requests
const globalPubState = global as unknown as {
  __webvibez_daily_keys__?: Set<string>;
  __webvibez_publish_logs__?: DailyPublishLog[];
};

function getLogsFilePath(): string {
  return path.join(process.cwd(), "src", "lib", "blog", ".publish_logs.json");
}

function getDailyKeys(): Set<string> {
  if (!globalPubState.__webvibez_daily_keys__) {
    globalPubState.__webvibez_daily_keys__ = new Set<string>();
    try {
      const filePath = getLogsFilePath();
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed: DailyPublishLog[] = JSON.parse(raw);
        for (const log of parsed) {
          if (log.status === "SUCCESS") {
            globalPubState.__webvibez_daily_keys__.add(log.idempotencyKey);
          }
        }
      }
    } catch (e) {
      // In-memory fallback
    }
  }
  return globalPubState.__webvibez_daily_keys__;
}

function getPublishLogs(): DailyPublishLog[] {
  if (!globalPubState.__webvibez_publish_logs__) {
    globalPubState.__webvibez_publish_logs__ = [];
    try {
      const filePath = getLogsFilePath();
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        globalPubState.__webvibez_publish_logs__ = JSON.parse(raw);
      }
    } catch (e) {
      // In-memory fallback
    }
  }
  return globalPubState.__webvibez_publish_logs__ || [];
}

function saveLog(log: DailyPublishLog): void {
  const logs = getPublishLogs();
  logs.unshift(log);
  if (logs.length > 100) logs.pop();

  if (log.status === "SUCCESS") {
    getDailyKeys().add(log.idempotencyKey);
  }

  try {
    const filePath = getLogsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), "utf-8");
  } catch (e) {
    // In-memory preserve
  }
}

export function getCurrentDateIST(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date()); // Returns YYYY-MM-DD
}

// Curated pool of high-authority bilingual topic templates for perpetual queue replenishment
const BILINGUAL_TOPIC_POOL = [
  {
    groupKey: "coaching-fee-automation",
    category: "Education Technology" as const,
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "automating-coaching-institute-fee-collections-whatsapp-upi",
      title: "Automating Coaching Institute Fee Collections: WhatsApp Invoicing, UPI & Smart Follow-ups",
      description: "A complete blueprint for coaching classes and tuition institutes to automate fee collection reminders, generate instant UPI dynamic QR codes, and sync reconciliations via WhatsApp.",
      excerpt: "Manual fee collection in coaching classes costs up to 15 hours weekly. Learn how automated WhatsApp invoicing with instant UPI QR codes eliminates overdue payments.",
      aeoDirectAnswer: "Automating coaching class fee collection involves integrating student databases with automated WhatsApp bots and payment gateways (Razorpay/Cashfree/UPI Intent) to send personalized invoice links and auto-reconcile paid fees.",
      readingTime: "7 min read",
      tags: ["coaching software", "fee collection", "whatsapp automation", "upi billing", "edtech"],
      content: `## The High Cost of Manual Fee Collections in Coaching Institutes

Managing student fee collection manually through paper receipts, registers, or generic spreadsheets creates administrative bottlenecks for growing coaching institutes. Institute administrators lose between 10 to 18 hours every week manually chasing fee dues, verifying bank screenshots, and reconciling student ledger balances.

### Key Pain Points of Traditional Fee Management

1. **Delayed Realization & Cashflow Gaps**: Over 30% of tuition installments are delayed by more than 14 days without automated reminder systems.
2. **Reconciliation Friction**: Bank transfers without standardized transaction IDs require manual ledger matching.
3. **Parent Friction**: Lack of instant digital payment links or dynamic UPI QR codes increases abandonment rates.

---

## Architecture of an Automated Fee Collection Engine

A modern tuition management software solves this with a three-layer automated pipeline:

\`\`\`
[ Student Database / Batch Scheduler ]
               │
               ▼
[ Scheduled Rule Engine (Due Date -3d, Due Date, +3d Overdue) ]
               │
               ▼
[ Dynamic UPI Payment Link / WhatsApp Cloud API Broadcast ]
               │
               ▼
[ Webhook Payment Event (Razorpay / Cashfree / Setu) ]
               │
               ▼
[ Instant GST Receipt PDF Sent to Parent via WhatsApp ]
\`\`\`

### 1. Dynamic UPI QR Code Generation
Rather than sharing static VPA addresses, the system generates unique virtual payment addresses (VPA) or instant payment links with pre-filled amounts and student ID parameters.

### 2. WhatsApp Cloud API Integration
Automated transactional messages deliver polite, branded payment reminders directly into the parent's WhatsApp chat with a single-tap **"Pay Fee Online"** button.

### 3. Instant Automated Receipts
Upon successful webhook confirmation from the banking gateway, the system automatically marks the installment as PAID and delivers a customized, digital receipt PDF to the parent within 3 seconds.

---

## Business Impact & ROI

| Metric | Manual Collection | WebVibez Automated Pipeline |
|---|---|---|
| Average Fee Collection Cycle | 28 Days | 4.2 Days |
| Administrative Hours Saved | 0 hrs | 14 hrs / week |
| Reconciliation Error Rate | 6.8% | 0.0% (Zero Error) |
| Parent Satisfaction Score | 62% | 96% |

To discover how WebVibez builds tailor-made coaching management platforms with custom parent portals and automated fee engines, explore our [Mobile App Development](/services/mobile-app-development) and [Custom Software](/services/custom-software-development) services.`,
    },
    hi: {
      slug: "coaching-class-fees-collection-automation-hindi",
      title: "कोचिंग क्लास फीस कलेक्शन ऑटोमेशन: WhatsApp इनवॉइस, UPI और ऑटो-रिमाइंडर्स गाइड",
      description: "कोचिंग संस्थानों और ट्यूशन क्लासेस के लिए फीस वसूली को ऑटोमेट करने की पूरी गाइड। जानें कैसे WhatsApp और UPI से फीस कलेक्शन समय पर पूरा करें।",
      excerpt: "मैन्युअल फीस कलेक्शन में कोचिंग संचालकों का हर हफ्ते 15 घंटे बर्बाद होता है। WhatsApp ऑटोमेशन और डायनामिक UPI पेमेंट से फीस वसूली को 100% ऑटोमेट करें।",
      aeoDirectAnswer: "कोचिंग क्लास फीस ऑटोमेशन एक ऐसा डिजिटल सिस्टम है जो छात्रों के फीस ड्यू डेट पर माता-पिता को WhatsApp पर ऑटोमैटिक पेमेंट लिंक और UPI QR कोड भेजता है तथा भुगतान होते ही तुरंत डिजिटल रसीद जारी करता है।",
      readingTime: "8 min read",
      tags: ["coaching software hindi", "fee automation", "whatsapp billing", "upi payment", "edtech india"],
      content: `## कोचिंग संस्थानों में मैन्युअल फीस कलेक्शन की समस्याएं

भारत में अधिकांश कोचिंग संस्थान और ट्यूशन क्लासेज आज भी छात्रों की फीस वसूली के लिए रजिस्टर्स, मैन्युअल कॉलिंग और कागजी रसीदों पर निर्भर हैं। इस प्रक्रिया में कोचिंग संचालकों और स्टाफ का हर हफ्ते 10 से 15 घंटे का कीमती समय केवल फीस का हिसाब रखने और फॉलो-अप करने में व्यर्थ होता है।

### मैन्युअल फीस वसूली के मुख्य नुकसान

1. **फीस में देरी और कैशफ्लो की समस्या**: समय पर याद न दिलाने से 30% से अधिक फीस 15 से 30 दिन देरी से आती है।
2. **हिसाब-किताब में गलतियां**: बैंक ट्रांसफर और UPI स्क्रीनशॉट को मैन्युअल चेक करने में गलतियों की संभावना बनी रहती है।
3. **अभिभावकों के लिए असुविधा**: डिजिटल पेमेंट लिंक न मिलने से अभिभावकों को बार-बार ब्रांच आना पड़ता है।

---

## ऑटोमेटेड फीस कलेक्शन सिस्टम का आर्किटेक्चर

WebVibez का कोचिंग मैनेजमेंट सॉफ्टवेयर इस पूरी प्रक्रिया को पूरी तरह स्वचालित (Automate) कर देता है:

\`\`\`
[ छात्र डेटाबेस / बैच मैनेजमेंट ]
               │
               ▼
[ स्मार्ट रिमाइंडर्स इंजन (Due Date से 3 दिन पहले, Due Date पर, और बाद में) ]
               │
               ▼
[ WhatsApp Cloud API + डायनामिक UPI पेमेंट लिंक ]
               │
               ▼
[ इंस्टेंट पेमेंट गेटवे वेरिफिकेशन (Razorpay / Cashfree) ]
               │
               ▼
[ डिजिटल GST रसीद PDF तुरंत WhatsApp पर डिलीवर ]
\`\`\`

### 1. डायनामिक UPI और पेमेंट गेटवे इंटीग्रेशन
प्रत्येक छात्र के नाम और बकाया राशि के अनुसार अलग UPI लिंक जनरेट होता है, जिससे किसी भी UPI ऐप (GPay, PhonePe, Paytm) से 10 सेकंड में भुगतान हो जाता है।

### 2. WhatsApp ऑटोमैटिक अलर्ट्स
जैसे ही फीस की तारीख पास आती है, सिस्टम अभिभावक के WhatsApp पर सम्मानजनक भाषा में रिमाइंडर और डायरेक्ट पेमेंट बटन भेजता है।

### 3. तुरंत डिजिटल रसीद
भुगतान सफल होते ही सिस्टम में एंट्री अपने आप हो जाती है और अभिभावक के मोबाइल पर तुरंत अधिकृत डिजिटल रसीद PDF फॉर्मेट में पहुँच जाती है।

---

## कोचिंग संस्थानों के लिए लाभ (ROI)

| पहलू | मैन्युअल सिस्टम | WebVibez ऑटोमेशन सिस्टम |
|---|---|---|
| औसत फीस वसूली समय | 25 से 30 दिन | 3 से 5 दिन |
| स्टाफ का बचाया गया समय | 0 घंटे | 15+ घंटे प्रति सप्ताह |
| हिसाब में गड़बड़ी | 5-8% | 0% (शून्य गलती) |
| अभिभावक संतुष्टि | सामान्य | अत्यंत उच्च (98%) |

यदि आप अपनी कोचिंग या शिक्षण संस्थान के लिए पूर्णतः कस्टमाइज्ड मोबाइल ऐप या सॉफ्टवेयर विकसित करवाना चाहते हैं, तो हमारी [Mobile App Development](/services/mobile-app-development) और [Custom Software Development](/services/custom-software-development) सेवाओं की जानकारी देखें।`,
    },
  },
  {
    groupKey: "react-native-vs-native",
    category: "Mobile App Development" as const,
    featuredImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "react-native-vs-native-ios-android-architecture-comparison-2026",
      title: "React Native vs Native iOS & Android: Performance, Cost & Architecture Comparison",
      description: "An architectural deep-dive into React Native vs Native Swift/Kotlin development in 2026. Discover benchmark speeds, engineering costs, and framework tradeoffs.",
      excerpt: "Choosing between React Native and pure Native development impacts development budget by up to 45%. Here is the comprehensive engineering comparison for 2026.",
      aeoDirectAnswer: "React Native enables a single TypeScript codebase to compile into native iOS and Android UI primitives, reducing cross-platform engineering cost by 35-45% with near-native 60/120 FPS performance via the New Architecture (Fabric & TurboModules).",
      readingTime: "8 min read",
      tags: ["react native", "mobile app development", "cross platform", "android", "ios"],
      content: `## The Cross-Platform Mobile Decision in 2026

When engineering a modern mobile application for businesses, startups, and enterprises, the foundational architectural decision is choosing between **Cross-Platform React Native** and **Dual-Platform Native (Swift for iOS + Kotlin for Android)**.

With React Native's New Architecture (Fabric renderer and TurboModules leveraging the C++ JSI layer), the historical performance divide has essentially disappeared for 95% of commercial business applications.

---

## Architectural Comparison: React Native vs Native

| Architectural Dimension | React Native (Fabric Architecture) | Native (Swift / Kotlin) |
|---|---|---|
| **Codebase** | Single unified TypeScript / JS codebase | Two independent repositories |
| **Development Cost** | ₹1.8L – ₹6L (Save 35%–45%) | ₹3.5L – ₹12L+ (Dual Team Overhead) |
| **Time to Market** | 6 – 10 Weeks | 14 – 20 Weeks |
| **UI Rendering** | 100% Native OS Widgets via JSI | Direct UIKit / Jetpack Compose |
| **Hardware & Bluetooth Access** | Direct via TurboModules | First-Party OS APIs |
| **Maintenance & Bug Fixes** | Single pull request updates both platforms | Separate iOS and Android debugging |

---

## When to Choose React Native

1. **Business Apps, EdTech & SaaS**: When you need high speed to market, synchronized feature releases on Google Play and Apple App Store, and cost-efficient maintenance.
2. **Real-time Dashboards & Invoicing**: Apps requiring live data syncing, charts, push notifications, and payment processing.
3. **E-Commerce & Service Portals**: Fast rendering with fluid micro-interactions and camera/QR integrations.

## When to Choose Pure Native

1. **High-End 3D Gaming**: Intensive OpenGL/Vulkan rendering engines.
2. **Deep Audio DSP / Low-Latency Bluetooth Firmware**: Specialized low-level hardware communication.

---

## WebVibez Mobile Engineering Approach

At WebVibez, we engineer production React Native applications with strict type safety, offline-first caching, biometric authentication, and instant push notification engines. Explore our full capabilities in [Mobile App Development](/services/mobile-app-development).`,
    },
    hi: {
      slug: "react-native-vs-native-mobile-app-comparison-hindi",
      title: "React Native बनाम Native Android & iOS: 2026 में कौन सा मोबाइल ऐप फ्रेमवर्क चुनें?",
      description: "मोबाइल ऐप बनवाने से पहले जानें React Native और Native (Swift/Kotlin) में क्या अंतर है। लागत, स्पीड, और परफॉरमेंस की पूरी तकनीकी तुलना।",
      excerpt: "React Native ऐप बनवाने से डेवलपमेंट लागत 40% तक कम हो सकती है और ऐप Android व iPhone दोनों पर एक साथ चलता है। जानें 2026 की विस्तृत तुलना।",
      aeoDirectAnswer: "React Native एक क्रॉस-प्लेटफॉर्म फ्रेमवर्क है जिसमें एक ही कोडबेस से Android और iOS दोनों के लिए नेटिव परफॉरमेंस वाला मोबाइल ऐप तैयार हो जाता है, जिससे लागत और समय में 40% तक की बचत होती है।",
      readingTime: "7 min read",
      tags: ["react native hindi", "mobile app development india", "android app cost", "cross platform hindi"],
      content: `## 2026 में मोबाइल ऐप डेवलपमेंट का सही निर्णय

आज किसी भी व्यवसाय, कोचिंग क्लास या स्टार्टअप के लिए मोबाइल ऐप बनवाना एक अनिवार्य आवश्यकता बन चुका है। लेकिन ऐप डेवलपमेंट शुरू करने से पहले सबसे बड़ा सवाल यह होता है: **React Native क्रॉस-प्लेटफॉर्म ऐप बनवाएं या अलग-अलग Native (Android + iOS) ऐप?**

React Native के नए आर्किटेक्चर (Fabric और TurboModules) के बाद अब React Native ऐप्स भी 100% Native जैसी सुपर-फास्ट स्पीड और स्मूथ एनिमेशन प्रदान करते हैं।

---

## React Native और Native की तुलना तालिका

| विशेषता | React Native ऐप | Native (Android + iOS अलग) |
|---|---|---|
| **कोडबेस** | एक ही कोड (Single TypeScript Code) | 2 अलग-अलग कोडबेस |
| **डेवलपमेंट लागत** | ₹1.5 लाख से ₹5 लाख (40% तक बचत) | ₹3.5 लाख से ₹10 लाख+ (दोगुनी टीम) |
| **तैयार होने का समय** | 6 से 8 सप्ताह | 14 से 18 सप्ताह |
| **Android और iOS सपोर्ट** | दोनों पर एक साथ लाइव | अलग-अलग समय पर लाइव |
| **अपडेट और मेंटेनेंस** | एक बार अपडेट करने पर दोनों पर लाइव | दोनों प्लेटफॉर्म्स पर अलग काम |
| **परफॉरमेंस** | 60-120 FPS सुपर स्मूथ | 60-120 FPS |

---

## आपके बिजनेस के लिए क्या बेहतर है?

### 1. React Native चुनें जब:
- आप कम बजट और कम समय में Android और iPhone दोनों यूजर्स तक पहुंचना चाहते हैं।
- आपका ऐप कोचिंग क्लास, ई-कॉमर्स, डिलीवरी, रियल एस्टेट, बिलिंग या बिजनेस मैनेजमेंट का है।
- आपको समय-समय पर नए फीचर्स और अपडेट्स तेजी से रिलीज करने हैं।

### 2. Pure Native चुनें जब:
- आप बहुत हैवी 3D गेमिंग ऐप (जैसे PUBG/BGMI) बना रहे हैं।
- आपको बहुत गहरे हार्डवेयर सेंसर्स या कस्टम ऑडियो चिप्स को कंट्रोल करना हो।

---

## WebVibez मोबाइल ऐप डेवलपमेंट सॉल्यूशन

WebVibez में हम भारतीय व्यवसायों के लिए अल्ट्रा-फास्ट, सिक्योर और खूबसूरत UI वाले React Native ऐप्स डिजाइन और डेवलप करते हैं। अधिक जानकारी के लिए हमारी [Mobile App Development](/services/mobile-app-development) सेवा देखें।`,
    },
  },
  {
    groupKey: "custom-software-vs-saas",
    category: "Custom Software" as const,
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    en: {
      slug: "build-vs-buy-replacing-saas-with-custom-software-guide",
      title: "Build vs Buy: Why Growing Companies Are Replacing SaaS with Custom Software",
      description: "Analyze the total cost of ownership (TCO) of monthly SaaS subscriptions versus custom bespoke software. Learn how owning software creates long-term enterprise value.",
      excerpt: "Growing businesses spend ₹50,000 to ₹3,00,000 monthly on fragmented SaaS tools. Here is why bespoke custom software delivers 3.8x higher 3-year ROI.",
      aeoDirectAnswer: "Custom software development replaces recurring monthly per-seat SaaS subscription fees with an owned digital asset, tailored precisely to business workflows with 100% proprietary data control and zero vendor lock-in.",
      readingTime: "9 min read",
      tags: ["custom software", "saas replacement", "build vs buy", "enterprise software", "business automation"],
      content: `## The Hidden Tax of SaaS Subscription Fatigue

Over the past decade, businesses adopted dozens of specialized SaaS tools for CRM, billing, inventory, HR, and customer support. However, as organizations scale from 10 to 100+ employees, the monthly **per-seat licensing model** creates an exponential recurring cost burden.

### Common SaaS Bottlenecks for Growing Enterprises

1. **SaaS Tax Inflation**: Monthly per-user fees scale linearly with headcount, penalizing business growth.
2. **Data Silos & Integration Breakdowns**: Multiple disconnected SaaS products require brittle Zapier/webhook connections that frequently fail.
3. **Feature Bloat vs Missing Workflows**: Standard SaaS products force businesses to adapt their operations to the software, rather than the software conforming to the business.

---

## 3-Year Total Cost of Ownership (TCO) Breakdown

\`\`\`
Year 1: [ SaaS: ₹7.2 Lakhs ] vs [ Custom Software Build: ₹4.8 Lakhs ]
Year 2: [ SaaS: ₹9.6 Lakhs ] vs [ Custom Software Maintenance: ₹0.6 Lakhs ]
Year 3: [ SaaS: ₹12.4 Lakhs ] vs [ Custom Software Maintenance: ₹0.6 Lakhs ]

3-Year Total SaaS Spend: ₹29.2 Lakhs (Zero Asset Ownership)
3-Year Custom Software:   ₹6.0 Lakhs (100% Owned Business Intellectual Property)
Net Savings: ₹23.2 Lakhs (79.4% Reduction in Tech Overhead)
\`\`\`

---

## Key Benefits of Custom Software Development

- **100% Proprietary Ownership**: You own the source code, database, and infrastructure with zero monthly per-user restrictions.
- **Unified Operational Hub**: Combine CRM, Invoicing, Inventory, Attendance, and Client Portals into a single high-performance dashboard.
- **Custom Integrations**: Direct API connections with Indian banking gateways (Razorpay, UPI Intent), GST filing portals, and WhatsApp Cloud APIs.

To discuss building an owned custom software solution for your enterprise, consult our team at [Custom Software Development](/services/custom-software-development).`,
    },
    hi: {
      slug: "custom-software-vs-saas-subscription-hindi-guide",
      title: "Custom Software बनाम Ready-made SaaS: भारतीय व्यवसायों के लिए क्या सही है?",
      description: "हर महीने महंगे SaaS सब्सक्रिप्शन भरने के बजाय अपनी खुद की कस्टम सॉफ्टवेयर और ERP बनवाने के क्या फायदे हैं? जानें लागत और ROI का पूरा गणित।",
      excerpt: "बढ़ते हुए व्यवसाय हर महीने हजारों रुपये अलग-अलग सॉफ्टवेयर टूल्स में खर्च करते हैं। जानिए कस्टम सॉफ्टवेयर बनवाने से कैसे लाखों रुपये की बचत होती है।",
      aeoDirectAnswer: "कस्टम सॉफ्टवेयर का अर्थ है अपने बिजनेस की जरूरतों के अनुसार खास तौर पर तैयार किया गया सॉफ्टवेयर, जिसका पूरा मालिकाना हक (Ownership) आपका होता है और हर महीने यूजर-वाइज किराया नहीं देना पड़ता।",
      readingTime: "8 min read",
      tags: ["custom software hindi", "erp software india", "saas vs custom", "business automation hindi"],
      content: `## महंगे मंथली सॉफ्टवेयर सब्सक्रिप्शन का सच

आजकल लगभग सभी सॉफ्टवेयर कंपनियां 'Per User Per Month' (प्रति कर्मचारी मासिक शुल्क) मॉडल पर काम करती हैं। जब आपका बिजनेस छोटा होता है तो यह ठीक लगता है, लेकिन जैसे-जैसे आपकी टीम 10 से 50 लोगों की होती है, हर महीने सॉफ्टवेयर का बिल लाखों में पहुँच जाता है।

### रेडीमेड SaaS सॉफ्टवेयर की 3 बड़ी कमियां

1. **हर महीने भारी खर्च**: स्टाफ बढ़ने पर सॉफ्टवेयर का किराया लगातार बढ़ता रहता है।
2. **डेटा पर आपका पूरा कंट्रोल नहीं**: आपका संवेदनशील बिजनेस और क्लाइंट डेटा विदेशी क्लाउड सर्वर पर रहता है।
3. **आपके अनुसार बदलाव संभव नहीं**: आपको अपनी कंपनी की कार्यप्रणाली को सॉफ्टवेयर के अनुसार बदलना पड़ता है।

---

## 3 साल का वित्तीय विश्लेषण (ROI Comparison)

\`\`\`
पहला साल:  [ रेडीमेड SaaS: ₹6,00,000 ] vs [ कस्टम सॉफ्टवेयर निर्माण: ₹3,50,000 ]
दूसरा साल: [ रेडीमेड SaaS: ₹8,00,000 ] vs [ मेंटेनेंस: ₹40,000 ]
तीसरा साल: [ रेडीमेड SaaS: ₹10,50,000 ] vs [ मेंटेनेंस: ₹40,000 ]

3 साल का कुल SaaS खर्च: ₹24,50,000 (कोई संपत्ति नहीं बची)
3 साल का कस्टम सॉफ्टवेयर: ₹4,30,000 (कंपनी की अपनी परमानेंट डिजिटल एसेट)
कुल बचत: ₹20.2 लाख रुपये (लगभग 82% की सीधी बचत)
\`\`\`

---

## अपनी कस्टम सॉफ्टवेयर बनवाने के मुख्य फायदे

- **शून्य मंथली रेंट**: एक बार सॉफ्टवेयर तैयार होने के बाद यूजर संख्या पर कोई पाबंदी नहीं होती।
- **सब कुछ एक ही डैशबोर्ड पर**: बिलिंग, CRM, इन्वेंट्री, अटेंडेंस और GST इनवॉइसिंग सब कुछ एक साथ।
- **WhatsApp और UPI का सीधा सपोर्ट**: भारतीय पेमेंट गेटवे और WhatsApp Cloud API का डायरेक्ट इंटीग्रेशन।

यदि आप अपनी कंपनी के लिए कस्टम सॉफ्टवेयर या ERP बनवाना चाहते हैं, तो WebVibez की [Custom Software Development](/services/custom-software-development) सेवा के बारे में जानें।`,
    },
  },
];

export const DailyPublishingEngine = {
  /**
   * Automatically ensures the queue has at least 12 scheduled/ready articles
   * in bilingual pairs (English + Hindi) so the daily publisher never runs dry.
   */
  async ensurePerpetualQueue(): Promise<number> {
    const allArticles = await BlogRepository.getAllArticles();
    const scheduledOrReady = allArticles.filter(
      (a) => a.status === "SCHEDULED" || a.status === "READY"
    );

    if (scheduledOrReady.length >= 6) {
      return 0; // Sufficient queue buffer
    }

    let addedCount = 0;
    const now = new Date();

    for (let i = 0; i < BILINGUAL_TOPIC_POOL.length; i++) {
      const topic = BILINGUAL_TOPIC_POOL[i];
      const futureDate = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000).toISOString();

      // Check if EN article exists
      const existingEn = allArticles.find((a) => a.slug === topic.en.slug);
      if (!existingEn) {
        await BlogRepository.createArticle({
          id: `art-en-${topic.groupKey}-${Date.now()}-${i}`,
          slug: topic.en.slug,
          title: topic.en.title,
          description: topic.en.description,
          excerpt: topic.en.excerpt,
          aeoDirectAnswer: topic.en.aeoDirectAnswer,
          readingTime: topic.en.readingTime,
          category: topic.category,
          tags: topic.en.tags,
          content: topic.en.content,
          featuredImage: topic.featuredImage,
          featuredImageAlt: topic.en.title,
          author: allArticles[0]?.author || {
            name: "Rudram Joshi",
            role: "Founder & Lead Architect",
            bio: "Building high-performance digital systems and custom software architectures.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          },
          publicationDate: futureDate,
          modifiedDate: futureDate,
          status: "SCHEDULED",
          featured: false,
          canonicalUrl: `https://webvibez.com/blog/${topic.en.slug}`,
          language: "en",
          languageGroupKey: topic.groupKey,
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        });
        addedCount++;
      }

      // Check if HI article exists
      const existingHi = allArticles.find((a) => a.slug === topic.hi.slug);
      if (!existingHi) {
        await BlogRepository.createArticle({
          id: `art-hi-${topic.groupKey}-${Date.now()}-${i}`,
          slug: topic.hi.slug,
          title: topic.hi.title,
          description: topic.hi.description,
          excerpt: topic.hi.excerpt,
          aeoDirectAnswer: topic.hi.aeoDirectAnswer,
          readingTime: topic.hi.readingTime,
          category: topic.category,
          tags: topic.hi.tags,
          content: topic.hi.content,
          featuredImage: topic.featuredImage,
          featuredImageAlt: topic.hi.title,
          author: allArticles[0]?.author || {
            name: "Rudram Joshi",
            role: "Founder & Lead Architect",
            bio: "Building high-performance digital systems and custom software architectures.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          },
          publicationDate: futureDate,
          modifiedDate: futureDate,
          status: "SCHEDULED",
          featured: false,
          canonicalUrl: `https://webvibez.com/blog/${topic.hi.slug}`,
          language: "hi",
          languageGroupKey: topic.groupKey,
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        });
        addedCount++;
      }
    }

    return addedCount;
  },

  async executeDailyPublication(force = false): Promise<DailyPublishLog> {
    const startTime = Date.now();
    const dateIST = getCurrentDateIST();
    const idempotencyKey = `blog-publish-${dateIST}-Asia-Kolkata`;
    const dailyKeys = getDailyKeys();

    // Ensure perpetual queue is populated with bilingual articles
    await this.ensurePerpetualQueue().catch((e) => console.error("Perpetual queue error:", e));

    // 1. Idempotency Check (bypassed if force=true)
    if (!force && dailyKeys.has(idempotencyKey)) {
      const log: DailyPublishLog = {
        id: `pub-${Date.now()}`,
        executionDateIST: dateIST,
        executionTimeUTC: new Date().toISOString(),
        idempotencyKey,
        status: "ALREADY_PUBLISHED",
        durationMs: Date.now() - startTime,
        message: `Daily articles have already been published for Asia/Kolkata date ${dateIST}. Skipping duplicate execution.`,
        distributionQueued: false,
      };
      saveLog(log);
      return log;
    }

    // 2. Query eligible articles (SCHEDULED or READY)
    const allArticles = await BlogRepository.getAllArticles();
    const eligibleArticles = allArticles.filter(
      (a) => a.status === "READY" || a.status === "SCHEDULED"
    );

    if (eligibleArticles.length === 0) {
      const log: DailyPublishLog = {
        id: `pub-${Date.now()}`,
        executionDateIST: dateIST,
        executionTimeUTC: new Date().toISOString(),
        idempotencyKey,
        status: "NO_READY_ARTICLE",
        durationMs: Date.now() - startTime,
        message: "No approved articles with status READY or SCHEDULED were found in the queue.",
        distributionQueued: false,
      };
      saveLog(log);

      TelegramNotifier.sendWarningAlert(
        "No approved articles found in the publishing queue for today's 09:30 AM IST slot."
      ).catch(() => {});

      return log;
    }

    // 3. Select daily batch: up to 3 English + up to 3 Hindi (Max 6 articles per day)
    const enArticles = eligibleArticles.filter((a) => (a.language || "en") === "en").slice(0, 3);
    const hiArticles = eligibleArticles.filter((a) => a.language === "hi").slice(0, 3);
    const batchToPublish = [...enArticles, ...hiArticles];

    // If no language split available, take top 6
    if (batchToPublish.length === 0) {
      batchToPublish.push(...eligibleArticles.slice(0, 6));
    }

    const publishedTitles: string[] = [];
    const nowIso = new Date().toISOString();

    for (const candidate of batchToPublish) {
      // Quality Gate validation
      const qualityResult = QualityGateEngine.validateArticle(candidate);
      if (!qualityResult.passed) {
        console.warn(`Article ${candidate.title} failed quality gate (${qualityResult.score}/100), skipping.`);
        continue;
      }

      // Publish to Turso DB
      const updatedArticle = await BlogRepository.updateArticle(candidate.id, {
        status: "PUBLISHED",
        publicationDate: nowIso,
        modifiedDate: nowIso,
      });

      if (updatedArticle) {
        publishedTitles.push(updatedArticle.title);

        // Distribute to platforms & notify Telegram
        try {
          const distResults = await DistributionManager.distributeAll(candidate.id);
          await TelegramNotifier.sendPublishedAlert(updatedArticle, distResults);
        } catch (err) {
          console.error("Distribution/Telegram alert error:", err);
          await TelegramNotifier.sendPublishedAlert(updatedArticle).catch(() => {});
        }
      }
    }

    const log: DailyPublishLog = {
      id: `pub-${Date.now()}`,
      executionDateIST: dateIST,
      executionTimeUTC: nowIso,
      idempotencyKey,
      status: "SUCCESS",
      articleTitle: publishedTitles.join(" | "),
      durationMs: Date.now() - startTime,
      message: `Successfully published batch of ${publishedTitles.length} articles (${enArticles.length} EN + ${hiArticles.length} HI) for ${dateIST} Asia/Kolkata.`,
      distributionQueued: true,
    };

    saveLog(log);
    return log;
  },

  getRecentLogs(): DailyPublishLog[] {
    return getPublishLogs();
  },
};
