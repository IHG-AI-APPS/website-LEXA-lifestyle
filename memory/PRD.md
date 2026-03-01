# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router, Production Build) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work (Latest First)

### Phase 33: Design Overhaul with Theme-Aware Dark/Light (Mar 1, 2026)
- **Gold accent system**: All sections now use `#C9A962` gold accents consistently
- **Purple gradient killed**: Smart Project Builder → dark bg with gold border/accents
- **Stats**: Gold gradient numbers (`bg-clip-text bg-gradient-to-b from-[#C9A962] to-[#8a7035]`)
- **Trust badges**: Gold icons, theme-aware bg (`bg-gray-50/80 dark:bg-black/60`)
- **All sections theme-aware**: Using `bg-white dark:bg-[#050505]` pattern — toggle works
- **Floating pill tab bar**: `rounded-2xl max-w-sm mx-auto`, 64px height
- **"We serve" text**: Hidden on mobile (`hidden sm:block`)
- **Solutions badge**: Gold pill with `bg-[#C9A962]/10 border-[#C9A962]/30`
- Testing: Theme toggle verified working on both light/dark modes

### Phase 32: Data Cleanup + Projects Tab Fix (Mar 1, 2026)
- MobileTabBar "Projects" → `/projects` (was `/dashboard`)
- Test data cleaned from DB

### Phase 31: Image Performance (Mar 1, 2026)
- SafeImage optimization (quality=75, lazy, sizes)

### Phase 30: Mobile UX Redesign (Mar 1, 2026)
- Center-aligned hero, horizontal snap scroll for tools + projects

### Phase 29: Quick Actions FAB
### Phase 28: Hero CTA Optimization
### Phase 27-1: Native Gestures, Speed, AURA, Full CMS

## Design System
- **Light bg**: white / gray-50
- **Dark bg**: #050505 (OLED black)
- **Gold accent**: #C9A962 (light+dark)
- **Gold hover**: #E8DCC8
- **Glass cards (dark)**: bg-white/[0.03] border-white/[0.06]
- **Glass cards (light)**: bg-gray-50 border-gray-200
- **Theme toggle**: Uses `dark:` Tailwind variants throughout

## Remaining / Backlog
### P1 — Redesign Projects Landing Page
### P2 — Site-wide Consistency Review (inner pages)
### P3 — Content Change History for admin CMS
### P4 — WhatsApp template approval on Interakt
### P5 — Fix TypeScript build errors

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
