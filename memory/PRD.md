# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Improve site performance and design consistency
3. Apply a "benchmark" design standard across all content pages

## Architecture
- **Frontend**: Next.js 14 (App Router) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work

### Phase 1: Content Detail Pages (Dynamic)
- **Solutions** (`/solutions/[slug]`): Benchmark, 85 enriched, CMS
- **Services** (`/services/[slug]`): Benchmark, 10 enriched, CMS
- **Packages** (`/packages/[slug]`): Benchmark, 7 enriched
- **Intelligence** (`/intelligence/[id]`): Benchmark, 693 enriched with feature_cards/faqs
- **Specialty Rooms** (`/specialty-rooms/[slug]`): Benchmark, 22 enriched
- **Locations** (`/locations/[slug]`): Dynamic route, API + DB
- **Case Studies** (`/case-studies/[slug]`): Benchmark

### Phase 2: 15+ Standalone Pages Redesigned
- experience-centre, about, process, amc-packages, consultation, faq, work-with-us, testimonials, contact, support, investment-pricing, warranty, certification-standard, media, partner-with-us

### Phase 3: SEO/Geo Pages (Feb 26, 2026)
- Created `GeoPageTemplate.tsx` with benchmark design
- Batch-rewrote all 34 geo pages to use it
- Made all 34 pages database-driven via `/api/geo-pages` API + MongoDB

### Phase 4: Admin CMS Extensions (Feb 26, 2026)
- **Geo Pages CMS** (`/admin/geo-pages`): Full CRUD — list, search, edit hero/stats/communities/services/FAQs/CTA
- **Specialty Rooms CMS** (`/admin/specialty-rooms`): Fixed API fetching, added FAQs, Feature Cards, Related Solutions editing
- **Intelligence Features CMS** (`/admin/intelligence-features`): Added FAQs and Feature Cards to add/edit form
- **Locations CMS** (`/admin/locations`): New — edit name, address, phone, content, hero image, map, features, SEO
- **All tested**: 100% pass — backend API + frontend admin verified

## Remaining / Backlog

### P1 — Brand Pages Redesign (Deferred by user)
- Backend model updated, enrichment script created
- Frontend page + admin CMS still needed

### P2 — Projects Landing Page Redesign (Deferred by user)

### P3 — Site-wide Consistency Review

## Key API Endpoints
- `GET/PUT/POST/DELETE /api/geo-pages` — Geo pages (slug-based CRUD)
- `GET /api/packages/specialty-rooms` — 22 specialty rooms
- `GET/PUT /api/locations/{slug}` — 7 locations
- `GET /api/intelligence/features` — 693 features
- `GET /api/packages/{slug}`, `/api/intelligence/{slug}`, `/api/specialty-rooms/{slug}`, `/api/projects/{slug}`

## Key Files
- `/app/frontend/components/geo/GeoPageTemplate.tsx` — Shared geo template with API fetch
- `/app/backend/routes/geo_pages.py` — Geo pages CRUD API
- `/app/frontend/app/admin/geo-pages/page.tsx` — Geo CMS
- `/app/frontend/app/admin/specialty-rooms/page.tsx` — Specialty Rooms CMS (enriched)
- `/app/frontend/app/admin/intelligence-features/page.tsx` — Intelligence CMS (enriched)
- `/app/frontend/app/admin/locations/page.tsx` — Locations CMS
- `/app/frontend/app/admin/cms/page.tsx` — Main CMS panel

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
