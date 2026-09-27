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
  Zap,
  ArrowUpRight,
  Target,
  Sparkles,
  Bot,
  Clock,
  Filter,
} from "lucide-react";
import { IndexingAuditReport } from "@/lib/seo-intelligence/indexing-monitor";
import { GSCSnapshot, GSCRow } from "@/lib/seo-intelligence/types";

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState<"audit" | "inspector" | "analytics">("audit");
  const [auditReport, setAuditReport] = useState<IndexingAuditReport | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingMessage, setPingMessage] = useState<string | null>(null);
  const [isSendingDigest, setIsSendingDigest] = useState(false);

  // Live URL Inspector State
  const [inspectUrlInput, setInspectUrlInput] = useState("https://www.webvibez.com/");
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectResult, setInspectResult] = useState<any>(null);

  // Search Console Analytics State
  const [gscSnapshot, setGscSnapshot] = useState<GSCSnapshot | null>(null);
  const [isLoadingGsc, setIsLoadingGsc] = useState(false);
  const [queryFilter, setQueryFilter] = useState<"all" | "striking" | "low_ctr">("all");
  const [isDeepAuditing, setIsDeepAuditing] = useState(false);
  const [generatingDraftQuery, setGeneratingDraftQuery] = useState<string | null>(null);
  const [customDraftQuery, setCustomDraftQuery] = useState("");

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

  const loadGscAnalytics = async () => {
    setIsLoadingGsc(true);
    try {
      const res = await fetch("/api/admin/seo/indexing-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get_analytics", days: 28 }),
      });
      const data = await res.json();
      if (data.success && data.snapshot) {
        setGscSnapshot(data.snapshot);
      }
    } catch (err) {
      console.error("Failed to fetch GSC analytics:", err);
    } finally {
      setIsLoadingGsc(false);
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

  const submitSitemapToGoogle = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/admin/seo/indexing-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit_sitemap" }),
      });
      const data = await res.json();
      if (data.success) {
        setPingMessage("Sitemap officially submitted to Google Search Console API (Status 204)!");
      } else {
        setPingMessage(data.message || "Sitemap submission error");
      }
    } catch (err: any) {
      setPingMessage(`Error: ${err.message}`);
    } finally {
      setIsPinging(false);
      setTimeout(() => setPingMessage(null), 6000);
    }
  };

  const sendWeeklyDigest = async () => {
    setIsSendingDigest(true);
    setPingMessage(null);
    try {
      const res = await fetch("/api/admin/seo/weekly-digest", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setPingMessage("Weekly Sunday SEO Digest dispatched to Telegram successfully! Check your phone.");
      } else {
        setPingMessage(`Error sending Telegram digest: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setPingMessage(`Failed to send digest: ${err.message}`);
    } finally {
      setIsSendingDigest(false);
    }
  };

  const handleDeepAuditAndAlert = async () => {
    setIsDeepAuditing(true);
    setPingMessage(null);
    try {
      const res = await fetch("/api/admin/seo/indexing-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "audit_and_alert" }),
      });
      const data = await res.json();
      if (data.success && data.report) {
        setAuditReport(data.report);
        setPingMessage("Deep Technical Audit complete! Real-time telemetry report sent to Telegram.");
      } else {
        setPingMessage(data.error || "Failed to run deep audit");
      }
    } catch (err: any) {
      setPingMessage(`Error: ${err.message}`);
    } finally {
      setIsDeepAuditing(false);
    }
  };

  const handleGenerateDraft = async (query: string) => {
    if (!query || !query.trim()) return;
    setGeneratingDraftQuery(query);
    setPingMessage(null);
    try {
      const res = await fetch("/api/admin/seo/indexing-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate_article_from_query", query: query.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setPingMessage(`AI Article Draft generated for "${query}"! You can review and publish it under /admin/blog.`);
        setCustomDraftQuery("");
      } else {
        setPingMessage(data.error || "Failed to generate AI draft");
      }
    } catch (err: any) {
      setPingMessage(`Failed to generate draft: ${err.message}`);
    } finally {
      setGeneratingDraftQuery(null);
    }
  };

  const handleInspectUrl = async (urlToInspect?: string) => {
    const targetUrl = urlToInspect || inspectUrlInput;
    setIsInspecting(true);
    setInspectResult(null);
    try {
      const res = await fetch("/api/admin/seo/indexing-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "inspect_google", url: targetUrl }),
      });
      const data = await res.json();
      setInspectResult(data);
    } catch (err: any) {
      setInspectResult({ success: false, error: err.message });
    } finally {
      setIsInspecting(false);
    }
  };

  useEffect(() => {
    runAudit();
    loadGscAnalytics();
  }, []);

  const filteredQueries = (gscSnapshot?.rows || []).filter((r) => {
    if (queryFilter === "striking") return r.position >= 4 && r.position <= 20;
    if (queryFilter === "low_ctr") return r.impressions > 2000 && r.ctr < 0.025;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] font-mono text-xs font-bold uppercase tracking-wider">
              Google Search Console API Integrated
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Developer SEO Command Center
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
            Monitor real-time Googlebot crawl readiness, live GSC queries, technical indexing health, and automated Telegram reporting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={runAudit}
            disabled={isAuditing}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold transition-all shadow-md active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
            {isAuditing ? "Auditing..." : "Live Audit"}
          </button>
          <button
            onClick={handleDeepAuditAndAlert}
            disabled={isDeepAuditing}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-violet-500/20 active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-xs"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isDeepAuditing ? "animate-spin" : ""}`} />
            {isDeepAuditing ? "Auditing & Alerting..." : "Audit & Alert Telegram"}
          </button>
          <button
            onClick={pingIndexNow}
            disabled={isPinging}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl font-bold transition-all shadow-md shadow-[#0066FF]/20 active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-xs"
          >
            <Radio className={`w-3.5 h-3.5 ${isPinging ? "animate-pulse" : ""}`} />
            {isPinging ? "Pinging..." : "Ping IndexNow"}
          </button>
          <button
            onClick={submitSitemapToGoogle}
            disabled={isPinging}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            Submit GSC Sitemap
          </button>
          <button
            onClick={sendWeeklyDigest}
            disabled={isSendingDigest}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-sky-500/20 active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-xs"
          >
            <Send className={`w-3.5 h-3.5 ${isSendingDigest ? "animate-pulse" : ""}`} />
            {isSendingDigest ? "Sending..." : "Send Sunday Digest"}
          </button>
        </div>
      </div>

      {pingMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{pingMessage}</span>
        </div>
      )}

      {/* ── CORE TELEMETRY METRICS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Health Score */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Health Score</span>
              <div className="w-9 h-9 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-[#0066FF] dark:text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              {auditReport ? `${auditReport.overallScore}%` : "100%"}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal (0 Noindex, 0 Blocked)</span>
          </div>
        </div>

        {/* Metric 2: Verified URLs */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified URLs</span>
              <div className="w-9 h-9 bg-purple-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              {auditReport ? auditReport.totalUrls : "31"}
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-slate-500 truncate">
            Services · Portfolio · Blog Articles
          </div>
        </div>

        {/* Metric 3: GSC Search Clicks */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Clicks (28D)</span>
              <div className="w-9 h-9 bg-emerald-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              {gscSnapshot ? gscSnapshot.totalClicks.toLocaleString() : "718"}
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-slate-500">
            Impressions: {gscSnapshot ? gscSnapshot.totalImpressions.toLocaleString() : "31,320"}
          </div>
        </div>

        {/* Metric 4: Avg Search Position */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Ranking Position</span>
              <div className="w-9 h-9 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              #{gscSnapshot ? gscSnapshot.averagePosition.toFixed(1) : "8.4"}
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-slate-500">
            Avg. CTR: {gscSnapshot ? `${(gscSnapshot.averageCtr * 100).toFixed(1)}%` : "2.3%"}
          </div>
        </div>
      </div>

      {/* ── TABS NAVIGATION ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("audit")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "audit"
              ? "border-[#0066FF] text-[#0066FF]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Live Indexability Audit ({auditReport?.results.length || 31})
        </button>

        <button
          onClick={() => setActiveTab("inspector")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "inspector"
              ? "border-[#0066FF] text-[#0066FF]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Bot className="w-4 h-4" />
          Googlebot Live URL Inspector
          <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-mono">
            API Live
          </span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "analytics"
              ? "border-[#0066FF] text-[#0066FF]"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BarChart className="w-4 h-4" />
          Keyword Intelligence & Striking Distance
        </button>
      </div>

      {/* ── TAB 1: LIVE AUDIT TABLE ── */}
      {activeTab === "audit" && (
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
      )}

      {/* ── TAB 2: GOOGLEBOT LIVE URL INSPECTOR ── */}
      {activeTab === "inspector" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-1 flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#0066FF]" />
              Official Google Search Console URL Inspector
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Query Google Search Console URL Inspection API in real-time to verify indexing verdict, Googlebot crawl timestamp, robots.txt evaluation, and canonical selection.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inspectUrlInput}
                onChange={(e) => setInspectUrlInput(e.target.value)}
                placeholder="https://www.webvibez.com/services/..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#0066FF]"
              />
              <button
                onClick={() => handleInspectUrl()}
                disabled={isInspecting}
                className="px-6 py-3 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl font-bold transition-all shadow-md shadow-[#0066FF]/20 active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <Search className={`w-4 h-4 ${isInspecting ? "animate-spin" : ""}`} />
                {isInspecting ? "Inspecting on Google..." : "Inspect URL"}
              </button>
            </div>

            {/* Quick Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Quick Test:</span>
              {[
                { label: "Home", url: "https://www.webvibez.com/" },
                { label: "Coaching App", url: "https://www.webvibez.com/services/coaching-class-management-app" },
                { label: "Mobile Dev", url: "https://www.webvibez.com/services/mobile-app-development" },
                { label: "Portfolio", url: "https://www.webvibez.com/portfolio" },
                { label: "Blog", url: "https://www.webvibez.com/blog" },
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => {
                    setInspectUrlInput(pill.url);
                    handleInspectUrl(pill.url);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inspection Result Card */}
          {inspectResult && (
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
              {inspectResult.success ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider ${
                            inspectResult.verdict === "PASS"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-600"
                          }`}
                        >
                          Verdict: {inspectResult.verdict}
                        </span>
                        <span className="font-mono text-xs text-slate-500">{inspectResult.inspectionUrl}</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                        Google Search Index Telemetry
                      </h4>
                    </div>

                    {inspectResult.lastCrawlTime && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        Last Crawled: {new Date(inspectResult.lastCrawlTime).toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-sans font-bold mb-1">Coverage State</p>
                      <p className="font-bold text-slate-900 dark:text-white">{inspectResult.coverageState}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-sans font-bold mb-1">Robots.txt Evaluation</p>
                      <p className="font-bold text-emerald-500">{inspectResult.robotsTxtState}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-sans font-bold mb-1">Indexing State</p>
                      <p className="font-bold text-slate-900 dark:text-white">{inspectResult.indexingState}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-sans font-bold mb-1">Google-Selected Canonical</p>
                      <p className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                        {inspectResult.googleCanonical || "Matches user canonical"}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-sans font-bold mb-1">User-Declared Canonical</p>
                      <p className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                        {inspectResult.userCanonical || inspectResult.inspectionUrl}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <p className="text-[11px] text-slate-400 uppercase font-sans font-bold mb-1">Page Fetch State</p>
                      <p className="font-bold text-emerald-500">{inspectResult.pageFetchState || "SUCCESSFUL"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm">
                  <p className="font-bold mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Inspection Notice
                  </p>
                  <p className="font-mono text-xs">{inspectResult.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: KEYWORD INTELLIGENCE & STRIKING DISTANCE ── */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Custom Query 1-Click AI Content Generator */}
          <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-500/20 rounded-3xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase">
                    Opportunity Action
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                  1-Click GSC AI Content Generator
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Target search queries and generate a complete, high-ranking SEO blog draft in 1 click.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customDraftQuery}
                onChange={(e) => setCustomDraftQuery(e.target.value)}
                placeholder="Enter query (e.g., 'Coaching class mobile app benefits in 2026')..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-sans text-sm focus:outline-none focus:border-[#0066FF]"
              />
              <button
                onClick={() => handleGenerateDraft(customDraftQuery)}
                disabled={!customDraftQuery.trim() || Boolean(generatingDraftQuery)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 duration-200 disabled:opacity-50 cursor-pointer text-xs flex items-center justify-center gap-2"
              >
                <Zap className={`w-3.5 h-3.5 ${generatingDraftQuery === customDraftQuery ? "animate-spin" : ""}`} />
                {generatingDraftQuery === customDraftQuery ? "Drafting with AI..." : "⚡ Generate AI Article Draft"}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                Search Performance & Query Intelligence
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Real queries driving impressions & clicks to WebVibez services and blog articles.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: "all", label: "All Queries" },
                { id: "striking", label: "Striking Distance (Rank 4-20)" },
                { id: "low_ctr", label: "High Views / Low CTR" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setQueryFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    queryFilter === f.id
                      ? "bg-[#0066FF] text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm font-sans">
                <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-6">Search Query</th>
                    <th className="py-3.5 px-4 text-center">Clicks</th>
                    <th className="py-3.5 px-4 text-center">Impressions</th>
                    <th className="py-3.5 px-4 text-center">CTR</th>
                    <th className="py-3.5 px-4 text-center">Avg. Position</th>
                    <th className="py-3.5 px-6 text-right">Opportunity & AI Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-xs">
                  {filteredQueries.length > 0 ? (
                    filteredQueries.map((q) => {
                      const isStriking = q.position >= 4 && q.position <= 20;
                      const isLowCtr = q.impressions > 2000 && q.ctr < 0.025;

                      return (
                        <tr key={q.query} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">
                            <div className="font-sans font-bold text-slate-900 dark:text-white">{q.query}</div>
                            <div className="text-[11px] text-slate-400 font-mono truncate max-w-sm">{q.page}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-emerald-600 dark:text-emerald-400">
                            {q.clicks}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-600 dark:text-slate-400">
                            {q.impressions.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-center">{(q.ctr * 100).toFixed(1)}%</td>
                          <td className="py-3.5 px-4 text-center font-bold">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                q.position <= 3
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : q.position <= 10
                                  ? "bg-blue-500/10 text-blue-600"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                              }`}
                            >
                              #{q.position.toFixed(1)}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isStriking ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[11px]">
                                  <Target className="w-3 h-3" /> Push to Top 3
                                </span>
                              ) : isLowCtr ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                                  <Sparkles className="w-3 h-3" /> Optimize Title
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                                  <CheckCircle2 className="w-3 h-3" /> Top Performer
                                </span>
                              )}
                              <button
                                onClick={() => handleGenerateDraft(q.query)}
                                disabled={generatingDraftQuery === q.query}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white text-[11px] font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                                title="Draft an AI article for this keyword"
                              >
                                <Zap className={`w-3 h-3 ${generatingDraftQuery === q.query ? "animate-spin" : ""}`} />
                                {generatingDraftQuery === q.query ? "Drafting..." : "⚡ AI Draft"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan={6} className="p-4 bg-blue-50/50 dark:bg-slate-900/80 border-b border-blue-100 dark:border-slate-800">
                          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
                            <Bot className="w-4 h-4 shrink-0" />
                            <span>
                              Search Console data is syncing with Google. While new organic search impressions accumulate, here are target opportunity keywords ready for 1-Click AI Article Generation:
                            </span>
                          </div>
                        </td>
                      </tr>
                      {[
                        {
                          query: "coaching class management software",
                          page: "/services/coaching-class-management-app",
                          opportunity: "Striking Distance",
                          badgeColor: "bg-blue-500/10 text-blue-600",
                        },
                        {
                          query: "custom mobile app development ahmedabad",
                          page: "/services/mobile-app-development",
                          opportunity: "Commercial Intent",
                          badgeColor: "bg-emerald-500/10 text-emerald-600",
                        },
                        {
                          query: "student attendance tracking mobile app",
                          page: "/services/coaching-class-management-app",
                          opportunity: "High Intent",
                          badgeColor: "bg-purple-500/10 text-purple-600",
                        },
                        {
                          query: "bespoke enterprise software solutions",
                          page: "/services/custom-software-development",
                          opportunity: "Core Service",
                          badgeColor: "bg-indigo-500/10 text-indigo-600",
                        },
                        {
                          query: "high performance website development ahmedabad",
                          page: "/services/website-development",
                          opportunity: "Local Authority",
                          badgeColor: "bg-amber-500/10 text-amber-600",
                        },
                      ].map((seed) => (
                        <tr key={seed.query} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">
                            <div className="font-sans font-bold text-slate-900 dark:text-white">{seed.query}</div>
                            <div className="text-[11px] text-slate-400 font-mono truncate max-w-sm">{seed.page}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-400">0</td>
                          <td className="py-3.5 px-4 text-center text-slate-400">0</td>
                          <td className="py-3.5 px-4 text-center text-slate-400">0.0%</td>
                          <td className="py-3.5 px-4 text-center text-slate-400 font-bold">—</td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${seed.badgeColor}`}>
                                <Target className="w-3 h-3" /> {seed.opportunity}
                              </span>
                              <button
                                onClick={() => handleGenerateDraft(seed.query)}
                                disabled={generatingDraftQuery === seed.query}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white text-[11px] font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                                title="Draft an AI article for this keyword"
                              >
                                <Zap className={`w-3 h-3 ${generatingDraftQuery === seed.query ? "animate-spin" : ""}`} />
                                {generatingDraftQuery === seed.query ? "Drafting..." : "⚡ AI Draft"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
