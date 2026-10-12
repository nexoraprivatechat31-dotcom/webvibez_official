"use client";

import React, { useState } from "react";
import {
  Bell,
  Search,
  ExternalLink,
  Database,
} from "lucide-react";

export default function AdminHeader() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="h-20 lg:h-22 bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 flex items-center px-6 md:px-8 lg:px-10 justify-between sticky top-0 z-50 select-none shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left/Middle: Universal Search / Command Shortcut Bar */}
      <div className="flex-1 max-w-xl mr-6">
        <div className="relative w-full group">
          <Search className="w-4.5 h-4.5 absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066FF] transition-colors" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search leads, keywords, routes, or CRM contacts... (⌘K)"
            className="w-full bg-slate-100/70 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 rounded-full pl-12 pr-16 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-mono"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-mono text-slate-500 shadow-xs pointer-events-none">
            <span>⌘K</span>
          </div>
        </div>
      </div>

      {/* Right: Quick Telemetry, Notifications & User Badge */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Live DB Ping Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
          <Database className="w-4 h-4 text-emerald-600" />
          <span>Turso: <strong className="text-emerald-600 font-bold">38ms</strong></span>
        </div>

        {/* Live Website Jump */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          title="Open live website in new tab"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 transition-all shadow-xs"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>

        {/* Notifications */}
        <button className="relative p-2.5 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        {/* Admin Profile */}
        <div className="flex items-center gap-3.5 cursor-pointer group">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-[14.5px] font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors leading-tight">
              Rudram Joshi
            </span>
            <span className="text-xs font-mono text-slate-500 font-semibold leading-tight mt-0.5">
              superadmin
            </span>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0066FF] to-indigo-500 p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full border border-white overflow-hidden bg-white">
              <img src="/images/square-image.jpg" alt="Admin Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
