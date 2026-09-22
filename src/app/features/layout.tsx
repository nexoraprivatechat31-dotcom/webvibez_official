import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | Coaching Management & Custom Software Capabilities",
  description:
    "Explore the core features of WebVibez platforms: live biometric & mobile attendance, automated fee processing, test performance analytics, and role-based administrative control.",
  alternates: {
    canonical: "https://webvibez.in/features",
  },
  openGraph: {
    title: "Platform Features | Coaching Management & Custom Software Capabilities | WebVibez",
    description:
      "Explore the core features of WebVibez platforms: live biometric & mobile attendance, automated fee processing, test performance analytics, and role-based administrative control.",
    url: "https://webvibez.in/features",
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
      "name": "Features",
      "item": "https://webvibez.in/features",
    },
  ],
};

export default function FeaturesLayout({
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
