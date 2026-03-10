# LEXA Smart Home - Product Requirements Document

## Project Overview
A premium smart home solutions website with dynamic content management, product catalog, package builder, and admin panel.

## Core Features Implemented

### External Storage & CDN Migration ✅
- All images migrated to `files.ihgbrands.com/lexa/`
- SFTP-based file uploads via `paramiko`
- WebP image optimization (>90% size reduction)
- Nginx caching and compression configured

### Admin Panel ✅
- Dashboard with analytics
- Product catalog management (CRUD)
- Brand management with logo uploads
- File Manager at `/admin/files`
- CSV import/export for products

### Frontend Features ✅
- Package Builder with customization
- Product catalog with advanced search
- Brand pages with category filtering
- Solution pages
- Multi-image product galleries

### Recent Fixes (March 2026)

#### March 7, 2026 - Blog Fix & Modal Scroll Fix
- **Fixed:** Blog admin page error (client-side exception)
  - Issue: Page was showing "Application error: a client-side exception has occurred"
  - Cause: Frontend build cache issue
  - Solution: Rebuilt frontend to fix the issue

- **Fixed:** Frontend modal scrolling - background moving when scrolling modal
  - Updated all frontend modals with `onWheel={(e) => e.stopPropagation()}`
  - Files fixed:
    - `ConsultationForm.tsx`
    - `BookingModal.tsx`
    - `ScheduleVisitModal.tsx`
    - `PersonaModal.tsx`
    - `QuickViewModal.tsx`

#### March 7, 2026 - Project Type/Category Dropdowns & Admin CRUD
- **New Feature:** Project Types and Categories Management
  - Created new admin page at `/admin/project-settings` with tabs for Types and Categories
  - Full CRUD functionality for both Project Types and Categories
  - Backend API endpoints: `/api/project-types`, `/api/project-categories`
  - Admin API endpoints: `/api/admin/project-types/*`, `/api/admin/project-categories/*`
  - Seeded with initial data: Residential, Commercial, Villa (types) and Residential, Smart Villa, Penthouse (categories)

- **Updated:** Project form now uses dropdowns instead of input fields for Type and Category
  - Type dropdown populated from `project_types` collection
  - Category dropdown populated from `project_categories` collection
  - Files updated: `/app/frontend/app/admin/projects/page.tsx`

#### March 7, 2026 - Modal Refactoring & Button/Text Visibility Fix
- **Fixed (P0):** All admin panel modals refactored to use reusable Modal component
  - Issue: Modals across the admin panel had inconsistent behavior - off-center, not scrollable, cut off content
  - Solution: Created centralized `Modal` component at `/app/frontend/components/ui/Modal.tsx`

- **Fixed (P0):** Admin Panel Button and Text Visibility Issues
  - Issue: Action buttons (Edit/Delete) had invisible icons on dark backgrounds
  - Cause: `outline` variant in Button component used black border/text on dark backgrounds
  - Solution: Updated `Button`, `Input`, `Textarea`, and `Checkbox` components with proper dark mode support
  - Files updated:
    - `/app/frontend/components/ui/button.tsx` - Updated outline variant with gray borders and proper dark mode colors
    - `/app/frontend/components/ui/input.tsx` - Added dark mode background and text colors
    - `/app/frontend/components/ui/textarea.tsx` - Added dark mode support
    - `/app/frontend/components/ui/checkbox.tsx` - Added dark mode border and checked state colors

- **Fixed:** Package Builder tier change not working
  - Issue: When navigating with URL params (e.g., `?property=luxury-villas-mansions&tier=enhanced`), clicking "Change tier" wouldn't navigate back to tier selection
  - Solution: Added `tierAutoSelected` flag to prevent useEffect from re-triggering after initial auto-selection

- **Fixed:** Modal scrolling - background was moving when scrolling modal content
  - Solution: Updated Modal component with proper scroll containment
  
- **Verified:** All Admin Panel CRUD operations working correctly
  - Projects: 19 items, Brands: 37 items, Articles: 53 items

- **Fixed:** Brand logos not visible in dark mode
  - Issue: Logo images with dark content on transparent background invisible on dark cards
  - Solution: Added inline `backgroundColor: '#ffffff'` to logo containers
  - File: `/app/frontend/app/brands/page.tsx`

- **Fixed:** Page navigation not scrolling to top
  - Issue: Lenis smooth scroll library was intercepting window.scrollTo
  - Solution: Updated SmoothScrollProvider with context API to expose scrollToTop function
  - Files: `SmoothScrollProvider.tsx`, `ClientLayout.tsx`

- **Fixed:** Modals appearing off-screen on long pages
  - Issue: Modals with `fixed` positioning were inheriting incorrect stacking context from parent elements, and transform-based centering (`-translate-x-1/2 -translate-y-1/2`) was being overridden by framer-motion
  - Solution: Used flex container wrapper (`fixed inset-0 flex items-center justify-center`) with portal to document.body, and added body scroll lock
  - Files: `ConsultationForm.tsx`, `ScheduleVisitModal.tsx`, `QuickViewModal.tsx`, `BookingModal.tsx`, `PersonaModal.tsx`, `ExitIntentPopup.tsx`
  - Pattern: Wrapper div with flex centering + absolute backdrop + relative modal content

#### March 7, 2026 - Main Site Modal Refactoring (P1 Task Completed)
- **Refactored (P1):** All main site modals now use the reusable Modal component
  - Previously: Each modal had its own implementation with createPortal, scroll lock, backdrop, etc.
  - After: All modals use centralized `Modal` component for consistency and maintainability
  - Files refactored:
    - `/app/frontend/components/forms/ConsultationForm.tsx` - Uses Modal component
    - `/app/frontend/components/modals/BookingModal.tsx` - Uses Modal component  
    - `/app/frontend/components/sections/PersonaModal.tsx` - Uses Modal component
    - `/app/frontend/components/widgets/ScheduleVisitModal.tsx` - Uses Modal component
    - `/app/frontend/components/widgets/ExitIntentPopup.tsx` - Uses Modal component
    - `/app/frontend/components/QuickViewModal.tsx` - Keeps custom implementation for mobile slide-up behavior
  - Modal features verified (100% pass rate):
    - ESC key closes modal
    - Backdrop click closes modal
    - X button closes modal
    - Body scroll lock prevents background scrolling
    - Proper z-index and portal rendering
    - data-testid attributes for automation testing

#### March 10, 2026 - Dark Mode Visibility Audit & Fix ✅
- **Fixed (P0):** "Related Solutions" heading invisible in dark mode
  - **Issue:** Section used `bg-gradient-to-b from-white to-gray-50` which doesn't have proper dark mode override
  - **Solution:** Changed to `bg-white dark:bg-[#0a0a0a]` for proper dark mode background
  - **File:** `/app/frontend/app/solutions/components/RelatedSolutions.tsx` line 47
  - The heading now uses white text (`dark:text-white`) on dark background in dark mode

- **Verified (P0):** Comprehensive Dark Mode Audit - 100% Pass Rate
  - Tested all key pages: Homepage, Solutions, Brands, Packages, Admin Panel
  - Theme toggle working correctly (sun/moon icons in header)
  - localStorage persistence using 'lexa-theme' key
  - All headings, body text, cards, and form inputs visible in dark mode
  - Testing agent verified all dark mode text colors:
    - Headings: rgb(255, 255, 255) - white
    - Body text: rgb(156, 163, 175) - gray-400
    - Muted text: rgb(113, 113, 122) - zinc-500
    - Gold accent: rgb(201, 169, 98) - #C9A962

- **Verified (P1):** Quick View button on project cards - No Touch Shifting
  - **Status:** Button position verified stable during touch interactions
  - Position remains at `x: 129.5, y: 388.5` throughout touch events
  - Button uses `left-1/2 -translate-x-1/2` centering which is stable

#### March 9, 2026 - File Upload Security Restrictions ✅
- **Security Enhancement:** Implemented strict file upload validation
  - **Allowed extensions:** jpg, jpeg, png, webp, pdf
  - **Blocked extensions:** php, exe, js, sh, bat, cmd, ps1, vbs, jar, py, rb, pl, cgi, asp, aspx, jsp, htaccess, html, htm, svg
  - Added `validate_file_security()` function that checks both file extension AND content-type
  - Logs warning for blocked upload attempts
  - File: `/app/backend/routes/uploads.py`

#### March 9, 2026 - Google Maps Embed Management ✅
- **New Feature (P0):** Google Maps Embed Code management in Admin Panel
  - Added `google_maps_embed` field to Site Settings > Contact Info tab
  - Includes live preview of the map when URL is entered
  - Contact page dynamically uses the saved embed URL with fallback
  - Instructions provided on how to get embed URL from Google Maps
  - Files modified: `/app/frontend/app/admin/site-settings/page.tsx`, `/app/frontend/hooks/useSiteSettings.tsx`, `/app/frontend/app/contact/page.tsx`

#### March 9, 2026 - Dynamic Content Integration Complete ✅
- **Completed (P0):** Full dynamic content integration for contact information
  - All contact info (phone, email, HR email, social links) now managed from Site Settings admin panel
  - Components updated to use `useSiteSettings()` hook:
    - `Header.tsx` - Dynamic header logos (header_logo_light/dark)
    - `Footer.tsx` - Dynamic social links and footer logo
    - `ConsultationForm.tsx` - Dynamic contact email in error messages
    - `FinalCTA.tsx` - Dynamic phone, email, address
    - `GalleryFooterCTA.tsx` - Dynamic contact info
    - `work-with-us/page.tsx` - Dynamic HR email for job applications
    - `careers/Content.tsx` - Dynamic HR email, company phone, address
    - `support/Content.tsx` - Dynamic emergency phone, WhatsApp, support email
  - API: `/api/site-settings` provides all settings from `site_settings` collection

- **Fixed (P1):** Project card Quick View button shifting on touch devices
  - **Root Cause:** Button used `inset-x-0 mx-auto w-fit` which caused layout shifts
  - **Solution:** Changed to `left-1/2 -translate-x-1/2` for stable centering
  - Files fixed: `/app/frontend/app/projects/page.tsx`, `/app/frontend/app/blog/page.tsx`
  - Added `active:bg-[#C9A962] active:text-white` for consistent touch feedback

#### March 9, 2026 - Project CRUD & Blog CRUD Critical Bug Fixes (RESOLVED)
- **Fixed (P0 - RECURRING CRITICAL):** Admin Projects CRUD not working reliably
  - **Root Cause:** Admin page was using public `/api/projects` endpoint which filters by `published=True`
  - **Solution:** Created new admin-specific endpoint `GET /api/admin/projects` that returns ALL projects without filtering
  - Files modified: `/app/backend/server.py`, `/app/frontend/lib/adminApi.ts`, `/app/frontend/app/admin/projects/page.tsx`

- **Fixed (P0):** Blog/Articles CRUD not working - validation errors
  - **Root Cause:** Blog form was missing required fields: `id`, `read_time`, `published_date`
  - **Solution:** Added missing fields to form submission in `/app/frontend/app/admin/blog/page.tsx`
  - Now generates unique id (`blog-{timestamp}`), sets default read_time (5), and published_date (today)

- **Fixed (LOW):** Cache invalidation for articles
  - **Issue:** Newly created articles not appearing in list due to cache key mismatch
  - **Solution:** Added `delete_prefix()` method to cache and updated article CRUD to clear all `articles:*` cache keys
  - Files modified: `/app/backend/utils/cache.py`, `/app/backend/server.py`

- **Testing Results:** 100% pass rate for both Project and Blog CRUD operations
  - User verification steps:
    1. Login to admin panel at `/admin/login`
    2. Navigate to Projects → Add/Edit/Delete should work immediately
    3. Navigate to Blog → Add/Edit/Delete should work immediately

#### March 7, 2026 - Team Members CRUD & Admin Panel Restructure
- **New Feature (P1):** Team Members CRUD Module
  - Backend API endpoints:
    - `GET /api/team-members` - Public endpoint for active team members
    - `GET /api/admin/team-members` - Admin endpoint for all team members
    - `POST /api/admin/team-members` - Create team member
    - `PUT /api/admin/team-members/{id}` - Update team member
    - `DELETE /api/admin/team-members/{id}` - Delete team member
  - Admin page: `/app/frontend/app/admin/team-members/page.tsx`
  - Features: Name, Role, Photo upload, Bio, LinkedIn, Email, Display order, Active toggle
  - Files created/modified:
    - `/app/backend/server.py` - Added TeamMember model and API endpoints
    - `/app/frontend/lib/adminApi.ts` - Added TeamMember API functions
    - `/app/frontend/app/admin/team-members/page.tsx` - New admin page
    - `/app/frontend/components/sections/TeamSection.tsx` - Now fetches dynamically from API

- **Improved (P1):** Admin Panel Sidebar Restructured
  - Organized into 9 logical groups:
    1. Overview (Dashboard, Sales Intelligence, Analytics)
    2. Leads & CRM (All Leads, Smart Home Leads, Submissions, WhatsApp)
    3. Content (Projects, Project Settings, Articles, Blog, News, Videos, Testimonials, FAQs)
    4. Products & Services (Solutions, Services, Brands, Products, etc.)
    5. Smart Home Systems (Intelligence Features, Control Systems, Packages, etc.)
    6. Website (Team Members, Mega Menu, CMS, File Manager)
    7. SEO & Localization (SEO Tools, Geo Pages, Locations, Arabic Pages)
    8. Marketing & Testing (A/B Testing, Tracking Pixels)
    9. System (Activity Logs, System Health, API Test Results)
  - Collapsible groups with chevron indicators
  - Active group highlighting
  - File: `/app/frontend/app/admin/layout.tsx`

- **Fixed (P1):** Project CRUD Performance & Delete Issues
  - Added loading states (saving/deleting spinners) to provide feedback during operations
  - Delete button shows spinner and disables during operation
  - Save button shows "Saving..." with spinner
  - Verified all CRUD operations work correctly via API testing (100% pass rate)
  - File: `/app/frontend/app/admin/projects/page.tsx`

#### March 6, 2026
- **Fixed:** Brand names partially hidden in Featured Partners section
  - Increased card height and improved text visibility
  - Changed text color to `dark:text-white` for better contrast

## Known Data Issues
- Most brands have empty `logo` field in database
- Bang & Olufsen has wrong logo (shows LEXA logo instead)
- Users should upload correct logos via Admin Panel

## Architecture

```
/app
├── backend/
│   ├── main.py
│   ├── admin_api.py
│   ├── core/storage.py (SFTP management)
│   └── routes/
├── frontend/
│   ├── app/(main)/
│   │   ├── brands/page.tsx (brand listing)
│   │   └── package-builder/page.tsx
│   └── app/(admin)/
│       └── files/page.tsx (File Manager)
```

## API Endpoints
- `GET /api/brands` - List all brands
- `GET /api/admin/files` - List SFTP files
- `POST /api/upload/image` - Upload to SFTP

## External Integrations
- SFTP Server: `files.ihgbrands.com`
- Gemini Nano Banana (Image Gen)
- OpenAI GPT (AURA chatbot)
- WhatsApp/Interakt
- Gmail SMTP, Google Maps

## Backlog (P1)
- Connect Homepage hero content (title, subtitle, images, video) to Site Settings
- Implement dynamic favicon management from Site Settings
- Compare Packages feature
- Additional brand logos upload (Note: Most brands have empty `logo` field in database)
- Performance optimization

## Backlog (P2)
- Incorrect Brand Logo Data - Database has missing/incorrect logo URLs for some brands

## Completed in Recent Sessions
- ✅ Dark mode visibility audit - All pages verified working
- ✅ "Related Solutions" heading visibility fixed
- ✅ Project card Quick View button touch stability verified
- ✅ Dynamic content integration (contact info, logos, maps)
- ✅ File upload security restrictions
- ✅ Google Maps embed management
- ✅ Careers page dynamic content
- ✅ Homepage statistics management (admin panel)

## Credentials
- Admin: `/admin/login` - admin / lexa2026
- SFTP: 178.128.28.178 - root / IhG@1HGB$2026$W3b
