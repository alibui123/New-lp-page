# Finova Solutions LP — Technical Documentation

## 1) Project Overview

This project is a **Next.js 14 (App Router)** marketing website for Finova Solutions, focused on plumbing-company lead handling and dispatch automation.

It includes:
- A long-form landing page (`/`) with chapter-based storytelling.
- A dedicated offer page (`/offer`).
- A legal terms page (`/terms`).
- A browser voice demo section backed by **Retell** token creation.
- Static-export-oriented deployment for shared hosting environments.

---

## 2) Technology Stack

### Core
- **Next.js**: `14.2.5`
- **React**: `18.3.1`
- **TypeScript**: strict mode enabled

### UI / Motion
- **Lenis** (`lenis`): smooth scrolling (client and external script integration)
- Custom CSS + canvas/WebGL effects in `public/*.js`

### Voice Demo
- **retell-client-js-sdk**: browser-side call client
- Server endpoint at `/api/retell/web-call` for short-lived access tokens
- Optional Cloudflare Worker token proxy for static hosting

### Utility
- **Mermaid**: used in legal/terms context via dynamic client rendering

---

## 3) Build and Runtime Model

### Static export is enabled
`next.config.mjs` sets:
- `output: 'export'`
- `distDir: 'out'`
- `images.unoptimized: true`

This means output is static files, suitable for CDNs/shared hosting.

### Important implication
Because of static export mode:
- `next start` is **not** valid for exported output.
- Use either:
  - `next dev` for development, or
  - static server for exported output (e.g. `npx serve out`).

---

## 4) Scripts and Commands

From `package.json`:

- `npm run dev` — start Next.js development server
- `npm run build` — build/export using Next settings
- `npm run start` — starts Next server mode (not compatible with export-only hosting)
- `npm run lint` — lint checks
- `npm run dist` — runs `scripts/exportDist.js`

### `dist` workflow (`scripts/exportDist.js`)
1. Executes `npx next build`
2. Deletes existing `dist/` if present
3. Renames `out/` -> `dist/`

This is useful when deployment target expects `dist/` directory.

---

## 5) Repository Structure (Key Paths)

- `src/app/layout.tsx` — root HTML shell, metadata, fonts, favicon links
- `src/app/globals.css` — global styling + section/page-specific styles
- `src/app/page.tsx` — homepage composition
- `src/app/offer/page.tsx` — offer page
- `src/app/terms/page.tsx` — legal/terms page
- `src/app/api/retell/web-call/route.ts` — token-generation API route (server)
- `src/components/layout/*` — shared layout primitives (nav, overlays, scripts, smooth scroll)
- `src/components/sections/*` — homepage section components
- `public/script.js` — global interaction/animation script
- `public/gradient-bg.js` — WebGL animated background
- `public/offer-animations.js` — offer-page motion logic
- `cloudflare-worker/retell-token-worker.js` — token proxy for static deployments
- `env.example` — environment variable template and deployment hints

---

## 6) Routing and Page Composition

## Homepage (`/`)
Constructed in `src/app/page.tsx` by composing:
- `SmoothScroll`, `Overlays`, `NavBar`
- `Chapter0` to `Chapter6`
- `DemoCallSection`
- `ContactSection`
- `ExternalScripts`

This produces a chaptered single-page narrative with anchor navigation.

## Offer Page (`/offer`)
`src/app/offer/page.tsx` includes:
- Hero with performance guarantee message
- Problem list, promise, strategy timeline, guarantee options, bonus, CTA, footer
- Loads `public/offer-animations.js` with `next/script` (`afterInteractive`)

## Terms Page (`/terms`)
`src/app/terms/page.tsx` is a long legal/contractual page with:
- Structured legal clauses
- Optional mermaid diagram rendering
- custom cursor behavior (`TermsCursor`)

---

## 7) Layout and Global UI Architecture

### Root Layout (`src/app/layout.tsx`)
Defines:
- Global metadata (title/description)
- Font preconnects + font stylesheet
- Lenis CSS include
- favicon links:
  - `/assets/finova-icon.png` (16x16 and 32x32)
  - apple touch icon

### Shared Components
- `NavBar.tsx`
  - Context-aware links (`home`, `offer`, `terms`)
  - Uses `/assets/finova-icon.png` logo
- `Overlays.tsx`
  - Canvas background container (`#gradientBg`)
  - custom cursor blob (`#cursor-blob`)
  - scroll progress bar (`#scroll-bar`)
- `SmoothScroll.tsx`
  - Initializes Lenis in client-side hook
- `ExternalScripts.tsx`
  - Injects `lenis.min.js`, `gradient-bg.js`, and `script.js`

---

## 8) Styling System

All main styling is in `src/app/globals.css`.

Patterns used:
- CSS variables for color/typography tokens (`:root`)
- Section-scoped classes (`.chapter`, `.op-*`, `.legal-*`)
- Motion via CSS transitions/keyframes + JS class toggles
- Responsive behavior via media queries (notably mobile CTA alignment and section spacing)

Notable areas:
- Hero CTA wave button (`.hero-wave-cta*`)
- Offer-page hero + timeline styles (`.op-hero*`, `.op-timeline*`)
- Legal page typography/table styles (`.legal-*`)

---

## 9) Frontend Runtime Scripts

## `public/script.js` (Global)
Responsibilities include:
- Global RAF task loop orchestration
- Scroll progress bar updates
- nav state changes on scroll
- IntersectionObserver reveal effects
- counters and chapter-triggered animations
- lightweight droplet canvas in hero
- wave animation for selected sections

Performance-focused behavior is explicitly baked in (single RAF loop, observer usage, reduced heavy effects).

## `public/gradient-bg.js` (WebGL)
- Initializes fixed full-screen canvas
- Renders animated multi-orb gradient with shaders
- includes visibility pause and frame-throttling for GPU savings

## `public/offer-animations.js` (Offer page)
- Guarded to run only when `.offer-page` exists
- Hero numeric animation (`$25,000` count-up)
- Timeline progress behavior
- Section-specific reveal/hover/shine interactions
- Uses `prefers-reduced-motion` and pointer checks for adaptive behavior

---

## 10) Voice Demo Technical Flow

Primary interactive implementation: `src/components/sections/DemoCallSection.tsx`.

### Token URL resolution strategy
1. If `NEXT_PUBLIC_RETELL_TOKEN_URL` is absolute (`https://...`), use it directly.
2. Else read `public/voice-token-endpoint.json` (`tokenUrl`) for host-editable endpoint.
3. Else fallback to local `/api/retell/web-call`.

### Server API route (`src/app/api/retell/web-call/route.ts`)
- Reads `RETELL_API_KEY` and `RETELL_AGENT_ID` from server env.
- Calls Retell `create-web-call` endpoint.
- Returns JSON `{ access_token }`.
- Handles invalid config, upstream errors, parse failures, and network failures.

### Client voice UX details
- Starts/stops Retell web call sessions.
- Tracks status (`idle`, `connecting`, `live`).
- Builds transcript display from varied response shapes.
- Uses audio analysis and canvas rendering for live visualizer effects.

---

## 11) Static Hosting and Worker Proxy

Because static export does not run Next API routes in many hosts, this project includes:
- `cloudflare-worker/retell-token-worker.js`

Worker purpose:
- Store Retell credentials securely in Cloudflare Worker secrets.
- Receive browser `POST` requests.
- Call Retell API server-side.
- Return token response with CORS headers.

Deployment guidance is documented in comments and `env.example`.

---

## 12) Environment Variables

From `env.example`:

### Server-side
- `RETELL_API_KEY`
- `RETELL_AGENT_ID`

### Client-visible
- `NEXT_PUBLIC_RETELL_TOKEN_URL`
- `NEXT_PUBLIC_RETELL_AGENT_NAME` (optional display label)

Security note:
- Never expose `RETELL_API_KEY` in client code.
- Keep API keys in server env or worker secrets.

---

## 13) Performance Characteristics

Current codebase already applies several optimizations:
- centralized animation loop in global script
- IntersectionObserver over frequent polling
- reduced complexity for canvas/wave effects
- visibility-based pause logic for animations
- motion and pointer capability checks (`prefers-reduced-motion`, fine pointer)

Areas that are intentionally effect-heavy:
- offer-page hero and timeline interactions
- live voice visualizer
- WebGL background

If needed, these are the first candidates for progressive degradation on low-end devices.

---

## 14) Compatibility Notes and Operational Caveats

1. **`next start` with `output: 'export'`**
   - Use static serving for exported output (`out` / `dist`).

2. **Dual Next config files**
   - `next.config.mjs` is active.
   - `next.config.js` is marked deprecated/reference.

3. **Client scripts in `public/`**
   - They rely on global DOM structure and CSS class names.
   - Renaming classes/IDs requires script updates.

4. **Static host + voice demo**
   - If API routes are unavailable, configure Cloudflare Worker URL.

---

## 15) Local Development Checklist

1. Install dependencies:
```bash
npm install
```

2. Create env file from template and add Retell values if voice demo is needed.

3. Start dev server:
```bash
npm run dev
```

4. For export output verification:
```bash
npm run build
npx serve out
```

5. For host upload bundle (`dist/`):
```bash
npm run dist
```

---

## 16) Suggested Engineering Improvements (Optional)

- Split heavy public scripts by page and lazy-load only where required.
- Migrate more imperative DOM animation logic into isolated React client modules for testability.
- Add smoke tests for critical routes (`/`, `/offer`, `/terms`).
- Add explicit deployment docs for each host (Hostinger, Cloudflare Pages, Vercel).
- Introduce feature flags for visual effects (low-power mode).

---

## 17) Quick Reference

- Active Next config: `next.config.mjs`
- Main style source: `src/app/globals.css`
- Homepage composition: `src/app/page.tsx`
- Offer interactions: `public/offer-animations.js`
- Voice token API: `src/app/api/retell/web-call/route.ts`
- Static token proxy option: `cloudflare-worker/retell-token-worker.js`
- Build to dist folder: `npm run dist`

---

If needed, this document can be split into:
- `docs/architecture.md`
- `docs/deployment.md`
- `docs/voice-demo.md`
for easier maintenance as the project grows.
