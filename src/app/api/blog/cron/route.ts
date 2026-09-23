import { NextRequest, NextResponse } from "next/server";
import { DailyPublishingEngine } from "@/lib/seo-intelligence/daily-publisher";
import { revalidatePath } from "next/cache";

function verifyCronAuth(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET || "webvibez_cron_2026_super_secret";
  const adminKey = process.env.BLOG_ADMIN_KEY || "webvibez_admin_2026_secret_key";

  const authHeader = request.headers.get("authorization");
  const adminKeyHeader = request.headers.get("x-admin-key") || request.headers.get("x-cron-secret");
  const isVercelCron = Boolean(request.headers.get("x-vercel-cron"));

  if (isVercelCron) {
    return true;
  }

  if (adminKeyHeader && (adminKeyHeader === cronSecret || adminKeyHeader === adminKey)) {
    return true;
  }

  if (authHeader) {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      const token = parts[1];
      if (token === cronSecret || token === adminKey) {
        return true;
      }
    }
  }

  return false;
}

export async function GET(request: NextRequest) {
  return handleCron(request);
}

export async function POST(request: NextRequest) {
  return handleCron(request);
}

async function handleCron(request: NextRequest) {
  // Strict Bearer CRON_SECRET authorization check
  if (!verifyCronAuth(request)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    // Execute daily publication with idempotency key
    const log = await DailyPublishingEngine.executeDailyPublication(force);

    if (log.status === "SUCCESS" && log.articleSlug) {
      try {
        revalidatePath("/blog");
        revalidatePath("/sitemap.xml");
        revalidatePath(`/blog/${log.articleSlug}`);
      } catch (e) {
        // Revalidation in dev/static
      }
    }

    return NextResponse.json({
      success: log.status === "SUCCESS" || log.status === "ALREADY_PUBLISHED",
      log,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Cron execution error." },
      { status: 500 }
    );
  }
}
