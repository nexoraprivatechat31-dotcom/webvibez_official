import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Remove potential surrounding quotes and whitespace from env var
    const envPassword = (process.env.ADMIN_PASSWORD || "").replace(/^["']|["']$/g, "").trim();
    
    if (password === envPassword) {
      // Set a secure HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set("webvibez_admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
