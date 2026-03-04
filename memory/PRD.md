# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, a premium "Dark Luxury" design, and an app-like user experience. Site-wide color consistency (dark charcoal + gold only), mobile-first responsive enhancement, typography standardization, premium micro-animations, and custom AI-generated images.

## Core Architecture
- **Frontend**: Next.js (production mode with `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Integrations**: OpenAI GPT (AURA chatbot), Gemini Nano Banana (avatar), WhatsApp/Interakt, Gmail SMTP, Google Maps, GA4, Meta Pixel

## What's Been Implemented

### Completed - All Audit Fixes (P0/P1/P2)
- All 23 audit items resolved

### Completed - Site-wide Color Consistency Overhaul (Mar 2026)
- CSS variables: blue HSL(222) → neutral HSL(0)
- All dark mode backgrounds, borders, text standardized to charcoal + zinc
- Zero blue tint confirmed by testing agent (11/11 passed)

### Completed - Gold Shimmer Micro-Animations (Mar 2026)
- Hero heading shimmer, CTA button shimmer, badge border pulse
- All CSS-only, zero JS overhead

### Completed - AI-Generated Custom Images (Mar 2026)
**15 total custom images generated via Gemini Imagen 4.0:**

*Experience Centre page (7):*
- Hero background (luxury showroom)
- Smart Home Showcase, Home Cinema, Brand Gallery
- Audio Systems, Lighting Studio, Security & Surveillance

*Homepage components (8):*
- Solutions Bento Grid: Smart Lighting, Smart Interior, Luxury Villa, Security (4 images)
- Calculator Cards: Package Builder, Specialty Rooms, Cost Calculator, ROI Calculator (4 images)
- Experience Centre CTA: Reused 5 experience centre images

*Page heroes (3):*
- About page: LEXA HQ showroom lobby
- Blog page: Tablet controlling home automation
- Services page: Technician installing smart panel

*Projects fallback (1):*
- Dubai penthouse with all automation systems active

### Completed - Data Cleanup (Mar 2026)
- Fixed test testimonial "TEST_PATCHED" → "Ahmed Al Maktoum"
- Removed 2 junk test testimonials

### Completed - Service Worker v4
- Network-first CMS, stale-while-revalidate APIs, cache-first static, offline page

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` header in `next.config.mjs`
- DO NOT reintroduce blue-tinted colors
- Frontend runs in production mode; changes require `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- Generate AI images for remaining 25+ pages (location pages, specialty rooms, consultation, etc.)
- "Compare Packages" side-by-side feature
- Further mobile UX polish on secondary pages
