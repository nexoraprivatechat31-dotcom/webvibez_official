"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone, Clock, Search, Plus, Filter, MessageCircle, AlertTriangle, Globe } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  project_type: string | null;
  message: string | null;
  source: string;
  status: string;
  internal_notes: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
}

const PIPELINE_STAGES = ["New", "Contacted", "Demo Sent", "Negotiating", "Won", "Lost"];

export default function LeadsPipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.success) {
        // Map old statuses to new pipeline if needed
        const mappedLeads = data.leads.map((l: Lead) => {
          let st = l.status;
          if (st === "Quoted") st = "Negotiating";
          if (st === "Converted") st = "Won";
          if (!PIPELINE_STAGES.includes(st)) st = "New";
          return { ...l, status: st };
        });
        setLeads(mappedLeads);
      } else {
        setError(data.error || "Failed to load leads");
      }
    } catch (err) {
      setError("Network error loading leads");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setLeads((prev) => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error(err);
      fetchLeads(); // revert on fail
    }
  };

  const isColdLead = (createdAt: string, status: string) => {
    if (status !== 'New') return false;
    const hoursSinceCreation = (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
    return hoursSinceCreation > 48;
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (l.project_type || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">Sales Pipeline</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop leads through the conversion funnel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-[#0066FF] outline-none" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium shadow-sm hover:bg-slate-50 active:scale-95 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-rose-500 font-bold">{error}</div>
        ) : (
          <div className="flex gap-6 h-full min-w-max px-1">
            {PIPELINE_STAGES.map(stage => {
              const stageLeads = filteredLeads.filter(l => l.status === stage);
              return (
                <div key={stage} className="w-[320px] flex flex-col h-full bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800/60 overflow-hidden">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur shrink-0">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {stage}
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                    </h3>
                    <button className="text-slate-400 hover:text-[#0066FF] transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                    {stageLeads.map(lead => {
                      const cold = isColdLead(lead.created_at, lead.status);
                      return (
                        <div key={lead.id} className={`bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border ${cold ? 'border-rose-300 dark:border-rose-900/50 shadow-rose-500/10' : 'border-slate-200 dark:border-slate-800'} relative group hover:shadow-md transition-all`}>
                          {cold && (
                            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                              <AlertTriangle className="w-3 h-3" /> Cold Lead
                            </div>
                          )}
                          
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight pr-4">{lead.name}</h4>
                            <select 
                              value={lead.status}
                              onChange={(e) => updateStatus(lead.id, e.target.value)}
                              className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 rounded px-1.5 py-0.5 outline-none cursor-pointer border-none appearance-none hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                              {PIPELINE_STAGES.map(s => <option key={s} value={s}>Move: {s}</option>)}
                            </select>
                          </div>
                          
                          <div className="text-[11px] font-bold text-[#0066FF] dark:text-[#38BDF8] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded inline-block mb-3 border border-blue-100 dark:border-blue-900/40">
                            {lead.project_type || "General Inquiry"}
                          </div>
                          
                          <div className="space-y-1.5 mb-4">
                            {lead.email && (
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Mail className="w-3.5 h-3.5" /> <span className="truncate">{lead.email}</span>
                              </div>
                            )}
                            {lead.phone && (
                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Phone className="w-3.5 h-3.5" /> <span>{lead.phone}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium" title="Source">
                              <Globe className="w-3 h-3" /> {lead.source || "Website"}
                            </div>
                            <div className="flex items-center gap-2">
                              {lead.phone && (
                                <a 
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="w-7 h-7 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                                  title="WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {new Date(lead.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {stageLeads.length === 0 && (
                      <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-xs font-medium text-slate-400">
                        Drop leads here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
