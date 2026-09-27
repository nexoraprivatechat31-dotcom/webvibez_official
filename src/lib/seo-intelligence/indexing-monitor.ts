import sitemap from "@/app/sitemap";
import { TelegramNotifier } from "../notifications/telegram";

export interface UrlAuditResult {
  url: string;
  path: string;
  statusCode: number;
  statusText: string;
  isIndexable: boolean;
  canonicalUrl: string | null;
  canonicalMatches: boolean;
  hasNoindex: boolean;
  isRobotsAllowed: boolean;
  hasTitle: boolean;
  title: string | null;
  hasDescription: boolean;
  hasFavicon: boolean;
  hasSchema: boolean;
  responseTimeMs: number;
  issues: string[];
}

export interface IndexingAuditReport {
  timestamp: string;
  totalUrls: number;
  healthyCount: number;
  warningCount: number;
  errorCount: number;
  overallScore: number;
  results: UrlAuditResult[];
  summary: {
    sitemapValid: boolean;
    robotsTxtAllowed: boolean;
    googleFaviconCompliant: boolean;
    noindexDetected: boolean;
  };
}

export const IndexingMonitor = {
  /**
   * Run a comprehensive audit of all sitemap URLs
   */
  async runAudit(baseUrl = "https://www.webvibez.com"): Promise<IndexingAuditReport> {
    const sitemapEntries = await sitemap();
    const results: UrlAuditResult[] = [];

    for (const entry of sitemapEntries) {
      const url = entry.url;
      const path = url.replace(baseUrl, "") || "/";
      const startTime = Date.now();
      const issues: string[] = [];

      let statusCode = 0;
      let statusText = "";
      let html = "";
      let hasNoindex = false;
      let canonicalUrl: string | null = null;
      let title: string | null = null;
      let hasDescription = false;
      let hasFavicon = false;
      let hasSchema = false;

      // Check robots.txt disallow rules (admin and internal apis)
      const isRobotsAllowed =
        !path.startsWith("/admin") &&
        !path.startsWith("/api/checkout") &&
        !path.startsWith("/api/payment");

      if (!isRobotsAllowed) {
        issues.push("Blocked by robots.txt disallow rule");
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            Accept: "text/html,application/xhtml+xml",
          },
          signal: controller.signal,
          redirect: "manual",
        });

        clearTimeout(timeoutId);
        statusCode = response.status;
        statusText = response.statusText;

        if (statusCode >= 300 && statusCode < 400) {
          const loc = response.headers.get("location");
          issues.push(`Returns redirect ${statusCode} to ${loc || "unknown"}`);
        } else if (statusCode !== 200) {
          issues.push(`HTTP ${statusCode} ${statusText}`);
        }

        const xRobots = response.headers.get("x-robots-tag");
        if (xRobots && xRobots.toLowerCase().includes("noindex")) {
          hasNoindex = true;
          issues.push("X-Robots-Tag header contains noindex");
        }

        if (statusCode === 200) {
          html = await response.text();

          // Check HTML noindex
          if (html.toLowerCase().includes('content="noindex') || html.toLowerCase().includes("content='noindex")) {
            hasNoindex = true;
            issues.push("HTML meta robots tag contains noindex");
          }

          // Canonical tag
          const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
          if (canonicalMatch) {
            canonicalUrl = canonicalMatch[1];
          }

          // Title
          const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
          if (titleMatch) {
            title = titleMatch[1];
          } else {
            issues.push("Missing <title> tag");
          }

          // Description
          hasDescription = html.includes('name="description"') || html.includes("name='description'");
          if (!hasDescription) {
            issues.push("Missing meta description");
          }

          // Favicon
          hasFavicon = html.includes('rel="icon"') || html.includes("rel='icon'");
          if (!hasFavicon) {
            issues.push("Missing <link rel='icon'> favicon tag");
          }

          // Schema JSON-LD
          hasSchema = html.includes('type="application/ld+json"');
        }
      } catch (err: any) {
        statusCode = 0;
        statusText = err.message || "Network error";
        issues.push(`Failed to reach URL: ${statusText}`);
      }

      const responseTimeMs = Date.now() - startTime;
      const canonicalMatches = canonicalUrl === url;

      if (canonicalUrl && !canonicalMatches) {
        issues.push(`Canonical URL mismatch: points to ${canonicalUrl}`);
      }

      const isIndexable =
        statusCode === 200 &&
        !hasNoindex &&
        isRobotsAllowed &&
        issues.length === 0;

      results.push({
        url,
        path,
        statusCode,
        statusText,
        isIndexable,
        canonicalUrl,
        canonicalMatches,
        hasNoindex,
        isRobotsAllowed,
        hasTitle: Boolean(title),
        title,
        hasDescription,
        hasFavicon,
        hasSchema,
        responseTimeMs,
        issues,
      });
    }

    const healthyCount = results.filter((r) => r.isIndexable).length;
    const warningCount = results.filter((r) => !r.isIndexable && r.statusCode === 200).length;
    const errorCount = results.filter((r) => r.statusCode !== 200).length;

    const overallScore = Math.round(
      (healthyCount / Math.max(results.length, 1)) * 100
    );

    return {
      timestamp: new Date().toISOString(),
      totalUrls: results.length,
      healthyCount,
      warningCount,
      errorCount,
      overallScore,
      results,
      summary: {
        sitemapValid: results.length > 0,
        robotsTxtAllowed: results.every((r) => r.isRobotsAllowed),
        googleFaviconCompliant: results.every((r) => r.hasFavicon),
        noindexDetected: results.some((r) => r.hasNoindex),
      },
    };
  },

  /**
   * Dispatch IndexNow ping to search engines for instant crawling
   */
  async pingIndexNow(urls?: string[]): Promise<{ success: boolean; message: string; response?: any }> {
    const baseUrl = "https://www.webvibez.com";
    let urlList = urls;

    if (!urlList || urlList.length === 0) {
      const sitemapEntries = await sitemap();
      urlList = sitemapEntries.map((e) => e.url);
    }

    const payload = {
      host: "www.webvibez.com",
      key: "webvibez-indexnow-key",
      keyLocation: `${baseUrl}/webvibez-indexnow-key.txt`,
      urlList: urlList.slice(0, 100), // Max 100 per batch
    };

    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      // Also trigger Google sitemap ping
      try {
        await fetch(`https://www.google.com/ping?sitemap=${baseUrl}/sitemap.xml`);
      } catch (e) {
        // Ping is best-effort
      }

      if (res.status === 200 || res.status === 202) {
        return {
          success: true,
          message: `IndexNow ping dispatched successfully for ${payload.urlList.length} URLs.`,
        };
      }

      return {
        success: false,
        message: `IndexNow returned status ${res.status}`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Failed to ping IndexNow: ${err.message}`,
      };
    }
  },

  /**
   * Send audit summary alert to Telegram if any issues are detected
   */
  async alertIfIssuesDetected(report: IndexingAuditReport): Promise<void> {
    const errorUrls = report.results.filter((r) => !r.isIndexable);
    if (errorUrls.length === 0) return;

    const messageLines = [
      `🚨 <b>WebVibez SEO Indexing Alert</b>`,
      `Score: <b>${report.overallScore}/100</b>`,
      `Total URLs: ${report.totalUrls} | Issues: ${errorUrls.length}`,
      ``,
      `<b>Affected Pages:</b>`,
    ];

    for (const item of errorUrls.slice(0, 5)) {
      messageLines.push(`• <code>${item.path}</code>: ${item.issues.join(", ")}`);
    }

    if (errorUrls.length > 5) {
      messageLines.push(`<i>...and ${errorUrls.length - 5} more URLs.</i>`);
    }

    messageLines.push(``);
    messageLines.push(`Check dashboard at <code>/admin/seo</code> to inspect.`);

    await TelegramNotifier.sendMessage(messageLines.join("\n")).catch(() => {});
  },
};
