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
- Fixed package tier redirect: Apartment tier cards now link to `/package-builder` with correct query params (property + tier)
- Fixed catalogue page header/content overlap: Increased top padding from pt-20 to pt-24
- Improved Schedule Visit modal mobile responsiveness: Better width handling with `w-[calc(100%-2rem)]`
- Dark mode fixes applied to packages page (Quick Tools Bar, property cards)

### Completed - P2 Fixes (All Done - Feb 2026)
- Fixed icon alignment in "Why Choose Us" / OurPromise section: Icons now in gold-accent containers with proper dark mode support
- Blog author name fallback: Shows "LEXA Editorial" when author is "Aura" (DB already corrected to "LEXA Team")
- Footer social icons: Added TikTok and X/Twitter icons alongside existing Instagram, Facebook, LinkedIn, YouTube

### Completed - Major Features
- WhatsApp Admin Dashboard at `/admin/whatsapp`
- Quick View modal across Projects, Solutions, Blog pages
- Service Worker API caching (stale-while-revalidate)
- Corrected all product pricing for Dubai market
- Site-wide design consistency pass (100+ pages)

## Prioritized Backlog

### P1 - High
- Site-wide QA pass after all audit fixes

### P2 - Medium
- Refine service worker caching strategies
- Potential: standardize remaining button font sizes across all pages

## Admin Credentials
- URL: `/admin/login`
- Username: `admin`
- Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` header in `next.config.mjs`
- Frontend runs in production mode; changes require `npx next build` + `sudo supervisorctl restart frontend`
