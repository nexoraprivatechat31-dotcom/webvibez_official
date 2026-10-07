import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Apps on Rent | 1-Year Subscription & App Leasing",
  description:
    "Get high-performance iOS and Android mobile apps on a 1-year rental plan from WebVibez. Turnkey white-label delivery apps, e-commerce apps, coaching apps, zero upfront development cost, free server hosting & Play Store publishing.",
  alternates: {
    canonical: "https://www.webvibez.com/services/mobile-apps-on-rent",
  },
  openGraph: {
    title: "Mobile Apps on Rent | 1-Year App Rental Subscription | WebVibez",
    description:
      "Save 70%+ on software costs. Rent readymade, custom-branded iOS & Android mobile apps with full 24/7 maintenance, cloud servers, and Google Play Store publishing in Ahmedabad.",
    url: "https://www.webvibez.com/services/mobile-apps-on-rent",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Mobile Apps on Rent — 1-Year App Rental Subscription WebVibez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Apps on Rent | 1-Year Subscription | WebVibez",
    description:
      "Turnkey white-label iOS and Android apps on a 1-year rental plan. Zero development risk, automated maintenance, and live store deployment in Ahmedabad.",
    images: ["https://www.webvibez.com/logo.jpeg"],
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
          "name": "Mobile Apps on Rent",
          "item": "https://www.webvibez.com/services/mobile-apps-on-rent",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Mobile Apps on Rent & 1-Year App Leasing",
      serviceType: "App Rental Subscription, White-Label App Leasing & Managed App Hosting",
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
        { "@type": "Country", name: "United States" },
      ],
      description:
        "Turnkey white-label iOS and Android mobile apps on flexible 1-year rental subscriptions. Includes complete branding, cloud hosting, bug fixes, and store management.",
    },
  ],
};

export default function MobileAppsOnRentLayout({
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
