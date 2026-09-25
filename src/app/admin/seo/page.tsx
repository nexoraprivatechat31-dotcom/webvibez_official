"use client";

import React from "react";
import { Search, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw, BarChart } from "lucide-react";

export default function SEOPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">SEO Intelligence</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor search performance, indexing, and technical SEO health.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/10 active:scale-95 duration-300">
          <RefreshCw className="w-4 h-4" /> Sync GSC Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Metrics */}
        <div className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 text-[#0066FF] dark:text-[#38BDF8] border border-slate-100 dark:border-slate-700/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Total Impressions</p>
            <p className="text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">12.4K</p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 rounded-lg w-fit border border-emerald-200/50 dark:border-emerald-500/20 relative z-10 shadow-sm">
            <TrendingUp className="w-4 h-4" /> +15% vs last month
          </div>
        </div>

        <div className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 border border-slate-100 dark:border-slate-700/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <BarChart className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Total Clicks</p>
            <p className="text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">842</p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 rounded-lg w-fit border border-emerald-200/50 dark:border-emerald-500/20 relative z-10 shadow-sm">
            <TrendingUp className="w-4 h-4" /> +8% vs last month
          </div>
        </div>

        {/* IndexNow Status */}
        <div className="group bg-gradient-to-br from-slate-900 to-black p-6 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between border border-slate-800 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-150" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">IndexNow Protocol</p>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <p className="text-2xl font-extrabold font-display tracking-tight">Active</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 mt-2">Bing & Yandex auto-ping enabled.</p>
          </div>
          <button className="relative z-10 w-full mt-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold active:scale-95 transition-all duration-300">
            View Ping Logs
          </button>
        </div>
      </div>

      {/* Quality Gate Status */}
      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white font-display">Technical Quality Gate</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800/50 relative z-10">
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-300 group/row cursor-default">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 group-hover/row:scale-110 transition-transform duration-300 border border-emerald-100 dark:border-emerald-800/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-base">WWW Canonicalization</p>
                <p className="text-xs font-semibold text-slate-600 mt-1">https://www.webvibez.com is enforced correctly.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-200/50 dark:border-emerald-500/20 w-fit">Passed</span>
          </div>
          
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-300 group/row cursor-default">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 group-hover/row:scale-110 transition-transform duration-300 border border-emerald-100 dark:border-emerald-800/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-base">JSON-LD Schema</p>
                <p className="text-xs font-semibold text-slate-600 mt-1">Organization and Person schema detected.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-200/50 dark:border-emerald-500/20 w-fit">Passed</span>
          </div>
          
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-300 group/row cursor-default">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0 group-hover/row:scale-110 transition-transform duration-300 border border-amber-100 dark:border-amber-800/50">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-base">Internal Topic Clusters</p>
                <p className="text-xs font-semibold text-slate-600 mt-1">Missing pillar pages for 'Coaching App' keywords.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-200/50 dark:border-amber-500/20 w-fit">Warning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
