# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router, Production Build) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work (Latest First)

### Phase 31: Projects Tab Fix + Image Performance (Mar 1, 2026)
- **Bug Fix**: MobileTabBar "Projects" tab now links to `/projects` (portfolio) instead of `/dashboard` (personal dashboard)
- **Image Performance**: TetrisProjects and CalculatorCardsSection mobile cards converted from `<motion.img>` and CSS `background-image` to `<SafeImage>` (Next.js Image optimization) with `quality=75`, `loading="lazy"`, responsive `sizes`
- This reduces image payloads from ~1.1MB to optimized webp/avif formats
- Testing: 100% pass (iteration_57.json)

### Phase 30: World-Class Mobile UX Redesign (Mar 1, 2026)
- Hero center-aligned on mobile, stronger overlay, drop shadows
- Calculator tools + Projects converted to horizontal snap scroll on mobile
- Added `no-scrollbar` CSS utility
- Desktop unaffected via `md:hidden` / `hidden md:grid` separation

### Phase 29: Mobile Quick Actions FAB (Mar 1, 2026)
- Single FAB replacing WhatsApp button on mobile (3 actions: Book, Call, WhatsApp)

### Phase 28: Hero CTA Optimization (Mar 1, 2026)
- 2 CTAs on mobile, 3 on desktop

### Phase 27-1: Native Gestures, Design Overhaul, Speed, AURA, Full CMS

## Remaining / Backlog
### P1 — Redesign Projects Landing Page (paused by user)
### P2 — Site-wide Consistency Review (final QA pass)
### P3 — Content Change History for admin CMS
### P4 — WhatsApp template approval on Interakt
### P5 — Fix TypeScript build errors (remove ignoreBuildErrors)

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
