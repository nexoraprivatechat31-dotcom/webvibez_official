import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching Class Management Software & Mobile Platform",
  description:
    "Explore WebVibez coaching institute software: 100% white-labeled iOS and Android mobile apps, live lecture streaming, CBT exam engine, hardware DRM anti-piracy, and automated UPI fee collection.",
  alternates: {
    canonical: "https://webvibez.com/product",
  },
  openGraph: {
    title: "Coaching Class Management Software & Mobile Platform | WebVibez",
    description:
      "Explore WebVibez coaching institute software: 100% white-labeled iOS and Android mobile apps, live lecture streaming, CBT exam engine, hardware DRM anti-piracy, and automated UPI fee collection.",
    url: "https://webvibez.com/product",
    siteName: "WebVibez Software Developer",
    type: "website",
    images: [
      {
        url: "https://webvibez.com/api/og?title=Coaching%20Class%20Management%20Software&category=11%20Hardened%20Subsystems&tag=Mobile%20App%20%E2%80%A2%20DRM%20%E2%80%A2%20CBT%20Tests%20%E2%80%A2%20UPI",
        width: 1200,
        height: 630,
        alt: "WebVibez Coaching Class Software & Mobile App Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching Class Management Software & Mobile Platform | WebVibez",
    description:
      "Explore WebVibez coaching institute software: 100% white-labeled iOS and Android mobile apps, live lecture streaming, CBT exam engine, hardware DRM anti-piracy, and automated UPI fee collection.",
    images: [
      "https://webvibez.com/api/og?title=Coaching%20Class%20Management%20Software&category=11%20Hardened%20Subsystems&tag=Mobile%20App%20%E2%80%A2%20DRM%20%E2%80%A2%20CBT%20Tests%20%E2%80%A2%20UPI",
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
          "name": "Product",
          "item": "https://webvibez.com/product",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "name": "WebVibez Academy Coaching Class Management Platform",
      "operatingSystem": "iOS, Android, Web",
      "applicationCategory": "EducationalApplication, BusinessApplication",
      "description":
        "Complete coaching-class management software and branded mobile application featuring student records, real-time attendance, CBT test simulator, rank analysis, fee tracking, and push notifications.",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://webvibez.com",
      },
    },
  ],
};

export default function ProductLayout({
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
