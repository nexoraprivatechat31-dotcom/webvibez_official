"use client";

import React, { useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2, X, Heart } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Visitor",
          institute: institute.trim() || "Coaching Owner",
          phone: phone.trim(),
          rating,
          feedback: feedback.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2500);
      }
    } catch (err) {
      console.error("Feedback error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
              Thank You for Your Feedback!
            </h3>
            <p className="text-xs text-slate-500">
              Your valuable review has been sent to our leadership team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-mono text-[10px] font-bold uppercase">
                Director &amp; Client Feedback
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us how we can make our custom coaching apps and platform even better.
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Academy / Role</label>
                <input
                  type="text"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  placeholder="Apex Academy / Director"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210 (If you'd like us to reach out)"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Feedback &amp; Suggestions *</label>
              <textarea
                required
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you like about the demo? Any specific coaching modules you need?"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="w-full py-3 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`} />
              <span>{isSubmitting ? "Submitting Review..." : "Submit Feedback"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
