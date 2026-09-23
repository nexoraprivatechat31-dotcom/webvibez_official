import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WebVibez | Product Studio & Developer, Ahmedabad",
  description:
    "WebVibez Software Developer is a digital product studio based in Ahmedabad, Gujarat, engineering high-impact mobile apps, websites, and institutional management systems.",
  alternates: {
    canonical: "https://webvibez.com/about",
  },
  openGraph: {
    title: "About WebVibez | Product Studio & Developer, Ahmedabad",
    description:
      "WebVibez Software Developer is a digital product studio based in Ahmedabad, Gujarat, engineering high-impact mobile apps, websites, and institutional management systems.",
    url: "https://webvibez.com/about",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "About WebVibez Software Developer in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WebVibez | Product Studio & Developer, Ahmedabad",
    description:
      "WebVibez Software Developer is a digital product studio based in Ahmedabad, Gujarat, engineering high-impact mobile apps, websites, and institutional management systems.",
    images: [
      "https://webvibez.com/logo.jpeg",
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
          "name": "About",
          "item": "https://webvibez.com/about",
        },
      ],
    },
    {
      "@type": "AboutPage",
      "name": "About WebVibez Software Developer",
      "url": "https://webvibez.com/about",
      "description":
        "About WebVibez Software Developer, our engineering mission, product studio philosophy, and Ahmedabad development center.",
      "mainEntity": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ahmedabad",
          "addressRegion": "Gujarat",
          "addressCountry": "IN",
        },
      },
    },
  ],
};

export default function AboutLayout({
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
