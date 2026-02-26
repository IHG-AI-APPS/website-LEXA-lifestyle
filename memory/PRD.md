# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work

### Phase 1: Content Detail Pages (Dynamic)
- Solutions, Services, Packages, Intelligence, Specialty Rooms, Locations, Case Studies — all redesigned with benchmark template and CMS-editable

### Phase 2: 15+ Standalone Pages Redesigned
- experience-centre, about, process, amc-packages, consultation, faq, work-with-us, testimonials, contact, support, investment-pricing, warranty, certification-standard, media, partner-with-us

### Phase 3: SEO/Geo Pages (Feb 26, 2026)
- Created GeoPageTemplate.tsx, rewrote 34 geo pages, made database-driven via API + MongoDB
- Admin CMS at /admin/geo-pages with full editing

### Phase 4: Admin CMS Extensions (Feb 26, 2026)
- Specialty Rooms: Fixed API, added FAQs/Feature Cards/Related Solutions editing
- Intelligence Features: Added FAQs/Feature Cards to add/edit form
- Locations: New admin page with full editing

### Phase 5: Static Page Cleanup (Feb 26, 2026)
- **Deleted 41 static solution pages** — dynamic [slug] route now handles all with benchmark design
- **Deleted 7 static service pages** — dynamic [slug] route handles all
- **Seeded 28 missing DB entries** (19 solutions, 7 services, 2 packages) for pages that only existed as static files
- **Cultural/religious pages** (church, majlis, masjid, temple, marine-yacht) converted from nested routes to standard solution slugs
- **Result**: 103 solutions + 19 services all render with unified benchmark design

## Current State: Design Consistency
| Section | Pages | Design Status | CMS Status |
|---------|-------|---------------|------------|
| Solutions | 103 | Benchmark | DB-driven |
| Services | 19 | Benchmark | DB-driven |
| Geo Pages | 34 | Benchmark | DB-driven + CMS |
| Locations | 7 | Benchmark | DB-driven + CMS |
| Specialty Rooms | 22 | Benchmark | DB + CMS enriched |
| Intelligence | 693 | Benchmark | DB + CMS enriched |
| Standalone Pages | 15+ | Benchmark | CMS keys |
| Packages | 7 types | Benchmark | DB-driven |

## Remaining / Backlog

### P1 — Brand Pages Redesign (Deferred by user)
### P2 — Projects Landing Page Redesign (Deferred by user)
### P3 — Site-wide Consistency Review
### P4 — Package static pages (developer-packages, smart-apartment-packages) — custom layouts

## Key API Endpoints
- `GET/PUT/POST/DELETE /api/geo-pages` — Geo pages CRUD
- `GET /api/solutions/{slug}` — 103 solutions
- `GET /api/services/{slug}` — 19 services
- `GET /api/packages/specialty-rooms` — 22 rooms
- `GET/PUT /api/locations/{slug}` — 7 locations
- `GET /api/intelligence/features` — 693 features

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
