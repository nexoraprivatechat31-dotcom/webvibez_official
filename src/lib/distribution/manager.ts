import { Article, DistributionPlatform, DistributionRecord } from "../blog/types";
import { BlogRepository } from "../blog/repository";
import { DevToAdapter } from "./devto";
import { HashnodeAdapter } from "./hashnode";
import { MediumAdapter } from "./medium";
import { BloggerAdapter } from "./blogger";
import { TumblrAdapter } from "./tumblr";
import { NotionAdapter } from "./notion";
import { SquarespaceAdapter } from "./squarespace";
import { WebflowAdapter } from "./webflow";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

const ADAPTERS: Record<DistributionPlatform, DistributionAdapter> = {
  DEVTO: DevToAdapter,
  HASHNODE: HashnodeAdapter,
  MEDIUM: MediumAdapter,
  BLOGGER: BloggerAdapter,
  TUMBLR: TumblrAdapter,
  NOTION: NotionAdapter,
  SQUARESPACE: SquarespaceAdapter,
  WEBFLOW: WebflowAdapter,
};

export const DistributionManager = {
  getPlatformCapabilities(): PlatformConfig[] {
    return Object.values(ADAPTERS).map((adapter) => adapter.getCapability());
  },

  async distributeToPlatform(
    articleId: string,
    platform: DistributionPlatform
  ): Promise<DistributionResult> {
    const article = await BlogRepository.getArticleById(articleId);
    const timestamp = new Date().toISOString();

    if (!article) {
      return {
        platform,
        success: false,
        errorMessage: `Article with ID ${articleId} not found.`,
        timestamp,
      };
    }

    // STRICT INVARIANT: WebVibez must be PUBLISHED first before external distribution
    if (article.status !== "PUBLISHED") {
      return {
        platform,
        success: false,
        errorMessage: `Article must be PUBLISHED on WebVibez before distributing to ${platform}. Current status: ${article.status}`,
        timestamp,
      };
    }

    const adapter = ADAPTERS[platform];
    if (!adapter) {
      return {
        platform,
        success: false,
        errorMessage: `No adapter found for platform ${platform}.`,
        timestamp,
      };
    }

    // Execute publication
    const result = await adapter.publish(article);

    // Update distribution record in article
    const currentDistribution = article.distribution || ({} as Record<DistributionPlatform, DistributionRecord>);
    const record: DistributionRecord = {
      platform,
      status: result.success
        ? platform === "MEDIUM"
          ? "MANUAL_REQUIRED"
          : "PUBLISHED"
        : "FAILED",
      externalId: result.externalId,
      externalUrl: result.externalUrl,
      canonicalStatus: result.canonicalUrl ? "PASS" : "UNKNOWN",
      publishedAt: result.success ? timestamp : undefined,
      lastSyncAt: timestamp,
      errorMessage: result.errorMessage,
    };

    currentDistribution[platform] = record;
    await BlogRepository.updateArticle(article.id, {
      distribution: currentDistribution,
    });

    return result;
  },

  async distributeAll(articleId: string): Promise<Record<DistributionPlatform, DistributionResult>> {
    const results: Partial<Record<DistributionPlatform, DistributionResult>> = {};
    const platforms: DistributionPlatform[] = [
      "DEVTO",
      "HASHNODE",
      "MEDIUM",
      "BLOGGER",
      "TUMBLR",
      "NOTION",
    ];

    for (const platform of platforms) {
      results[platform] = await this.distributeToPlatform(articleId, platform);
    }

    return results as Record<DistributionPlatform, DistributionResult>;
  },
};
