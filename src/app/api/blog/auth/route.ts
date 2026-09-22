import { NextRequest, NextResponse } from "next/server";
import { getAdminSecret } from "@/lib/blog/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;
    const secret = getAdminSecret();

    if (!key || key !== secret) {
      return NextResponse.json(
        { success: false, error: "Invalid admin key." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
      token: secret,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Authentication error." },
      { status: 500 }
    );
  }
}
