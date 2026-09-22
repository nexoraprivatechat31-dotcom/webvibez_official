import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { DistributionManager } from "@/lib/distribution/manager";
import { DistributionPlatform } from "@/lib/blog/types";

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { articleId, platform } = body;

    if (!articleId) {
      return NextResponse.json(
        { success: false, error: "articleId is required." },
        { status: 400 }
      );
    }

    if (platform && platform !== "ALL") {
      const result = await DistributionManager.distributeToPlatform(
        articleId,
        platform as DistributionPlatform
      );
      return NextResponse.json({ success: result.success, result });
    }

    // Distribute to all configured platforms
    const results = await DistributionManager.distributeAll(articleId);
    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Distribution failed." },
      { status: 500 }
    );
  }
}
