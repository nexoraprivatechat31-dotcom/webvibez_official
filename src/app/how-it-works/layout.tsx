import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | 3-Step Development & 7-Day Launch",
  description:
    "Discover the WebVibez agile development methodology: Architecture & Scoping, Rapid Iteration & Continuous QA, and Zero-Downtime Multi-Platform Production Launch in 7 days.",
  alternates: {
    canonical: "https://www.webvibez.com/how-it-works",
  },
  openGraph: {
    title: "How WebVibez Works | 3-Step Development & 7-Day Launch",
    description:
      "Discover the WebVibez agile development methodology: Architecture & Scoping, Rapid Iteration & Continuous QA, and Zero-Downtime Multi-Platform Production Launch in 7 days.",
    url: "https://www.webvibez.com/how-it-works",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "How WebVibez Works — 3-Step Development & Deployment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How WebVibez Works | 3-Step Development & 7-Day Launch",
    description:
      "Discover the WebVibez agile development methodology: Architecture & Scoping, Rapid Iteration & Continuous QA, and Zero-Downtime Multi-Platform Production Launch in 7 days.",
    images: [
      "https://www.webvibez.com/logo.jpeg",
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
          "item": "https://www.webvibez.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "How It Works",
          "item": "https://www.webvibez.com/how-it-works",
        },
      ],
    },
    {
      "@type": "HowTo",
      "name": "How to Launch Your Custom Software Platform with WebVibez in 7 Days",
      "description":
        "A 3-step rapid engineering process to take your coaching app or custom web/mobile software live in 7 days.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Day 01: Scoping & Architecture Blueprint",
          "text": "Share your coaching centre's identity, courses, and custom feature wishlist. We map data pipelines and UI architecture.",
        },
        {
          "@type": "HowToStep",
          "name": "Days 02–07: Core Build & Security Hardening",
          "text": "Engineers construct microservices, DRM pipelines, mobile client apps, and administrative controls with daily QA builds.",
        },
        {
          "@type": "HowToStep",
          "name": "Day 08 & Beyond: App Store & Play Store Launch",
          "text": "Deploying 100% white-labeled iOS and Android apps directly onto student phones with 99.9% uptime SLA.",
        },
      ],
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
