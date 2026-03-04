# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. Site-wide color consistency (dark charcoal + gold only), mobile-first responsive enhancement, typography standardization, and premium micro-animations.

## Core Architecture
- **Frontend**: Next.js (production mode with `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Integrations**: OpenAI GPT (AURA chatbot), Gemini Nano Banana (avatar), WhatsApp/Interakt, Gmail SMTP, Google Maps, GA4, Meta Pixel

## Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Void | #050505 | Page backgrounds, hero sections |
| Obsidian | #0A0A0A | Card backgrounds, secondary surfaces |
| Charcoal | #0F0F0F | Gray-50 dark override |
| Charcoal Light | #171717 | Elevated cards, hover states |
| Border | zinc-800 (#27272a) | All borders in dark mode |
| Gold | #C9A962 | Accent color, CTAs, highlights |

### Micro-Animations (globals.css)
| Effect | Class | Duration | Where |
|--------|-------|----------|-------|
| Gold Shimmer Text | `gold-shimmer-text` | 6s linear infinite | Homepage hero H1 |
| Gold Glow Pulse | `gold-glow-text` | 4s ease infinite | Homepage hero H1 |
| CTA Button Shimmer | `gold-shimmer-btn` | 4s ease infinite | Primary CTA buttons |
| Badge Border Pulse | `goldBadgeShimmer` | 4s ease infinite | All hero-animate-badge elements (20+ pages) |
| Section Label Gold | `section-label-gold` | 8s linear infinite | Optional for section labels |

## What's Been Implemented

### Completed - All Audit Fixes (P0/P1/P2)
- All 23 audit items resolved

### Completed - Site-wide Color Consistency Overhaul (Mar 2026)
- CSS variables: blue HSL(222) → neutral HSL(0)
- Dark mode overrides: all charcoal tones, zero blue tint
- Bulk sed across 100+ files
- Testing: 11/11 visual QA tests passed

### Completed - Gold Shimmer Micro-Animations (Mar 2026)
- Hero heading shimmer: subtle gold gradient sweep across "INTEGRATED LUXURY LIVING"
- CTA button shimmer: light shine effect on gold "Find Your Perfect Solution" button
- Badge shimmer: gold border pulse on all hero page badges (20+ pages)
- All CSS-only, zero JS overhead, accessible (respects prefers-reduced-motion)

### Completed - Service Worker v4
- Network-first CMS, stale-while-revalidate APIs, cache-first static, offline page

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` header in `next.config.mjs`
- DO NOT reintroduce blue-tinted colors (HSL 222, #0d1321, #0a0f1a, slate-*)
- Frontend runs in production mode; changes require `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- "Compare Packages" side-by-side feature
- Potential: extend gold shimmer to more section headings on scroll
