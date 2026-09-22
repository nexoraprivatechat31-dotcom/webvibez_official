import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WebVibez | Digital Product Studio & Software Developer",
  description:
    "WebVibez Software Developer is a digital product studio based in Ahmedabad, Gujarat, engineering high-impact mobile apps, websites, and institutional management systems.",
  alternates: {
    canonical: "https://webvibez.in/about",
  },
  openGraph: {
    title: "About WebVibez | Digital Product Studio & Software Developer",
    description:
      "WebVibez Software Developer is a digital product studio based in Ahmedabad, Gujarat, engineering high-impact mobile apps, websites, and institutional management systems.",
    url: "https://webvibez.in/about",
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
      "name": "About",
      "item": "https://webvibez.in/about",
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
