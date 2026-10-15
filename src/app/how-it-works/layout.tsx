import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Agile Engineering & App Launch Process",
  description:
    "Explore WebVibez's 3-step agile engineering process: technical scoping, rapid React Native & Next.js development, and app store deployment in 5-7 days.",
  alternates: {
    canonical: "https://www.webvibez.com/how-it-works",
  },
  openGraph: {
    title: "Our Agile Engineering & App Launch Process | WebVibez",
    description:
      "Explore WebVibez's 3-step agile engineering process: technical scoping, rapid React Native & Next.js development, and app store deployment in 5-7 days.",
    url: "https://www.webvibez.com/how-it-works",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "How WebVibez Works — 3-Step Development & Deployment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Agile Engineering & App Launch Process | WebVibez",
    description:
      "Explore WebVibez's 3-step agile engineering process: technical scoping, rapid React Native & Next.js development, and app store deployment in 5-7 days.",
    images: ["https://www.webvibez.com/og-image.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.webvibez.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "How It Works",
          item: "https://www.webvibez.com/how-it-works",
        },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Launch Your Custom Software Platform with WebVibez in 5 to 7 Days",
      description:
        "A 3-step rapid engineering process to take your coaching app or custom web/mobile software live in 5 to 7 business days.",
      step: [
        {
          "@type": "HowToStep",
          name: "Day 01: Scoping & Architecture Blueprint",
          text: "Share your coaching centre's identity, courses, and custom feature wishlist. We map data pipelines and UI architecture.",
        },
        {
          "@type": "HowToStep",
          name: "Days 02–05: Core Build & Security Hardening",
          text: "Engineers configure pipelines, secure video delivery, mobile client apps, and administrative controls with QA builds.",
        },
        {
          "@type": "HowToStep",
          name: "Days 06–07: App Store & Play Store Launch",
          text: "Deploying 100% white-labeled iOS and Android apps directly onto student phones with production cloud hosting.",
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
