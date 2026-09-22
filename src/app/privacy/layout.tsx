import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WebVibez Software Developer",
  description:
    "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained.",
  alternates: {
    canonical: "https://webvibez.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | WebVibez Software Developer",
    description:
      "Privacy Policy for WebVibez Software Developer. Details how customer, student, and organizational data is processed, protected, and retained.",
    url: "https://webvibez.in/privacy",
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
      "name": "Privacy Policy",
      "item": "https://webvibez.in/privacy",
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
