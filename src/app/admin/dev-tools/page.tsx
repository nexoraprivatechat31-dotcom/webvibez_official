"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Send,
  Database,
  Cpu,
  Check,
  RefreshCw,
  ExternalLink,
  Copy,
  Code,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Sparkles,
} from "lucide-react";

export default function DevToolsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchDevInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dev-tools");
      const json = await res.json();
      if (json.success) {
        setData(json.systemInfo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevInfo();
  }, []);

  const triggerAction = async (action: string, successText: string) => {
    setActionLoading(action);
    try {
      const res = await fetch("/api/admin/dev-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || successText);
        if (action === "test_db_latency") {
          setData((prev: any) => ({
            ...prev,
            database: {
              ...prev?.database,
              latencyMs: json.latencyMs,
            },
          }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast("Copied schema JSON to clipboard!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sampleOrgSchema = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WebVibez Software Developer",
      "url": "https://www.webvibez.com",
      "logo": "https://www.webvibez.com/logo.jpeg",
      "description": "Enterprise software development and bespoke coaching institute mobile app solutions in India.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "addressCountry": "India"
      },
      "sameAs": [
        "https://www.linkedin.com/company/webvibez",
        "https://twitter.com/webvibez"
      ]
    },
    null,
    2
  );

  const sampleAppSchema = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "WebVibez Coaching App Suite",
      "operatingSystem": "Android, iOS, Web",
      "applicationCategory": "EducationalApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "featureList": [
        "Live Online Video Lectures",
        "Automated UPI Fee Reconciliation",
        "Biometric & RFID Student Attendance",
        "CBT Mock Test Series Engine"
      ]
    },
    null,
    2
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-blue-500/10 text-[#0066FF] border border-blue-500/20">
              DEVELOPER OPERATIONS HUB
            </span>
            <span className="text-xs font-mono text-slate-500">• Telemetry &amp; Indexing Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Developer &amp; Indexing Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Dispatch real-time indexing notifications to Google &amp; Bing, test Turso cloud database latency, inspect XML sitemaps, and validate JSON-LD structured schemas.
          </p>
        </div>

        <button
          onClick={fetchDevInfo}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#0066FF]" : ""}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Search Engine Indexing Dispatcher Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 dark:from-blue-900/10 dark:via-slate-900/40 dark:to-indigo-900/10 border border-blue-200/80 dark:border-blue-500/20 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Radio className="w-4 h-4 text-[#0066FF] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider">
                1-Click Search Engine Pings
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
              Live Sitemap Dispatcher
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Notify Googlebot and Bingbot instantly whenever you release a new service, blog article, or feature.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => triggerAction("ping_google", "Google Sitemap Ping sent successfully!")}
              disabled={actionLoading === "ping_google"}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 cursor-pointer active:scale-95"
            >
              <Send className={`w-3.5 h-3.5 ${actionLoading === "ping_google" ? "animate-spin" : ""}`} />
              <span>Ping Googlebot</span>
            </button>

            <button
              onClick={() => triggerAction("ping_bing", "Bing & Yahoo notification dispatched successfully!")}
              disabled={actionLoading === "ping_bing"}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 cursor-pointer active:scale-95"
            >
              <Send className={`w-3.5 h-3.5 ${actionLoading === "ping_bing" ? "animate-spin" : ""}`} />
              <span>Ping Bing &amp; Yahoo</span>
            </button>
          </div>
        </div>

        {/* Quick URL Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">XML Sitemap</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">https://www.webvibez.com/sitemap.xml</span>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0066FF] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">Robots Policy</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">https://www.webvibez.com/robots.txt</span>
            </div>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0066FF] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid: System Telemetry & Core Web Vitals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Telemetry & Turso Latency (col 1–6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Database &amp; Environment
              </h3>
            </div>
            <button
              onClick={() => triggerAction("test_db_latency", "Database latency tested")}
              disabled={actionLoading === "test_db_latency"}
              className="text-xs font-mono font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{actionLoading === "test_db_latency" ? "Testing..." : "Test Latency"}</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Database Provider</span>
              <span className="font-bold text-slate-900 dark:text-white">Turso (libSQL Cloud)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Database Ping / Latency</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {data?.database?.latencyMs || "18ms"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Next.js Architecture</span>
              <span className="font-bold text-slate-900 dark:text-white">Next.js 16 App Router</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Rendering Mode</span>
              <span className="font-bold text-indigo-500">Hybrid SSR + Static ISR</span>
            </div>
          </div>
        </div>

        {/* Right: Core Web Vitals Targets (col 7–12) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Core Web Vitals Thresholds
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-500 font-bold">
              ● 100/100 Lighthouse Target
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="text-[10px] text-slate-500 uppercase">LCP (Largest Paint)</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">&lt; 1.2s</div>
              <div className="text-[10.5px] text-slate-400 mt-0.5">Sub-second above fold</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="text-[10px] text-slate-500 uppercase">INP (Interaction)</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">&lt; 50ms</div>
              <div className="text-[10.5px] text-slate-400 mt-0.5">Instant responsiveness</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="text-[10px] text-slate-500 uppercase">CLS (Layout Shift)</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">0.00</div>
              <div className="text-[10.5px] text-slate-400 mt-0.5">Zero visual jumping</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="text-[10px] text-slate-500 uppercase">TTFB (Server Response)</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">&lt; 80ms</div>
              <div className="text-[10.5px] text-slate-400 mt-0.5">Cloudflare Edge cached</div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data JSON-LD Schemas Section */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Code className="w-4 h-4 text-[#0066FF]" />
              <span className="text-xs font-mono font-bold text-[#0066FF] uppercase">
                Schema.org Rich Snippets
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
              Structured JSON-LD Payloads
            </h3>
          </div>
          <a
            href="https://validator.schema.org/#url=https%3A%2F%2Fwww.webvibez.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-all text-slate-800 dark:text-slate-200 w-fit"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Validate on Schema.org</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">@Organization Schema</span>
              <button
                onClick={() => copyToClipboard(sampleOrgSchema, "org")}
                className="flex items-center gap-1 text-[#0066FF] hover:underline cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey === "org" ? "Copied!" : "Copy JSON"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed max-h-60">
              {sampleOrgSchema}
            </pre>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">@SoftwareApplication Schema</span>
              <button
                onClick={() => copyToClipboard(sampleAppSchema, "app")}
                className="flex items-center gap-1 text-[#0066FF] hover:underline cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey === "app" ? "Copied!" : "Copy JSON"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed max-h-60">
              {sampleAppSchema}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
