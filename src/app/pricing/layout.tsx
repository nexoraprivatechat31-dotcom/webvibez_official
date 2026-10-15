import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching App & Software Pricing Plans",
  description:
    "Transparent software packages for coaching apps, custom websites, and mobile applications with zero per-student commissions and flat annual pricing.",
  alternates: {
    canonical: "https://www.webvibez.com/pricing",
  },
  openGraph: {
    title: "Coaching App & Software Pricing Plans | WebVibez",
    description:
      "Flat, transparent software pricing for coaching apps, mobile applications, and Next.js websites with zero commissions and direct bank settlements.",
    url: "https://www.webvibez.com/pricing",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "WebVibez Pricing and Investment Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching App & Software Pricing Plans | WebVibez",
    description:
      "Flat, transparent software pricing for coaching apps, mobile applications, and Next.js websites with zero commissions.",
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
          "name": "Pricing",
          "item": "https://www.webvibez.com/pricing",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Pricing & Plans",
      "url": "https://www.webvibez.com/pricing",
      "description":
        "Transparent software pricing packages for custom apps, websites, and coaching platforms.",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
      },
    },
  ],
};

export default function PricingLayout({
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
