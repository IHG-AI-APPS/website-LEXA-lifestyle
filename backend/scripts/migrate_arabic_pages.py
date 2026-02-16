"""
Migration script to populate Arabic SEO pages into MongoDB
Run this once to migrate existing static pages to database
"""
import asyncio
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "lexa_lifestyle")

# Arabic pages data
ARABIC_PAGES = [
    {
        "slug": "smart-home-dubai",
        "title": "أتمتة المنزل الذكي في دبي",
        "meta_title": "أتمتة المنزل الذكي في دبي | LEXA Lifestyle - شركة رائدة في الإمارات",
        "meta_description": "شركة رائدة في أتمتة المنازل الفاخرة في دبي. حلول متكاملة للإضاءة والمناخ والأمن والترفيه. وكيل معتمد Control4 و Crestron في الإمارات.",
        "meta_keywords": ["أتمتة المنزل الذكي دبي", "شركة منزل ذكي الإمارات", "تركيب منزل ذكي دبي", "Control4 دبي", "Crestron دبي", "أنظمة المنزل الذكي الإمارات"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/smart-home-dubai",
        "english_alternate_url": "https://lexa-golive-prep.preview.emergentagent.com/uae/dubai",
        "page_type": "landing",
        "hero_title": "أتمتة المنزل الذكي الفاخرة في دبي",
        "hero_subtitle": "نحن الشركة الرائدة في حلول المنزل الذكي في دبي والإمارات",
        "hero_description": "أكثر من 500 فيلا وشقة فاخرة تم تنفيذها • تقييم 4.9/5 من العملاء",
        "content_sections": [
            {
                "type": "stats",
                "title": "إحصائياتنا",
                "stats": [
                    {"value": "500+", "label": "فيلا تم تنفيذها في دبي"},
                    {"value": "4.9/5", "label": "تقييم العملاء"},
                    {"value": "15+", "label": "سنة من الخبرة"}
                ]
            },
            {
                "type": "text",
                "title": "ما هي أتمتة المنزل الذكي؟",
                "content": "أتمتة المنزل الذكي هي تقنية متقدمة تتيح لك التحكم في جميع أنظمة منزلك من الإضاءة والمناخ والأمن والترفيه من خلال جهاز واحد. في دبي، نقدم حلول Control4 و Crestron المتكاملة للفلل والشقق الفاخرة في مناطق مثل الإمارات هيلز، داون تاون دبي، نخلة جميرا، ومرسى دبي."
            }
        ],
        "cta_text": "احصل على استشارة مجانية",
        "cta_url": "/contact",
        "published": True,
        "priority": 0.9
    },
    {
        "slug": "smart-home-abu-dhabi",
        "title": "أتمتة المنزل الذكي في أبوظبي",
        "meta_title": "أتمتة المنزل الذكي في أبوظبي | LEXA Lifestyle - حلول متكاملة",
        "meta_description": "خدمات أتمتة المنزل الذكي في أبوظبي. أنظمة Control4 و Crestron للفلل والشقق الفاخرة. تركيب احترافي وصيانة مستمرة.",
        "meta_keywords": ["أتمتة المنزل أبوظبي", "منزل ذكي أبوظبي", "Control4 أبوظبي", "Crestron أبوظبي"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/smart-home-abu-dhabi",
        "english_alternate_url": "https://lexa-golive-prep.preview.emergentagent.com/uae/abu-dhabi",
        "page_type": "landing",
        "hero_title": "أتمتة المنزل الذكي في أبوظبي",
        "hero_subtitle": "حلول متكاملة للمنازل الفاخرة في العاصمة",
        "content_sections": [],
        "published": True,
        "priority": 0.9
    },
    {
        "slug": "smart-home-sharjah",
        "title": "أتمتة المنزل الذكي في الشارقة",
        "meta_title": "أتمتة المنزل الذكي في الشارقة | LEXA Lifestyle",
        "meta_description": "خدمات المنزل الذكي في الشارقة. تركيب وتصميم أنظمة أتمتة متكاملة لجميع أنواع المنازل.",
        "meta_keywords": ["منزل ذكي الشارقة", "أتمتة المنزل الشارقة", "Control4 الشارقة"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/smart-home-sharjah",
        "page_type": "landing",
        "hero_title": "أتمتة المنزل الذكي في الشارقة",
        "hero_subtitle": "تقنية ذكية لمنازل عصرية",
        "content_sections": [],
        "published": True,
        "priority": 0.85
    },
    {
        "slug": "smart-home-prices",
        "title": "أسعار المنزل الذكي في الإمارات",
        "meta_title": "أسعار المنزل الذكي في الإمارات | دليل شامل 2025",
        "meta_description": "دليل شامل لأسعار أتمتة المنزل في الإمارات. أسعار Control4، Crestron، والأنظمة الذكية المختلفة.",
        "meta_keywords": ["أسعار المنزل الذكي", "تكلفة أتمتة المنزل", "أسعار Control4", "أسعار Crestron"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/smart-home-prices",
        "page_type": "landing",
        "hero_title": "أسعار المنزل الذكي في الإمارات",
        "hero_subtitle": "دليل شامل للتكاليف والميزانيات",
        "content_sections": [],
        "published": True,
        "priority": 0.85
    },
    {
        "slug": "installation-dubai",
        "title": "تركيب المنزل الذكي في دبي",
        "meta_title": "تركيب المنزل الذكي في دبي | خدمة احترافية",
        "meta_description": "خدمات تركيب المنزل الذكي الاحترافية في دبي. فريق معتمد من Control4 و Crestron.",
        "meta_keywords": ["تركيب منزل ذكي دبي", "تركيب Control4", "تركيب أتمتة منزلية"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/installation-dubai",
        "page_type": "landing",
        "hero_title": "تركيب المنزل الذكي في دبي",
        "hero_subtitle": "تركيب احترافي من فريق معتمد",
        "content_sections": [],
        "published": True,
        "priority": 0.8
    },
    {
        "slug": "control4-dubai",
        "title": "Control4 دبي - وكيل معتمد",
        "meta_title": "Control4 دبي | وكيل Control4 المعتمد في الإمارات | LEXA Lifestyle",
        "meta_description": "وكيل Control4 المعتمد في دبي. تركيب وبرمجة وصيانة أنظمة Control4 للمنازل الذكية.",
        "meta_keywords": ["Control4 دبي", "وكيل Control4 الإمارات", "Control4 معتمد"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/control4-dubai",
        "page_type": "landing",
        "hero_title": "Control4 دبي - وكيل معتمد",
        "hero_subtitle": "وكيل Diamond المعتمد في الإمارات",
        "content_sections": [],
        "published": True,
        "priority": 0.8
    },
    {
        "slug": "blog/smart-home-guide-2025",
        "title": "دليل المنزل الذكي 2025",
        "meta_title": "دليل المنزل الذكي 2025 | كل ما تحتاج معرفته عن الأتمتة في الإمارات",
        "meta_description": "دليل شامل للمنزل الذكي في الإمارات 2025. الأنظمة، الأسعار، الميزات، وكيفية الاختيار.",
        "meta_keywords": ["دليل المنزل الذكي", "أتمتة المنزل الإمارات", "منزل ذكي 2025"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/blog/smart-home-guide-2025",
        "page_type": "blog",
        "hero_title": "دليل المنزل الذكي الشامل 2025: كل ما تحتاج معرفته",
        "hero_subtitle": "دليل عملي لأصحاب المنازل في دبي والإمارات",
        "content_sections": [],
        "published": True,
        "priority": 0.75
    },
    {
        "slug": "blog/home-automation-roi",
        "title": "عائد الاستثمار من أتمتة المنزل",
        "meta_title": "عائد الاستثمار من أتمتة المنزل | هل المنزل الذكي يستحق؟",
        "meta_description": "تحليل شامل لعائد الاستثمار من أتمتة المنزل في الإمارات. توفير الطاقة، زيادة القيمة، والفوائد طويلة المدى.",
        "meta_keywords": ["عائد استثمار المنزل الذكي", "توفير طاقة منزل ذكي", "قيمة العقار الذكي"],
        "canonical_url": "https://lexa-golive-prep.preview.emergentagent.com/ar-seo/blog/home-automation-roi",
        "page_type": "blog",
        "hero_title": "عائد الاستثمار من أتمتة المنزل: هل يستحق؟",
        "hero_subtitle": "تحليل شامل للتكاليف والفوائد",
        "content_sections": [],
        "published": True,
        "priority": 0.75
    }
]


async def migrate_arabic_pages():
    """Migrate Arabic pages to MongoDB"""
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        
        print("🚀 Starting Arabic pages migration...")
        print(f"📊 Total pages to migrate: {len(ARABIC_PAGES)}")
        
        # Drop existing collection (optional - comment out if you want to keep existing data)
        # await db.arabic_seo_pages.drop()
        # print("🗑️  Dropped existing arabic_seo_pages collection")
        
        migrated = 0
        skipped = 0
        
        for page_data in ARABIC_PAGES:
            # Check if page already exists
            existing = await db.arabic_seo_pages.find_one({"slug": page_data["slug"]})
            
            if existing:
                print(f"⏭️  Skipping '{page_data['slug']}' - already exists")
                skipped += 1
                continue
            
            # Add timestamps
            page_data["created_at"] = datetime.now(timezone.utc).isoformat()
            page_data["updated_at"] = datetime.now(timezone.utc).isoformat()
            
            # Insert page
            await db.arabic_seo_pages.insert_one(page_data)
            print(f"✅ Migrated: {page_data['slug']}")
            migrated += 1
        
        print("\n✨ Migration complete!")
        print(f"📈 Migrated: {migrated} pages")
        print(f"⏭️  Skipped: {skipped} pages (already existed)")
        print(f"📊 Total in database: {await db.arabic_seo_pages.count_documents({})}")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error during migration: {str(e)}")
        raise


if __name__ == "__main__":
    asyncio.run(migrate_arabic_pages())
