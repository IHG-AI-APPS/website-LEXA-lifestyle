# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. Major feature: comprehensive product catalog system with individual product pages, search/filter, and integration across the site.

## Core Requirements
- Dark luxury aesthetic with gold (#C9A962) accents, dark and light mode
- Full-stack: Next.js 14 frontend + FastAPI backend + MongoDB
- Dynamic content managed via admin panel
- Responsive design for all devices

## What's Been Implemented

### Product Catalog Feature (Complete)
- **217 products** across 19 brands, 7 categories, 35 series
- **All product images** downloaded to server (`/app/backend/uploads/products/`)
- **Descriptions**: 217/217 (100%) - pulled from WP REST API + manual enrichment
- **Specifications**: 208/217 (96%) - parsed from WP content into structured key:value format
- **Features**: 160/217 (74%) - extracted bullet-point features
- **Backend API**: `/api/catalog/products` with search, filter (category/brand/series/brand_slug), sort, pagination
- **Frontend Catalog** (`/products`): Sidebar filters, search, sort, pagination, URL query params
- **Frontend Detail** (`/products/[slug]`): Breadcrumb, image, description, KEY FEATURES bullets, SPECIFICATIONS table (two-column key:value), related products, CTA
- **Brand Integration**: Brand detail pages fetch+display catalog products by `brand_slug`, organized by series
- **Footer**: "Product Catalog" link added

### Data Enrichment Pipeline
1. WP REST API bulk fetch (269 WP products → matched 205 to catalog)
2. Smart parser: separates descriptions from specs, handles structured WP metadata
3. Brand description templates for products with spec-only WP content
4. Manual enrichment for remaining 14 products (Axxess cables, Artesania racks)

### Previously Completed Features
- Virtual Tour, Testimonials page, Service Worker v5, AI persona images
- Homepage CTA band, accessibility, client logos, tablet caching fix

## Architecture
```
/app/backend/
  routes/product_catalog.py     # Catalog API
  models/product.py             # Product Pydantic models
  seeds/seed_products.py        # Initial 217-product seed
  seeds/enrich_products.py      # WP REST API enrichment
  uploads/products/             # 218 product images

/app/frontend/
  app/products/page.tsx         # Catalog with filters
  app/products/[slug]/page.tsx  # Detail: desc + features + specs table
  app/brands/[slug]/page.tsx    # Brand pages with catalog products
```

## Test Status
- iteration_82: Backend 13/13, Frontend 94% (fixed URL params)
- iteration_83: Backend 14/14 (100%), Frontend 16/16 (100%)
- iteration_84: Backend 12/13, Frontend 100% (14 missing descriptions → fixed)
- Current: 217/217 descriptions, 208 specs, 160 features

## Prioritized Backlog
### P1
- Admin UI for product CRUD management
- Add "Products" link to header navigation

### P2
- Compare Packages feature
- Product recommendations engine
- Advanced full-text search
