import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
        allow: "/",
      },
    ],
    sitemap: "https://www.webvibez.com/sitemap.xml",
  };
}
