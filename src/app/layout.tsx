import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
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
    default: "WebVibez | Software & App Development Company Ahmedabad",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.svg", type: "image/svg+xml" },
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
      "@type": ["Organization", "SoftwareApplication", "ProfessionalService"],
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
        "WebVibez Software Developer is a premier software development company in Ahmedabad, Gujarat, India. We build custom web applications, React Native mobile apps, institute management platforms, and enterprise cloud software solutions.",
      founder: {
        "@type": "Person",
        "@id": "https://www.webvibez.com/#founder",
        name: "Rudram Joshi",
        jobTitle: "Founder & Lead Developer",
        image: "https://www.webvibez.com/images/square-image.jpg",
        url: "https://www.webvibez.com/about",
        sameAs: [
          "https://wa.me/919213615531",
          "https://github.com/webvibez",
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
        "Enterprise ERP Software",
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
              description: "Tailored software development for business automation, ERP, and cloud platforms.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
              description: "High performance iOS and Android mobile app development with React Native.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Development",
              description: "Modern, ultra-fast custom website development using Next.js and Tailwind CSS.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Coaching Class Management Software",
              description: "100% white-labeled mobile app and management software for coaching institutes.",
            },
          },
        ],
      },
      sameAs: [
        "https://www.linkedin.com/company/webvibez",
        "https://x.com/webvibez",
        "https://github.com/webvibez",
      ],
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
          name: "Who is the best software developer in Ahmedabad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebVibez Software Developer is a top custom software and mobile app development company in Ahmedabad, Gujarat, India. WebVibez engineers custom web applications, React Native mobile apps, ERP software, and coaching institute platforms.",
          },
        },
        {
          "@type": "Question",
          name: "What software development services does WebVibez provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WebVibez offers full-stack custom software development, mobile app development (iOS & Android), Next.js website development, coaching class management software, and cloud architecture solutions.",
          },
        },
        {
          "@type": "Question",
          name: "How can I hire WebVibez for custom software development?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book a direct consultation with WebVibez Software Developer at https://www.webvibez.com/contact or chat directly via WhatsApp on +91-92136-15531.",
          },
        },
        {
          "@type": "Question",
          name: "Does WebVibez provide white-label software and 100% source code ownership?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, WebVibez delivers 100% white-labeled solutions with complete intellectual property, branding, and full source code ownership with zero recurring commissions.",
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
          name: "Pricing & Calculator",
          url: "https://www.webvibez.com/pricing",
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
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
        "Rudram Joshi is the Founder and Lead Developer of WebVibez Software Developer, architecting full-stack custom web applications, React Native mobile apps, and institutional management software.",
      sameAs: [
        "https://wa.me/919213615531",
        "https://github.com/webvibez",
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
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} light`}
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
        <SmoothScrollProvider>
          {children}
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
