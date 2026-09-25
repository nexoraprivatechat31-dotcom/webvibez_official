import { getTursoClient } from "@/lib/db/turso";

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  project_type: string | null;
  message: string | null;
  source: string;
  status: string;
  internal_notes: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
}

export async function getLeads(): Promise<Lead[]> {
  const client = getTursoClient();
  if (!client) {
    console.warn("Turso client not initialized. Returning empty leads.");
    return [];
  }

  const { rows } = await client.execute("SELECT * FROM leads ORDER BY created_at DESC");
  
  return rows.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    email: row.email as string | null,
    phone: row.phone as string | null,
    project_type: row.project_type as string | null,
    message: row.message as string | null,
    source: row.source as string,
    status: row.status as string,
    internal_notes: row.internal_notes as string | null,
    follow_up_date: row.follow_up_date as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }));
}

export async function createLead(data: Partial<Lead>): Promise<string | null> {
  const client = getTursoClient();
  if (!client) return null;

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await client.execute({
    sql: `
      INSERT INTO leads (
        id, name, email, phone, project_type, message, source, status, internal_notes, follow_up_date, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `,
    args: [
      id,
      data.name || "Unknown",
      data.email || null,
      data.phone || null,
      data.project_type || null,
      data.message || null,
      data.source || "Website Form",
      data.status || "New",
      data.internal_notes || null,
      data.follow_up_date || null,
      now,
      now,
    ]
  });

  return id;
}

export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;

  await client.execute({
    sql: "UPDATE leads SET status = ?, updated_at = ? WHERE id = ?",
    args: [status, new Date().toISOString(), id]
  });

  return true;
}
