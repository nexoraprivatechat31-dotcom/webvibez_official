import { ContentBrief, ContentCluster, SearchIntent } from "./types";

interface BriefInput {
  topic: string;
  primaryKeyword: string;
  secondaryQueries: string[];
  searchIntent: SearchIntent;
  cluster: ContentCluster;
  targetAudience: string;
  opportunityScore: number;
}

export const ContentBriefGenerator = {
  generateBrief(input: BriefInput): ContentBrief {
    const slug = input.primaryKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 75);

    // Dynamic service routing based on cluster
    let relatedService = {
      title: "Custom Software Engineering Services",
      href: "/services/custom-software-development",
      badge: "Core Architecture",
    };

    if (input.cluster === "Education Technology") {
      relatedService = {
        title: "Coaching Class Software Solution",
        href: "/services/coaching-class-management-app",
        badge: "Flagship Software",
      };
    } else if (input.cluster === "Mobile App Development") {
      relatedService = {
        title: "Mobile App Development Services",
        href: "/services/mobile-app-development",
        badge: "iOS & Android",
      };
    } else if (input.cluster === "Website Development") {
      relatedService = {
        title: "Next.js Web Application Development",
        href: "/services/website-development",
        badge: "Modern Web",
      };
    }

    const recommendedTitles = [
      `${input.topic}: Features, Architecture & Implementation Guide`,
      `How to Choose ${input.topic} for Growing Businesses`,
      `${input.topic} Explained: Benefits, Workflow & Cost Factors`,
      `The Technical Guide to ${input.topic} in 2026`,
    ];

    const recommendedOutline = [
      {
        heading: `1. What is ${input.topic}?`,
        level: 2 as const,
        purpose: "Define the core concept clearly for readers and AI search engines (AEO).",
        keyPoints: [
          "Crystal clear 1-2 sentence definition",
          "Primary business problems this technology solves",
          "Who benefits most (target audience and use-cases)",
        ],
      },
      {
        heading: "2. Key Operational Challenges Without Dedicated Software",
        level: 2 as const,
        purpose: "Explore real-world bottlenecks, spreadsheet errors, and manual workload.",
        keyPoints: [
          "Manual tracking and human error risks",
          "Data leakage and lack of real-time visibility",
          "Scalability limitations as operations expand",
        ],
      },
      {
        heading: "3. Essential Architectural Modules & Core Features",
        level: 2 as const,
        purpose: "Deep technical breakdown of required capabilities.",
        keyPoints: [
          "User authentication & Role-Based Access Control (RBAC)",
          "Automated notification triggers (WhatsApp & Email)",
          "Reporting dashboards, analytics & data export",
        ],
      },
      {
        heading: "4. Build vs Buy & Technology Stack Considerations",
        level: 2 as const,
        purpose: "Compare off-the-shelf software against custom engineered platforms.",
        keyPoints: [
          "Total Cost of Ownership (TCO) and recurring license savings",
          "Customization flexibility and third-party API integration",
          "Intellectual property ownership with WebVibez engineering",
        ],
      },
      {
        heading: "5. Frequently Asked Questions",
        level: 2 as const,
        purpose: "Answer common user queries for Google FAQPage schema.",
        keyPoints: [
          "Implementation timeline questions",
          "Data security and hosting protocols",
          "Maintenance and ongoing update requirements",
        ],
      },
    ];

    const recommendedInternalLinks = [
      {
        title: relatedService.title,
        href: relatedService.href,
        anchorTextSuggestion: `Explore our dedicated ${relatedService.title.toLowerCase()}`,
      },
      {
        title: "WebVibez Portfolio & Client Work",
        href: "/portfolio",
        anchorTextSuggestion: "view our recent engineering portfolio",
      },
      {
        title: "Technical Discovery Consultation",
        href: "/contact",
        anchorTextSuggestion: "schedule an architectural discovery call with WebVibez",
      },
    ];

    const recommendedFaq = [
      {
        question: `How long does it take to implement ${input.topic.toLowerCase()}?`,
        guidance: "Provide a realistic 4 to 12 week timeline breakdown depending on feature scope.",
      },
      {
        question: `Can this system integrate with existing WhatsApp and payment gateways?`,
        guidance: "Explain direct API integration capabilities with Razorpay, Cashfree, and WhatsApp Business API.",
      },
      {
        question: `Who owns the source code and database for custom software?`,
        guidance: "State clearly that WebVibez clients own 100% of their custom source code and IP.",
      },
    ];

    return {
      id: `brief-${Date.now()}`,
      topic: input.topic,
      primaryKeyword: input.primaryKeyword,
      secondaryQueries: input.secondaryQueries,
      searchIntent: input.searchIntent,
      targetAudience: input.targetAudience,
      businessRelevance: `Direct alignment with ${relatedService.title}`,
      contentCluster: input.cluster,
      recommendedTitles,
      recommendedSlug: slug,
      aeoDirectAnswerGuide: `Write a precise, non-hype 1-2 sentence definition answering "What is ${input.topic}?" for AI Overviews and snippet extraction.`,
      recommendedOutline,
      recommendedInternalLinks,
      recommendedFaq,
      evidenceRequirements: [
        "Official documentation or standards",
        "Realistic cost and timeline estimations",
        "Author verified credentials (Rudram Joshi, WebVibez)",
      ],
      opportunityScore: input.opportunityScore,
      confidenceLevel: input.opportunityScore >= 75 ? "HIGH" : "MEDIUM",
      createdAt: new Date().toISOString(),
    };
  },
};
