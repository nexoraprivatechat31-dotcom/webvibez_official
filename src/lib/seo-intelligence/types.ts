import { ArticleCategory, ArticleStatus } from "../blog/types";

export type SearchIntent =
  | "Informational"
  | "Commercial Investigation"
  | "Transactional"
  | "Navigational"
  | "Local"
  | "Comparison"
  | "How-To"
  | "Problem Solving";

export type ContentCluster =
  | "Software Development"
  | "Website Development"
  | "Mobile App Development"
  | "Custom Software"
  | "SaaS & Business Software"
  | "Education Technology"
  | "E-commerce"
  | "Business Automation"
  | "Technology Guides"
  | "WebVibez Insights";

export interface GSCRow {
  query: string;
  page: string;
  country: string;
  device: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date: string;
}

export interface GSCSnapshot {
  startDate: string;
  endDate: string;
  totalClicks: number;
  totalImpressions: number;
  averageCtr: number;
  averagePosition: number;
  rows: GSCRow[];
  isConfigured: boolean;
  lastSyncAt: string;
}

export interface OpportunityScoreBreakdown {
  gscEvidence: number; // 25%
  businessRelevance: number; // 20%
  searchIntentStrength: number; // 15%
  contentGap: number; // 15%
  rankingOpportunity: number; // 10%
  localRelevance: number; // 5%
  freshnessTrend: number; // 5%
  internalLinkingValue: number; // 5%
  totalScore: number; // 0 - 100
}

export type CannibalizationStatus =
  | "SAFE_TO_CREATE"
  | "UPDATE_EXISTING"
  | "EXPAND_EXISTING"
  | "CREATE_SUPPORTING_ARTICLE"
  | "HIGH_RISK_CONFLICT";

export interface CannibalizationCheckResult {
  status: CannibalizationStatus;
  riskScore: number; // 0 (none) to 100 (exact duplicate)
  conflictingUrls: Array<{
    url: string;
    title: string;
    reason: string;
    overlapPercentage: number;
  }>;
  recommendation: string;
}

export interface KeywordOpportunityItem {
  id: string;
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  cluster: ContentCluster;
  targetAudience: string;
  relatedService: {
    title: string;
    href: string;
    badge: string;
  };
  opportunityScore: OpportunityScoreBreakdown;
  gscMetrics?: {
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
    opportunityType:
      | "HIGH_IMPRESSION_LOW_CTR"
      | "STRIKING_DISTANCE_POS_4_20"
      | "HIGH_IMPRESSION_NO_DEDICATED_PAGE"
      | "TOP_PERFORMER_EXPANSION"
      | "NEW_CLUSTER_OPPORTUNITY";
  };
  cannibalization: CannibalizationCheckResult;
  recommendedAction: "CREATE_ARTICLE" | "UPDATE_EXISTING" | "SCHEDULE" | "RESEARCH_MORE";
  scheduledForDate?: string; // YYYY-MM-DD
  createdAt: string;
}

export interface ContentBrief {
  id: string;
  topic: string;
  primaryKeyword: string;
  secondaryQueries: string[];
  searchIntent: SearchIntent;
  targetAudience: string;
  businessRelevance: string;
  contentCluster: ContentCluster;
  recommendedTitles: string[];
  recommendedSlug: string;
  aeoDirectAnswerGuide: string;
  recommendedOutline: Array<{
    heading: string;
    level: 2 | 3;
    purpose: string;
    keyPoints: string[];
  }>;
  recommendedInternalLinks: Array<{
    title: string;
    href: string;
    anchorTextSuggestion: string;
  }>;
  recommendedFaq: Array<{
    question: string;
    guidance: string;
  }>;
  evidenceRequirements: string[];
  opportunityScore: number;
  confidenceLevel: "HIGH" | "MEDIUM" | "NEEDS_REVIEW";
  createdAt: string;
}

export interface QualityGateResult {
  passed: boolean;
  score: number; // 0 to 100
  checks: Array<{
    rule: string;
    passed: boolean;
    severity: "CRITICAL" | "WARNING" | "INFO";
    message: string;
  }>;
  categoryScores?: {
    contentQuality: number;
    seoQuality: number;
    aeoQuality: number;
    technicalSeo: number;
    overall: number;
  };
}

export interface DailyPublishLog {
  id: string;
  executionDateIST: string; // YYYY-MM-DD
  executionTimeUTC: string; // ISO string
  idempotencyKey: string; // blog-publish-YYYY-MM-DD-Asia-Kolkata
  status: "SUCCESS" | "NO_READY_ARTICLE" | "ALREADY_PUBLISHED" | "QUALITY_GATE_FAILED" | "ERROR";
  articleId?: string;
  articleSlug?: string;
  articleTitle?: string;
  durationMs: number;
  qualityGateScore?: number;
  message: string;
  distributionQueued: boolean;
}
