import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads/repository";
import { pushLeadToCrm } from "@/lib/crm/sync";
import { TelegramNotifier } from "@/lib/notifications/telegram";
import { initTursoSchema } from "@/lib/db/turso";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, organization, solutionType, studentVolume, timeline, message } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    // Ensure Website Turso schema exists
    await initTursoSchema();

    // 1. Store in Website Leads repository
    const websiteNotes = [
      organization ? `Organization: ${organization}` : null,
      studentVolume ? `Student Volume: ${studentVolume}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean).join("\n");

    const websiteLeadId = await createLead({
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone.trim(),
      project_type: solutionType || "Mobile App + ERP",
      message: message?.trim() || null,
      source: "Website Form",
      status: "New",
      internal_notes: websiteNotes,
    });

    // 2. Direct Sync into Mobile CRM (crm_contacts)
    const crmSyncResult = await pushLeadToCrm({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      organization: organization?.trim(),
      solutionType,
      studentVolume,
      timeline,
      message: message?.trim(),
    });

    // 3. Dispatch Live Telegram Alert to Owner/Team
    try {
      await TelegramNotifier.sendLeadAlert({
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim(),
        organization: organization?.trim(),
        solutionType,
        studentVolume,
        timeline,
        message: message?.trim(),
      });
    } catch (teleErr) {
      console.warn("Telegram alert notification failed:", teleErr);
    }

    return NextResponse.json({
      success: true,
      websiteLeadId,
      crmSynced: crmSyncResult.success,
      crmContactId: crmSyncResult.contactId,
      message: "Inquiry successfully recorded and synced to CRM!",
    });
  } catch (error: any) {
    console.error("Error processing website contact submission:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
