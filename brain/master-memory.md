# Project Brain: Master Memory
> **WebVibez Software Developer — Flagship Web & Mobile Platform**
> **Compressed Intelligence Layer | Target Size: < 4,000 words**
> **Last Synchronized**: September 23, 2026

---

## 1. Project Summary & Identity
- **Name**: WebVibez Software Developer (`webvibez.com`)
- **Founder & Lead Developer**: Rudram Joshi (Ahmedabad, Gujarat, India)
- **Tagline**: *Build Smart. Scale Fast.*
- **Core Mission**: Engineer sovereign, 100% white-labeled mobile applications (iOS/Android via React Native), custom Next.js web applications, and complete institute management ERP systems for coaching academies and enterprises without third-party commission traps or revenue sharing.

---

## 2. Technical Stack Snapshot
- **Framework**: Next.js 16.3.5 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 with Light Mode Default (`@custom-variant dark`)
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei` (Pinned Unified 3D iPhone 16 Canvas)
- **Database**: Turso LibSQL (`@libsql/client`) for edge-speed, serverless blog & article storage
- **Syndication & Alerts**: Multi-platform distribution engine (Dev.to, Hashnode, Tumblr, Notion, Webflow) + Telegram Bot Notifier (`@Webvibez_softdevbot`)
- **Cron Automation**: Vercel Cron (`0 4 * * *` UTC / 09:30 AM IST) for automated daily SEO article publishing

---

## 3. High-Priority Hard Rules & Gates
1. **⛔ Project Brain Hard Memory Gate**: Any code change made in a session MUST update the corresponding `brain/` files before marking the task as completed.
2. **Light Mode Default**: Website defaults to light mode across all pages. System dark mode media queries are bypassed via `@custom-variant dark (&:where(.dark, .dark *));`.
3. **Clean Background Rule**: No giant faded text behind sections. Background decoration must remain extremely subtle (< 0.05 opacity).
4. **Clean Phone Stage**: 3D Phone must have unobstructed whitespace around it. No floating satellite pill chips.
5. **Serverless Promise Rule**: Route handlers must `await` all background syndication promises (e.g. `DistributionManager.distributeAll()`) before returning responses to prevent freeze.

---

## 4. Section Bay Map (3D Phone Travel Coordinates)
- `0.00 – 0.14`: **Hero & Problem**: Phone starts at RIGHT bay (`x = +3.2`), sweeps quickly to LEFT bay (`x = -3.2`).
- `0.14 – 0.38`: **Product Showcase**: Phone expands to BIG mode in RIGHT bay (`x = +3.2`).
- `0.38 – 0.48`: **11 Core Systems (Features)**: Phone rests in RIGHT bay (`x = +3.2`, `y = -0.28`), arranged side-by-side with Feature Spec HUD Card.
- `0.48 – 0.67`: **Services Conveyor & Architecture**: Phone smoothly glides to deep background (`z = -30`, `scale = 0.0001`), ensuring 0% obstruction of conveyor cards.
- `0.67 – 0.73`: **Transformation Impact & Brand**: Phone swoops back to LEFT bay (`x = -3.2`, `y = -0.28`, `scale = 0.95`).
- `0.73 – 0.86`: **Deployment / How It Works**: Phone glides downwards (`y = -1.95`) and scales nano (`scale = 0.22`).
- `0.86 – 1.00`: **CTA & Footer**: Phone fades out into deep background (`z = -30`).

---

## 5. Key File Indices
- **3D Engine**: `src/components/canvas/PhoneModel.tsx`, `src/components/canvas/UnifiedPhoneCanvas.tsx`
- **Features Section**: `src/components/sections/FeaturesSection.tsx` (Side-by-side on desktop, swipeable pills on mobile)
- **Services Conveyor**: `src/components/sections/ServicesConveyor.tsx` (2 rows on mobile, 4 rows on desktop)
- **Blog Engine**: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/lib/blog/repository.ts`, `src/lib/db/turso.ts`
- **Distribution & Cron**: `src/lib/distribution/manager.ts`, `src/app/api/blog/cron/route.ts`, `src/lib/seo-intelligence/daily-publisher.ts`
- **Founder & Agency**: `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/components/sections/Footer.tsx`, `src/app/layout.tsx`
