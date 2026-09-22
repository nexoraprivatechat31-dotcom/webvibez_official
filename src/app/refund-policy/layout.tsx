import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | WebVibez Software Developer",
  description:
    "Cancellation and refund policy for WebVibez custom software development services, subscription tiers, and deployment contracts.",
  alternates: {
    canonical: "https://webvibez.com/refund-policy",
  },
  openGraph: {
    title: "Cancellation & Refund Policy | WebVibez Software Developer",
    description:
      "Cancellation and refund policy for WebVibez custom software development services, subscription tiers, and deployment contracts.",
    url: "https://webvibez.com/refund-policy",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/api/og?title=Cancellation%20%26%20Refund%20Policy&category=Client%20Protection%20%26%20Billing&tag=Transparent%20Agreements",
        width: 1200,
        height: 630,
        alt: "WebVibez Cancellation and Refund Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation & Refund Policy | WebVibez Software Developer",
    description:
      "Cancellation and refund policy for WebVibez custom software development services, subscription tiers, and deployment contracts.",
    images: [
      "https://webvibez.com/api/og?title=Cancellation%20%26%20Refund%20Policy&category=Client%20Protection%20%26%20Billing&tag=Transparent%20Agreements",
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
          "name": "Refund Policy",
          "item": "https://webvibez.com/refund-policy",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Cancellation & Refund Policy",
      "url": "https://webvibez.com/refund-policy",
    },
  ],
};

export default function RefundPolicyLayout({
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
