# LEXA Smart Home Platform — PRD

## Original Problem Statement
Complete website overhaul for LEXA Smart Home to:
1. Make all content fully dynamic and editable through admin CMS panel
2. Apply a "benchmark" design standard across ALL pages
3. Eliminate all hardcoded static pages in favor of database-driven content

## Architecture
- **Frontend**: Next.js 14 (App Router) | **Backend**: FastAPI (Python) | **Database**: MongoDB

## Completed Work

### Phase 1-10: Content & CMS
- All solutions, services, brands, geo pages, locations, specialty rooms, intelligence — CMS-driven
- Admin CMS, Catalogue/Flipbook, 30+ pages converted to CMS

### Phase 11-14: Design & Transitions (Feb 26, 2026)
- 9 final pages CMS conversion, 19+ pages benchmark design, page transitions, package pages

### Phase 15: Backend CRUD Audit (Feb 26, 2026)
- 54/54 basic + 27/27 deep logical tests passed

### Phase 16: Modal & Form E2E Audit (Feb 26, 2026)
- **21/22 backend form endpoint tests passed** + all frontend modal tests passed
- **All bugs found and fixed:**
  1. **WhatsApp `send_message()` → `send_lead_notification()`** — 3 calls in bookings.py used non-existent method
  2. **ERPNext `create_lead()` parameter mismatch** — 3 calls in bookings.py used wrong param names (lead_name vs contact_name)
  3. **ERPNext called as static instead of instance** — Changed to use `erpnext_service` instance
  4. **Package inquiry email crash** — `send_package_inquiry_notification()` called with wrong params, also made email non-blocking so inquiry saves even if email fails
  5. **Package inquiry response** — Was returning 500 even though DB save succeeded; now returns success with email_sent flag

### Verified Form Endpoints (all working)
| Endpoint | Method | Status |
|----------|--------|--------|
| /api/consultation | POST | PASS |
| /api/contact/booking | POST | PASS |
| /api/experience-centre/booking | POST | PASS |
| /api/schedule-visit | POST | PASS |
| /api/calculator/cost | POST | PASS |
| /api/calculator/submit | POST | PASS |
| /api/package-inquiry/submit | POST | PASS (fixed) |
| /api/leads | POST | PASS |
| /api/contractors/project-request | POST | PASS |
| /api/architects/resource-request | POST | PASS |
| /api/developers/toolkit-request | POST | PASS |
| /api/villa-designer/submit | POST | PASS |
| /api/smart-home/save-project | POST | PASS |
| /api/smart-home/book-consultation | POST | PASS |
| /api/ai-chat/message | POST | PASS |

### Integration Status
| Service | Status | Notes |
|---------|--------|-------|
| Gmail SMTP | Working | Emails sent successfully |
| ERPNext CRM | Working | Leads created (fixed params) |
| WhatsApp Interakt | Calling correctly | Template needs approval on dashboard |
| N8N Webhooks | Working | Graceful handling if URL unavailable |
| AI Chatbot | Working | Using EMERGENT_LLM_KEY |

## Remaining / Backlog
### P1 — Content Change History for admin CMS (audit trail)
### P2 — Approve WhatsApp templates on Interakt dashboard (ops task)

## Credentials
- Admin: `/admin/login` (username: admin, password: lexa2026)
