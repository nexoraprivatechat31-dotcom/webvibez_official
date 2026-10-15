import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return new NextResponse("f9e0106c25b24521a821af53af2a740c", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
