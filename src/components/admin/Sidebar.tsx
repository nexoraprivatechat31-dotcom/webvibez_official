"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  Users,
  Calendar,
  MessageSquare,
  Building2,
  TrendingUp,
  ShieldCheck,
  Activity,
  FileText,
  Gauge,
  Terminal,
  Webhook,
  Settings,
  LogOut,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  };

  const navGroups: NavGroup[] = [
    {
      groupName: "WORKSPACE",
      items: [
        { name: "Overview Console", href: "/admin", icon: LayoutDashboard },
        { name: "Pipeline Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      groupName: "CLIENT CRM & INTAKES",
      items: [
        {
          name: "App Studio Leads",
          href: "/admin/leads",
          icon: Sparkles,
          badge: "Live",
          badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
        },
        { name: "CRM Directory", href: "/admin/crm", icon: Users },
        { name: "Follow-up Queue", href: "/admin/followups", icon: Calendar },
        { name: "Client Reviews", href: "/admin/feedback", icon: MessageSquare },
        { name: "Client Accounts", href: "/admin/clients", icon: Building2 },
      ],
    },
    {
      groupName: "SEARCH & RANKING ENGINE",
      items: [
        {
          name: "Keyword Rank Tracker",
          href: "/admin/rank-tracker",
          icon: TrendingUp,
          badge: "#1 SERP",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        {
          name: "Full-Site SEO Audit",
          href: "/admin/seo-audit",
          icon: ShieldCheck,
          badge: "98% A+",
          badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        },
        { name: "SEO Intelligence", href: "/admin/seo", icon: Activity },
        { name: "Blog Engine", href: "/admin/blog", icon: FileText },
      ],
    },
    {
      groupName: "DEVELOPER OPERATIONS",
      items: [
        {
          name: "Speed & Web Vitals",
          href: "/admin/performance",
          icon: Gauge,
          badge: "Fast",
          badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
        },
        { name: "Indexing & Pings", href: "/admin/dev-tools", icon: Terminal },
        {
          name: "API & Webhooks",
          href: "/admin/integrations",
          icon: Webhook,
          badge: "6 Active",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        },
        { name: "System Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-72 lg:w-80 bg-white/95 backdrop-blur-2xl border-r border-slate-200/80 flex flex-col shrink-0 relative overflow-hidden select-none z-20 shadow-[1px_0_6px_rgba(0,0,0,0.03)]">
      {/* Background Subtle Blue Glow */}
      <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#0066FF]/[0.06] to-transparent pointer-events-none" />

      {/* Brand Header - Increased Size & Spacing */}
      <div className="h-20 lg:h-22 flex items-center px-6 lg:px-7 border-b border-slate-200/80 gap-4 relative z-10 shrink-0">
        <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-blue-500/15 shrink-0 relative ring-1 ring-black/10">
          <img src="/logo.jpeg" alt="WebVibez Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-xl font-display text-slate-900 leading-tight tracking-tight">
            WebVibez <span className="text-[#0066FF]">Admin</span>
          </span>
          <span className="text-[11px] uppercase tracking-widest text-[#0066FF] font-black mt-0.5">
            Workspace v2.0
          </span>
        </div>
      </div>

      {/* Navigation Menu Groups - Larger Padding & Typography */}
      <nav className="flex-1 px-4 lg:px-5 py-5 space-y-5 relative z-10 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.groupName} className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-3 pt-2 pb-1">
              {group.groupName}
            </div>

            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 font-semibold text-[14.5px] relative group active:scale-[0.98] ${
                    isActive
                      ? "text-[#0066FF] bg-blue-50/90 shadow-xs border border-blue-100 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent font-medium"
                  }`}
                >
                  {/* Original Left Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#0066FF] rounded-r-full shadow-[0_0_10px_rgba(0,102,255,0.7)]" />
                  )}

                  <div className="flex items-center gap-3.5 truncate">
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "scale-105 text-[#0066FF]"
                          : "group-hover:scale-105 text-slate-500 group-hover:text-slate-800"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                        item.badgeColor || "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer: Live Telemetry & Secure Logout - Increased Spacing */}
      <div className="p-4 lg:p-5 border-t border-slate-200/80 bg-slate-50/70 shrink-0 space-y-3">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cluster Edge Online</span>
          </span>
          <span className="text-slate-400 font-semibold">38ms ping</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-rose-600 hover:bg-rose-50 active:scale-[0.98] transition-all duration-200 font-bold text-[14.5px] border border-transparent hover:border-rose-100 group cursor-pointer"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
}
