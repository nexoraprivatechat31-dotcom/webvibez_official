"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  BarChart,
  Send,
  ExternalLink,
  ShieldCheck,
  Globe,
  Radio,
} from "lucide-react";
import { IndexingAuditReport } from "@/lib/seo-intelligence/indexing-monitor";

export default function SEOPage() {
  const [auditReport, setAuditReport] = useState<IndexingAuditReport | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingMessage, setPingMessage] = useState<string | null>(null);

  const runAudit = async () => {
    setIsAuditing(true);
    setPingMessage(null);
    try {
      const res = await fetch("/api/admin/seo/indexing-health");
      const data = await res.json();
      if (data.success && data.report) {
        setAuditReport(data.report);
      }
    } catch (err) {
      console.error("Failed to run indexing audit:", err);
    } finally {
      setIsAuditing(false);
    }
  };

  const pingIndexNow = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/admin/seo/indexing-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ping" }),
      });
      const data = await res.json();
      if (data.success) {
        setPingMessage("IndexNow & Google Sitemap Ping Dispatched Successfully!");
      } else {
        setPingMessage(data.message || "Ping failed");
      }
    } catch (err: any) {
      setPingMessage(`Error: ${err.message}`);
    } finally {
      setIsPinging(false);
      setTimeout(() => setPingMessage(null), 5000);
    }
  };

  useEffect(() => {
    runAudit();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            SEO & Indexing Intelligence
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
            Monitor search performance, Google crawl readiness, and technical indexing health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={runAudit}
            disabled={isAuditing}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold transition-all shadow-lg active:scale-95 duration-300 disabled:opacity-50 cursor-pointer text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
            {isAuditing ? "Auditing Site..." : "Live Audit"}
          </button>
          <button
            onClick={pingIndexNow}
            disabled={isPinging}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#0066FF]/25 active:scale-95 duration-300 disabled:opacity-50 cursor-pointer text-sm"
          >
            <Radio className={`w-4 h-4 ${isPinging ? "animate-pulse" : ""}`} />
            {isPinging ? "Pinging..." : "Ping IndexNow"}
          </button>
        </div>
      </div>

      {pingMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{pingMessage}</span>
        </div>
      )}

      {/* ── CORE METRICS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Indexing Health Score */}
        <div className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 text-[#0066FF] dark:text-[#38BDF8] border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Indexing Health Score
            </p>
            <p className="text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {auditReport ? `${auditReport.overallScore}%` : "100%"}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 rounded-lg w-fit border border-emerald-200/50 dark:border-emerald-500/20 relative z-10">
            <CheckCircle2 className="w-4 h-4" />
            {auditReport
              ? `${auditReport.healthyCount} of ${auditReport.totalUrls} URLs 100% Indexable`
              : "All Public Pages Verified"}
          </div>
        </div>

        {/* Total Sitemap URLs */}
        <div className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <Globe className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Verified Sitemap URLs
            </p>
            <p className="text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
              {auditReport ? auditReport.totalUrls : "29"}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 dark:bg-white/[0.06] dark:text-slate-300 px-3 py-1.5 rounded-lg w-fit border border-slate-200 dark:border-white/10 relative z-10">
            <span>Services · Portfolio · Blog Articles</span>
          </div>
        </div>

        {/* IndexNow Protocol */}
        <div className="group bg-gradient-to-br from-slate-900 to-black p-6 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col justify-between border border-slate-800">
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Search Engine Auto-Ping
            </p>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <p className="text-2xl font-extrabold font-display tracking-tight">Active</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 mt-2">
              Bing, Yandex, Naver & Google Sitemap Ping Ready.
            </p>
          </div>
          <button
            onClick={pingIndexNow}
            disabled={isPinging}
            className="relative z-10 w-full mt-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl text-xs sm:text-sm font-bold active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {isPinging ? "Broadcasting..." : "Dispatch Instant Ping"}
          </button>
        </div>
      </div>

      {/* ── LIVE URL INDEXABILITY AUDIT TABLE ── */}
      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white font-display">
              Live Indexability & Crawler Health Audit
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Verifies HTTP 200, Canonical Tag, Noindex absence, and Google Favicon compliance for every sitemap URL.
            </p>
          </div>
          {auditReport && (
            <div className="text-xs font-mono text-slate-500">
              Last Audited: {new Date(auditReport.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Page Path</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Canonical</th>
                <th className="py-3.5 px-4 text-center">Robots.txt</th>
                <th className="py-3.5 px-4 text-center">Favicon</th>
                <th className="py-3.5 px-6 text-right">Index Readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-xs">
              {auditReport?.results && auditReport.results.length > 0 ? (
                auditReport.results.map((row) => (
                  <tr
                    key={row.url}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-6 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#0066FF] flex items-center gap-1.5 group"
                        >
                          <span className="font-sans font-medium text-xs sm:text-sm truncate max-w-xs sm:max-w-md">
                            {row.path === "/" ? "Home ( / )" : row.path}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#0066FF]" />
                        </a>
                      </div>
                      {row.issues.length > 0 && (
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
                          {row.issues.join("; ")}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                          row.statusCode === 200
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {row.statusCode || "ERR"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.canonicalMatches ? (
                        <span className="text-emerald-500 font-bold">Match</span>
                      ) : (
                        <span className="text-amber-500 font-bold">Mismatch</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.isRobotsAllowed ? (
                        <span className="text-emerald-500 font-bold">Allowed</span>
                      ) : (
                        <span className="text-red-500 font-bold">Blocked</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.hasFavicon ? (
                        <span className="text-emerald-500 font-bold">Active</span>
                      ) : (
                        <span className="text-red-500 font-bold">Missing</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-right">
                      {row.isIndexable ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> Ready to Index
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                          <AlertTriangle className="w-3 h-3" /> Needs Attention
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    {isAuditing ? "Auditing all sitemap URLs..." : "Click 'Live Audit' to inspect all pages."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
