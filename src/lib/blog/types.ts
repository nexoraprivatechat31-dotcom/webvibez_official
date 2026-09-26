export type ArticleStatus =
  | "IDEA"
  | "DRAFT"
  | "REVIEW"
  | "READY"
  | "SCHEDULED"
  | "PUBLISHED"
  | "UPDATED"
  | "ARCHIVED";

export type ArticleCategory =
  | "Software Development"
  | "Website Development"
  | "Mobile App Development"
  | "Custom Software"
  | "SaaS & Business Software"
  | "Education Technology"
  | "E-commerce"
  | "Technology Guides"
  | "Business Automation"
  | "WebVibez Insights";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export type DistributionPlatform =
  | "DEVTO"
  | "HASHNODE"
  | "MEDIUM"
  | "BLOGGER"
  | "TUMBLR"
  | "NOTION"
  | "WEBFLOW"
  | "SQUARESPACE";

export type PlatformCapability =
  | "SUPPORTED"
  | "MANUAL_REQUIRED"
  | "NOT_CONFIGURED"
  | "UNAVAILABLE";

export type DistributionStatus =
  | "NOT_STARTED"
  | "READY"
  | "PUBLISHED"
  | "FAILED"
  | "MANUAL_REQUIRED"
  | "SKIPPED";

export interface DistributionRecord {
  platform: DistributionPlatform;
  status: DistributionStatus;
  externalId?: string;
  externalUrl?: string;
  canonicalStatus: "PASS" | "FAIL" | "UNKNOWN" | "MANUAL_REQUIRED";
  publishedAt?: string;
  lastSyncAt?: string;
  errorMessage?: string;
}

export interface AuthorInfo {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  url?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  description: string;
  content: string; // Markdown or HTML
  aeoDirectAnswer?: string; // Clear 1-2 sentence direct definition for AI search
  category: ArticleCategory;
  tags: string[];
  author: AuthorInfo;
  featuredImage: string;
  featuredImageAlt: string;
  publicationDate: string; // ISO string
  modifiedDate: string; // ISO string
  readingTime: string; // e.g. "6 min read"
  status: ArticleStatus;
  featured: boolean;
  canonicalUrl: string;
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  relatedServices?: Array<{
    title: string;
    href: string;
    badge: string;
  }>;
  relatedArticleSlugs?: string[];
  faq?: FAQItem[];
  tableOfContents?: TableOfContentsItem[];
  noindex?: boolean;
  distribution?: Record<DistributionPlatform, DistributionRecord>;
  language?: "en" | "hi";
  languageGroupKey?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: string;
  targetAudience?: string;
  seoScores?: {
    contentQuality: number;
    seoQuality: number;
    aeoQuality: number;
    technicalSeo: number;
    overall: number;
  };
  createdAt: string;
  updatedAt: string;
}
