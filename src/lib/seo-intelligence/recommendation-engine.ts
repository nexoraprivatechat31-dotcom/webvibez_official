import { GoogleSearchConsoleService } from "./google-search-console";
import { OpportunityScoringEngine } from "./scoring";
import { CannibalizationEngine } from "./cannibalization";
import { ContentGapAnalyzer } from "./content-gap";
import { ContentBriefGenerator } from "./content-brief";
import {
  KeywordOpportunityItem,
  ContentCluster,
  SearchIntent,
  ContentBrief,
} from "./types";

const CLUSTER_DAY_SCHEDULE: Record<number, ContentCluster> = {
  1: "Education Technology", // Monday
  2: "Website Development", // Tuesday
  3: "Mobile App Development", // Wednesday
  4: "Custom Software", // Thursday
  5: "Business Automation", // Friday
  6: "Technology Guides", // Saturday
  0: "SaaS & Business Software", // Sunday
};

export const RecommendationEngine = {
  async discoverKeywordOpportunities(): Promise<KeywordOpportunityItem[]> {
    const gscSnapshot = await GoogleSearchConsoleService.getSearchAnalyticsSnapshot(28);
    const gaps = await ContentGapAnalyzer.analyzeClusterCoverage();

    const opportunities: KeywordOpportunityItem[] = [];

    // 1. Process GSC queries
    for (const row of gscSnapshot.rows) {
      let cluster: ContentCluster = "Technology Guides";
      let relatedService = {
        title: "Custom Software Development",
        href: "/services/custom-software-development",
        badge: "Custom Tech",
      };

      if (row.query.includes("coaching") || row.query.includes("tuition") || row.query.includes("attendance")) {
        cluster = "Education Technology";
        relatedService = {
          title: "Coaching Class Management App",
          href: "/services/coaching-class-management-app",
          badge: "Flagship Software",
        };
      } else if (row.query.includes("mobile") || row.query.includes("react native") || row.query.includes("app cost")) {
        cluster = "Mobile App Development";
        relatedService = {
          title: "Mobile App Development Services",
          href: "/services/mobile-app-development",
          badge: "iOS & Android",
        };
      } else if (row.query.includes("nextjs") || row.query.includes("website") || row.query.includes("web app")) {
        cluster = "Website Development";
        relatedService = {
          title: "Next.js Web Application Development",
          href: "/services/website-development",
          badge: "Web Specialists",
        };
      }

      const searchIntent: SearchIntent = row.query.includes("cost") || row.query.includes("vs") || row.query.includes("guide")
        ? "Commercial Investigation"
        : row.query.includes("how")
        ? "How-To"
        : "Informational";

      const hasLocalIntent = row.query.includes("ahmedabad") || row.query.includes("india") || row.query.includes("gujarat");

      const scoreBreakdown = OpportunityScoringEngine.calculateScore({
        gscImpressions: row.impressions,
        gscClicks: row.clicks,
        gscPosition: row.position,
        searchIntent,
        cluster,
        hasLocalIntent,
        isExistingClusterGap: true,
        hasDirectServiceMatch: true,
      });

      const targetSlug = row.query
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      const cannibalization = await CannibalizationEngine.checkTopic(
        row.query,
        row.query,
        targetSlug
      );

      const classification = GoogleSearchConsoleService.classifyOpportunityType(row);

      opportunities.push({
        id: `opp-gsc-${opportunities.length + 1}`,
        topic: row.query.replace(/\b\w/g, l => l.toUpperCase()),
        primaryKeyword: row.query,
        secondaryKeywords: [row.query, `${row.query} guide`, `${row.query} 2026`],
        searchIntent,
        cluster,
        targetAudience: "Business Owners, Tech Founders & Educators",
        relatedService,
        opportunityScore: scoreBreakdown,
        gscMetrics: {
          impressions: row.impressions,
          clicks: row.clicks,
          ctr: row.ctr,
          position: row.position,
          opportunityType: classification.opportunityType,
        },
        cannibalization,
        recommendedAction: cannibalization.status === "HIGH_RISK_CONFLICT"
          ? "UPDATE_EXISTING"
          : "CREATE_ARTICLE",
        createdAt: new Date().toISOString(),
      });
    }

    // 2. Process Content Gap Blueprints
    for (const gap of gaps) {
      for (const missingTopic of gap.missingTopics) {
        const scoreBreakdown = OpportunityScoringEngine.calculateScore({
          searchIntent: "Informational",
          cluster: gap.cluster,
          hasLocalIntent: false,
          isExistingClusterGap: true,
          hasDirectServiceMatch: true,
        });

        const targetSlug = missingTopic
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");

        const cannibalization = await CannibalizationEngine.checkTopic(
          missingTopic,
          missingTopic,
          targetSlug
        );

        opportunities.push({
          id: `opp-gap-${opportunities.length + 1}`,
          topic: missingTopic,
          primaryKeyword: missingTopic.toLowerCase(),
          secondaryKeywords: [missingTopic.toLowerCase(), `${missingTopic.toLowerCase()} guide`],
          searchIntent: "Informational",
          cluster: gap.cluster,
          targetAudience: "Enterprise Architects & Founders",
          relatedService: {
            title: "Custom Software Development",
            href: "/services/custom-software-development",
            badge: "Bespoke Tech",
          },
          opportunityScore: scoreBreakdown,
          cannibalization,
          recommendedAction: "CREATE_ARTICLE",
          createdAt: new Date().toISOString(),
        });
      }
    }

    return opportunities.sort(
      (a, b) => b.opportunityScore.totalScore - a.opportunityScore.totalScore
    );
  },

  async selectDailyTopOpportunity(): Promise<{
    selectedOpportunity: KeywordOpportunityItem;
    contentBrief: ContentBrief;
    selectionReason: string;
  }> {
    const opportunities = await this.discoverKeywordOpportunities();
    const now = new Date();
    const dayOfWeek = now.getDay();
    const scheduledCluster = CLUSTER_DAY_SCHEDULE[dayOfWeek];

    // Priority 1: High opportunity search evidence (> 80 score) overrides calendar
    const highOpportunity = opportunities.find(
      (o) =>
        o.opportunityScore.totalScore >= 80 &&
        o.cannibalization.status !== "HIGH_RISK_CONFLICT"
    );

    let chosen = highOpportunity;
    let selectionReason = "";

    if (chosen) {
      selectionReason = `Selected due to high content opportunity score (${chosen.opportunityScore.totalScore}/100) and strong Search Console impressions evidence.`;
    } else {
      // Priority 2: Select highest scoring opportunity in today's scheduled cluster
      const clusterOpportunity = opportunities.find(
        (o) =>
          o.cluster === scheduledCluster &&
          o.cannibalization.status !== "HIGH_RISK_CONFLICT"
      );

      if (clusterOpportunity) {
        chosen = clusterOpportunity;
        selectionReason = `Selected based on daily cluster diversity schedule (${scheduledCluster}) with opportunity score ${chosen.opportunityScore.totalScore}/100.`;
      } else {
        // Fallback to top safe opportunity
        chosen = opportunities.find(
          (o) => o.cannibalization.status !== "HIGH_RISK_CONFLICT"
        ) || opportunities[0];
        selectionReason = `Selected as the highest safe content opportunity (Score: ${chosen.opportunityScore.totalScore}/100).`;
      }
    }

    const contentBrief = ContentBriefGenerator.generateBrief({
      topic: chosen.topic,
      primaryKeyword: chosen.primaryKeyword,
      secondaryQueries: chosen.secondaryKeywords,
      searchIntent: chosen.searchIntent,
      cluster: chosen.cluster,
      targetAudience: chosen.targetAudience,
      opportunityScore: chosen.opportunityScore.totalScore,
    });

    return {
      selectedOpportunity: chosen,
      contentBrief,
      selectionReason,
    };
  },
};
