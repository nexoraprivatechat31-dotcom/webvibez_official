"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  Plus,
  RefreshCw,
  ExternalLink,
  Trash2,
  Sparkles,
  ArrowUpRight,
  Flame,
  Award,
  Globe,
  SlidersHorizontal,
  Target,
  ShieldCheck,
  Check,
} from "lucide-react";
import { TrackedKeyword } from "@/app/api/admin/rank-tracker/route";

export default function RankTrackerPage() {
  const [keywords, setKeywords] = useState<TrackedKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState("/services/coaching-class-management-app");
  const [newCategory, setNewCategory] = useState<TrackedKeyword["category"]>("Coaching Apps");
  const [newIntent, setNewIntent] = useState<TrackedKeyword["intent"]>("Commercial");
  const [newDifficulty, setNewDifficulty] = useState<TrackedKeyword["difficulty"]>("Medium");
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchKeywords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/rank-tracker");
      const data = await res.json();
      if (data.success && data.keywords) {
        setKeywords(data.keywords);
      }
    } catch (err) {
      console.error("Failed to load keywords", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/rank-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: newKeyword,
          targetUrl: newTargetUrl,
          category: newCategory,
          intent: newIntent,
          difficulty: newDifficulty,
        }),
      });
      const data = await res.json();
      if (data.success && data.keyword) {
        setKeywords((prev) => [data.keyword, ...prev]);
        setNewKeyword("");
        setIsAddModalOpen(false);
        showNotification("Target keyword added to live ranking tracker!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteKeyword = async (id: string, name: string) => {
    if (!confirm(`Stop tracking keyword "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/rank-tracker?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setKeywords((prev) => prev.filter((k) => k.id !== id));
        showNotification("Keyword removed from tracking.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredKeywords = keywords.filter((k) => {
    const matchesSearch = k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) || k.targetUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || k.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Analytics KPIs
  const totalTracked = keywords.length;
  const inTop3 = keywords.filter((k) => k.currentRank <= 3).length;
  const inTop10 = keywords.filter((k) => k.currentRank <= 10).length;
  const totalVolume = keywords.reduce((sum, k) => sum + k.searchVolume, 0);
  const avgRank = totalTracked > 0 ? (keywords.reduce((sum, k) => sum + k.currentRank, 0) / totalTracked).toFixed(1) : "0";

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-blue-500/10 text-[#0066FF] border border-blue-500/20">
              DEVELOPER SERP INTELLIGENCE
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-500">Live Google India Radar</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Keyword Rank Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Monitor real-time Google search ranking positions, search intent, volume, and competitive SERP features for WebVibez coaching and software development terms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchKeywords}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#0066FF]" : ""}`} />
            <span>Refresh SERP</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-indigo-600 text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Track New Keyword</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>Average Google Rank</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-display">
            #{avgRank}
          </div>
          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <span>▲ +1.8 positions improved</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>Top 3 Rankings</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-500 font-display">
            {inTop3} <span className="text-xs font-normal text-slate-400">/ {totalTracked}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1 font-medium">
            🔥 Highest click-through tier
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>Page 1 Presence (Top 10)</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
            {inTop10} <span className="text-xs font-normal text-slate-400">({totalTracked > 0 ? Math.round((inTop10 / totalTracked) * 100) : 0}%)</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1 font-medium">
            On Google 1st Page
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
            <span>Monthly Target Volume</span>
            <Globe className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-display">
            {totalVolume.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1 font-medium">
            Potential Indian queries/mo
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords or target URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["all", "Coaching Apps", "Local Ahmedabad", "Web Apps", "Custom Software"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-[#0066FF] text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Table */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-mono uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Target Keyword &amp; Intent</th>
                <th className="py-4 px-4 font-bold text-center">Google Rank</th>
                <th className="py-4 px-4 font-bold text-center">Trend</th>
                <th className="py-4 px-4 font-bold">Search Volume</th>
                <th className="py-4 px-4 font-bold">Difficulty</th>
                <th className="py-4 px-4 font-bold">Landing Page</th>
                <th className="py-4 px-6 font-bold text-right">Live Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredKeywords.map((kw) => {
                const rankDelta = kw.previousRank - kw.currentRank;
                const isRank1 = kw.currentRank === 1;
                const isTop3 = kw.currentRank <= 3;
                const isTop10 = kw.currentRank <= 10;

                return (
                  <tr key={kw.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {kw.keyword}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-[#0066FF] border border-blue-500/20">
                            {kw.intent}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium font-mono">
                            {kw.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center">
                        {isRank1 ? (
                          <span className="px-3 py-1 rounded-full font-black text-sm bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 font-display flex items-center gap-1">
                            🥇 #1
                          </span>
                        ) : isTop3 ? (
                          <span className="px-3 py-1 rounded-full font-black text-sm bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-display">
                            🥈 #{kw.currentRank}
                          </span>
                        ) : isTop10 ? (
                          <span className="px-2.5 py-1 rounded-full font-bold text-xs bg-blue-500/10 text-[#0066FF] border border-blue-500/20 font-mono">
                            #{kw.currentRank}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-xs text-slate-500 font-mono">
                            #{kw.currentRank}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold">
                      {rankDelta > 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          ▲ +{rankDelta}
                        </span>
                      ) : rankDelta < 0 ? (
                        <span className="text-rose-500">
                          ▼ {rankDelta}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {kw.searchVolume.toLocaleString()}/mo
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-bold ${
                          kw.difficulty === "Low"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : kw.difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {kw.difficulty}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-[#0066FF] dark:text-[#38BDF8]">
                      <a href={kw.targetUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        <span>{kw.targetUrl}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(kw.keyword)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Verify live search results in Google"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-[#0066FF] dark:text-slate-300 font-bold transition-all text-[11px]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Google</span>
                        </a>
                        <button
                          onClick={() => handleDeleteKeyword(kw.id, kw.keyword)}
                          title="Delete keyword from tracker"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredKeywords.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    No matching keywords found. Try clearing filters or add a new target keyword above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Keyword Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-slate-900 dark:text-white font-display mb-2">
              Track New Search Keyword
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Add a target query to monitor rankings, search intent, and Google India position.
            </p>

            <form onSubmit={handleAddKeyword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Search Query *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coaching institute software Ahmedabad"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Landing Page
                </label>
                <select
                  value={newTargetUrl}
                  onChange={(e) => setNewTargetUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                >
                  <option value="/services/coaching-class-management-app">/services/coaching-class-management-app</option>
                  <option value="/services/mobile-apps-on-rent">/services/mobile-apps-on-rent</option>
                  <option value="/services/mobile-app-development">/services/mobile-app-development</option>
                  <option value="/services/website-development">/services/website-development</option>
                  <option value="/product">/product (Interactive Showcase)</option>
                  <option value="/how-it-works">/how-it-works (7-Day Launch)</option>
                  <option value="/">/ (Homepage Flagship)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  >
                    <option value="Coaching Apps">Coaching Apps</option>
                    <option value="Local Ahmedabad">Local Ahmedabad</option>
                    <option value="Web Apps">Web Apps</option>
                    <option value="Mobile Dev">Mobile Dev</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">
                    Intent
                  </label>
                  <select
                    value={newIntent}
                    onChange={(e) => setNewIntent(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Informational">Informational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {submitting ? "Tracking..." : "Start Tracking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
