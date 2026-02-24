# LEXA Smart Home Platform - Product Requirements Document

**Version**: 9.22  
**Last Updated**: February 24, 2026  
**Status**: Dark Mode Audit Complete

---

## Latest Updates (v9.22)

### Site-Wide Dark Mode Audit (Feb 24, 2026)

**STATUS: COMPLETED**

#### Scope
Comprehensive audit and fix of **100+ pages** and **50+ components** for dark mode compatibility.

#### Changes Made:
1. **Shared Components (Batch 1):**
   - `Header.tsx` - Logo switching (light/dark), nav link colors, CTA button, backdrop blur
   - `StatsSection.tsx` - Section bg, counter text, label colors
   - `SolutionsBentoGrid.tsx` - Grid bg, card borders, link colors
   - `PageSkeleton.tsx` - Full rewrite with dark mode for all 5 variants
   - `AIChatWidget.tsx` - Chat window, messages, input, suggestions
   - `CookieConsent.tsx` - Banner bg, text, buttons
   - `ExitIntentPopup.tsx` - Modal bg, text, bullet items
   - `CommandPalette.tsx` - Dialog bg, search input, result items, footer
   - `SocialProofWidget.tsx` - Floating widget bg and border
   - `PackageComparison.tsx` - Section bg, card bg
   - `TabbyWidget.tsx` - Widget bg, tab states
   - `ProcessWheel.tsx` - Step card bg and borders
   - `SwissServices.tsx` - Section backgrounds
   - `Skeleton.tsx` - Loading states

2. **Customer-Facing Pages (Batch 2):**
   - `/contact` - Form, contact cards, business hours, social links
   - `/about` - Timeline, values, partner grid, CTA
   - `/brands`, `/brands/[slug]` - Brand cards, category filter, detail pages
   - `/blog`, `/blog/[slug]` - Article cards, prose content, related articles
   - `/solutions`, `/solutions/[slug]` - Solution cards, feature grids, FAQ sections
   - `/services`, `/services/[slug]` - Service cards, process steps, case studies
   - `/projects`, `/projects/[slug]` - Project grid, detail pages
   - `/packages`, `/packages/[slug]` - Package cards, comparison tables
   - `/consultation` - TrustBadges, consultation types
   - `/experience-centre` - Social proof section, booking
   - `/amc-packages` - Package tiers, feature lists
   - `/careers` - Job listings, benefits
   - `/intelligence` - Feature grid
   - `/faq` - Already had dark mode
   - `/testimonials` - Already had dark mode

3. **Secondary Pages (Batch 3):**
   - All location pages (7 cities)
   - All persona pages (4 types)
   - All (pages) directory pages (6 pages)
   - Partner pages, resource pages, geo-SEO pages
   - Privacy, terms, warranty, support pages

#### Pattern Fixes Applied:
| Pattern | Fix | Count |
|---------|-----|-------|
| `bg-white` | `→ dark:bg-gray-900/800` | ~550 instances |
| `bg-gray-50` | `→ dark:bg-gray-800` | ~160 instances |
| `bg-gray-100` | `→ dark:bg-gray-800` | ~80 instances |
| `text-[#1A1A1A]` | `→ dark:text-white` | ~190 instances |
| `text-gray-900` | `→ dark:text-white` | ~280 instances |
| `text-gray-600/700` | `→ dark:text-gray-400/300` | ~200 instances |
| `border-gray-200` | `→ dark:border-gray-700` | ~180 instances |

#### Testing:
- Test report: `/app/test_reports/iteration_11.json`
- 19/19 main pages return HTTP 200
- Theme toggle verified working
- Logo correctly switches between light/dark variants
- No action items from testing agent

---

## Previous Session Updates (v9.21)

### PPT Bug Fixes + Go-Live Phase 2 (Feb 24, 2026)
- Fixed hero video (6 clips, lighter overlay)
- Created /faq page (searchable, 46 FAQs)
- Created /testimonials page (4 dynamic cards)
- Verified admin intelligence features working
- Added TrustBadges to homepage and consultation page
- Enhanced Experience Centre with social proof section
- Cleaned up 24 one-time migration scripts

---

## Remaining Issues

### P2: Minor Aesthetic Gaps
- Some `text-black` classes in location pages on intentionally dark sections
- ROI Calculator uses intentional dark UI with glass morphism effects
- Solution/service number text-gray-300 is aesthetic, not a dark mode bug

---

## Upcoming Tasks

### P1: Go-Live Phase 3
- Automated lead routing
- Lead scoring system
- Sales intelligence dashboard

### P2: Client Portal
- Build out client portal feature

---

## Admin Access

**URL**: `/admin`  
**Username**: `admin`  
**Password**: `lexa2026`

---

## Key Technical Info

- **Frontend**: Next.js with Tailwind CSS (dark mode via `class` strategy), Framer Motion
- **Backend**: FastAPI with MongoDB
- **Dark Mode**: ThemeContext.tsx manages state, stored in localStorage as `lexa-theme`, respects system preference
- **Tracking**: GA4, Meta Pixel, Google Ads
- **Booking**: Custom BookingModal (replaced Calendly)
- **i18n**: English/Arabic with JSON locale files

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 9.22 | Feb 24, 2026 | Site-wide dark mode audit (100+ pages, 50+ components, ~1500 fixes) |
| 9.21 | Feb 24, 2026 | PPT bug fixes (hero video, FAQ, testimonials), Go-Live Phase 2 |
| 9.20 | Feb 20, 2026 | Project gallery images, font audit, speed optimization |
| 9.15 | Feb 20, 2026 | Sora 2 hero video, language refactoring |
| 9.13 | Feb 16, 2026 | Full SEO audit (760 FAQs, Schema markup) |
| 9.10 | Feb 15, 2026 | Tracking pixels admin |
| 9.9 | Feb 15, 2026 | Footer redesign, FAQ enhancement |
