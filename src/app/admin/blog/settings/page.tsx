"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [telegramTesting, setTelegramTesting] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState<string | null>(null);

  const handleTestTelegram = async () => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key) return;

    setTelegramTesting(true);
    setTelegramStatus(null);

    try {
      const res = await fetch("/api/blog/intelligence/telegram-test", {
        method: "POST",
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTelegramStatus("✅ Test alert sent successfully to Telegram!");
      } else {
        setTelegramStatus(`❌ Error: ${data.error || "Failed to send"}`);
      }
    } catch (err: any) {
      setTelegramStatus(`❌ Network error: ${err.message}`);
    } finally {
      setTelegramTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              System Configuration
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs text-slate-400">Publishing &amp; API Controls</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Engine Settings</h1>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="space-y-6">
        {/* Telegram Instant Alerts Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/30 border border-cyan-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  Telegram Instant Publishing Alerts
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                Receive instant notifications with live blog links and syndicated platform URLs every day at 09:30 AM IST.
              </p>
            </div>
            <button
              onClick={handleTestTelegram}
              disabled={telegramTesting}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {telegramTesting ? "Sending..." : "🚀 Test Telegram Ping"}
            </button>
          </div>

          {telegramStatus && (
            <p className="text-xs font-semibold text-cyan-300 pt-2">{telegramStatus}</p>
          )}
        </div>

        {/* Publishing Schedule Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
            1. Automated Publishing Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-slate-400 font-semibold">Target Publishing Time:</p>
              <p className="text-base font-bold text-white">09:30 AM IST (Asia/Kolkata)</p>
              <p className="text-[11px] text-slate-500">UTC Schedule: 04:00 AM UTC (0 4 * * *)</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-slate-400 font-semibold">Publication Cap &amp; Idempotency:</p>
              <p className="text-base font-bold text-emerald-400">Max 1 Article / Day</p>
              <p className="text-[11px] text-slate-500">Strict database idempotency key locked</p>
            </div>
          </div>
        </div>

        {/* Quality Gate Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
            2. Anti-Spam &amp; Quality Gate
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The automated publishing engine strictly enforces pre-publication verification before any scheduled article goes live. If no approved article with status <strong className="text-white">READY</strong> or <strong className="text-white">SCHEDULED</strong> is present, the engine will safely record <strong className="text-amber-300 font-mono">NO_READY_ARTICLE</strong>, alert you via Telegram, and will <strong className="text-white">never</strong> publish low-quality AI filler.
          </p>
        </div>

        {/* Integration Statuses */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
            3. Active Integration Endpoints
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white">Vercel Cron Trigger</span>
              <span className="font-mono text-cyan-400 text-[11px]">/api/blog/cron</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white">Dynamic RSS 2.0 Feed</span>
              <span className="font-mono text-cyan-400 text-[11px]">/blog/rss.xml</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white">Dynamic XML Sitemap</span>
              <span className="font-mono text-cyan-400 text-[11px]">/sitemap.xml</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
