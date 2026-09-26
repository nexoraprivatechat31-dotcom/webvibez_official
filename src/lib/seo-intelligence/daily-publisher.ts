import { Article, ArticleCategory } from "../blog/types";
import { BlogRepository } from "../blog/repository";
import { QualityGateEngine } from "./quality-gate";
import { DistributionManager } from "../distribution/manager";
import { DailyPublishLog } from "./types";
import { TelegramNotifier } from "../notifications/telegram";
import { AIGenerator } from "./ai-generator";
import fs from "fs";
import path from "path";

// In-memory set of daily publication keys to guarantee idempotency across warm requests
const globalPubState = global as unknown as {
  __webvibez_daily_keys__?: Set<string>;
  __webvibez_publish_logs__?: DailyPublishLog[];
};

function getLogsFilePath(): string {
  return path.join(process.cwd(), "src", "lib", "blog", ".publish_logs.json");
}

function getDailyKeys(): Set<string> {
  if (!globalPubState.__webvibez_daily_keys__) {
    globalPubState.__webvibez_daily_keys__ = new Set<string>();
    try {
      const filePath = getLogsFilePath();
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed: DailyPublishLog[] = JSON.parse(raw);
        for (const log of parsed) {
          if (log.status === "SUCCESS") {
            globalPubState.__webvibez_daily_keys__.add(log.idempotencyKey);
          }
        }
      }
    } catch {
      // In-memory fallback
    }
  }
  return globalPubState.__webvibez_daily_keys__;
}

function getPublishLogs(): DailyPublishLog[] {
  if (!globalPubState.__webvibez_publish_logs__) {
    globalPubState.__webvibez_publish_logs__ = [];
    try {
      const filePath = getLogsFilePath();
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        globalPubState.__webvibez_publish_logs__ = JSON.parse(raw);
      }
    } catch {
      // In-memory fallback
    }
  }
  return globalPubState.__webvibez_publish_logs__ || [];
}

function saveLog(log: DailyPublishLog): void {
  const logs = getPublishLogs();
  logs.unshift(log);
  if (logs.length > 100) logs.pop();

  if (log.status === "SUCCESS") {
    getDailyKeys().add(log.idempotencyKey);
  }

  try {
    const filePath = getLogsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), "utf-8");
  } catch {
    // In-memory preserve
  }
}

export function getCurrentDateIST(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date()); // Returns YYYY-MM-DD
}

export const DailyPublishingEngine = {
  /**
   * Generates a fresh high-quality bilingual article pair (EN + HI) using Gemini AI.
   * Controlled by a strict 3-attempt fallback loop:
   * Topic -> Generation -> Quality Gate Validation -> Turso DB Storage.
   */
  async generateDailyArticles(): Promise<boolean> {
    const MAX_ATTEMPTS = 3;
    let attempt = 0;
    const now = new Date();
    const futureDate = now.toISOString();
    const allArticles = await BlogRepository.getAllArticles();
    const history = allArticles.map((a) => a.title);

    while (attempt < MAX_ATTEMPTS) {
      attempt++;
      try {
        console.log(`[AI Fallback Pipeline] Attempt ${attempt}/${MAX_ATTEMPTS} starting...`);

        // 1. Generate unique topic avoiding past history
        const topicJsonStr = await AIGenerator.generateArticleTopic(history);
        console.log(`[AI Fallback Pipeline] Attempt ${attempt} Topic retrieved.`);

        // 2. Generate in-depth English article + natural Hindi translation with contextual internal links
        const recentArticlesForLinking = allArticles.slice(0, 5).map((a) => ({
          title: a.title,
          slug: a.slug,
        }));
        const { en, hi } = await AIGenerator.generateArticle(topicJsonStr, recentArticlesForLinking);

        const groupKey = `gen-${Date.now()}`;
        const defaultImage =
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop&q=80";

        // Clean & sanitize slugs: lowercase alphanumeric & hyphens only
        const cleanSlugEn = (en.slug || `article-${groupKey}`)
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .replace(/--+/g, "-");

        const cleanSlugHi = `${cleanSlugEn}-hindi`;

        const validCategory: ArticleCategory =
          (en.category as ArticleCategory) || "Custom Software";

        const authorInfo = {
          name: "Rudram Joshi",
          role: "Founder & Lead Architect",
          bio: "Building high-performance digital systems and custom software architectures.",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          url: "https://www.webvibez.com/about",
        };

        const enArticle: Article = {
          id: `art-en-${groupKey}`,
          slug: cleanSlugEn,
          title: en.title || "Modern Software Development Architecture Guide",
          description:
            en.description ||
            "A comprehensive architectural and engineering guide on modern software solutions by WebVibez.",
          excerpt:
            en.excerpt ||
            en.description ||
            "Explore technical tradeoffs, implementation architecture, and business ROI in our comprehensive guide.",
          aeoDirectAnswer:
            en.aeoDirectAnswer ||
            "Custom software architecture provides end-to-end proprietary control, eliminating recurring SaaS licensing costs and streamlining business workflows.",
          readingTime: en.readingTime || "8 min read",
          category: validCategory,
          primaryKeyword: en.primaryKeyword,
          secondaryKeywords: en.secondaryKeywords,
          searchIntent: en.searchIntent,
          targetAudience: en.targetAudience,
          faq: en.faq || [],
          tags:
            en.tags && en.tags.length >= 3
              ? en.tags
              : ["software development", "custom software", "business automation", "technology"],
          content: en.content || "",
          featuredImage: en.featuredImage || defaultImage,
          featuredImageAlt: en.featuredImageAlt || en.title || "WebVibez Tech Architecture",
          author: authorInfo,
          publicationDate: futureDate,
          modifiedDate: futureDate,
          status: "READY",
          featured: false,
          canonicalUrl: `https://www.webvibez.com/blog/${cleanSlugEn}`,
          language: "en",
          languageGroupKey: groupKey,
          createdAt: now.toISOString(),
          updatedAt: now.toISOString(),
        };

        const hiArticle: Article = {
          ...enArticle,
          id: `art-hi-${groupKey}`,
          slug: cleanSlugHi,
          title: hi.title || enArticle.title,
          description: hi.description || enArticle.description,
          excerpt: hi.excerpt || enArticle.excerpt,
          aeoDirectAnswer: hi.aeoDirectAnswer || enArticle.aeoDirectAnswer,
          readingTime: hi.readingTime || enArticle.readingTime,
          faq: hi.faq || enArticle.faq || [],
          tags:
            hi.tags && hi.tags.length >= 3
              ? hi.tags
              : ["software hindi", "tech guide", "automation hindi", "webvibez"],
          content: hi.content || enArticle.content,
          canonicalUrl: `https://www.webvibez.com/blog/${cleanSlugHi}`,
          language: "hi",
          status: "READY",
        };

        // 3. Strict Quality Gate Validation
        const enQG = QualityGateEngine.validateArticle(enArticle);
        const hiQG = QualityGateEngine.validateArticle(hiArticle);

        enArticle.seoScores = enQG.categoryScores;
        hiArticle.seoScores = hiQG.categoryScores;

        if (enQG.passed && hiQG.passed) {
          await BlogRepository.createArticle(enArticle);
          await BlogRepository.createArticle(hiArticle);
          console.log(
            `[AI Fallback Pipeline] Success on attempt ${attempt}. Articles created with QG scores: EN=${enQG.score}, HI=${hiQG.score}.`
          );
          return true;
        } else {
          console.warn(
            `[AI Fallback Pipeline] Attempt ${attempt} failed Quality Gate. EN passed=${enQG.passed} (${enQG.score}/100), HI passed=${hiQG.passed} (${hiQG.score}/100). Retrying...`
          );
        }
      } catch (err: unknown) {
        console.error(
          `[AI Fallback Pipeline] Attempt ${attempt} caught error:`,
          err instanceof Error ? err.message : String(err)
        );
        if (attempt < MAX_ATTEMPTS) {
          console.log(`[AI Fallback Pipeline] Waiting 10s before retry attempt ${attempt + 1}...`);
          await new Promise((r) => setTimeout(r, 10000));
        }
      }
    }

    console.error(`[AI Fallback Pipeline] All ${MAX_ATTEMPTS} attempts failed.`);
    return false;
  },

  /**
   * Executes the daily publication run:
   * 1. Checks idempotency (Asia/Kolkata date key).
   * 2. Retrieves ready articles or triggers AI fallback generation.
   * 3. Publishes to Turso DB (Website live for EN, DB persistence for HI).
   * 4. Multi-platform distribution with platform isolation.
   * 5. Sends Telegram notification.
   */
  async executeDailyPublication(force = false): Promise<DailyPublishLog> {
    const startTime = Date.now();
    const dateIST = getCurrentDateIST();
    const idempotencyKey = `blog-publish-${dateIST}-Asia-Kolkata`;
    const dailyKeys = getDailyKeys();

    // 1. Idempotency Check (bypassed if force=true)
    if (!force && dailyKeys.has(idempotencyKey)) {
      const log: DailyPublishLog = {
        id: `pub-${Date.now()}`,
        executionDateIST: dateIST,
        executionTimeUTC: new Date().toISOString(),
        idempotencyKey,
        status: "ALREADY_PUBLISHED",
        durationMs: Date.now() - startTime,
        message: `Daily articles have already been published for Asia/Kolkata date ${dateIST}. Skipping duplicate execution.`,
        distributionQueued: false,
      };
      saveLog(log);
      return log;
    }

    // 2. Query eligible articles (SCHEDULED or READY)
    let allArticles = await BlogRepository.getAllArticles();
    let eligibleArticles = allArticles.filter(
      (a) => a.status === "READY" || a.status === "SCHEDULED"
    );

    // If no articles in queue, trigger AI generation pipeline (3 attempts)
    let generationErrorMessage = "";
    if (eligibleArticles.length === 0) {
      try {
        const generationSuccess = await this.generateDailyArticles();
        if (generationSuccess) {
          allArticles = await BlogRepository.getAllArticles();
          eligibleArticles = allArticles.filter(
            (a) => a.status === "READY" || a.status === "SCHEDULED"
          );
        } else {
          generationErrorMessage = "Gemini AI generation failed after 3 fallback attempts.";
        }
      } catch (genErr: unknown) {
        generationErrorMessage = `Gemini generation error: ${genErr instanceof Error ? genErr.message : String(genErr)}`;
      }
    }

    if (eligibleArticles.length === 0) {
      const log: DailyPublishLog = {
        id: `pub-${Date.now()}`,
        executionDateIST: dateIST,
        executionTimeUTC: new Date().toISOString(),
        idempotencyKey,
        status: "NO_READY_ARTICLE",
        durationMs: Date.now() - startTime,
        message:
          generationErrorMessage ||
          "No approved articles with status READY or SCHEDULED were found in the queue.",
        distributionQueued: false,
      };
      saveLog(log);

      TelegramNotifier.sendWarningAlert(
        `No approved articles found for publication on ${dateIST}. ${generationErrorMessage}`
      ).catch(() => {});

      return log;
    }

    // 3. Select daily batch: 1 English + 1 Hindi pair
    const enArticles = eligibleArticles.filter((a) => (a.language || "en") === "en").slice(0, 1);
    const hiArticles = eligibleArticles.filter((a) => a.language === "hi").slice(0, 1);
    const batchToPublish = [...enArticles, ...hiArticles];

    if (batchToPublish.length === 0) {
      batchToPublish.push(...eligibleArticles.slice(0, 2));
    }

    const publishedTitles: string[] = [];
    const nowIso = new Date().toISOString();
    const distributionSummary: Record<string, string> = {};

    for (const candidate of batchToPublish) {
      // Quality Gate validation
      const qualityResult = QualityGateEngine.validateArticle(candidate);
      if (!qualityResult.passed) {
        console.warn(
          `Article "${candidate.title}" failed quality gate (${qualityResult.score}/100), skipping publication.`
        );
        continue;
      }

      // Step A: Mark as PUBLISHED in Database
      // English is now live on WebVibez; Hindi is saved with language='hi' for 3rd-party distribution
      const updatedArticle = await BlogRepository.updateArticle(candidate.id, {
        status: "PUBLISHED",
        publicationDate: nowIso,
        modifiedDate: nowIso,
        seoScores: qualityResult.categoryScores,
      });

      if (updatedArticle) {
        publishedTitles.push(updatedArticle.title);

        // Step B: Third-party distribution (isolated from website publish status)
        try {
          const distResults = await DistributionManager.distributeAll(candidate.id);
          const platformStatuses = Object.entries(distResults)
            .map(([plat, res]) => `${plat}:${res.success ? "OK" : "FAIL"}`)
            .join(", ");
          distributionSummary[candidate.slug] = platformStatuses;

          await TelegramNotifier.sendPublishedAlert(updatedArticle, distResults).catch(() => {});
        } catch (distErr: unknown) {
          console.error("Distribution error for article:", candidate.slug, distErr);
          distributionSummary[candidate.slug] = `DistError: ${distErr instanceof Error ? distErr.message : String(distErr)}`;
          await TelegramNotifier.sendPublishedAlert(updatedArticle).catch(() => {});
        }
      }
    }

    const enPublished = batchToPublish.find((a) => (a.language || "en") === "en");
    const log: DailyPublishLog = {
      id: `pub-${Date.now()}`,
      executionDateIST: dateIST,
      executionTimeUTC: nowIso,
      idempotencyKey,
      status: publishedTitles.length > 0 ? "SUCCESS" : "NO_READY_ARTICLE",
      articleId: enPublished?.id,
      articleSlug: enPublished?.slug,
      articleTitle: publishedTitles.join(" | "),
      durationMs: Date.now() - startTime,
      message: `Published ${publishedTitles.length} articles (${enArticles.length} EN + ${hiArticles.length} HI). Distribution: ${JSON.stringify(distributionSummary)}`,
      distributionQueued: true,
    };

    saveLog(log);
    return log;
  },

  getRecentLogs(): DailyPublishLog[] {
    return getPublishLogs();
  },
};
