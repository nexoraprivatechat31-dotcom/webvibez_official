import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WebVibez Software Developer | Ahmedabad, Gujarat",
  description:
    "Get in touch with WebVibez Software Developer. Discuss your custom software, mobile app, or coaching institute software requirements with our engineering team in Ahmedabad.",
  alternates: {
    canonical: "https://webvibez.com/contact",
  },
  openGraph: {
    title: "Contact WebVibez Software Developer | Ahmedabad, Gujarat",
    description:
      "Get in touch with WebVibez Software Developer. Discuss your custom software, mobile app, or coaching institute software requirements with our engineering team in Ahmedabad.",
    url: "https://webvibez.com/contact",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/api/og?title=Contact%20Our%20Engineering%20Team&category=Direct%20Consultation&tag=Ahmedabad%2C%20Gujarat%20%E2%80%A2%20%2B91%2092136%2015531",
        width: 1200,
        height: 630,
        alt: "Contact WebVibez Software Developer in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WebVibez Software Developer | Ahmedabad, Gujarat",
    description:
      "Get in touch with WebVibez Software Developer. Discuss your custom software, mobile app, or coaching institute software requirements with our engineering team in Ahmedabad.",
    images: [
      "https://webvibez.com/api/og?title=Contact%20Our%20Engineering%20Team&category=Direct%20Consultation&tag=Ahmedabad%2C%20Gujarat%20%E2%80%A2%20%2B91%2092136%2015531",
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
          "name": "Contact",
          "item": "https://webvibez.com/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "name": "Contact WebVibez Software Developer",
      "url": "https://webvibez.com/contact",
      "description":
        "Contact page for WebVibez Software Developer in Ahmedabad, Gujarat, India.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.com",
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
