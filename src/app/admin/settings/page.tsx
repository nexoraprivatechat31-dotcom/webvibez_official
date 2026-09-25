"use client";

import React from "react";
import { Key, Globe, Database, Bell, Shield, Smartphone, ArrowRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">System Settings</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Configure environment variables and global preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-50 dark:bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] font-bold text-sm flex items-center gap-3 transition-colors">
            <Globe className="w-4 h-4" /> General
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 font-semibold text-sm flex items-center gap-3 active:scale-95 transition-all">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 font-semibold text-sm flex items-center gap-3 active:scale-95 transition-all">
            <Database className="w-4 h-4" /> Database
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 font-semibold text-sm flex items-center gap-3 active:scale-95 transition-all">
            <Bell className="w-4 h-4" /> Notifications
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm p-8 space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white font-display">Site Details</h3>
              <p className="text-sm font-medium text-slate-600 mt-1">These settings affect the public website metadata.</p>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Site Name</label>
                <input type="text" defaultValue="WebVibez Software Developer" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none text-slate-900 dark:text-white font-medium transition-shadow shadow-sm hover:border-slate-300 dark:hover:border-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Primary Domain</label>
                <input type="text" defaultValue="https://www.webvibez.com" className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none text-slate-900 dark:text-white font-mono text-sm transition-shadow shadow-sm hover:border-slate-300 dark:hover:border-slate-700" />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex justify-end relative z-10">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all duration-300">
                Save Changes <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-rose-200 dark:border-rose-900/50 shadow-sm p-8 space-y-6 relative overflow-hidden group hover:border-rose-300 dark:hover:border-rose-800/80 transition-colors">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-500 to-rose-600" />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent dark:from-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="font-extrabold text-xl text-rose-600 dark:text-rose-500 font-display">Danger Zone</h3>
              <p className="text-sm font-medium text-slate-600 mt-1">Actions here are permanent and cannot be undone.</p>
            </div>
            <button className="relative z-10 px-6 py-3 bg-white dark:bg-slate-950 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl font-bold active:scale-95 transition-all duration-300 shadow-sm">
              Clear Cache & Rebuild
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
