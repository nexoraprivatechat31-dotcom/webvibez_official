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
      await IndexingMonitor.alertIfIssuesDetected(report);
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

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to perform indexing action" },
      { status: 500 }
    );
  }
}
