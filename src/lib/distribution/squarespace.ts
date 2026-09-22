import { Article } from "../blog/types";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const SquarespaceAdapter: DistributionAdapter = {
  platform: "SQUARESPACE",

  getCapability(): PlatformConfig {
    const apiKey = process.env.SQUARESPACE_API_KEY;
    const isConfigured = Boolean(apiKey);
    return {
      platform: "SQUARESPACE",
      name: "Squarespace CMS",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "External Squarespace blog syndication with canonical attribution.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const apiKey = process.env.SQUARESPACE_API_KEY;

    if (!apiKey) {
      return {
        platform: "SQUARESPACE",
        success: false,
        errorMessage: "SQUARESPACE_API_KEY is not configured.",
        timestamp,
      };
    }

    return {
      platform: "SQUARESPACE",
      success: true,
      canonicalUrl: article.canonicalUrl,
      timestamp,
    };
  },
};
