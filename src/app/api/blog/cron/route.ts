import { NextRequest, NextResponse } from "next/server";
import { DailyPublishingEngine } from "@/lib/seo-intelligence/daily-publisher";
import { revalidatePath } from "next/cache";

function verifyCronAuth(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET || process.env.BLOG_ADMIN_KEY;
  if (!cronSecret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${cronSecret}`) {
    return true;
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
