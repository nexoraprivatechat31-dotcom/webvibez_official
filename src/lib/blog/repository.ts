import { getTursoClient } from "@/lib/db/turso";

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  description: string | null;
  content: string;
  aeo_direct_answer: string | null;
  category: string;
  tags: string;
  author: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  publication_date: string;
  modified_date: string;
  reading_time: string | null;
  status: string;
  featured: boolean;
  canonical_url: string;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  related_services: string | null;
  related_article_slugs: string | null;
  faq: string | null;
  table_of_contents: string | null;
  distribution: string | null;
  language: string;
  language_group_key: string | null;
  created_at: string;
  updated_at: string;
}

export async function getArticles(): Promise<Article[]> {
  const client = getTursoClient();
  if (!client) return [];

  const { rows } = await client.execute("SELECT * FROM articles ORDER BY publication_date DESC");
  
  return rows.map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: row.subtitle as string | null,
    excerpt: row.excerpt as string | null,
    description: row.description as string | null,
    content: row.content as string,
    aeo_direct_answer: row.aeo_direct_answer as string | null,
    category: row.category as string,
    tags: row.tags as string,
    author: row.author as string,
    featured_image: row.featured_image as string | null,
    featured_image_alt: row.featured_image_alt as string | null,
    publication_date: row.publication_date as string,
    modified_date: row.modified_date as string,
    reading_time: row.reading_time as string | null,
    status: row.status as string,
    featured: Boolean(row.featured),
    canonical_url: row.canonical_url as string,
    seo_title: row.seo_title as string | null,
    seo_description: row.seo_description as string | null,
    og_title: row.og_title as string | null,
    og_description: row.og_description as string | null,
    related_services: row.related_services as string | null,
    related_article_slugs: row.related_article_slugs as string | null,
    faq: row.faq as string | null,
    table_of_contents: row.table_of_contents as string | null,
    distribution: row.distribution as string | null,
    language: row.language as string,
    language_group_key: row.language_group_key as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }));
}

export async function deleteArticle(id: string): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;

  await client.execute({
    sql: "DELETE FROM articles WHERE id = ?",
    args: [id]
  });

  return true;
}
