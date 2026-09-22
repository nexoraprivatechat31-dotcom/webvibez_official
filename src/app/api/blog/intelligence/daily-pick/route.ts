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

    const result = await RecommendationEngine.selectDailyTopOpportunity();
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to select daily opportunity." },
      { status: 500 }
    );
  }
}
