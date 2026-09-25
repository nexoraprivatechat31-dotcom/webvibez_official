import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Agreements & Legal Framework",
  description:
    "Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations.",
  alternates: {
    canonical: "https://www.webvibez.com/agreements",
  },
  openGraph: {
    title: "Service Agreements & Legal Framework",
    description:
      "Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations.",
    url: "https://www.webvibez.com/agreements",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Service Agreements and Legal Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Agreements & Legal Framework",
    description:
      "Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations.",
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
          "name": "Agreements",
          "item": "https://www.webvibez.com/agreements",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Service Agreements",
      "url": "https://www.webvibez.com/agreements",
    },
  ],
};

export default function AgreementsLayout({
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
