import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { GoogleSearchConsoleService } from "@/lib/seo-intelligence/google-search-console";

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "28", 10);

    const snapshot = await GoogleSearchConsoleService.getSearchAnalyticsSnapshot(days);
    return NextResponse.json({
      success: true,
      snapshot,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch Search Console data." },
      { status: 500 }
    );
  }
}
