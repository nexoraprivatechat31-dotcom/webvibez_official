import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/db/turso";
import { cookies } from "next/headers";

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
      SELECT a.*, u.name as user_name 
      FROM audit_log a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 100
    `);
    
    const logs = result.rows.map((row: any) => {
      const obj: any = {};
      result.columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
