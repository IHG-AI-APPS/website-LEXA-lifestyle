# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. The latest major feature request is a comprehensive product catalog system with individual product pages, search/filter, and integration across the site.

## Core Requirements
- Dark luxury aesthetic with gold (#C9A962) accents on charcoal backgrounds
- Supports both dark and light mode themes
- Full-stack: Next.js 14 frontend + FastAPI backend + MongoDB
- Dynamic content managed via admin panel
- Multi-language support (English/Arabic)
- Responsive design for all devices

## What's Been Implemented

### Product Catalog Feature (Completed - March 2026)
- **Backend API**: Full CRUD at `/api/catalog/products`, `/api/catalog/categories`, `/api/catalog/brands`, `/api/catalog/series`
- **Database**: 217 products seeded across 19 brands, 7 categories, 35 series in `catalog_products` collection
- **Product Images**: All 217 product images downloaded from live site and stored on server at `/app/backend/uploads/products/`
- **Frontend Catalog Page** (`/products`): Search, filter (category/brand/series), sort, pagination (24/page), URL query param support
- **Frontend Detail Page** (`/products/[slug]`): Breadcrumb, large image, brand/category tags, related products, consultation CTA
- **Brand-to-Product Mapping**: Each brand detail page fetches and displays catalog products using `brand_slug` field
  - Products organized by series/sub_category with gold accent bars and counts
  - Brands without catalog products correctly hide the products section
  - "View All in Catalog" button links to filtered product catalog
- **Brands Integration**: Brand cards show "View Products" link; brand detail sidebar has "View {Brand} Products" button
- **Footer**: "Product Catalog" link added to Company section
- **Suspense Boundary**: Proper Next.js 14 handling for `useSearchParams()`

### Previously Completed Features
- Virtual Tour with createPortal fix for CSS stacking contexts
- Full Testimonials page at `/testimonials`
- Service Worker v5 with advanced caching
- AI-generated imagery for persona pages
- Homepage CTA band and hero optimization
- Tablet view caching fix via sw.js no-cache headers
- Accessibility enhancements (focus-visible, ARIA landmarks)
- Client logo text-based brand integration

## Architecture
```
/app/backend/
  routes/product_catalog.py   # Catalog API (search/filter/pagination/CRUD)
  models/product.py           # Product Pydantic models
  seeds/seed_products.py      # Seed script (217 products from live site)
  uploads/products/           # 218 product images stored locally

/app/frontend/
  app/products/page.tsx       # Product catalog with filters
  app/products/[slug]/page.tsx # Individual product detail
  app/brands/[slug]/page.tsx  # Brand detail with catalog products
```

## Key Technical Decisions
- Product images stored locally (not external URLs) for production reliability
- `brand_slug` field added to each catalog product for efficient brand-page lookups
- Separate `catalog_products` MongoDB collection (distinct from legacy `product_categories`)
- API prefix `/api/catalog/` to avoid conflicts with existing `/api/products` endpoint
- Products organized by `sub_category` (series) on brand detail pages

## Test Status
- Backend: 14/14 API tests passing (100%)
- Frontend: 16/16 UI tests passing (100%)
- Test reports: `/app/test_reports/iteration_82.json`, `/app/test_reports/iteration_83.json`

## Prioritized Backlog
### P1 - Next Up
- Admin UI for product management (CRUD interface in admin panel)
- Product descriptions and specifications population
- Header navigation update to include Products link

### P2 - Future
- Compare Packages feature (previously scrapped, revisitable)
- Product recommendations engine
- Advanced product search (full-text with relevance scoring)
