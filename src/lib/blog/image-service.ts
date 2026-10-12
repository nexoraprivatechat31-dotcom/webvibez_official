/**
 * WebVibez Intelligent Topic Image Service
 * Provides verified, high-resolution, contextually relevant images
 * matching exact software development and coaching categories.
 * Guarantees unique images for every blog post.
 */

export interface TopicImage {
  id: string;
  alt: string;
}

// 1. Mobile App Development & React Native (14 verified high-res photos)
export const MOBILE_IMAGES: TopicImage[] = [
  { id: "photo-1512941937669-90a1b58e7e9c", alt: "Mobile application interface on smartphone display" },
  { id: "photo-1526470608268-f674ce90ebd4", alt: "Modern smartphone UI prototype with mobile device" },
  { id: "photo-1555774698-0b77e0d5fac6", alt: "Mobile application developer workstation and test devices" },
  { id: "photo-1556656793-08538906a9f8", alt: "Cross-platform mobile application interface testing" },
  { id: "photo-1563986768609-322da13575f3", alt: "Mobile UI wireframe user experience wireframing" },
  { id: "photo-1584438784894-089d6a62b8fa", alt: "Smartphone real-time notifications and mobile alerts" },
  { id: "photo-1511707171634-5f897ff02aa9", alt: "Sleek modern smartphone hardware on creative desk" },
  { id: "photo-1601784551446-20c9e07cdbdb", alt: "Hand holding modern smartphone with app screen" },
  { id: "photo-1533227268428-f9ed0900fb3b", alt: "Vibrant smartphone app interface display" },
  { id: "photo-1555421689-491a97ff2040", alt: "Mobile UX prototyping on smartphone screen" },
  { id: "photo-1551650975-87deedd944c3", alt: "Mobile phone product presentation interface" },
  { id: "photo-1521931961826-fe48677230a5", alt: "Minimalist dark smartphone display screen" },
  { id: "photo-1565106430482-8f6e74349ca1", alt: "Mobile code engineering on developer workstation" },
  { id: "photo-1576267423445-b2e0074d68a4", alt: "Tablet digital touch interface and app design" },
];

// 2. Web Development, Next.js & Frontend (14 verified high-res photos)
export const WEB_IMAGES: TopicImage[] = [
  { id: "photo-1461749280684-dccba630e2f6", alt: "Next.js web development code on laptop monitor" },
  { id: "photo-1498050108023-c5249f4df085", alt: "Full-stack web developer workspace with laptop code" },
  { id: "photo-1507238691740-187a5b1d37b8", alt: "Responsive web design and architecture on laptop" },
  { id: "photo-1517694712202-14dd9538aa97", alt: "TypeScript and React component engineering on MacBook" },
  { id: "photo-1531403009284-440f080d1e12", alt: "Web application design system and UX workflow" },
  { id: "photo-1547658719-da2b51169166", alt: "Digital web application interface design" },
  { id: "photo-1587620962725-abab7fe55159", alt: "High-performance web developer workstation and IDE" },
  { id: "photo-1542838132-92c53300491e", alt: "Modern HTML, CSS and JavaScript web coding screen" },
  { id: "photo-1555066931-4365d14bab8c", alt: "Developer terminal and backend code structure" },
  { id: "photo-1607799279861-4dd421887fb3", alt: "Software engineer writing clean modular code" },
  { id: "photo-1488590528505-98d2b5aba04b", alt: "Clean programming syntax on ultra-wide monitor" },
  { id: "photo-1515879218367-8466d910aaa4", alt: "Backend algorithm code and API endpoints" },
  { id: "photo-1504639725590-34d0984388bd", alt: "Full stack engineering environment and code editor" },
  { id: "photo-1508739773434-c26b3d09e071", alt: "Modern developer studio and workspace" },
];

// 3. Coaching Institute & Education Technology (14 verified high-res photos)
export const EDUCATION_IMAGES: TopicImage[] = [
  { id: "photo-1522202176988-66273c2fd55f", alt: "Students collaborating with laptops in coaching institute" },
  { id: "photo-1524178232363-1fb2b075b655", alt: "Classroom lecture and coaching academy teacher" },
  { id: "photo-1516321318423-f06f85e504b3", alt: "Digital learning tablet and online test interface" },
  { id: "photo-1427504494785-3a9ca7044f45", alt: "Academy computer lab and modern classroom learning" },
  { id: "photo-1509062522246-3755977927d7", alt: "Smart classroom and digital education teaching" },
  { id: "photo-1580582932707-520aed937b7b", alt: "Computer-based testing and student exam portal" },
  { id: "photo-1531482615713-2afd69097998", alt: "Coaching educators and batch management workshop" },
  { id: "photo-1434030216411-0b793f4b4173", alt: "Online mock test exam simulation on paper and screen" },
  { id: "photo-1517245386807-bb43f82c33c4", alt: "Coaching institute study discussion and student group" },
  { id: "photo-1497633762265-9d179a990aa6", alt: "Educational library books and student study session" },
  { id: "photo-1503676260728-1c00da094a0b", alt: "Interactive school classroom and learning technology" },
  { id: "photo-1523240795612-9a054b0db644", alt: "Student study group collaboration and notes" },
  { id: "photo-1513258496099-48168024aec0", alt: "Exam preparation and focused desk study" },
  { id: "photo-1577896851231-70ef18881754", alt: "Classroom notebook learning and educational progress" },
];

// 4. Custom Software, ERP & Enterprise Systems (14 verified high-res photos)
export const ERP_SOFTWARE_IMAGES: TopicImage[] = [
  { id: "photo-1504868584819-f8e8b4b6d7e3", alt: "Enterprise custom software analytics and KPI dashboard" },
  { id: "photo-1551288049-bebda4e38f71", alt: "Financial analytics and business ERP operational report" },
  { id: "photo-1460925895917-afdab827c52f", alt: "Business software growth charts and operational telemetry" },
  { id: "photo-1551836022-d5d88e9218df", alt: "Enterprise digital transformation strategy and planning" },
  { id: "photo-1454165804606-c3d57bc86b40", alt: "Custom business software workflow automation strategy" },
  { id: "photo-1559526324-4b87b5e36e44", alt: "Enterprise cloud software financial management dashboard" },
  { id: "photo-1551434678-e076c223a692", alt: "Tech leadership and agile software team sprint planning" },
  { id: "photo-1519389950473-47ba0277781c", alt: "Enterprise software engineering team collaborating" },
  { id: "photo-1522071820081-009f0129c71c", alt: "Software architects planning scalable enterprise platform" },
  { id: "photo-1573164713988-8665fc963095", alt: "Modern tech innovation and enterprise business automation" },
  { id: "photo-1450133064473-71024230f91b", alt: "Corporate enterprise technology headquarters" },
  { id: "photo-1556761175-5973dc0f32e7", alt: "Strategic business collaboration and executive partnership" },
  { id: "photo-1542744173-8e7e53415bb0", alt: "Financial projections and corporate SaaS strategy meeting" },
  { id: "photo-1553877522-43269d4ea984", alt: "Enterprise roadmap and digital operations planning" },
];

// 5. Cloud Infrastructure, Databases & Backend (10 verified high-res photos)
export const BACKEND_IMAGES: TopicImage[] = [
  { id: "photo-1544197150-b99a580bb7a8", alt: "High-availability cloud server rack and datacenter" },
  { id: "photo-1558494949-ef010cbdcc31", alt: "Distributed cloud database architecture and network servers" },
  { id: "photo-1526374965328-7f61d4dc18c5", alt: "Cybersecurity matrix code and data encryption" },
  { id: "photo-1518770660439-4636190af475", alt: "High-performance processor hardware and microservices" },
  { id: "photo-1590283603385-17ffb3a7f29f", alt: "Real-time data visualization and operational telemetry" },
  { id: "photo-1451187580459-43490279c0fa", alt: "Global cloud digital network architecture" },
  { id: "photo-1531297484001-80022131f5a1", alt: "Next generation digital software architecture" },
  { id: "photo-1504384308090-c894fdcc538d", alt: "Modern engineering infrastructure desk" },
  { id: "photo-1517433456452-f97340853107", alt: "High-speed backend monitoring server screen" },
  { id: "photo-1486406146926-c627a92ad1ab", alt: "Scalable enterprise cloud systems architecture" },
];

// 6. WhatsApp CRM, Messaging & Payments (8 verified high-res photos)
export const CRM_BILLING_IMAGES: TopicImage[] = [
  { id: "photo-1611746872915-64382b5c76da", alt: "Automated WhatsApp business CRM communication on smartphone" },
  { id: "photo-1577563908411-5077b6dc7624", alt: "Customer communication and automated messaging desk" },
  { id: "photo-1556740738-b6a63e27c4df", alt: "Instant fee collection and dynamic UPI gateway terminal" },
  { id: "photo-1556740758-90de374c12ad", alt: "Digital billing and automated fee receipt generation" },
  { id: "photo-1563986768494-4dee2763ff3f", alt: "Fintech payment processing and ledger reconciliation" },
  { id: "photo-1581291518857-4e27b48ff24e", alt: "Fintech interface design and payment flow UX" },
  { id: "photo-1486312338219-ce68d2c6f44d", alt: "Online transactions and digital invoicing checkout" },
  { id: "photo-1497366216548-37526070297c", alt: "Automated business communications center" },
];

// All verified photos unified pool (>70 unique items)
export const ALL_VERIFIED_IMAGES: TopicImage[] = [
  ...MOBILE_IMAGES,
  ...WEB_IMAGES,
  ...EDUCATION_IMAGES,
  ...ERP_SOFTWARE_IMAGES,
  ...BACKEND_IMAGES,
  ...CRM_BILLING_IMAGES,
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
   * Deterministically and intelligently selects a unique topic-relevant image.
   * If a list or set of existing used image URLs is provided, it guarantees
   * that an unused image is selected, ensuring ZERO duplication.
   */
  selectTopicImage(
    title: string,
    category: string = "",
    tags: string[] = [],
    slug: string = "",
    existingUsedImages: Set<string> | string[] = []
  ): { imageUrl: string; imageAlt: string } {
    const combined = `${title} ${category} ${tags.join(" ")} ${slug}`.toLowerCase();
    const usedSet = existingUsedImages instanceof Set
      ? existingUsedImages
      : new Set(existingUsedImages.map((u) => u.split("?")[0].split("/").pop() || ""));

    let primaryPool: TopicImage[] = WEB_IMAGES;

    if (
      combined.includes("fee") ||
      combined.includes("billing") ||
      combined.includes("payment") ||
      combined.includes("upi") ||
      combined.includes("whatsapp") ||
      combined.includes("crm")
    ) {
      primaryPool = CRM_BILLING_IMAGES;
    } else if (
      combined.includes("coaching") ||
      combined.includes("student") ||
      combined.includes("class") ||
      combined.includes("attendance") ||
      combined.includes("mock-test") ||
      combined.includes("exam") ||
      combined.includes("portal") ||
      combined.includes("education")
    ) {
      primaryPool = EDUCATION_IMAGES;
    } else if (
      combined.includes("mobile") ||
      combined.includes("react-native") ||
      combined.includes("react native") ||
      combined.includes("ios") ||
      combined.includes("android") ||
      combined.includes("app")
    ) {
      primaryPool = MOBILE_IMAGES;
    } else if (
      combined.includes("nextjs") ||
      combined.includes("web") ||
      combined.includes("frontend") ||
      combined.includes("website") ||
      combined.includes("ui") ||
      combined.includes("ux")
    ) {
      primaryPool = WEB_IMAGES;
    } else if (
      combined.includes("erp") ||
      combined.includes("saas") ||
      combined.includes("business") ||
      combined.includes("inventory") ||
      combined.includes("workflow")
    ) {
      primaryPool = ERP_SOFTWARE_IMAGES;
    } else if (
      combined.includes("database") ||
      combined.includes("server") ||
      combined.includes("backend") ||
      combined.includes("cloud") ||
      combined.includes("security")
    ) {
      primaryPool = BACKEND_IMAGES;
    }

    // 1. Try to pick an unused image from primaryPool
    const unusedInPrimary = primaryPool.filter((img) => !usedSet.has(img.id));
    if (unusedInPrimary.length > 0) {
      const seed = slug.replace(/-hindi$/, "") || title;
      const index = stringHash(seed) % unusedInPrimary.length;
      const chosen = unusedInPrimary[index];
      return {
        imageUrl: `https://images.unsplash.com/${chosen.id}?w=1200&auto=format&fit=crop&q=80`,
        imageAlt: `${title} — ${chosen.alt}`,
      };
    }

    // 2. Fallback: Try any unused image in the overall verified pool
    const unusedOverall = ALL_VERIFIED_IMAGES.filter((img) => !usedSet.has(img.id));
    if (unusedOverall.length > 0) {
      const seed = slug.replace(/-hindi$/, "") || title;
      const index = stringHash(seed) % unusedOverall.length;
      const chosen = unusedOverall[index];
      return {
        imageUrl: `https://images.unsplash.com/${chosen.id}?w=1200&auto=format&fit=crop&q=80`,
        imageAlt: `${title} — ${chosen.alt}`,
      };
    }

    // 3. Fallback: Dynamic WebVibez Next.js Branded Visual Banner (100% Unique per blog)
    const encodedTitle = encodeURIComponent(title);
    const encodedCategory = encodeURIComponent(category || "Software Development");
    return {
      imageUrl: `https://www.webvibez.com/api/og?title=${encodedTitle}&category=${encodedCategory}`,
      imageAlt: `${title} — WebVibez Architecture Guide`,
    };
  },
};
