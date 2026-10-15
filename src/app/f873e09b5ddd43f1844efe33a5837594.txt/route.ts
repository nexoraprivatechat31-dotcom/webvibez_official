import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return new NextResponse("f873e09b5ddd43f1844efe33a5837594", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
