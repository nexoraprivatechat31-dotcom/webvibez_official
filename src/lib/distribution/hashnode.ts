import { Article } from "../blog/types";
import { BrandSignature } from "./brand-signature";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const HashnodeAdapter: DistributionAdapter = {
  platform: "HASHNODE",

  getCapability(): PlatformConfig {
    const apiKey = process.env.HASHNODE_API_KEY;
    const pubId = process.env.HASHNODE_PUBLICATION_ID;
    const isConfigured = Boolean(apiKey && pubId);
    return {
      platform: "HASHNODE",
      name: "Hashnode Engineering Blog",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "Automatic publishing via GraphQL API with originalArticleURL canonical attribution.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const apiKey = process.env.HASHNODE_API_KEY;
    const publicationId = process.env.HASHNODE_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      return {
        platform: "HASHNODE",
        success: false,
        errorMessage: "HASHNODE_API_KEY or HASHNODE_PUBLICATION_ID is not configured.",
        timestamp,
      };
    }

    try {
      const signature = BrandSignature.getMarkdownSignature(article);
      const contentWithAttribution = `${article.content}${signature}`;

      const mutation = `
        mutation PublishPost($input: PublishPostInput!) {
          publishPost(input: $input) {
            post {
              id
              url
              slug
            }
          }
        }
      `;

      const tags = article.tags.slice(0, 5).map((tag) => ({
        slug: tag.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        name: tag,
      }));

      const variables = {
        input: {
          title: article.title,
          subtitle: article.subtitle || article.description.slice(0, 100),
          publicationId: publicationId,
          contentMarkdown: contentWithAttribution,
          tags: tags,
          coverImageOptions: article.featuredImage
            ? { coverImageURL: article.featuredImage }
            : undefined,
          originalArticleURL: article.canonicalUrl,
        },
      };

      const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const json = await res.json();

      if (json.errors && json.errors.length > 0) {
        return {
          platform: "HASHNODE",
          success: false,
          errorMessage: json.errors[0]?.message || "Hashnode GraphQL error",
          timestamp,
        };
      }

      const post = json.data?.publishPost?.post;
      return {
        platform: "HASHNODE",
        success: true,
        externalId: post?.id,
        externalUrl: post?.url,
        canonicalUrl: article.canonicalUrl,
        timestamp,
      };
    } catch (err: any) {
      return {
        platform: "HASHNODE",
        success: false,
        errorMessage: err.message || "Failed to communicate with Hashnode GraphQL API.",
        timestamp,
      };
    }
  },
};
