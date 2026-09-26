import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogRepository } from "@/lib/blog/repository";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Tag,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await BlogRepository.getArticleBySlug(slug, false);

  if (!article || article.language === "hi") {
    return {
      title: "Article Not Found | WebVibez Blog",
      description: "The requested article could not be found.",
    };
  }

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.description || article.excerpt;
  const url = `https://www.webvibez.com/blog/${article.slug}`;
  const image = article.featuredImage || "https://www.webvibez.com/og-image.jpeg";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: article.ogTitle || title,
      description: article.ogDescription || description,
      url,
      type: "article",
      publishedTime: article.publicationDate,
      modifiedTime: article.modifiedDate,
      authors: [article.author?.name || "Rudram Joshi"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.featuredImageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function renderInlineContent(text: string) {
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [, linkText, linkHref] = match;
        const isExternal = linkHref.startsWith("http");
        if (isExternal) {
          return (
            <a
              key={i}
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold hover:opacity-80"
            >
              {linkText}
            </a>
          );
        }
        return (
          <Link
            key={i}
            href={linkHref}
            className="text-[#0066FF] dark:text-[#38BDF8] underline font-semibold hover:opacity-80"
          >
            {linkText}
          </Link>
        );
      }
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function isMarkdownTable(text: string): boolean {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.length >= 2 && lines.every((l) => l.startsWith("|") && l.endsWith("|"));
}

function renderMarkdownTable(tableText: string, key: number) {
  const lines = tableText.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  const headerCells = lines[0]
    .split("|")
    .map((c) => c.trim())
    .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);

  const bodyLines = lines.slice(1).filter((l) => !/^\|[-:\s|]+\|$/.test(l));

  return (
    <div key={key} className="overflow-x-auto my-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead className="bg-slate-50 dark:bg-white/[0.04] text-slate-900 dark:text-white font-mono uppercase text-xs">
          <tr>
            {headerCells.map((h, i) => (
              <th key={i} className="p-3.5 border-b border-slate-200 dark:border-white/10 font-bold">
                {renderInlineContent(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-white/05 font-sans">
          {bodyLines.map((line, rIdx) => {
            const cells = line
              .split("|")
              .map((c) => c.trim())
              .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
            return (
              <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                {cells.map((cell, cIdx) => (
                  <td key={cIdx} className="p-3.5 text-slate-700 dark:text-slate-300">
                    {renderInlineContent(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = await BlogRepository.getArticleBySlug(slug, false);

  if (!article || article.language === "hi") {
    notFound();
  }

  // Schema.org Article Structured Data
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description || article.excerpt,
    image: [article.featuredImage || "https://www.webvibez.com/og-image.jpeg"],
    datePublished: article.publicationDate,
    dateModified: article.modifiedDate || article.publicationDate,
    author: {
      "@type": "Person",
      name: article.author?.name || "Rudram Joshi",
      jobTitle: article.author?.role || "Lead Software Architect",
      url: article.author?.url || "https://www.webvibez.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "WebVibez Software Developer",
      url: "https://www.webvibez.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.webvibez.com/favicon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.webvibez.com/blog/${article.slug}`,
    },
  };

  // Schema.org BreadcrumbList Structured Data
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.webvibez.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.webvibez.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://www.webvibez.com/blog/${article.slug}`,
      },
    ],
  };

  // Schema.org FAQPage Structured Data (if FAQs exist)
  const jsonLdFaq =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      <article className="max-w-[1080px] mx-auto px-6 sm:px-8 py-6 sm:py-10 space-y-10">
        {/* ── BREADCRUMBS ── */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-[#0066FF] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#0066FF] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0066FF] dark:text-[#38BDF8] font-bold truncate max-w-[240px] sm:max-w-md">
            {article.category}
          </span>
        </nav>

        {/* ── ARTICLE HEADER ── */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] font-bold border border-[#0066FF]/20 uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime || "5 min read"}
            </span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publicationDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Author Block */}
          <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200 dark:border-white/10">
            <img
              src={article.author?.avatar || "/favicon.png"}
              alt={article.author?.name || "Author"}
              className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-white/15 shadow-sm"
            />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-display">
                {article.author?.name || "Rudram Joshi"}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                {article.author?.role || "Lead Architect @ WebVibez"}
              </div>
            </div>
          </div>
        </header>

        {/* ── FEATURED HERO IMAGE ── */}
        {article.featuredImage && (
          <div className="relative rounded-3xl overflow-hidden aspect-video max-h-[500px] w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ── AEO DIRECT ANSWER HIGHLIGHT BOX ── */}
        {article.aeoDirectAnswer && (
          <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-emerald-500/10 via-teal-500/05 to-transparent border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Direct Summary &amp; Key Takeaway
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
              {article.aeoDirectAnswer}
            </p>
          </div>
        )}

        {/* ── MAIN ARTICLE CONTENT BODY ── */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed font-sans space-y-6 text-base sm:text-lg">
          {article.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Markdown Table
            if (isMarkdownTable(trimmed)) {
              return renderMarkdownTable(trimmed, index);
            }

            // Heading 2
            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-white/10"
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }

            // Heading 3
            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white pt-4 pb-1"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            // Bullet list
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
              const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
              return (
                <ul key={index} className="list-disc list-inside space-y-2 pl-2">
                  {items.map((item, i) => (
                    <li key={i} className="text-slate-700 dark:text-slate-300">
                      {renderInlineContent(item)}
                    </li>
                  ))}
                </ul>
              );
            }

            // Code block
            if (trimmed.startsWith("```")) {
              const codeLines = trimmed.split("\n").slice(1, -1).join("\n");
              return (
                <pre
                  key={index}
                  className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800"
                >
                  <code>{codeLines}</code>
                </pre>
              );
            }

            // Regular paragraph with inline markdown parsing
            return (
              <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {renderInlineContent(trimmed)}
              </p>
            );
          })}
        </div>

        {/* ── FAQ SECTION (IF ANY) ── */}
        {article.faq && article.faq.length > 0 && (
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-5">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0066FF]" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {article.faq.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-white/10 space-y-2"
                >
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {item.question}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAGS ── */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-white/10">
            <Tag className="w-4 h-4 text-slate-400" />
            {article.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 text-xs font-mono font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* ── CTA BOTTOM BANNER ── */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#0066FF]/15 via-[#8B00FF]/10 to-transparent border border-[#0066FF]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Ready to Engineer Your Custom Software or App?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg">
              WebVibez builds high-scale custom mobile apps, institutes management platforms, and web applications in 7 days.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#0066FF]/30 transition-all shrink-0 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── BACK BUTTON ── */}
        <div className="pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[#0066FF] dark:text-[#38BDF8] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </article>
    </>
  );
}
