# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. Major feature: comprehensive product catalog system with individual product pages, search/filter, integration, admin CRUD, and smart recommendations.

## Core Requirements
- Dark luxury aesthetic with gold (#C9A962) accents, dark and light mode
- Full-stack: Next.js 14 frontend + FastAPI backend + MongoDB
- Dynamic content managed via admin panel
- Responsive design for all devices

## What's Been Implemented

### Product Catalog (Complete)

### Advanced Full-Text Search with Relevance Scoring (Complete - March 2026)
- **Backend**: Weighted MongoDB text index (name:10, brand:5, sub_category:3, category:3, description:1)
- **Backend**: `sort=relevance` option uses `$text` search with `$meta: textScore` ranking
- **Backend**: Partial word fallback to regex when $text returns no results
- **Frontend**: "Relevance" sort auto-activates when user types a search term
- **Frontend**: Sort reverts to "Name A-Z" when search is cleared
- **Frontend**: "Relevance" option hidden in dropdown when no search term is active
- Test: iteration_87 — Backend 15/16 (94%), Frontend 100%

### Bulk Import/Export & Product Image Gallery (Complete - March 2026)
- **CSV Export**: `GET /api/catalog/products/export` — downloads all products as CSV with pipe-separated multi-value fields
- **CSV Import**: `POST /api/catalog/products/import` — creates/updates products from CSV, matching by slug
- **Admin UI**: Export CSV & Import CSV buttons in `/admin/catalog` header
- **Image Gallery**: Multi-image support with interactive gallery on product detail page (thumbnail strip, navigation arrows, image counter)
- **Admin Gallery Upload**: MultiImageUpload component in product edit form (up to 10 images per product)
- Test: iteration_88 — Backend 100% (11/11), Frontend 100%

- **217 products** across 19 brands, 7 categories, 35 series
- All images stored locally, 100% descriptions, 96% specs, 74% features
- Backend API at `/api/catalog/` with search, filter, sort, pagination, CRUD
- Frontend catalog `/products`, product detail `/products/[slug]`
- Brand detail pages show catalog products organized by series
- "PRODUCTS" link in header and footer

### Product Recommendations Engine (Complete - March 2026)- **Backend**: `/api/catalog/recommendations/{slug}` — tiered content-based recommendations:
  - Tier 1: Same series (highest relevance)
  - Tier 2: Same brand + category
  - Tier 3: Same category (cross-brand)
  - Tier 4: Featured products (fallback)
  - Returns `_rec_reason` field for each recommendation
- **Backend**: `/api/catalog/featured` — 8 curated diverse products for homepage
- **Product Detail Pages**: "You May Also Like" (same-brand recs) + "Explore Other Brands" (cross-brand recs)
- **Homepage**: "Featured Products" section with 8 curated products in a 4-column grid
- 8 products marked as featured: Rotel Michi X5 S2, Borresen T5, Aavik I-880, Savant Touch 8, Leica Cine 1, Sonos Arc Ultra, E-electron DALI-2, Lifesmart Natur Switch

### Admin Product Management (Complete)
- Admin CRUD at `/admin/catalog` with search, filter, pagination
- Modal form with image upload, specs/features textareas, featured/published toggles

### Previously Completed
- Virtual Tour, Testimonials, Service Worker v5, AI persona images
- Homepage CTA band, accessibility, client logos, tablet caching fix

## Architecture
```
/app/backend/routes/product_catalog.py    # CRUD + recommendations + featured
/app/backend/models/product.py
/app/backend/seeds/seed_products.py       # 217-product seed
/app/backend/seeds/enrich_products.py     # WP REST API enrichment

/app/frontend/app/products/page.tsx       # Public catalog
/app/frontend/app/products/[slug]/page.tsx # Detail + recommendations
/app/frontend/app/admin/catalog/page.tsx  # Admin CRUD
/app/frontend/components/homepage/FeaturedProducts.tsx  # Homepage section
```

## Test Status
- iteration_86: Backend 13/13 (100%), Frontend 13/13 (100%) — Recommendations
- iteration_85: Backend 11/11 (100%), Frontend 14/14 (100%) — Admin CRUD
- iteration_83: Backend 14/14 (100%), Frontend 16/16 (100%) — Brand integration

## Prioritized Backlog
### P2
- Compare Packages feature
