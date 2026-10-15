import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Company in Ahmedabad",
  description:
    "Top website development company in Ahmedabad. We engineer blazing fast Next.js websites, modern responsive UI/UX, and SEO-optimized business web platforms.",
  alternates: {
    canonical: "https://www.webvibez.com/services/website-development",
  },
  openGraph: {
    title: "Website Development Company in Ahmedabad | WebVibez",
    description:
      "Fast Next.js website development, responsive UI/UX design, technical SEO, and conversion-focused web engineering in Ahmedabad, Gujarat.",
    url: "https://www.webvibez.com/services/website-development",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Website Development Company in Ahmedabad — WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Ahmedabad | WebVibez",
    description:
      "Fast Next.js website development, responsive UI/UX design, technical SEO, and conversion-focused web engineering in Ahmedabad, Gujarat.",
    images: ["https://www.webvibez.com/og-image.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.webvibez.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.webvibez.com/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Website Development",
          "item": "https://www.webvibez.com/services/website-development",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Website Development Services in Ahmedabad",
      serviceType: "Website Development, Next.js Web Engineering & Full Stack Web Apps",
      provider: {
        "@type": "Organization",
        name: "WebVibez Software Developer",
        url: "https://www.webvibez.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
      },
      areaServed: [
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      description:
        "High-performance website development with Next.js, TypeScript, and modern UI/UX design. Optimized for speed, core web vitals, search indexing, and lead conversion.",
    },
  ],
};

export default function WebsiteDevLayout({
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
