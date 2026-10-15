import { Metadata } from "next";

export const metadata: Metadata = {
  title: "White-Label Coaching App Development India",
  description:
    "Custom white-label coaching class management apps with CBT mock tests, biometric attendance sync, and automated fee collection in Ahmedabad, India.",
  alternates: {
    canonical: "https://www.webvibez.com/services/coaching-class-management-app",
  },
  openGraph: {
    title: "White-Label Coaching App Development India | WebVibez",
    description:
      "Custom branded coaching apps with CBT mock test simulator, biometric attendance, and automated UPI fee collection for institutes across India.",
    url: "https://www.webvibez.com/services/coaching-class-management-app",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "White-Label Coaching App Development India — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "White-Label Coaching App Development India | WebVibez",
    description:
      "Custom branded coaching apps with CBT mock test simulator, biometric attendance, and automated UPI fee collection for institutes across India.",
    images: ["https://www.webvibez.com/og-image.jpeg"],
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
          "item": "https://www.webvibez.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.webvibez.com/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Coaching Class Management App",
          "item": "https://www.webvibez.com/services/coaching-class-management-app",
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
        "url": "https://www.webvibez.com",
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
