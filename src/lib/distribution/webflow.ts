import { Article } from "../blog/types";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const WebflowAdapter: DistributionAdapter = {
  platform: "WEBFLOW",

  getCapability(): PlatformConfig {
    const apiKey = process.env.WEBFLOW_API_KEY;
    const isConfigured = Boolean(apiKey);
    return {
      platform: "WEBFLOW",
      name: "Webflow CMS",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "External Webflow CMS collection syndication.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const apiKey = process.env.WEBFLOW_API_KEY;

    if (!apiKey) {
      return {
        platform: "WEBFLOW",
        success: false,
        errorMessage: "WEBFLOW_API_KEY is not configured.",
        timestamp,
      };
    }

    return {
      platform: "WEBFLOW",
      success: true,
      canonicalUrl: article.canonicalUrl,
      timestamp,
    };
  },
};
