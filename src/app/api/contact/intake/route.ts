import { NextResponse } from "next/server";
import { CrmService } from "@/lib/crm/crm-service";
import { createLead } from "@/lib/leads/repository";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const directorName = (body.name || body.directorName || "Director").trim();
    const instituteName = (body.instituteName || body.academyName || "Coaching Academy").trim();
    const phone = (body.phone || body.whatsapp || "").trim();
    const city = (body.city || "").trim();
    const email = (body.email || "").trim();
    const platform = body.platform || "Android + iOS Native App";
    const stream = body.stream || body.category || "JEE / NEET Coaching";
    const selectedFeatures = Array.isArray(body.selectedFeatures) ? body.selectedFeatures : [];
    const studentScale = body.studentScale || body.students || "200 to 500 Students";
    const timeline = body.timeline || "Ready in 7 Days (Fast-Track)";
    const notes = body.notes || "";

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone / WhatsApp number is required." },
        { status: 400 }
      );
    }

    // 1. Save directly to Turso CRM DB and trigger Telegram
    const crmResult = await CrmService.handleWebsiteIntakeSubmission({
      directorName,
      instituteName,
      phone,
      whatsapp: phone,
      city,
      email,
      platform,
      stream,
      selectedFeatures,
      studentScale,
      timeline,
      notes,
      source: "Custom App Studio Blueprint",
    });

    // 2. Also save to local leads repository for redundancy
    try {
      await createLead({
        name: `${directorName} (${instituteName})`,
        phone,
        email: email || null,
        project_type: `${platform} - ${stream}`,
        message: `City: ${city} | Scale: ${studentScale} | Timeline: ${timeline}\nFeatures: ${selectedFeatures.join(", ")}\nNotes: ${notes}`,
        source: "Custom App Studio",
        status: "New",
      });
    } catch (e) {
      console.warn("Local lead save warning:", e);
    }

    return NextResponse.json({
      success: true,
      contactId: crmResult.contactId,
      message: "Your Custom App Blueprint has been received! Our team will contact you on WhatsApp with your prototype.",
    });
  } catch (err: any) {
    console.error("Intake submission error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process blueprint intake" },
      { status: 500 }
    );
  }
}
