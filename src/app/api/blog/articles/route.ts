import { NextRequest, NextResponse } from "next/server";
import { BlogRepository } from "@/lib/blog/repository";
import { isAuthenticatedAdmin } from "@/lib/blog/auth";
import { Article, ArticleStatus } from "@/lib/blog/types";
import { calculateReadingTime, extractTableOfContents } from "@/lib/blog/seo";

export async function GET(request: NextRequest) {
  try {
    const isAdmin = isAuthenticatedAdmin(request);
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") as ArticleStatus | null;

    if (isAdmin) {
      // Authenticated Admin: can view all or filter by specific status
      const articles = await BlogRepository.getAllArticles(statusParam || undefined);
      return NextResponse.json({
        success: true,
        count: articles.length,
        articles,
      });
    }

    // Public request: Return ONLY published articles (Security requirement #3)
    const publishedArticles = await BlogRepository.getPublishedArticles();
    return NextResponse.json({
      success: true,
      count: publishedArticles.length,
      articles: publishedArticles,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch articles." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, slug, and content are required.",
        },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await BlogRepository.getArticleBySlug(body.slug, true);
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Slug '${body.slug}' is already in use.` },
        { status: 409 }
      );
    }

    const readingTime = calculateReadingTime(body.content);
    const tableOfContents = extractTableOfContents(body.content);

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug: body.slug,
      title: body.title,
      subtitle: body.subtitle || "",
      excerpt: body.excerpt || body.description?.slice(0, 160) || "",
      description: body.description || body.excerpt || "",
      content: body.content,
      aeoDirectAnswer: body.aeoDirectAnswer || "",
      category: body.category || "Technology Guides",
      tags: Array.isArray(body.tags) ? body.tags : [],
      author: body.author || {
        name: "Rudram Joshi",
        role: "Founder & Lead Architect @ WebVibez",
        bio: "Full-stack developer and founder of WebVibez, specializing in Next.js web applications, React Native mobile architectures, and scalable business software.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        url: "https://webvibez.com/about",
      },
      featuredImage:
        body.featuredImage ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      featuredImageAlt: body.featuredImageAlt || body.title,
      publicationDate: body.publicationDate || new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      readingTime,
      status: body.status || "DRAFT",
      featured: Boolean(body.featured),
      canonicalUrl: `https://webvibez.com/blog/${body.slug}`,
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || body.description,
      ogTitle: body.ogTitle || body.title,
      ogDescription: body.ogDescription || body.description,
      relatedServices: body.relatedServices || [],
      relatedArticleSlugs: body.relatedArticleSlugs || [],
      faq: body.faq || [],
      tableOfContents,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await BlogRepository.createArticle(newArticle);

    return NextResponse.json(
      { success: true, article: created },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create article." },
      { status: 500 }
    );
  }
}
