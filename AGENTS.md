<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WEBVIBEZ DESIGN RULES

### Clean Background Rule — Strict Requirement

Do NOT use giant background typography behind any section.

Do NOT place large words such as:
- SOFTWARE
- PRODUCT
- COACHING
- PLATFORM
- APPLICATION
- WEBVIBEZ

as oversized faded background text.

Do NOT duplicate the section heading in the background.

Do NOT create double text, ghost text, mirrored text, repeated text,
overlapping typography, or partially visible duplicate headings.

Every important text element must appear ONLY ONCE in its intended
foreground position.

The background must remain visually clean and spacious.

Use only very subtle background elements such as:
- fine technical grid
- extremely faint lines
- subtle radial lighting
- very soft blue/purple ambient glow
- minimal architectural lines
- tiny technical dots when necessary

Background opacity must remain very low.

The background must NEVER compete with the main heading,
mobile phone, product UI, or CTA.

If there is any conflict between decorative background elements
and readability, remove the decorative element.

The visual hierarchy must always be:
1. Main heading
2. Product / mobile phone
3. Supporting UI
4. Small metadata
5. Background decoration

Never introduce a sixth visual layer containing duplicate typography.

### Clean Phone Stage — No Floating Badges or Pill Chips

Do NOT place floating chips, status badges, satellite cards, or branding blocks around or over the mobile phone.

Specifically banned around the phone:
- "PRODUCTION STATUS: LIVE"
- "100s → 1000s Students Connected"
- "OFFICIAL APP BUILD"
- "ATTENDANCE" cards
- "100% White-Labeled" badges
- "TEST RESULTS" cards
- Floating telemetry bars docked on top or bottom of the phone frame

The 3D phone model and product UI must have pure, unobstructed whitespace around them without any competing floating capsules or boxes.

### Focus Depth + Side Transition System

Add a cinematic focus-depth system to every scroll-driven section.

The visual hierarchy must change dynamically as the user scrolls from LEFT → CENTER → RIGHT or RIGHT → CENTER → LEFT.

The element that is currently the MAIN FOCUS must always be visually strongest.

MAIN FOCUS:
- full opacity (1.0)
- sharp (blur: 0px)
- crisp text/UI
- normal scale (1.0)
- strongest contrast
- strongest visual presence
- slightly closer to viewer (translateZ: 0px)
- highest z-index

NON-FOCUS / SIDE ELEMENT:
- slightly reduced opacity (0.50–0.75)
- subtle blur (2px–4px)
- slightly reduced scale (0.95–0.98)
- lower contrast
- slightly darker/lighter depending on the scene
- lower z-index
- visually farther away (translateZ: -30px to -50px)

Do NOT make blur extreme — side content must still be recognizable.
Interpolate smoothly based on scroll progress with smooth cubic-bezier easing.
At any given moment there should be ONE clear visual focal point.

### Focus Depth — Implementation Contract

The following technical rules govern how focus-depth is implemented in code:

**State source**: `scrollPhysicsState.phoneFocusIntensity` (0=arc/unfocused, 1=bay/focal) and
`scrollPhysicsState.phoneSideX` (-1=phone left, +1=phone right) are computed every
animation frame in `PhoneModel.tsx` `useFrame` and notify all HTML subscribers.

**Piecewise scroll map** (from `getSectionPose()`):
- `0.00–0.16` → phone RIGHT bay (RESTING, focusIntensity → 1.0)
- `0.16–0.38` → phone arc RIGHT→LEFT (TRANSITION, focusIntensity dips to ~0.28)
- `0.38–0.54` → phone LEFT bay (RESTING, focusIntensity → 1.0)
- `0.54–0.72` → phone arc LEFT→RIGHT (TRANSITION, focusIntensity dips to ~0.28)
- `0.72–0.88` → phone RIGHT bay (RESTING, focusIntensity → 1.0)

**Per-section layout rule**:
- Hero section: phone=RIGHT, text=LEFT
- Problem section: phone=LEFT, content=RIGHT
- Product Showcase: phone=LEFT, details=RIGHT
- Features section: phone LEFT→RIGHT during this section (dynamic bidirectional)
- Brand Customizer: phone=RIGHT, content=LEFT

**CSS values** (from `getFocusDepthStyles()` in `src/lib/useFocusDepth.ts`):

FOCAL element (phonePower = 1.0):
  opacity: 1.00
  filter: none (blur: 0)
  transform: scale(1.000)

SECONDARY element (phonePower = 0.0):
  opacity: 0.52
  filter: blur(4.0px)
  transform: scale(0.962)

ARC/TRANSITION (focusIntensity = 0.28):
  Both sides: intermediate values — never fully defocused
  Transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s

**NEVER** snap focus — always use damp/lerp/cubic-bezier interpolation.
**NEVER** apply blur > 5px — side content must remain recognizable.
**NEVER** make two elements simultaneously at full focus intensity.

### Phone Position — LEFT to RIGHT Travel

The phone MUST travel from its left bay to right bay and back across page sections.
It must NEVER remain fixed at center for extended periods.

The `getSectionPose()` function in `PhoneModel.tsx` controls this:
- Phone starts at x=+2.45 (RIGHT bay) in Hero
- Arcs through deep background to x=-2.45 (LEFT bay) for Problem/Product
- Arcs back to x=+2.45 (RIGHT bay) for Features/Brand/HowItWorks end

When adding new sections, always specify which bay the phone should occupy
and update `getSectionPose()` with appropriate scroll progress ranges.
