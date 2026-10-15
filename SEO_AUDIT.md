# WebVibez Technical SEO Audit & Discovery Baseline

**Prepared for:** Rudram Joshi, Founder & Lead Architect, WebVibez  
**Date:** 15 October 2026  
**Auditor:** Antigravity Senior Technical SEO & Systems Engineer  
**Branch:** `seo/master-pass`  
**Target Canonical Host:** `https://www.webvibez.com`

---

## 1. Technical Architecture Summary

| Architectural Component | Current Implementation in Repository | SEO & Performance Implications |
| :--- | :--- | :--- |
| **Framework & Engine** | Next.js 16.3.5 (Turbopack, React Compiler enabled, React 19.2.8) | Modern architecture; zero hydration mismatches; clean server/client separation. |
| **Routing Structure** | App Router (`src/app`) with 22 public pages, 20 admin dashboard routes, dynamic blog slug `[slug]`, and 25 API routes. | Clean folder-based URL structure (`/services/*`, `/pricing`, `/product`, etc.). |
| **Metadata Generation** | Static `Metadata` exports in nested `layout.tsx` files; dynamic `generateMetadata` in `src/app/blog/[slug]/page.tsx`. | Root layout defines title template `%s \| WebVibez`. Sub-layouts provide localized fallbacks. |
| **Layout Tree & Head Injection** | Root `src/app/layout.tsx` hardcodes `<head>` tags (OpenGraph image, Twitter image, JSON-LD graph) alongside Next.js metadata. | Hardcoded `<head>` tags in root layout risk duplicating or conflicting with sub-page metadata exports. |
| **Sitemap System** | `src/app/sitemap.ts` (`MetadataRoute.Sitemap`) generating 20 static paths + published articles from Turso DB. | Static URLs are stamped with `new Date()` (misleading crawlers that static pages change every minute); `/features` missing. |
| **Robots Rules** | `src/app/robots.ts` with user-agent rules for standard bots + AI search crawlers. | Disallows selective paths (`/admin`, `/api/admin`, `/api/blog/cron`), but does not blanket-disallow all internal `/api/*` endpoints. |
| **Structured Data (JSON-LD)** | Injected via `<script type="application/ld+json">` in root layout, service layouts, and page components. | Contains rich `Organization`, `WebSite`, and `BreadcrumbList`, but contains **fabricated `aggregateRating` (fake review counts)** on service pages. |
| **Image & Font Pipeline** | `next/font/google` (Space Grotesk, Manrope, JetBrains Mono) with `display: swap`. `next/image` configured with AVIF/WebP. | Critical fonts are pre-cached. However, OG images use an uncompressed 1080x987 JPEG (`logo.jpeg`) declared falsely as 1200x630. |
| **WebGL & 3D Canvas** | Three.js (`^0.186.0`), `@react-three/fiber`, `@react-three/drei`, GSAP, Lenis smooth scroll. | Central 3D phone canvas dynamically imported with `{ ssr: false }`, preserving SSR HTML readability. |
| **Blog & CMS Engine** | libSQL / Turso DB repository (`src/lib/blog/repository.ts`) with static fallback seed data (`seed-data.ts`). | Supports MDX/HTML content, RSS feed (`/blog/rss.xml`), and schema tagging. |
| **Internal Tools & Admin** | `/admin` routes protected via session cookie in `src/middleware.ts` and marked `robots: { index: false, follow: false }`. | Private admin and CRM modules are protected from unauthorized crawler indexing. |

---

## 2. Complete Public Page Inventory

All 21 public pages audited for Title, Meta Description, H1, Canonical URL, Indexability, and Structured Data:

| URL | Title Tag | Meta Description | Primary H1 | Canonical URL | Indexability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `Software Development Company in Ahmedabad \| WebVibez` | WebVibez is a leading custom software development company in Ahmedabad, Gujarat, India. Expert software developers creating high-performance websites... | *Custom Software & App Development Company in Ahmedabad.* (in `HeroSection.tsx`) | `https://www.webvibez.com` | Indexable |
| `/services` | `Software & App Development Services in Ahmedabad \| WebVibez` | Explore WebVibez engineering services: custom software development, high-performance Next.js websites, React Native iOS and Android apps... | *Software Services & Architecture* (in `SpatialServicesExperience.tsx`) | `https://www.webvibez.com/services` | Indexable |
| `/services/coaching-class-management-app` | `Coaching Class Management App Development \| WebVibez` *(Weak Title)* | WebVibez builds custom branded coaching class management applications, student portal systems, CBT exam engines, and automated fee collection platforms... | *Coaching Class Management App Development in Ahmedabad* | `https://www.webvibez.com/services/coaching-class-management-app` | Indexable |
| `/services/website-development` | `Website Development Company in Ahmedabad \| Next.js & Custom Web \| WebVibez` | WebVibez is a top website development company in Ahmedabad, Gujarat. We engineer blazing fast Next.js websites, custom web applications... | *Website Development Company in Ahmedabad* | `https://www.webvibez.com/services/website-development` | Indexable |
| `/services/mobile-app-development` | `Mobile App Development Company in Ahmedabad \| WebVibez` | WebVibez is a mobile app development company in Ahmedabad, Gujarat. We engineer high-performance cross-platform iOS and Android mobile apps using React Native. | *Mobile App Development Company in Ahmedabad* | `https://www.webvibez.com/services/mobile-app-development` | Indexable |
| `/services/custom-software-development` | `Custom Software Development in Ahmedabad \| WebVibez` | WebVibez is a custom software development company in Ahmedabad, Gujarat. We engineer tailored enterprise software, scalable SaaS platforms... | *Custom Software Development Company in Ahmedabad* | `https://www.webvibez.com/services/custom-software-development` | Indexable |
| `/services/mobile-apps-on-rent` | `Mobile Apps on Rent \| 1-Year Subscription & App Leasing \| WebVibez` | Get high-performance iOS and Android mobile apps on a 1-year rental plan from WebVibez. Turnkey white-label delivery apps, e-commerce apps, coaching apps... | *Get Readymade Mobile Apps on 1-Year Rental Subscription* | `https://www.webvibez.com/services/mobile-apps-on-rent` | Indexable |
| `/pricing` | `Predictable Investment & Pricing Plans \| WebVibez` | Explore transparent software engineering packages: custom mobile apps, web applications, and coaching management software with no hidden fees. | *Simple, Transparent Pricing. Up to 750 Students Included.* | `https://www.webvibez.com/pricing` | Indexable |
| `/product` | `Coaching Class Management Software & Mobile Platform \| WebVibez` | Explore WebVibez coaching institute software: 100% white-labeled iOS and Android mobile apps, live lecture streaming, CBT exam engine, hardware DRM... | *Complete Product Ecosystem & Platform Modules* | `https://www.webvibez.com/product` | Indexable |
| `/portfolio` | `Engineering Portfolio & Client Case Studies \| WebVibez` | Explore real-world software engineering case studies, mobile applications, and web platforms delivered by WebVibez Software Developer. | *High-Performance Software, Mobile Apps & Cloud Architectures* | `https://www.webvibez.com/portfolio` | Indexable |
| `/how-it-works` | `How It Works \| 3-Step Development & 7-Day Launch \| WebVibez` | Discover the WebVibez agile development methodology: Architecture & Scoping, Rapid Iteration & Continuous QA, and Zero-Downtime Multi-Platform Production Launch in 7 days. | *From Agreement to Live Production in Exactly 7 Days* | `https://www.webvibez.com/how-it-works` | Indexable |
| `/features` | `Platform Features \| Coaching & Software Capabilities \| WebVibez` | Explore core features of WebVibez platforms: live biometric & mobile attendance, automated fee processing, test performance analytics... | *NONE (Redirects immediately via `redirect("/product")`)* | `https://www.webvibez.com/features` | Thin redirect |
| `/about` | `About WebVibez \| Product Studio & Developer, Ahmedabad \| WebVibez` | WebVibez Software Developer is a digital product studio based in Ahmedabad, Gujarat, engineering high-impact mobile apps, websites... | *We Build Software That Empowers Leaders* | `https://www.webvibez.com/about` | Indexable |
| `/contact` | `Contact WebVibez \| Ahmedabad, Gujarat \| WebVibez` | Get in touch with WebVibez Software Developer. Discuss your custom software, mobile app, or coaching institute software requirements with our engineering team... | *Let's Architect Your Next Digital Platform* | `https://www.webvibez.com/contact` | Indexable |
| `/blog` | `WebVibez Blog \| Software Development, Mobile Apps & Tech Insights \| WebVibez` | In-depth guides, technical architecture insights, and software development best practices from the engineers at WebVibez. | *Software Architecture, Mobile Apps & Digital Product Guides* | `https://www.webvibez.com/blog` | Indexable |
| `/security` | `Enterprise Security & Data Protection Standards \| WebVibez` | Learn about WebVibez enterprise-grade security protocols: AES-256 data encryption, zero-trust role-based access, automated database backups... | *Enterprise Security* | `https://www.webvibez.com/security` | Indexable |
| `/privacy` | `Privacy Policy \| WebVibez` | Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained... | *Privacy Policy* | `https://www.webvibez.com/privacy` | Indexable (Low value) |
| `/terms` | `Terms and Conditions \| WebVibez` | Terms and conditions for utilizing WebVibez Software Developer software products, development services, APIs, and client portals. | *Terms of Service* | `https://www.webvibez.com/terms` | Indexable (Low value) |
| `/refund-policy` | `Cancellation & Refund Policy \| WebVibez` | Cancellation and refund policy for WebVibez custom software development services, subscription tiers, and deployment contracts. | *Refund & Cancellation Policy* | `https://www.webvibez.com/refund-policy` | Indexable (Low value) |
| `/agreements` | `Service Agreements & Legal Framework \| WebVibez` | Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations. | *Client Service Agreement (SLA)* | `https://www.webvibez.com/agreements` | Indexable (Low value) |
| `/disclaimer` | `Disclaimer \| WebVibez` | Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services. | *Legal Disclaimer & Fair Use* | `https://www.webvibez.com/disclaimer` | Indexable (Low value) |

---

## 3. Issues Ranked by Priority (P0, P1, P2)

### P0: Critical Compliance, Trust & Spam Penalty Risks (Fix Immediately)

1. **Root Layout Keyword-Stuffed Meta Tag:**
   * *Location:* `src/app/layout.tsx:123–184`
   * *Issue:* 61 generic and city-level keyword phrases (`"best software developer in ahmedabad"`, `"top software company ahmedabad"`, etc.) are declared in the root `metadata.keywords` array. Next.js automatically compiles this into `<meta name="keywords" content="...">` across every single page.
   * *Risk:* Google has ignored meta keywords since 2009. Having a 61-term block on every page triggers spam heuristics and exposes your target strategy to competitors.
   * *Fix:* Remove the `keywords` property completely from `src/app/layout.tsx`.

2. **Fabricated `aggregateRating` Schema Markup (Google Search Penalty Risk):**
   * *Location:*
     - `src/app/services/coaching-class-management-app/page.tsx:257–263` (`ratingValue: "4.9", reviewCount: "142"`)
     - `src/app/services/website-development/page.tsx:260–266` (`ratingValue: "4.9", reviewCount: "128"`)
     - `src/app/services/mobile-app-development/page.tsx:257–263` (`ratingValue: "4.9", reviewCount: "136"`)
     - `src/app/services/custom-software-development/page.tsx:260–266` (`ratingValue: "4.9", reviewCount: "115"`)
   * *Issue:* Fake star ratings and review counts are hardcoded into `SoftwareApplication` JSON-LD schema on each service page without genuine, third-party verifiable client reviews attached.
   * *Risk:* Google Search Central explicitly penalizes sites with self-serving or fabricated `aggregateRating` markup, resulting in manual actions or total loss of rich snippet eligibility.
   * *Fix:* Remove fabricated `aggregateRating` objects across all service page schemas until real reviews are aggregated from Google Play or verified clients.

3. **Claims Requiring Verification or Softening:**
   * *Unverified Scale Claims:* `"50,000+ daily active student sessions"` (`ProductArchitecture.tsx:16`), `"Join 400,000+ students and premier institutions"` (`product/page.tsx:1045`).
   * *Unverified Security Claims:* `"Hardware-level screen recording blackout"` and `"Hardware DRM Widevine L1"` (`coaching-class-management-app/page.tsx:29`, `product/page.tsx:790`). Standard React Native mobile apps use `FLAG_SECURE` on Android (which prevents screenshots and screen recording via window manager) and iOS blur listeners; calling this "hardware-level Widevine L1" is technically inaccurate unless dedicated hardware DRM keys and a certified Widevine CDM license server are in place.
   * *Unverified Infrastructure Claims:* `"Kubernetes & Docker container clusters auto-scale"` (`HowItWorks.tsx:481`, `ProductArchitecture.tsx:44`). The project is hosted on Vercel / serverless cloud, not a dedicated multi-node Kubernetes cluster.
   * *Subjective Ranking Claims:* `"Ranked among forward-thinking website development companies"` (`SEOAuthoritySection.tsx:82`), `"WebVibez is recognized among top development companies in Ahmedabad"` (`SEOAuthoritySection.tsx:16`).

4. **Timeline Contradictions Across Pages:**
   * *Contradiction:* Homepage Hero (`HeroSection.tsx:167`), How It Works (`HowItWorks.tsx:98`), and Footer claim `"Live in 7 Days"`, whereas the interactive Project Cost Estimator (`ProjectCostEstimator.tsx:46–70`) displays `"10–14 Days"` for Coaching Apps, `"14–21 Days"` for Custom Mobile Apps, `"7–12 Days"` for Websites, and `"20–30 Days"` for ERPs.
   * *Fix:* Unify messaging: White-label app rental setup/onboarding can be "5–7 business days"; bespoke custom software projects follow realistic "10–21 business day" sprints.

5. **Technology Stack Contradiction:**
   * *Contradiction:* `ServicesConveyor.tsx:16` and `ProductArchitecture.tsx:25` claim `"Native Swift & Kotlin"`, whereas `ProjectCostEstimator.tsx:55`, `package.json`, and the app portfolio explicitly use `"React Native & Expo"`.
   * *Fix:* Standardize on the true stack: **React Native (iOS & Android) with native bridges**.

6. **Mixed Topic Signals on Homepage:**
   * *Issue:* The Homepage Chapter 03 Product Showroom (`ProductShowcase.tsx:78`) showcases **EnzoChat** (a social chat, ephemeral stories, and campus hub app) with 8 dedicated modules, right between coaching class software and agency services.
   * *Risk:* Search engines cannot determine whether WebVibez is a B2B coaching software company, a consumer social messaging app, or a web agency.
   * *Fix:* Transition the Homepage Product Showroom to focus on the flagship **Coaching Institute Management Platform**, and house EnzoChat on a dedicated showcase page (`/product/enzochat` or `/portfolio/enzochat`) with outbound link to `enzochat.webvibez.com`.

7. **Missing Non-WWW to WWW Canonical 301 Redirect:**
   * *Issue:* Neither `next.config.ts` nor `src/middleware.ts` enforces a 301 permanent redirect from `webvibez.com` to `www.webvibez.com`.
   * *Risk:* Splitting domain equity between naked domain and www subdomain.

---

### P1: High Impact Optimization & Usability Fixes

8. **Weak & Non-Differentiated Titles:**
   * `/services/coaching-class-management-app`: Currently `Coaching Class Management App Development | WebVibez` (39 chars). Needs high-intent commercial phrasing: `White-Label Coaching App Development India | WebVibez`.
   * `/services/mobile-apps-on-rent`: Overlaps with `/pricing` on rental keywords.
   * Inner service pages repeat Ahmedabad in every title, causing keyword cannibalization on local terms.

9. **Social Metadata (Open Graph & Twitter) Gaps:**
   * Most inner pages reference `https://www.webvibez.com/logo.jpeg` as their OG image, but the file is 1080x987 px (square-ish), failing the recommended 1200x630 (1.91:1) standard.
   * Missing `og:locale` (`en_IN` or `en_US`) on multiple inner layouts.
   * Hardcoded `<head>` tags in `src/app/layout.tsx` conflict with page-level dynamic OpenGraph tags.

10. **Rendered Duplication in Services Conveyor (`ServicesConveyor.tsx`):**
    * *Issue:* Lines 155–156 render `[...row.items, ...row.items, ...row.items, ...row.items]` in the DOM to achieve an infinite CSS animation loop.
    * *Result:* Every service title, description, and "Explore Solution" button appears **4 times in the rendered HTML**.
    * *Fix:* Render the primary row once for crawlers/screen readers, and mark loop clones with `aria-hidden="true"`. Replace generic `"Explore Solution"` buttons with crawlable anchor links to dedicated service pages (`/services/website-development`, etc.).

11. **Static Route `lastModified` in `sitemap.ts`:**
    * *Issue:* `sitemap.ts:33` uses `lastModified: new Date()` for all static routes.
    * *Result:* Every time Googlebot fetches `sitemap.xml`, it is told every page was edited seconds ago. Search engines ignore `lastmod` when it behaves dynamically on static pages.
    * *Fix:* Hardcode realistic release dates for static routes, and only use dynamic dates for published blog articles.

12. **Unmeasured Mobile WebGL / Animation Risk:**
    * Baseline mobile Lighthouse testing shows homepage LCP at **5.8s** (target ≤ 2.5s) primarily due to unoptimized initial asset payloads and client hydration.

---

### P2: Housekeeping, Schema Integrity & Hygiene

13. **FAQ Rich Snippet Reality Check:**
    * Google limited FAQ rich snippets in August 2023 to authoritative government and healthcare domains. FAQ schema is maintained for semantic entity grounding and voice/LLM engines, but rich accordion snippets in SERPs should not be expected.

14. **Local Business Address Verification:**
    * Schema defines PostalCode `"380001"` with StreetAddress `"Ahmedabad"`. Do not publish fictional street numbers. Keep Ahmedabad at city/metro level to remain fully compliant with Google Business Profile rules.

15. **ESLint Baseline Debt:**
    * 542 problems (236 errors, 306 warnings) exist in internal tools (`src/lib/crm`, `src/lib/distribution`, `src/lib/seo-intelligence`), mostly around `any` types.

16. **Next.js 16 Deprecation Warnings:**
    * `middleware.ts` convention is deprecated in favor of `proxy` in Next.js 16.
    * Edge runtime flag deprecated on API routes in favor of Node.js runtime.

---

## 4. The Claims Ledger

Every performance, scale, delivery, technology, ranking, and security claim identified in the codebase, with risk analysis and recommended resolution:

| # | Exact Claim in Code | File Location | Category | Verified Fact / Reality | Recommended Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C1** | `"Over 50,000+ daily active student sessions"` | `src/components/sections/ProductArchitecture.tsx:16` | Scale | Unverified internal metric. | **Soften:** Change to *"Engineered to support 50,000+ concurrent student sessions"* or remove. |
| **C2** | `"Join 400,000+ students and premier institutions who rely on WebVibez"` | `src/app/product/page.tsx:1045` | Social Proof | Unverified volume metric. | **Remove:** Replace with *"Trusted by growing coaching institutes across Gujarat and India."* |
| **C3** | `"99.9% Uptime SLA"` / `"We guarantee a 99.9% Core Production Availability"` | `HeroSection.tsx:181`, `terms/page.tsx:48`, `agreements/page.tsx:39` | Reliability | Vercel and cloud backends offer high availability, but a legally binding 99.9% SLA requires financial credit clauses. | **Soften:** Frame as *"99.9% target cloud availability"* across marketing pages; preserve SLA terms strictly in signed legal contracts. |
| **C4** | `"Ranked among forward-thinking website development companies"` | `src/components/sections/SEOAuthoritySection.tsx:82` | Ranking | No public third-party ranking cited. | **Remove:** Rephrase to *"Modern website development company in Ahmedabad engineered with Next.js."* |
| **C5** | `"WebVibez is recognized among top development companies in Ahmedabad"` | `src/components/sections/SEOAuthoritySection.tsx:16` | Ranking | Unsubstantiated award/ranking claim. | **Remove / Soften:** Rephrase to focus on verifiable technical specialization. |
| **C6** | `"100% PRODUCTION READY"` | `FeaturesSection.tsx:188` | Marketing | Vague superlative. | **Soften:** Replace with *"Production-Grade Architecture"*. |
| **C7** | `"Hardware DRM Widevine L1 screen capture blackout"` | `product/page.tsx:790`, `coaching-class-management-app/page.tsx:29` | Security | Standard mobile apps use Android OS `FLAG_SECURE` and iOS view protection. True Widevine L1 requires hardware chip licensing. | **Soften:** Rephrase accurately as *"OS-level screen recording blackout (FLAG_SECURE) & dynamic watermarks"*. |
| **C8** | `"Docker & K8s"` / `"Kubernetes container clusters auto-scale"` | `ProductArchitecture.tsx:44`, `HowItWorks.tsx:481` | Infrastructure | Hosted on serverless Next.js (Vercel) & managed cloud databases, not Kubernetes. | **Soften:** Change to *"Containerized microservices & scalable cloud infrastructure"*. |
| **C9** | `"Native Swift & Kotlin"` | `HeroSection.tsx`, `ServicesConveyor.tsx:16`, `ProductArchitecture.tsx:25` | Tech Stack | Contradicts React Native codebase and estimator details. | **Correct:** Standardize on *"React Native (iOS & Android) with native OS bridges"*. |
| **C10** | `"Live in 7 Days"` vs `"10–14 Days"` / `"14–21 Days"` | `HeroSection.tsx:167` vs `ProjectCostEstimator.tsx:46–70` | Delivery | Rapid 5–7 day setup applies to turnkey app rental templates; custom software requires 10–21 business days. | **Reconcile:** Clarify *"Turnkey white-label app setup in 5–7 days; custom software in 10–21 days"*. |
| **C11** | `"AggregateRating: ratingValue 4.9, reviewCount 142"` | `coaching-class-management-app/page.tsx:260` + 3 service pages | Schema / Reviews | Fabricated review counts in JSON-LD. | **Remove:** Delete fake `aggregateRating` until Google Play / verified client reviews are linked. |
| **C12** | `"Average App Store Rating: 4.9 / 5.0"` | `src/app/product/page.tsx:341` | Social Proof | Unlinked rating stat. | **Ask Rudram:** Verify live Google Play store rating for `com.webvibez.classes`; keep only if matching live Play Store stat. |

---

## 5. Keyword Cannibalization & Intent Mapping

Several pages currently target identical search queries with overlapping metadata. Below is the conflict matrix and resolution:

| Search Query / Intent Category | Conflicting Pages in Repo | Problem & Cannibalization Risk | Strategic Resolution |
| :--- | :--- | :--- | :--- |
| **Coaching Class Management Software / App** | • `/services/coaching-class-management-app`<br>• `/product`<br>• `/features`<br>• Homepage Chapter 04 | All 4 pages use overlapping titles and descriptions targeting "coaching class management software". Google splits link equity and cannot decide which page to rank. | • **Primary Rank Target:** `/services/coaching-class-management-app`<br>• `/product`: Refocus as the high-level **Platform Ecosystem & Architecture Hub**.<br>• `/features`: Formalize 301 redirect to `/product` in `next.config.ts`. |
| **App on Rent / 1-Year Subscription** | • `/services/mobile-apps-on-rent`<br>• `/pricing`<br>• `/services/coaching-class-management-app` | `/services/mobile-apps-on-rent` and `/pricing` both target "mobile app rental 1-year subscription". | • **Primary Rank Target for App Rental:** `/services/mobile-apps-on-rent`<br>• `/pricing`: Position as **Transparent Pricing & Cost Calculator** (targeting "coaching app cost", "software development pricing"). |
| **Software Development Company in Ahmedabad** | • `/`<br>• `/services`<br>• `/services/custom-software-development`<br>• `/about` | Four pages have titles claiming "Software Development Company in Ahmedabad", causing severe internal dilution. | • **Homepage (`/`):** Primary brand + overarching agency positioning (`WebVibez \| Custom Software, Mobile Apps & Websites Ahmedabad`).<br>• `/services`: Directory hub (`Software Development Services Ahmedabad \| WebVibez`).<br>• `/services/custom-software-development`: Target long-tail commercial intent (`Custom Software Development Company Gujarat`).<br>• `/about`: Focus on founder, methodology, and engineering ethos. |
| **Mobile App Development Company Ahmedabad** | • `/`<br>• `/services/mobile-app-development`<br>• `/services/mobile-apps-on-rent` | Unclear differentiation between custom app building and readymade app leasing. | • `/services/mobile-app-development`: Pure custom engineering (`React Native Mobile App Development Company Ahmedabad`).<br>• `/services/mobile-apps-on-rent`: Focus strictly on turnkey leasing intent (`Mobile Apps on Rent \| 1-Year Turnkey App Subscription`). |
| **Consumer Chat App vs B2B Coaching Platform** | • Homepage Chapter 03 (EnzoChat)<br>• `/portfolio`<br>• `https://enzochat.webvibez.com` | Homepage features EnzoChat beside coaching apps, creating topical confusion for Google crawlers. | • Move EnzoChat to its own dedicated showcase within `/portfolio/enzochat-web-platform` or standalone product route.<br>• Dedicate homepage product section to WebVibez Coaching OS & Web Solutions. |

---

## 6. Baseline Technical & Performance Diagnostics

All diagnostic benchmarks executed locally on production build (`next build` & Next.js production server, commit `seo/master-pass` baseline):

### A. Build, Lint & Typecheck Diagnostics

| Diagnostic Test | Command | Result | Findings |
| :--- | :--- | :--- | :--- |
| **TypeScript Typecheck** | `npx tsc --noEmit` | **PASSED (Exit 0)** | Zero type errors across the entire codebase. |
| **Production Build** | `npm run build` | **PASSED (Exit 0)** | All 85 static and dynamic pages compiled successfully with Next.js 16.3.5 Turbopack. |
| **Automated Tests** | N/A | **NO TESTS CONFIGURED** | No unit or integration test runner (Jest/Vitest/Playwright) exists in `package.json`. |
| **ESLint Check** | `npm run lint` | **FAILED (Exit 1)** | 542 problems (236 errors, 306 warnings). 95%+ are `@typescript-eslint/no-explicit-any` and unused variables in internal CRM and auto-distributor modules. |

### B. Mobile Lighthouse Performance Baseline (Mobile Emulation)

Audited against local Next.js production server using Lighthouse 13.5.0 (`--form-factor=mobile`, throttled mobile CPU & network profile):

| Target Route | Overall Performance Score | LCP (Target ≤ 2.5s) | TBT / INP (Target ≤ 200ms) | CLS (Target ≤ 0.1) | FCP | Speed Index |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage (`/`)** | **77 / 100** | **5.8 s** *(Needs Opt)* | **130 ms** *(Pass)* | **0.000** *(Pass)* | 1.2 s | 2.6 s |
| **Coaching App (`/services/coaching-class-management-app`)** | **87 / 100** | **3.9 s** *(Needs Opt)* | **60 ms** *(Pass)* | **0.000** *(Pass)* | 1.4 s | 1.4 s |
| **Pricing (`/pricing`)** | **86 / 100** | **4.1 s** *(Needs Opt)* | **60 ms** *(Pass)* | **0.000** *(Pass)* | 1.5 s | 1.5 s |

#### Key Performance Observations:
* **Cumulative Layout Shift (CLS):** Perfect score (**0.000**) across all audited pages.
* **Total Blocking Time (TBT):** Well under the 200ms threshold (60ms–130ms), proving Next.js 16 dynamic imports and React Compiler are minimizing main-thread blocking.
* **Largest Contentful Paint (LCP):** LCP ranges between 3.9s and 5.8s on mobile emulation. This is caused by client-side component hydration (Space Grotesk web font swap, ambient lighting calculations, and below-the-fold dynamic imports). Optimizing font preloading, critical CSS, and image dimensions will bring LCP under the 2.5s target.

---

## 7. Next Steps & Approval Checkpoint

Phase 0 discovery and baseline benchmarking are complete. No code modifications have been made to production logic.

Proceeding to **Phase 1 (P0 Fixes)** will execute:
1. Complete removal of the 61-term `meta keywords` array from `src/app/layout.tsx`.
2. Removal of fabricated `aggregateRating` schemas across all 4 service pages.
3. Implementation of unique, benefit-driven titles, canonicals, and missing OpenGraph locale tags.
4. Correction of `ServicesConveyor.tsx` repeated markup (using `aria-hidden="true"` on duplicate loop tracks and descriptive anchor links).
5. Application of claims ledger softenings and delivery timeline reconciliation.
6. Setup of www 301 canonical redirect rule.

---
*End of SEO_AUDIT.md — Awaiting approval from Rudram Joshi before proceeding to Phase 1.*
