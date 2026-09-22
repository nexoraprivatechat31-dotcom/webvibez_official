import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WebVibez Software Developer",
  description:
    "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained under DPDP India and global standards.",
  alternates: {
    canonical: "https://webvibez.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | WebVibez Software Developer",
    description:
      "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained under DPDP India and global standards.",
    url: "https://webvibez.com/privacy",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/api/og?title=Privacy%20Policy&category=Data%20Protection%20%26%20Privacy&tag=GDPR%20%E2%80%A2%20DPDP%20India%20Compliance",
        width: 1200,
        height: 630,
        alt: "WebVibez Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | WebVibez Software Developer",
    description:
      "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained under DPDP India and global standards.",
    images: [
      "https://webvibez.com/api/og?title=Privacy%20Policy&category=Data%20Protection%20%26%20Privacy&tag=GDPR%20%E2%80%A2%20DPDP%20India%20Compliance",
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
          "name": "Privacy Policy",
          "item": "https://webvibez.com/privacy",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Privacy Policy",
      "url": "https://webvibez.com/privacy",
    },
  ],
};

export default function PrivacyLayout({
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
