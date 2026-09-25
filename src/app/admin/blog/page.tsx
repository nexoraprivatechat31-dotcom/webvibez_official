"use client";

import React from "react";
import Link from "next/link";
import { Plus, Search, Edit3, Trash2, Eye } from "lucide-react";

export default function BlogAdminPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Blog Engine</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your SEO-optimized articles and topic clusters.</p>
        </div>
        <Link 
          href="/admin/blog/create" 
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
        >
          <Plus className="w-5 h-5" />
          <span>Write New Article</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
              <option>All Status</option>
              <option>Published</option>
              <option>Drafts</option>
            </select>
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              <th className="p-4">Article Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {/* Dummy Data for UI */}
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <p className="font-semibold text-slate-900 dark:text-white">How to build a Next.js App</p>
                <p className="text-xs text-slate-500 mt-1">/blog/how-to-build-nextjs-app</p>
              </td>
              <td className="p-4 text-sm text-slate-600 dark:text-slate-300">Website Development</td>
              <td className="p-4">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold rounded-full">PUBLISHED</span>
              </td>
              <td className="p-4 text-sm text-slate-500">Oct 12, 2026</td>
              <td className="p-4 text-right space-x-2">
                <button className="p-2 text-slate-400 hover:text-[#0066FF] transition-colors"><Eye className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          Showing 1 of 1 articles
        </div>
      </div>
    </div>
  );
}
