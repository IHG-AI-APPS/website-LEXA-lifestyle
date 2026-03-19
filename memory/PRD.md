# LEXA Lifestyle - Smart Home Automation Platform

## Original Problem Statement
Building a comprehensive smart home automation platform for LEXA Lifestyle, a luxury smart home company based in Dubai. The platform includes a Next.js frontend, FastAPI backend, and MongoDB database.

## Current Status: Features Implemented ✅

### Recent Changes (March 19, 2026)

#### Secondary Phone Number Feature
- Added `contact_phone_secondary` field to SiteSettings interface
- Updated admin Site Settings page with new field in Contact Info tab
- Updated Contact page to display secondary phone in:
  - Contact info cards
  - Quick Connect sidebar section
- Field is optional

#### CSP Fixes
- Added `googleads.g.doubleclick.net` to script-src
- Added `www.googleadservices.com` to script-src
- Added `static.cloudflareinsights.com` to script-src
- Added `td.doubleclick.net` to frame-src

#### Sitemap Fixes
- Created `/sitemap_index.xml` route handler
- Created `/sitemap-images.xml` route handler with Google Images namespace
- Created `/sitemap-videos.xml` route handler with Google Video namespace
- All sitemaps returning 200 status

#### Admin Panel URL Change
- Moved from `/admin` to `/lexa_admin@2026` for security
- Old `/admin` URL returns 404

### Previous Fixes
- Removed double-loading CSS retry logic
- Fixed X-Frame-Options for Emergent preview
- Fixed webpack config for deployment
- Updated allowedDevOrigins for all Emergent domains

## Architecture

```
/app
├── backend/
│   ├── server.py           # FastAPI main application
│   ├── routes/             # API route modules
│   └── .env                # Backend environment variables
└── frontend/
    ├── app/                # Next.js app router pages
    │   ├── lexa_admin@2026/ # Admin panel (secured URL)
    │   ├── contact/        # Contact page with secondary phone
    │   ├── sitemap_index.xml/  # Sitemap index route
    │   ├── sitemap-images.xml/ # Image sitemap route
    │   └── sitemap-videos.xml/ # Video sitemap route
    ├── components/         # React components
    ├── hooks/
    │   └── useSiteSettings.tsx # Site settings with contact_phone_secondary
    ├── next.config.js      # Next.js configuration (CSP updated)
    └── .env                # Frontend environment variables
```

## Key Environment Variables

### Frontend (.env)
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- `REACT_APP_BACKEND_URL` - Legacy variable

### Backend (.env)
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name

## Known Issues

### Light Mode on Homepage
The homepage uses hardcoded dark colors for luxury aesthetic. Light mode toggle exists but homepage sections don't respond to it. Would require significant refactoring to implement.

## Pending Tasks

### P0 (Critical)
- [x] Fix CSP violations ✅
- [x] Fix sitemap issues ✅
- [x] Add secondary phone number ✅
- [ ] Re-deploy to production

### P1 (High Priority)
- [ ] Implement light mode for homepage (if requested)

### P2 (Medium Priority)
- [ ] ROI Calculator enhancements
- [ ] Interactive Floor Plan Configurator

### P3 (Backlog)
- [ ] Compare Packages feature

## Test Credentials
- Admin URL: `/lexa_admin@2026`
- Username: `admin`
- Password: `lexa2026`

## Sitemap URLs
- Index: `https://lexalifestyle.com/sitemap_index.xml`
- Main: `https://lexalifestyle.com/sitemap.xml`
- Images: `https://lexalifestyle.com/sitemap-images.xml`
- Videos: `https://lexalifestyle.com/sitemap-videos.xml`
