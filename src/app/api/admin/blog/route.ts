import { NextResponse } from "next/server";
import { getArticles, deleteArticle } from "@/lib/blog/repository";
import { cookies } from "next/headers";
import { initTursoSchema } from "@/lib/db/turso";

export async function GET() {
  await initTursoSchema();
  try {
    const articles = await getArticles();
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  if (!isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "Article ID required" }, { status: 400 });
    
    const success = await deleteArticle(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
