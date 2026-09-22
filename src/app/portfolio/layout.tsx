import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Client Case Studies",
  description:
    "Explore real-world software engineering case studies, mobile applications, and web platforms delivered by WebVibez Software Developer.",
  alternates: {
    canonical: "https://webvibez.in/portfolio",
  },
  openGraph: {
    title: "Engineering Portfolio & Client Case Studies | WebVibez",
    description:
      "Explore real-world software engineering case studies, mobile applications, and web platforms delivered by WebVibez Software Developer.",
    url: "https://webvibez.in/portfolio",
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
      "name": "Portfolio",
      "item": "https://webvibez.in/portfolio",
    },
  ],
};

export default function PortfolioLayout({
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
