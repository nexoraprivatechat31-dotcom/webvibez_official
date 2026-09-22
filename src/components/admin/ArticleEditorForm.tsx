"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Article, ArticleCategory, ArticleStatus } from "@/lib/blog/types";

const CATEGORIES: ArticleCategory[] = [
  "Education Technology",
  "Mobile App Development",
  "Custom Software",
  "Website Development",
  "SaaS & Business Software",
  "Technology Guides",
  "Business Automation",
  "WebVibez Insights",
];

interface ArticleEditorFormProps {
  initialArticle?: Partial<Article>;
  isEdit?: boolean;
}

export default function ArticleEditorForm({
  initialArticle,
  isEdit = false,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [subtitle, setSubtitle] = useState(initialArticle?.subtitle || "");
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || "");
  const [description, setDescription] = useState(initialArticle?.description || "");
  const [aeoDirectAnswer, setAeoDirectAnswer] = useState(initialArticle?.aeoDirectAnswer || "");
  const [category, setCategory] = useState<ArticleCategory>(
    (initialArticle?.category as ArticleCategory) || "Technology Guides"
  );
  const [tagsInput, setTagsInput] = useState(
    initialArticle?.tags ? initialArticle.tags.join(", ") : "Web Development, Next.js"
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialArticle?.featuredImage ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
  );
  const [status, setStatus] = useState<ArticleStatus>(
    initialArticle?.status || "DRAFT"
  );
  const [featured, setFeatured] = useState(Boolean(initialArticle?.featured));
  const [content, setContent] = useState(initialArticle?.content || "");

  // FAQ items
  const [faqList, setFaqList] = useState<Array<{ question: string; answer: string }>>(
    initialArticle?.faq || [
      {
        question: "How long does custom development take?",
        answer: "Typically between 4 to 12 weeks depending on the complexity of the feature set and integrations.",
      },
    ]
  );

  const autoGenerateSlug = () => {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);
    setSlug(generated);
  };

  const addFaqItem = () => {
    setFaqList([...faqList, { question: "", answer: "" }]);
  };

  const updateFaqItem = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...faqList];
    updated[index][field] = val;
    setFaqList(updated);
  };

  const removeFaqItem = (index: number) => {
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const key = localStorage.getItem("webvibez_admin_key");
    if (!key) {
      router.push("/admin/login");
      return;
    }

    const payload = {
      title,
      slug,
      subtitle,
      excerpt,
      description: description || excerpt,
      aeoDirectAnswer,
      category,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      featuredImage,
      status,
      featured,
      content,
      faq: faqList.filter((f) => f.question.trim() && f.answer.trim()),
    };

    try {
      const url = isEdit
        ? `/api/blog/articles/${initialArticle?.id}`
        : "/api/blog/articles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save article.");
      }

      router.push("/admin/blog");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Basic Details */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
          1. Article Details & Metadata
        </h2>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Article Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={!slug ? autoGenerateSlug : undefined}
            required
            placeholder="e.g. Next.js for Business Websites: Benefits & Architecture"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-400">
                URL Slug * (/blog/...)
              </label>
              <button
                type="button"
                onClick={autoGenerateSlug}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                Auto Generate
              </button>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="nextjs-for-business-websites"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ArticleCategory)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="A short subtitle expanding on the title..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Short Excerpt / SEO Description (150-160 chars)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Concise summary for search engine snippet and blog cards..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* AEO / AI Search Direct Answer */}
      <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400 font-bold text-xs uppercase">⚡ AEO Direct Answer</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
              Perplexity & ChatGPT Search Optimized
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Write a 1-2 sentence crystal-clear factual definition or answer for AI Overviews.
          </p>
        </div>
        <textarea
          value={aeoDirectAnswer}
          onChange={(e) => setAeoDirectAnswer(e.target.value)}
          rows={2}
          placeholder="e.g. Next.js is a production React framework offering React Server Components, hybrid SSR/SSG rendering, and built-in SEO capabilities."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Markdown Content */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
          2. Full Markdown Content
        </h2>
        <p className="text-xs text-slate-400">
          Use standard markdown. For section anchors, add &quot;## Heading &#123;#custom-anchor-id&#125;&quot;.
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          required
          placeholder="## 1. Overview {#overview}&#10;&#10;Write comprehensive article content here..."
          className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* FAQ Builder */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              3. FAQ Schema Items
            </h2>
            <p className="text-xs text-slate-400">
              Automatically renders FAQ accordions and generates Google FAQPage JSON-LD.
            </p>
          </div>
          <button
            type="button"
            onClick={addFaqItem}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20"
          >
            + Add Question
          </button>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Q{i + 1}:</span>
                <button
                  type="button"
                  onClick={() => removeFaqItem(i)}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateFaqItem(i, "question", e.target.value)}
                placeholder="Question text..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
              <textarea
                value={faq.answer}
                onChange={(e) => updateFaqItem(i, "answer", e.target.value)}
                rows={2}
                placeholder="Answer text..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Publishing Status & Meta */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
          4. Publishing & Visibility
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ArticleStatus)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 font-semibold"
            >
              <option value="DRAFT">DRAFT (Admin Only)</option>
              <option value="REVIEW">REVIEW (Ready for QA)</option>
              <option value="SCHEDULED">SCHEDULED (Vercel Cron)</option>
              <option value="PUBLISHED">PUBLISHED (Live on WebVibez)</option>
              <option value="ARCHIVED">ARCHIVED (Protected)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Next.js, Web Development, Tech"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Featured Hero Post?
            </label>
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
              />
              <span className="text-xs text-slate-300 font-medium">
                Pin to top of blog index
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {loading ? "Saving Article..." : isEdit ? "Save & Update Article" : "Create & Save Article"}
        </button>
      </div>
    </form>
  );
}
