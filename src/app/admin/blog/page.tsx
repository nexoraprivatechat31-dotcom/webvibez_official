"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit3, Trash2, Eye, Inbox, AlertTriangle } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  publication_date: string;
}

export default function BlogAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      } else {
        setError(data.error || "Failed to load articles");
      }
    } catch (err) {
      setError("Network error loading articles");
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete article");
      }
    } catch (err) {
      alert("Error deleting article");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">Blog Engine</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your SEO-optimized articles and topic clusters.</p>
        </div>
        <Link 
          href="/admin/blog/create" 
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Write New Article</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500 border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-600 dark:text-slate-300 font-bold focus:ring-2 focus:ring-[#0066FF] outline-none">
              <option>All Status</option>
              <option>Published</option>
              <option>Drafts</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-[300px] relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-slate-400">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-bold">Loading Articles...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-rose-500">
              <AlertTriangle className="w-8 h-8 mb-4" />
              <p className="font-bold">{error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-600 dark:text-slate-300">No articles found</p>
              <p className="text-sm mt-1">Click 'Write New Article' to create one.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-extrabold">
                  <th className="p-5">Article Title</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Date</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-300 group/row">
                    <td className="p-5">
                      <p className="font-extrabold text-slate-900 dark:text-white group-hover/row:text-[#0066FF] dark:group-hover/row:text-[#38BDF8] transition-colors">{article.title}</p>
                      <p className="text-xs font-mono text-slate-400 mt-1">/blog/{article.slug}</p>
                    </td>
                    <td className="p-5 text-sm font-bold text-slate-600 dark:text-slate-300">{article.category}</td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md ${
                        article.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-medium text-slate-600">{new Date(article.publication_date).toLocaleDateString()}</td>
                    <td className="p-5 text-right space-x-1">
                      <button className="p-2 text-slate-400 hover:bg-blue-50 hover:text-[#0066FF] dark:hover:bg-slate-800 rounded-lg active:scale-95 transition-all"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-slate-800 rounded-lg active:scale-95 transition-all"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => deleteArticle(article.id)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-slate-800 rounded-lg active:scale-95 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center text-sm font-semibold text-slate-600 relative z-10">
          Showing {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </div>
      </div>
    </div>
  );
}
