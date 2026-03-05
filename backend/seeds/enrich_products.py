"""
Enrich catalog products with descriptions and specifications from the live WP site.
Fetches product data from the WordPress REST API and updates MongoDB.
Run: python seeds/enrich_products.py
"""
import asyncio
import httpx
import os
import sys
import re
from pathlib import Path
from html import unescape

sys.path.insert(0, str(Path(__file__).parent.parent))
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / '.env')

from motor.motor_asyncio import AsyncIOMotorClient

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

WP_API = "https://lexalifestyle.com/wp-json/wp/v2/product"


def html_to_text(html: str) -> str:
    """Convert HTML to clean text, preserving line breaks"""
    if not html:
        return ""
    text = html
    # Convert <br> and <br/> to newlines
    text = re.sub(r'<br\s*/?>', '\n', text)
    # Convert </p> to double newline
    text = re.sub(r'</p>', '\n\n', text)
    # Remove all other HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = unescape(text)
    # Clean up whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()
    return text


def extract_specs_from_text(text: str) -> list:
    """Extract specification lines from product text"""
    specs = []
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Lines with colons are likely specs (e.g., "Dimensions: 485 x 195 x 452mm")
        if ':' in line and len(line) < 200:
            specs.append(line)
        # Lines with measurement units
        elif re.search(r'\d+\s*(mm|cm|kg|lbs|W|Hz|kHz|V|A|dB|ohm|Ω)', line, re.IGNORECASE):
            specs.append(line)
    return specs


def extract_features_from_text(text: str) -> list:
    """Extract feature bullet points from product text"""
    features = []
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line or len(line) < 10:
            continue
        # Skip pure spec lines (have numbers with units and colons)
        if ':' in line and re.search(r'\d+\s*(mm|kg|W|Hz|V)', line):
            continue
        # Feature-like sentences (descriptive, not just numbers)
        if len(line) > 15 and not line.startswith('Call') and not line.startswith('Contact'):
            features.append(line)
    return features


def build_description(text: str) -> str:
    """Build a clean product description from the text"""
    if not text:
        return ""
    lines = text.split('\n')
    desc_lines = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Skip very short lines and call-to-action lines
        if len(line) < 5:
            continue
        if any(skip in line.lower() for skip in ['call us', 'contact us', 'get in touch', 'chat on whatsapp', 'recaptcha', 'privacy', 'terms']):
            continue
        desc_lines.append(line)
    
    # Take first paragraph or up to 500 chars
    result = ' '.join(desc_lines)
    if len(result) > 500:
        result = result[:497] + '...'
    return result


def normalize_slug(slug: str) -> str:
    """Normalize a slug for matching"""
    slug = slug.lower().strip()
    # Remove common prefixes/suffixes that might differ
    slug = re.sub(r'^(bw-|borresen-|aavik-|rotel-|sonos-)', '', slug)
    # Remove special chars
    slug = re.sub(r'[^a-z0-9]', '', slug)
    return slug


async def fetch_all_wp_products() -> list:
    """Fetch all products from the WP REST API"""
    all_products = []
    page = 1
    
    async with httpx.AsyncClient(timeout=30, follow_redirects=True) as client:
        while True:
            print(f"Fetching WP API page {page}...")
            resp = await client.get(f"{WP_API}?per_page=100&page={page}")
            if resp.status_code != 200:
                print(f"  API returned {resp.status_code}, stopping")
                break
            
            products = resp.json()
            if not products:
                break
            
            all_products.extend(products)
            print(f"  Got {len(products)} products (total: {len(all_products)})")
            
            # Check if there are more pages
            total_pages = int(resp.headers.get('x-wp-totalpages', 1))
            if page >= total_pages:
                break
            page += 1
    
    return all_products


async def main():
    print("=== Enriching Product Catalog ===\n")
    
    # Connect to MongoDB
    client_db = AsyncIOMotorClient(mongo_url)
    db = client_db[db_name]
    
    # Fetch all WP products
    wp_products = await fetch_all_wp_products()
    print(f"\nFetched {len(wp_products)} products from WP API\n")
    
    # Build lookup by slug
    wp_lookup = {}
    for wp in wp_products:
        slug = wp.get('slug', '')
        if slug:
            wp_lookup[slug] = wp
    
    # Also build normalized slug lookup for fuzzy matching
    wp_norm_lookup = {}
    for wp in wp_products:
        slug = wp.get('slug', '')
        norm = normalize_slug(slug)
        if norm and norm not in wp_norm_lookup:
            wp_norm_lookup[norm] = wp
    
    # Fetch all catalog products
    catalog_products = await db.catalog_products.find({}, {"_id": 0}).to_list(500)
    print(f"Found {len(catalog_products)} catalog products to enrich\n")
    
    updated = 0
    not_found = 0
    already_has_desc = 0
    
    for prod in catalog_products:
        prod_slug = prod.get('slug', '')
        prod_name = prod.get('name', '')
        
        # Try exact slug match first
        wp_prod = wp_lookup.get(prod_slug)
        
        # Try normalized slug match
        if not wp_prod:
            norm = normalize_slug(prod_slug)
            wp_prod = wp_norm_lookup.get(norm)
        
        # Try searching by name in WP products
        if not wp_prod:
            prod_name_lower = prod_name.lower().strip()
            for wp in wp_products:
                wp_title = unescape(wp.get('title', {}).get('rendered', '')).lower().strip()
                if wp_title == prod_name_lower:
                    wp_prod = wp
                    break
            # Partial match
            if not wp_prod:
                for wp in wp_products:
                    wp_title = unescape(wp.get('title', {}).get('rendered', '')).lower().strip()
                    # Check if names are similar enough
                    if prod_name_lower in wp_title or wp_title in prod_name_lower:
                        wp_prod = wp
                        break
        
        if not wp_prod:
            not_found += 1
            continue
        
        # Extract content
        content_html = wp_prod.get('content', {}).get('rendered', '')
        content_text = html_to_text(content_html)
        
        if not content_text:
            not_found += 1
            continue
        
        # Build description, specs, and features
        description = build_description(content_text)
        specs = extract_specs_from_text(content_text)
        features = extract_features_from_text(content_text)
        
        # Remove duplicate features that are also specs
        spec_set = set(s.lower() for s in specs)
        features = [f for f in features if f.lower() not in spec_set]
        
        # Limit features to avoid too many
        if len(features) > 8:
            features = features[:8]
        if len(specs) > 15:
            specs = specs[:15]
        
        # Update in MongoDB
        update_data = {}
        if description and (not prod.get('description') or prod['description'] == ''):
            update_data['description'] = description
        if specs:
            update_data['specifications'] = specs
        if features:
            update_data['features'] = features
        
        if update_data:
            await db.catalog_products.update_one(
                {'id': prod['id']},
                {'$set': update_data}
            )
            updated += 1
            if updated % 20 == 0:
                print(f"  Progress: {updated} products enriched...")
        else:
            already_has_desc += 1
    
    print(f"\n=== Enrichment Complete ===")
    print(f"Updated: {updated}")
    print(f"Not found in WP: {not_found}")
    print(f"Already had description: {already_has_desc}")
    
    # Print some samples
    print("\n=== Sample Enriched Products ===")
    samples = await db.catalog_products.find(
        {'description': {'$ne': '', '$exists': True}},
        {'_id': 0, 'name': 1, 'brand': 1, 'description': 1, 'specifications': 1, 'features': 1}
    ).limit(5).to_list(5)
    
    for s in samples:
        print(f"\n--- {s['name']} ({s['brand']}) ---")
        print(f"  Desc: {s.get('description', '')[:150]}...")
        print(f"  Specs: {len(s.get('specifications', []))} items")
        print(f"  Features: {len(s.get('features', []))} items")
    
    client_db.close()


if __name__ == "__main__":
    asyncio.run(main())
