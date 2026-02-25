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

### Phase 2: Standalone Pages — Batch 1 (Feb 25, 2026)
- `/experience-centre` — Split hero, facilities grid, booking modal, stats
- `/about` — Hero, values, journey timeline, brand partners, team section
- `/process` — 5-phase process with activities and deliverables
- `/amc-packages` — 3 AMC tiers with feature comparison
- `/consultation` — 3 consultation types, booking modal, process steps
- `/faq` — Search, dynamic FAQ loading from solutions/services APIs
- `/work-with-us` — Expertise areas, benefits, expandable job cards
- `/testimonials` — API-driven testimonial grid with ratings

### Phase 2: Standalone Pages — Batch 2 (Feb 25, 2026)
- `/contact` — Contact form with sidebar quick links
- `/support` — Emergency scenarios, AMC benefits, support contacts
- `/investment-pricing` — 3 commercial tiers, ROI factors, investment breakdown
- `/warranty` — Warranty coverage, exclusions, claim process
- `/certification-standard` — 6 engineering standards, certifications, QA metrics
- `/media` — Video gallery with categories (fixed broken import)
- `/partner-with-us` — Partner types, benefits, application form

## Remaining / Backlog

### P0 — Brand Pages Redesign (Deferred by user)
- Backend model updated, enrichment script created
- Frontend page + admin CMS still needed

### P1 — Admin CMS Extensions
- Add editing forms for enriched fields on: Packages, Intelligence, Specialty Rooms, Locations

### P2 — Projects Pages Redesign (Deferred by user)

### P3 — SEO/Geo Pages (30+ city-specific pages)
- `/dubai/palm-jumeirah-smart-homes`, `/saudi-arabia/riyadh-smart-homes`, etc.

## Key Files
- `/app/frontend/app/solutions/[slug]/SolutionClient.tsx` — Benchmark reference
- `/app/frontend/app/services/[slug]/page.tsx` — Services benchmark
- `/app/frontend/app/packages/[slug]/page.tsx` — Packages benchmark
- `/app/frontend/app/intelligence/[id]/page.tsx` — Intelligence benchmark
- `/app/frontend/app/specialty-rooms/[slug]/page.tsx` — Specialty rooms benchmark
- `/app/frontend/app/locations/[slug]/page.tsx` — Locations dynamic page
- `/app/frontend/app/case-studies/[slug]/page.tsx` — Case studies benchmark
- `/app/frontend/app/experience-centre/page.tsx` — Experience centre
- `/app/frontend/app/about/page.tsx` — About page
- `/app/frontend/app/process/page.tsx` — Process page
- `/app/frontend/app/admin/cms/page.tsx` — Admin CMS panel
- `/app/backend/routes/locations.py` — Locations API

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
