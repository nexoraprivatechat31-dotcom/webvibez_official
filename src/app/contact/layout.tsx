import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WebVibez Software Developer | Ahmedabad, Gujarat",
  description:
    "Get in touch with WebVibez Software Developer. Discuss your custom software, mobile app, or coaching institute software requirements with our engineering team.",
  alternates: {
    canonical: "https://webvibez.in/contact",
  },
  openGraph: {
    title: "Contact WebVibez Software Developer | Ahmedabad, Gujarat",
    description:
      "Get in touch with WebVibez Software Developer. Discuss your custom software, mobile app, or coaching institute software requirements with our engineering team.",
    url: "https://webvibez.in/contact",
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
          "item": "https://webvibez.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://webvibez.in/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "name": "Contact WebVibez Software Developer",
      "url": "https://webvibez.in/contact",
      "description":
        "Contact page for WebVibez Software Developer in Ahmedabad, Gujarat, India.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.in",
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
