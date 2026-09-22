"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeywordOpportunityItem, ContentBrief } from "@/lib/seo-intelligence/types";

export default function KeywordOpportunitiesPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<KeywordOpportunityItem[]>([]);
  const [dailyPick, setDailyPick] = useState<{
    selectedOpportunity: KeywordOpportunityItem;
    contentBrief: ContentBrief;
    selectionReason: string;
  } | null>(null);
  const [selectedBrief, setSelectedBrief] = useState<ContentBrief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const key = localStorage.getItem("webvibez_admin_key");
    if (!key) {
      router.push("/admin/login");
      return;
    }

    try {
      const [oppsRes, pickRes] = await Promise.all([
        fetch("/api/blog/intelligence/opportunities", {
          headers: { "x-admin-key": key },
        }),
        fetch("/api/blog/intelligence/daily-pick", {
          headers: { "x-admin-key": key },
        }),
      ]);

      const oppsData = await oppsRes.json();
      const pickData = await pickRes.json();

      if (oppsData.success && oppsData.opportunities) {
        setOpportunities(oppsData.opportunities);
      }
      if (pickData.success && pickData.selectedOpportunity) {
        setDailyPick(pickData);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDraft = (item: KeywordOpportunityItem) => {
    const queryParams = new URLSearchParams({
      title: `${item.topic}: Features, Architecture & Implementation Guide`,
      category: item.cluster,
      tags: item.secondaryKeywords.join(", "),
      slug: item.primaryKeyword.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"),
    });
    router.push(`/admin/blog/new?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Search Intelligence Engine
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs text-slate-400">Topical Opportunity Discovery</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Keyword Opportunities</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Daily AI Selection Banner */}
      {dailyPick && (
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Today&apos;s Recommended 09:30 AM Opportunity
              </div>
              <h2 className="text-2xl font-bold text-white">
                {dailyPick.selectedOpportunity.topic}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {dailyPick.selectionReason}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                <span>
                  Cluster: <strong className="text-white">{dailyPick.selectedOpportunity.cluster}</strong>
                </span>
                <span>&bull;</span>
                <span>
                  Intent: <strong className="text-cyan-400">{dailyPick.selectedOpportunity.searchIntent}</strong>
                </span>
                <span>&bull;</span>
                <span>
                  Opportunity Score: <strong className="text-emerald-400">{dailyPick.selectedOpportunity.opportunityScore.totalScore}/100</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedBrief(dailyPick.contentBrief)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
              >
                View Structured Brief
              </button>
              <button
                onClick={() => handleCreateDraft(dailyPick.selectedOpportunity)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
              >
                Draft This Article &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 mb-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Opportunities Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          Analyzing Search Console and content gap metrics...
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40 shadow-xl mb-12">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Discovered Opportunities ({opportunities.length})
            </h3>
            <p className="text-[11px] text-slate-400">
              Scored via WebVibez Content Opportunity Model
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Opportunity / Query</th>
                  <th className="px-6 py-4">Cluster & Intent</th>
                  <th className="px-6 py-4">GSC Metrics</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Cannibalization</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-semibold text-white truncate text-sm mb-0.5">
                        {opp.topic}
                      </p>
                      <p className="text-[11px] text-cyan-400 font-mono truncate">
                        {opp.primaryKeyword}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-white font-medium">{opp.cluster}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono mt-1 inline-block">
                        {opp.searchIntent}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {opp.gscMetrics ? (
                        <div className="space-y-0.5 text-[11px]">
                          <p>
                            <span className="text-slate-400">Impr:</span>{" "}
                            <strong className="text-white">{opp.gscMetrics.impressions}</strong>
                          </p>
                          <p>
                            <span className="text-slate-400">Pos:</span>{" "}
                            <strong className="text-cyan-300">{opp.gscMetrics.position.toFixed(1)}</strong>
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Content Gap</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-xs">
                          {opp.opportunityScore.totalScore}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10.5px] font-semibold border ${
                          opp.cannibalization.status === "SAFE_TO_CREATE"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : opp.cannibalization.status === "CREATE_SUPPORTING_ARTICLE"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {opp.cannibalization.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleCreateDraft(opp)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-semibold transition-all"
                      >
                        + Create Draft
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Structured Brief Modal */}
      {selectedBrief && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">
                  Structured Content Brief
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedBrief.topic}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBrief(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">
                  AEO Direct Answer Guidance:
                </p>
                <p className="leading-relaxed">{selectedBrief.aeoDirectAnswerGuide}</p>
              </div>

              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
                  Recommended Outline:
                </p>
                <ul className="space-y-2 pl-2">
                  {selectedBrief.recommendedOutline.map((item, i) => (
                    <li key={i} className="space-y-1">
                      <p className="font-semibold text-cyan-400">{item.heading}</p>
                      <p className="text-[11px] text-slate-400">{item.purpose}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
                  Recommended Internal Links:
                </p>
                <div className="space-y-1">
                  {selectedBrief.recommendedInternalLinks.map((link, i) => (
                    <p key={i} className="text-[11px] text-slate-400 font-mono">
                      &rarr; <span className="text-cyan-300">{link.title}</span> ({link.href})
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedBrief(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
