import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for utilizing WebVibez Software Developer software products, development services, APIs, and client portals.",
  alternates: {
    canonical: "https://www.webvibez.com/terms",
  },
  openGraph: {
    title: "Terms and Conditions",
    description:
      "Terms and conditions for utilizing WebVibez Software Developer software products, development services, APIs, and client portals.",
    url: "https://www.webvibez.com/terms",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions",
    description:
      "Terms and conditions for utilizing WebVibez Software Developer software products, development services, APIs, and client portals.",
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
          "name": "Terms and Conditions",
          "item": "https://www.webvibez.com/terms",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Terms and Conditions",
      "url": "https://www.webvibez.com/terms",
    },
  ],
};

export default function TermsLayout({
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
