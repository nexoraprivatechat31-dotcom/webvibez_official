import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Security & Data Protection Standards",
  description:
    "Learn about WebVibez enterprise-grade security protocols: AES-256 data encryption, zero-trust role-based access, automated database backups, and privacy compliance.",
  alternates: {
    canonical: "https://www.webvibez.com/security",
  },
  openGraph: {
    title: "Enterprise Security & Data Protection Standards",
    description:
      "Learn about WebVibez enterprise-grade security protocols: AES-256 data encryption, zero-trust role-based access, automated database backups, and privacy compliance.",
    url: "https://www.webvibez.com/security",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Security and DRM Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Security & Data Protection Standards",
    description:
      "Learn about WebVibez enterprise-grade security protocols: AES-256 data encryption, zero-trust role-based access, automated database backups, and privacy compliance.",
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
          "name": "Security",
          "item": "https://www.webvibez.com/security",
        },
      ],
    },
    {
      "@type": "WebPage",
      "name": "WebVibez Enterprise Security & Compliance",
      "url": "https://www.webvibez.com/security",
      "description":
        "Detailed breakdown of WebVibez security architecture, DRM screen protection, and data sovereignty safeguards.",
      "publisher": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
      },
    },
  ],
};

export default function SecurityLayout({
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
