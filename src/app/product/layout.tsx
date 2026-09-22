import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Features | Coaching Software, Mobile App Platform & Systems",
  description:
    "Explore WebVibez flagship products & 11 core platform features: branded iOS/Android apps, live lecture streaming, CBT exam engine, hardware DRM anti-piracy, UPI fee collection, and multi-campus ERP.",
  alternates: {
    canonical: "https://webvibez.in/product",
  },
  openGraph: {
    title: "Products & Features | Coaching Software, Mobile App Platform & Systems | WebVibez",
    description:
      "Explore WebVibez flagship products & 11 core platform features: branded iOS/Android apps, live lecture streaming, CBT exam engine, hardware DRM anti-piracy, UPI fee collection, and multi-campus ERP.",
    url: "https://webvibez.in/product",
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
          "name": "Product",
          "item": "https://webvibez.in/product",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "name": "WebVibez Academy Coaching Management Platform",
      "operatingSystem": "iOS, Android, Web",
      "applicationCategory": "EducationalApplication, BusinessApplication",
      "description":
        "Complete coaching-class management software and branded mobile application featuring student records, real-time attendance, test results, rank analysis, fee tracking, and push notifications.",
      "offers": {
        "@type": "Offer",
        "price": "Contact for pricing",
        "priceCurrency": "INR",
      },
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.in",
      },
    },
  ],
};

export default function ProductLayout({
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
