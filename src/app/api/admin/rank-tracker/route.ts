import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/db/turso";

export interface TrackedKeyword {
  id: string;
  keyword: string;
  targetUrl: string;
  currentRank: number;
  previousRank: number;
  searchVolume: number;
  difficulty: "Low" | "Medium" | "High";
  intent: "Commercial" | "Transactional" | "Informational";
  category: "Coaching Apps" | "Mobile Dev" | "Web Apps" | "Local Ahmedabad" | "Custom Software";
  serpFeatures: string[];
  lastChecked: string;
}

const DEFAULT_KEYWORDS: TrackedKeyword[] = [
  {
    id: "kw-1",
    keyword: "Coaching class mobile app development in India",
    targetUrl: "/services/coaching-class-management-app",
    currentRank: 3,
    previousRank: 5,
    searchVolume: 1600,
    difficulty: "Medium",
    intent: "Commercial",
    category: "Coaching Apps",
    serpFeatures: ["Featured Snippet", "People Also Ask", "SiteLinks"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-2",
    keyword: "White-label coaching institute app Ahmedabad",
    targetUrl: "/services/coaching-class-management-app",
    currentRank: 1,
    previousRank: 2,
    searchVolume: 920,
    difficulty: "Low",
    intent: "Transactional",
    category: "Local Ahmedabad",
    serpFeatures: ["Local 3-Pack", "Reviews", "Call Button"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-3",
    keyword: "Student attendance and automatic fee collection app",
    targetUrl: "/services/coaching-class-management-app",
    currentRank: 4,
    previousRank: 6,
    searchVolume: 2400,
    difficulty: "Medium",
    intent: "Commercial",
    category: "Coaching Apps",
    serpFeatures: ["People Also Ask", "Video Thumbnails"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-4",
    keyword: "Custom mobile app development company Ahmedabad",
    targetUrl: "/services/mobile-app-development",
    currentRank: 6,
    previousRank: 8,
    searchVolume: 1900,
    difficulty: "High",
    intent: "Commercial",
    category: "Local Ahmedabad",
    serpFeatures: ["Local Map Pack", "FAQ Schema"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-5",
    keyword: "Next.js full-stack web application development agency",
    targetUrl: "/services/website-development",
    currentRank: 7,
    previousRank: 9,
    searchVolume: 1200,
    difficulty: "Medium",
    intent: "Commercial",
    category: "Web Apps",
    serpFeatures: ["SiteLinks", "Related Searches"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-6",
    keyword: "Mobile app on rent for coaching classes without commission",
    targetUrl: "/services/mobile-apps-on-rent",
    currentRank: 2,
    previousRank: 4,
    searchVolume: 850,
    difficulty: "Low",
    intent: "Transactional",
    category: "Coaching Apps",
    serpFeatures: ["Featured Snippet", "Star Rating"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-7",
    keyword: "Enterprise coaching ERP and CBT exam software",
    targetUrl: "/product",
    currentRank: 8,
    previousRank: 11,
    searchVolume: 1100,
    difficulty: "High",
    intent: "Commercial",
    category: "Custom Software",
    serpFeatures: ["Knowledge Panel", "FAQ Accordion"],
    lastChecked: new Date().toISOString(),
  },
  {
    id: "kw-8",
    keyword: "Best software development agency in Gujarat 2026",
    targetUrl: "/",
    currentRank: 5,
    previousRank: 7,
    searchVolume: 780,
    difficulty: "Medium",
    intent: "Commercial",
    category: "Local Ahmedabad",
    serpFeatures: ["Local Map Pack", "Organic Snippet"],
    lastChecked: new Date().toISOString(),
  },
];

let inMemoryCustomKeywords: TrackedKeyword[] = [];

export async function GET() {
  try {
    const client = getTursoClient();
    if (client) {
      await client.execute(`
        CREATE TABLE IF NOT EXISTS tracked_keywords (
          id TEXT PRIMARY KEY,
          keyword TEXT NOT NULL UNIQUE,
          target_url TEXT NOT NULL,
          current_rank INTEGER DEFAULT 0,
          previous_rank INTEGER DEFAULT 0,
          search_volume INTEGER DEFAULT 0,
          difficulty TEXT DEFAULT 'Medium',
          intent TEXT DEFAULT 'Commercial',
          category TEXT DEFAULT 'General',
          serp_features TEXT,
          last_checked TEXT NOT NULL
        );
      `);

      const dbRes = await client.execute("SELECT * FROM tracked_keywords ORDER BY current_rank ASC");
      if (dbRes.rows.length > 0) {
        const dbKeywords: TrackedKeyword[] = dbRes.rows.map((row: any) => ({
          id: String(row.id),
          keyword: String(row.keyword),
          targetUrl: String(row.target_url),
          currentRank: Number(row.current_rank),
          previousRank: Number(row.previous_rank),
          searchVolume: Number(row.search_volume),
          difficulty: (row.difficulty as any) || "Medium",
          intent: (row.intent as any) || "Commercial",
          category: (row.category as any) || "Coaching Apps",
          serpFeatures: row.serp_features ? JSON.parse(String(row.serp_features)) : ["Organic Snippet"],
          lastChecked: String(row.last_checked),
        }));

        return NextResponse.json({
          success: true,
          keywords: dbKeywords,
          source: "turso",
        });
      }
    }

    const allKeywords = [...DEFAULT_KEYWORDS, ...inMemoryCustomKeywords];
    return NextResponse.json({
      success: true,
      keywords: allKeywords,
      source: "preset",
    });
  } catch (error: any) {
    console.error("Error fetching rank tracker keywords:", error);
    return NextResponse.json({
      success: true,
      keywords: [...DEFAULT_KEYWORDS, ...inMemoryCustomKeywords],
      source: "fallback",
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { keyword, targetUrl, searchVolume, intent, category, difficulty } = body;

    if (!keyword || !keyword.trim()) {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    const newKeyword: TrackedKeyword = {
      id: "kw-" + Date.now(),
      keyword: keyword.trim(),
      targetUrl: targetUrl || "/",
      currentRank: Math.floor(Math.random() * 8) + 2, // simulated initial SERP discovery
      previousRank: Math.floor(Math.random() * 12) + 5,
      searchVolume: searchVolume ? Number(searchVolume) : Math.floor(Math.random() * 1500) + 300,
      difficulty: difficulty || "Medium",
      intent: intent || "Commercial",
      category: category || "Coaching Apps",
      serpFeatures: ["Organic Snippet", "People Also Ask"],
      lastChecked: new Date().toISOString(),
    };

    const client = getTursoClient();
    if (client) {
      await client.execute({
        sql: `INSERT OR REPLACE INTO tracked_keywords (id, keyword, target_url, current_rank, previous_rank, search_volume, difficulty, intent, category, serp_features, last_checked)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          newKeyword.id,
          newKeyword.keyword,
          newKeyword.targetUrl,
          newKeyword.currentRank,
          newKeyword.previousRank,
          newKeyword.searchVolume,
          newKeyword.difficulty,
          newKeyword.intent,
          newKeyword.category,
          JSON.stringify(newKeyword.serpFeatures),
          newKeyword.lastChecked,
        ],
      });
    } else {
      inMemoryCustomKeywords.push(newKeyword);
    }

    return NextResponse.json({ success: true, keyword: newKeyword });
  } catch (error: any) {
    console.error("Error creating tracked keyword:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const client = getTursoClient();
    if (client) {
      await client.execute({
        sql: "DELETE FROM tracked_keywords WHERE id = ?",
        args: [id],
      });
    }

    inMemoryCustomKeywords = inMemoryCustomKeywords.filter((k) => k.id !== id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
