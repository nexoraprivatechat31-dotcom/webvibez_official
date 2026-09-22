import { BlogRepository } from "../blog/repository";
import { ContentCluster } from "./types";

interface ClusterCoverage {
  cluster: ContentCluster;
  articleCount: number;
  coverageStatus: "STRONG" | "MODERATE" | "NEEDS_CONTENT";
  missingTopics: string[];
}

const CLUSTER_TOPIC_BLUEPRINTS: Record<ContentCluster, string[]> = {
  "Education Technology": [
    "Coaching Class Management Software Architecture",
    "Automated Fee Invoicing & WhatsApp Reminders for Institutes",
    "Student Attendance Tracking with Biometric and QR Systems",
    "Online Exam & Test Analytics Platform for Tuition Classes",
  ],
  "Mobile App Development": [
    "Mobile App Development Cost in India Breakdown",
    "React Native vs Native iOS and Android Engineering",
    "Real-time WebSocket Push Notification Architecture",
    "Publishing Apps to Google Play and Apple App Store Guide",
  ],
  "Custom Software": [
    "Custom Software Development Guide for Business",
    "Build vs Buy SaaS vs Custom Business Software",
    "Database Migration and Multi-tenant Architecture Guide",
    "Automating Legacy Business Workflows with Custom ERP",
  ],
  "Website Development": [
    "Next.js for Business Websites Benefits and Considerations",
    "Technical SEO and Core Web Vitals Optimization with Next.js App Router",
    "Headless CMS vs Traditional CMS Architecture",
    "Server-Side Rendering SSR vs Static Site Generation SSG",
  ],
  "SaaS & Business Software": [
    "Designing Scalable SaaS Subscription Architecture",
    "Role-Based Access Control RBAC Security Design",
    "Multi-Branch Business Management Software",
  ],
  "E-commerce": [
    "Custom E-commerce Platform Architecture vs Shopify",
    "Payment Gateway Integration and PCI Compliance India",
  ],
  "Business Automation": [
    "Automating WhatsApp Business Invoicing and Notifications",
    "Lead Management and CRM Pipeline Automation",
  ],
  "Technology Guides": [
    "TypeScript Best Practices for Full-Stack Applications",
    "REST vs GraphQL vs WebSockets API Architecture",
  ],
  "WebVibez Insights": [
    "How WebVibez Builds Enterprise Software with Speed",
    "Engineering Real-time Messaging Applications",
  ],
  "Software Development": [
    "Software Development Lifecycle SDLC for Startups",
    "CI/CD Automated Deployment Pipelines",
  ],
};

export const ContentGapAnalyzer = {
  async analyzeClusterCoverage(): Promise<ClusterCoverage[]> {
    const articles = await BlogRepository.getAllArticles();
    const coverageList: ClusterCoverage[] = [];

    const clusters = Object.keys(CLUSTER_TOPIC_BLUEPRINTS) as ContentCluster[];

    for (const cluster of clusters) {
      const clusterArticles = articles.filter(a => a.category === cluster);
      const blueprints = CLUSTER_TOPIC_BLUEPRINTS[cluster] || [];

      // Detect which blueprints are not yet covered
      const coveredTitles = clusterArticles.map(a => a.title.toLowerCase());
      const missingTopics = blueprints.filter(
        bp => !coveredTitles.some(t => t.includes(bp.toLowerCase().slice(0, 15)))
      );

      let coverageStatus: "STRONG" | "MODERATE" | "NEEDS_CONTENT" = "NEEDS_CONTENT";
      if (clusterArticles.length >= 3) {
        coverageStatus = "STRONG";
      } else if (clusterArticles.length >= 1) {
        coverageStatus = "MODERATE";
      }

      coverageList.push({
        cluster,
        articleCount: clusterArticles.length,
        coverageStatus,
        missingTopics,
      });
    }

    return coverageList;
  },
};
