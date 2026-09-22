"use client";

import React from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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

        <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#0066FF] dark:text-[#38BDF8] uppercase font-bold flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span>LEGAL // PRIVACY & DATA COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Last Updated: March 2025 • WebVibez Software Developer
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              1. Institutional Sovereignty & Zero Data-Selling Pledge
            </h2>
            <p>
              At <strong>WebVibez Software Developer</strong>, we uphold the strictest standards of data isolation. We operate purely as a software engineering technology provider and data processor. We do not sell, rent, monetize, or harvest student contact numbers, student profiles, academic records, or institutional financial telemetry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              2. Data Collection & Processing Scope
            </h2>
            <p>
              The application processes information necessary for learning management, automated examinations, and authentication:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Authentication tokens, device identifiers, and push notification tokens (APNs / FCM).</li>
              <li>Academic test submissions, live class participation records, and attendance logs.</li>
              <li>Billing metadata (transaction status, order IDs, and payment references routed directly through your merchant gateway).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              3. Encryption & Storage Security
            </h2>
            <p>
              All communications between mobile applications, web portals, and server APIs are encrypted using TLS 1.3. Databases are encrypted at rest using AES-256 standard encryption. Automated encrypted snapshots are captured hourly with geo-redundant storage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              4. Direct Payment Gateway Processing
            </h2>
            <p>
              WebVibez never collects, processes, or stores student credit card numbers, debit card PINs, or UPI MPINs. All transactions occur through certified Level-1 PCI-DSS compliant payment gateways (such as Razorpay, Cashfree, PhonePe, or Stripe) directly linked to your institution's merchant account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              5. Right to Data Erasure & Export
            </h2>
            <p>
              Your institution retains full data sovereignty. You may export all student profiles, exam logs, and grade books at any time in standardized JSON or CSV formats, or request complete cryptographic data deletion upon contract termination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
              6. Contact Our Privacy Officer
            </h2>
            <p>
              If you have inquiries regarding compliance, GDPR readiness, or data sovereignty, contact our security office directly at <a href="mailto:webvibezsoftdev@gmail.com" className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold">webvibezsoftdev@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
