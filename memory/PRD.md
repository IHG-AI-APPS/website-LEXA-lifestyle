# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. Website audit report identified 23 specific UI/UX and functional issues to fix across P0, P1, and P2 priorities.

## Core Architecture
- **Frontend**: Next.js (production mode with `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Luxury with gold (#C9A962) accent
- **Integrations**: OpenAI GPT (AURA chatbot), Gemini Nano Banana (avatar), WhatsApp/Interakt, Gmail SMTP, Google Maps, GA4, Meta Pixel

## What's Been Implemented

### Completed - P0 Fixes (All Done)
- Fixed Aura chatbot
- Corrected header logo in dark mode
- Added testimonials section to homepage
- Added Google Maps to contact page
- Improved Quick View button accessibility on mobile

### Completed - P1 Fixes (All Done - Feb 2026)
- Fixed package tier redirect: Apartment tier cards now link to `/package-builder` with correct query params
- Fixed catalogue page header/content overlap: Increased top padding from pt-20 to pt-24
- Improved Schedule Visit modal mobile responsiveness
- Dark mode fixes applied to packages page (Quick Tools Bar, property cards)

### Completed - P2 Fixes (All Done - Feb 2026)
- Fixed icon alignment in "Why Choose Us" / OurPromise section
- Blog author name fallback: Shows "LEXA Editorial" when author is "Aura"
- Footer social icons: Added TikTok and X/Twitter (6 total)

### Completed - Site-wide QA Pass (Mar 2026)
- Comprehensive QA across 15+ pages: 16/16 frontend features passed, 15/16 backend tests passed
- Fixed blog detail hero contrast in dark mode (added dark gradient background)
- All pages verified: Homepage, Solutions, Services, Projects, Blog, Packages, Catalogues, Contact, Brands, Experience Centre, Admin
- Dark mode toggle, mobile responsiveness (375px), header navigation, footer all verified working

### Completed - Service Worker v4 (Mar 2026)
- Upgraded from v3 to v4 with production-grade caching
- **Network-first** for critical CMS/settings data (always fresh when online)
- **Stale-while-revalidate** with 5-min TTL for regular API data
- **Cache-first** for immutable static assets
- **Branded offline fallback page** matching Dark Luxury theme
- **Cache size limits** (100 max API entries) with automatic eviction
- **Proper cache versioning** (old caches auto-cleaned on update)
- Never-cache list expanded (WhatsApp, schedule-visit, contact submissions)

### Completed - Major Features
- WhatsApp Admin Dashboard at `/admin/whatsapp`
- Quick View modal across Projects, Solutions, Blog pages
- Corrected all product pricing for Dubai market
- Site-wide design consistency pass (100+ pages)

## Data Summary
- 106 Solutions, 19 Services, 53 Articles, 19 Projects, 37 Brands, 6 Testimonials

## Admin Credentials
- URL: `/admin/login`
- Username: `admin`
- Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` header in `next.config.mjs`
- Frontend runs in production mode; changes require `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- All audit items complete. No pending issues.
- Potential: "Compare Packages" side-by-side feature for conversion optimization
