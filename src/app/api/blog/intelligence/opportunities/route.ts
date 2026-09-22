import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { RecommendationEngine } from "@/lib/seo-intelligence/recommendation-engine";

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const opportunities = await RecommendationEngine.discoverKeywordOpportunities();
    return NextResponse.json({
      success: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to discover opportunities." },
      { status: 500 }
    );
  }
}
