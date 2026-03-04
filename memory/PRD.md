# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul: premium "Dark Luxury" design, 100% dynamic content, app-like UX, site-wide color consistency (dark charcoal + gold), custom AI imagery, and immersive interactive experiences.

## Core Architecture
- **Frontend**: Next.js (production mode `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Images**: 100% custom AI-generated (zero stock photos)

## What's Been Implemented

### All Audit Fixes (P0/P1/P2) — 23 items complete
### Dark Charcoal Color Overhaul — 100+ files updated
### Gold Shimmer Micro-Animations — hero, CTAs, badges
### Service Worker v4 — network-first CMS, SWR APIs, offline page
### 39+ Custom AI Images — all stock photos replaced

### Interactive Virtual Tour (Mar 2026)
**Full-screen cinematic experience on /experience-centre:**
- 6 curated zones: Smart Home, Cinema, Brands, Audio, Lighting, Security
- Ken Burns pan/zoom effect on zone backgrounds (15s cycles)
- Glassmorphism info panels with zone badge, description, feature chips
- Cinematic letterbox bars + gradient overlays
- Floating gold particles animation (20 particles)
- Zone navigation: dots, arrow buttons, keyboard (← → ESC)
- Auto-play mode (5s per zone)
- Fullscreen API support
- Visited zone tracking (gold = active, white = visited, dim = unvisited)
- "Begin Tour" CTA card with pulsing gold ring + parallax image

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` or blue-tinted colors
- Production mode: `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- "Compare Packages" side-by-side conversion feature
- Add ambient sound effects to Virtual Tour zones (optional)
