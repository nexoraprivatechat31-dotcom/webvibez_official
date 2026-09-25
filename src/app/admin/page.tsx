"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Users, FileText, Activity, LayoutTemplate, Zap, Clock, Database, Server, RefreshCcw, HardDrive } from "lucide-react";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (!mounted) return null;

  const stats = [
    { name: "Total Leads", value: dashboardData?.stats?.totalLeads || "0", change: "+12%", trend: "up", icon: <Users className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
    { name: "Live Portfolios", value: dashboardData?.stats?.livePortfolios || "0", change: "+2", trend: "up", icon: <LayoutTemplate className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20" },
    { name: "Total MRR", value: `₹${(dashboardData?.stats?.totalMRR || 0).toLocaleString()}`, change: "+5%", trend: "up", icon: <Activity className="w-5 h-5 text-purple-500" />, bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20" },
    { name: "Renewals (30d)", value: dashboardData?.stats?.renewalsIn30Days || "0", change: "Action Needed", trend: "down", icon: <Clock className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20" },
  ];

  const activityFeed = dashboardData?.activityFeed || [];
  const mrrByTier = dashboardData?.stats?.mrrByTier || { "Simple App": 0, "App + Admin Panel": 0, "Live Lecture App": 0, "Complete Suite": 0 };
  const totalMRR = dashboardData?.stats?.totalMRR || 1; // Prevent div by 0

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-12">
      {/* Sleek Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800/60">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-widest uppercase">System Online • v2.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Welcome back, Rudram.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
            Here is what is happening with WebVibez today. You have <strong className="text-slate-900 dark:text-white">{dashboardData?.stats?.totalLeads || 0} total leads</strong> in the system.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/leads" className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-2xl font-bold shadow-lg shadow-slate-900/10 active:scale-95 transition-all flex items-center gap-2 duration-300">
            View Leads <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Ultra-Minimal KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="group relative bg-white dark:bg-slate-900/30 backdrop-blur-3xl rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-default">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm ${
                stat.trend === "up" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20" : "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white font-display mb-1 tracking-tight">{loading ? "..." : stat.value}</h3>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Activity Feed (Bento Box) */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900/30 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl shadow-sm overflow-hidden flex flex-col hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="p-6 md:p-8 flex items-center justify-between relative z-10 border-b border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] dark:text-[#38BDF8]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">Activity Stream</h3>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">Real-time system events</p>
              </div>
            </div>
            <button onClick={fetchDashboardData} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 active:scale-90 transition-all duration-300">
              <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <div className="p-2 md:p-4 divide-y divide-slate-100/50 dark:divide-slate-800/30 relative z-10 min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-400">Loading stream...</div>
            ) : activityFeed.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400">No recent activity</div>
            ) : (
              activityFeed.map((log: any, i: number) => {
                const isLead = log.type === 'lead';
                const isSystem = log.type === 'system';
                
                return (
                  <div key={i} className="flex gap-4 p-4 md:p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors duration-300 group">
                    <div className={`w-12 h-12 rounded-2xl ${isLead ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'} flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-black/5 dark:border-white/5`}>
                      {isLead ? <Users className="w-4 h-4 text-blue-500" /> : <Database className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        <span className="font-extrabold text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors">{log.name}</span> {log.action} <span className="font-bold text-slate-900 dark:text-white">{log.target}</span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400 dark:text-slate-600 font-bold tracking-wide">
                        <Clock className="w-3 h-3" /> {new Date(log.time).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 text-center relative z-10 border-t border-slate-100 dark:border-slate-800/50 mt-auto">
            <Link href="/admin/leads" className="inline-flex items-center justify-center text-xs font-black uppercase tracking-widest text-[#0066FF] hover:text-blue-700 dark:text-[#38BDF8] dark:hover:text-blue-300 active:scale-95 transition-all">View All Logs</Link>
          </div>
        </div>

        {/* Vitals & Actions Bento Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900/30 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 md:p-8 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">System Vitals</h3>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">Database & Storage</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Database className="w-4 h-4" /> Turso DB Edge</span>
                  <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded text-xs">Connected</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><HardDrive className="w-4 h-4" /> Assets Storage</span>
                  <span className="text-slate-900 dark:text-white">45%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-[#0066FF] dark:bg-[#38BDF8] rounded-full w-[45%]" />
                </div>
              </div>
            </div>

            {/* MRR Segmented Chart */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">MRR by Tier</h3>
              <div className="space-y-3">
                {Object.entries(mrrByTier).map(([tier, mrr]: any, i) => {
                  const percentage = ((mrr / totalMRR) * 100) || 0;
                  const colorClass = i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-purple-500' : 'bg-amber-500';
                  return (
                    <div key={tier} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-600">{tier}</span>
                        <span className="text-slate-900 dark:text-white">₹{Math.round(mrr).toLocaleString()} ({Math.round(percentage)}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${colorClass} rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF] rounded-full blur-[80px] -mr-20 -mt-20 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
            <h3 className="text-xl font-extrabold font-display mb-6">Quick Actions</h3>
            <div className="space-y-3 relative z-10">
              <Link href="/admin/blog/create" className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/5 active:scale-95 duration-300">
                <span className="flex items-center gap-3"><FileText className="w-4 h-4 text-blue-400" /> New Blog Post</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
              <Link href="/admin/portfolio" className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/5 active:scale-95 duration-300">
                <span className="flex items-center gap-3"><LayoutTemplate className="w-4 h-4 text-emerald-400" /> Add Project</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
