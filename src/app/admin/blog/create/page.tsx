"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Send } from "lucide-react";

export default function CreateBlogPage() {
  const [isPublishing, setIsPublishing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">Write New Article</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button 
            className="px-4 py-2 bg-[#0066FF] hover:bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
            onClick={() => setIsPublishing(true)}
          >
            <Send className="w-4 h-4" />
            <span>{isPublishing ? "Publishing..." : "Publish & Auto-Link"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Article Title</label>
            <input 
              type="text" 
              placeholder="e.g. How to choose a custom software development company"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">URL Slug</label>
              <input 
                type="text" 
                placeholder="e.g. custom-software-development-company"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white appearance-none">
                <option>Custom Software</option>
                <option>Mobile App Development</option>
                <option>Website Development</option>
                <option>Coaching Technology</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">SEO Meta Description</label>
            <textarea 
              rows={2}
              placeholder="Write a compelling meta description for Google (150-160 chars)..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tags (Comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. react native, ios, android, software"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white"
            />
            <p className="text-xs text-slate-600 mt-2">Tags are used to automatically link related services.</p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Article Content (Markdown)</label>
            <textarea 
              rows={15}
              placeholder="Write your article content here in Markdown... The system will automatically inject internal links to your services."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#0066FF] outline-none transition-all text-slate-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
