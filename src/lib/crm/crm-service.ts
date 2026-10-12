import { createClient, Client } from "@libsql/client";
import { TelegramNotifier } from "../notifications/telegram";

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

export interface CrmContact {
  id: string;
  institute_name: string;
  category: string;
  primary_contact_person: string;
  primary_phone: string;
  whatsapp_number?: string;
  email?: string;
  city?: string;
  state?: string;
  lead_status: string;
  interest_level: string;
  services_interested?: string;
  data_source: string;
  general_remarks?: string;
  internal_notes?: string;
  expected_budget?: number;
  quotation_amount?: number;
  advance_received?: number;
  pending_amount?: number;
  is_client: number;
  created_at: number;
  updated_at: number;
  next_followup_date?: number;
}

export interface CrmFollowup {
  id: string;
  contact_id: string;
  contact_name: string;
  contact_phone: string;
  followup_date: number;
  followup_time?: string;
  reason?: string;
  priority: string;
  status: string;
  remarks?: string;
  completion_notes?: string;
  created_at: number;
  updated_at: number;
}

export interface CrmActivity {
  id: string;
  contact_id: string;
  activity_type: string;
  title: string;
  description: string;
  user_name?: string;
  created_at: number;
}

export const CrmService = {
  async getContacts(options: {
    status?: string;
    category?: string;
    search?: string;
    limit?: number;
  } = {}): Promise<CrmContact[]> {
    const client = getCrmTursoClient();
    if (!client) return [];

    let sql = "SELECT * FROM crm_contacts WHERE 1=1";
    const args: any[] = [];

    if (options.status && options.status !== "all") {
      sql += " AND lead_status = ?";
      args.push(options.status);
    }

    if (options.category && options.category !== "all") {
      sql += " AND category LIKE ?";
      args.push(`%${options.category}%`);
    }

    if (options.search) {
      const s = `%${options.search.toLowerCase()}%`;
      sql += " AND (LOWER(institute_name) LIKE ? OR LOWER(primary_contact_person) LIKE ? OR primary_phone LIKE ? OR LOWER(city) LIKE ?)";
      args.push(s, s, `%${options.search}%`, s);
    }

    sql += " ORDER BY created_at DESC";

    if (options.limit) {
      sql += ` LIMIT ${options.limit}`;
    }

    try {
      const res = await client.execute({ sql, args });
      return res.rows.map((row: any) => ({
        id: String(row.id),
        institute_name: String(row.institute_name || ""),
        category: String(row.category || "General"),
        primary_contact_person: String(row.primary_contact_person || ""),
        primary_phone: String(row.primary_phone || ""),
        whatsapp_number: row.whatsapp_number ? String(row.whatsapp_number) : undefined,
        email: row.email ? String(row.email) : undefined,
        city: row.city ? String(row.city) : undefined,
        state: row.state ? String(row.state) : undefined,
        lead_status: String(row.lead_status || "New Lead"),
        interest_level: String(row.interest_level || "Medium"),
        services_interested: row.services_interested ? String(row.services_interested) : undefined,
        data_source: String(row.data_source || "Website"),
        general_remarks: row.general_remarks ? String(row.general_remarks) : undefined,
        internal_notes: row.internal_notes ? String(row.internal_notes) : undefined,
        expected_budget: Number(row.expected_budget || 0),
        quotation_amount: Number(row.quotation_amount || 0),
        advance_received: Number(row.advance_received || 0),
        pending_amount: Number(row.pending_amount || 0),
        is_client: Number(row.is_client || 0),
        created_at: Number(row.created_at || Date.now()),
        updated_at: Number(row.updated_at || Date.now()),
        next_followup_date: row.next_followup_date ? Number(row.next_followup_date) : undefined,
      }));
    } catch (err) {
      console.error("Failed to query crm_contacts:", err);
      return [];
    }
  },

  async createContact(data: Partial<CrmContact>): Promise<{ success: boolean; contactId?: string; error?: string }> {
    const client = getCrmTursoClient();
    if (!client) return { success: false, error: "CRM Database not connected" };

    const id = data.id || `cont-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = Date.now();

    try {
      await client.execute({
        sql: `
          INSERT INTO crm_contacts (
            id, institute_name, category, primary_contact_person, primary_phone,
            whatsapp_number, email, city, lead_status, interest_level,
            services_interested, data_source, general_remarks, internal_notes,
            is_client, created_at, updated_at
          ) VALUES (
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?
          )
        `,
        args: [
          id,
          data.institute_name || "New Prospect",
          data.category || "Coaching / Academy",
          data.primary_contact_person || "Director",
          data.primary_phone || "N/A",
          data.whatsapp_number || data.primary_phone || "",
          data.email || "",
          data.city || "",
          data.lead_status || "New Lead",
          data.interest_level || "High",
          data.services_interested || "",
          data.data_source || "Admin Panel",
          data.general_remarks || "",
          data.internal_notes || "",
          data.is_client ? 1 : 0,
          now,
          now,
        ],
      });

      // Log activity
      await this.createActivity({
        contact_id: id,
        activity_type: "lead_created",
        title: "Contact Created",
        description: `Created via ${data.data_source || "Admin Panel"} for ${data.institute_name || "Prospect"}`,
      });

      return { success: true, contactId: id };
    } catch (err: any) {
      console.error("Failed to create crm contact:", err);
      return { success: false, error: err.message };
    }
  },

  async updateContact(id: string, updates: Partial<CrmContact>): Promise<{ success: boolean; error?: string }> {
    const client = getCrmTursoClient();
    if (!client) return { success: false, error: "CRM Database not connected" };

    const fields: string[] = [];
    const args: any[] = [];

    const allowedKeys: (keyof CrmContact)[] = [
      "institute_name",
      "category",
      "primary_contact_person",
      "primary_phone",
      "whatsapp_number",
      "email",
      "city",
      "lead_status",
      "interest_level",
      "services_interested",
      "general_remarks",
      "internal_notes",
      "quotation_amount",
      "advance_received",
      "pending_amount",
      "is_client",
      "next_followup_date",
    ];

    for (const key of allowedKeys) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        args.push(updates[key]);
      }
    }

    if (fields.length === 0) return { success: true };

    fields.push("updated_at = ?");
    args.push(Date.now());
    args.push(id);

    try {
      await client.execute({
        sql: `UPDATE crm_contacts SET ${fields.join(", ")} WHERE id = ?`,
        args,
      });

      if (updates.lead_status) {
        await this.createActivity({
          contact_id: id,
          activity_type: "status_change",
          title: "Status Updated",
          description: `Lead status changed to "${updates.lead_status}"`,
        });
      }

      return { success: true };
    } catch (err: any) {
      console.error("Failed to update crm contact:", err);
      return { success: false, error: err.message };
    }
  },

  async deleteContact(id: string): Promise<{ success: boolean; error?: string }> {
    const client = getCrmTursoClient();
    if (!client) return { success: false, error: "CRM Database not connected" };

    try {
      await client.execute({ sql: "DELETE FROM crm_contacts WHERE id = ?", args: [id] });
      await client.execute({ sql: "DELETE FROM crm_followups WHERE contact_id = ?", args: [id] });
      await client.execute({ sql: "DELETE FROM crm_activities WHERE contact_id = ?", args: [id] });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  async getFollowups(status?: string): Promise<CrmFollowup[]> {
    const client = getCrmTursoClient();
    if (!client) return [];

    let sql = "SELECT * FROM crm_followups WHERE 1=1";
    const args: any[] = [];

    if (status && status !== "all") {
      sql += " AND status = ?";
      args.push(status);
    }

    sql += " ORDER BY followup_date ASC";

    try {
      const res = await client.execute({ sql, args });
      return res.rows.map((row: any) => ({
        id: String(row.id),
        contact_id: String(row.contact_id),
        contact_name: String(row.contact_name || ""),
        contact_phone: String(row.contact_phone || ""),
        followup_date: Number(row.followup_date || Date.now()),
        followup_time: row.followup_time ? String(row.followup_time) : undefined,
        reason: row.reason ? String(row.reason) : undefined,
        priority: String(row.priority || "Medium"),
        status: String(row.status || "Pending"),
        remarks: row.remarks ? String(row.remarks) : undefined,
        completion_notes: row.completion_notes ? String(row.completion_notes) : undefined,
        created_at: Number(row.created_at || Date.now()),
        updated_at: Number(row.updated_at || Date.now()),
      }));
    } catch (err) {
      console.error("Failed to fetch followups:", err);
      return [];
    }
  },

  async createFollowup(data: Partial<CrmFollowup>): Promise<{ success: boolean; error?: string }> {
    const client = getCrmTursoClient();
    if (!client) return { success: false, error: "CRM Database not connected" };

    const id = `fol-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = Date.now();

    try {
      await client.execute({
        sql: `
          INSERT INTO crm_followups (
            id, contact_id, contact_name, contact_phone, followup_date,
            followup_time, reason, priority, status, remarks, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          id,
          data.contact_id || "",
          data.contact_name || "",
          data.contact_phone || "",
          data.followup_date || now,
          data.followup_time || "10:00 AM",
          data.reason || "General Follow-up",
          data.priority || "Medium",
          data.status || "Pending",
          data.remarks || "",
          now,
          now,
        ],
      });

      if (data.contact_id && data.followup_date) {
        await client.execute({
          sql: "UPDATE crm_contacts SET next_followup_date = ? WHERE id = ?",
          args: [data.followup_date, data.contact_id],
        });
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  async updateFollowupStatus(id: string, status: string, completionNotes?: string): Promise<{ success: boolean }> {
    const client = getCrmTursoClient();
    if (!client) return { success: false };

    try {
      await client.execute({
        sql: `UPDATE crm_followups SET status = ?, completion_notes = ?, completed_at = ?, updated_at = ? WHERE id = ?`,
        args: [status, completionNotes || "", Date.now(), Date.now(), id],
      });
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async getActivities(contactId?: string): Promise<CrmActivity[]> {
    const client = getCrmTursoClient();
    if (!client) return [];

    let sql = "SELECT * FROM crm_activities";
    const args: any[] = [];

    if (contactId) {
      sql += " WHERE contact_id = ?";
      args.push(contactId);
    }

    sql += " ORDER BY created_at DESC LIMIT 50";

    try {
      const res = await client.execute({ sql, args });
      return res.rows.map((row: any) => ({
        id: String(row.id),
        contact_id: String(row.contact_id),
        activity_type: String(row.activity_type || "note"),
        title: String(row.title || ""),
        description: String(row.description || ""),
        user_name: row.user_name ? String(row.user_name) : "Admin",
        created_at: Number(row.created_at || Date.now()),
      }));
    } catch {
      return [];
    }
  },

  async createActivity(data: Partial<CrmActivity>): Promise<void> {
    const client = getCrmTursoClient();
    if (!client) return;

    try {
      await client.execute({
        sql: `INSERT INTO crm_activities (id, contact_id, activity_type, title, description, user_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          `act-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          data.contact_id || "global",
          data.activity_type || "note",
          data.title || "Activity",
          data.description || "",
          data.user_name || "Admin",
          Date.now(),
        ],
      });
    } catch {}
  },

  async getDashboardSummary(): Promise<{
    totalContacts: number;
    newLeads: number;
    inDiscussion: number;
    clients: number;
    pendingFollowups: number;
    pipelineVolume: number;
  }> {
    const client = getCrmTursoClient();
    if (!client) {
      return {
        totalContacts: 0,
        newLeads: 0,
        inDiscussion: 0,
        clients: 0,
        pendingFollowups: 0,
        pipelineVolume: 0,
      };
    }

    try {
      const contactsRes = await client.execute(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN lead_status = 'New Lead' THEN 1 ELSE 0 END) as new_leads,
          SUM(CASE WHEN lead_status IN ('In Discussion', 'Demo Scheduled', 'Negotiating') THEN 1 ELSE 0 END) as in_discussion,
          SUM(CASE WHEN is_client = 1 OR lead_status = 'Converted' THEN 1 ELSE 0 END) as clients,
          SUM(COALESCE(quotation_amount, expected_budget, 0)) as pipeline_volume
        FROM crm_contacts
      `);

      const followupsRes = await client.execute(`
        SELECT COUNT(*) as pending FROM crm_followups WHERE status = 'Pending'
      `);

      const row: any = contactsRes.rows[0] || {};
      const fRow: any = followupsRes.rows[0] || {};

      return {
        totalContacts: Number(row.total || 0),
        newLeads: Number(row.new_leads || 0),
        inDiscussion: Number(row.in_discussion || 0),
        clients: Number(row.clients || 0),
        pendingFollowups: Number(fRow.pending || 0),
        pipelineVolume: Number(row.pipeline_volume || 0),
      };
    } catch (e) {
      console.error("CRM summary error:", e);
      return {
        totalContacts: 0,
        newLeads: 0,
        inDiscussion: 0,
        clients: 0,
        pendingFollowups: 0,
        pipelineVolume: 0,
      };
    }
  },

  /**
   * Dispatches complete Custom App Studio Blueprint Submission
   * Saves to CRM Turso DB, local leads, activities, and alerts Telegram!
   */
  async handleWebsiteIntakeSubmission(payload: {
    directorName: string;
    instituteName: string;
    phone: string;
    whatsapp?: string;
    city?: string;
    email?: string;
    platform: string;
    stream: string;
    selectedFeatures: string[];
    studentScale: string;
    timeline: string;
    notes?: string;
    source?: string;
  }): Promise<{ success: boolean; contactId?: string }> {
    const contactId = `cont-appstudio-${Date.now()}`;
    const now = Date.now();

    const featuresSummary = payload.selectedFeatures.join(", ");
    const servicesInterested = `${payload.platform} | Stream: ${payload.stream} | Scale: ${payload.studentScale}`;
    
    const remarks = [
      `📱 CUSTOM APP STUDIO BLUEPRINT SUBMITTED`,
      `🏛️ Institute: ${payload.instituteName}`,
      `👤 Director: ${payload.directorName}`,
      `📍 City: ${payload.city || "N/A"}`,
      `📦 Platform Edition: ${payload.platform}`,
      `🎯 Stream: ${payload.stream}`,
      `👥 Student Volume: ${payload.studentScale}`,
      `⏱️ Target Speed: ${payload.timeline}`,
      `⚡ Configured Features (${payload.selectedFeatures.length}): ${featuresSummary}`,
      payload.notes ? `📝 Special Notes: ${payload.notes}` : null,
    ].filter(Boolean).join("\n");

    const client = getCrmTursoClient();
    if (client) {
      try {
        await client.execute({
          sql: `
            INSERT INTO crm_contacts (
              id, institute_name, category, primary_contact_person, primary_phone,
              whatsapp_number, email, city, lead_status, interest_level,
              services_interested, data_source, general_remarks, tags,
              is_client, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New Lead', 'High', ?, 'Custom App Studio', ?, 'App Studio, High Intent, Prototype Request', 0, ?, ?)
          `,
          args: [
            contactId,
            payload.instituteName || "Coaching Academy",
            payload.stream || "Education Technology",
            payload.directorName || "Director",
            payload.phone,
            payload.whatsapp || payload.phone,
            payload.email || "",
            payload.city || "",
            servicesInterested,
            remarks,
            now,
            now,
          ],
        });

        // Add activity
        await this.createActivity({
          contact_id: contactId,
          activity_type: "prototype_requested",
          title: "App Studio Blueprint Submitted",
          description: `Platform: ${payload.platform} | Stream: ${payload.stream} | Scale: ${payload.studentScale}`,
        });
      } catch (err) {
        console.error("Error writing intake to CRM DB:", err);
      }
    }

    // Send Telegram Instant Alert
    const telegramHtml = `
🚀 <b>NEW CUSTOM APP STUDIO BLUEPRINT SUBMITTED!</b>

🏛️ <b>Academy:</b> ${payload.instituteName || "Unnamed Academy"}
👤 <b>Director:</b> ${payload.directorName}
📱 <b>WhatsApp:</b> <a href="https://wa.me/91${payload.phone.replace(/[^0-9]/g, "")}">${payload.phone}</a>
📍 <b>City:</b> ${payload.city || "Gujarat / India"}
${payload.email ? `✉️ <b>Email:</b> ${payload.email}\n` : ""}
📦 <b>Edition:</b> ${payload.platform}
🎯 <b>Category:</b> ${payload.stream}
👥 <b>Scale:</b> ${payload.studentScale}
⏱️ <b>Turnaround:</b> ${payload.timeline}

⚡ <b>Active Capabilities (${payload.selectedFeatures.length}):</b>
${payload.selectedFeatures.map((f, i) => `• ${f}`).join("\n")}
${payload.notes ? `\n📝 <b>Notes:</b> ${payload.notes}` : ""}

🌐 <i>Auto-saved to WebVibez Mobile CRM & Admin Pipeline!</i>
    `.trim();

    try {
      await TelegramNotifier.sendMessage(telegramHtml, [
        [
          { text: "💬 Chat on WhatsApp", url: `https://wa.me/91${payload.phone.replace(/[^0-9]/g, "")}` },
          { text: "🖥️ Open Admin Pipeline", url: "https://webvibez.com/admin/crm" },
        ],
      ]);
    } catch (e) {
      console.error("Telegram notification failed:", e);
    }

    return { success: true, contactId };
  },
};
