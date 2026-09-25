import { Article, TableOfContentsItem } from "./types";

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanText = content.replace(/[#*`_\[\]()]/g, " ").trim();
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+?)(?:\s+\{#([^}]+)\})?$/gm;
  const items: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const title = match[2].trim();
    const explicitId = match[3];
    const id =
      explicitId ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    items.push({ id, title, level });
  }

  return items;
}

export function generateArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.description,
    image: [article.ogImage || article.featuredImage],
    datePublished: article.publicationDate,
    dateModified: article.modifiedDate || article.publicationDate,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.role,
        url: article.author.url || "https://www.webvibez.com/about",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "WebVibez",
      url: "https://www.webvibez.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.webvibez.com/icon-512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.canonicalUrl || `https://www.webvibez.com/blog/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
    inLanguage: "en-US",
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFaqJsonLd(faq: Array<{ question: string; answer: string }>) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
