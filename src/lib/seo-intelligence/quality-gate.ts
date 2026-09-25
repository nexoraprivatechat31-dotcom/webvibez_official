import { Article } from "../blog/types";
import { QualityGateResult } from "./types";

export const QualityGateEngine = {
  validateArticle(article: Article): QualityGateResult {
    const checks: QualityGateResult["checks"] = [];

    // 1. Title validation
    const hasValidTitle = Boolean(
      article.title &&
        article.title.length >= 20 &&
        article.title.length <= 110
    );
    checks.push({
      rule: "Title Length & Structure",
      passed: hasValidTitle,
      severity: "CRITICAL",
      message: hasValidTitle
        ? `Title is optimal (${article.title.length} chars).`
        : `Title must be between 20 and 110 characters.`,
    });

    // 2. Clickbait check
    const clickbaitRegex = /\b(guaranteed|cheapest|#1|fastest in the world|get rich)\b/i;
    const hasClickbait = clickbaitRegex.test(article.title);
    checks.push({
      rule: "Non-Clickbait Factual Title",
      passed: !hasClickbait,
      severity: "CRITICAL",
      message: !hasClickbait
        ? "Title is objective and factual."
        : "Title contains unsubstantiated clickbait claims.",
    });

    // 3. Slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const hasValidSlug = Boolean(article.slug && slugRegex.test(article.slug));
    checks.push({
      rule: "Clean URL Slug",
      passed: hasValidSlug,
      severity: "CRITICAL",
      message: hasValidSlug
        ? "Slug is lowercase and hyphen-separated."
        : "Slug contains invalid characters or uppercase letters.",
    });

    // 4. Content length (> 350 words)
    const wordCount = article.content
      ? article.content.replace(/[#*`_\[\]()]/g, " ").trim().split(/\s+/).length
      : 0;
    const hasMinLength = wordCount >= 350;
    checks.push({
      rule: "Article Depth & Word Count",
      passed: hasMinLength,
      severity: "CRITICAL",
      message: hasMinLength
        ? `Article has solid depth (${wordCount} words).`
        : `Article is too thin (${wordCount} words). Minimum 350 words required.`,
    });

    // 5. Placeholder text check
    const placeholderRegex = /\b(lorem ipsum|todo|tbd|placeholder|sample text|insert here)\b/i;
    const hasPlaceholder =
      placeholderRegex.test(article.content) ||
      placeholderRegex.test(article.title) ||
      placeholderRegex.test(article.excerpt);
    checks.push({
      rule: "No Placeholder or Dummy Text",
      passed: !hasPlaceholder,
      severity: "CRITICAL",
      message: !hasPlaceholder
        ? "No placeholder text detected."
        : "Content contains unfinished placeholder text.",
    });

    // 6. Direct Answer / AEO Definition
    const hasDirectAnswer = Boolean(
      article.aeoDirectAnswer && article.aeoDirectAnswer.length >= 30
    );
    checks.push({
      rule: "AEO Direct Answer Definition",
      passed: hasDirectAnswer,
      severity: "WARNING",
      message: hasDirectAnswer
        ? "AEO direct answer is present for AI search engines."
        : "AEO direct answer is missing or too short.",
    });

    // 7. Internal Service Linking
    const hasServiceLink = Boolean(
      article.relatedServices && article.relatedServices.length > 0
    );
    checks.push({
      rule: "Commercial Service Connection",
      passed: hasServiceLink,
      severity: "WARNING",
      message: hasServiceLink
        ? "Connected to relevant WebVibez service page."
        : "No related service link configured.",
    });

    // 8. Canonical URL integrity
    const expectedCanonical = `https://www.webvibez.com/blog/${article.slug}`;
    const hasValidCanonical = article.canonicalUrl === expectedCanonical;
    checks.push({
      rule: "Canonical URL Integrity",
      passed: hasValidCanonical,
      severity: "CRITICAL",
      message: hasValidCanonical
        ? "Canonical URL strictly points to WebVibez original source."
        : `Canonical URL mismatch. Expected: ${expectedCanonical}`,
    });

    // 9. Featured Image & Alt Text
    const hasImageAndAlt = Boolean(
      article.featuredImage &&
        article.featuredImageAlt &&
        article.featuredImageAlt.length >= 5
    );
    checks.push({
      rule: "Featured Image & Descriptive Alt Text",
      passed: hasImageAndAlt,
      severity: "WARNING",
      message: hasImageAndAlt
        ? "Featured image and accessible alt text present."
        : "Missing featured image or descriptive alt text.",
    });

    // 10. Author verification
    const hasAuthor = Boolean(
      article.author && article.author.name && article.author.role
    );
    checks.push({
      rule: "Verified Author Byline",
      passed: hasAuthor,
      severity: "CRITICAL",
      message: hasAuthor
        ? `Author verified: ${article.author.name}`
        : "Author information is incomplete.",
    });

    const criticalFailed = checks.some(
      (c) => c.severity === "CRITICAL" && !c.passed
    );
    const passedChecks = checks.filter((c) => c.passed).length;
    const score = Math.round((passedChecks / checks.length) * 100);

    return {
      passed: !criticalFailed,
      score,
      checks,
    };
  },
};
