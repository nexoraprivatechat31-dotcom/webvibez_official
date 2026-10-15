import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development Company in Ahmedabad",
  description:
    "Custom software development in Ahmedabad. We build tailored enterprise web systems, scalable SaaS platforms, ERP automation, and high-security cloud APIs.",
  alternates: {
    canonical: "https://www.webvibez.com/services/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development Company in Ahmedabad | WebVibez",
    description:
      "Bespoke enterprise software, scalable SaaS platforms, automated ERP workflows, and secure cloud APIs engineered in Ahmedabad, Gujarat.",
    url: "https://www.webvibez.com/services/custom-software-development",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Custom Software Development Company in Ahmedabad — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Company in Ahmedabad | WebVibez",
    description:
      "Bespoke enterprise software, scalable SaaS platforms, automated ERP workflows, and secure cloud APIs engineered in Ahmedabad, Gujarat.",
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
          "name": "Custom Software Development",
          "item": "https://www.webvibez.com/services/custom-software-development",
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
