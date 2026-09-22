import { BlogRepository } from "../blog/repository";
import { CannibalizationCheckResult } from "./types";

const CORE_PAGES = [
  {
    url: "/",
    title: "WebVibez — High-Performance Software Development",
    primaryKeywords: ["software developer", "custom software development", "webvibez"],
  },
  {
    url: "/services/website-development",
    title: "Website & Web Application Development Services",
    primaryKeywords: ["website development", "nextjs development", "web application development"],
  },
  {
    url: "/services/mobile-app-development",
    title: "Mobile App Development Services (iOS & Android)",
    primaryKeywords: ["mobile app development", "react native app development", "ios android apps"],
  },
  {
    url: "/services/custom-software-development",
    title: "Custom Software Development Services",
    primaryKeywords: ["custom software development", "bespoke business software", "erp software"],
  },
  {
    url: "/services/coaching-class-management-app",
    title: "Coaching Class Management App & Institute ERP",
    primaryKeywords: ["coaching class management software", "institute management app", "tuition attendance software"],
  },
  {
    url: "/product",
    title: "WebVibez Products & Ecosystem",
    primaryKeywords: ["webvibez product", "software products"],
  },
];

function calculateStringSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  
  if (wordsA.size === 0 || wordsB.size === 0) return 0;
  
  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }
  
  return (2 * intersection) / (wordsA.size + wordsB.size);
}

export const CannibalizationEngine = {
  async checkTopic(
    topic: string,
    primaryKeyword: string,
    targetSlug: string
  ): Promise<CannibalizationCheckResult> {
    const conflictingUrls: Array<{
      url: string;
      title: string;
      reason: string;
      overlapPercentage: number;
    }> = [];

    // 1. Check against core commercial service pages
    for (const page of CORE_PAGES) {
      for (const kw of page.primaryKeywords) {
        const sim = calculateStringSimilarity(primaryKeyword, kw);
        if (sim >= 0.8) {
          conflictingUrls.push({
            url: page.url,
            title: page.title,
            reason: `Direct keyword match with core commercial service page. Article must position as educational/research support, not duplicate commercial intent.`,
            overlapPercentage: Math.round(sim * 100),
          });
        }
      }
    }

    // 2. Check against all existing blog articles in database
    const articles = await BlogRepository.getAllArticles();
    for (const article of articles) {
      // Check slug similarity
      if (article.slug === targetSlug) {
        conflictingUrls.push({
          url: `/blog/${article.slug}`,
          title: article.title,
          reason: `Exact slug collision with existing article ID ${article.id}.`,
          overlapPercentage: 100,
        });
      } else {
        const titleSim = calculateStringSimilarity(topic, article.title);
        const tagSim = article.tags.some(
          t => t.toLowerCase() === primaryKeyword.toLowerCase()
        );

        if (titleSim >= 0.75 || (titleSim >= 0.6 && tagSim)) {
          conflictingUrls.push({
            url: `/blog/${article.slug}`,
            title: article.title,
            reason: `High semantic overlap with existing blog post.`,
            overlapPercentage: Math.round(titleSim * 100),
          });
        }
      }
    }

    if (conflictingUrls.length === 0) {
      return {
        status: "SAFE_TO_CREATE",
        riskScore: 0,
        conflictingUrls: [],
        recommendation: "Safe to create. No cannibalization conflict detected across commercial pages or existing blogs.",
      };
    }

    const maxOverlap = Math.max(...conflictingUrls.map(c => c.overlapPercentage));

    if (maxOverlap >= 95) {
      return {
        status: "HIGH_RISK_CONFLICT",
        riskScore: 95,
        conflictingUrls,
        recommendation: "High risk conflict: An almost identical article or slug exists. Update the existing post instead of creating a duplicate.",
      };
    }

    if (maxOverlap >= 75) {
      return {
        status: "UPDATE_EXISTING",
        riskScore: maxOverlap,
        conflictingUrls,
        recommendation: "Strong topical overlap. Recommend updating and expanding the existing article with new subsections.",
      };
    }

    return {
      status: "CREATE_SUPPORTING_ARTICLE",
      riskScore: maxOverlap,
      conflictingUrls,
      recommendation: "Moderate topical relationship. Safe to create as a supporting guide that links to the primary parent service/article.",
    };
  },
};
