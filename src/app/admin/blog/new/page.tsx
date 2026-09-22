"use client";

import React from "react";
import Link from "next/link";
import ArticleEditorForm from "@/components/admin/ArticleEditorForm";

export default function NewArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Article</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Draft an in-depth technical post with structured AEO definitions and SEO tags.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      <ArticleEditorForm />
    </div>
  );
}
