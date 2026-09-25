/**
 * Ping Google & Bing to re-crawl the sitemap and all URLs.
 * 
 * Usage: node scripts/ping-search-engines.mjs
 * 
 * This sends HTTP requests to:
 * 1. Google Sitemap Ping: https://www.google.com/ping?sitemap=...
 * 2. Bing Sitemap Ping (via IndexNow): https://www.bing.com/indexnow
 * 3. IndexNow (covers Bing, Yandex, Seznam, Naver)
 */

const SITE_URL = "https://www.webvibez.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// All public URLs from sitemap
const ALL_URLS = [
  "",
  "/services",
  "/services/website-development",
  "/services/mobile-app-development",
  "/services/custom-software-development",
  "/services/coaching-class-management-app",
  "/product",
  "/features",
  "/portfolio",
  "/how-it-works",
  "/pricing",
  "/about",
  "/contact",
  "/security",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/agreements",
  "/disclaimer",
];

async function pingGoogle() {
  console.log("\n🔍 PINGING GOOGLE...");
  const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url);
    console.log(`   Sitemap ping: ${res.status} ${res.statusText}`);
    return res.ok;
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`);
    return false;
  }
}

async function pingBingSitemap() {
  console.log("\n🔍 PINGING BING SITEMAP...");
  const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url);
    console.log(`   Sitemap ping: ${res.status} ${res.statusText}`);
    return res.ok;
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`);
    return false;
  }
}

async function pingIndexNow() {
  console.log("\n🚀 PINGING INDEXNOW (Bing, Yandex, Seznam, Naver)...");
  console.log(`   Submitting ${ALL_URLS.length} URLs...`);
  
  // IndexNow requires a key file at your site root
  // Using a simple key - you'll need to create the key file
  const KEY = "webvibez-indexnow-key";
  
  const payload = {
    host: "webvibez.com",
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: ALL_URLS.map(path => `${SITE_URL}${path}`),
  };

  // Submit to multiple IndexNow endpoints
  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const name = new URL(endpoint).hostname;
      console.log(`   ${name}: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.log(`   ❌ ${endpoint}: ${err.message}`);
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  WebVibez Search Engine Ping Tool");
  console.log("  Notifying Google, Bing & IndexNow to crawl all pages");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`\n📍 Site: ${SITE_URL}`);
  console.log(`📄 Sitemap: ${SITEMAP_URL}`);
  console.log(`📦 Total URLs: ${ALL_URLS.length}`);
  
  await pingGoogle();
  await pingBingSitemap();
  await pingIndexNow();

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  ✅ ALL PINGS SENT!");
  console.log("═══════════════════════════════════════════════════════");
  console.log("\n📋 MANUAL STEPS REQUIRED FOR FULL INDEXING:");
  console.log("──────────────────────────────────────────────────────");
  console.log("1. Google Search Console (https://search.google.com/search-console):");
  console.log("   → Sitemaps → Add 'sitemap.xml' → Submit");
  console.log("   → This tells Google to discover ALL 19 URLs at once");
  console.log("");
  console.log("2. Bing Webmaster Tools (https://www.bing.com/webmasters):");
  console.log("   → Sitemaps → Submit sitemap → 'https://www.webvibez.com/sitemap.xml'");
  console.log("");
  console.log("3. For IndexNow to work, create this key file:");
  console.log(`   → Create file: public/webvibez-indexnow-key.txt`);
  console.log(`   → Contents: webvibez-indexnow-key`);
  console.log("");
  console.log("4. After submitting sitemap in GSC, you can also use");
  console.log("   URL Inspection → 'Request Indexing' for priority pages");
  console.log("   (limited to ~10-20 requests per day)");
  console.log("──────────────────────────────────────────────────────\n");
}

main().catch(console.error);
