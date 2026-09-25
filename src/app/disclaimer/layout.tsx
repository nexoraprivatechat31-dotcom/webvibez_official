import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services.",
  alternates: {
    canonical: "https://www.webvibez.com/disclaimer",
  },
  openGraph: {
    title: "Disclaimer",
    description:
      "Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services.",
    url: "https://www.webvibez.com/disclaimer",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Legal Disclaimer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer",
    description:
      "Legal disclaimer, accuracy notices, and technological limitation warranties regarding WebVibez products and development services.",
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
          "name": "Disclaimer",
          "item": "https://www.webvibez.com/disclaimer",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Disclaimer",
      "url": "https://www.webvibez.com/disclaimer",
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
