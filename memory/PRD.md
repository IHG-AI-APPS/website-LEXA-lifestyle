# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul for 100% dynamic content, premium "Dark Luxury" design, app-like UX. Site-wide color consistency (dark charcoal + gold), mobile-first, typography standardization, premium micro-animations, and fully custom AI-generated imagery.

## Core Architecture
- **Frontend**: Next.js (production mode `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Images**: 100% custom AI-generated via Gemini Imagen 4.0 (zero stock photos)

## What's Been Implemented

### Completed - All Audit Fixes (P0/P1/P2) — 23 items
### Completed - Dark Charcoal Color Overhaul — 100+ files
### Completed - Gold Shimmer Micro-Animations
### Completed - Service Worker v4

### Completed - Full Custom AI Image Replacement (Mar 2026)
**39+ AI images generated and deployed across the entire site:**

*Experience Centre (7):* Hero showroom, Smart Home, Cinema, Brands, Audio, Lighting, Security

*Homepage Components (8):* 4 Solutions Bento images, 4 Calculator Card images + 5 reused Experience CTA images

*Page Heroes (12):* Contact, Projects, Packages, FAQ, Catalogues, Consultation, Architects, Developers, Process, Intelligence, Testimonials, Smart Home Quiz

*Dubai Locations (6):* Palm Jumeirah skyline, Emirates Hills villas, Dubai Marina towers, Downtown Dubai/Burj Khalifa, Dubai Hills estate, JBR beachfront

*Abu Dhabi Locations (4):* Al Reem Island, Abu Dhabi cityscape, Saadiyat Island/Louvre, Yas Island

*Special Pages (4):* Digital Twin hologram, Luxury Home Cinema, Enterprise Platform, Home Cinema Dubai

*Product Categories (8):* Accessories, Audio, Automation, Electrical, Furniture, Home Cinema, Lighting, Video

*Team Portraits (7):* Althaf Ali, Munir Taher, Shahnawaz Sheikh, Mohammad Salih, Sri Harish, Maria Ralota, Shibili Zahir

*Other Components:* Testimonial avatars, video thumbnails, project fallbacks, partner page images

**Result: ZERO stock photos (Unsplash/Pexels) on any public-facing page**

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` header in `next.config.mjs`
- DO NOT reintroduce blue-tinted colors or stock photos
- Frontend production mode: `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- "Compare Packages" side-by-side conversion feature
- Further mobile UX polish on secondary pages
