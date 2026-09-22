import { createClient, Client } from "@libsql/client";

let tursoClient: Client | null = null;

export function getTursoClient(): Client | null {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  if (!tursoClient) {
    tursoClient = createClient({
      url,
      authToken,
    });
  }

  return tursoClient;
}

export async function initTursoSchema(): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;

  try {
    // 1. Articles table with unique slug constraint
    await client.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        excerpt TEXT,
        description TEXT,
        content TEXT NOT NULL,
        aeo_direct_answer TEXT,
        category TEXT NOT NULL,
        tags TEXT NOT NULL,
        author TEXT NOT NULL,
        featured_image TEXT,
        featured_image_alt TEXT,
        publication_date TEXT NOT NULL,
        modified_date TEXT NOT NULL,
        reading_time TEXT,
        status TEXT NOT NULL,
        featured INTEGER DEFAULT 0,
        canonical_url TEXT NOT NULL,
        seo_title TEXT,
        seo_description TEXT,
        og_title TEXT,
        og_description TEXT,
        related_services TEXT,
        related_article_slugs TEXT,
        faq TEXT,
        distribution TEXT,
        language TEXT DEFAULT 'en',
        language_group_key TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // 2. Daily Publish Logs with strict idempotency key unique constraint
    await client.execute(`
      CREATE TABLE IF NOT EXISTS daily_publish_logs (
        id TEXT PRIMARY KEY,
        execution_date_ist TEXT NOT NULL,
        execution_time_utc TEXT NOT NULL,
        idempotency_key TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL,
        article_id TEXT,
        article_slug TEXT,
        article_title TEXT,
        duration_ms INTEGER,
        quality_gate_score INTEGER,
        message TEXT,
        distribution_queued INTEGER DEFAULT 0
      );
    `);

    return true;
  } catch (err) {
    console.error("Failed to initialize Turso database schema:", err);
    return false;
  }
}
