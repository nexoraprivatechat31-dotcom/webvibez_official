"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  Edit,
  DollarSign,
  ChevronRight,
  Sparkles,
  RefreshCw,
  MessageSquare,
  Eye,
  X,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { CrmContact } from "@/lib/crm/crm-service";

export default function CrmContactsPage() {
  const [contacts, setContacts] = useState<CrmContact[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Drawer / Details Modal State
  const [selectedContact, setSelectedContact] = useState<CrmContact | null>(null);

  // New Contact Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newContact, setNewContact] = useState({
    institute_name: "",
    primary_contact_person: "",
    primary_phone: "",
    email: "",
    city: "",
    category: "Coaching / Academy",
    lead_status: "New Lead",
    interest_level: "High",
    services_interested: "Android + iOS Native App",
    general_remarks: "",
    expected_budget: 25000,
  });

  // Follow-up Schedule Modal State
  const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);
  const [followupContact, setFollowupContact] = useState<CrmContact | null>(null);
  const [followupData, setFollowupData] = useState({
    followup_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    followup_time: "11:00 AM",
    reason: "Demo follow-up & quotation discussion",
    priority: "High",
  });

  useEffect(() => {
    loadContacts();
  }, [statusFilter, categoryFilter]);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/admin/crm/contacts?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
        if (data.summary) setSummary(data.summary);
      }
    } catch (e) {
      console.error("Failed to load CRM contacts:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadContacts();
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, lead_status: newStatus } : c))
      );
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, lead_status: newStatus });
      }

      await fetch("/api/admin/crm/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, lead_status: newStatus }),
      });
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact from CRM?")) return;
    try {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);

      await fetch(`/api/admin/crm/contacts?id=${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Failed to delete contact:", e);
    }
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/crm/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setNewContact({
          institute_name: "",
          primary_contact_person: "",
          primary_phone: "",
          email: "",
          city: "",
          category: "Coaching / Academy",
          lead_status: "New Lead",
          interest_level: "High",
          services_interested: "Android + iOS Native App",
          general_remarks: "",
          expected_budget: 25000,
        });
        loadContacts();
      }
    } catch (e) {
      console.error("Create contact error:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleFollowup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followupContact) return;

    try {
      await fetch("/api/admin/crm/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_id: followupContact.id,
          contact_name: followupContact.institute_name || followupContact.primary_contact_person,
          contact_phone: followupContact.primary_phone,
          followup_date: new Date(followupData.followup_date).getTime(),
          followup_time: followupData.followup_time,
          reason: followupData.reason,
          priority: followupData.priority,
        }),
      });

      setIsFollowupModalOpen(false);
      setFollowupContact(null);
      alert("Follow-up scheduled successfully!");
    } catch (e) {
      console.error("Schedule followup error:", e);
    }
  };

  const STATUS_COLORS: { [key: string]: string } = {
    "New Lead": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "In Discussion": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    "Demo Scheduled": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    "Negotiating": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    "Converted": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Client": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Follow Up": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    "Lost": "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      {/* ── HEADER & CRM METRICS ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] font-mono text-xs font-bold uppercase tracking-wider">
              Connected with Turso Cloud CRM DB
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Mobile CRM Contacts &amp; Academy Directory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
            Live database of coaching academies, App Studio blueprint intakes, quotations &amp; client conversions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadContacts}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            title="Refresh CRM Contacts"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-500/25 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Contact</span>
          </button>
        </div>
      </div>

      {/* ── METRICS SUMMARY CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Contacts",
            value: summary?.totalContacts || contacts.length,
            icon: Users,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "New Leads",
            value: summary?.newLeads || contacts.filter((c) => c.lead_status === "New Lead").length,
            icon: Sparkles,
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10",
          },
          {
            label: "In Discussion / Demo",
            value:
              summary?.inDiscussion ||
              contacts.filter((c) => ["In Discussion", "Demo Scheduled", "Negotiating"].includes(c.lead_status)).length,
            icon: Clock,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-500/10",
          },
          {
            label: "Converted Clients",
            value: summary?.clients || contacts.filter((c) => c.is_client === 1 || c.lead_status === "Converted").length,
            icon: CheckCircle2,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Pending Follow-ups",
            value: summary?.pendingFollowups || 0,
            icon: Calendar,
            color: "text-indigo-600 dark:text-indigo-400",
            bg: "bg-indigo-500/10",
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5"
            >
              <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">{card.label}</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white font-display mt-0.5">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FILTER & SEARCH TOOLBAR ── */}
      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-5 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search academy, director name, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" /> Status:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="New Lead">New Lead</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Demo Scheduled">Demo Scheduled</option>
            <option value="Negotiating">Negotiating</option>
            <option value="Converted">Converted</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="JEE">JEE / NEET</option>
            <option value="Commerce">Commerce / CA</option>
            <option value="School">School & Tuition</option>
            <option value="UPSC">UPSC / GPSC</option>
            <option value="Mobile">Mobile Apps</option>
            <option value="Web">Web Development</option>
          </select>
        </div>
      </div>

      {/* ── CONTACTS TABLE ── */}
      <div className="bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">Academy / Prospect</th>
                <th className="py-4 px-4">Contact Info</th>
                <th className="py-4 px-4">Category / Stream</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4">Source</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {contacts.length > 0 ? (
                contacts.map((c) => {
                  const statusBadgeClass =
                    STATUS_COLORS[c.lead_status] || "bg-slate-100 text-slate-600 border-slate-200";

                  const cleanPhone = c.primary_phone.replace(/[^0-9]/g, "");

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 dark:text-white text-sm font-display flex items-center gap-2">
                          <span>{c.institute_name || "Coaching Academy"}</span>
                          {c.is_client === 1 && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                              CLIENT
                            </span>
                          )}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
                          <span>{c.primary_contact_person || "Director"}</span>
                          {c.city && <span>• {c.city}</span>}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-mono text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-500" />
                          <span>{c.primary_phone}</span>
                        </div>
                        {c.email && (
                          <div className="text-slate-400 text-[11px] truncate max-w-[180px] mt-0.5">
                            {c.email}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                          {c.category}
                        </span>
                        {c.services_interested && (
                          <div className="text-slate-400 text-[10px] truncate max-w-[200px] mt-1 font-mono">
                            {c.services_interested}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <select
                          value={c.lead_status}
                          onChange={(e) => handleUpdateStatus(c.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer focus:outline-none ${statusBadgeClass}`}
                        >
                          <option value="New Lead">New Lead</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Demo Scheduled">Demo Scheduled</option>
                          <option value="Negotiating">Negotiating</option>
                          <option value="Converted">Converted</option>
                          <option value="Follow Up">Follow Up</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-mono text-slate-500 text-[11px]">
                          {c.data_source}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(c.created_at).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/91${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => {
                              setFollowupContact(c);
                              setIsFollowupModalOpen(true);
                            }}
                            className="p-2 rounded-xl text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors cursor-pointer"
                            title="Schedule Follow-up"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setSelectedContact(c)}
                            className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                            title="View Full Blueprint & Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete Contact"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Building2 className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="font-semibold text-sm">No CRM contacts found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      New App Studio blueprint submissions from the website will automatically appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DETAILS MODAL / BLUEPRINT DRAWER ── */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase font-mono">
                  {selectedContact.data_source}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
                  {selectedContact.institute_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase font-mono font-bold text-[10px]">Director / Lead Person</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                    {selectedContact.primary_contact_person}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase font-mono font-bold text-[10px]">WhatsApp &amp; Phone</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1 font-mono">
                    {selectedContact.primary_phone}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase font-mono font-bold text-[10px]">Location</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                    {selectedContact.city || "Gujarat, India"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase font-mono font-bold text-[10px]">Stream / Category</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                    {selectedContact.category}
                  </p>
                </div>
              </div>

              {selectedContact.services_interested && (
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                  <span className="text-blue-600 dark:text-blue-400 uppercase font-mono font-bold text-[10px]">
                    Configured Edition &amp; Scale
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    {selectedContact.services_interested}
                  </p>
                </div>
              )}

              {selectedContact.general_remarks && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase font-mono font-bold text-[10px]">Full Blueprint Intake Data</span>
                  <pre className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans mt-2 leading-relaxed">
                    {selectedContact.general_remarks}
                  </pre>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 font-mono">
                  Created: {new Date(selectedContact.created_at).toLocaleString()}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/91${selectedContact.primary_phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Director</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD NEW CONTACT MODAL ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                Add New Contact to CRM
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Academy / Business Name</label>
                <input
                  type="text"
                  required
                  value={newContact.institute_name}
                  onChange={(e) => setNewContact({ ...newContact, institute_name: e.target.value })}
                  placeholder="e.g. Paramount Science Academy"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Director / Contact Person</label>
                  <input
                    type="text"
                    required
                    value={newContact.primary_contact_person}
                    onChange={(e) => setNewContact({ ...newContact, primary_contact_person: e.target.value })}
                    placeholder="e.g. Dr. Hitesh Patel"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone No.</label>
                  <input
                    type="tel"
                    required
                    value={newContact.primary_phone}
                    onChange={(e) => setNewContact({ ...newContact, primary_phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    value={newContact.city}
                    onChange={(e) => setNewContact({ ...newContact, city: e.target.value })}
                    placeholder="Ahmedabad, Surat, etc."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category / Stream</label>
                  <select
                    value={newContact.category}
                    onChange={(e) => setNewContact({ ...newContact, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="JEE / NEET Coaching">JEE / NEET Coaching</option>
                    <option value="Commerce / CA">Commerce / CA</option>
                    <option value="School & Tuition">School & Tuition</option>
                    <option value="UPSC / Govt Exams">UPSC / Govt Exams</option>
                    <option value="Custom Mobile App">Custom Mobile App</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Remarks &amp; Requirements</label>
                <textarea
                  rows={3}
                  value={newContact.general_remarks}
                  onChange={(e) => setNewContact({ ...newContact, general_remarks: e.target.value })}
                  placeholder="Notes on student batch size, platform requirement, quotation discussed..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : "Save to CRM"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SCHEDULE FOLLOW-UP MODAL ── */}
      {isFollowupModalOpen && followupContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                Schedule Follow-up Call
              </h3>
              <button
                onClick={() => setIsFollowupModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleFollowup} className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-mono">Target Academy:</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {followupContact.institute_name} ({followupContact.primary_contact_person})
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    required
                    value={followupData.followup_date}
                    onChange={(e) => setFollowupData({ ...followupData, followup_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    value={followupData.followup_time}
                    onChange={(e) => setFollowupData({ ...followupData, followup_time: e.target.value })}
                    placeholder="11:00 AM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Reason &amp; Agenda</label>
                <input
                  type="text"
                  required
                  value={followupData.reason}
                  onChange={(e) => setFollowupData({ ...followupData, reason: e.target.value })}
                  placeholder="e.g. APK demo discussion, fee negotiation..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFollowupModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
