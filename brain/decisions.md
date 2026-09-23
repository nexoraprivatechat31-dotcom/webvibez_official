# Project Brain: Engineering Decisions

## Architectural Decisions Log

### D01: Turso LibSQL for Edge Article Storage
- **Decision**: Use Turso LibSQL (`@libsql/client`) with HTTP/REST transport over traditional PostgreSQL/Supabase.
- **Reason**: Extreme low latency for edge readers, zero server maintenance, lightweight connection pooling for Next.js serverless functions, and cost-efficiency.
- **Date**: September 2026

### D02: Unified Single 3D Canvas
- **Decision**: Maintain a single global fixed Three.js Canvas (`UnifiedPhoneCanvas.tsx`) controlling the phone mesh across all sections instead of multiple per-section canvases.
- **Reason**: Eliminates WebGL context destruction/re-creation overhead, guarantees 60 FPS transitions, and preserves continuous model state.
- **Date**: September 2026

### D03: Light Mode as Global Primary Theme
- **Decision**: Enforce clean, high-contrast Light Mode as the primary brand theme with explicit `@custom-variant dark` isolation.
- **Reason**: Brand aesthetic alignment with educational and institutional white-label professionalism, avoiding muddy auto-dark theme renderings.
- **Date**: September 2026

### D04: Vercel Cron over GitHub Workflows for Auto-Publishing
- **Decision**: Schedule daily 09:30 AM IST publishing via `vercel.json` (`"schedule": "0 4 * * *"`) and Next.js route `/api/blog/cron`.
- **Reason**: GitHub personal access tokens lack `workflow` permissions; Vercel native cron is reliable, zero-maintenance, and triggers serverless execution directly.
- **Date**: September 2026

### D05: Founder & Lead Developer Spotlight Branding
- **Decision**: Prominently feature Rudram Joshi as Founder & Lead Developer across Contact desk, About page leadership section, Footer bio, and Schema.org Organization/Person graphs.
- **Reason**: Establishes high trust with institutional decision-makers, direct engineering transparency, and clear accountability.
- **Date**: September 2026
