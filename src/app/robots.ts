import { MetadataRoute } from "next";

const privateRoutes = [
  "/admin",
  "/admin/*",
  "/api/admin",
  "/api/admin/*",
  "/api/checkout",
  "/api/payment",
  "/api/contact",
  "/api/leads",
  "/api/blog/cron",
  "/api/blog/distribute",
  "/api/blog/auth",
  "/content-drafts",
  "/content-drafts/*",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: privateRoutes,
      },
      // Search Engines
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: privateRoutes,
      },
      // AI Search & LLM Engines (ChatGPT Search, OpenAI, Perplexity, Claude, Gemini, Apple Intelligence, Meta AI)
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "meta-externalagent",
          "FacebookBot",
          "cohere-ai",
          "CCBot",
          "Diffbot",
        ],
        allow: "/",
        disallow: privateRoutes,
      },
      // Image Crawlers
      {
        userAgent: ["Googlebot-Image"],
        allow: "/",
        disallow: privateRoutes,
      },
    ],
    sitemap: "https://www.webvibez.com/sitemap.xml",
    host: "https://www.webvibez.com",
  };
}
