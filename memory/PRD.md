# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router, Production Build) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work (Latest First)

### Phase 33: "Dark Luxury" Full Redesign (Mar 1, 2026) — MAJOR
**Design system: "The Invisible Butler"** — Unified OLED-black (#050505) experience
- **Homepage wrapper**: `bg-[#050505]` eliminates ALL white/light section backgrounds
- **Purple gradient killed**: Smart Project Builder now uses `from-[#0A0A0A] to-[#111111]` with gold border + accents
- **Gold gradient stats**: `text-transparent bg-clip-text bg-gradient-to-b from-[#C9A962] to-[#8a7035]`
- **Trust badges**: Dark glass strip (`bg-black/60 backdrop-blur-xl`) with `text-[#C9A962]` gold icons
- **Solutions section**: Gold pill badge, dark bg, white headings
- **Projects section**: Gold `OUR PORTFOLIO` label, dark bg
- **TrustedInUAE**: Full dark theme with `bg-white/[0.03]` glass cards
- **Tab bar**: Floating pill (`rounded-2xl max-w-sm mx-auto`, 64px height)
- **Hero cleanup**: "We serve" text hidden on mobile (`hidden sm:block`)
- **ExperienceCentreCTA**: Normalized to `bg-[#050505]`
- **All CTA buttons**: Gold `bg-[#C9A962]` with black text, `rounded-none` sharp edges
- Testing: 100% pass on mobile + desktop (iteration_58.json)

### Phase 32: Data Cleanup + Projects Tab Fix (Mar 1, 2026)
- MobileTabBar "Projects" → `/projects` (was `/dashboard`)
- Cleaned "PUT_TEST_462a0b9a" + "TEST_PATCHED_66761588" from DB

### Phase 31: Image Performance (Mar 1, 2026)
- TetrisProjects + CalculatorCardsSection → SafeImage (quality=75, lazy, sizes)

### Phase 30: Mobile UX Redesign (Mar 1, 2026)
- Hero center-aligned, horizontal snap scroll for tools + projects

### Phase 29: Quick Actions FAB (Mar 1, 2026)
### Phase 28: Hero CTA Optimization
### Phase 27-1: Native Gestures, Speed, AURA, Full CMS

## Design System
- **Primary bg**: #050505 (OLED black)
- **Gold accent**: #C9A962
- **Gold hover**: #E8DCC8
- **Glass cards**: bg-white/[0.03] border-white/[0.06]
- **Text primary**: white
- **Text secondary**: neutral-400/neutral-500
- **Buttons**: bg-[#C9A962] text-black rounded-none

## Remaining / Backlog
### P1 — Redesign Projects Landing Page
### P2 — Site-wide Consistency Review (inner pages)
### P3 — Content Change History for admin CMS
### P4 — WhatsApp template approval on Interakt
### P5 — Fix TypeScript build errors

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
