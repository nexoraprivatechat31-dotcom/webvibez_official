"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article, ArticleStatus } from "@/lib/blog/types";

export default function AdminBlogDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchArticles = async () => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key) {
      router.push("/admin/login");
      return;
    }

    try {
      const res = await fetch("/api/blog/articles", {
        headers: {
          "x-admin-key": key,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("webvibez_admin_key");
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error("Failed to load articles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleArchive = async (id: string) => {
    if (!confirm("Are you sure you want to archive this article?")) return;
    const key = localStorage.getItem("webvibez_admin_key");
    setActionLoading(id);

    try {
      const res = await fetch(`/api/blog/articles/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": key || "" },
      });
      if (res.ok) {
        await fetchArticles();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesTab =
      activeTab === "ALL" ? true : a.status.toUpperCase() === activeTab;
    const matchesSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "DRAFT":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "SCHEDULED":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "ARCHIVED":
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white">Content Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              Admin Studio
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Search intelligence, automated 09:30 AM IST publishing, and multi-platform syndication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/new"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <span>+</span> Write New Article
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("webvibez_admin_key");
              router.push("/admin/login");
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Admin Feature Navigation Bar */}
      <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-800/80 overflow-x-auto text-xs font-semibold">
        <Link
          href="/admin/blog"
          className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
        >
          Articles Manager
        </Link>
        <Link
          href="/admin/blog/keyword-opportunities"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <span>💡</span> Keyword Opportunities
        </Link>
        <Link
          href="/admin/blog/content-calendar"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <span>📅</span> Content Calendar
        </Link>
        <Link
          href="/admin/blog/analytics"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <span>📊</span> Search Analytics
        </Link>
        <Link
          href="/admin/blog/settings"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <span>⚙️</span> Settings
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          {["ALL", "PUBLISHED", "DRAFT", "SCHEDULED", "ARCHIVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-cyan-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search articles by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          Loading articles...
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-sm">No articles found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Title & Slug</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <p className="font-semibold text-white truncate text-sm mb-1">
                        {article.title}
                      </p>
                      <p className="text-[11px] text-cyan-400 font-mono truncate">
                        /blog/{article.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold ${getStatusBadge(
                          article.status
                        )}`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {new Date(article.publicationDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <Link
                        href={`/admin/blog/${article.id}/distribution`}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 font-semibold transition-all inline-block"
                      >
                        🚀 Distribute
                      </Link>
                      <Link
                        href={`/admin/blog/${article.id}/edit`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all inline-block"
                      >
                        Edit
                      </Link>
                      {article.status === "PUBLISHED" && (
                        <Link
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold transition-all inline-block"
                        >
                          View ↗
                        </Link>
                      )}
                      <button
                        onClick={() => handleArchive(article.id)}
                        disabled={actionLoading === article.id}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-semibold transition-all disabled:opacity-50"
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
