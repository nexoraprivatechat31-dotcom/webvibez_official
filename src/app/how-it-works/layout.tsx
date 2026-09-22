import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How WebVibez Works | 3-Step Development & Deployment Journey",
  description:
    "Discover the WebVibez agile development methodology: Architecture & Scoping, Rapid Iteration & Continuous QA, and Zero-Downtime Multi-Platform Production Launch.",
  alternates: {
    canonical: "https://webvibez.in/how-it-works",
  },
  openGraph: {
    title: "How WebVibez Works | 3-Step Development Journey | WebVibez",
    description:
      "Discover the WebVibez agile development methodology: Architecture & Scoping, Rapid Iteration & Continuous QA, and Zero-Downtime Multi-Platform Production Launch.",
    url: "https://webvibez.in/how-it-works",
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
      "name": "How It Works",
      "item": "https://webvibez.in/how-it-works",
    },
  ],
};

export default function HowItWorksLayout({
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
