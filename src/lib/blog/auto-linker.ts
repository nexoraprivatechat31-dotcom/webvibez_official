import { Article } from "./types";

interface LinkRule {
  keywords: string[];
  url: string;
  maxReplacementsPerArticle?: number;
}

const COMMERCIAL_RULES: LinkRule[] = [
  {
    keywords: ["software development company", "custom software development", "software developer"],
    url: "/services/custom-software-development",
    maxReplacementsPerArticle: 2,
  },
  {
    keywords: ["website development", "web development company", "next.js website"],
    url: "/services/website-development",
    maxReplacementsPerArticle: 2,
  },
  {
    keywords: ["mobile app development", "app developer", "react native app"],
    url: "/services/mobile-app-development",
    maxReplacementsPerArticle: 2,
  },
  {
    keywords: ["coaching class management software", "coaching app", "institute management software"],
    url: "/services/coaching-class-management-app",
    maxReplacementsPerArticle: 2,
  },
];

/**
 * Automatically injects internal links into the article content based on keywords.
 * @param content HTML or Markdown string
 * @returns Modified content with internal links injected
 */
export function autoInternalLink(content: string): string {
  let linkedContent = content;

  for (const rule of COMMERCIAL_RULES) {
    let replacementsMade = 0;
    const max = rule.maxReplacementsPerArticle || 1;

    for (const keyword of rule.keywords) {
      if (replacementsMade >= max) break;

      // Regex to match keyword strictly as a word, ignoring case, NOT already inside an anchor tag
      // This is a naive regex approach. For absolute perfection, an AST parser is recommended,
      // but this works for 90% of basic markdown/html strings if used carefully.
      const regex = new RegExp(`(?<!<a[^>]*>\\s*)\\b(${keyword})\\b(?!\\s*<\\/a>)`, "gi");

      linkedContent = linkedContent.replace(regex, (match) => {
        if (replacementsMade >= max) return match;
        replacementsMade++;
        // return `<Link href="${rule.url}" className="text-[#0066FF] font-medium hover:underline">${match}</Link>`;
        return `[${match}](${rule.url})`; // Assuming Markdown for now
      });
    }
  }

  return linkedContent;
}

/**
 * Validates and links related service pages automatically based on article tags.
 */
export function generateRelatedServices(tags: string[]): NonNullable<Article["relatedServices"]> {
  const services: NonNullable<Article["relatedServices"]> = [];

  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("app") || tagString.includes("react native") || tagString.includes("mobile")) {
    services.push({
      title: "Mobile App Development",
      href: "/services/mobile-app-development",
      badge: "iOS & Android",
    });
  }
  
  if (tagString.includes("web") || tagString.includes("nextjs") || tagString.includes("react")) {
    services.push({
      title: "Website Development",
      href: "/services/website-development",
      badge: "Fast & Modern",
    });
  }

  if (tagString.includes("coaching") || tagString.includes("education") || tagString.includes("student")) {
    services.push({
      title: "Coaching Class Management",
      href: "/services/coaching-class-management-app",
      badge: "White-labeled",
    });
  }

  if (services.length === 0) {
    services.push({
      title: "Custom Software Development",
      href: "/services/custom-software-development",
      badge: "Business Automation",
    });
  }

  return services;
}
