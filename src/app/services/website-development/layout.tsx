import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Company in Ahmedabad",
  description:
    "WebVibez is a website development company in Ahmedabad, Gujarat. We build high-performance Next.js websites, corporate web portals, and responsive business applications.",
  alternates: {
    canonical: "https://webvibez.com/services/website-development",
  },
  openGraph: {
    title: "Website Development Company in Ahmedabad",
    description:
      "High-performance Next.js websites, corporate portals, and responsive web applications built for speed, clean architecture, and conversion in Ahmedabad, Gujarat.",
    url: "https://webvibez.com/services/website-development",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Website Development Company in Ahmedabad — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Ahmedabad",
    description:
      "High-performance Next.js websites, corporate portals, and responsive web applications built for speed, clean architecture, and conversion in Ahmedabad, Gujarat.",
    images: [
      "https://webvibez.com/logo.jpeg",
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://webvibez.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://webvibez.com/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Website Development",
          "item": "https://webvibez.com/services/website-development",
        },
      ],
    },
    {
      "@type": "Service",
      "name": "Website Development Services in Ahmedabad",
      "serviceType": "Website Development, Next.js Portals & Web Applications",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ahmedabad",
          "addressRegion": "Gujarat",
          "addressCountry": "IN",
        },
      },
      "areaServed": [
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      "description":
        "Custom, responsive, SEO-ready website development and high-converting web applications with modern Next.js and React architecture in Ahmedabad, Gujarat.",
    },
  ],
};

export default function WebsiteDevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
