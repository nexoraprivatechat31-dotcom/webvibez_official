import React from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

import { cookies } from "next/headers";

export const metadata = {
  title: "Admin Panel | WebVibez",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("webvibez_admin_session")?.value === "authenticated";

  // If not authenticated, just render the children (Login Page) without the sidebar
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <span className="font-extrabold text-xl font-display text-slate-900 dark:text-white">
            WebVibez <span className="text-[#0066FF]">Admin</span>
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-[#0066FF] hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all font-medium">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-[#0066FF] hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span>Leads & Contacts</span>
          </Link>
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-[#0066FF] hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <span>Portfolio & Projects</span>
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-[#0066FF] dark:bg-[#0066FF]/10 dark:text-[#38BDF8] transition-all font-semibold">
            <FileText className="w-5 h-5" />
            <span>Blog Engine</span>
          </Link>
          <Link href="/admin/seo" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-[#0066FF] hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span>SEO Intelligence</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-[#0066FF] hover:bg-blue-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all font-medium">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all font-medium">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-8 justify-between">
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Content Management System</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Rudram Joshi</span>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
