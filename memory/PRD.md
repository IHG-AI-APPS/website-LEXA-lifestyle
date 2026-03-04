# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. Website audit report identified 23 specific UI/UX and functional issues to fix across P0, P1, and P2 priorities. User also requested site-wide color consistency (dark charcoal + gold only), mobile-first responsive enhancement, and typography standardization.

## Core Architecture
- **Frontend**: Next.js (production mode with `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Integrations**: OpenAI GPT (AURA chatbot), Gemini Nano Banana (avatar), WhatsApp/Interakt, Gmail SMTP, Google Maps, GA4, Meta Pixel

## Design System — Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Void | #050505 | Page backgrounds, hero sections |
| Obsidian | #0A0A0A | Card backgrounds, secondary surfaces |
| Charcoal | #0F0F0F | Gray-50 dark override |
| Charcoal Light | #171717 | Elevated cards, hover states |
| Border | zinc-800 (#27272a) | All borders in dark mode |
| Gold | #C9A962 | Accent color, CTAs, highlights |
| Text Primary | white | Headings, primary text |
| Text Secondary | zinc-400/zinc-500 | Body text, captions |

## What's Been Implemented

### Completed - P0/P1/P2 Audit Fixes (All Done)
- Fixed Aura chatbot, header logo, testimonials, Google Maps, Quick View
- Package tier redirect, catalogue overlap, modal responsiveness
- OurPromise icons, blog author names, footer social icons (6 total)

### Completed - Site-wide Color Consistency Overhaul (Mar 2026)
- **CSS Variables**: Changed dark mode from blue HSL(222) to neutral HSL(0) in globals.css
- **Dark mode overrides**: .bg-white → #0A0A0A, .bg-gray-50 → #0F0F0F, .bg-gray-100 → #171717
- **Bulk replacement**: All dark:bg-gray-900/950/800 → charcoal hex values across 100+ files
- **Slate → Zinc**: All slate-700/800/900 replaced with zinc equivalents for neutral tone
- **Border standardization**: dark:border-gray-700/800 → dark:border-zinc-800
- **Text normalization**: dark:text-gray-300/400 → dark:text-zinc-400/zinc-500
- **Glass effect**: Fixed from blue-tinted rgb(17,24,39) to neutral rgb(10,10,10)
- **Verified**: Testing agent confirmed ALL backgrounds are R≈G≈B (zero blue tint) — 11/11 tests passed

### Completed - Service Worker v4 (Mar 2026)
- Network-first for CMS, stale-while-revalidate for API, cache-first for static
- Branded offline fallback page, cache size limits, proper versioning

### Completed - Major Features
- WhatsApp Admin Dashboard, Quick View modal, pricing updates, design consistency pass

## Typography System (globals.css)
| Level | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| H1 | text-3xl | text-4xl-5xl | text-5xl-6xl |
| H2 | text-2xl | text-3xl-4xl | text-4xl-5xl |
| H3 | text-xl | text-2xl | text-3xl |
| H4 | text-lg | text-xl | text-2xl |
| Body | text-base | text-base | text-base |
| Small | text-sm | text-sm | text-sm |

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` header in `next.config.mjs`
- DO NOT reintroduce blue-tinted colors (HSL 222, #0d1321, #0a0f1a, slate-*)
- Frontend runs in production mode; changes require `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- No critical pending issues. All audit items and color overhaul complete.
- Potential enhancement: "Compare Packages" side-by-side feature
