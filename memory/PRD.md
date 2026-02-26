# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Improve site performance and design consistency
3. Apply a "benchmark" design standard across all content pages

## Core Design Principles
- **Benchmark Template**: Dark hero (bg-gray-900), gold accents (#C9A962), consistent section headings (uppercase tracking-widest labels + bold h2), unified CTA patterns
- **Rich Dynamic Content**: Pages enriched with galleries, feature cards, related items, brands, FAQs
- **100% CMS Control**: Every piece of content fully manageable from admin panel

## Architecture
- **Frontend**: Next.js 14 (App Router)
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Deployment**: Kubernetes

## Completed Work

### Phase 1: Content Detail Pages (Dynamic)
- **Solutions** (`/solutions/[slug]`): Benchmark template, 85 solutions enriched, CMS integrated
- **Services** (`/services/[slug]`): Benchmark applied, 10 services enriched, CMS integrated
- **Packages** (`/packages/[slug]`): Redesigned with tier comparison + benchmark sections, 7 packages enriched
- **Intelligence** (`/intelligence/[id]`): Full benchmark, 693 features enriched with feature_cards/faqs
- **Specialty Rooms** (`/specialty-rooms/[slug]`): Full benchmark, 22 rooms enriched
- **Locations** (`/locations/[slug]`): Converted from 7 static pages to dynamic route + new API + DB seeded
- **Case Studies** (`/case-studies/[slug]`): Redesigned, fixed API fallback to projects collection

### Phase 2: Standalone Pages (15+ pages)
- `/experience-centre`, `/about`, `/process`, `/amc-packages`, `/consultation`, `/faq`, `/work-with-us`, `/testimonials`, `/contact`, `/support`, `/investment-pricing`, `/warranty`, `/certification-standard`, `/media`, `/partner-with-us`

### Phase 3: SEO/Geo Pages — Visual Redesign (Feb 26, 2026) 
- Created shared `GeoPageTemplate.tsx` with benchmark design
- Batch-rewrote all **34 geo pages** to use the template

### Phase 3B: Geo Pages — Database-Driven + CMS (Feb 26, 2026)
- **Backend API**: Full CRUD at `/api/geo-pages` with slug-based routing (`/api/geo-pages/slug/{path}`)
- **MongoDB Collection**: `geo_pages` with 34 seeded documents, unique slug index
- **API Fetching**: GeoPageTemplate fetches from API on mount, falls back to static props
- **Admin CMS**: Rich editing panel at `/admin/geo-pages` with:
  - List view with search/filter, grouped by region
  - Stats cards (Total, Dubai, Abu Dhabi, International)
  - Full edit form: Hero, Stats, Communities, Services, FAQs, CTA sections
  - Add/remove array items (communities, services, FAQs, stats)
  - Save to MongoDB via PUT API
- **Test Results**: 100% pass — 17/17 backend tests, 4/4 frontend, all admin CMS features

## Remaining / Backlog

### P0 — Admin CMS Extensions for Other Content Types (NOT STARTED)
- Add CMS editing for: Packages, Intelligence, Specialty Rooms content enrichment fields
- These sections have API support but no admin UI for editing enriched fields

### P1 — Brand Pages Redesign (Deferred by user)
- Backend model updated, enrichment script created
- Frontend page + admin CMS still needed

### P2 — Projects Landing Page Redesign (Deferred by user)

### P3 — Site-wide Consistency Review

## Key API Endpoints
- `GET /api/geo-pages` — List all geo pages
- `GET /api/geo-pages/slug/{slug}` — Get geo page by path slug
- `PUT /api/geo-pages/slug/{slug}` — Update geo page by slug
- `POST /api/geo-pages` — Create new geo page
- `DELETE /api/geo-pages/slug/{slug}` — Delete geo page
- `GET/PUT /api/locations/{slug}` — Dynamic locations
- `GET /api/packages/{slug}`, `/api/intelligence/{slug}`, `/api/specialty-rooms/{slug}`, `/api/projects/{slug}`

## Key Files
- `/app/frontend/components/geo/GeoPageTemplate.tsx` — Shared geo template with API fetch
- `/app/backend/routes/geo_pages.py` — Geo pages CRUD API
- `/app/frontend/app/admin/geo-pages/page.tsx` — Admin CMS for geo pages
- `/app/frontend/app/solutions/[slug]/SolutionClient.tsx` — Benchmark reference
- `/app/frontend/app/admin/cms/page.tsx` — Main admin CMS panel

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
