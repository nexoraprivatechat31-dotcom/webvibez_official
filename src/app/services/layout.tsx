import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software, Mobile App & Web Development Services",
  description:
    "Explore WebVibez services: custom software development, high-performance iOS and Android mobile apps, responsive web applications, and coaching-class management platforms.",
  alternates: {
    canonical: "https://webvibez.in/services",
  },
  openGraph: {
    title: "Custom Software, Mobile App & Web Development Services | WebVibez",
    description:
      "Explore WebVibez services: custom software development, high-performance iOS and Android mobile apps, responsive web applications, and coaching-class management platforms.",
    url: "https://webvibez.in/services",
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
          "item": "https://webvibez.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://webvibez.in/services",
        },
      ],
    },
    {
      "@type": "Service",
      "serviceType": "Custom Software, Mobile App & Web Development",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.in",
      },
      "areaServed": {
        "@type": "Place",
        "name": "Ahmedabad, Gujarat, India",
      },
      "description":
        "End-to-end custom software development, React Native mobile apps, Next.js web applications, and coaching institute platforms.",
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
