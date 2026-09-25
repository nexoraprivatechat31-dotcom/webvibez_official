import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: [
          "/blog",
          "/blog/*",
          "/api/checkout",
          "/api/payment",
          "/api/blog/cron",
          "/api/blog/distribute",
          "/api/blog/auth",
        ],
      },
    ],
    sitemap: "https://www.webvibez.com/sitemap.xml",
    host: "https://www.webvibez.com",
  };
}
