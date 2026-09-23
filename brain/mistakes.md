# Project Brain: Mistakes & Lessons Learned

## Resolved Failures & Prevention Log

### M-001: Unawaited Serverless Promises
- **Problem**: Multi-platform distribution tasks in `/api/blog/cron` were failing intermittently or not completing platform posts.
- **Root Cause**: Serverless runtime freezes or terminates background tasks as soon as `NextResponse.json()` is returned without awaiting promises.
- **Fix**: Wrapped all syndication calls in `await DistributionManager.distributeAll(article)` and `await TelegramNotifier.sendPublishedAlert(...)`.
- **Status**: Resolved.

### M-002: PowerShell Statement Separator Syntax
- **Problem**: Chained commands with `&&` failed with PowerShell parser errors (`The token '&&' is not a valid statement separator`).
- **Root Cause**: Windows PowerShell uses `;` instead of `&&`.
- **Fix**: Use `;` between multiple commands in PowerShell shell environments.
- **Status**: Resolved.

### M-003: System Dark Mode Media Query Overrides
- **Problem**: Users with system dark mode enabled saw accidental dark mode text/background inversion on light mode sections.
- **Root Cause**: Tailwind CSS v4 default dark variant uses `@media (prefers-color-scheme: dark)`.
- **Fix**: Added `@custom-variant dark (&:where(.dark, .dark *));` in `src/app/globals.css` and set `colorScheme: 'light'` globally.
- **Status**: Resolved.

### M-004: 3D Phone Hovering Over Services Conveyor Cards
- **Problem**: 3D Phone was floating at `y = 1.72` cutting right through the horizontal conveyor cards.
- **Root Cause**: Incomplete scroll map transition leaving phone scale at `0.40` in viewport.
- **Fix**: Glided phone smoothly to deep background (`z = -30, scale = 0.0001`) during Services Conveyor and Product Architecture.
- **Status**: Resolved.

### M-005: Mobile Features Detail Card Pushed Below 11 Items
- **Problem**: Mobile users had to scroll down past 11 long buttons before seeing the active feature details.
- **Root Cause**: Desktop vertical column stacked directly above the card on mobile.
- **Fix**: Added a horizontal swipeable pill bar at the top on mobile, followed immediately by the active Spec HUD card with thumb quick-switch controls.
- **Status**: Resolved.

### M-006: SEO Title Tags Exceeding 70 Characters (Bing Webmaster)
- **Problem**: Bing Webmaster flagged ALL 11 public pages with title too long. Browser rendered titles exceeded 70 characters.
- **Root Cause**: Two compounding issues: (1) Root layout template `%s | WebVibez Software Developer` appended 31 characters to every child title. (2) Many child pages redundantly included `| WebVibez` or `| WebVibez Software Developer` in their own title, causing double branding.
- **Fix**: (a) Shortened root template from `%s | WebVibez Software Developer` to `%s | WebVibez` (12 chars suffix). (b) Removed all redundant brand suffixes from 16 child layout files. (c) Shortened long child titles (services, about, features). Verified all 20 rendered page titles ≤ 65 chars.
- **Rule**: Child page `title:` strings must be under **58 characters** to stay under 70 after template suffix. Never add `| WebVibez` to child titles; the root template handles branding.
- **Status**: Resolved.

### M-007: Missing `<h1>` Tag on /services Page (Bing Webmaster)
- **Problem**: Bing flagged `/services` for missing `<h1>` tag. The `SpatialServicesExperience` component used `<h2>` as its primary heading.
- **Fix**: Changed the primary heading in `SpatialServicesExperience.tsx` from `<h2>` to `<h1>`.
- **Rule**: Every public page MUST have exactly one `<h1>` tag containing the page's primary keyword.
- **Status**: Resolved.

### M-008: Blog Content Lives on 3rd Party Platforms Only
- **Context**: Blog content (articles, SEO posts) is published on Dev.to, Hashnode, Tumblr, Notion, Webflow — NOT on the webvibez.com website itself.
- **Rule**: `/blog` and `/blog/*` must remain in `robots.txt` Disallow list. `/blog` must NOT be in `sitemap.xml`.
- **Status**: Confirmed intentional.

### M-009: Pages Unknown to Google — No Sitemap Submitted
- **Problem**: Google Search Console showed "URL is unknown to Google" for all pages. No referring sitemaps detected.
- **Root Cause**: Sitemap existed at `/sitemap.xml` but was never submitted to Google Search Console. Google had no discovery path.
- **Fix**: (a) Created `public/webvibez-indexnow-key.txt` for IndexNow protocol. (b) Created `scripts/ping-search-engines.mjs` to ping IndexNow (Bing/Yandex accepted 202). (c) Sitemap must be manually submitted in Google Search Console.
- **Manual Steps Required**: Go to Google Search Console → Sitemaps → Submit `sitemap.xml`. Then use URL Inspection → Request Indexing for priority pages.
- **Status**: Partially resolved (IndexNow submitted, GSC manual submission pending).
