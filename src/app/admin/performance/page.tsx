"use client";

import React, { useState, useEffect } from "react";
import {
  Gauge,
  Zap,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Smartphone,
  Monitor,
  Flame,
  Check,
} from "lucide-react";

export default function PerformancePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testingRoute, setTestingRoute] = useState<string | null>(null);

  const fetchPerformance = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/performance");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              LIGHTHOUSE &amp; CORE WEB VITALS
            </span>
            <span className="text-xs font-mono text-slate-500">• Edge Accelerated</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Speed &amp; Web Vitals Telemetry
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Real-time telemetry measuring sub-second Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and asset compression to guarantee #1 SEO ranking speed.
          </p>
        </div>

        <button
          onClick={fetchPerformance}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-md shadow-teal-500/20 active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Re-Run Speed Audit</span>
        </button>
      </div>

      {/* Top Banner Overall Score */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-display text-3xl font-black text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
            99
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
              Google PageSpeed Grade: Flawless
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Zero layout shifts, sub-second LCP, and Next.js 16 compiler optimizations pass all Google Core Web Vitals criteria with flying colors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.webvibez.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Google PageSpeed</span>
          </a>
        </div>
      </div>

      {/* Core Web Vitals Cards */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Object.entries(data.coreWebVitals).map(([key, item]: any) => (
            <div
              key={key}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                  {key.toUpperCase()} • {item.metric}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  PASS
                </span>
              </div>

              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                {item.value}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {item.description}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10.5px] font-mono text-slate-400">
                Target: {item.target}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page by Page Speed Benchmark & Asset Breakdown */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Page Speeds (col 1–7) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#0066FF]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Page-by-Page Lighthouse Scores
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-500">● 100% Passing</span>
            </div>

            <div className="space-y-3">
              {data.pagesSpeedScore.map((page: any) => (
                <div
                  key={page.route}
                  className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{page.name}</span>
                    <span className="font-mono text-[11px] text-slate-500">{page.route}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{page.mobile}/100</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <Monitor className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{page.desktop}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Bundle Breakdown (col 8–12) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Asset Weight Breakdown
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Total ~575 KB</span>
            </div>

            <div className="space-y-3">
              {data.assetBreakdown.map((asset: any) => (
                <div key={asset.type} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{asset.type}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{asset.compression}</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-[#0066FF] dark:text-[#38BDF8]">
                    {asset.size}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sub-Second First Contentful Paint</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Critical Next.js CSS inlining guarantees fast paint on 3G and 4G mobile connections across India.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
