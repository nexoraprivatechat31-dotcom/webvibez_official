import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team in Ahmedabad",
  description:
    "Contact WebVibez Software Developer in Ahmedabad. Discuss your mobile app, coaching software, or custom web development project with our engineers.",
  alternates: {
    canonical: "https://www.webvibez.com/contact",
  },
  openGraph: {
    title: "Contact Our Engineering Team in Ahmedabad | WebVibez",
    description:
      "Contact WebVibez Software Developer in Ahmedabad. Discuss your mobile app, coaching software, or custom web development project with our engineers.",
    url: "https://www.webvibez.com/contact",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Contact WebVibez Software Developer in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Our Engineering Team in Ahmedabad | WebVibez",
    description:
      "Contact WebVibez Software Developer in Ahmedabad. Discuss your mobile app, coaching software, or custom web development project with our engineers.",
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
          "name": "Contact",
          "item": "https://www.webvibez.com/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "name": "Contact WebVibez Software Developer",
      "url": "https://www.webvibez.com/contact",
      "description":
        "Contact page for WebVibez Software Developer in Ahmedabad, Gujarat, India.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
        "telephone": "+91-92136-15531",
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

export default function ContactLayout({
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
