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
- **Brands Integration**: Brand cards show "View Products" link; brand detail pages have "View {Brand} Products" button
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
```

## Key Technical Decisions
- Product images stored locally (not external URLs) for production reliability
- Separate `catalog_products` MongoDB collection (distinct from legacy `product_categories`)
- API prefix `/api/catalog/` to avoid conflicts with existing `/api/products` endpoint
- Suspense boundary for Next.js 14 `useSearchParams()` compatibility

## Prioritized Backlog
### P1 - Next Up
- Admin UI for product management (CRUD interface in admin panel)
- Product descriptions and specifications population (currently seeded without descriptions)

### P2 - Future
- Compare Packages feature (previously scrapped, revisitable)
- Product recommendations engine
- Advanced product search (full-text with relevance scoring)
