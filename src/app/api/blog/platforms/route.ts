import { NextResponse } from "next/server";
import { DistributionManager } from "@/lib/distribution/manager";

export async function GET() {
  try {
    const platforms = DistributionManager.getPlatformCapabilities();
    return NextResponse.json({ success: true, platforms });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to get platform capabilities." },
      { status: 500 }
    );
  }
}
