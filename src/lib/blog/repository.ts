import { getTursoClient } from "@/lib/db/turso";
import { Article } from "./types";

export function parseRowToArticle(row: any): Article {
  const parseJson = (val: any, fallback: any) => {
    try {
      if (typeof val === "string") return JSON.parse(val);
      if (val) return val;
      return fallback;
    } catch {
      return fallback;
    }
  };

  const seoMeta = parseJson(row.seo_metadata, {});

  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: row.subtitle as string | undefined,
    excerpt: row.excerpt as string,
    description: row.description as string,
    content: row.content as string,
    aeoDirectAnswer: row.aeo_direct_answer as string | undefined,
    category: row.category as any,
    tags: parseJson(row.tags, []),
    author: parseJson(row.author, {}),
    featuredImage: row.featured_image as string,
    featuredImageAlt: row.featured_image_alt as string,
    publicationDate: row.publication_date as string,
    modifiedDate: row.modified_date as string,
    readingTime: row.reading_time as string,
    status: row.status as any,
    featured: Boolean(row.featured),
    canonicalUrl: row.canonical_url as string,
    seoTitle: row.seo_title as string | undefined,
    seoDescription: row.seo_description as string | undefined,
    ogTitle: row.og_title as string | undefined,
    ogDescription: row.og_description as string | undefined,
    relatedServices: parseJson(row.related_services, []),
    relatedArticleSlugs: parseJson(row.related_article_slugs, []),
    faq: parseJson(row.faq, []),
    tableOfContents: parseJson(row.table_of_contents, []),
    distribution: parseJson(row.distribution, {}),
    language: row.language as any,
    languageGroupKey: row.language_group_key as string | undefined,
    primaryKeyword: seoMeta.primaryKeyword || undefined,
    secondaryKeywords: seoMeta.secondaryKeywords || undefined,
    searchIntent: seoMeta.searchIntent || undefined,
    targetAudience: seoMeta.targetAudience || undefined,
    seoScores: seoMeta.seoScores || undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export const BlogRepository = {
  async getAllArticles(statusParam?: string): Promise<Article[]> {
    const client = getTursoClient();
    if (!client) return [];

    let query = "SELECT * FROM articles";
    let args: any[] = [];
    
    if (statusParam) {
      query += " WHERE status = ?";
      args.push(statusParam);
    }
    
    query += " ORDER BY publication_date DESC";

    const { rows } = await client.execute({ sql: query, args });
    return rows.map(parseRowToArticle);
  },

  async getPublishedArticles(): Promise<Article[]> {
    return this.getAllArticles("PUBLISHED");
  },

  async getArticleBySlug(slug: string, includeUnpublished: boolean = false): Promise<Article | null> {
    const client = getTursoClient();
    if (!client) return null;

    const { rows } = await client.execute({
      sql: "SELECT * FROM articles WHERE slug = ? LIMIT 1",
      args: [slug]
    });

    if (rows.length === 0) return null;

    const article = parseRowToArticle(rows[0]);
    if (includeUnpublished || article.status === "PUBLISHED") {
      return article;
    }
    return null;
  },

  async getArticleById(id: string): Promise<Article | null> {
    const client = getTursoClient();
    if (!client) return null;

    const { rows } = await client.execute({
      sql: "SELECT * FROM articles WHERE id = ? LIMIT 1",
      args: [id]
    });

    if (rows.length === 0) return null;
    return parseRowToArticle(rows[0]);
  },

  async createArticle(article: Partial<Article>): Promise<Article> {
    const client = getTursoClient();
    const now = new Date().toISOString();
    
    const id = article.id || `art-${Date.now()}`;
    const slug = article.slug || "";
    const seoMetadataJson = JSON.stringify({
      primaryKeyword: article.primaryKeyword || null,
      secondaryKeywords: article.secondaryKeywords || [],
      searchIntent: article.searchIntent || null,
      targetAudience: article.targetAudience || null,
      seoScores: article.seoScores || null,
    });
    
    await client?.execute({
      sql: `
        INSERT INTO articles (
          id, slug, title, subtitle, excerpt, description, content, aeo_direct_answer,
          category, tags, author, featured_image, featured_image_alt, publication_date,
          modified_date, reading_time, status, featured, canonical_url, seo_title,
          seo_description, og_title, og_description, related_services, related_article_slugs,
          faq, table_of_contents, distribution, language, language_group_key, seo_metadata, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      args: [
        id,
        slug,
        article.title || "",
        article.subtitle || null,
        article.excerpt || "",
        article.description || "",
        article.content || "",
        article.aeoDirectAnswer || null,
        article.category || "Technology Guides",
        JSON.stringify(article.tags || []),
        JSON.stringify(article.author || {}),
        article.featuredImage || "",
        article.featuredImageAlt || "",
        article.publicationDate || now,
        article.modifiedDate || now,
        article.readingTime || "5 min read",
        article.status || "DRAFT",
        article.featured ? 1 : 0,
        article.canonicalUrl || `https://www.webvibez.com/blog/${slug}`,
        article.seoTitle || null,
        article.seoDescription || null,
        article.ogTitle || null,
        article.ogDescription || null,
        JSON.stringify(article.relatedServices || []),
        JSON.stringify(article.relatedArticleSlugs || []),
        JSON.stringify(article.faq || []),
        JSON.stringify(article.tableOfContents || []),
        JSON.stringify(article.distribution || {}),
        article.language || "en",
        article.languageGroupKey || null,
        seoMetadataJson,
        article.createdAt || now,
        now
      ]
    });
    
    return this.getArticleById(id) as Promise<Article>;
  },

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
    const existing = await this.getArticleById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updated = { ...existing, ...updates };
    const seoMetadataJson = JSON.stringify({
      primaryKeyword: updated.primaryKeyword || null,
      secondaryKeywords: updated.secondaryKeywords || [],
      searchIntent: updated.searchIntent || null,
      targetAudience: updated.targetAudience || null,
      seoScores: updated.seoScores || null,
    });

    const client = getTursoClient();
    await client?.execute({
      sql: `
        UPDATE articles SET
          slug = ?, title = ?, subtitle = ?, excerpt = ?, description = ?, content = ?,
          aeo_direct_answer = ?, category = ?, tags = ?, author = ?, featured_image = ?,
          featured_image_alt = ?, publication_date = ?, modified_date = ?, reading_time = ?,
          status = ?, featured = ?, canonical_url = ?, seo_title = ?, seo_description = ?,
          og_title = ?, og_description = ?, related_services = ?, related_article_slugs = ?,
          faq = ?, table_of_contents = ?, distribution = ?, language = ?, language_group_key = ?, seo_metadata = ?, updated_at = ?
        WHERE id = ?
      `,
      args: [
        updated.slug || null,
        updated.title || null,
        updated.subtitle || null,
        updated.excerpt || null,
        updated.description || null,
        updated.content || null,
        updated.aeoDirectAnswer || null,
        updated.category || null,
        JSON.stringify(updated.tags || []),
        JSON.stringify(updated.author || {}),
        updated.featuredImage || null,
        updated.featuredImageAlt || null,
        updated.publicationDate || null,
        updated.modifiedDate || null,
        updated.readingTime || null,
        updated.status || null,
        updated.featured ? 1 : 0,
        updated.canonicalUrl || null,
        updated.seoTitle || null,
        updated.seoDescription || null,
        updated.ogTitle || null,
        updated.ogDescription || null,
        JSON.stringify(updated.relatedServices || []),
        JSON.stringify(updated.relatedArticleSlugs || []),
        JSON.stringify(updated.faq || []),
        JSON.stringify(updated.tableOfContents || []),
        JSON.stringify(updated.distribution || {}),
        updated.language || "en",
        updated.languageGroupKey || null,
        seoMetadataJson,
        now,
        id
      ]
    });

    return this.getArticleById(id);
  },

  async archiveArticle(id: string): Promise<Article | null> {
    return this.updateArticle(id, { status: "ARCHIVED" });
  },

  async deleteArticle(id: string): Promise<boolean> {
    const client = getTursoClient();
    if (!client) return false;

    await client.execute({
      sql: "DELETE FROM articles WHERE id = ?",
      args: [id]
    });

    return true;
  },

  async publishScheduledArticles(): Promise<{ publishedCount: number; publishedSlugs: string[] }> {
    const allArticles = await this.getAllArticles("SCHEDULED");
    const now = new Date();
    let publishedCount = 0;
    const publishedSlugs: string[] = [];

    for (const article of allArticles) {
      const schedDate = new Date(article.publicationDate);
      if (schedDate <= now) {
        await this.updateArticle(article.id, {
          status: "PUBLISHED",
          publicationDate: now.toISOString(),
        });
        publishedCount++;
        publishedSlugs.push(article.slug);
      }
    }

    return { publishedCount, publishedSlugs };
  }
};

export const getArticles = () => BlogRepository.getAllArticles();
export const deleteArticle = (id: string) => BlogRepository.deleteArticle(id);
