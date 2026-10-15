import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching Management Software Platform",
  description:
    "White-label coaching management software & mobile apps. Features CBT mock test engine, attendance tracking, secure video streaming, and UPI fee collection.",
  alternates: {
    canonical: "https://www.webvibez.com/product",
  },
  openGraph: {
    title: "Coaching Management Software Platform | WebVibez",
    description:
      "White-label coaching management software & mobile apps. Features CBT mock test engine, attendance tracking, secure video streaming, and UPI fee collection.",
    url: "https://www.webvibez.com/product",
    siteName: "WebVibez Software Developer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "WebVibez Coaching Class Software & Mobile App Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaching Management Software Platform | WebVibez",
    description:
      "White-label coaching management software & mobile apps. Features CBT mock test engine, attendance tracking, secure video streaming, and UPI fee collection.",
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
          "name": "Product",
          "item": "https://www.webvibez.com/product",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "name": "WebVibez Software Devloper Coaching Application",
      "operatingSystem": "Android, iOS",
      "applicationCategory": "EducationalApplication, BusinessApplication",
      "installUrl": "https://play.google.com/store/apps/details?id=com.webvibez.classes",
      "description":
        "Complete coaching-class management software and branded mobile application featuring student records, real-time attendance, CBT test simulator, rank analysis, fee tracking, and push notifications.",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
      },
    },
    {
      "@type": "SoftwareApplication",
      "name": "EnzoChat — Encrypted Private Messaging Platform",
      "operatingSystem": "Web, iOS, Android",
      "applicationCategory": "CommunicationApplication, SecurityApplication",
      "url": "https://enzochat.webvibez.com",
      "description":
        "Zero-knowledge end-to-end encrypted messaging web platform engineered by WebVibez Software Developer with sub-50ms WebSocket tunneling and blind relay servers.",
      "provider": {
        "@type": "Organization",
        "name": "WebVibez Software Developer",
        "url": "https://www.webvibez.com",
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
