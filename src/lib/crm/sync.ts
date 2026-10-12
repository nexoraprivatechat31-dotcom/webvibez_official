import { createClient, Client } from "@libsql/client";

let crmClient: Client | null = null;

export function getCrmTursoClient(): Client | null {
  const url = process.env.CRM_TURSO_DATABASE_URL;
  const authToken = process.env.CRM_TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  if (!crmClient) {
    crmClient = createClient({
      url,
      authToken,
    });
  }

  return crmClient;
}

export interface WebsiteLeadPayload {
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  solutionType?: string;
  studentVolume?: string;
  timeline?: string;
  message?: string;
}

export async function pushLeadToCrm(payload: WebsiteLeadPayload): Promise<{ success: boolean; contactId?: string; error?: string }> {
  const client = getCrmTursoClient();
  if (!client) {
    console.warn("CRM Turso Client not configured. Skipping CRM sync.");
    return { success: false, error: "CRM Turso not configured" };
  }

  const id = `cont-web-${Date.now()}`;
  const now = Date.now();
  const instituteName = payload.organization?.trim() || payload.name?.trim() || "Website Prospect";
  const contactPerson = payload.name?.trim() || "Web Visitor";
  const phone = payload.phone?.trim() || "N/A";
  const email = payload.email?.trim() || "";
  const category = payload.solutionType || "Web Inquiry";
  
  const services = [
    payload.solutionType,
    payload.studentVolume ? `Volume: ${payload.studentVolume}` : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
  ].filter(Boolean).join(" | ");

  const remarks = [
    `🌐 Website Contact Form Submission (webvibez.com)`,
    payload.solutionType ? `Solution: ${payload.solutionType}` : null,
    payload.studentVolume ? `Student Volume: ${payload.studentVolume}` : null,
    payload.timeline ? `Target Timeline: ${payload.timeline}` : null,
    payload.message ? `Notes: ${payload.message}` : null,
  ].filter(Boolean).join("\n");

  try {
    await client.execute({
      sql: `
        INSERT INTO crm_contacts (
          id, institute_name, category, primary_contact_person, primary_phone,
          email, services_interested, general_remarks, lead_status, interest_level,
          verification_status, data_source, tags, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, 'New Lead', 'High',
          'Unverified', 'Website Form', 'Website Lead, High Priority', ?, ?
        )
      `,
      args: [
        id,
        instituteName,
        category,
        contactPerson,
        phone,
        email,
        services,
        remarks,
        now,
        now,
      ],
    });

    return { success: true, contactId: id };
  } catch (err: any) {
    console.error("Error pushing lead to CRM:", err);
    return { success: false, error: err.message || "Failed to push to CRM" };
  }
}

export async function getCrmLiveSummary(): Promise<{ totalLeads: number; connected: boolean }> {
  const client = getCrmTursoClient();
  if (!client) return { totalLeads: 0, connected: false };

  try {
    const res = await client.execute("SELECT COUNT(*) as c FROM crm_contacts");
    return {
      totalLeads: Number(res.rows[0]?.c || 0),
      connected: true,
    };
  } catch {
    return { totalLeads: 0, connected: false };
  }
}
