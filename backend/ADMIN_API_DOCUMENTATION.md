# Admin Content Management API Documentation

## Base URL
`/admin/content`

## Authentication
All endpoints require admin authentication. Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Solutions Management

### 1. Get All Solutions (Admin View)
```http
GET /admin/content/solutions
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "smart-residential-living",
      "title": "Smart Residential Living",
      "category": "residential",
      "featured": true,
      "popular": true,
      "badge": "Popular",
      "mega_menu_category": "residential",
      "mega_menu_order": 1,
      "faqs": [...]
    }
  ],
  "count": 15
}
```

### 2. Get Single Solution
```http
GET /admin/content/solutions/{slug}
```

### 3. Update Solution FAQs
```http
PUT /admin/content/solutions/{slug}/faqs
Content-Type: application/json

{
  "faqs": [
    {
      "question": "How does it work?",
      "answer": "Detailed answer here..."
    }
  ]
}
```

### 4. Add Single FAQ
```http
POST /admin/content/solutions/{slug}/faqs
Content-Type: application/json

{
  "question": "New question?",
  "answer": "New answer..."
}
```

### 5. Delete FAQ
```http
DELETE /admin/content/solutions/{slug}/faqs/{faq_index}
```

---

## Mega Menu Configuration

### 1. Get Featured Solutions
```http
GET /admin/content/mega-menu/featured
```

**Response:**
```json
{
  "success": true,
  "data": {
    "all": [...],
    "by_category": {
      "residential": [...],
      "commercial": [...],
      "specialized": [...]
    },
    "total_featured": 11
  }
}
```

### 2. Update Mega Menu Config for Solution
```http
PUT /admin/content/solutions/{slug}/mega-menu
Content-Type: application/json

{
  "featured": true,
  "popular": false,
  "badge": "Premium",
  "mega_menu_category": "specialized",
  "mega_menu_order": 1
}
```

**Fields:**
- `featured` (boolean): Show in mega menu
- `popular` (boolean): Mark as popular
- `badge` (string | null): Badge text (e.g., "Popular", "Premium", "New")
- `mega_menu_category` (string): "residential" | "commercial" | "specialized"
- `mega_menu_order` (number): Display order within category

### 3. Bulk Update Mega Menu
```http
POST /admin/content/mega-menu/bulk-update
Content-Type: application/json

{
  "solutions": [
    {
      "slug": "smart-residential-living",
      "featured": true,
      "mega_menu_category": "residential",
      "mega_menu_order": 1,
      "badge": "Popular"
    },
    {
      "slug": "yacht-automation",
      "featured": true,
      "mega_menu_category": "specialized",
      "mega_menu_order": 1,
      "badge": "Premium"
    }
  ]
}
```

### 4. Reset All Mega Menu Config
```http
POST /admin/content/mega-menu/reset
```

**⚠️ Warning:** This removes all solutions from mega menu (sets featured=false for all)

---

## Statistics

### Get Content Statistics
```http
GET /admin/content/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "solutions": {
      "total": 15,
      "with_faqs": 15,
      "featured": 11,
      "faq_completion": "100.0%"
    },
    "services": {
      "total": 12
    },
    "projects": {
      "total": 24
    }
  }
}
```

---

## Example Workflows

### Update FAQs for a Solution
```bash
# Get current FAQs
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8001/admin/content/solutions/mirror-tv

# Update FAQs
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "faqs": [
      {
        "question": "How does a Mirror-TV work?",
        "answer": "A Mirror-TV looks and functions like a standard mirror..."
      },
      {
        "question": "Can it be installed in bathrooms?",
        "answer": "Yes, with proper waterproofing..."
      }
    ]
  }' \
  http://localhost:8001/admin/content/solutions/mirror-tv/faqs
```

### Configure Mega Menu
```bash
# Mark solution as featured
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "featured": true,
    "mega_menu_category": "residential",
    "mega_menu_order": 1,
    "badge": "Popular"
  }' \
  http://localhost:8001/admin/content/solutions/smart-residential-living/mega-menu

# Get all featured solutions
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8001/admin/content/mega-menu/featured
```

### Bulk Update Multiple Solutions
```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "solutions": [
      {"slug": "smart-residential-living", "featured": true, "mega_menu_category": "residential", "mega_menu_order": 1},
      {"slug": "yacht-automation", "featured": true, "mega_menu_category": "specialized", "mega_menu_order": 1, "badge": "Premium"}
    ]
  }' \
  http://localhost:8001/admin/content/mega-menu/bulk-update
```

---

## Notes

1. **Authentication Required**: All endpoints require valid JWT token from `/api/admin/login`

2. **FAQ Indexing**: FAQs are stored as arrays. Use 0-based indexing for deletions.

3. **Mega Menu Categories**:
   - `residential`: Smart homes, living spaces
   - `commercial`: Business, hospitality
   - `specialized`: Yacht, marine, premium solutions

4. **Badge Options**: Common badges include "Popular", "Premium", "New", or custom text

5. **Order Numbers**: Lower numbers appear first in their category (1, 2, 3...)

6. **Frontend Cache**: Changes to mega menu configuration may take a few seconds to appear due to frontend caching

---

## Testing with curl

```bash
# Set your token
TOKEN="your-jwt-token-here"

# Get stats
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8001/admin/content/stats

# List all solutions
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8001/admin/content/solutions

# Update FAQs for Mirror TV
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @mirror-tv-faqs.json \
  http://localhost:8001/admin/content/solutions/mirror-tv/faqs
```
