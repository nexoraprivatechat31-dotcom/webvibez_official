import crypto from "crypto";
import { GSCRow, GSCSnapshot } from "./types";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getGSCAccessToken(): Promise<string | null> {
  if (process.env.GSC_ACCESS_TOKEN) {
    return process.env.GSC_ACCESS_TOKEN;
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.token;
  }

  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  let privateKey = process.env.GSC_PRIVATE_KEY;

  if (!clientEmail || !privateKey) return null;

  try {
    privateKey = privateKey.replace(/\\n/g, "\n");
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
    const claim = Buffer.from(
      JSON.stringify({
        iss: clientEmail,
        scope: "https://www.googleapis.com/auth/webmasters",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      })
    ).toString("base64url");

    const sign = crypto.createSign("RSA-SHA256");
    sign.update(header + "." + claim);
    const signature = sign.sign(privateKey, "base64url");
    const jwt = header + "." + claim + "." + signature;

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!res.ok) {
      console.error("GSC OAuth token fetch failed:", await res.text());
      return null;
    }

    const data = await res.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
    };
    return cachedToken.token;
  } catch (err) {
    console.error("Failed to generate GSC token:", err);
    return null;
  }
}

export const GoogleSearchConsoleService = {
  isConfigured(): boolean {
    const siteUrl = process.env.GSC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
    const clientEmail = process.env.GSC_CLIENT_EMAIL;
    const privateKey = process.env.GSC_PRIVATE_KEY;
    const accessToken = process.env.GSC_ACCESS_TOKEN;
    return Boolean(siteUrl && (accessToken || (clientEmail && privateKey)));
  },

  async getSearchAnalyticsSnapshot(days = 28): Promise<GSCSnapshot> {
    const now = new Date();
    const endDate = now.toISOString().split("T")[0];
    const startDateObj = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const startDate = startDateObj.toISOString().split("T")[0];

    const accessToken = await getGSCAccessToken();

    // If official Google Search Console API credentials are provided:
    if (accessToken) {
      try {
        const configuredUrl = process.env.GSC_SITE_URL || "https://www.webvibez.com/";
        const siteUrlParam = encodeURIComponent(configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`);
        
        const res = await fetch(
          `https://www.googleapis.com/webmasters/v3/sites/${siteUrlParam}/searchAnalytics/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              startDate,
              endDate,
              dimensions: ["query", "page", "country", "device"],
              rowLimit: 500,
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const rows: GSCRow[] = (data.rows || []).map((r: any) => ({
            query: r.keys[0],
            page: r.keys[1],
            country: r.keys[2],
            device: r.keys[3],
            clicks: r.clicks || 0,
            impressions: r.impressions || 0,
            ctr: r.ctr || 0,
            position: r.position || 0,
            date: endDate,
          }));

          const totalClicks = rows.reduce((sum, r) => sum + r.clicks, 0);
          const totalImpressions = rows.reduce((sum, r) => sum + r.impressions, 0);
          const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
          const avgPos = rows.length > 0 ? rows.reduce((sum, r) => sum + r.position, 0) / rows.length : 0;

          return {
            startDate,
            endDate,
            totalClicks,
            totalImpressions,
            averageCtr: Number(avgCtr.toFixed(3)),
            averagePosition: Number(avgPos.toFixed(1)),
            rows, // 100% REAL rows from Google Search Console!
            isConfigured: true,
            lastSyncAt: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.error("GSC API query error:", err);
      }
    }

    // Zero-data real state (no fake or demo clicks)
    return {
      startDate,
      endDate,
      totalClicks: 0,
      totalImpressions: 0,
      averageCtr: 0,
      averagePosition: 0,
      rows: [],
      isConfigured: Boolean(accessToken),
      lastSyncAt: new Date().toISOString(),
    };
  },

  classifyOpportunityType(row: GSCRow): {
    opportunityType:
      | "HIGH_IMPRESSION_LOW_CTR"
      | "STRIKING_DISTANCE_POS_4_20"
      | "HIGH_IMPRESSION_NO_DEDICATED_PAGE"
      | "TOP_PERFORMER_EXPANSION"
      | "NEW_CLUSTER_OPPORTUNITY";
    reason: string;
  } {
    if (row.impressions > 3000 && row.ctr < 0.02) {
      return {
        opportunityType: "HIGH_IMPRESSION_LOW_CTR",
        reason: `High impression query (${row.impressions}) with low CTR (${(row.ctr * 100).toFixed(1)}%). Improving angle or title can capture untapped clicks.`,
      };
    }

    if (row.position >= 4 && row.position <= 20) {
      return {
        opportunityType: "STRIKING_DISTANCE_POS_4_20",
        reason: `Striking distance position (${row.position.toFixed(1)}). A dedicated, authoritative post can lift this query onto Page 1.`,
      };
    }

    if (row.clicks > 100 && row.position <= 10) {
      return {
        opportunityType: "TOP_PERFORMER_EXPANSION",
        reason: `Proven top performing topic (${row.clicks} clicks). Expand into subtopics and supporting guides.`,
      };
    }

    return {
      opportunityType: "HIGH_IMPRESSION_NO_DEDICATED_PAGE",
      reason: `Query has active search impressions (${row.impressions}) but no dedicated article yet.`,
    };
  },

  async inspectUrl(inspectionUrl: string, siteUrl = process.env.GSC_SITE_URL || "https://www.webvibez.com") {
    const token = await getGSCAccessToken();
    if (!token) {
      return { success: false, error: "GSC credentials not configured" };
    }

    try {
      const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          inspectionUrl,
          siteUrl,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, error: `Google API error: ${res.status} - ${errorText}` };
      }

      const data = await res.json();
      const status = data.inspectionResult?.indexStatusResult;
      return {
        success: true,
        inspectionUrl,
        verdict: status?.verdict || "UNKNOWN",
        coverageState: status?.coverageState || "Unknown",
        robotsTxtState: status?.robotsTxtState || "ALLOWED",
        indexingState: status?.indexingState || "INDEXING_ALLOWED",
        lastCrawlTime: status?.lastCrawlTime || null,
        pageFetchState: status?.pageFetchState || null,
        userCanonical: status?.userCanonical || null,
        googleCanonical: status?.googleCanonical || null,
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to inspect URL" };
    }
  },

  async submitSitemap(
    feedpath = "https://www.webvibez.com/sitemap.xml",
    siteUrl = "https://www.webvibez.com/"
  ): Promise<{ success: boolean; message: string }> {
    const token = await getGSCAccessToken();
    if (!token) {
      return { success: false, message: "GSC credentials not configured" };
    }

    try {
      const submitUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`;
      const res = await fetch(submitUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Length": "0",
        },
      });

      if (res.status === 200 || res.status === 204) {
        return { success: true, message: "Sitemap submitted successfully to Google Search Console." };
      }

      const text = await res.text();
      return { success: false, message: `Google API error ${res.status}: ${text}` };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to submit sitemap" };
    }
  },
};
