import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webvibez.com";
  const lastModified = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/website-development", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/mobile-app-development", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/custom-software-development", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/coaching-class-management-app", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/product", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/features", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/security", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/refund-policy", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/agreements", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/disclaimer", priority: 0.4, changeFrequency: "monthly" as const },
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
