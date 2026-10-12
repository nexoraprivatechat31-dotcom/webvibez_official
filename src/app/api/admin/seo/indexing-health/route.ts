import { NextResponse } from "next/server";
import { IndexingMonitor } from "@/lib/seo-intelligence/indexing-monitor";
import { GoogleSearchConsoleService } from "@/lib/seo-intelligence/google-search-console";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await IndexingMonitor.runAudit();
    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    console.error("Failed to run indexing audit:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to audit indexing health" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || "ping";

    if (action === "ping") {
      const pingResult = await IndexingMonitor.pingIndexNow(body.urls);
      return NextResponse.json(pingResult);
    }

    if (action === "audit_and_alert") {
      const report = await IndexingMonitor.runAudit();
      await IndexingMonitor.alertIfIssuesDetected(report, true);
      return NextResponse.json({ success: true, report });
    }

    if (action === "inspect_google") {
      const inspectUrl = body.url || "https://www.webvibez.com";
      const inspectResult = await GoogleSearchConsoleService.inspectUrl(inspectUrl);
      return NextResponse.json(inspectResult);
    }

    if (action === "submit_sitemap") {
      const result = await GoogleSearchConsoleService.submitSitemap();
      return NextResponse.json(result);
    }

    if (action === "get_analytics") {
      const days = typeof body.days === "number" ? body.days : 28;
      const snapshot = await GoogleSearchConsoleService.getSearchAnalyticsSnapshot(days);
      return NextResponse.json({ success: true, snapshot });
    }

    if (action === "generate_article_from_query") {
      const rawQuery = String(body.query || "Custom Software Solutions");
      // Clean search operators (-site:..., inurl:..., extra quotes)
      const cleanQ = rawQuery
        .replace(/-site:\S+/gi, "")
        .replace(/site:\S+/gi, "")
        .replace(/inurl:\S+/gi, "")
        .replace(/["']/g, "")
        .replace(/\s+/g, " ")
        .trim() || rawQuery.trim();

      const { AIGenerator } = await import("@/lib/seo-intelligence/ai-generator");
      const { BlogRepository } = await import("@/lib/blog/repository");

      const qLower = cleanQ.toLowerCase();
      let category = "Custom Software";
      let targetAudience = "Business founders, tech leaders, and growing companies in India";

      if (
        qLower.includes("coaching") ||
        qLower.includes("lms") ||
        qLower.includes("student") ||
        qLower.includes("attendance") ||
        qLower.includes("tuition") ||
        qLower.includes("institute") ||
        qLower.includes("lecture") ||
        qLower.includes("test series")
      ) {
        category = "Education Technology";
        targetAudience = "Coaching institute owners, tutors, and educational academy directors in India";
      } else if (
        qLower.includes("mobile") ||
        qLower.includes("app") ||
        qLower.includes("ios") ||
        qLower.includes("android") ||
        qLower.includes("react native") ||
        qLower.includes("flutter")
      ) {
        category = "Mobile App Development";
        targetAudience = "Entrepreneurs and business leaders looking to build high-performance mobile applications";
      } else if (
        qLower.includes("web") ||
        qLower.includes("website") ||
        qLower.includes("next.js") ||
        qLower.includes("frontend") ||
        qLower.includes("full stack")
      ) {
        category = "Website Development";
        targetAudience = "Modern business owners looking for high-speed, SEO-optimized web development";
      } else if (
        qLower.includes("automation") ||
        qLower.includes("crm") ||
        qLower.includes("erp") ||
        qLower.includes("whatsapp") ||
        qLower.includes("billing")
      ) {
        category = "Business Automation";
        targetAudience = "Founders and operations managers aiming to automate manual workflows and billing";
      }

      const strategy = JSON.stringify({
        topic: cleanQ,
        category,
        primaryKeyword: cleanQ,
        secondaryKeywords: [
          cleanQ,
          "software development company ahmedabad",
          "webvibez software solutions",
          "custom software development india 2026",
          "best tech agency gujarat"
        ],
        semanticTerms: ["pricing", "features", "architecture", "solutions", "2026", "automation", "roi"],
        searchIntent: "Commercial Investigation",
        targetAudience,
        suggestedSlug: cleanQ.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      });

      const published = await BlogRepository.getPublishedArticles();
      const recent = published.slice(0, 4).map((a) => ({ title: a.title, slug: a.slug }));
      const { en } = await AIGenerator.generateArticle(strategy, recent);

      const newArticle: any = {
        ...en,
        id: `art_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        status: "DRAFT",
        publicationDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
      };

      await BlogRepository.createArticle(newArticle);

      return NextResponse.json({
        success: true,
        message: `AI Draft created successfully for query: "${cleanQ}"!`,
        articleSlug: newArticle.slug,
        articleId: newArticle.id,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to perform indexing action" },
      { status: 500 }
    );
  }
}
