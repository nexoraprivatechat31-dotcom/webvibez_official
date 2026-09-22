"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { Handshake, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Cpu, Server } from "lucide-react";

export default function AgreementsPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0066FF] dark:text-[#38BDF8] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
            <Handshake className="w-3.5 h-3.5" />
            <span>LEGAL // MASTER SERVICE AGREEMENT &amp; SLA CONTRACT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
            Client Service Agreement (SLA)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Standard Master Services Framework &middot; WebVibez Software Developer &middot; Gujarat, India
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
              <Server className="w-4 h-4" />
              <span>99.99% UPTIME</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Guaranteed infrastructure uptime backed by Cloudflare &amp; AWS cluster failover.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-[#0066FF] dark:text-[#38BDF8] font-mono text-xs font-bold">
              <Lock className="w-4 h-4" />
              <span>100% IP SOVEREIGNTY</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Client owns 100% of custom brand assets, database records, and curriculum content.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-[#8B00FF] dark:text-[#C084FC] font-mono text-xs font-bold">
              <Cpu className="w-4 h-4" />
              <span>7-DAY TURNKEY</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Expedited compilation, store deployment, and database setup in 7 business days.
            </p>
          </div>
        </div>

        {/* Detailed Contract Clauses */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">01.</span> Engagement Framework
            </h2>
            <p>
              This Master Service Agreement (&quot;Agreement&quot;) defines the technical and operational responsibilities between <strong>WebVibez Software Developer</strong> (&quot;Engineering Partner&quot;) and the client organization (&quot;Client&quot;). Individual projects or feature modules are executed via mutually agreed Statements of Work (SOW) or custom deployment orders.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">02.</span> Scope of Engineering &amp; Deliverables
            </h2>
            <p>
              Deliverables may include, as specified in the client plan:
            </p>
            <ul className="space-y-1.5 pl-4 border-l-2 border-[#0066FF]/30 text-xs sm:text-sm">
              <li>White-labeled Native Mobile Apps (compiled Android APK/AAB and iOS IPA builds).</li>
              <li>Administrative Web Command Center &amp; Faculty ERP Portals.</li>
              <li>Real-time Examination and Attendance Synchronization microservices.</li>
              <li>Automated Payment Gateway Webhooks and Instant Notification Dispatchers (FCM/APNs/WhatsApp/SMS).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">03.</span> Service Level Agreement (SLA) Commitments
            </h2>
            <p>
              WebVibez commits to the following operational metrics:
            </p>
            <ul className="space-y-2 pl-4 border-l-2 border-emerald-500/40">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Critical Incident Response (P1):</strong> Under 30 minutes for server unresponsiveness during active exam or live class sessions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>High Priority (P2):</strong> Under 4 business hours for administrative dashboard or billing webhook disruptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Scheduled Maintenance:</strong> Announced 72 hours prior; carried out strictly in off-peak night hours (01:00 AM – 04:00 AM IST).</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">04.</span> Data Sovereignty &amp; Non-Disclosure (NDA)
            </h2>
            <p>
              Both parties agree to hold all proprietary institutional data, student information, and proprietary algorithms in strict confidentiality. WebVibez will never disclose, resell, or repurpose client telemetry or student records to any third party under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#0066FF] font-mono">05.</span> Jurisdiction &amp; Dispute Resolution
            </h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the substantive laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Ahmedabad, Gujarat, India.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-500">
              To request a signed master services contract (MSA) or customize enterprise SLA terms for your institution, please contact <a href="mailto:webvibezsoftdev@gmail.com" className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold">webvibezsoftdev@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </PageWrapper>
  );
}
