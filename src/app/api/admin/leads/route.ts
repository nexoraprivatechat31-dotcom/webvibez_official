import { NextResponse } from "next/server";
import { getLeads, createLead, updateLeadStatus } from "@/lib/leads/repository";
import { cookies } from "next/headers";
import { initTursoSchema } from "@/lib/db/turso";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure DB schema exists on first load
  await initTursoSchema();

  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const leadId = await createLead(body);

    if (leadId) {
      return NextResponse.json({ success: true, id: leadId });
    }
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    const success = await updateLeadStatus(id, status);
    
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
