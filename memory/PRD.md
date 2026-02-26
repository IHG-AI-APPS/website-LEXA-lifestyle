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

## Current Design State (Pre-Phase 6)
(See Phase 6 below for updated table)

### Phase 6: Brand Pages Styling & Image Fix (Feb 26, 2026)
- **Listing page** (`/brands`): Applied benchmark design — dark hero, gold #C9A962 accents, category-colored filter pills, search bar, refined cards with text initials
- **Detail page** (`/brands/[slug]`): Fixed dummy image issue — cleared 35 fake Unsplash logos + 114 product images from DB, added text-based initials fallback. Hero images retained (atmospheric backgrounds). Fixed broken Lumibright logo URL
- **Testing**: 100% pass rate

### Phase 7: Admin CMS Extension for Brands & Projects (Feb 26, 2026)
- **Brands Admin**: Added Feature Cards editor (title/description/benefits), Gallery Images (multi-image upload), Related Solutions (comma-separated slugs)
- **Projects Admin**: Added Category, Video URL, Features array, Results/Metrics array fields
- **Backend**: Extended Project Pydantic model with ~15 missing fields (challenge, solution_details, outcome, video_url, features, results, etc.) that were previously dropped by `extra="ignore"`
- **Synced models**: Fixed duplicate Project/Brand models in server.py to match models/content.py
- **Testing**: 100% pass rate (12/12 backend + all frontend)

### Phase 8: Catalogue/Flipbook Feature (Feb 26, 2026)
- **Catalogues Listing Page** (`/catalogues`): Benchmark-designed page with category filters (Company Profile, Pre-qualification, Brand Catalogues)
- **Flipbook Viewer** (`/catalogues/[slug]`): Interactive PDF flipbook using react-pageflip + pdfjs-dist with page-turn animation, fullscreen, keyboard nav, view-only mode
- **Admin CMS** (`/admin/catalogues`): Full CRUD — PDF upload (50MB max), metadata, thumbnail, category, publish/draft, priority
- **Backend**: New Catalogue model, CRUD API, dedicated PDF upload endpoint
- **Navigation**: Added "Catalogues" to main header and admin sidebar
- **Testing**: 100% pass rate (14/14 backend + all frontend UI)

### Phase 9: Static Override Cleanup & CMS Migration (Feb 26, 2026)
- **Deleted 9 static override files** that were blocking dynamic CMS routes
- **Seeded content into DB**: 5 articles into `articles` collection, 1 feature into `intelligence_features`
- **Fixed intelligence/[id] page**: Added slug-based lookup
- **Testing**: 100% pass rate

### Phase 10: CMS Conversion of 6 Standalone Pages (Feb 26, 2026)
- **Converted 6 pages** to fully dynamic CMS: `why-lexa`, `big-homes-break-smart`, `villa-operating-model`, `integrations`, `case-studies`, `glossary`
- All page content (hero text, feature arrays, comparisons, roles, brand lists, case studies) now editable from Admin CMS
- Seeded all content into `settings` collection with structured JSON objects
- Added 6 new CMS section entries in Admin > CMS panel under "Core Pages"
- Uses `useCms()` hook with hardcoded fallback for zero-downtime migration
- **Testing**: 100% pass rate (9/9 backend + 6/6 frontend)

## Current State: Design Consistency
| Section | Pages | Design Status | CMS Status |
|---------|-------|---------------|------------|
| Solutions | 103 | Benchmark | DB-driven |
| Services | 19 | Benchmark | DB-driven |
| Brands | 36 | Benchmark | DB-driven + CMS enriched |
| Geo Pages | 34 | Benchmark | DB-driven + CMS |
| Locations | 7 | Benchmark | DB-driven + CMS |
| Specialty Rooms | 22 | Benchmark | DB + CMS enriched |
| Intelligence | 693 | Benchmark | DB + CMS enriched |
| Standalone Pages | 15+ | Benchmark | CMS keys |
| Packages | 7 types | Benchmark | DB-driven |

## Remaining / Backlog

### P1 — Site-wide Consistency Review
### P2 — Package static pages (developer-packages, smart-apartment-packages) — custom layouts

## Key API Endpoints
- `GET/PUT/POST/DELETE /api/geo-pages` — Geo pages CRUD
- `GET /api/solutions/{slug}` — 103 solutions
- `GET /api/services/{slug}` — 19 services
- `GET /api/packages/specialty-rooms` — 22 rooms
- `GET/PUT /api/locations/{slug}` — 7 locations
- `GET /api/intelligence/features` — 693 features

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
