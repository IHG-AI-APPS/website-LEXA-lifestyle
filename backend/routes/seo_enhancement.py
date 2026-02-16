"""
SEO Enhancement APIs
- Schema Markup generation
- Dynamic meta tags
- Sitemap data
"""
from fastapi import APIRouter
from typing import Optional, List
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/seo", tags=["seo"])
logger = logging.getLogger(__name__)

# Database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]

# Company info for schema
COMPANY_INFO = {
    "name": "LEXA Lifestyle",
    "legal_name": "LEXA Smart Home Solutions LLC",
    "url": "https://lexalifestyle.ae",
    "logo": "https://lexalifestyle.ae/lexa-logo.png",
    "description": "Dubai's premier luxury smart home automation company. Expert installation of Control4, Savant, Lutron, and Crestron systems for villas, apartments, and commercial spaces.",
    "telephone": "+971-4-XXX-XXXX",
    "email": "info@lexalifestyle.ae",
    "address": {
        "streetAddress": "Dubai Design District",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "postalCode": "XXXXX",
        "addressCountry": "AE"
    },
    "geo": {
        "latitude": 25.2048,
        "longitude": 55.2708
    },
    "openingHours": ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
    "priceRange": "AED 8,000 - AED 500,000+",
    "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "Fujairah", "UAE"]
}


@router.get("/schema/organization")
async def get_organization_schema():
    """Get organization schema markup"""
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": f"{COMPANY_INFO['url']}/#organization",
        "name": COMPANY_INFO["name"],
        "legalName": COMPANY_INFO["legal_name"],
        "url": COMPANY_INFO["url"],
        "logo": COMPANY_INFO["logo"],
        "image": COMPANY_INFO["logo"],
        "description": COMPANY_INFO["description"],
        "telephone": COMPANY_INFO["telephone"],
        "email": COMPANY_INFO["email"],
        "address": {
            "@type": "PostalAddress",
            **COMPANY_INFO["address"]
        },
        "geo": {
            "@type": "GeoCoordinates",
            **COMPANY_INFO["geo"]
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "16:00"
            }
        ],
        "priceRange": COMPANY_INFO["priceRange"],
        "areaServed": [{"@type": "City", "name": area} for area in COMPANY_INFO["areaServed"]],
        "sameAs": [
            "https://www.instagram.com/lexalifestyle",
            "https://www.linkedin.com/company/lexalifestyle",
            "https://www.facebook.com/lexalifestyle"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
        }
    }


@router.get("/schema/services")
async def get_services_schema():
    """Get services schema markup"""
    services = await db.services.find({}, {"_id": 0}).to_list(20)
    
    service_schemas = []
    for service in services:
        service_schemas.append({
            "@type": "Service",
            "name": service.get("title") or service.get("name", "Smart Home Service"),
            "description": service.get("description", ""),
            "provider": {
                "@type": "LocalBusiness",
                "name": COMPANY_INFO["name"]
            },
            "areaServed": {
                "@type": "City",
                "name": "Dubai"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Smart Home Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": service.get("title") or service.get("name")
                        }
                    }
                ]
            }
        })
    
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "LEXA Smart Home Services",
        "itemListElement": service_schemas
    }


@router.get("/schema/products")
async def get_products_schema():
    """Get products/solutions schema markup"""
    solutions = await db.solutions.find(
        {"featured": True},
        {"_id": 0, "title": 1, "description": 1, "image": 1, "slug": 1}
    ).limit(20).to_list(20)
    
    product_schemas = []
    for solution in solutions:
        product_schemas.append({
            "@type": "Product",
            "name": solution.get("title", "Smart Home Solution"),
            "description": solution.get("description", ""),
            "image": solution.get("image", ""),
            "url": f"{COMPANY_INFO['url']}/solutions/{solution.get('slug', '')}",
            "brand": {
                "@type": "Brand",
                "name": "LEXA Lifestyle"
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "AED",
                "lowPrice": "8000",
                "highPrice": "500000",
                "offerCount": "1"
            }
        })
    
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "LEXA Smart Home Solutions",
        "itemListElement": product_schemas
    }


@router.get("/schema/faq")
async def get_faq_schema():
    """Get FAQ schema markup for rich snippets"""
    faqs = [
        {
            "question": "How much does smart home automation cost in Dubai?",
            "answer": "Smart home automation in Dubai typically ranges from AED 8,000 for basic systems to AED 500,000+ for luxury whole-home automation. The cost depends on property size, features selected, and brand preferences. LEXA offers free consultations to provide accurate quotes."
        },
        {
            "question": "What is the best smart home system for villas in Dubai?",
            "answer": "For luxury villas in Dubai, we recommend Control4, Savant, or Crestron systems. These provide comprehensive whole-home automation including lighting, climate, security, entertainment, and more. LEXA is an authorized dealer for all major brands."
        },
        {
            "question": "How long does smart home installation take?",
            "answer": "Installation time varies by project scope. A basic apartment setup takes 1-2 weeks, while a complete villa automation can take 4-8 weeks. New construction projects are typically completed alongside the build timeline."
        },
        {
            "question": "Can I add smart home features to an existing home?",
            "answer": "Yes! Retrofit installations are very common. We specialize in adding smart home technology to existing properties with minimal disruption. Wireless solutions like Lutron RadioRA3 are perfect for retrofits."
        },
        {
            "question": "Do you provide maintenance and support?",
            "answer": "Absolutely. LEXA provides comprehensive maintenance packages and 24/7 support for all installations. Our team of certified technicians ensures your smart home runs smoothly."
        },
        {
            "question": "Which areas in UAE do you serve?",
            "answer": "LEXA serves all areas of Dubai, Abu Dhabi, Sharjah, and the Northern Emirates. We have completed projects in Palm Jumeirah, Emirates Hills, Downtown Dubai, and many other prestigious locations."
        }
    ]
    
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": faq["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq["answer"]
                }
            }
            for faq in faqs
        ]
    }


@router.get("/schema/breadcrumb")
async def get_breadcrumb_schema(path: str = "/"):
    """Get breadcrumb schema for a given path"""
    parts = [p for p in path.split("/") if p]
    
    items = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": COMPANY_INFO["url"]
        }
    ]
    
    current_path = ""
    for i, part in enumerate(parts):
        current_path += f"/{part}"
        items.append({
            "@type": "ListItem",
            "position": i + 2,
            "name": part.replace("-", " ").title(),
            "item": f"{COMPANY_INFO['url']}{current_path}"
        })
    
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items
    }


@router.get("/schema/howto")
async def get_howto_schema():
    """Get HowTo schema for smart home setup process"""
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Get Started with Smart Home Automation",
        "description": "A step-by-step guide to automating your home with LEXA Lifestyle",
        "totalTime": "PT2W",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "AED",
            "value": "25000-150000"
        },
        "step": [
            {
                "@type": "HowToStep",
                "name": "Free Consultation",
                "text": "Book a free consultation with our smart home experts to discuss your needs and preferences.",
                "url": f"{COMPANY_INFO['url']}/contact"
            },
            {
                "@type": "HowToStep",
                "name": "Custom Design",
                "text": "Our team creates a customized smart home design tailored to your property and lifestyle.",
                "url": f"{COMPANY_INFO['url']}/services/design"
            },
            {
                "@type": "HowToStep",
                "name": "Professional Installation",
                "text": "Certified technicians install your smart home system with minimal disruption.",
                "url": f"{COMPANY_INFO['url']}/services/installation"
            },
            {
                "@type": "HowToStep",
                "name": "Training & Handover",
                "text": "We provide comprehensive training on using your new smart home system.",
                "url": f"{COMPANY_INFO['url']}/services/support"
            }
        ]
    }


@router.get("/meta/{page_type}")
async def get_meta_tags(page_type: str, slug: Optional[str] = None):
    """Get optimized meta tags for different page types"""
    base_meta = {
        "site_name": "LEXA Lifestyle",
        "locale": "en_AE",
        "type": "website"
    }
    
    meta_configs = {
        "home": {
            "title": "LEXA Lifestyle | Luxury Smart Home Automation Dubai | Control4 & Savant Experts",
            "description": "Transform your home with Dubai's premier smart home automation company. Expert installation of Control4, Savant, Lutron systems. Free consultation. Call now!",
            "keywords": "smart home Dubai, home automation UAE, Control4 Dubai, Savant installer, luxury automation"
        },
        "solutions": {
            "title": "Smart Home Solutions Dubai | Lighting, Climate, Security & Entertainment",
            "description": "Explore comprehensive smart home solutions for your Dubai property. Automated lighting, climate control, security systems, and home entertainment.",
            "keywords": "smart lighting Dubai, home security UAE, climate control, home theater installation"
        },
        "services": {
            "title": "Smart Home Services | Design, Installation & Support Dubai",
            "description": "Professional smart home services in Dubai. From consultation and design to installation and ongoing support. Certified experts.",
            "keywords": "smart home installation Dubai, home automation services, smart home design"
        },
        "packages": {
            "title": "Smart Home Packages Dubai | Villa & Apartment Automation Bundles",
            "description": "Pre-designed smart home packages for Dubai villas and apartments. Essential to Ultra luxury tiers. Starting from AED 8,000.",
            "keywords": "smart home package Dubai, villa automation bundle, apartment smart home"
        },
        "calculator": {
            "title": "Smart Home Cost Calculator Dubai | Get Instant Estimate",
            "description": "Calculate your smart home automation cost instantly. Enter your property details and get a customized quote for Dubai properties.",
            "keywords": "smart home cost Dubai, home automation price calculator, smart home estimate"
        },
        "contact": {
            "title": "Contact LEXA Lifestyle | Book Free Smart Home Consultation Dubai",
            "description": "Get in touch with Dubai's leading smart home experts. Book a free consultation, request a quote, or visit our showroom.",
            "keywords": "smart home consultation Dubai, contact home automation, LEXA showroom"
        }
    }
    
    meta = meta_configs.get(page_type, meta_configs["home"])
    meta.update(base_meta)
    
    return meta


@router.get("/sitemap-data")
async def get_sitemap_data():
    """Get data for sitemap generation"""
    try:
        # Get all dynamic pages
        solutions = await db.solutions.find({}, {"_id": 0, "slug": 1, "updated_at": 1}).to_list(200)
        services = await db.services.find({}, {"_id": 0, "slug": 1, "updated_at": 1}).to_list(50)
        brands = await db.brands.find({}, {"_id": 0, "slug": 1, "updated_at": 1}).to_list(50)
        projects = await db.projects.find({}, {"_id": 0, "slug": 1, "updated_at": 1}).to_list(50)
        articles = await db.articles.find({}, {"_id": 0, "slug": 1, "updated_at": 1}).to_list(100)
        
        return {
            "static_pages": [
                {"url": "/", "priority": 1.0, "changefreq": "daily"},
                {"url": "/about", "priority": 0.8, "changefreq": "monthly"},
                {"url": "/contact", "priority": 0.9, "changefreq": "monthly"},
                {"url": "/solutions", "priority": 0.9, "changefreq": "weekly"},
                {"url": "/services", "priority": 0.9, "changefreq": "weekly"},
                {"url": "/packages", "priority": 0.9, "changefreq": "weekly"},
                {"url": "/brands", "priority": 0.8, "changefreq": "weekly"},
                {"url": "/projects", "priority": 0.8, "changefreq": "weekly"},
                {"url": "/blog", "priority": 0.7, "changefreq": "daily"},
                {"url": "/calculator", "priority": 0.9, "changefreq": "monthly"},
                {"url": "/project-builder/smart", "priority": 0.9, "changefreq": "monthly"}
            ],
            "solutions": [{"url": f"/solutions/{s['slug']}", "priority": 0.7} for s in solutions if s.get("slug")],
            "services": [{"url": f"/services/{s['slug']}", "priority": 0.7} for s in services if s.get("slug")],
            "brands": [{"url": f"/brands/{b['slug']}", "priority": 0.6} for b in brands if b.get("slug")],
            "projects": [{"url": f"/projects/{p['slug']}", "priority": 0.6} for p in projects if p.get("slug")],
            "articles": [{"url": f"/blog/{a['slug']}", "priority": 0.6} for a in articles if a.get("slug")]
        }
    except Exception as e:
        logger.error(f"Sitemap data error: {str(e)}")
        return {"error": str(e)}
