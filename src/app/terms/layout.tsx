import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | WebVibez Software Developer",
  description:
    "Terms and conditions for utilizing WebVibez Software Developer software products, development services, APIs, and client portals.",
  alternates: {
    canonical: "https://webvibez.in/terms",
  },
  openGraph: {
    title: "Terms and Conditions | WebVibez Software Developer",
    description:
      "Terms and conditions for utilizing WebVibez Software Developer software products, development services, APIs, and client portals.",
    url: "https://webvibez.in/terms",
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
      "name": "Terms and Conditions",
      "item": "https://webvibez.in/terms",
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
