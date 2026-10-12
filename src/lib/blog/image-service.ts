/**
 * WebVibez Intelligent Topic Image Service
 * Provides verified, high-resolution, contextually relevant images
 * matching exact software development and coaching categories.
 */

interface TopicImage {
  id: string;
  alt: string;
}

// 1. Mobile App Development & React Native
const MOBILE_IMAGES: TopicImage[] = [
  { id: "photo-1512941937669-90a1b58e7e9c", alt: "Mobile application interface on smartphone" },
  { id: "photo-1526470608268-f674ce90ebd4", alt: "Modern smartphone UI prototype" },
  { id: "photo-1555774698-0b77e0d5fac6", alt: "Mobile application developer workspace" },
  { id: "photo-1556656793-08538906a9f8", alt: "Cross-platform mobile application development" },
  { id: "photo-1563986768609-322da13575f3", alt: "Mobile UI wireframe user experience design" },
  { id: "photo-1584438784894-089d6a62b8fa", alt: "Mobile phone real-time notifications and alerts" },
];

// 2. Web Development, Next.js & Frontend
const WEB_IMAGES: TopicImage[] = [
  { id: "photo-1461749280684-dccba630e2f6", alt: "Next.js web development code on laptop" },
  { id: "photo-1498050108023-c5249f4df085", alt: "High-performance full stack web engineering" },
  { id: "photo-1507238691740-187a5b1d37b8", alt: "Modern responsive web architecture" },
  { id: "photo-1517694712202-14dd9538aa97", alt: "TypeScript and React component engineering" },
  { id: "photo-1531403009284-440f080d1e12", alt: "Web application design system and architecture" },
  { id: "photo-1547658719-da2b51169166", alt: "Creative modern digital web interface" },
];

// 3. Coaching Institute & Education Technology
const EDUCATION_IMAGES: TopicImage[] = [
  { id: "photo-1522202176988-66273c2fd55f", alt: "Coaching institute students learning on laptops" },
  { id: "photo-1524178232363-1fb2b075b655", alt: "Classroom lecture and coaching academy teaching" },
  { id: "photo-1516321318423-f06f85e504b3", alt: "Digital student test and attendance tablet portal" },
  { id: "photo-1427504494785-3a9ca7044f45", alt: "Educational academy student computer learning" },
  { id: "photo-1509062522246-3755977927d7", alt: "Smart classroom digital education software" },
  { id: "photo-1580582932707-520aed937b7b", alt: "Computer-based testing and student exam portal" },
  { id: "photo-1531482615713-2afd69097998", alt: "Coaching class educators and digital batch management" },
  { id: "photo-1434030216411-0b793f4b4173", alt: "Online mock test exam simulation" },
  { id: "photo-1517245386807-bb43f82c33c4", alt: "Coaching class study discussion group" },
];

// 4. Custom Software, ERP & Enterprise Systems
const ERP_SOFTWARE_IMAGES: TopicImage[] = [
  { id: "photo-1504868584819-f8e8b4b6d7e3", alt: "Custom enterprise software analytics dashboard" },
  { id: "photo-1551288049-bebda4e38f71", alt: "Business operations ERP financial reporting" },
  { id: "photo-1460925895917-afdab827c52f", alt: "Business software growth metrics and KPI dashboard" },
  { id: "photo-1551836022-d5d88e9218df", alt: "Enterprise digital transformation strategy meeting" },
  { id: "photo-1454165804606-c3d57bc86b40", alt: "Custom business software workflow automation" },
  { id: "photo-1559526324-4b87b5e36e44", alt: "Enterprise cloud software financial management" },
];

// 5. Cloud Infrastructure, Databases & Backend
const BACKEND_IMAGES: TopicImage[] = [
  { id: "photo-1544197150-b99a580bb7a8", alt: "High availability cloud server infrastructure" },
  { id: "photo-1558494949-ef010cbdcc31", alt: "Distributed database and cloud architecture" },
  { id: "photo-1526374965328-7f61d4dc18c5", alt: "Enterprise cybersecurity and data protection" },
  { id: "photo-1555066931-4365d14bab8c", alt: "Backend REST API and real-time WebSocket engineering" },
  { id: "photo-1607799279861-4dd421887fb3", alt: "Microservices and backend database optimization" },
  { id: "photo-1518770660439-4636190af475", alt: "High-performance server hardware architecture" },
];

// 6. WhatsApp CRM, Messaging & Billing
const CRM_BILLING_IMAGES: TopicImage[] = [
  { id: "photo-1611746872915-64382b5c76da", alt: "Automated WhatsApp business CRM communication" },
  { id: "photo-1577563908411-5077b6dc7624", alt: "Client communication and support automation portal" },
  { id: "photo-1556740738-b6a63e27c4df", alt: "Instant fee collection and dynamic UPI gateway" },
  { id: "photo-1556740758-90de374c12ad", alt: "Digital billing and automated fee receipt generation" },
  { id: "photo-1563986768494-4dee2763ff3f", alt: "Fintech payment processing and ledger reconciliation" },
];

// 7. General Software Architecture & Tech Innovation
const GENERAL_TECH_IMAGES: TopicImage[] = [
  { id: "photo-1522071820081-009f0129c71c", alt: "Senior software engineering team collaborating" },
  { id: "photo-1519389950473-47ba0277781c", alt: "Software developers building scalable digital systems" },
  { id: "photo-1573164713988-8665fc963095", alt: "Modern tech innovation and software engineering" },
  { id: "photo-1587620962725-abab7fe55159", alt: "High-speed developer workstation and clean code" },
  { id: "photo-1542838132-92c53300491e", alt: "Software architecture and web development engineering" },
  { id: "photo-1515378791036-0648a3ef77b2", alt: "Modern digital workspace and software production" },
  { id: "photo-1531297484001-80022131f5a1", alt: "Next generation digital product development" },
  { id: "photo-1451187580459-43490279c0fa", alt: "Global cloud digital network architecture" },
];

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const BlogImageService = {
  /**
   * Selects a topic-relevant, distinct Unsplash image based on article metadata.
   */
  selectTopicImage(
    title: string,
    category: string = "",
    tags: string[] = [],
    slug: string = ""
  ): { imageUrl: string; imageAlt: string } {
    const combined = `${title} ${category} ${tags.join(" ")}`.toLowerCase();

    let pool: TopicImage[] = GENERAL_TECH_IMAGES;

    if (
      combined.includes("coaching") ||
      combined.includes("student") ||
      combined.includes("class") ||
      combined.includes("attendance") ||
      combined.includes("test") ||
      combined.includes("education")
    ) {
      pool = EDUCATION_IMAGES;
    } else if (
      combined.includes("mobile") ||
      combined.includes("react native") ||
      combined.includes("ios") ||
      combined.includes("android") ||
      combined.includes("app")
    ) {
      pool = MOBILE_IMAGES;
    } else if (
      combined.includes("nextjs") ||
      combined.includes("web") ||
      combined.includes("frontend") ||
      combined.includes("website") ||
      combined.includes("ui") ||
      combined.includes("ux")
    ) {
      pool = WEB_IMAGES;
    } else if (
      combined.includes("whatsapp") ||
      combined.includes("crm") ||
      combined.includes("fee") ||
      combined.includes("billing") ||
      combined.includes("payment") ||
      combined.includes("upi")
    ) {
      pool = CRM_BILLING_IMAGES;
    } else if (
      combined.includes("database") ||
      combined.includes("server") ||
      combined.includes("backend") ||
      combined.includes("cloud") ||
      combined.includes("security") ||
      combined.includes("sync")
    ) {
      pool = BACKEND_IMAGES;
    } else if (
      combined.includes("erp") ||
      combined.includes("saas") ||
      combined.includes("business") ||
      combined.includes("workflow") ||
      combined.includes("custom software")
    ) {
      pool = ERP_SOFTWARE_IMAGES;
    }

    // Use article slug or title hash for deterministic but unique selection
    const seed = slug.replace(/-hindi$/, "") || title;
    const index = stringHash(seed) % pool.length;
    const selected = pool[index];

    return {
      imageUrl: `https://images.unsplash.com/${selected.id}?w=1200&auto=format&fit=crop&q=80`,
      imageAlt: `${title} — ${selected.alt}`,
    };
  },
};
