"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Star,
  RefreshCw,
  Search,
  Building2,
  Calendar,
  Phone,
  Mail,
  User,
  Heart,
} from "lucide-react";

interface FeedbackItem {
  id: string;
  name: string;
  institute: string;
  role: string;
  phone: string;
  email: string;
  content: string;
  created_at: number;
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks || []);
      }
    } catch (e) {
      console.error("Failed to load feedbacks:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = feedbacks.filter((f) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.institute.toLowerCase().includes(q) ||
      f.content.toLowerCase().includes(q) ||
      f.phone.includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-mono text-xs font-bold uppercase tracking-wider">
              Website Feedback &amp; Reviews
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Client Feedback &amp; Visitor Reviews
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
            All reviews, ratings, and experience feedback submitted by coaching academy directors and students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadFeedbacks}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feedback or reviewer name..."
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
        <span className="text-xs font-mono text-slate-500">{filtered.length} Reviews logged</span>
      </div>

      {/* ── REVIEWS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-pink-500/30 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-xs">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {item.institute || item.role || "Coaching Owner"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
                  <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>

              {(item.phone || item.email) && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  {item.phone && <span>📞 {item.phone}</span>}
                  {item.email && <span>✉️ {item.email}</span>}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-400">
            <Heart className="w-12 h-12 mx-auto text-pink-300 dark:text-pink-900 mb-3" />
            <p className="font-semibold text-sm">No feedback submitted yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Feedback from the website feedback widget will automatically appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
