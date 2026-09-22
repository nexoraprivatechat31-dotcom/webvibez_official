import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Agreements & Legal Framework | WebVibez Software Developer",
  description:
    "Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations.",
  alternates: {
    canonical: "https://webvibez.com/agreements",
  },
  openGraph: {
    title: "Service Agreements & Legal Framework | WebVibez Software Developer",
    description:
      "Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations.",
    url: "https://webvibez.com/agreements",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/api/og?title=Service%20Agreements%20%26%20Legal%20Framework&category=Client%20Contracts%20%26%20IP%20Assignment&tag=100%25%20Code%20Ownership%20%E2%80%A2%20NDA",
        width: 1200,
        height: 630,
        alt: "WebVibez Service Agreements and Legal Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Agreements & Legal Framework | WebVibez Software Developer",
    description:
      "Master service agreements, intellectual property assignments, and service level commitments between WebVibez and client organizations.",
    images: [
      "https://webvibez.com/api/og?title=Service%20Agreements%20%26%20Legal%20Framework&category=Client%20Contracts%20%26%20IP%20Assignment&tag=100%25%20Code%20Ownership%20%E2%80%A2%20NDA",
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
          "name": "Agreements",
          "item": "https://webvibez.com/agreements",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Service Agreements",
      "url": "https://webvibez.com/agreements",
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
