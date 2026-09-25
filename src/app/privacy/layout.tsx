import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained under DPDP India and global standards.",
  alternates: {
    canonical: "https://www.webvibez.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained under DPDP India and global standards.",
    url: "https://www.webvibez.com/privacy",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained under DPDP India and global standards.",
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
          "name": "Privacy Policy",
          "item": "https://www.webvibez.com/privacy",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Privacy Policy",
      "url": "https://www.webvibez.com/privacy",
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
