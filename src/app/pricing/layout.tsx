import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predictable Investment & Pricing Plans",
  description:
    "Explore transparent software engineering packages: custom mobile apps, web applications, and coaching management software with no hidden fees.",
  alternates: {
    canonical: "https://webvibez.com/pricing",
  },
  openGraph: {
    title: "Predictable Investment & Pricing Plans | WebVibez",
    description:
      "Explore transparent software engineering packages: custom mobile apps, web applications, and coaching management software with no hidden fees.",
    url: "https://webvibez.com/pricing",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/api/og?title=Transparent%20Pricing%20%26%20Packages&category=Engineering%20Investment&tag=Zero%20Hidden%20Fees%20%E2%80%A2%20Direct%20Ownership",
        width: 1200,
        height: 630,
        alt: "WebVibez Pricing and Investment Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Predictable Investment & Pricing Plans | WebVibez",
    description:
      "Explore transparent software engineering packages: custom mobile apps, web applications, and coaching management software with no hidden fees.",
    images: [
      "https://webvibez.com/api/og?title=Transparent%20Pricing%20%26%20Packages&category=Engineering%20Investment&tag=Zero%20Hidden%20Fees%20%E2%80%A2%20Direct%20Ownership",
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
          "name": "Pricing",
          "item": "https://webvibez.com/pricing",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Pricing & Plans",
      "url": "https://webvibez.com/pricing",
      "description":
        "Transparent software pricing packages for custom apps, websites, and coaching platforms.",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.com",
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
