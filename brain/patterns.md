# Project Brain: Approved Engineering Patterns

## Pattern 1: Light Mode Default & Dark Mode Isolation
- **Rule**: Website defaults to light mode across all pages. System dark mode preferences from OS or browser must NEVER unintentionally style components.
- **Pattern**:
  ```css
  /* src/app/globals.css */
  @custom-variant dark (&:where(.dark, .dark *));
  ```
  And in `src/app/layout.tsx`:
  ```tsx
  <html className="... light" data-theme="light" style={{ colorScheme: "light" }}>
    <meta name="color-scheme" content="light" />
  ```

## Pattern 2: 3D Phone Travel & Bay Map Coordination
- **Rule**: The 3D phone model travels between distinct bays (`x = +3.2` RIGHT, `x = -3.2` LEFT) based on scroll progress `p`.
- **Pattern**:
  - `0.00 – 0.14`: Hero (RIGHT) to Problem (LEFT)
  - `0.14 – 0.38`: Product Showcase (RIGHT)
  - `0.38 – 0.48`: Features Section (RIGHT, `y = -0.28`, Side-by-Side)
  - `0.48 – 0.67`: Services Conveyor & Architecture (HIDDEN: `z = -30, scale = 0.0001`)
  - `0.67 – 0.73`: Transformation Impact (LEFT)
  - `0.73 – 0.86`: Deployment (Downwards nano `scale = 0.22`)
  - `0.86 – 1.00`: CTA / Footer (Fade out `z = -30`)

## Pattern 3: Mobile Responsive Layout Strategy
- **Rule**: On mobile, avoid stacking tall vertical lists above interactive detail cards.
- **Pattern**:
  - Desktop (`lg:`): 3-column side-by-side grid (`[ 11 System List ] [ Active Spec HUD Card ] [ 3D Phone Stage Anchor ]`).
  - Mobile (`< lg`): Horizontal swipeable pill strip at top + Active Spec HUD Card directly below + Quick-Switch Prev/Next buttons.

## Pattern 4: Serverless Async & Distribution Execution
- **Rule**: In Vercel serverless / Next.js route handlers, background asynchronous tasks MUST be fully awaited before sending the HTTP response.
- **Pattern**:
  ```ts
  // DO NOT fire and forget in serverless:
  // DistributionManager.distributeAll(article); // FREEZES!
  
  // ALWAYS AWAIT:
  const distResults = await DistributionManager.distributeAll(article);
  await TelegramNotifier.sendPublishedAlert({ ... });
  return NextResponse.json({ success: true, distribution: distResults });
  ```

## Pattern 5: Clean Phone Stage & Clean Background
- **Rule**: Never place duplicate background ghost headings or floating satellite pill cards around the 3D phone stage.
- **Hierarchy**: 1. Main Heading ➔ 2. 3D Phone / Product UI ➔ 3. Supporting UI Card ➔ 4. Small Metadata ➔ 5. Background Decoration (< 5% opacity).

## Pattern 6: High-Performance Scroll & Zero-Jank Rendering
- **Rule**:
  1. Never put `scroll-behavior: smooth` in CSS when using Lenis; use Lenis RAF easing.
  2. For high-frequency mouse/scroll animations (like conveyors or cursor light), use GPU CSS keyframes or direct DOM `ref` transforms instead of continuous React `setState`.
  3. Pre-allocate Three.js vectors and colors in module scope outside the `useFrame` loop.
  4. Intercept anchor links (`a[href^="#"]`) through Lenis smooth scrollTo with offset (`-80px`).
