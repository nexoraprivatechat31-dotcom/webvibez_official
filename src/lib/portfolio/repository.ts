import { getTursoClient } from "@/lib/db/turso";

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  type: string;
  tech_stack: string;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const client = getTursoClient();
  if (!client) return [];

  const { rows } = await client.execute("SELECT * FROM portfolio_projects ORDER BY sort_order ASC, created_at DESC");
  
  return rows.map((row) => ({
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    type: row.type as string,
    tech_stack: row.tech_stack as string,
    description: row.description as string | null,
    image_url: row.image_url as string | null,
    live_url: row.live_url as string | null,
    github_url: row.github_url as string | null,
    featured: Boolean(row.featured),
    sort_order: Number(row.sort_order),
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }));
}

export async function createPortfolioProject(data: Partial<PortfolioProject>): Promise<string | null> {
  const client = getTursoClient();
  if (!client) return null;

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  
  // Basic slug generation
  const slug = data.slug || (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : id);

  await client.execute({
    sql: `
      INSERT INTO portfolio_projects (
        id, title, slug, type, tech_stack, description, image_url, live_url, github_url, featured, sort_order, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `,
    args: [
      id,
      data.title || "Untitled Project",
      slug,
      data.type || "Web Application",
      data.tech_stack || "React",
      data.description || null,
      data.image_url || null,
      data.live_url || null,
      data.github_url || null,
      data.featured ? 1 : 0,
      data.sort_order || 0,
      now,
      now,
    ]
  });

  return id;
}

export async function deletePortfolioProject(id: string): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;

  await client.execute({
    sql: "DELETE FROM portfolio_projects WHERE id = ?",
    args: [id]
  });

  return true;
}
