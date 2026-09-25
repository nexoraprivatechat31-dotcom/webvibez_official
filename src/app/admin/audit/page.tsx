"use client";

import React, { useEffect, useState } from "react";
import { Shield, Clock, Search, Filter, AlertTriangle, UserCircle, History } from "lucide-react";

interface AuditLog {
  id: string;
  user_id: string | null;
  user_name: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  before_json: string | null;
  after_json: string | null;
  created_at: string;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      } else {
        setError(data.error || "Failed to load audit logs");
      }
    } catch (err) {
      setError("Network error loading logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(l => 
    (l.user_name || "System").toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.entity_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#0066FF]" /> Audit Log
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Immutable record of all system write actions for compliance and RBAC tracking.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search actor or action..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-[#0066FF] outline-none shadow-sm transition-all" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all duration-300">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="font-bold font-display text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" /> System Events (Latest 100)
          </h3>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-slate-400">
              <div className="w-8 h-8 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-semibold">Loading Audit Trail...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-rose-500">
              <AlertTriangle className="w-8 h-8 mb-4" />
              <p className="font-semibold">{error}</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <p className="font-semibold text-slate-600 dark:text-slate-300">No audit logs found</p>
              <p className="text-sm mt-1">Actions performed by users will be recorded here.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-600 font-extrabold">
                  <th className="p-5 w-48">Timestamp</th>
                  <th className="p-5 w-48">Actor</th>
                  <th className="p-5">Action & Entity</th>
                  <th className="p-5">Changes (Diff)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="p-5 align-top">
                      <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        {new Date(log.created_at).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-5 align-top">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                        <UserCircle className="w-4 h-4 text-[#0066FF]" />
                        {log.user_name || "System Automated"}
                      </div>
                      {log.user_id && <p className="text-[10px] font-mono text-slate-400 ml-6 mt-1">ID: {log.user_id.substring(0,8)}...</p>}
                    </td>
                    <td className="p-5 align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                            log.action === 'UPDATE' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                            log.action === 'DELETE' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400' :
                            'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                          }`}>
                            {log.action}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-600 uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                            {log.entity_type}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-slate-400">ID: {log.entity_id}</p>
                      </div>
                    </td>
                    <td className="p-5 align-top">
                      <div className="text-[10px] font-mono max-w-sm whitespace-pre-wrap flex flex-col gap-2">
                        {log.before_json && (
                          <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 p-2 rounded border border-rose-100 dark:border-rose-900/30">
                            <span className="font-bold uppercase mb-1 block">Before:</span>
                            {log.before_json}
                          </div>
                        )}
                        {log.after_json && (
                          <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 p-2 rounded border border-emerald-100 dark:border-emerald-900/30">
                            <span className="font-bold uppercase mb-1 block">After:</span>
                            {log.after_json}
                          </div>
                        )}
                        {!log.before_json && !log.after_json && (
                          <span className="text-slate-400 italic">No payload recorded.</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
