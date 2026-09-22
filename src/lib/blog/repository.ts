import { Article, ArticleStatus } from "./types";
import { SEED_ARTICLES } from "./seed-data";
import { getTursoClient, initTursoSchema } from "../db/turso";

// Memory cache to accelerate queries across hot lambda/serverless requests
const memoryArticlesCache = global as unknown as {
  __webvibez_articles_cache__?: Map<string, Article>;
  __webvibez_db_initialized__?: boolean;
};

function getCache(): Map<string, Article> {
  if (!memoryArticlesCache.__webvibez_articles_cache__) {
    memoryArticlesCache.__webvibez_articles_cache__ = new Map<string, Article>();
    for (const a of SEED_ARTICLES) {
      memoryArticlesCache.__webvibez_articles_cache__.set(a.id, { ...a });
    }
  }
  return memoryArticlesCache.__webvibez_articles_cache__;
}

function parseRowToArticle(row: any): Article {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    subtitle: row.subtitle ? String(row.subtitle) : undefined,
    excerpt: String(row.excerpt || ""),
    description: String(row.description || ""),
    content: String(row.content),
    aeoDirectAnswer: row.aeo_direct_answer ? String(row.aeo_direct_answer) : undefined,
    category: row.category as any,
    tags: row.tags ? JSON.parse(String(row.tags)) : [],
    author: row.author ? JSON.parse(String(row.author)) : SEED_ARTICLES[0].author,
    featuredImage: String(row.featured_image || ""),
    featuredImageAlt: String(row.featured_image_alt || ""),
    publicationDate: String(row.publication_date),
    modifiedDate: String(row.modified_date),
    readingTime: String(row.reading_time || "5 min read"),
    status: row.status as ArticleStatus,
    featured: Boolean(row.featured),
    canonicalUrl: String(row.canonical_url),
    seoTitle: row.seo_title ? String(row.seo_title) : undefined,
    seoDescription: row.seo_description ? String(row.seo_description) : undefined,
    ogTitle: row.og_title ? String(row.og_title) : undefined,
    ogDescription: row.og_description ? String(row.og_description) : undefined,
    relatedServices: row.related_services ? JSON.parse(String(row.related_services)) : undefined,
    relatedArticleSlugs: row.related_article_slugs ? JSON.parse(String(row.related_article_slugs)) : undefined,
    faq: row.faq ? JSON.parse(String(row.faq)) : undefined,
    distribution: row.distribution ? JSON.parse(String(row.distribution)) : undefined,
    language: (row.language as "en" | "hi") || "en",
    languageGroupKey: row.language_group_key ? String(row.language_group_key) : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

async function ensureTursoInitialized(): Promise<void> {
  if (memoryArticlesCache.__webvibez_db_initialized__) return;

  const client = getTursoClient();
  if (!client) return;

  try {
    await initTursoSchema();

    // Check if table is empty
    const countRes = await client.execute("SELECT COUNT(*) as count FROM articles;");
    const count = Number(countRes.rows[0]?.count || 0);

    if (count === 0) {
      // Seed initial articles to Turso
      for (const article of SEED_ARTICLES) {
        await client.execute({
          sql: `
            INSERT OR REPLACE INTO articles (
              id, slug, title, subtitle, excerpt, description, content, aeo_direct_answer,
              category, tags, author, featured_image, featured_image_alt, publication_date,
              modified_date, reading_time, status, featured, canonical_url, seo_title,
              seo_description, og_title, og_description, related_services, related_article_slugs,
              faq, table_of_contents, distribution, created_at, updated_at
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            );
          `,
          args: [
            article.id,
            article.slug,
            article.title,
            article.subtitle || null,
            article.excerpt,
            article.description,
            article.content,
            article.aeoDirectAnswer || null,
            article.category,
            JSON.stringify(article.tags || []),
            JSON.stringify(article.author),
            article.featuredImage || null,
            article.featuredImageAlt || null,
            article.publicationDate,
            article.modifiedDate,
            article.readingTime || "5 min read",
            article.status,
            article.featured ? 1 : 0,
            article.canonicalUrl,
            article.seoTitle || null,
            article.seoDescription || null,
            article.ogTitle || null,
            article.ogDescription || null,
            JSON.stringify(article.relatedServices || []),
            JSON.stringify(article.relatedArticleSlugs || []),
            JSON.stringify(article.faq || []),
            JSON.stringify(article.tableOfContents || []),
            JSON.stringify(article.distribution || {}),
            article.createdAt,
            article.updatedAt,
          ],
        });
      }
    }

    memoryArticlesCache.__webvibez_db_initialized__ = true;
  } catch (err) {
    console.error("Turso DB ensure error:", err);
  }
}

export const BlogRepository = {
  async getPublishedArticles(): Promise<Article[]> {
    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        const res = await client.execute(
          "SELECT * FROM articles WHERE status = 'PUBLISHED' ORDER BY publication_date DESC;"
        );
        return res.rows.map(parseRowToArticle);
      } catch (e) {
        console.error("Turso query error, using cache fallback:", e);
      }
    }

    const cache = getCache();
    return Array.from(cache.values())
      .filter((a) => a.status === "PUBLISHED")
      .sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  },

  async getAllArticles(statusFilter?: ArticleStatus): Promise<Article[]> {
    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        let query = "SELECT * FROM articles";
        const args: any[] = [];
        if (statusFilter) {
          query += " WHERE status = ?";
          args.push(statusFilter);
        }
        query += " ORDER BY updated_at DESC;";

        const res = await client.execute({ sql: query, args });
        return res.rows.map(parseRowToArticle);
      } catch (e) {
        console.error("Turso query error, using cache fallback:", e);
      }
    }

    const cache = getCache();
    let articles = Array.from(cache.values());
    if (statusFilter) {
      articles = articles.filter((a) => a.status === statusFilter);
    }
    return articles.sort(
      (a, b) =>
        new Date(b.updatedAt || b.publicationDate).getTime() -
        new Date(a.updatedAt || a.publicationDate).getTime()
    );
  },

  async getArticleBySlug(slug: string, includeUnpublished = false): Promise<Article | null> {
    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        const res = await client.execute({
          sql: "SELECT * FROM articles WHERE slug = ? LIMIT 1;",
          args: [slug],
        });
        if (res.rows.length > 0) {
          const article = parseRowToArticle(res.rows[0]);
          if (includeUnpublished || article.status === "PUBLISHED") {
            return article;
          }
          return null;
        }
      } catch (e) {
        console.error("Turso query error, using cache fallback:", e);
      }
    }

    const cache = getCache();
    for (const a of cache.values()) {
      if (a.slug === slug) {
        if (includeUnpublished || a.status === "PUBLISHED") {
          return { ...a };
        }
        return null;
      }
    }
    return null;
  },

  async getArticleById(id: string): Promise<Article | null> {
    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        const res = await client.execute({
          sql: "SELECT * FROM articles WHERE id = ? LIMIT 1;",
          args: [id],
        });
        if (res.rows.length > 0) {
          return parseRowToArticle(res.rows[0]);
        }
      } catch (e) {
        console.error("Turso query error, using cache fallback:", e);
      }
    }

    const cache = getCache();
    const found = cache.get(id);
    return found ? { ...found } : null;
  },

  async createArticle(article: Article): Promise<Article> {
    const now = new Date().toISOString();
    const fullArticle: Article = {
      ...article,
      id: article.id || `art-${Date.now()}`,
      createdAt: article.createdAt || now,
      updatedAt: now,
      canonicalUrl: `https://webvibez.com/blog/${article.slug}`,
    };

    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        await client.execute({
          sql: `
            INSERT INTO articles (
              id, slug, title, subtitle, excerpt, description, content, aeo_direct_answer,
              category, tags, author, featured_image, featured_image_alt, publication_date,
              modified_date, reading_time, status, featured, canonical_url, seo_title,
              seo_description, og_title, og_description, related_services, related_article_slugs,
              faq, table_of_contents, distribution, language, language_group_key, created_at, updated_at
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            );
          `,
          args: [
            fullArticle.id,
            fullArticle.slug,
            fullArticle.title,
            fullArticle.subtitle || null,
            fullArticle.excerpt,
            fullArticle.description,
            fullArticle.content,
            fullArticle.aeoDirectAnswer || null,
            fullArticle.category,
            JSON.stringify(fullArticle.tags || []),
            JSON.stringify(fullArticle.author),
            fullArticle.featuredImage || null,
            fullArticle.featuredImageAlt || null,
            fullArticle.publicationDate,
            fullArticle.modifiedDate,
            fullArticle.readingTime || "5 min read",
            fullArticle.status,
            fullArticle.featured ? 1 : 0,
            fullArticle.canonicalUrl,
            fullArticle.seoTitle || null,
            fullArticle.seoDescription || null,
            fullArticle.ogTitle || null,
            fullArticle.ogDescription || null,
            JSON.stringify(fullArticle.relatedServices || []),
            JSON.stringify(fullArticle.relatedArticleSlugs || []),
            JSON.stringify(fullArticle.faq || []),
            JSON.stringify(fullArticle.tableOfContents || []),
            JSON.stringify(fullArticle.distribution || {}),
            fullArticle.language || "en",
            fullArticle.languageGroupKey || null,
            fullArticle.createdAt,
            fullArticle.updatedAt,
          ],
        });
      } catch (e) {
        console.error("Turso insert error:", e);
      }
    }

    getCache().set(fullArticle.id, fullArticle);
    return fullArticle;
  },

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
    const existing = await this.getArticleById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updated: Article = {
      ...existing,
      ...updates,
      updatedAt: now,
      canonicalUrl: updates.slug ? `https://webvibez.com/blog/${updates.slug}` : existing.canonicalUrl,
    };

    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        await client.execute({
          sql: `
            UPDATE articles SET
              slug = ?, title = ?, subtitle = ?, excerpt = ?, description = ?, content = ?,
              aeo_direct_answer = ?, category = ?, tags = ?, author = ?, featured_image = ?,
              featured_image_alt = ?, publication_date = ?, modified_date = ?, reading_time = ?,
              status = ?, featured = ?, canonical_url = ?, seo_title = ?, seo_description = ?,
              og_title = ?, og_description = ?, related_services = ?, related_article_slugs = ?,
              faq = ?, table_of_contents = ?, distribution = ?, language = ?, language_group_key = ?, updated_at = ?
            WHERE id = ?;
          `,
          args: [
            updated.slug,
            updated.title,
            updated.subtitle || null,
            updated.excerpt,
            updated.description,
            updated.content,
            updated.aeoDirectAnswer || null,
            updated.category,
            JSON.stringify(updated.tags || []),
            JSON.stringify(updated.author),
            updated.featuredImage || null,
            updated.featuredImageAlt || null,
            updated.publicationDate,
            updated.modifiedDate,
            updated.readingTime || "5 min read",
            updated.status,
            updated.featured ? 1 : 0,
            updated.canonicalUrl,
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
            updated.updatedAt,
            id,
          ],
        });
      } catch (e) {
        console.error("Turso update error:", e);
      }
    }

    getCache().set(id, updated);
    return updated;
  },

  async archiveArticle(id: string): Promise<Article | null> {
    return this.updateArticle(id, { status: "ARCHIVED" });
  },

  async deleteArticle(id: string): Promise<boolean> {
    const client = getTursoClient();
    if (client) {
      try {
        await ensureTursoInitialized();
        await client.execute({
          sql: "DELETE FROM articles WHERE id = ?;",
          args: [id],
        });
      } catch (e) {
        console.error("Turso delete error:", e);
      }
    }

    const cache = getCache();
    cache.delete(id);
    return true;
  },

  async publishScheduledArticles(): Promise<{
    publishedCount: number;
    publishedSlugs: string[];
  }> {
    const allArticles = await this.getAllArticles();
    const now = new Date();
    let publishedCount = 0;
    const publishedSlugs: string[] = [];

    for (const article of allArticles) {
      if (article.status === "SCHEDULED") {
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
    }

    return { publishedCount, publishedSlugs };
  },
};
