import { MetadataRoute } from "next";
import { BlogRepository } from "@/lib/blog/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.webvibez.com";
  const staticLastMod = new Date("2026-10-15T00:00:00.000Z");

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/services/website-development", priority: 0.9, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/services/mobile-app-development", priority: 0.9, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/services/custom-software-development", priority: 0.9, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/services/coaching-class-management-app", priority: 0.95, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/services/mobile-apps-on-rent", priority: 0.95, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/product", priority: 0.9, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/portfolio/enzochat-web-platform", priority: 0.85, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/pricing", priority: 0.8, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/contact", priority: 0.9, changeFrequency: "weekly" as const, lastModified: staticLastMod },
    { path: "/security", priority: 0.7, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/privacy", priority: 0.4, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/terms", priority: 0.4, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/refund-policy", priority: 0.4, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/agreements", priority: 0.4, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/disclaimer", priority: 0.4, changeFrequency: "monthly" as const, lastModified: staticLastMod },
    { path: "/blog", priority: 0.9, changeFrequency: "daily" as const, lastModified: staticLastMod },
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const allPublished = await BlogRepository.getPublishedArticles();
    
    allPublished.forEach((article) => {
      routes.push({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.modifiedDate || article.publicationDate),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Failed to fetch articles for sitemap", error);
  }

  return routes;
}
