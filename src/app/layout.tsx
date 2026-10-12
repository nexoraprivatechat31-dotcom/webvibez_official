import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8FAFC",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.webvibez.com"),
  title: {
    default: "Software Development Company in Ahmedabad | WebVibez",
    template: "%s | WebVibez",
  },
  description:
    "WebVibez is a leading custom software development company in Ahmedabad, Gujarat, India. Expert software developers creating high-performance websites, React Native mobile apps, enterprise cloud software, and white-label coaching management systems.",
  applicationName: "WebVibez Software Developer",
  authors: [
    { name: "Rudram Joshi", url: "https://www.webvibez.com/about" },
    { name: "WebVibez Software Developer", url: "https://www.webvibez.com" },
  ],
  creator: "Rudram Joshi — WebVibez Software Developer",
  publisher: "WebVibez Software Developer",
  alternates: {
    canonical: "https://www.webvibez.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.webvibez.com",
    siteName: "WebVibez Software Developer",
    title: "WebVibez | Custom Software & Mobile App Development",
    description:
      "Looking for top software developers? WebVibez engineers custom software, high-speed Next.js websites, iOS & Android mobile apps, and coaching institute ERP platforms.",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        secureUrl: "https://www.webvibez.com/logo.jpeg",
        width: 1080,
        height: 987,
        type: "image/jpeg",
        alt: "WebVibez Software Developer Logo",
      },
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        secureUrl: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "WebVibez Software Developer — Custom Software, Mobile Apps & Website Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebVibez | Custom Software & Mobile App Development",
    description:
      "Top custom software developers in Ahmedabad. We build custom websites, iOS/Android mobile apps, and cloud software platforms.",
    images: [
      "https://www.webvibez.com/og-image.jpeg",
      "https://www.webvibez.com/logo.jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
  keywords: [
    // 1. Primary Brand Variations
    "webvibez",
    "web vibez",
    "webvibez software",
    "webvibez software developer",
    "webvibez developer",
    "webvibez.com",
    "webvibez ahmedabad",
    "webvibez official",

    // 2. Core Software & Developer Queries
    "software developer",
    "software developers",
    "software development",
    "software company",
    "software development company",
    "custom software development",
    "custom software developer",
    "custom software development company",
    "software development agency",
    "software solutions",
    "software developer near me",
    "software engineer",

    // 3. Web & App Developer Queries
    "website developer",
    "web developer",
    "web development company",
    "website development company",
    "mobile app developer",
    "app developer",
    "app development company",
    "mobile app development company",
    "react native developer",
    "nextjs developer",
    "full stack software developer",
    "frontend developer",
    "backend developer",

    // 4. Localized Ahmedabad & India Queries
    "software developer in ahmedabad",
    "software development company in ahmedabad",
    "software company in ahmedabad",
    "best software developer in ahmedabad",
    "top software company ahmedabad",
    "website development company in ahmedabad",
    "mobile app development company ahmedabad",
    "web development ahmedabad",
    "app developer in ahmedabad",
    "software company in gujarat",
    "software development company india",

    // 5. Product & Domain Niche Queries
    "coaching class management software",
    "coaching management app",
    "institute management software",
    "tuition class management software developer",
    "white label mobile app developer",
    "custom erp software developer",
    "saas software developer",
  ],
};

const jsonLdGlobal = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.webvibez.com/#organization",
      name: "WebVibez Software Developer",
      alternateName: [
        "WebVibez",
        "WebVibez Software",
        "WebVibez Developer",
        "Web Vibez",
        "WebVibez Technologies",
        "webvibez.com",
      ],
      url: "https://www.webvibez.com",
      logo: "https://www.webvibez.com/favicon.png",
      image: "https://www.webvibez.com/logo.jpeg",
      description:
        "WebVibez Software Developer is a premier custom software development company in Ahmedabad, Gujarat, India. WebVibez engineers high-performance web applications, React Native mobile apps (iOS & Android), coaching institute management software, and enterprise cloud solutions.",
      founder: {
        "@type": "Person",
        "@id": "https://www.webvibez.com/#founder",
        name: "Rudram Joshi",
        jobTitle: "Founder & Lead Software Engineer",
        image: "https://www.webvibez.com/images/square-image.jpg",
        url: "https://www.webvibez.com/about",
        sameAs: [
          "https://wa.me/919213615531",
          "https://in.linkedin.com/in/rudram-joshi-963a48332",
          "https://github.com/webvibez",
          "https://dev.to/rudram_joshi",
          "https://x.com/Rudram9524",
        ],
      },
      telephone: "+91-92136-15531",
      email: "contact@webvibez.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ahmedabad",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 23.0225,
        longitude: 72.5714,
      },
      areaServed: [
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      knowsAbout: [
        "Software Development",
        "Custom Software Development",
        "Web Development",
        "Mobile App Development",
        "React Native",
        "Next.js",
        "Coaching Management Software",
        "Institute Management Systems",
        "Enterprise ERP Software",
        "AI Solutions and Automation",
        "Full Stack Development",
        "Cloud Computing",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software Development",
              description: "Tailored software development for business automation, custom ERP systems, and cloud architectures.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile Application Development",
              description: "Native-performance iOS and Android mobile app development using React Native with offline sync.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website & Web Application Development",
              description: "Ultra-fast custom web applications engineered with Next.js, TypeScript, and modern responsive design.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Coaching Institute Management Software",
              description: "100% white-labeled mobile app and ERP software for tuition classes and coaching institutes with attendance, test results, and automated fee collection.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Solutions & Business Automation",
              description: "Automated business workflows, intelligent bots, and LLM-powered integrations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX Design & Prototyping",
              description: "Modern, high-conversion UI/UX interface design and dynamic digital design systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "API Development & Backend Integration",
              description: "Scalable REST & WebSocket backend services with robust database architecture.",
            },
          },
        ],
      },
      sameAs: [
        "https://play.google.com/store/apps/details?id=com.webvibez.classes",
        "https://www.linkedin.com/company/webvibez-software-devlopers/",
        "https://in.linkedin.com/in/rudram-joshi-963a48332",
        "https://github.com/webvibez",
        "https://dev.to/rudram_joshi",
        "https://goodfirms.co/company/webvibez-software-developer",
        "https://www.instagram.com/webvibez_softdev?stkn=amd6a3B4MDF4bzJy",
        "https://x.com/Rudram9524",
        "https://www.facebook.com/share/19k7jWKD2H/",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.webvibez.com/#webvibez-classes-app",
      name: "WebVibez Software Devloper Coaching Application",
      operatingSystem: "Android, iOS",
      applicationCategory: "EducationalApplication, BusinessApplication",
      description: "Official white-label coaching institute management mobile application engineered and published on Google Play Store by WebVibez Software Developer (Package: com.webvibez.classes).",
      author: {
        "@id": "https://www.webvibez.com/#organization",
      },
      installUrl: "https://play.google.com/store/apps/details?id=com.webvibez.classes",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: "Official demo and 100% white-label custom mobile & web platform for coaching institutes.",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.webvibez.com/#enzochat-platform",
      name: "EnzoChat — Encrypted Private Messaging Platform",
      operatingSystem: "Web, iOS, Android",
      applicationCategory: "CommunicationApplication, SecurityApplication",
      description: "Zero-knowledge end-to-end encrypted messaging web platform engineered by WebVibez Software Developer with sub-50ms WebSocket tunneling, ephemeral payloads, and blind relay servers.",
      author: {
        "@id": "https://www.webvibez.com/#organization",
      },
      url: "https://enzochat.webvibez.com",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Live web platform and communication protocol.",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.webvibez.com/#website",
      url: "https://www.webvibez.com",
      name: "WebVibez Software Developer",
      alternateName: "WebVibez",
      description:
        "Official website of WebVibez Software Developer - Custom software, mobile app development, Next.js websites, and coaching-class management platforms in Ahmedabad.",
      publisher: {
        "@id": "https://www.webvibez.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.webvibez.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.webvibez.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is WebVibez Software Developer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebVibez Software Developer is a software development company located in Ahmedabad, Gujarat, India. WebVibez specializes in custom software development, mobile application engineering (iOS & Android using React Native), high-performance Next.js websites, and white-label coaching institute management software.",
          },
        },
        {
          "@type": "Question",
          name: "Where is WebVibez located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebVibez Software Developer is headquartered in Ahmedabad, Gujarat, India (PIN: 380001), serving clients locally across Gujarat, nationally across India, and globally in the US and UK.",
          },
        },
        {
          "@type": "Question",
          name: "Who founded WebVibez?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebVibez was founded by Rudram Joshi, lead software developer and full-stack systems architect.",
          },
        },
        {
          "@type": "Question",
          name: "Does WebVibez develop Android and iOS mobile applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. WebVibez designs and engineers production-ready Android and iOS mobile applications using React Native. This includes official published applications such as 'WebVibez Software Devloper' (Package: com.webvibez.classes) on Google Play Store as well as high-performance secure web applications like EnzoChat (https://enzochat.webvibez.com).",
          },
        },
        {
          "@type": "Question",
          name: "Does WebVibez develop coaching institute management software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. WebVibez develops complete white-labeled coaching class management systems and custom branded mobile apps. Features include biometric and QR student attendance, automated WhatsApp fee collection with direct UPI links, test series percentile tracking, study material sharing, and parent communication portals.",
          },
        },
        {
          "@type": "Question",
          name: "Can WebVibez build custom business software and web applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. WebVibez builds bespoke business software, custom ERP platforms, web dashboards, and automation tools using modern tech stacks including Next.js, React, Node.js, TypeScript, PostgreSQL, and cloud APIs.",
          },
        },
        {
          "@type": "Question",
          name: "What services does WebVibez provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebVibez provides Custom Software Development, Mobile Application Development (iOS & Android), Website & Web App Development, Coaching Institute Management Software, AI Solutions & Automation, UI/UX Design, and API & Backend Integration.",
          },
        },
        {
          "@type": "Question",
          name: "How can businesses contact or hire WebVibez?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Businesses can contact WebVibez through their official website at https://www.webvibez.com/contact, email at contact@webvibez.com, or direct WhatsApp consultation at +91-92136-15531.",
          },
        },
        {
          "@type": "Question",
          name: "Does WebVibez provide white-labeling and ownership of client data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. WebVibez delivers 100% white-labeled solutions under your brand. For annual platform subscriptions, clients own their data, students, and content with a platform usage license. Custom development projects include full source code transfer as specified in the signed agreement.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.webvibez.com/#sitelinks",
      name: "WebVibez Software Developer Key Navigation",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Custom Software Development",
          url: "https://www.webvibez.com/services/custom-software-development",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Mobile App Development",
          url: "https://www.webvibez.com/services/mobile-app-development",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Website Development",
          url: "https://www.webvibez.com/services/website-development",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Coaching Class Management Software",
          url: "https://www.webvibez.com/services/coaching-class-management-app",
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Portfolio & Verified Work",
          url: "https://www.webvibez.com/portfolio",
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Products & White-Label Software",
          url: "https://www.webvibez.com/product",
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "Pricing & Calculator",
          url: "https://www.webvibez.com/pricing",
        },
        {
          "@type": "SiteNavigationElement",
          position: 8,
          name: "Contact & Consultation",
          url: "https://www.webvibez.com/contact",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.webvibez.com/#founder",
      name: "Rudram Joshi",
      jobTitle: "Founder & Lead Developer",
      worksFor: {
        "@id": "https://www.webvibez.com/#organization",
      },
      image: "https://www.webvibez.com/images/square-image.jpg",
      url: "https://www.webvibez.com/about",
      description:
        "Rudram Joshi is the Founder and Lead Developer of WebVibez Software Developer, architecting full-stack custom web applications, React Native mobile apps, and institutional management software in Ahmedabad, Gujarat.",
      sameAs: [
        "https://wa.me/919213615531",
        "https://in.linkedin.com/in/rudram-joshi-963a48332",
        "https://github.com/webvibez",
        "https://dev.to/rudram_joshi",
        "https://x.com/Rudram9524",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://firebase.googleapis.com" />
        <link rel="image_src" href="https://www.webvibez.com/logo.jpeg" />
        <meta property="og:image" content="https://www.webvibez.com/logo.jpeg" />
        <meta property="og:image:secure_url" content="https://www.webvibez.com/logo.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="987" />
        <meta property="og:image:alt" content="WebVibez Software Developer Logo" />
        <meta name="twitter:image" content="https://www.webvibez.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta itemProp="image" content="https://www.webvibez.com/logo.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGlobal) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  root.classList.remove('dark');
                  root.classList.add('light');
                  root.setAttribute('data-theme', 'light');
                  root.style.colorScheme = 'light';
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--ink)] text-[var(--text-primary)] transition-colors duration-300 font-sans selection:bg-[#0066FF]/30 selection:text-[#0066FF] antialiased overflow-x-hidden">
        <FirebaseAnalytics />
        <SmoothScrollProvider>
          {children}
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
