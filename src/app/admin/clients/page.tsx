"use client";

import React, { useEffect, useState } from "react";
import { Building2, Phone, Mail, Search, Filter, AlertTriangle, Plus, Users } from "lucide-react";

interface ClientData {
  id: string;
  institute_name: string;
  contact_person: string;
  phone: string | null;
  email: string | null;
  tier: string;
  deployment_date: string | null;
  renewal_date: string | null;
  ios_link: string | null;
  android_link: string | null;
  student_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      } else {
        setError(data.error || "Failed to load clients");
      }
    } catch (err) {
      setError("Network error loading clients");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">Clients</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your active coaching institutes and deployments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all duration-300">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all duration-300">
            <Plus className="w-4 h-4" /> New Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Stats */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-colors" />
            <p className="text-sm font-medium text-slate-600 mb-1 relative z-10">Active Institutes</p>
            <p className="text-4xl font-extrabold font-display text-slate-900 dark:text-white relative z-10">{clients.filter(c => c.status === 'active').length}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#8B00FF] to-purple-600 p-5 rounded-3xl border border-purple-400/20 shadow-xl shadow-purple-500/20 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform" />
            <p className="text-sm font-bold text-purple-100 mb-1 relative z-10">Total End Students</p>
            <p className="text-4xl font-extrabold font-display relative z-10 tracking-tight">
              {clients.reduce((acc, curr) => acc + (curr.student_count || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Main Table */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search institute or contact..." className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-[#0066FF] outline-none transition-all shadow-sm" />
            </div>
          </div>
          
          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-semibold">Loading Clients...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-rose-500">
                <AlertTriangle className="w-8 h-8 mb-4" />
                <p className="font-semibold">{error}</p>
              </div>
            ) : clients.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8" />
                </div>
                <p className="font-semibold text-slate-600 dark:text-slate-300">No active clients</p>
                <p className="text-sm mt-1">Convert leads to clients to see them here.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-600 font-extrabold">
                    <th className="p-5">Institute Details</th>
                    <th className="p-5">Plan & Scope</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="p-5">
                        <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          {client.institute_name}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">{client.contact_person}</p>
                        <div className="flex flex-col gap-1 mt-1.5 text-[11px] text-slate-400">
                          {client.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {client.email}</span>}
                          {client.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {client.phone}</span>}
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{client.tier}</p>
                        <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {client.student_count} / 750 students
                        </p>
                        <p className="text-[10px] uppercase text-slate-400 mt-1">Renewal: <span className="font-bold text-slate-600 dark:text-slate-300">{client.renewal_date || 'N/A'}</span></p>
                      </td>
                      <td className="p-5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          client.status === 'active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:border-transparent dark:bg-emerald-900/40 dark:text-emerald-400' : 
                          'bg-slate-100 text-slate-700 border border-slate-200 dark:border-transparent dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-sm font-bold text-[#0066FF] hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
