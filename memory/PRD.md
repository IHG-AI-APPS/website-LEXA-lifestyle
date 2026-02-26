# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work

### Phase 1-10: Content & CMS
- All solutions, services, brands, geo pages, locations, specialty rooms, intelligence features — all CMS-driven
- Admin CMS at `/admin/cms` for full content management
- Catalogue/Flipbook feature
- 30+ standalone pages converted to CMS

### Phase 11: Final CMS Conversion — 9 Remaining Pages (Feb 26, 2026)
- Converted: careers, media, support, warranty, developer-toolkit, privacy-policy, terms, terms-of-service, privacy
- Testing: 100% pass (12/12 backend + 9/9 frontend)

### Phase 12: Site-wide Design Consistency Review (Feb 26, 2026)
- Updated 19+ pages to benchmark dark hero (bg-gray-900 + #C9A962 gold accents)
- Testing: 100% pass (27/27 pages verified)

### Phase 13: Page Transition Animations (Feb 26, 2026)
- Enhanced template.tsx with smooth fade-in + blur transition
- Added CSS staggered section reveals

### Phase 14: Package Static Pages Benchmark Design (Feb 26, 2026)
- **developer-packages**: Applied benchmark dark hero, replaced amber palette with #C9A962 gold, added data-testid, fixed dark mode
- **smart-apartment-packages**: Applied benchmark dark hero, replaced blue palette with #C9A962 gold, updated apartment size selector, package cards, ecosystem section, CTA — all unified with benchmark
- Both pages retain full functionality (forms, pricing tables, interactive selectors)

## Benchmark Design Standard
| Element | Specification |
|---------|--------------|
| Hero BG | `bg-gray-900` (solid dark) |
| Badge | `rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962]` |
| Title | `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white` |
| Primary CTA | `bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold` |
| Page BG | `bg-white dark:bg-gray-950` |
| Transitions | Fade-in + slide-up + blur via framer-motion template.tsx |

## Remaining / Backlog
### P1 — Content Change History for admin CMS (audit trail)
### P2 — Project pages design (excluded by user)

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
