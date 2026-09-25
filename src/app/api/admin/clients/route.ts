import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/db/turso";
import { cookies } from "next/headers";

// Very basic auth check (adjust to real check as needed)
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
      SELECT * FROM clients 
      ORDER BY created_at DESC
    `);
    
    // Map rows to objects
    const clients = result.rows.map((row: any) => {
      const obj: any = {};
      result.columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });

    return NextResponse.json({ success: true, clients });
  } catch (error: any) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
