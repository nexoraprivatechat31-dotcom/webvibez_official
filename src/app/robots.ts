import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog",
          "/blog/*",
          "/favicon.ico",
          "/favicon.png",
          "/favicon-48x48.png",
          "/favicon-96x96.png",
          "/favicon-192x192.png",
          "/apple-icon.png",
          "/api/og",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/api/admin",
          "/api/admin/*",
          "/api/checkout",
          "/api/payment",
          "/api/blog/cron",
          "/api/blog/distribute",
          "/api/blog/auth",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: [
          "/",
          "/favicon.ico",
          "/favicon.png",
          "/favicon-48x48.png",
          "/apple-icon.png",
          "/logo.png",
          "/logo.jpeg",
          "/og-image.jpeg",
        ],
      },
    ],
    sitemap: "https://www.webvibez.com/sitemap.xml",
    host: "https://www.webvibez.com",
  };
}
