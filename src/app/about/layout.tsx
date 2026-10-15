import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Software Development Studio",
  description:
    "WebVibez is a digital product studio in Ahmedabad, Gujarat, engineering high-impact mobile apps, Next.js websites, and coaching management platforms.",
  alternates: {
    canonical: "https://www.webvibez.com/about",
  },
  openGraph: {
    title: "About Our Software Development Studio | WebVibez",
    description:
      "WebVibez is a digital product studio in Ahmedabad, Gujarat, engineering high-impact mobile apps, Next.js websites, and coaching management platforms.",
    url: "https://www.webvibez.com/about",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "About WebVibez Software Developer in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Software Development Studio | WebVibez",
    description:
      "WebVibez is a digital product studio in Ahmedabad, Gujarat, engineering high-impact mobile apps, Next.js websites, and coaching management platforms.",
    images: ["https://www.webvibez.com/og-image.jpeg"],
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
          "name": "About",
          "item": "https://www.webvibez.com/about",
        },
      ],
    },
    {
      "@type": "AboutPage",
      "name": "About WebVibez Software Developer",
      "url": "https://www.webvibez.com/about",
      "description":
        "About WebVibez Software Developer, our engineering mission, product studio philosophy, and Ahmedabad development center.",
      "mainEntity": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
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
