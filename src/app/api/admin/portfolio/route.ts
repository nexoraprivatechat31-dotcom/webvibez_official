import { NextResponse } from "next/server";
import { getPortfolioProjects, createPortfolioProject, deletePortfolioProject } from "@/lib/portfolio/repository";
import { cookies } from "next/headers";
import { initTursoSchema } from "@/lib/db/turso";

export async function GET() {
  await initTursoSchema();
  try {
    const projects = await getPortfolioProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Failed to fetch portfolio projects:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const projectId = await createPortfolioProject(body);

    if (projectId) {
      return NextResponse.json({ success: true, id: projectId });
    }
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "Project ID required" }, { status: 400 });
    
    const success = await deletePortfolioProject(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
