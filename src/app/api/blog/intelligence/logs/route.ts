import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { DailyPublishingEngine } from "@/lib/seo-intelligence/daily-publisher";

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const logs = DailyPublishingEngine.getRecentLogs();
    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch logs." },
      { status: 500 }
    );
  }
}
