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

#### March 7, 2026
- **Fixed:** Brand logos not visible in dark mode
  - Issue: Logo images with dark content on transparent background invisible on dark cards
  - Solution: Added inline `backgroundColor: '#ffffff'` to logo containers
  - File: `/app/frontend/app/brands/page.tsx`

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
- Additional brand logos upload
- Performance optimization

## Credentials
- Admin: `/admin/login` - admin / lexa2026
- SFTP: 178.128.28.178 - root / IhG@1HGB$2026$W3b
