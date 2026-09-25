"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Check if date matches 19-02-1973 format logic
    // Usually input type="date" yields YYYY-MM-DD
    if (dateOfBirth === "1973-02-19") {
      setStep(2);
    } else {
      setError("Incorrect verification details.");
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Server error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="p-8 text-center border-b border-slate-100 dark:border-slate-800/50">
          <div className="w-16 h-16 bg-blue-50 dark:bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#0066FF] dark:text-[#38BDF8]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">WebVibez Secure</h1>
          <p className="text-sm text-slate-600 mt-2">Restricted Area. Authorized Personnel Only.</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium rounded-xl text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Admin Email ID</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@webvibez.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0066FF]" /> Master Security Pin (DOB)
                </label>
                <input 
                  type="date" 
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4 shadow-lg shadow-slate-900/10"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl mb-4 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Security pin verified
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Master Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white font-mono"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4 shadow-lg shadow-blue-500/25 disabled:opacity-70"
              >
                {isLoading ? "Authenticating..." : "Unlock Admin Dashboard"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
