"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/blog/types";
import { DailyPublishLog } from "@/lib/seo-intelligence/types";

const WEEK_SCHEDULE = [
  { day: "Monday", cluster: "Education Technology", focus: "Coaching ERP & Institute Apps" },
  { day: "Tuesday", cluster: "Website Development", focus: "Next.js & Technical SEO" },
  { day: "Wednesday", cluster: "Mobile App Development", focus: "React Native & App Architecture" },
  { day: "Thursday", cluster: "Custom Software", focus: "Enterprise Systems & ERP" },
  { day: "Friday", cluster: "Business Automation", focus: "WhatsApp APIs & Invoicing" },
  { day: "Saturday", cluster: "Technology Guides", focus: "TypeScript & API Frameworks" },
  { day: "Sunday", cluster: "SaaS & Business Software", focus: "Scalable Architecture & Security" },
];

export default function ContentCalendarPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [logs, setLogs] = useState<DailyPublishLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const key = localStorage.getItem("webvibez_admin_key");
      if (!key) {
        router.push("/admin/login");
        return;
      }

      try {
        const [artRes, logRes] = await Promise.all([
          fetch("/api/blog/articles", { headers: { "x-admin-key": key } }),
          fetch("/api/blog/intelligence/logs", { headers: { "x-admin-key": key } }),
        ]);

        const artData = await artRes.json();
        const logData = await logRes.json();

        if (artData.success && artData.articles) setArticles(artData.articles);
        if (logData.success && logData.logs) setLogs(logData.logs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Editorial Planning
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs text-slate-400">09:30 AM IST Publication Schedule</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Content Calendar</h1>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* 7-Day Cluster Rotation */}
      <div className="mb-12">
        <h2 className="text-base font-bold text-white mb-4">
          Weekly Topic Diversity Rotation (09:30 AM IST Daily Target)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {WEEK_SCHEDULE.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {s.day}
                </span>
              </div>
              <p className="text-xs font-semibold text-white leading-snug">{s.cluster}</p>
              <p className="text-[11px] text-slate-400 leading-tight">{s.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Execution Audit Logs */}
      <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40 shadow-xl mb-12">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Daily Automation &amp; Idempotency Audit Logs
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Strictly verifies 1 automatic publication per Asia/Kolkata date
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No cron runs recorded yet. The next execution will be logged automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Date (IST)</th>
                  <th className="px-6 py-3.5">Idempotency Key</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Details</th>
                  <th className="px-6 py-3.5">Execution Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3.5 whitespace-nowrap font-semibold text-white">
                      {log.executionDateIST}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap font-mono text-cyan-400 text-[11px]">
                      {log.idempotencyKey}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold border ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : log.status === "ALREADY_PUBLISHED"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 max-w-md text-slate-300 text-[11px]">
                      {log.message}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-slate-400 text-[11px]">
                      {new Date(log.executionTimeUTC).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
