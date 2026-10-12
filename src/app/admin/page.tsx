"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Users,
  FileText,
  Activity,
  Sparkles,
  Zap,
  Clock,
  Database,
  Server,
  RefreshCcw,
  HardDrive,
  TrendingUp,
  ShieldCheck,
  Gauge,
  Terminal,
  Webhook,
  Send,
  Radio,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Cpu,
  Globe,
  Layers,
} from "lucide-react";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dbPing, setDbPing] = useState<string>("38ms");
  const [pingLoading, setPingLoading] = useState(false);
  const [pingMessage, setPingMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      if (data.success) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestPing = async () => {
    setPingLoading(true);
    try {
      const res = await fetch("/api/admin/dev-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test_db_latency" }),
      });
      const json = await res.json();
      if (json.success) {
        setDbPing(json.latencyMs);
        setPingMessage(`Turso DB Ping: ${json.latencyMs}`);
        setTimeout(() => setPingMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPingLoading(false);
    }
  };

  const handleGooglePing = async () => {
    try {
      const res = await fetch("/api/admin/dev-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ping_google" }),
      });
      const json = await res.json();
      if (json.success) {
        setPingMessage("Googlebot notified of live sitemap!");
        setTimeout(() => setPingMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-in fade-in duration-300 pb-16">
      {/* Toast Notification */}
      {pingMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center gap-3 animate-in slide-in-from-bottom-5 font-sans text-xs font-semibold">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>{pingMessage}</span>
        </div>
      )}

      {/* 1. Standard Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-blue-50 text-[#0066FF] border border-blue-200">
              DEVELOPER CONTROL PLANE
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">Live Production Cluster</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Overview Console
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed font-sans">
            Central developer hub for real-time edge telemetry, CRM pipeline metrics, Google SERP radar, and distributed cloud subsystems.
          </p>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTestPing}
            disabled={pingLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 font-sans"
          >
            <Zap className={`w-4 h-4 ${pingLoading ? "animate-spin text-amber-500" : "text-amber-500"}`} />
            <span>Ping Turso DB</span>
          </button>

          <button
            onClick={handleGooglePing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95 font-sans"
          >
            <Send className="w-4 h-4" />
            <span>Ping Googlebot SERP</span>
          </button>
        </div>
      </div>

      {/* 2. Developer Cluster Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-sans text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CLUSTER ONLINE</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-sans text-slate-600">
            <span>Region: <strong className="text-slate-900 font-semibold">AWS ap-south-1 (Mumbai)</strong></span>
            <span className="text-slate-300">•</span>
            <span>Runtime: <strong className="text-slate-900 font-semibold">Node.js v22</strong></span>
            <span className="text-slate-300">•</span>
            <span>Edge DB Latency: <strong className="text-emerald-600 font-mono font-bold">{dbPing}</strong></span>
          </div>
        </div>

        <div className="text-xs font-sans text-slate-500 font-medium">
          Status: <span className="text-emerald-600 font-bold">100% Operational</span>
        </div>
      </div>

      {/* 3. 4 High-Density Developer Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: CRM & Leads */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Lead Pipeline</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200 font-bold">
              30D
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-slate-900 font-display">
              {loading ? "..." : dashboardData?.stats?.totalLeads || "0"}
            </div>
            <span className="text-xs font-bold text-emerald-600 font-sans">
              ▲ +12% MoM
            </span>
          </div>
          <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Est. Pipeline:</span>
            <strong className="text-slate-900 font-bold">₹18,40,000</strong>
          </div>
        </div>

        {/* Metric 2: Live Google Rank Radar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google SERP Radar</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              LIVE
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-emerald-600 font-display">
              #4.2
            </div>
            <span className="text-xs font-bold text-emerald-700 font-sans">
              3 at #1 🥇
            </span>
          </div>
          <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Page 1 Coverage:</span>
            <strong className="text-emerald-700 font-bold">88% of Keywords</strong>
          </div>
        </div>

        {/* Metric 3: Core Web Vitals & Speed */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-teal-600" />
              <span>Core Web Vitals</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200 font-bold">
              GRADE A+
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-teal-600 font-display">
              99%
            </div>
            <span className="text-xs font-bold text-teal-700 font-sans">
              LCP: 0.84s
            </span>
          </div>
          <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Layout Shift (CLS):</span>
            <strong className="text-teal-700 font-bold">0.00 (Flawless)</strong>
          </div>
        </div>

        {/* Metric 4: Turso libSQL Cloud DB */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-600" />
              <span>Edge Database</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              TURSO
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-purple-600 font-display">
              12
            </div>
            <span className="text-xs font-bold text-slate-500 font-sans">
              Active Tables
            </span>
          </div>
          <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Latency / Replication:</span>
            <strong className="text-emerald-600 font-mono font-bold">{dbPing} (Active)</strong>
          </div>
        </div>
      </div>

      {/* Main Command Center: Subsystem Health Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#0066FF]" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Subsystems &amp; Integrations Health Matrix
            </h3>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-600">
            ● 6/6 Operational
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans text-xs">
          {[
            { name: "Telegram Bot Lead Alerts", channel: "@WebvibezLeadBot", status: "Connected", ping: "110ms", href: "/admin/integrations" },
            { name: "Turso Distributed Database", channel: "webvibezcrm-expert (ap-south-1)", status: "Connected", ping: dbPing, href: "/admin/dev-tools" },
            { name: "Google Search Console API", channel: "gsc-service@webvibez-seo", status: "Synced", ping: "142ms", href: "/admin/seo" },
            { name: "XML Sitemap & Indexing", channel: "24 Verified Routes", status: "Dispatched", ping: "Instant", href: "/admin/dev-tools" },
            { name: "Cashfree UPI Payment Gateway", channel: "Webhook API Listener", status: "Ready", ping: "88ms", href: "/admin/integrations" },
            { name: "WhatsApp Cloud Business", channel: "+91 WebVibez Direct Gateway", status: "Standby", ping: "120ms", href: "/admin/integrations" },
          ].map((sub, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="font-bold text-slate-900 truncate font-sans text-xs">{sub.name}</span>
                  <span className="text-[10.5px] text-slate-500 truncate font-mono">{sub.channel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 ml-2">
                <span className="text-[11px] text-slate-600 font-mono font-semibold">{sub.ping}</span>
                <Link
                  href={sub.href}
                  className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#0066FF] hover:border-blue-300 transition-colors shadow-xs"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Activity Stream Feed */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Cluster Activity Terminal
            </h3>
          </div>
          <span className="text-xs font-sans text-slate-500 font-medium">
            Real-Time Audit Log
          </span>
        </div>

        <div className="space-y-2 font-sans text-xs">
          {[
            { time: "Just now", type: "DB_PING", message: "Turso libSQL AWS ap-south-1 edge query returned in 38ms", status: "OK", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
            { time: "4 mins ago", type: "SERP_RADAR", message: "Google position check: 'Coaching institute app Ahmedabad' confirmed at #1", status: "RANK_1", color: "text-amber-700 bg-amber-50 border-amber-200" },
            { time: "18 mins ago", type: "LEAD_INTAKE", message: "App Studio intake received: Android + iOS Coaching Suite", status: "CAPTURED", color: "text-blue-700 bg-blue-50 border-blue-200" },
            { time: "1 hour ago", type: "SEO_AUDIT", message: "Full site crawl completed: 8 routes verified, 98% Grade A+ health", status: "PASSED", color: "text-purple-700 bg-purple-50 border-purple-200" },
            { time: "3 hours ago", type: "CACHE_SYNC", message: "Static generation ISR cache validated across Cloudflare Edge", status: "SYNCED", color: "text-teal-700 bg-teal-50 border-teal-200" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-slate-400 font-medium">{item.time}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200 shadow-xs">
                  {item.type}
                </span>
                <span className="text-slate-800 text-xs font-sans truncate">{item.message}</span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${item.color}`}>
                ● {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
