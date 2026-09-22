import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8FAFC",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://webvibez.in"),
  title: {
    default: "WebVibez Software Developer | Custom Software, Mobile Apps & Websites",
    template: "%s | WebVibez Software Developer",
  },
  description:
    "WebVibez builds custom mobile apps, websites, web applications and coaching-class management software for businesses and education institutes.",
  applicationName: "WebVibez Software Developer",
  authors: [{ name: "WebVibez Software Developer", url: "https://webvibez.in" }],
  creator: "WebVibez Software Developer",
  publisher: "WebVibez Software Developer",
  alternates: {
    canonical: "https://webvibez.in",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webvibez.in",
    siteName: "WebVibez Software Developer",
    title: "WebVibez Software Developer | Custom Software, Mobile Apps & Websites",
    description:
      "WebVibez builds custom mobile apps, websites, web applications and coaching-class management software for businesses and education institutes.",
    images: [
      {
        url: "/images/square-image.jpg",
        width: 1200,
        height: 630,
        alt: "WebVibez Software Developer — Custom Software, Mobile Apps & Websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebVibez Software Developer | Custom Software, Mobile Apps & Websites",
    description:
      "WebVibez builds custom mobile apps, websites, web applications and coaching-class management software for businesses and education institutes.",
    images: ["/images/square-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "WebVibez",
    "WebVibez Software Developer",
    "custom software development",
    "mobile app development",
    "website development",
    "web application development",
    "coaching class management software",
    "Ahmedabad software developer",
    "Gujarat tech studio",
    "coaching institute app",
  ],
};

const jsonLdGlobal = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webvibez.in/#organization",
      name: "WebVibez Software Developer",
      alternateName: "WebVibez",
      url: "https://webvibez.in",
      logo: "https://webvibez.in/images/square-image.jpg",
      description:
        "WebVibez builds custom mobile apps, websites, web applications and coaching-class management software for businesses and education institutes.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://webvibez.in/#localbusiness",
      name: "WebVibez Software Developer",
      image: "https://webvibez.in/images/square-image.jpg",
      url: "https://webvibez.in",
      description:
        "Custom software, mobile apps, websites, web applications and coaching-class management platforms in Ahmedabad, Gujarat.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": "https://webvibez.in/#website",
      url: "https://webvibez.in",
      name: "WebVibez Software Developer",
      description:
        "Custom software, mobile apps, websites, web applications and coaching-class management platforms.",
      publisher: {
        "@id": "https://webvibez.in/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} light`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGlobal) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('webvibez-theme');
                  var root = document.documentElement;
                  if (saved === 'dark') {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.setAttribute('data-theme', 'dark');
                  } else {
                    root.classList.add('light');
                    root.classList.remove('dark');
                    root.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--ink)] text-[var(--text-primary)] transition-colors duration-300 font-sans selection:bg-[#0066FF]/30 selection:text-[#0066FF] antialiased overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
