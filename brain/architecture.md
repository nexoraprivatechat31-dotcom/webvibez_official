# Project Brain: Architecture

## 1. System Topology & Layers

### Frontend Tier
- **Framework**: Next.js 16.3.5 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) with CSS variables in `src/app/globals.css`
- **Fonts**: Space Grotesk (Headings/Display), Manrope (Body/Sans), JetBrains Mono (Technical/Monospace)
- **3D Graphics Engine**: Three.js + `@react-three/fiber` + `@react-three/drei`
  - `src/components/canvas/UnifiedPhoneCanvas.tsx`: Master fixed 3D viewport.
  - `src/components/canvas/PhoneModel.tsx`: iPhone 16 Pro mesh, titanium chassis, OLED texture renderer, and dynamic scroll physics bay transitions.
  - `src/components/canvas/PhoneScreens.tsx`: Dynamic canvas 2D texture generator for simulated app screens.
- **Scroll State Engine**: `src/lib/scrollPhysicsState.ts`
  - Global publish/subscribe state for scroll progress, mouse tracking, screen interactions, and focus-depth calculations.

### Backend & API Tier (Next.js Serverless Routes)
- **Blog Publishing**: `src/app/api/blog/articles/route.ts` & `[id]/route.ts`
- **Cron Orchestrator**: `src/app/api/blog/cron/route.ts` (Secured via Bearer / Vercel CRON_SECRET / x-admin-key)
- **Distribution Trigger**: `src/app/api/blog/distribute/route.ts` (Direct platform syndication endpoint)
- **Dynamic OG Image Generator**: `src/app/api/og/route.ts` (`@vercel/og` with `@vercel/blob` fallback)

### Database Tier (Turso LibSQL)
- **Client**: `@libsql/client` (HTTP/REST edge client for zero-cold-start edge querying)
- **Schema & Tables**: `src/lib/db/turso.ts`
  - `articles`: Primary articles store (`id`, `slug`, `title`, `description`, `content_markdown`, `content_html`, `category`, `tags`, `table_of_contents`, `language`, `language_group_key`, `published_at`, `status`, etc.)
  - `article_platforms`: Syndication tracking (`platform_name`, `platform_post_id`, `platform_url`, `status`, `error_message`, `last_attempt_at`)
  - `opportunities`: Keyword intelligence and SEO content queue

### Distribution Adapters & Notifications
- `src/lib/distribution/manager.ts`: Core orchestrator calling all platform adapters.
- Adapters in `src/lib/distribution/`:
  - `devto.ts`: Dev.to REST API integration
  - `hashnode.ts`: Hashnode GraphQL API integration
  - `tumblr.ts`: Tumblr v2 API integration
  - `notion.ts`: Notion Database Client
  - `webflow.ts`: Webflow v2 API CMS integration
- Notifications in `src/lib/notifications/`:
  - `telegram.ts`: Real-time instant alerts to `@Webvibez_softdevbot` on article publication and system events.
