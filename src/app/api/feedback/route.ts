import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCrmTursoClient } from "@/lib/crm/crm-service";
import { TelegramNotifier } from "@/lib/notifications/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.name || "Anonymous Visitor").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const rating = Number(body.rating || 5);
    const feedback = (body.feedback || body.message || "").trim();
    const institute = (body.institute || "").trim();
    const role = (body.role || "Coaching Owner / Visitor").trim();

    if (!feedback) {
      return NextResponse.json({ success: false, error: "Feedback message cannot be empty" }, { status: 400 });
    }

    const client = getCrmTursoClient();
    if (client) {
      const contactId = `fb-${Date.now()}`;
      try {
        await client.execute({
          sql: `
            INSERT INTO crm_contacts (
              id, institute_name, category, primary_contact_person, primary_phone,
              email, lead_status, interest_level, data_source, general_remarks,
              created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, 'Feedback', 'Medium', 'Website Feedback', ?, ?, ?)
          `,
          args: [
            contactId,
            institute || "Website Feedback",
            role,
            name,
            phone || "N/A",
            email,
            `⭐ Rating: ${rating}/5\n💬 Feedback: ${feedback}`,
            Date.now(),
            Date.now(),
          ],
        });
      } catch (err) {
        console.error("Failed to store feedback in CRM DB:", err);
      }
    }

    // Telegram Alert for Feedback
    const telegramHtml = `
🌟 <b>NEW WEBSITE FEEDBACK RECEIVED!</b>

👤 <b>From:</b> ${name} ${institute ? `(${institute})` : ""}
⭐ <b>Rating:</b> ${"⭐".repeat(rating)} (${rating}/5)
${phone ? `📱 <b>Phone:</b> ${phone}\n` : ""}
${email ? `✉️ <b>Email:</b> ${email}\n` : ""}
💬 <b>Feedback:</b>
"${feedback}"
    `.trim();

    try {
      await TelegramNotifier.sendMessage(telegramHtml);
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Thank you for your valuable feedback!",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = getCrmTursoClient();
  if (!client) {
    return NextResponse.json({ success: true, feedbacks: [] });
  }

  try {
    const res = await client.execute(`
      SELECT id, institute_name, category, primary_contact_person, primary_phone, email, general_remarks, created_at
      FROM crm_contacts
      WHERE data_source = 'Website Feedback' OR lead_status = 'Feedback'
      ORDER BY created_at DESC
    `);

    const feedbacks = res.rows.map((r: any) => ({
      id: String(r.id),
      name: String(r.primary_contact_person || "Anonymous"),
      institute: String(r.institute_name || ""),
      role: String(r.category || ""),
      phone: String(r.primary_phone || ""),
      email: String(r.email || ""),
      content: String(r.general_remarks || ""),
      created_at: Number(r.created_at || Date.now()),
    }));

    return NextResponse.json({ success: true, feedbacks });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
