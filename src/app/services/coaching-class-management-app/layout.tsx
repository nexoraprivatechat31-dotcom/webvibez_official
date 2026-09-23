import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching Class Management App Development",
  description:
    "WebVibez builds custom branded coaching class management applications, student portal systems, CBT exam engines, and automated fee collection platforms in Ahmedabad, Gujarat.",
  alternates: {
    canonical: "https://webvibez.com/services/coaching-class-management-app",
  },
  openGraph: {
    title: "Coaching Class Management App Development",
    description:
      "Custom branded coaching institute apps, NTA CBT mock exam engine, hardware DRM lecture protection, and automated UPI fee collection in Ahmedabad, Gujarat.",
    url: "https://webvibez.com/services/coaching-class-management-app",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Coaching Class Management App Development in Ahmedabad — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching Class Management App Development",
    description:
      "Custom branded coaching institute apps, NTA CBT mock exam engine, hardware DRM lecture protection, and automated UPI fee collection in Ahmedabad, Gujarat.",
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
          "name": "Coaching Class Management App",
          "item": "https://webvibez.com/services/coaching-class-management-app",
        },
      ],
    },
    {
      "@type": "Service",
      "name": "Coaching Class Management App Development",
      "serviceType": "Coaching Class Management Software, Student Mobile Apps & Institute ERP",
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
        "Development of custom coaching-class mobile apps with biometric attendance, live lecture streaming, CBT exam simulation, and automated fee collections in Ahmedabad, Gujarat.",
    },
  ],
};

export default function CoachingAppLayout({
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
