# LEXA Smart Home Platform - Product Requirements Document

**Version**: 10.2  
**Last Updated**: February 25, 2026  
**Status**: 100% Site-Wide CMS Coverage (234 pages)

---

## Original Problem Statement

The user requires a fully dynamic, high-performance website for LEXA Smart Home. Key requirements:
1. **Fully Dynamic Content**: Every content element must be editable through an admin panel
2. **Performance Optimization**: Super fast website based on Lighthouse report findings
3. **SEO & Accessibility**: Proper metadata management and accessibility compliance

---

## Phase A: Dynamic Content (COMPLETED - 100%)

### Coverage: 234 pages total
- **42 Admin pages**: Don't need CMS (they ARE admin tools)
- **191 Content pages**: All CMS-enabled
- **1 Redirect page**: No content (just a `redirect()`)

### CMS-Enabled Page Breakdown:
- **Solution Template Pages (35)**: SeoLandingPageTemplate with cmsKey prop + auto-seed
- **Non-Template Solution Pages (8)**: Direct useCms integration
- **Geo/Location Client Components (33)**: useCms in client components
- **Location Server Pages (11)**: CmsReg client component pattern
- **Listing Pages (12)**: useCms for headings/labels
- **Dynamic [slug] Routes (15)**: useCms/CmsReg for page chrome
- **Content Pages (25)**: useCms directly in client components
- **Server Content Pages (17)**: CmsReg wrapper pattern
- **Previously CMS-Enabled (17)**: Homepage, About, Contact, Services, Footer
- **Cultural Automation, Resources, Guides, Packages, Tools**: All covered

### Auto-Seed Feature:
- SeoLandingPageTemplate auto-seeds hardcoded content to CMS on first page visit
- Backend `POST /api/cms/register-defaults` (idempotent)
- Admin "Seed from Current" button for bulk seeding

### Admin CMS: 10 Category Tabs
1. **Homepage** (4 sections)
2. **Core Pages** (6 sections)
3. **Services** (7 sections)
4. **Solutions** (43 sections) - with structured SeoTemplate editor
5. **Locations** (52 sections) - with structured GeoPage editor
6. **Listing Pages** (12 sections)
7. **Detail Templates** (14 sections)
8. **Tools & Content** (16 sections)
9. **Other Pages** (36 sections)
10. **Personas** (4 sections)

### Architecture Patterns:
1. **SeoLandingPageTemplate CMS**: Template accepts `cmsKey` prop → fetches CMS → overrides hardcoded props
2. **Client Component useCms**: Direct `useCms(key, null)` in client pages
3. **Server Component CmsReg**: `<CmsReg />` client component renders null but registers CMS key

---

## Phase B: Performance Optimization (P1 - PENDING)
- Image optimization (WebP, next/image)
- Code splitting & lazy loading
- Font optimization
- JavaScript payload reduction

## Phase C: Final Polish (P2 - PENDING)
- Robust caching strategy
- SEO metadata via CMS
- Accessibility fixes
- Final validation against audit reports

---

## Key Files
- `/app/frontend/app/admin/cms/page.tsx` - Admin CMS (10 tabs, 190+ sections)
- `/app/frontend/hooks/useCms.ts` - CMS hook with seed utilities
- `/app/frontend/components/templates/SeoLandingPageTemplate.tsx` - CMS-aware template
- `/app/backend/routes/content.py` - CMS API endpoints

## Key API Endpoints
- `GET /api/cms/sections/{key}` - Single section
- `GET /api/cms/sections?keys=key1,key2` - Bulk fetch
- `POST /api/cms/register-defaults` - Idempotent seed
- `PUT /api/admin/content/settings/{key}` - Admin save

## Test Reports
- `/app/test_reports/iteration_16.json` - CMS expansion (100% pass)
- `/app/test_reports/iteration_17.json` - Seed feature (100% pass)
