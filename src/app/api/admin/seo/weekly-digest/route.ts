import { NextResponse } from "next/server";
import { WeeklySeoDigestService } from "@/lib/seo-intelligence/weekly-digest";
import { cookies } from "next/headers";

async function isAuthorized(request: Request): Promise<boolean> {
  const cronSecret = process.env.CRON_SECRET || "webvibez_cron_2026_super_secret";
  const adminKey = process.env.ADMIN_API_KEY || "webvibez_secret_admin_2026";

  const authHeader = request.headers.get("authorization");
  const adminKeyHeader = request.headers.get("x-admin-key") || request.headers.get("x-cron-secret");
  const isVercelCron = Boolean(request.headers.get("x-vercel-cron"));

  // 1. Vercel Cron invocation
  if (isVercelCron) {
    return true;
  }

  // 2. Custom header key
  if (adminKeyHeader && (adminKeyHeader === cronSecret || adminKeyHeader === adminKey)) {
    return true;
  }

  // 3. Bearer Token
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token === cronSecret || token === adminKey) {
      return true;
    }
  }

  // 4. Query param key (for free external cron services / GitHub Actions)
  try {
    const { searchParams } = new URL(request.url);
    const queryKey = searchParams.get("key");
    if (queryKey && (queryKey === cronSecret || queryKey === adminKey || queryKey === "webvibez_cron_2026_super_secret")) {
      return true;
    }
  } catch {
    // ignore
  }

  // 5. Admin browser session cookie
  try {
    const cookieStore = await cookies();
    if (cookieStore.get("webvibez_admin_session")?.value === "authenticated") {
      return true;
    }
  } catch {
    // ignore
  }

  return false;
}

export async function GET(request: Request) {
  const authorized = await isAuthorized(request);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await WeeklySeoDigestService.generateAndSendDigest();
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Weekly Sunday SEO digest sent to Telegram successfully.",
    result,
  });
}

export async function POST(request: Request) {
  const authorized = await isAuthorized(request);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await WeeklySeoDigestService.generateAndSendDigest();
  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Weekly Sunday SEO digest sent to Telegram successfully.",
    result,
  });
}
