"use client";

import React from "react";
import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 flex items-center px-8 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden lg:block">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads, projects, or settings (Press '/')" 
            className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full pl-11 pr-4 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0066FF] transition-all font-medium placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0066FF] transition-colors">Rudram Joshi</span>
            <span className="text-xs font-semibold text-slate-600">Super Admin</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066FF] to-purple-500 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full border-2 border-white dark:border-slate-950 overflow-hidden bg-slate-100">
              <img src="/images/square-image.jpg" alt="Admin Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
