"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Users, FileText, Activity, LayoutTemplate } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Leads", value: "24", change: "+12%", icon: <Users className="w-6 h-6 text-blue-500" /> },
    { name: "Published Blogs", value: "1", change: "+1", icon: <FileText className="w-6 h-6 text-emerald-500" /> },
    { name: "Portfolio Projects", value: "8", change: "Stable", icon: <LayoutTemplate className="w-6 h-6 text-purple-500" /> },
    { name: "SEO Health", value: "98%", change: "+5%", icon: <Activity className="w-6 h-6 text-amber-500" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Overview Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Rudram! Here is what is happening with WebVibez.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                stat.change.startsWith("+") ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}>
                {stat.change}
              </span>
            </div>
            <span className="text-3xl font-bold text-slate-900 dark:text-white font-display mb-1">{stat.value}</span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Leads & Contacts</h3>
            <Link href="/admin/leads" className="text-sm text-[#0066FF] hover:underline flex items-center gap-1 font-medium">View All <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
          <div className="p-0">
            {/* Dummy Lead Item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Rahul Patel</p>
                <p className="text-sm text-slate-500">Inquiry for Coaching Management App</p>
              </div>
              <div className="mt-2 sm:mt-0 text-sm text-slate-400">2 hours ago</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Aakash Sharma</p>
                <p className="text-sm text-slate-500">Custom E-commerce Platform required</p>
              </div>
              <div className="mt-2 sm:mt-0 text-sm text-slate-400">1 day ago</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Quick Actions</h3>
          <Link href="/admin/blog/create" className="w-full flex items-center justify-center gap-2 py-3 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-semibold transition-all">
            Write New Blog
          </Link>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all">
            Add Portfolio Project
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all">
            Update Services
          </button>
        </div>
      </div>
    </div>
  );
}
