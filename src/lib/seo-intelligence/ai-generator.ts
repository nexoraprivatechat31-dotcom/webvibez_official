import { Article, ArticleCategory } from "../blog/types";
import { BlogRepository } from "../blog/repository";

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
    finishReason?: string;
  }[];
}

function cleanAndParseJson<T>(raw: string): T {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const slice = trimmed.slice(firstBrace, lastBrace + 1);
      return JSON.parse(slice);
    }
    throw new Error(`Unable to parse JSON response (length ${raw.length})`);
  }
}

const GEMINI_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
];

export interface TopicStrategy {
  topic: string;
  category: ArticleCategory;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticTerms: string[];
  searchIntent: "Informational" | "Commercial Investigation";
  targetAudience: string;
  suggestedSlug: string;
}

export const AIGenerator = {
  /**
   * 1. SEO-FIRST TOPIC & KEYWORD STRATEGY RESEARCH
   * Evaluates historical published articles, content clusters, and search intent
   * to produce a high-opportunity, non-competing topic with target keywords.
   */
  async generateArticleTopic(history: string[]): Promise<string> {
    const prompt = `You are a Principal SEO Architect and Technical Content Strategist for WebVibez, a premium software engineering firm specializing in:
- Custom Software Development (ERP, bespoke business systems, CRM, workflow automation)
- Web Development (Next.js, React, Node.js, TypeScript, high-performance web applications)
- Mobile App Development (React Native, iOS, Android, cross-platform architecture)
- Education Technology & Coaching Class Management Software (WhatsApp billing, dynamic UPI, attendance, student portals)

TASK:
Research and generate a high-demand, SEO-focused blog topic that has NOT been covered recently.
Analyze the search intent (Informational vs Commercial Investigation) and define the keyword strategy.

RECENT TOPICS TO AVOID (Strict Cannibalization Prevention):
${history.slice(0, 35).join("\n")}

CONTENT CLUSTERS TO PRIORITIZE:
1. Software Development / Custom Software / Business Automation / SaaS Architecture
2. Web Development / Next.js / React / TypeScript / Modern Web Apps
3. Mobile App Development / React Native vs Native / Cross-Platform Engineering
4. Education Technology / Coaching Class Automation / WhatsApp Invoicing / UPI Billing

Respond ONLY with a RAW JSON object matching this schema:
{
  "topic": "Compelling, specific technical topic title matching search intent",
  "category": "One of: Software Development, Website Development, Mobile App Development, Custom Software, SaaS & Business Software, Education Technology, Business Automation",
  "primaryKeyword": "High-value primary target keyword (e.g. custom erp software development)",
  "secondaryKeywords": ["secondary keyword 1", "secondary keyword 2", "secondary keyword 3", "secondary keyword 4"],
  "semanticTerms": ["semantic term 1", "semantic term 2", "semantic term 3", "semantic term 4", "semantic term 5"],
  "searchIntent": "Informational" or "Commercial Investigation",
  "targetAudience": "e.g. Business founders, CTOs, coaching institute directors, enterprise leaders",
  "suggestedSlug": "short-clean-lowercase-hyphen-slug-no-dates"
}`;

    const res = await this.callGemini(prompt);
    return res;
  },

  /**
   * 2. SEO & AEO OPTIMIZED ARTICLE GENERATION
   * Writes an in-depth 800-1500 word technical article with natural keyword distribution,
   * structured headings, comparison tables, AEO direct answer, internal links, and WebVibez CTA.
   */
  async generateArticle(
    topicStr: string,
    recentArticles: Array<{ title: string; slug: string }> = []
  ): Promise<{ en: Partial<Article>; hi: Partial<Article> }> {
    let strategy: TopicStrategy;
    try {
      strategy = cleanAndParseJson<TopicStrategy>(topicStr);
    } catch {
      strategy = {
        topic: "Automating Modern Business Operations with Custom Software",
        category: "Custom Software",
        primaryKeyword: "custom business software",
        secondaryKeywords: ["business workflow automation", "custom erp solutions", "bespoke software development"],
        semanticTerms: ["operational efficiency", "cloud architecture", "system integration", "scalability"],
        searchIntent: "Commercial Investigation",
        targetAudience: "Business founders and operational leaders",
        suggestedSlug: "automating-modern-business-operations-custom-software",
      };
    }

// Prepare authentic internal linking targets
    const internalLinksList = [
      "- Custom Software: [Custom Software Development](/services/custom-software-development)",
      "- Mobile Apps: [Mobile App Development](/services/mobile-app-development)",
      "- Web Apps: [Website Development Services](/services/website-development)",
      "- Coaching Management: [Coaching Class Management App](/services/coaching-class-management-app)",
      ...recentArticles.slice(0, 4).map((a) => `- Related Guide: [${a.title}](/blog/${a.slug})`),
    ].join("\n");

    const prompt = `You are a Senior Technical Architect and Authoritative Content Writer for WebVibez.
Write an exceptionally high-quality, comprehensive, SEO/AEO-optimized blog post for our engineering blog.

TOPIC: "${strategy.topic}"
PRIMARY KEYWORD: "${strategy.primaryKeyword}"
SECONDARY KEYWORDS: ${strategy.secondaryKeywords?.join(", ") || "software architecture, tech guides"}
SEMANTIC TERMS: ${strategy.semanticTerms?.join(", ") || "engineering, scalability, automation"}
CATEGORY: "${strategy.category}"
SEARCH INTENT: "${strategy.searchIntent}"
TARGET AUDIENCE: "${strategy.targetAudience}"

AUTHENTIC INTERNAL LINK TARGETS TO NATURALLY INTEGRATE (Pick 2 to 4 naturally into article content):
${internalLinksList}

CRITICAL SEO & AEO REQUIREMENTS:
1. WORD COUNT: Minimum 800 words, target 900 to 1400 words of authentic, high-density engineering and architectural value.
2. KEYWORD INTEGRATION: Naturally place the primary keyword in the Title, Introduction, at least one H2 heading, Meta description, and URL slug. NO keyword stuffing.
3. STRUCTURE:
   - Engaging introduction addressing industry bottlenecks and engineering tradeoffs.
   - Multiple clear H2 sections (## Section Title) and informative H3 subsections (### Detail).
   - At least one structured comparison matrix or markdown table comparing architectural tradeoffs, cost, or ROI.
   - Practical real-world architectural workflows or code block examples where relevant.
   - Concluding section with a natural, persuasive Call-to-Action (CTA) connecting to WebVibez services.
4. AEO (Answer Engine Optimization): Provide a concise, authoritative definition/answer (40-60 words) defining the solution directly for Google featured snippets and AI search engines (ChatGPT/Perplexity/Gemini).
5. FAQ: Include 3 to 4 genuinely helpful technical FAQs that directly answer questions searchers ask about this topic.
6. INTERNAL LINKING: Weave 2 to 4 of the provided internal links into the markdown body using descriptive, contextual anchor texts (NEVER use 'click here').
7. INTEGRITY & SAFETY: NO fake statistics, NO placeholder text ('lorem ipsum', 'insert here'), NO unsubstantiated claims or fake guarantees (e.g. 'guaranteed #1', 'best ever').
8. SLUG: Short, lowercase alphanumeric and hyphens only, no dates, stable.

Respond ONLY with a RAW JSON object matching this exact schema:
{
  "title": "SEO-optimized title between 30 and 90 characters matching search intent",
  "slug": "${strategy.suggestedSlug || 'technical-guide'}",
  "description": "Unique, compelling meta description between 130 and 160 characters containing primary keyword naturally",
  "excerpt": "Short engaging excerpt summarizing the guide for blog cards",
  "aeoDirectAnswer": "Direct, standalone 40-60 word authoritative answer for AI search snippets",
  "readingTime": "8 min read",
  "category": "${strategy.category}",
  "primaryKeyword": "${strategy.primaryKeyword}",
  "secondaryKeywords": ${JSON.stringify(strategy.secondaryKeywords || [])},
  "searchIntent": "${strategy.searchIntent}",
  "targetAudience": "${strategy.targetAudience}",
  "tags": ["software development", "custom software", "tech architecture", "webvibez", "engineering"],
  "featuredImageAlt": "Descriptive accessibility alt text describing the technical architecture of the topic",
  "faq": [
    { "question": "Technical question 1?", "answer": "Clear factual answer 1." },
    { "question": "Technical question 2?", "answer": "Clear factual answer 2." },
    { "question": "Technical question 3?", "answer": "Clear factual answer 3." }
  ],
  "content": "The complete, in-depth markdown article content with ##, ###, tables, internal links, and CTA"
}`;

    const enResultStr = await this.callGemini(prompt);
    let enResult: Partial<Article>;
    try {
      enResult = cleanAndParseJson<Partial<Article>>(enResultStr);
      // Ensure keyword strategy is attached
      enResult.primaryKeyword = enResult.primaryKeyword || strategy.primaryKeyword;
      enResult.secondaryKeywords = enResult.secondaryKeywords || strategy.secondaryKeywords;
      enResult.searchIntent = enResult.searchIntent || strategy.searchIntent;
      enResult.targetAudience = enResult.targetAudience || strategy.targetAudience;
    } catch (e) {
      console.error("Failed to parse EN article JSON. Snippet:", enResultStr?.slice(0, 200));
      throw new Error("Invalid JSON from AI for English article");
    }

    // ── HINDI TRANSLATION FOR MULTI-PLATFORM DISTRIBUTION ──
    const hiPrompt = `You are a professional technical translator and tech journalist.
Translate the following English technical article into natural, professional Hindi for an Indian business and startup audience.
Preserve all markdown formatting (headings ## and ###, tables, lists, bold text, links).
Keep technical acronyms and industry terms (like API, SaaS, Cloud, React, Node.js, App, Database, UPI, WhatsApp) recognizable in English/Hinglish where appropriate, and translate the explanatory narrative into clear, authoritative Hindi.

English Title: ${enResult.title}
English Description: ${enResult.description}
English Excerpt: ${enResult.excerpt}
English AEO Answer: ${enResult.aeoDirectAnswer}

English Markdown Content to Translate:
${enResult.content}

Respond ONLY with a RAW JSON object matching this exact schema:
{
  "title": "Hindi translated title between 30 and 90 chars",
  "slug": "${enResult.slug || 'tech-guide'}-hindi",
  "description": "Hindi meta description between 130 and 160 chars",
  "excerpt": "Hindi translated excerpt",
  "aeoDirectAnswer": "Hindi translated AEO answer",
  "readingTime": "${enResult.readingTime || '8 min read'}",
  "tags": ["hindi tech", "software hindi", "automation india", "webvibez", "tech guide"],
  "content": "The full translated Hindi markdown content"
}`;

    const hiResultStr = await this.callGemini(hiPrompt);
    let hiResult: Partial<Article>;
    try {
      hiResult = cleanAndParseJson<Partial<Article>>(hiResultStr);
      hiResult.primaryKeyword = enResult.primaryKeyword;
      hiResult.secondaryKeywords = enResult.secondaryKeywords;
      hiResult.searchIntent = enResult.searchIntent;
      hiResult.targetAudience = enResult.targetAudience;
    } catch (e) {
      console.error("Failed to parse HI article JSON. Snippet:", hiResultStr?.slice(0, 200));
      throw new Error("Invalid JSON from AI for Hindi article");
    }

    return { en: enResult, hi: hiResult };
  },

  async callGemini(prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }

    let lastError: Error | null = null;
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json",
              maxOutputTokens: 8192,
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            ],
          }),
          signal: AbortSignal.timeout(45000),
        });

        if (!response.ok) {
          throw new Error(`Model ${model} failed: ${response.status} ${response.statusText}`);
        }

        const data: any = await response.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.map((p: any) => p.text || "").join("") || "";
        if (!text) {
          throw new Error(`Empty response from ${model} (finishReason: ${candidate?.finishReason})`);
        }

        return text.trim();
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.warn(`[Gemini Call] ${model} unavailable, waiting 4s before trying next model...`);
        await new Promise((r) => setTimeout(r, 4000));
      }
    }

    throw lastError || new Error("All Gemini models failed to generate content.");
  },
};
