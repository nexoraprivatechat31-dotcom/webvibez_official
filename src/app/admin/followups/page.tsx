"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  RefreshCw,
  MessageSquare,
  Building2,
  X,
} from "lucide-react";
import { CrmFollowup } from "@/lib/crm/crm-service";

export default function FollowupsPage() {
  const [followups, setFollowups] = useState<CrmFollowup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadFollowups();
  }, [statusFilter]);

  const loadFollowups = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/crm/followups?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setFollowups(data.followups || []);
      }
    } catch (e) {
      console.error("Failed to load follow-ups:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async (id: string) => {
    const notes = prompt("Enter completion notes / outcome:");
    if (notes === null) return;

    try {
      setFollowups((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "Completed", completion_notes: notes } : f))
      );

      await fetch("/api/admin/crm/followups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Completed", completionNotes: notes }),
      });
    } catch (e) {
      console.error("Complete followup error:", e);
    }
  };

  const filtered = followups.filter((f) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.contact_name.toLowerCase().includes(q) ||
      f.contact_phone.includes(q) ||
      (f.reason || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              Live Turso CRM Follow-ups
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Client Follow-ups &amp; Action Queue
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
            Scheduled call dates, pending demonstrations, and deal closing conversations for WebVibez apps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadFollowups}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by academy or phone..."
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "Pending", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#0066FF] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {st === "all" ? "All Follow-ups" : st}
            </button>
          ))}
        </div>
      </div>

      {/* ── FOLLOW-UPS LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((f) => {
            const isCompleted = f.status === "Completed";
            const dateStr = new Date(f.followup_date).toLocaleDateString();
            const cleanPhone = f.contact_phone.replace(/[^0-9]/g, "");

            return (
              <div
                key={f.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
                  isCompleted
                    ? "bg-slate-50/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/50 opacity-70"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-500/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-purple-500/10 text-purple-600 border-purple-500/20"
                      }`}
                    >
                      {f.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-500" />
                      {dateStr} {f.followup_time || ""}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    {f.contact_name || "Coaching Academy"}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-1">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    <span>{f.contact_phone}</span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60">
                    <strong className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5 font-mono">
                      Agenda:
                    </strong>
                    {f.reason || "General discussion"}
                  </p>

                  {f.completion_notes && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 italic">
                      Outcome: {f.completion_notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  {cleanPhone ? (
                    <a
                      href={`https://wa.me/91${cleanPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <div />
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => handleMarkComplete(f.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-400">
            <Calendar className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p className="font-semibold text-sm">No follow-ups found</p>
            <p className="text-xs text-slate-500 mt-1">
              You can schedule new follow-ups from the CRM Contacts &amp; Academy Directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
