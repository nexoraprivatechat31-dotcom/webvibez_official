import crypto from "crypto";
import { Article } from "../blog/types";
import { BrandSignature } from "./brand-signature";
import { DistributionAdapter, DistributionResult, PlatformConfig } from "./types";

function rfc3986(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

function generateTumblrOAuthHeader(
  method: string,
  url: string,
  consumerKey: string,
  consumerSecret: string,
  oauthToken: string,
  oauthSecret: string,
  extraParams: Record<string, string> = {}
): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: oauthToken,
    oauth_version: "1.0",
    ...extraParams,
  };

  const sortedKeys = Object.keys(oauthParams).sort();
  const paramString = sortedKeys
    .map((k) => `${rfc3986(k)}=${rfc3986(oauthParams[k])}`)
    .join("&");

  const baseString = `${method.toUpperCase()}&${rfc3986(url)}&${rfc3986(paramString)}`;
  const signingKey = `${rfc3986(consumerSecret)}&${rfc3986(oauthSecret)}`;

  const signature = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  oauthParams.oauth_signature = signature;

  return (
    "OAuth " +
    Object.keys(oauthParams)
      .filter((k) => k.startsWith("oauth_"))
      .sort()
      .map((k) => `${rfc3986(k)}="${rfc3986(oauthParams[k])}"`)
      .join(", ")
  );
}

export const TumblrAdapter: DistributionAdapter = {
  platform: "TUMBLR",

  getCapability(): PlatformConfig {
    const blogName = process.env.TUMBLR_BLOG_NAME;
    const apiKey = process.env.TUMBLR_API_KEY;
    const isConfigured = Boolean(blogName && apiKey);
    return {
      platform: "TUMBLR",
      name: "Tumblr Blog",
      capability: isConfigured ? "SUPPORTED" : "NOT_CONFIGURED",
      isConfigured,
      requiresManualAction: false,
      description: "Automated OAuth 1.0a publication with rich visual content and WebVibez author signatures.",
    };
  },

  async publish(article: Article): Promise<DistributionResult> {
    const timestamp = new Date().toISOString();
    const blogName = process.env.TUMBLR_BLOG_NAME;
    const consumerKey = process.env.TUMBLR_API_KEY;
    const consumerSecret = process.env.TUMBLR_API_SECRET;
    const oauthToken = process.env.TUMBLR_OAUTH_TOKEN;
    const oauthSecret = process.env.TUMBLR_OAUTH_SECRET;

    if (!blogName || !consumerKey) {
      return {
        platform: "TUMBLR",
        success: false,
        errorMessage: "TUMBLR_BLOG_NAME or TUMBLR_API_KEY is not configured.",
        timestamp,
      };
    }

    try {
      const url = `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/post`;

      const signatureHtml = BrandSignature.getHtmlSignature(article);

      const summaryHtml = `
        <h2>${article.title}</h2>
        ${article.featuredImage ? `<p><img src="${article.featuredImage}" alt="${article.title}" /></p>` : ""}
        <p>${article.excerpt || article.description}</p>
        ${article.aeoDirectAnswer ? `<blockquote>${article.aeoDirectAnswer}</blockquote>` : ""}
        ${signatureHtml}
      `.trim();

      const postParams: Record<string, string> = {
        type: "text",
        title: article.title,
        body: summaryHtml,
        tags: (article.tags || ["webvibez", "tech", "software"]).slice(0, 5).join(","),
      };

      let authHeader = `Bearer ${consumerKey}`;
      let bodyData = Object.keys(postParams)
        .map((k) => `${rfc3986(k)}=${rfc3986(postParams[k])}`)
        .join("&");
      const contentType = "application/x-www-form-urlencoded";

      if (consumerSecret && oauthToken && oauthSecret) {
        authHeader = generateTumblrOAuthHeader(
          "POST",
          url,
          consumerKey,
          consumerSecret,
          oauthToken,
          oauthSecret,
          postParams
        );
      }

      let res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": contentType,
        },
        body: bodyData,
      });

      // If transient 401 error, retry once after 1 second
      if (res.status === 401 && consumerSecret && oauthToken && oauthSecret) {
        await new Promise((r) => setTimeout(r, 1000));
        const retryAuthHeader = generateTumblrOAuthHeader(
          "POST",
          url,
          consumerKey,
          consumerSecret,
          oauthToken,
          oauthSecret,
          postParams
        );
        res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: retryAuthHeader,
            "Content-Type": contentType,
          },
          body: bodyData,
        });
      }

      if (!res.ok) {
        const errText = await res.text();
        return {
          platform: "TUMBLR",
          success: false,
          errorMessage: `Tumblr API returned ${res.status}: ${errText}`,
          timestamp,
        };
      }

      const data = await res.json();
      const postId = data.response?.id_string || data.response?.id;
      const externalUrl = postId
        ? `https://www.tumblr.com/${blogName}/${postId}`
        : `https://www.tumblr.com/blog/view/${blogName}`;

      return {
        platform: "TUMBLR",
        success: true,
        externalId: String(postId),
        externalUrl: externalUrl,
        canonicalUrl: article.canonicalUrl,
        timestamp,
      };
    } catch (err: any) {
      return {
        platform: "TUMBLR",
        success: false,
        errorMessage: err.message || "Failed to communicate with Tumblr API.",
        timestamp,
      };
    }
  },
};
