import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | Coaching Management & Custom Software Capabilities",
  description:
    "Explore core features of WebVibez platforms: live biometric & mobile attendance, automated fee processing, test performance analytics, and role-based administrative control.",
  alternates: {
    canonical: "https://webvibez.com/features",
  },
  openGraph: {
    title: "Platform Features | Coaching Management & Custom Software Capabilities | WebVibez",
    description:
      "Explore core features of WebVibez platforms: live biometric & mobile attendance, automated fee processing, test performance analytics, and role-based administrative control.",
    url: "https://webvibez.com/features",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Platform Features & Capabilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Features | Coaching Management & Custom Software Capabilities | WebVibez",
    description:
      "Explore core features of WebVibez platforms: live biometric & mobile attendance, automated fee processing, test performance analytics, and role-based administrative control.",
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
          "name": "Features",
          "item": "https://webvibez.com/features",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Platform Features & Technical Capabilities",
      "url": "https://webvibez.com/features",
      "description":
        "Detailed architecture and capabilities of WebVibez software systems, including attendance tracking, automated fee receipts, and test analytics.",
      "publisher": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.com",
      },
    },
  ],
};

export default function FeaturesLayout({
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
