import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Client Case Studies",
  description:
    "Explore real-world software engineering case studies, mobile applications, and web platforms delivered by WebVibez Software Developer.",
  alternates: {
    canonical: "https://www.webvibez.com/portfolio",
  },
  openGraph: {
    title: "Engineering Portfolio & Client Case Studies",
    description:
      "Explore real-world software engineering case studies, mobile applications, and web platforms delivered by WebVibez Software Developer.",
    url: "https://www.webvibez.com/portfolio",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "WebVibez Engineering Portfolio and Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Portfolio & Client Case Studies",
    description:
      "Explore real-world software engineering case studies, mobile applications, and web platforms delivered by WebVibez Software Developer.",
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
          "name": "Portfolio",
          "item": "https://www.webvibez.com/portfolio",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "name": "WebVibez Software Development Portfolio",
      "url": "https://www.webvibez.com/portfolio",
      "description":
        "Featured software engineering projects, mobile apps, and coaching management portals.",
      "publisher": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
      },
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
