"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GSCSnapshot } from "@/lib/seo-intelligence/types";

export default function AnalyticsPage() {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<GSCSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const key = localStorage.getItem("webvibez_admin_key");
      if (!key) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch("/api/blog/intelligence/gsc?days=28", {
          headers: { "x-admin-key": key },
        });
        const data = await res.json();
        if (data.success && data.snapshot) {
          setSnapshot(data.snapshot);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Observed Search Performance
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs text-slate-400">Google Search Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Search Performance</h1>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          Loading Search Console telemetry...
        </div>
      ) : !snapshot ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          No search analytics data available.
        </div>
      ) : (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Impressions
              </p>
              <p className="text-3xl font-extrabold text-white mt-2">
                {snapshot.totalImpressions.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Last 28 days search visibility</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Organic Clicks
              </p>
              <p className="text-3xl font-extrabold text-cyan-400 mt-2">
                {snapshot.totalClicks.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Direct search visits</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Average Click-Through (CTR)
              </p>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">
                {(snapshot.averageCtr * 100).toFixed(1)}%
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Search result click rate</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Average Position
              </p>
              <p className="text-3xl font-extrabold text-indigo-400 mt-2">
                {snapshot.averagePosition}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Across target ranking queries</p>
            </div>
          </div>

          {/* Observed Query Performance Table */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40 shadow-xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Observed Query Telemetry ({snapshot.rows.length} queries)
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  First-party performance data feeds directly into our daily opportunity scoring
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Search Query</th>
                    <th className="px-6 py-3.5">Target Landing Page</th>
                    <th className="px-6 py-3.5">Clicks</th>
                    <th className="px-6 py-3.5">Impressions</th>
                    <th className="px-6 py-3.5">CTR</th>
                    <th className="px-6 py-3.5">Avg Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {snapshot.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-white max-w-xs truncate">
                        {row.query}
                      </td>
                      <td className="px-6 py-3.5 font-mono text-cyan-400 text-[11px] max-w-xs truncate">
                        {row.page.replace("https://webvibez.com", "")}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap font-semibold text-white">
                        {row.clicks}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-slate-300">
                        {row.impressions}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-emerald-400">
                        {(row.ctr * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            row.position <= 3
                              ? "bg-emerald-500/20 text-emerald-300"
                              : row.position <= 10
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {row.position.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
