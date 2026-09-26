import { Article } from "../blog/types";
import { QualityGateResult } from "./types";

export const QualityGateEngine = {
  validateArticle(article: Article): QualityGateResult {
    const checks: QualityGateResult["checks"] = [];

    // ── 1. CONTENT QUALITY CHECKS ──

    // 1. Content length (> 700 words safety threshold, target 800-1500)
    const wordCount = article.content
      ? article.content.replace(/[#*`_\[\]()]/g, " ").trim().split(/\s+/).length
      : 0;
    const hasMinLength = wordCount >= 700;
    checks.push({
      rule: "Article Depth & Word Count",
      passed: hasMinLength,
      severity: "CRITICAL",
      message: hasMinLength
        ? `Article has solid depth (${wordCount} words).`
        : `Article is too thin (${wordCount} words). Minimum 700 words required for SEO depth.`,
    });

    // 2. Placeholder text check
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

    // 3. Clickbait & False Guarantees Check
    const clickbaitRegex = /\b(guaranteed #1|100% guaranteed ranking|google will rank this|cheapest in the world|get rich|guaranteed)\b/i;
    const hasClickbait = clickbaitRegex.test(article.title) || clickbaitRegex.test(article.description || "");
    checks.push({
      rule: "Non-Clickbait Factual Claims",
      passed: !hasClickbait,
      severity: "CRITICAL",
      message: !hasClickbait
        ? "Title and description are objective, factual, and free of false guarantees."
        : "Content contains unsubstantiated clickbait or false ranking guarantees.",
    });

    // ── 2. SEO QUALITY CHECKS ──

    // 4. Title validation
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

    // 5. Slug format & Clean URL
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const hasValidSlug = Boolean(article.slug && slugRegex.test(article.slug));
    checks.push({
      rule: "Clean URL Slug",
      passed: hasValidSlug,
      severity: "CRITICAL",
      message: hasValidSlug
        ? "Slug is lowercase, hyphen-separated, and SEO-friendly."
        : "Slug contains invalid characters or uppercase letters.",
    });

    // 6. Meta Description Quality
    const descLength = article.description ? article.description.length : 0;
    const hasValidDesc = descLength >= 100 && descLength <= 200;
    checks.push({
      rule: "Meta Description Optimization",
      passed: hasValidDesc,
      severity: "WARNING",
      message: hasValidDesc
        ? `Meta description length is optimal (${descLength} chars).`
        : `Meta description should be between 100 and 200 characters (current: ${descLength}).`,
    });

    // 7. Headings Hierarchy (At least 2 H2 sections)
    const h2Count = (article.content.match(/^##\s+.+/gm) || []).length;
    const hasGoodHeadings = h2Count >= 2;
    checks.push({
      rule: "Structured Headings Hierarchy (H2/H3)",
      passed: hasGoodHeadings,
      severity: "WARNING",
      message: hasGoodHeadings
        ? `Article contains well-structured headings (${h2Count} H2 sections).`
        : "Article lacks sufficient H2 structured headings.",
    });

    // 8. Primary Keyword Integration
    const primaryKw = article.primaryKeyword ? article.primaryKeyword.toLowerCase() : "";
    const kwInTitleOrContent = primaryKw
      ? article.title.toLowerCase().includes(primaryKw) || article.content.toLowerCase().includes(primaryKw)
      : true;
    checks.push({
      rule: "Primary Keyword Strategic Placement",
      passed: kwInTitleOrContent,
      severity: "WARNING",
      message: kwInTitleOrContent
        ? "Primary keyword naturally positioned in article structure."
        : "Primary keyword missing from title and content.",
    });

    // ── 3. AEO / ANSWER ENGINE CHECKS ──

    // 9. Direct Answer / AEO Definition
    const hasDirectAnswer = Boolean(
      article.aeoDirectAnswer && article.aeoDirectAnswer.length >= 30
    );
    checks.push({
      rule: "AEO Direct Answer Definition",
      passed: hasDirectAnswer,
      severity: "WARNING",
      message: hasDirectAnswer
        ? "AEO direct answer is present for featured snippets and AI search engines."
        : "AEO direct answer is missing or too short.",
    });

    // ── 4. TECHNICAL SEO & LINKING CHECKS ──

    // 10. Canonical URL integrity
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

    // 11. Internal Linking (in Markdown or Related Services)
    const hasInternalMarkdownLinks = /\(\/(services|blog)\/[a-z0-9-]+\)/i.test(article.content);
    const hasServiceLink = Boolean(
      (article.relatedServices && article.relatedServices.length > 0) || hasInternalMarkdownLinks
    );
    checks.push({
      rule: "Commercial & Internal Link Integration",
      passed: hasServiceLink,
      severity: "WARNING",
      message: hasServiceLink
        ? "Article includes contextual internal links to relevant WebVibez services or blogs."
        : "No contextual internal links detected in article body.",
    });

    // 12. Featured Image & Alt Text
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

    // 13. Author verification
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

    // ── SCORING & CATEGORY BREAKDOWN ──

    const criticalFailures = checks.filter(
      (c) => c.severity === "CRITICAL" && !c.passed
    );
    if (criticalFailures.length > 0) {
      console.log(`Critical failures for ${article.slug}:`, criticalFailures.map((c) => c.rule));
    }
    const criticalFailed = criticalFailures.length > 0;
    const passedChecks = checks.filter((c) => c.passed).length;
    const overallScore = Math.round((passedChecks / checks.length) * 100);

    // Calculate diagnostic category scores
    const contentChecks = [checks[0], checks[1], checks[2]];
    const contentQuality = Math.round(
      (contentChecks.filter((c) => c.passed).length / contentChecks.length) * 100
    );

    const seoChecks = [checks[3], checks[4], checks[5], checks[6], checks[7]];
    const seoQuality = Math.round(
      (seoChecks.filter((c) => c.passed).length / seoChecks.length) * 100
    );

    const aeoChecks = [checks[8]];
    const aeoQuality = aeoChecks[0].passed ? 100 : 50;

    const techChecks = [checks[9], checks[10], checks[11], checks[12]];
    const technicalSeo = Math.round(
      (techChecks.filter((c) => c.passed).length / techChecks.length) * 100
    );

    return {
      passed: !criticalFailed,
      score: overallScore,
      checks,
      categoryScores: {
        contentQuality,
        seoQuality,
        aeoQuality,
        technicalSeo,
        overall: overallScore,
      },
    };
  },
};
