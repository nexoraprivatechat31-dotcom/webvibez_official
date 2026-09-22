import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Security & Data Protection Standards",
  description:
    "Learn about WebVibez enterprise-grade security protocols: AES-256 data encryption, zero-trust role-based access, automated database backups, and privacy compliance.",
  alternates: {
    canonical: "https://webvibez.in/security",
  },
  openGraph: {
    title: "Enterprise Security & Data Protection Standards | WebVibez",
    description:
      "Learn about WebVibez enterprise-grade security protocols: AES-256 data encryption, zero-trust role-based access, automated database backups, and privacy compliance.",
    url: "https://webvibez.in/security",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://webvibez.in",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Security",
      "item": "https://webvibez.in/security",
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
