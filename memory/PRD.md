# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul: premium "Dark Luxury" design, 100% dynamic content, app-like UX, site-wide color consistency, custom AI imagery, immersive interactive experiences with ambient sound.

## Core Architecture
- **Frontend**: Next.js (production mode `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Images**: 100% custom AI-generated (zero stock photos)

## What's Been Implemented

### All Audit Fixes (P0/P1/P2) — 23 items complete
### Dark Charcoal Color Overhaul — 100+ files, zero blue tint
### Gold Shimmer Micro-Animations — hero, CTAs, badges
### Service Worker v4 — network-first CMS, SWR APIs, offline page
### 39+ Custom AI Images — all stock photos replaced site-wide

### Hero Redesign (Mar 2026)
- **Minimal cinematic hero**: Full-screen video background with AI-generated luxury interior poster/fallback
- **Single quote**: "Where technology meets luxury" — no headings, no CTAs, no clutter
- **Navigation preserved**: Full header navigation visible on top
- **Video rotation**: Existing Sora 2 clips with crossfade transitions
- **CMS-driven**: Quote, video clips configurable from backend

### Testimonials Compact Redesign (Mar 2026)
- **4-column single row**: Compact cards with star ratings, 2-line truncated quotes, author info
- **"View All" button**: Links to /testimonials for full testimonial page
- **Dramatically reduced footprint** from previous large 3-column layout

### Persona Pages Redesign (Mar 2026)
- All 4 persona pages (homeowner, architect, developer, commercial) completely redesigned
- Image-driven layout: 85vh fullscreen hero + 4 alternating image/text showcase sections + CTA section
- 8 new AI-generated images: luxury villa interior, architecture studio, villa compound, hotel lobby, cinema room, smart lighting bedroom, outdoor pool, security systems
- Each page has unique hero tagline and contextual solution links
- Consistent dark luxury theme with charcoal/gold palette

### Footer Logo Fix (Mar 2026)
- Footer LEXA logo now matches header logo size (144x56px at lg breakpoint)

### Interactive Virtual Tour with Ambient Sound
- 6 curated zones with Ken Burns effects, glassmorphism panels, ambient sound
- **Portal rendering** (createPortal) for correct fixed positioning
- Background-image approach for reliable sizing with Framer Motion transforms

### Virtual Tour Scaling Fix (Mar 2026)
- Root cause: ancestor `filter: blur(0px)` broke `fixed` positioning
- Fix: `createPortal` to render in `document.body`

### Header/Footer Navigation Update (Mar 2026)
- Moved "Catalogues" from header navigation to footer "Quick Links"
- Added golden CTA band below hero: "Find Your Perfect Solution" + "View Projects" equally divided

### Testimonials Full Page (Mar 2026)
- Created /testimonials page with cinematic hero, featured 3-col cards with client photos, and compact "More Reviews" grid
- Merges API testimonials with fallback data (no duplicates)
- Linked from homepage "View All" button
- CTA section links to Experience Centre and Projects

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add blue-tinted colors
- Production mode: `npx next build` + `sudo supervisorctl restart frontend`
- Emergent LLM Key balance is LOW — user needs to top up for video generation (Profile → Universal Key → Add Balance)

## Remaining Backlog
- Generate new custom AI hero video (needs Emergent LLM Key balance top-up for Sora 2)
- "Compare Packages" side-by-side conversion feature
- Refine Service Worker Caching with more advanced strategies
- Client Logo Integration (TrustedBy component uses placeholder SVG)
- Create /testimonials full page (linked from "View All" button)
