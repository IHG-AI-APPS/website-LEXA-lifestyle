# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router, Production Build) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work (Latest First)

### Phase 49: Service Worker v3 — API Caching (P5) (Mar 2, 2026)
- **Stale-while-revalidate for API**: Responses from `/api/solutions`, `/api/projects`, `/api/articles`, `/api/services`, `/api/brands`, `/api/packages`, `/api/testimonials`, `/api/locations`, `/api/settings` cached with 5-minute TTL
- **Separate caches**: `lexa-static-v3` for immutable assets, `lexa-api-v1` for API data — clearable independently via `clearAPICache` message
- **Extended static caching**: Added `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.ico` to cacheable patterns
- **Smart TTL**: API responses stamped with `sw-cached-at` header — fresh cache served instantly, stale cache triggers background update
- **Offline fallback**: Returns JSON `{error: "offline"}` with 503 for failed API calls when no cache available
- **Testing**: 100% pass (iteration_74). Service worker content verified — correct cache names, API patterns, NEVER_CACHE exclusions.

### Phase 48: WhatsApp/Interakt Admin Management (P4) (Mar 2, 2026)
- **Admin API** (`/api/admin/whatsapp/`): Full CRUD for WhatsApp message templates — create, list, update status (pending/approved/rejected), delete
- **Integration status**: `/status` endpoint returns enabled state, token presence, template count, recent message logs, success/failure counts
- **Test messaging**: `/test` endpoint sends real template messages via Interakt (admin-only)
- **Message logging**: All sent messages logged to `whatsapp_logs` collection with timestamp, status, sender
- **Retry logic**: WhatsApp service enhanced with 2 retries + exponential backoff for 429 rate limits
- **Seeded templates**: 3 default templates (lead_notification=approved, booking_confirmation=pending, project_update=pending)
- **Testing**: 100% pass (iteration_74). 19 tests: auth protection (5), template CRUD (7), logs (1), service worker (6).

### Phase 47: Quick View Share Buttons — WhatsApp & Copy Link (Mar 2, 2026)
- **WhatsApp share**: Green branded button opens `wa.me/?text={title + URL}` in new tab
- **Copy Link**: Copies full page URL to clipboard, shows "Copied!" with checkmark for 2 seconds
- **Site-wide**: Both buttons appear on ALL Quick View modals (Projects, Solutions, Blog) via shared `QuickViewModal.tsx`
- **Testing**: 100% pass (iteration_73). 10 tests across all 3 pages — buttons visible, styled correctly, functionality verified.

### Phase 46: Quick View Modal for Blog Articles (Mar 2, 2026)
- **Blog integration**: "Quick View" button on article card image hover → opens modal with article image, title, category badge, excerpt (3 lines), tags, gold "View Full Details" CTA linking to /blog/{slug}
- **Consistent UX**: Same QuickViewModal component now used across Projects, Solutions, and Blog — unified interaction pattern site-wide
- **Testing**: 100% pass (iteration_72). 15 tests: hover reveal, modal content (image, title, category, excerpt, tags), close (X, Escape), CTA navigation, category filters, title click navigation.

### Phase 45: Quick View Modal for Projects & Solutions (Mar 2, 2026)
- **Shared component** (`/components/QuickViewModal.tsx`): Reusable modal with framer-motion animations, mobile bottom sheet (slides up), desktop centered overlay, backdrop blur, Escape/click-outside close
- **Projects page**: "Quick View" button appears on card image hover → opens modal with image, title, type/year badges, location, description (3 lines), system tags, gold "View Full Details" CTA
- **Solutions page**: Eye icon button added alongside arrow on each solution row → opens same modal with solution image, title, category, description, features
- **Mobile UX**: Modal acts as a bottom sheet with drag handle, rounded top corners, and full-width positioning on 390px viewport
- **Testing**: 100% pass (iteration_71). 12 tests: hover reveal, modal open/close (X, Escape, backdrop), CTA navigation, title click still navigates, mobile bottom sheet verified.

### Phase 44: Site-Wide Consistency Review (P2) — Mobile Optimization & Theme Cleanup (Mar 2, 2026)
- **H1 sizes standardized**: All 61+ pages changed from `text-4xl sm:text-5xl lg:text-6xl` to `text-3xl sm:text-4xl lg:text-5xl` — mobile-friendly 30px, desktop 48px
- **Hero backgrounds brightened**: 16 pages with `opacity-50` → `opacity-80`, 18 pages with heavy gradient → lighter `from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent`
- **Blue accents eradicated**: 34+ files with `text-blue-*`, `bg-blue-*`, `border-blue-*` → gold `#C9A962` equivalents
- **Purple/violet remnants removed**: Final 5 files cleaned (lexa-evolves, smart-home-quiz, analytics, enterprise-platform, blog slug)
- **Duplicate dark: classes cleaned**: 77 files with redundant `dark:text-white dark:text-white` patterns removed
- **Missing dark mode added**: 5 pages with `bg-white` only → `bg-white dark:bg-[#050505]`
- **Mobile container padding**: Standardized to `px-5 sm:px-8 lg:px-16` for proper mobile spacing
- **Hero padding**: Standardized to `py-16 lg:py-24` — compact on mobile
- **Hero description**: Made responsive `text-sm sm:text-base`
- **Testing**: 100% pass (iteration_70). 12 pages tested on mobile (390px) and desktop. Zero blue/purple, gold theme consistent.

### Phase 43: Projects Landing Page Redesign (P1) (Mar 2, 2026)
- **Listing page**: Redesigned with Dark Luxury theme — OLED black (#050505), gold pill filter buttons (#C9A962), project count display, category/year badges on cards, MapPin location icons, system tag chips, gold hover effects, CTA section
- **Detail page**: Full dark mode support — glass-morphism sidebar (bg-white/[0.03]), gold accent section headers, proper dark borders, gold CTA buttons, gold lightbox ring, removed all blue/purple remnants
- **Both pages**: Consistent with site-wide theme, proper dark:bg variants throughout, responsive design
- **Testing**: 100% pass (iteration_69). 12/12 backend + all frontend Playwright tests passed.

### Phase 42: Blog Page Visual Fixes — Hero Gradient & Image Distribution (Mar 2, 2026)
- **Hero gradient lightened**: Changed from `opacity-50` to `opacity-80`, gradient from `from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-[#0A0A0A]/30` to `from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent`. Background image now clearly visible.
- **Image distribution**: Redistributed 12 unique AI-generated images across 53 articles so first 12 articles (visible on page load) all have unique images. No adjacent cards share same image.
- **CSS cleanup**: Removed duplicate `dark:` classes, fixed article title hover color to gold `#C9A962` (was gray-600).
- **Data verification**: Confirmed 0 duplicate articles, all 53 articles have valid image URLs.
- **Testing**: 100% pass (iteration_68). Hero visible, images unique, filters working, hover effects verified.

### Phase 41: CRITICAL — 429 Root Cause Fix (Dark-First SSR + Theme Blocking) (Mar 1, 2026)
- **Root cause**: ThemeProvider defaulted to 'light' → SSR HTML had no `dark` class → browser rendered white bg before JS loaded. Combined with 429 blocking CSS chunks, page appeared permanently unstyled white.
- **Fixes**: (1) `<html class="dark">` now SSR'd in HTML, (2) Theme blocking script in `<head>` runs before first paint, (3) Inline CSS uses `!important` for dark bg, (4) Footer SVGs capped at 16px !important, (5) sr-only hidden with !important, (6) ThemeContext defaults to 'dark'
- **Impact**: Even if ALL CSS/JS chunks are 429'd, page now shows dark background with white text and no broken layout elements
- **Testing**: 100% pass (iteration_67). Stress tested desktop+mobile with 2s gap — zero white flash, zero 429 errors

### Phase 40: Service Worker for Static Asset Caching (Mar 1, 2026)
- **Service worker** (`/sw.js`): Cache-first for Next.js hashed static files (`/_next/static/`), stale-while-revalidate for fonts/images. Never caches API calls or analytics.
- **Registration**: Moved from `page.tsx` to `ClientLayout.tsx` for activation on any page
- **Benefit**: Return visits load instantly from cache, completely eliminating 429 rate limiting risk
- **Testing**: 100% pass rate (iteration_66). SW registers, caches verified, zero 429 errors.

### Phase 39: 429 Rate Limiting Defense — Inline Critical CSS + Chunk Optimization (Mar 1, 2026)
- **Inline critical CSS**: Added dark theme background (#050505), hidden sr-only, header positioning directly in `<head>` — page never appears unstyled even if CSS chunks are 429'd
- **Webpack chunk optimization**: Merged framer-motion + lucide-react + radix-ui into single `vendor-ui` chunk. Reduced initial requests from 35 → 24. Set minSize=80KB, maxSize=500KB, maxInitialRequests=12
- **CSS recovery script**: Auto-detects missing CSS on page load and performs one automatic reload
- **Font optimization**: Arabic fonts (Tajawal) changed to `preload: false` — reduces initial requests by 3
- **Testing**: 100% pass (iteration_65). CRITICAL: Desktop + mobile back-to-back load with zero 429 errors confirmed

### Phase 38: Staggered Hero Entrance Animations — Site-Wide (Mar 1, 2026)
- CSS-only approach with 6 utility classes and staggered delays across ALL pages

### Phase 37: Site-Wide Hero Standardization (Mar 1, 2026)
- 47 pages standardized with uppercase titles, center alignment, background images

### Phase 36: Project Builder + Site-Wide Purple-to-Gold Refactor (Mar 1, 2026)
- All purple/violet styling eliminated from 35+ files, replaced with Dark Luxury gold

### Phase 35: TypeScript Strict Mode + Site-Wide Design Consistency (Mar 1, 2026)
### Phase 34: Critical Bug Fix — Video Retry Loop / 429 Rate Limiting (Mar 1, 2026)
### Phase 33: Design Overhaul with Theme-Aware Dark/Light (Mar 1, 2026)
### Phase 32: Data Cleanup + Projects Tab Fix (Mar 1, 2026)
### Phases 27-31: Mobile UX, Quick Actions, Hero CTA, Image Performance, Native Gestures

## Design System
- **Light bg**: white / gray-50
- **Dark bg**: #050505 (OLED black)
- **Gold accent**: #C9A962 (light+dark)
- **Gold hover**: #E8DCC8
- **Glass cards (dark)**: bg-white/[0.03] border-white/[0.06]
- **Glass cards (light)**: bg-gray-50 border-gray-200
- **Theme toggle**: Uses `dark:` Tailwind variants throughout

## Remaining / Backlog
### P3 — Content Change History for admin CMS (SKIPPED by user)
### P6 — Admin panel theme alignment (internal tool)

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
