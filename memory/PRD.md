# LEXA Lifestyle Website - Product Requirements Document

## Original Problem Statement
Complete website overhaul: premium "Dark Luxury" design, 100% dynamic content, app-like UX, site-wide color consistency, custom AI imagery, immersive interactive experiences with ambient sound.

## Core Architecture
- **Frontend**: Next.js (production mode `next start`)
- **Backend**: FastAPI with MongoDB
- **Theme**: Dark Charcoal (#050505, #0A0A0A, #171717) + Gold (#C9A962)
- **Images**: 100% custom AI-generated (zero stock photos)

## What's Been Implemented

### All Audit Fixes (P0/P1/P2) — 23 items complete
### Dark Charcoal Color Overhaul — 100+ files, zero blue tint
### Gold Shimmer Micro-Animations — hero, CTAs, badges
### Service Worker v4 — network-first CMS, SWR APIs, offline page
### 39+ Custom AI Images — all stock photos replaced site-wide

### Interactive Virtual Tour with Ambient Sound (Mar 2026)
**Full-screen cinematic experience at /experience-centre:**
- 6 curated zones: Smart Home, Cinema, Brands, Audio, Lighting, Security
- Ken Burns pan/zoom effect (15s cycles, alternating directions)
- Glassmorphism info panels with badge, description, feature chips
- Cinematic letterbox bars + gradient overlays
- Floating gold particles (20 animated)
- Navigation: dots, arrows, keyboard (left/right/ESC), auto-play (5s)
- Fullscreen API + header auto-hide when tour active
- **React Portal rendering** for correct fixed positioning (bypasses ancestor filter/transform issues)
- Background-image approach for reliable image sizing across viewports

**Procedural Ambient Sound Engine (Web Audio API):**
- 6 unique soundscapes generated in real-time (zero audio files)
- Zone 0 (Smart Home): Warm electronic ambient + gentle shimmer
- Zone 1 (Cinema): Deep bass drone + cinematic sub-bass
- Zone 2 (Gallery): Elegant minimal reverb wash
- Zone 3 (Audio): Warm analog tone + vinyl warmth
- Zone 4 (Lighting): Ethereal shimmer pad
- Zone 5 (Security): Digital tech ambiance + scanning pulses
- Smooth crossfade (1.5s) between zones
- Mute/unmute with visual waveform indicator
- Uses oscillators, filtered noise, LFO modulation, shimmer layers
- Proper cleanup on component unmount

### Virtual Tour Scaling Fix (Mar 2026)
- **Root Cause**: Ancestor `filter: blur(0px)` created new containing block, causing `fixed inset-0` to inherit full page height (3064px) instead of viewport (768px)
- **Fix**: Used `createPortal` to render tour directly in `document.body`, bypassing all ancestor CSS effects
- **Additional**: Switched to CSS background-image approach for more reliable image sizing with Framer Motion transforms

## Admin Credentials
- URL: `/admin/login`, Username: `admin`, Password: `lexa2026`

## Critical Notes
- DO NOT modify `start` script in `package.json`
- DO NOT re-add `X-Frame-Options` or blue-tinted colors
- Production mode: `npx next build` + `sudo supervisorctl restart frontend`

## Remaining Backlog
- "Compare Packages" side-by-side conversion feature
- Refine Service Worker Caching with more advanced strategies
- Client Logo Integration (TrustedBy component uses placeholder SVG)
