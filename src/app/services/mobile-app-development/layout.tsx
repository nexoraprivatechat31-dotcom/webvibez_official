import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Ahmedabad",
  description:
    "WebVibez is a mobile app development company in Ahmedabad, Gujarat. We engineer high-performance cross-platform iOS and Android mobile apps using React Native.",
  alternates: {
    canonical: "https://webvibez.com/services/mobile-app-development",
  },
  openGraph: {
    title: "Mobile App Development Company in Ahmedabad",
    description:
      "Native-performance iOS and Android mobile applications built with React Native, offline encryption, and official store publishing in Ahmedabad, Gujarat.",
    url: "https://webvibez.com/services/mobile-app-development",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Mobile App Development Company in Ahmedabad — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development Company in Ahmedabad",
    description:
      "Native-performance iOS and Android mobile applications built with React Native, offline encryption, and official store publishing in Ahmedabad, Gujarat.",
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
          "name": "Mobile App Development",
          "item": "https://webvibez.com/services/mobile-app-development",
        },
      ],
    },
    {
      "@type": "Service",
      "name": "Mobile App Development Services in Ahmedabad",
      "serviceType": "Mobile App Development, React Native Apps & Cross-Platform Mobile Engineering",
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
        "Cross-platform iOS and Android mobile application development with React Native, offline security caching, and direct store publishing in Ahmedabad, Gujarat.",
    },
  ],
};

export default function MobileAppDevLayout({
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
