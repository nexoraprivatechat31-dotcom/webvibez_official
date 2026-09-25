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
        table_of_contents TEXT,
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

    // 3. Leads & Inquiries Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        project_type TEXT,
        message TEXT,
        source TEXT DEFAULT 'Website Form',
        status TEXT DEFAULT 'New',
        internal_notes TEXT,
        follow_up_date TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // 4. Portfolio Projects Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        live_url TEXT,
        github_url TEXT,
        featured INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // --- NEW PHASE 1 TO 4 TABLES ---

    // 5. Clients Table (Phase 1)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        institute_name TEXT NOT NULL,
        contact_person TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        tier TEXT NOT NULL,
        deployment_date TEXT,
        renewal_date TEXT,
        ios_link TEXT,
        android_link TEXT,
        student_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // 6. Subscriptions Table (Phase 1)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        client_id TEXT NOT NULL,
        tier TEXT NOT NULL,
        amount INTEGER NOT NULL,
        payment_status TEXT NOT NULL,
        paid_at TEXT,
        renewal_date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE
      );
    `);

    // 7. Roles Table (Phase 3)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS roles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        permissions_json TEXT NOT NULL
      );
    `);

    // 8. Users Table (Phase 3)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role_id TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY(role_id) REFERENCES roles(id)
      );
    `);

    // 9. Audit Log Table (Phase 3)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        before_json TEXT,
        after_json TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);

    // 10. Notifications Table (Phase 4)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
      );
    `);

    return true;
  } catch (err) {
    console.error("Failed to initialize Turso database schema:", err);
    return false;
  }
}
