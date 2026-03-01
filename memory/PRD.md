# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router, Production Build) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work (Latest First)

### Phase 39: 429 Rate Limiting Defense — Inline Critical CSS + Chunk Optimization (Mar 1, 2026)
- **Inline critical CSS**: Added dark theme background (#050505), hidden sr-only, header positioning directly in `<head>` — page never appears unstyled even if CSS chunks are 429'd
- **Webpack chunk optimization**: Merged framer-motion + lucide-react + radix-ui into single `vendor-ui` chunk. Reduced initial requests from 35 → 24. Set minSize=80KB, maxSize=500KB, maxInitialRequests=12
- **CSS recovery script**: Auto-detects missing CSS on page load and performs one automatic reload
- **Font optimization**: Arabic fonts (Tajawal) changed to `preload: false` — reduces initial requests by 3
- **Testing**: 100% pass (iteration_65). CRITICAL: Desktop + mobile back-to-back load with zero 429 errors confirmed

### Phase 38: Staggered Hero Entrance Animations — Site-Wide (Mar 1, 2026)
- **CSS-only approach**: 6 utility classes (`hero-animate-badge`, `hero-animate-title`, `hero-animate-desc`, `hero-animate-cta`, `hero-animate-extra`) with staggered delays (0ms → 150ms → 300ms → 450ms → 600ms)
- **Scope**: Applied to 53 badge elements, 49+ h1 titles, 15+ descriptions, 22+ CTA containers across ALL pages
- **Uses**: `@keyframes heroFadeUp` with `--ease-luxury: cubic-bezier(0.16, 1, 0.3, 1)` easing curve
- **Accessibility**: `prefers-reduced-motion` media query disables all animations for users who prefer reduced motion
- **Testing**: 100% backend + 100% frontend pass rate (iteration_64). Every page's hero section verified.

### Phase 37: Site-Wide Hero Standardization — Uppercase, Center-Aligned, Background Images (Mar 1, 2026)
- **47 pages**: Standardized h1 to `text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight`
- **62 pages**: Replaced `bg-gray-900` hero backgrounds with OLED-black `bg-[#0A0A0A] dark:bg-[#050505]`
- **15+ pages**: Added hero background images (20% opacity Unsplash images with dark gradient overlay) to: services, contact, packages, consultation, faq, testimonials, architects, developers, calculator, brands, blog, catalogues, projects, process, digital-twin, intelligence, enterprise-platform
- **Project-builder**: Completely redesigned landing page — center-aligned, dark hero with gold badge, trust signals, matching Dark Luxury theme
- **About/Experience-Centre**: Converted from split layout to center-aligned with full-width background image overlay
- **Brands/Catalogues/Projects**: Fixed from left-aligned to center-aligned hero
- **Smart-home-quiz/ROI-calculator/Villa-designer**: Hero sections redesigned with dark bg + gold accents
- **Testing**: 100% backend, 100% frontend pass rate (iteration_63)

### Phase 36: Project Builder + Site-Wide Purple-to-Gold Refactor (Mar 1, 2026)
- **Scope**: Eliminated ALL purple/violet styling from 35 user-facing files. Replaced with Dark Luxury gold (#C9A962) accent system.
- **Files updated**: project-builder (17 components), calculator, packages (4), smart-home-quiz, villa-designer, developer-toolkit, developers, enterprise-platform, villa-operating-model, package-builder, analytics
- **Pattern**: `purple-500/600/700` → `#C9A962`, `purple-50/100` → `#C9A962/5` or `/10`, purple gradients → gold gradients
- **Admin panel**: Intentionally unchanged (specialized internal tool)
- **Testing**: 100% backend + 100% frontend pass rate (iteration_62). Zero visually purple elements on any user-facing page.

### Phase 35: TypeScript Strict Mode + Site-Wide Design Consistency (Mar 1, 2026)
- **TypeScript**: Removed `ignoreBuildErrors: true` from `next.config.js`. Fixed all 21 TS errors across 4 files (Project interface, SmartHomeVideoShowcase, Footer, SeoLandingPageTemplate). Build now compiles with strict type checking.
- **Design Consistency**: Removed purple/violet gradients from ALL user-facing pages:
  - Persona pages (architect, developer, homeowner, commercial): CTA sections → dark #0a0a0a bg + gold #C9A962 buttons
  - Visualize-3D: Purple header → dark header + gold accent cards
  - RelatedSolutions: Purple gradient CTA → gold button
  - Architects page: Purple resource colors → gold/slate
  - Locations: Added dark: theme variant
- **Testing**: 100% backend + 100% frontend pass rate (iteration_61)

### Phase 34: Critical Bug Fix — Video Retry Loop / 429 Rate Limiting (Mar 1, 2026)
- **Root cause**: HeroCurator.tsx had an infinite video error retry loop (onError → setNextClip → error → repeat). This generated hundreds of network requests, exhausting the platform's 429 rate limit, causing ALL CSS/JS/font files to fail loading. The site appeared completely broken/unstyled for users.
- **Fix**: Added MAX_VIDEO_ERRORS=3 cap, reduced DEFAULT_CLIPS from 6→2, changed preload from 'auto'→'metadata', added videoFailed state to gracefully stop video loading after max errors.
- **Testing**: 100% pass rate — desktop, mobile, navigation, admin, API endpoints, theme toggle all verified working. Zero 429 errors in console.

### Phase 33: Design Overhaul with Theme-Aware Dark/Light (Mar 1, 2026)
- **Gold accent system**: All sections now use `#C9A962` gold accents consistently
- **Purple gradient killed**: Smart Project Builder → dark bg with gold border/accents
- **Stats**: Gold gradient numbers (`bg-clip-text bg-gradient-to-b from-[#C9A962] to-[#8a7035]`)
- **Trust badges**: Gold icons, theme-aware bg (`bg-gray-50/80 dark:bg-black/60`)
- **All sections theme-aware**: Using `bg-white dark:bg-[#050505]` pattern — toggle works
- **Floating pill tab bar**: `rounded-2xl max-w-sm mx-auto`, 64px height
- **"We serve" text**: Hidden on mobile (`hidden sm:block`)
- **Solutions badge**: Gold pill with `bg-[#C9A962]/10 border-[#C9A962]/30`
- Testing: Theme toggle verified working on both light/dark modes

### Phase 32: Data Cleanup + Projects Tab Fix (Mar 1, 2026)
- MobileTabBar "Projects" → `/projects` (was `/dashboard`)
- Test data cleaned from DB

### Phase 31: Image Performance (Mar 1, 2026)
- SafeImage optimization (quality=75, lazy, sizes)

### Phase 30: Mobile UX Redesign (Mar 1, 2026)
- Center-aligned hero, horizontal snap scroll for tools + projects

### Phase 29: Quick Actions FAB
### Phase 28: Hero CTA Optimization
### Phase 27-1: Native Gestures, Speed, AURA, Full CMS

## Design System
- **Light bg**: white / gray-50
- **Dark bg**: #050505 (OLED black)
- **Gold accent**: #C9A962 (light+dark)
- **Gold hover**: #E8DCC8
- **Glass cards (dark)**: bg-white/[0.03] border-white/[0.06]
- **Glass cards (light)**: bg-gray-50 border-gray-200
- **Theme toggle**: Uses `dark:` Tailwind variants throughout

## Remaining / Backlog
### P1 — Redesign Projects Landing Page
### P2 — Site-wide Consistency Review (inner pages)
### P3 — Content Change History for admin CMS
### P4 — WhatsApp template approval on Interakt
### P5 — Fix TypeScript build errors

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
