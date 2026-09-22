import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { TelegramNotifier } from "@/lib/notifications/telegram";

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const testMessage = `
🤖 <b>WebVibez Telegram Bot Connected!</b>

✅ <b>Status:</b> Ready for Daily 09:30 AM IST Automated Publishing Alerts.
📌 <b>Chat ID:</b> <code>${process.env.TELEGRAM_CHAT_ID}</code>
🔗 <b>Website:</b> <a href="https://webvibez.com">https://webvibez.com</a>

<i>You will receive instant alerts with live blog URLs and syndication status whenever a post is published.</i>
    `.trim();

    const result = await TelegramNotifier.sendMessage(testMessage);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Test message sent to Telegram successfully!",
      messageId: result.messageId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send Telegram test message." },
      { status: 500 }
    );
  }
}
