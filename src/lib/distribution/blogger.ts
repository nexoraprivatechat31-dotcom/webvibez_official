import { Article } from "../blog/types";
import { BrandSignature } from "./brand-signature";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

export const BloggerAdapter: DistributionAdapter = {
  platform: "BLOGGER",

  getCapability(): PlatformConfig {
    const blogId = process.env.BLOGGER_BLOG_ID;
    const apiKey = process.env.BLOGGER_API_KEY;
    const isConfigured = Boolean(blogId && apiKey);
    return {
      platform: "BLOGGER",
      name: "Google Blogger",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "Google Blogger v3 API with explicit backlink attribution and HTML rendering.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const blogId = process.env.BLOGGER_BLOG_ID;
    const apiKey = process.env.BLOGGER_API_KEY;

    if (!blogId || !apiKey) {
      return {
        platform: "BLOGGER",
        success: false,
        errorMessage: "BLOGGER_BLOG_ID or BLOGGER_API_KEY is not configured.",
        timestamp,
      };
    }

    try {
      const signatureHtml = BrandSignature.getHtmlSignature(article);

      const htmlContent = `
        <div class="webvibez-post">
          <div>
            ${article.content
              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
              .replace(/\n\n/g, "</p><p>")}
          </div>
          ${signatureHtml}
        </div>
      `;

      const payload = {
        kind: "blogger#post",
        title: article.title,
        content: htmlContent,
        labels: article.tags,
      };

      const res = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        return {
          platform: "BLOGGER",
          success: false,
          errorMessage: `Blogger API returned ${res.status}: ${errText}`,
          timestamp,
        };
      }

      const data = await res.json();
      return {
        platform: "BLOGGER",
        success: true,
        externalId: data.id,
        externalUrl: data.url,
        canonicalUrl: article.canonicalUrl,
        timestamp,
      };
    } catch (err: any) {
      return {
        platform: "BLOGGER",
        success: false,
        errorMessage: err.message || "Failed to communicate with Blogger API.",
        timestamp,
      };
    }
  },
};
