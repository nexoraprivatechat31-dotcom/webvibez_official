import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | WebVibez Software Developer",
  description:
    "Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services.",
  alternates: {
    canonical: "https://webvibez.com/disclaimer",
  },
  openGraph: {
    title: "Disclaimer | WebVibez Software Developer",
    description:
      "Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services.",
    url: "https://webvibez.com/disclaimer",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Legal Disclaimer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | WebVibez Software Developer",
    description:
      "Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services.",
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
          "name": "Disclaimer",
          "item": "https://webvibez.com/disclaimer",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Disclaimer",
      "url": "https://webvibez.com/disclaimer",
    },
  ],
};

export default function DisclaimerLayout({
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
