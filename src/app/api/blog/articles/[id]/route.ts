import { NextRequest, NextResponse } from "next/server";
import { BlogRepository } from "@/lib/blog/repository";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { calculateReadingTime, extractTableOfContents } from "@/lib/blog/seo";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isAdmin = isAuthenticatedAdmin(request);

    // Try finding by ID first, then by slug
    let article = await BlogRepository.getArticleById(id);
    if (!article) {
      article = await BlogRepository.getArticleBySlug(id, isAdmin);
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Article not found." },
        { status: 404 }
      );
    }

    // If not admin and not published, return 404 (Security requirement #3)
    if (!isAdmin && article.status !== "PUBLISHED") {
      return NextResponse.json(
        { success: false, error: "Article not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, article });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch article." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await BlogRepository.getArticleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Article not found." },
        { status: 404 }
      );
    }

    // Recompute reading time & TOC if content changed
    const updates = { ...body };
    if (body.content) {
      updates.readingTime = calculateReadingTime(body.content);
      updates.tableOfContents = extractTableOfContents(body.content);
    }

    const updated = await BlogRepository.updateArticle(id, updates);
    return NextResponse.json({ success: true, article: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update article." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    const existing = await BlogRepository.getArticleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Article not found." },
        { status: 404 }
      );
    }

    // Soft delete / Archival strategy (Requirement #4)
    if (!force && existing.status === "PUBLISHED") {
      const archived = await BlogRepository.archiveArticle(id);
      return NextResponse.json({
        success: true,
        message: "Article archived safely to protect SEO and indexing.",
        article: archived,
      });
    }

    // Hard delete
    await BlogRepository.deleteArticle(id);
    return NextResponse.json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete article." },
      { status: 500 }
    );
  }
}
