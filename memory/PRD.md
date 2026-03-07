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

#### March 7, 2026 - Modal Refactoring & Package Builder Fix
- **Fixed (P0):** All admin panel modals refactored to use reusable Modal component
  - Issue: Modals across the admin panel had inconsistent behavior - off-center, not scrollable, cut off content
  - Solution: Created centralized `Modal` component at `/app/frontend/components/ui/Modal.tsx` with:
    - React Portal for proper z-index management
    - AnimatePresence for smooth animations
    - Backdrop blur effect with proper scroll locking
    - ESC key handler
    - Internal content scrolling (prevents background scroll)
    - Configurable sizes: sm, md, lg, xl, full
  - Refactored 20+ admin pages to use the new Modal component

- **Fixed:** Package Builder tier change not working
  - Issue: When navigating with URL params (e.g., `?property=luxury-villas-mansions&tier=enhanced`), clicking "Change tier" wouldn't navigate back to tier selection
  - Cause: useEffect was re-triggering on step change, forcing user back to step 3
  - Solution: Added `tierAutoSelected` flag to prevent re-triggering after initial auto-selection
  - File: `/app/frontend/app/package-builder/page.tsx`

- **Fixed:** Modal scrolling - background was moving when scrolling modal content
  - Issue: When scrolling inside modal, background page would also scroll
  - Solution: Updated Modal component with `onWheel stopPropagation`, fixed header, and internal overflow-y-auto content area
  
- **Verified:** All Admin Panel CRUD operations working correctly
  - Projects: 19 items, Brands: 37 items, Articles: 53 items
  - All data preserved during refactoring

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
- Compare Packages feature
- Additional brand logos upload (Note: Most brands have empty `logo` field in database)
- Performance optimization

## Backlog (P2)
- Incorrect Brand Logo Data - Database has missing/incorrect logo URLs for some brands

## Credentials
- Admin: `/admin/login` - admin / lexa2026
- SFTP: 178.128.28.178 - root / IhG@1HGB$2026$W3b
