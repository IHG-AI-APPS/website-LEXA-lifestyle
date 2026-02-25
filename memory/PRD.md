# LEXA Smart Home Platform - Product Requirements Document

**Version**: 10.0  
**Last Updated**: February 25, 2026  
**Status**: Full Site-Wide CMS Complete (137 sections)

---

## Latest Updates (v10.0)

### Site-Wide CMS Expansion (Feb 25, 2026)

**STATUS: COMPLETED & TESTED (100%)**

#### Coverage: 137 CMS Sections (up from 17)
**Homepage (4):** Hero, Experience CTA, Calculator Cards, Partners & Trust  
**Core Pages (6):** About, Contact, Consultation, Experience Centre, Footer, Careers  
**Services (7):** Home Theater, Smart Lighting, Home Cinema, Villa Automation, Outdoor Audio, High-End Audio, Multi-Room Audio  
**Solutions (43):** All solution pages including access-control, security, home-theater, home-cinema, lighting-automation, climate-control, motorized-shades, networking, surveillance, energy-management, bms-automation, plus all cultural-automation sub-pages, marine, yacht, conference, auditorium pages, etc.  
**Locations (41):** All Dubai, Abu Dhabi, Saudi Arabia, Qatar, Bahrain, Oman, Kuwait, Jordan, Kenya, Nigeria, Egypt, Morocco, Lebanon geo pages, plus UAE emirate pages and location detail pages  
**Content Pages (32):** FAQ, Process, Company, AMC Packages, Architects, Contractors, Developers, Certification, Enterprise Platform, Digital Twin, Villa Designer, Virtual Showroom, and more  
**Personas (4):** Architect, Commercial, Developer, Homeowner

#### Architecture:
- **SeoLandingPageTemplate CMS Integration**: Added optional `cmsKey` prop to the template. When provided, fetches CMS data and overrides hardcoded props at section level (hero, audience, problems, deliverables, process, section6, trustSignals, conversion). 35 solution template pages use this pattern.
- **Generic useCms Integration**: 8 non-template solution pages, 33 geo page client components, and 38 misc/persona pages have useCms hooks for CMS data override with hardcoded fallbacks.
- **Admin CMS Page**: Comprehensive admin at `/admin/cms` with 7 category tabs, search functionality, and 3 specialized editors:
  - **SeoTemplateEditor**: Structured form for all SeoLandingPageTemplate sections
  - **GeoPageEditor**: Structured form for location pages (header, communities, services, FAQs, stats)
  - **GenericPageEditor**: JSON editor for misc/persona pages
- **Backend API**: `GET /api/cms/sections/{key}` (single), `GET /api/cms/sections?keys=...` (bulk), `PUT /api/admin/content/settings/{key}` (save with cache invalidation)

#### Key Technical Decision:
- Pages use hardcoded content as fallback when no CMS data exists in the database
- Admin edits create/override CMS entries that take priority over hardcoded defaults
- No seeding required for new sections - they work immediately with fallback content

---

## Original Problem Statement

The user requires a fully dynamic, high-performance website for LEXA Smart Home, a luxury smart home automation company in the UAE. Key requirements:
1. **Fully Dynamic Content**: Every content element must be editable through an admin panel
2. **Performance Optimization**: Super fast website based on Lighthouse report findings
3. **SEO & Accessibility**: Proper metadata management and accessibility compliance

## User Personas
- **Admin/Content Manager**: Manages all website content through the admin panel
- **Prospective Client**: High-net-worth homeowner in UAE/GCC browsing solutions
- **Architect/Developer**: Professional partner exploring smart home integration

## Core Requirements
- Dynamic CMS for all 137+ content sections
- Admin panel for content management
- Performance-optimized frontend
- SEO management capabilities

---

## Phased Implementation Plan

### Phase A: Dynamic Content (COMPLETED - 100%)
- ✅ CMS backend API with caching
- ✅ Admin CMS editor with structured forms
- ✅ useCms hook for frontend data fetching
- ✅ 137 sections across all page types
- ✅ All solution, geo, content, persona pages CMS-enabled

### Phase B: Performance Optimization (P1 - PENDING)
- Image optimization (WebP, next/image)
- Code splitting & lazy loading
- Font optimization
- JavaScript payload reduction

### Phase C: Final Polish (P2 - PENDING)
- Robust caching strategy
- SEO metadata via CMS
- Accessibility fixes
- Final validation against audit reports

---

## Key Files
- `/app/frontend/app/admin/cms/page.tsx` - Admin CMS editor (137 sections, 7 tabs)
- `/app/frontend/hooks/useCms.ts` - Reusable CMS hook
- `/app/frontend/components/templates/SeoLandingPageTemplate.tsx` - CMS-aware template for solution pages
- `/app/backend/routes/content.py` - Public CMS API endpoints
- `/app/backend/routes/admin_content.py` - Admin CMS save endpoints

## Key API Endpoints
- `GET /api/cms/sections/{key}` - Fetch single CMS section
- `GET /api/cms/sections?keys=key1,key2` - Bulk fetch CMS sections
- `PUT /api/admin/content/settings/{key}` - Save CMS section (admin)

## Database Schema
- **cms_settings (settings collection)**: `{ key: string, value: any }` - Stores all CMS content
