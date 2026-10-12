import { NextResponse } from "next/server";
import { getCrmLiveSummary, pushLeadToCrm } from "@/lib/crm/sync";
import { getLeads } from "@/lib/leads/repository";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const crmSummary = await getCrmLiveSummary();
  return NextResponse.json({
    success: true,
    crmConnected: crmSummary.connected,
    crmTotalLeads: crmSummary.totalLeads,
  });
}

export async function POST() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getLeads();
    let syncedCount = 0;

    for (const l of leads) {
      if (l.phone) {
        const res = await pushLeadToCrm({
          name: l.name,
          phone: l.phone,
          email: l.email || undefined,
          solutionType: l.project_type || undefined,
          message: l.message || undefined,
        });
        if (res.success) {
          syncedCount++;
        }
      }
    }

    const crmSummary = await getCrmLiveSummary();

    return NextResponse.json({
      success: true,
      syncedCount,
      crmTotalLeads: crmSummary.totalLeads,
      message: `Successfully synchronized ${syncedCount} leads to Mobile CRM!`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
