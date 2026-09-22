import { Article } from "../blog/types";
import { BrandSignature } from "./brand-signature";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const DevToAdapter: DistributionAdapter = {
  platform: "DEVTO",

  getCapability(): PlatformConfig {
    const apiKey = process.env.DEV_TO_API_KEY;
    const isConfigured = Boolean(apiKey && apiKey.length > 5);
    return {
      platform: "DEVTO",
      name: "DEV Community (DEV.to)",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "Automatic publishing via REST API with strict canonical_url attribution and author signature.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const apiKey = process.env.DEV_TO_API_KEY;

    if (!apiKey) {
      return {
        platform: "DEVTO",
        success: false,
        errorMessage: "DEV_TO_API_KEY environment variable is not configured.",
        timestamp,
      };
    }

    try {
      // DEV.to tags must be lowercase alphanumeric, max 4 tags
      const sanitizedTags = article.tags
        .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ""))
        .filter(Boolean)
        .slice(0, 4);

      const isHindi = article.language === "hi";
      const signature = BrandSignature.getMarkdownSignature(article);
      const bodyWithAttribution = `${article.content}${signature}`;

      const defaultTags = isHindi ? ["hindi", "tech", "webdev", "india"] : ["webdev", "tech", "software"];
      const finalTags = sanitizedTags.length > 0 ? sanitizedTags : defaultTags;

      const payload = {
        article: {
          title: article.title,
          published: true,
          body_markdown: bodyWithAttribution,
          tags: finalTags,
          canonical_url: article.canonicalUrl,
          description: article.description.slice(0, 150),
          main_image: article.featuredImage || undefined,
        },
      };

      const res = await fetch("https://dev.to/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          platform: "DEVTO",
          success: false,
          errorMessage: `DEV.to API returned ${res.status}: ${errText}`,
          timestamp,
        };
      }

      const data = await res.json();
      return {
        platform: "DEVTO",
        success: true,
        externalId: String(data.id),
        externalUrl: data.url,
        canonicalUrl: article.canonicalUrl,
        timestamp,
      };
    } catch (err: any) {
      return {
        platform: "DEVTO",
        success: false,
        errorMessage: err.message || "Failed to communicate with DEV.to API.",
        timestamp,
      };
    }
  },
};
