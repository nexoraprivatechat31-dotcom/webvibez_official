"use client";

import React, { useState, useEffect } from "react";
import {
  Webhook,
  Send,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Radio,
  Zap,
  Copy,
  Check,
  Plus,
  Key,
} from "lucide-react";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchIntegrations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/integrations");
      const json = await res.json();
      if (json.success) {
        setIntegrations(json.integrations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleTestWebhook = async (id: string, name: string) => {
    setTestingId(id);
    try {
      const res = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test_webhook", id }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTestingId(null);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/30 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              API &amp; WEBHOOK COMMAND CENTER
            </span>
            <span className="text-xs font-mono text-slate-500">• 6 Active Channels</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            API Integrations &amp; Webhooks
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Monitor real-time webhook endpoints and API connections for Telegram instant lead alerts, Turso DB replication, GSC indexing, and payment notifications.
          </p>
        </div>

        <button
          onClick={fetchIntegrations}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#0066FF]" : ""}`} />
          <span>Ping All APIs</span>
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold border ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  {item.pingLatency}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                <span className="text-slate-400 block text-[9.5px] uppercase font-bold mb-0.5">Endpoint / Channel</span>
                <span className="select-all">{item.channel}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{item.status}</span>
              </div>

              <button
                onClick={() => handleTestWebhook(item.id, item.name)}
                disabled={testingId === item.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0066FF] text-xs font-bold transition-all cursor-pointer active:scale-95"
              >
                <Zap className={`w-3.5 h-3.5 ${testingId === item.id ? "animate-spin" : ""}`} />
                <span>{testingId === item.id ? "Testing..." : "Test Ping"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
