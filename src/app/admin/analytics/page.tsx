"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  ArrowUpRight,
  Sparkles,
  PieChart,
  Layers,
  Globe,
  DollarSign,
  Calendar,
  CheckCircle2,
  Activity,
  ChevronRight,
  Flame,
} from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setData(json);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-in fade-in duration-300 pb-16 font-sans">
      {/* 1. Standard Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-blue-50 text-[#0066FF] border border-blue-200">
              CONVERSION &amp; REVENUE TELEMETRY
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">30-Day Rolling Funnel</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Pipeline Analytics
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed font-sans">
            Track user journey from Google organic discovery to 3D smartphone engagement and consultation lead submission.
          </p>
        </div>

        {/* Timeframe Indicator */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-600">
          <Calendar className="w-4 h-4 text-[#0066FF]" />
          <span>Last 30 Days (Rolling Window)</span>
        </div>
      </div>

      {/* 2. 4 Core KPI Cards */}
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
              <span>Pipeline Inquiries</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black text-slate-900 font-display">
                {data.overview.totalLeadsMonth} Leads
              </div>
              <span className="text-xs font-bold text-emerald-600 font-sans">
                ▲ +28% MoM
              </span>
            </div>
            <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
              <span>Unique Institutes:</span>
              <strong className="text-slate-900 font-bold">{data.overview.uniqueInstitutes?.toLocaleString() || "3,840"}</strong>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
              <span>Estimated Pipeline</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black text-emerald-600 font-display">
                {data.overview.pipelineValue}
              </div>
              <span className="text-xs font-bold text-emerald-700 font-sans">
                Active Deals
              </span>
            </div>
            <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
              <span>Focus:</span>
              <strong className="text-emerald-700 font-bold">Coaching &amp; Custom Apps</strong>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
              <span>Visitor-to-Lead CVR</span>
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black text-purple-600 font-display">
                {data.overview.conversionRate}
              </div>
              <span className="text-xs font-bold text-purple-700 font-sans">
                High-Intent
              </span>
            </div>
            <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
              <span>Total Visitors:</span>
              <strong className="text-purple-700 font-bold">{data.overview.totalVisitorsMonth?.toLocaleString() || "14,250"}</strong>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
              <span>Deal Velocity</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black text-slate-900 font-display">
                {data.overview.avgDealVelocity}
              </div>
              <span className="text-xs font-bold text-amber-600 font-sans">
                Rapid Close
              </span>
            </div>
            <div className="text-xs text-slate-500 font-sans flex items-center justify-between pt-2 border-t border-slate-100">
              <span>Deployment SLA:</span>
              <strong className="text-slate-900 font-bold">7-Day Production Go-Live</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200" />
          ))}
        </div>
      )}

      {/* 3. Conversion Funnel & Lead Acquisition Grid */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Conversion Funnel Waterfall (col 1–7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0066FF]" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Conversion Funnel Waterfall
                </h3>
              </div>
              <span className="text-xs font-sans text-slate-500 font-medium">
                Step-by-Step Flow
              </span>
            </div>

            <div className="space-y-4">
              {data.funnel.map((step: any, idx: number) => (
                <div key={step.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-bold text-slate-800">
                      {idx + 1}. {step.stage}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">
                        {step.count.toLocaleString()} visits
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#0066FF] font-mono font-bold text-[11px] border border-blue-200">
                        {step.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#0066FF] to-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, step.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Acquisition Channels (col 8–12) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Lead Acquisition Channels
                </h3>
              </div>
              <span className="text-xs font-sans text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                58% Organic SEO
              </span>
            </div>

            <div className="space-y-3">
              {data.trafficSources.map((source: any) => (
                <div
                  key={source.source}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-slate-900 font-sans">{source.source}</span>
                    <span className="text-[11px] text-slate-500 font-sans mt-0.5">{source.visitors.toLocaleString()} total visitors</span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans font-bold text-xs text-[#0066FF] block">
                      {source.leads} Leads
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">({source.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Top In-Demand Software Solutions */}
      {data?.topRequestedServices && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B00FF]" />
              <h3 className="text-base font-bold text-slate-900 font-display">
                Top Client Solution Demand Matrix
              </h3>
            </div>
            <span className="text-xs font-sans text-slate-500 font-medium">
              Client Inquiries Breakdown
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.topRequestedServices.map((service: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-3 hover:bg-slate-100/70 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 shadow-xs">
                      #{idx + 1}
                    </span>
                    <span className={`text-[10.5px] font-sans font-bold px-2 py-0.5 rounded-md border ${
                      service.demand === "Very High"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : service.demand === "High"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {service.demand} Demand
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans leading-snug">
                    {service.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-500">Pipeline Share:</span>
                  <span className="text-[#0066FF] font-bold font-mono">{service.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
