import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: ["/api/checkout", "/api/payment", "/api/admin"],
      },
    ],
    sitemap: "https://webvibez.com/sitemap.xml",
    host: "https://webvibez.com",
  };
}
