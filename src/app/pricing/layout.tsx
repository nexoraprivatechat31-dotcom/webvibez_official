import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predictable Investment & Pricing Plans",
  description:
    "Explore transparent software engineering packages: custom mobile apps, web applications, and coaching management software with no hidden fees.",
  alternates: {
    canonical: "https://webvibez.in/pricing",
  },
  openGraph: {
    title: "Predictable Investment & Pricing Plans | WebVibez",
    description:
      "Explore transparent software engineering packages: custom mobile apps, web applications, and coaching management software with no hidden fees.",
    url: "https://webvibez.in/pricing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
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
      "name": "Pricing",
      "item": "https://webvibez.in/pricing",
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
