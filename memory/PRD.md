# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work

### Phase 1-10: Content & CMS (see CHANGELOG)
- All solutions, services, brands, geo pages, locations, specialty rooms, intelligence features — all CMS-driven
- Admin CMS at `/admin/cms` for full content management
- Catalogue/Flipbook feature
- 30+ standalone pages converted to CMS

### Phase 11: Final CMS Conversion — 9 Remaining Pages (Feb 26, 2026)
- Converted: careers, media, support, warranty, developer-toolkit, privacy-policy, terms, terms-of-service, privacy
- Pattern: Server component (page.tsx with SEO metadata) + Client component (Content.tsx with useCms)
- Testing: 100% pass (12/12 backend + 9/9 frontend)

### Phase 12: Site-wide Design Consistency Review (Feb 26, 2026)
- **Updated 19 pages** to benchmark dark hero pattern (bg-gray-900 + #C9A962 gold accents)
- **Listing pages fixed**: solutions, services, specialty-rooms, packages, resources, blog, news
- **Standalone pages fixed**: hidden-costs, lexa-evolves, platform-agnostic, architects, contractors, developers, vendor-supplier, developer-partner-toolkit
- **Persona pages fixed**: homeowner, architect, developer, commercial
- Added data-testid attributes across all updated pages
- **Testing: 100% pass rate (27/27 pages verified)**, no old patterns remain
- **Excluded**: Project pages (`/projects`, `/projects/[slug]`) as per user request

## Benchmark Design Standard
| Element | Specification |
|---------|--------------|
| Hero BG | `bg-gray-900` (solid dark) |
| Badge | `rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962]` |
| Title | `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white` |
| Body text | `text-base text-gray-300` |
| Primary CTA | `bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold` |
| Page BG | `bg-white dark:bg-gray-950` |

## Current State
| Section | Pages | Design | CMS |
|---------|-------|--------|-----|
| Solutions | 103 | Benchmark | DB-driven |
| Services | 19 | Benchmark | DB-driven |
| Brands | 36 | Benchmark | DB + CMS |
| Geo Pages | 34 | Benchmark | DB + CMS |
| Locations | 7 | Benchmark | DB + CMS |
| Specialty Rooms | 22 | Benchmark | DB + CMS |
| Intelligence | 693 | Benchmark | DB + CMS |
| Standalone Pages | 30+ | Benchmark | **100% CMS-driven** |
| Packages | 7 types | Benchmark | DB-driven |
| Catalogues | Dynamic | Benchmark | DB + CMS |
| Persona Pages | 4 | Benchmark | CMS |
| Professional Pages | 5 | Benchmark | CMS |

## Remaining / Backlog
### P1 — Package static pages (developer-packages, smart-apartment-packages) — custom layouts
### P2 — Project pages design consistency (currently excluded by user)

## Key API Endpoints
- `GET/PUT /api/cms/sections/{key}` — CMS content for any page
- `POST /api/cms/register-defaults` — Seed CMS defaults
- `GET /api/solutions/{slug}`, `/api/services/{slug}`, `/api/packages/specialty-rooms`
- `GET/POST/PUT/DELETE /api/catalogues`, `/api/geo-pages`

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
