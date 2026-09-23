"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article, ArticleCategory } from "@/lib/blog/types";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tag,
  ChevronRight,
  Share2,
} from "lucide-react";

const CATEGORIES: Array<string> = [
  "All Articles",
  "Education Technology",
  "Mobile App Development",
  "Custom Software",
  "Website Development",
  "SaaS & Business Software",
  "Technology Guides",
  "Business Automation",
  "WebVibez Insights",
];

export default function BlogIndexPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/blog/articles");
        const data = await res.json();
        if (data.success && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error("Failed to load blog articles:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const listArticles = filteredArticles.filter(
    (a) => a.id !== (selectedCategory === "All Articles" && !searchQuery ? featuredArticle?.id : null)
  );

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 xl:px-10 py-6 sm:py-10 space-y-12">
      {/* ── HEADER HERO ── */}
      <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 dark:bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] dark:text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
          WebVibez Engineering & Tech Insights
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Software Architecture, Mobile Apps &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#38BDF8]">
            Digital Product Guides
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Deep-dive tutorials, industry pricing analyses, and software development playbooks written by the engineers at WebVibez.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by keyword, framework, or topic..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0066FF] transition-all shadow-inner"
          />
        </div>
      </div>

      {/* ── CATEGORY FILTER PILLS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/25 scale-105"
                  : "bg-white dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#0066FF]/40"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-96 rounded-3xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="p-16 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No articles found</h3>
          <p className="text-sm text-slate-500">Articles will be published soon. Check back shortly!</p>
        </div>
      )}

      {/* ── FEATURED HERO ARTICLE (Only when not filtering by search) ── */}
      {!loading && featuredArticle && selectedCategory === "All Articles" && !searchQuery && (
        <div className="group relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 shadow-2xl hover:border-[#0066FF]/40 transition-all duration-300 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image */}
            <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-md">
              <img
                src={featuredArticle.featuredImage || "/og-image.jpeg"}
                alt={featuredArticle.featuredImageAlt || featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0066FF] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                Featured Article
              </span>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.06] text-[#0066FF] dark:text-[#38BDF8] font-bold">
                  {featuredArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readingTime || "5 min read"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(featuredArticle.publicationDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <Link href={`/blog/${featuredArticle.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
              </Link>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {featuredArticle.excerpt || featuredArticle.description}
              </p>

              {/* Author and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.author?.avatar || "/favicon.png"}
                    alt={featuredArticle.author?.name || "Author"}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-white/15"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-display">
                      {featuredArticle.author?.name || "Rudram Joshi"}
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-mono">
                      {featuredArticle.author?.role || "WebVibez Architect"}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold shadow-md shadow-[#0066FF]/25 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ARTICLES GRID ── */}
      {!loading && listArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 p-6 shadow-xl hover:border-[#0066FF]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="space-y-4">
                {/* Card Thumbnail */}
                <Link href={`/blog/${article.slug}`} className="block relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={article.featuredImage || "/og-image.jpeg"}
                    alt={article.featuredImageAlt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Metadata */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-[#0066FF] dark:text-[#38BDF8] font-bold">
                    {article.category}
                  </span>
                  <span>&bull;</span>
                  <span>{article.readingTime || "5 min read"}</span>
                </div>

                {/* Title */}
                <Link href={`/blog/${article.slug}`}>
                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {article.excerpt || article.description}
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author?.avatar || "/favicon.png"}
                    alt={article.author?.name || "Author"}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-[11.5px] font-semibold text-slate-700 dark:text-slate-300">
                    {article.author?.name || "Rudram Joshi"}
                  </span>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-bold font-display text-[#0066FF] dark:text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Read &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── NEWSLETTER & CONSULTATION FOOTER BANNER ── */}
      <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0066FF]/10 via-purple-500/05 to-transparent border border-[#0066FF]/20 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
          Need a Custom Mobile App or Web Platform for Your Business?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Talk directly with our lead software engineers. We build production-ready software in 7 days with 100% source code ownership.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0066FF]/30 transition-all"
        >
          <span>Book Free Architecture Call</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
