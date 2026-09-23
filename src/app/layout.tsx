import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollToTop from "@/components/ui/ScrollToTop";

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
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://webvibez.com"),
  title: {
    default: "WebVibez Software Developer | Website, Mobile App & Custom Software Company in Ahmedabad",
    template: "%s | WebVibez Software Developer",
  },
  description:
    "WebVibez is an Ahmedabad-based software development company. We build custom websites, iOS and Android mobile apps, cloud ERPs, and coaching management software with 100% white-labeled delivery.",
  applicationName: "WebVibez Software Developer",
  authors: [{ name: "WebVibez Software Developer", url: "https://webvibez.com" }],
  creator: "WebVibez Software Developer",
  publisher: "WebVibez Software Developer",
  alternates: {
    canonical: "https://webvibez.com",
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=4", type: "image/svg+xml" },
      { url: "/favicon.png?v=4", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png?v=4", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico?v=4", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.png?v=4", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png?v=4",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webvibez.com",
    siteName: "WebVibez Software Developer",
    title: "WebVibez Software Developer | Website, Mobile App & Custom Software Company in Ahmedabad",
    description:
      "WebVibez is an Ahmedabad-based software development company engineering custom websites, React Native mobile apps, cloud web applications, and coaching institute platforms.",
    images: [
      {
        url: "https://webvibez.com/logo.jpeg",
        secureUrl: "https://webvibez.com/logo.jpeg",
        width: 1080,
        height: 987,
        type: "image/jpeg",
        alt: "WebVibez Software Developer Logo",
      },
      {
        url: "https://webvibez.com/og-image.jpeg",
        secureUrl: "https://webvibez.com/og-image.jpeg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "WebVibez Software Developer — Custom Software, Mobile Apps & Website Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebVibez Software Developer | Website, Mobile App & Custom Software Company in Ahmedabad",
    description:
      "WebVibez is an Ahmedabad-based software development company engineering custom websites, React Native mobile apps, cloud web applications, and coaching institute platforms.",
    images: [
      "https://webvibez.com/og-image.jpeg",
      "https://webvibez.com/logo.jpeg",
    ],
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
    "website development company in Ahmedabad",
    "mobile app development company Ahmedabad",
    "custom software development company Ahmedabad",
    "web development Ahmedabad",
    "React Native development Ahmedabad",
    "Next.js development Ahmedabad",
    "coaching class management software",
    "coaching class management app",
    "software development company Ahmedabad",
    "Ahmedabad Gujarat India",
  ],
};

const jsonLdGlobal = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webvibez.com/#organization",
      name: "WebVibez Software Developer",
      alternateName: "WebVibez",
      url: "https://webvibez.com",
      logo: "https://webvibez.com/favicon.png",
      description:
        "WebVibez is a digital product studio and software development company based in Ahmedabad, Gujarat, India, specializing in custom websites, mobile applications, cloud software, and institute management platforms.",
      telephone: "+91-92136-15531",
      email: "contact@webvibez.com",
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
      sameAs: [
        "https://www.linkedin.com/company/webvibez",
        "https://x.com/webvibez",
        "https://github.com/webvibez",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://webvibez.com/#localbusiness",
      name: "WebVibez Software Developer",
      image: "https://webvibez.com/favicon.png",
      url: "https://webvibez.com",
      telephone: "+91-92136-15531",
      description:
        "Custom software, mobile app development, Next.js websites, and coaching-class management software company in Ahmedabad, Gujarat, India.",
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
      "@id": "https://webvibez.com/#website",
      url: "https://webvibez.com",
      name: "WebVibez Software Developer",
      description:
        "Custom software, mobile app development, Next.js websites, and coaching-class management platforms in Ahmedabad.",
      publisher: {
        "@id": "https://webvibez.com/#organization",
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
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.svg?v=4" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png?v=4" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon.png?v=4" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon.png?v=4" type="image/png" sizes="32x32" />
        <link rel="image_src" href="https://webvibez.com/logo.jpeg" />
        <meta property="og:image" content="https://webvibez.com/logo.jpeg" />
        <meta property="og:image:secure_url" content="https://webvibez.com/logo.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="987" />
        <meta property="og:image:alt" content="WebVibez Software Developer Logo" />
        <meta name="twitter:image" content="https://webvibez.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta itemProp="image" content="https://webvibez.com/logo.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGlobal) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  root.classList.remove('dark');
                  root.classList.add('light');
                  root.setAttribute('data-theme', 'light');
                  root.style.colorScheme = 'light';
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--ink)] text-[var(--text-primary)] transition-colors duration-300 font-sans selection:bg-[#0066FF]/30 selection:text-[#0066FF] antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
