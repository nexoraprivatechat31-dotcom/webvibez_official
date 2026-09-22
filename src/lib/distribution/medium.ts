import { Article } from "../blog/types";
import { BrandSignature } from "./brand-signature";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const MediumAdapter: DistributionAdapter = {
  platform: "MEDIUM",

  getCapability(): PlatformConfig {
    const token = process.env.MEDIUM_INTEGRATION_TOKEN;
    const isConfigured = Boolean(token && token.length > 5);
    return {
      platform: "MEDIUM",
      name: "Medium Publication",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: !isConfigured,
      description: "Direct automated publishing to Medium via official REST API with canonical attribution.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const token = process.env.MEDIUM_INTEGRATION_TOKEN;
    let authorId = process.env.MEDIUM_AUTHOR_ID;
    const publicationId = process.env.MEDIUM_PUBLICATION_ID;

    // If no token is configured, provide the official import URL deep link as fallback
    if (!token) {
      const encodedCanonical = encodeURIComponent(article.canonicalUrl);
      const manualActionUrl = `https://medium.com/p/import?url=${encodedCanonical}`;
      return {
        platform: "MEDIUM",
        success: false,
        manualActionUrl,
        canonicalUrl: article.canonicalUrl,
        errorMessage: "MEDIUM_INTEGRATION_TOKEN is not configured in .env.local. Add your token to enable 100% direct automated publishing.",
        timestamp,
      };
    }

    try {
      // 1. If authorId is not provided, fetch user details via GET /v1/me
      if (!authorId && !publicationId) {
        const meRes = await fetch("https://api.medium.com/v1/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!meRes.ok) {
          const errText = await meRes.text();
          return {
            platform: "MEDIUM",
            success: false,
            errorMessage: `Medium /v1/me failed (${meRes.status}): ${errText}`,
            timestamp,
          };
        }

        const meData = await meRes.json();
        authorId = meData.data?.id;

        if (!authorId) {
          return {
            platform: "MEDIUM",
            success: false,
            errorMessage: "Could not retrieve authorId from Medium API.",
            timestamp,
          };
        }
      }

      // 2. Prepare markdown content with hero image and canonical attribution
      const signature = BrandSignature.getMarkdownSignature(article);

      const heroImageMd = article.featuredImage
        ? `![${article.featuredImageAlt || article.title}](${article.featuredImage})\n\n`
        : "";

      const markdownContent = `# ${article.title}\n\n${heroImageMd}${article.content}${signature}`;

      const tags = (article.tags || ["webvibez", "tech", "software"])
        .slice(0, 5)
        .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 25))
        .filter(Boolean);

      const payload = {
        title: article.title,
        contentFormat: "markdown",
        content: markdownContent,
        tags: tags.length > 0 ? tags : ["webvibez", "software", "tech"],
        canonicalUrl: article.canonicalUrl,
        publishStatus: "public",
      };

      // 3. Post article to Medium (Publication or Author Profile)
      const postEndpoint = publicationId
        ? `https://api.medium.com/v1/publications/${publicationId}/posts`
        : `https://api.medium.com/v1/users/${authorId}/posts`;

      const postRes = await fetch(postEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!postRes.ok) {
        const errText = await postRes.text();
        return {
          platform: "MEDIUM",
          success: false,
          errorMessage: `Medium post creation failed (${postRes.status}): ${errText}`,
          timestamp,
        };
      }

      const postData = await postRes.json();
      const liveUrl = postData.data?.url;
      const postId = postData.data?.id;

      return {
        platform: "MEDIUM",
        success: true,
        externalId: postId ? String(postId) : undefined,
        externalUrl: liveUrl,
        canonicalUrl: article.canonicalUrl,
        timestamp,
      };
    } catch (err: any) {
      return {
        platform: "MEDIUM",
        success: false,
        errorMessage: err.message || "Failed to communicate with Medium API.",
        timestamp,
      };
    }
  },
};
