import { Article } from "../blog/types";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const NotionAdapter: DistributionAdapter = {
  platform: "NOTION",

  getCapability(): PlatformConfig {
    const apiKey = process.env.NOTION_API_KEY;
    const dbId = process.env.NOTION_DATABASE_ID;
    const isConfigured = Boolean(apiKey && dbId);
    return {
      platform: "NOTION",
      name: "Notion Editorial Calendar",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "Editorial calendar sync and content database planning.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;
    const apiVersion = process.env.NOTION_API_VERSION || "2022-06-28";

    if (!apiKey || !databaseId) {
      return {
        platform: "NOTION",
        success: false,
        errorMessage: "NOTION_API_KEY or NOTION_DATABASE_ID is not configured.",
        timestamp,
      };
    }

    try {
      const payload = {
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [{ text: { content: article.title } }],
          },
          Status: {
            select: { name: article.status },
          },
          Category: {
            select: { name: article.category },
          },
          CanonicalUrl: {
            url: article.canonicalUrl,
          },
          Slug: {
            rich_text: [{ text: { content: article.slug } }],
          },
        },
      };

      const res = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": apiVersion,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        return {
          platform: "NOTION",
          success: false,
          errorMessage: `Notion API returned ${res.status}: ${errText}`,
          timestamp,
        };
      }

      const data = await res.json();
      return {
        platform: "NOTION",
        success: true,
        externalId: data.id,
        externalUrl: data.url,
        canonicalUrl: article.canonicalUrl,
        timestamp,
      };
    } catch (err: any) {
      return {
        platform: "NOTION",
        success: false,
        errorMessage: err.message || "Failed to communicate with Notion API.",
        timestamp,
      };
    }
  },
};
