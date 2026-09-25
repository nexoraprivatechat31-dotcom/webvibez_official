"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut, Users, LayoutTemplate, Activity, Building2, CreditCard, Shield, ShieldCheck } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads Pipeline", href: "/admin/leads", icon: Users },
    { name: "Clients", href: "/admin/clients", icon: Building2 },
    { name: "Billing & Subs", href: "/admin/billing", icon: CreditCard },
    { name: "Portfolio", href: "/admin/portfolio", icon: LayoutTemplate },
    { name: "Blog Engine", href: "/admin/blog", icon: FileText },
    { name: "SEO Intelligence", href: "/admin/seo", icon: Activity },
    { name: "Audit Log", href: "/admin/audit", icon: Shield },
    { name: "Users & RBAC", href: "/admin/users", icon: ShieldCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 flex-col hidden md:flex relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0066FF]/5 to-transparent pointer-events-none" />

      <div className="h-20 flex items-center px-8 border-b border-slate-200/50 dark:border-slate-800/50 gap-4 relative z-10">
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-blue-500/10 shrink-0 relative">
          <img src="/logo.jpeg" alt="WebVibez Logo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-xl font-display text-slate-900 dark:text-white leading-tight tracking-tight">
            WebVibez <span className="text-[#0066FF]">Admin</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#0066FF] font-black">Workspace v2.0</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5 relative z-10 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm relative group active:scale-[0.98] ${
                isActive
                  ? "text-[#0066FF] dark:text-[#38BDF8] bg-blue-50/80 dark:bg-blue-900/20 shadow-sm border border-blue-100 dark:border-blue-800/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#0066FF] dark:bg-[#38BDF8] rounded-r-full shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
              )}
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 active:scale-[0.98] transition-all duration-300 font-bold text-sm border border-transparent hover:border-rose-100 dark:hover:border-rose-900/30 group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
}
