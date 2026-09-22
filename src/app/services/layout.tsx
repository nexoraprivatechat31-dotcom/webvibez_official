import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software, Website & Mobile App Development Services in Ahmedabad",
  description:
    "Explore WebVibez engineering services: custom software development, high-performance Next.js websites, React Native iOS and Android apps, and coaching management platforms in Ahmedabad, Gujarat.",
  alternates: {
    canonical: "https://webvibez.com/services",
  },
  openGraph: {
    title: "Software, Website & Mobile App Development Services in Ahmedabad | WebVibez",
    description:
      "Explore WebVibez engineering services: custom software development, high-performance Next.js websites, React Native iOS and Android apps, and coaching management platforms in Ahmedabad, Gujarat.",
    url: "https://webvibez.com/services",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Software Development Services in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software, Website & Mobile App Development Services in Ahmedabad | WebVibez",
    description:
      "Explore WebVibez engineering services: custom software development, high-performance Next.js websites, React Native iOS and Android apps, and coaching management platforms in Ahmedabad, Gujarat.",
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
      ],
    },
    {
      "@type": "Service",
      "name": "Software Development Services in Ahmedabad",
      "serviceType": "Custom Software, Website Development & Mobile App Engineering",
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
        "End-to-end bespoke software engineering: Next.js responsive websites, React Native mobile apps, automated ERP workflows, and coaching institute platforms in Ahmedabad.",
    },
  ],
};

export default function ServicesLayout({
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
