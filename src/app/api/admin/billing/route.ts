import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/db/turso";
import { cookies } from "next/headers";

// Very basic auth check
async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.has("webvibez_admin_session");
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const client = getTursoClient();
  if (!client) {
    return NextResponse.json({ success: false, error: "Database not connected" }, { status: 500 });
  }

  try {
    const result = await client.execute(`
      SELECT 
        s.*, 
        c.institute_name, 
        c.email, 
        c.contact_person
      FROM subscriptions s
      JOIN clients c ON s.client_id = c.id
      ORDER BY s.created_at DESC
    `);
    
    const subscriptions = result.rows.map((row: any) => {
      const obj: any = {};
      result.columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });

    return NextResponse.json({ success: true, subscriptions });
  } catch (error: any) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
