import { MetadataRoute } from "next";
import { BlogRepository } from "@/lib/blog/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.webvibez.com";
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
    { path: "/blog", priority: 0.9, changeFrequency: "daily" as const },
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const allPublished = await BlogRepository.getPublishedArticles();
    const englishArticles = allPublished.filter(a => !a.language || a.language === "en");
    
    englishArticles.forEach((article) => {
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
