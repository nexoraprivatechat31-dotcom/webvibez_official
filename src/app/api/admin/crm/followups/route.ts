import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CrmService } from "@/lib/crm/crm-service";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;

  try {
    const followups = await CrmService.getFollowups(status);
    return NextResponse.json({ success: true, followups });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await CrmService.createFollowup(body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status, completionNotes } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const result = await CrmService.updateFollowupStatus(id, status, completionNotes);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
