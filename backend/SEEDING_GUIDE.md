# LEXA Lifestyle Database Seeding System

## Overview
This directory contains all database seeding scripts organized by category. Use the master orchestrator for consistent, ordered seeding.

## Quick Start

### Seed Everything (Recommended for fresh database)
```bash
cd /app/backend
python seed_master.py --mode all
```

### Seed Core Data Only (Solutions, Services, Brands)
```bash
python seed_master.py --mode core
```

### Seed Package System Only
```bash
python seed_master.py --mode packages
```

## Seed Categories

### 🏠 Core Data (Phase 1)
Essential business data that other modules depend on.

| Script | Description | Collections |
|--------|-------------|-------------|
| `seed_all_solutions.py` | Solutions catalog (Cinema, Smart Home, etc.) | `solutions` |
| `seed_all_services.py` | Service portfolio | `services` |
| `seed_intelligence_solutions.py` | AI/Intelligence solutions | `solutions` |
| `seed_brands_products.py` | Brand partners & products | `brands`, `products` |

**Run individually:**
```bash
python seed_all_solutions.py
python seed_all_services.py
```

---

### 📦 Package System (Phase 2)
Smart home package builder components.

| Script | Description | Collections |
|--------|-------------|-------------|
| `seed_smart_home_packages.py` | Luxury property packages | `packages` |
| `seed_developer_apartments.py` | Developer apartment packages | `packages` |
| `seed_specialty_rooms.py` | Specialty room add-ons | `specialty_rooms` |
| `seed_package_enhancements.py` | Package enhancements/upgrades | `package_enhancements` |
| `seed_brand_options.py` | Brand selection options | `brand_options` |

**Quick package system reseed:**
```bash
python seed_master.py --mode packages
```

---

### 📝 Content & Media (Phase 3)
Blog posts, news, videos, and editorial content.

| Script | Description | Collections |
|--------|-------------|-------------|
| `seed_blog_articles.py` | Main blog articles | `blogs` |
| `seed_news.py` | News & press releases | `news` |
| `seed_videos.py` | Video gallery | `videos` |
| `seed_articles.py` | General articles | `articles` |

---

### 🎯 SEO & Strategic Content (Phase 4)
SEO-optimized blog content (optional, run as needed).

| Script | Purpose | Notes |
|--------|---------|-------|
| `seed_strategic_blogs.py` | Strategic blog batch 1 | SEO content |
| `seed_strategic_blogs_batch2.py` | Strategic blog batch 2 | SEO content |
| `seed_strategic_blogs_batch3.py` | Strategic blog batch 3 | SEO content |
| `seed_strategic_blogs_batch4.py` | Strategic blog batch 4 | SEO content |
| `seed_strategic_blogs_batch5.py` | Strategic blog batch 5 | SEO content |
| `seed_strategic_blogs_batch6.py` | Strategic blog batch 6 | SEO content |
| `seed_seo_blogs.py` | Additional SEO blogs | SEO content |

**Note:** These are large files and not included in `--mode all`. Run individually for SEO campaigns.

---

### 🗂️ Legacy/Deprecated Scripts
These may contain overlapping or outdated data. Review before using.

| Script | Status | Notes |
|--------|--------|-------|
| `seed_data.py` | ⚠️ Legacy | May conflict with newer scripts |
| `seed_new_solutions.py` | ⚠️ Superseded | Use `seed_all_solutions.py` |
| `seed_phase2_solutions.py` | ⚠️ Superseded | Use `seed_all_solutions.py` |
| `seed_new_pages.py` | ⚠️ Check | May be obsolete |
| `seed_luxury_residential.py` | ⚠️ Check | Possibly replaced by packages |
| `seed_remaining_properties.py` | ⚠️ Check | Possibly replaced by packages |

---

## Seeding Best Practices

### 1. Order Matters
Always seed in this order:
1. Core Data (solutions, services, brands)
2. Package System (packages, enhancements, brand options)
3. Content (blogs, news, videos)
4. SEO Content (strategic blogs - optional)

### 2. Idempotency
All seed scripts should be idempotent - safe to run multiple times. They typically:
- Delete existing data before inserting
- Or use upsert operations with unique identifiers

### 3. Database Connection
All scripts use environment variables:
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=lexa_lifestyle
```

### 4. Error Handling
The master orchestrator tracks:
- ✅ Successful seeds
- ❌ Failed seeds (with error messages)
- ⚠️  Skipped seeds

---

## Maintenance Guidelines

### Adding a New Seed Script

1. **Create the script** following the naming convention: `seed_<category>_<name>.py`

2. **Follow the template:**
```python
"""
Brief description of what this seeds
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'lexa_lifestyle')

async def seed_your_data():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Clear existing
    await db.your_collection.delete_many({})
    
    # Insert data
    await db.your_collection.insert_many([...])
    
    print(f"✅ Seeded {count} items")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_your_data())
```

3. **Add to master orchestrator** in `seed_master.py` in the appropriate phase

4. **Document here** in the relevant category table

### Removing/Deprecating a Script

1. Move to "Legacy/Deprecated" section in this README
2. Add warning comment in the file itself
3. Eventually move to `/app/backend/seeds/deprecated/` folder

---

## Troubleshooting

### Script Not Found Error
```bash
ModuleNotFoundError: No module named 'seed_xyz'
```
**Solution:** Ensure you're running from `/app/backend/` directory

### Connection Timeout
```bash
ServerSelectionTimeoutError
```
**Solution:** Check MongoDB is running and MONGO_URL is correct

### Duplicate Key Error
```bash
DuplicateKeyError
```
**Solution:** Script not properly clearing existing data. Check delete_many() is called first.

### Wrong Database
```bash
# Data appears in wrong database
```
**Solution:** Verify DB_NAME environment variable matches expected database name (`lexa_lifestyle`)

---

## Migration from Old System

If you have data from individual seed scripts, the master orchestrator will:
1. Clear existing data in each collection
2. Reseed with latest data
3. Maintain data integrity across collections

**Backup recommended before first run:**
```bash
mongodump --uri="mongodb://localhost:27017/lexa_lifestyle" --out=/tmp/backup
```

---

## Future Improvements

- [ ] Add --dry-run mode to preview what will be seeded
- [ ] Add --verbose flag for detailed logging
- [ ] Add selective seeding by collection name
- [ ] Add data validation after seeding
- [ ] Create automated tests for seed data integrity
- [ ] Add progress bars for long-running seeds

---

## Support

For issues or questions about seeding:
1. Check this README
2. Review error messages from master orchestrator
3. Check individual seed script for specific collection issues

**Last Updated:** February 2026
**Maintainer:** Development Team
