import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development in Ahmedabad",
  description:
    "WebVibez is a custom software development company in Ahmedabad, Gujarat. We engineer tailored enterprise software, scalable SaaS platforms, automated ERPs, and cloud APIs.",
  alternates: {
    canonical: "https://webvibez.com/services/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development in Ahmedabad",
    description:
      "Bespoke enterprise software, scalable SaaS architectures, automated ERP workflows, and secure APIs engineered for growing businesses in Ahmedabad, Gujarat.",
    url: "https://webvibez.com/services/custom-software-development",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Custom Software Development Company in Ahmedabad — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development in Ahmedabad",
    description:
      "Bespoke enterprise software, scalable SaaS architectures, automated ERP workflows, and secure APIs engineered for growing businesses in Ahmedabad, Gujarat.",
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
          "name": "Custom Software Development",
          "item": "https://webvibez.com/services/custom-software-development",
        },
      ],
    },
    {
      "@type": "Service",
      "name": "Custom Software Development Services in Ahmedabad",
      "serviceType": "Custom Software Development, Enterprise ERP & SaaS Architecture",
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
        "Custom software development, SaaS engineering, enterprise ERP workflow automation, and microservices in Ahmedabad, Gujarat.",
    },
  ],
};

export default function CustomSoftwareLayout({
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
