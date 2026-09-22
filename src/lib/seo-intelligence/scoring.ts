import { OpportunityScoreBreakdown, SearchIntent, ContentCluster } from "./types";

interface ScoringInput {
  gscImpressions?: number;
  gscClicks?: number;
  gscPosition?: number;
  searchIntent: SearchIntent;
  cluster: ContentCluster;
  hasLocalIntent: boolean;
  isExistingClusterGap: boolean;
  hasDirectServiceMatch: boolean;
}

export const OpportunityScoringEngine = {
  calculateScore(input: ScoringInput): OpportunityScoreBreakdown {
    // 1. GSC Evidence (25 points max)
    let gscEvidence = 10; // baseline if no data
    if (input.gscImpressions !== undefined) {
      if (input.gscImpressions > 5000) gscEvidence = 25;
      else if (input.gscImpressions > 2000) gscEvidence = 20;
      else if (input.gscImpressions > 500) gscEvidence = 15;
      else gscEvidence = 10;
    }

    // 2. Business Relevance (20 points max)
    // Direct match to WebVibez services (Coaching, Web, Mobile, Custom Software) gets top score
    let businessRelevance = 12;
    if (input.hasDirectServiceMatch) {
      businessRelevance = 20;
    } else if (
      input.cluster === "Education Technology" ||
      input.cluster === "Custom Software" ||
      input.cluster === "Mobile App Development" ||
      input.cluster === "Website Development"
    ) {
      businessRelevance = 18;
    }

    // 3. Search Intent Strength (15 points max)
    let searchIntentStrength = 10;
    if (
      input.searchIntent === "Commercial Investigation" ||
      input.searchIntent === "Problem Solving" ||
      input.searchIntent === "How-To"
    ) {
      searchIntentStrength = 15;
    } else if (input.searchIntent === "Informational" || input.searchIntent === "Comparison") {
      searchIntentStrength = 13;
    }

    // 4. Content Gap (15 points max)
    let contentGap = 8;
    if (input.isExistingClusterGap) {
      contentGap = 15;
    }

    // 5. Ranking Opportunity (10 points max)
    let rankingOpportunity = 7;
    if (input.gscPosition !== undefined) {
      if (input.gscPosition >= 4 && input.gscPosition <= 20) {
        rankingOpportunity = 10; // Striking distance
      } else if (input.gscPosition <= 3) {
        rankingOpportunity = 6; // Already ranking top 3
      } else {
        rankingOpportunity = 5;
      }
    }

    // 6. Local Relevance (5 points max)
    const localRelevance = input.hasLocalIntent ? 5 : 2;

    // 7. Freshness & Industry Trend (5 points max)
    const freshnessTrend = 4;

    // 8. Internal Linking Value (5 points max)
    const internalLinkingValue = input.hasDirectServiceMatch ? 5 : 4;

    const totalScore = Math.min(
      100,
      Math.round(
        gscEvidence +
          businessRelevance +
          searchIntentStrength +
          contentGap +
          rankingOpportunity +
          localRelevance +
          freshnessTrend +
          internalLinkingValue
      )
    );

    return {
      gscEvidence,
      businessRelevance,
      searchIntentStrength,
      contentGap,
      rankingOpportunity,
      localRelevance,
      freshnessTrend,
      internalLinkingValue,
      totalScore,
    };
  },
};
