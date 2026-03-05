"""
Seed script to populate the product catalog from lexalifestyle.com
Downloads product images and stores them locally on the server.
Run: python seeds/seed_products.py
"""
import asyncio
import httpx
import os
import re
import sys
from pathlib import Path
from uuid import uuid4
from datetime import datetime, timezone
from urllib.parse import urlparse

# Add parent to path
sys.path.insert(0, str(Path(__file__).parent.parent))
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / '.env')

from motor.motor_asyncio import AsyncIOMotorClient
from bs4 import BeautifulSoup

UPLOAD_DIR = "/app/backend/uploads/products"
os.makedirs(UPLOAD_DIR, exist_ok=True)

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# Backend URL for constructing image paths
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', '')
if not BACKEND_URL:
    # Try to get from frontend env
    try:
        with open('/app/frontend/.env') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    BACKEND_URL = line.strip().split('=', 1)[1]
                    break
    except:
        pass

LIVE_SITE = "https://lexalifestyle.com"
PRODUCTS_URL = f"{LIVE_SITE}/lexa-products/"

# Category icon to category name mapping
ICON_TO_CATEGORY = {
    "6_Rigging": "Automation",
    "4_Audio": "Audio",
    "icon-image": "Electrical",
    "WEB-ICONS-02": "Home Cinema",
    "2_Video": "Video",
    "1_Lighting": "Lighting",
    "power": "Accessories",
    "3_Furniture": "Furniture",
}

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def detect_category_from_icon(icon_src: str) -> str:
    """Detect product category from the category icon image filename"""
    if not icon_src:
        return "Other"
    for key, cat in ICON_TO_CATEGORY.items():
        if key in icon_src:
            return cat
    return "Other"


def detect_series(brand: str, product_name: str) -> str:
    """Try to detect product series from brand and product name"""
    series_patterns = {
        "Aavik": [
            (r'^Aavik C-', 'Aavik C Series'),
            (r'^Aavik I-', 'Aavik I Series'),
            (r'^Aavik P-', 'Aavik P Series'),
            (r'^Aavik R-', 'Aavik R Series'),
            (r'^Aavik SD-', 'Aavik SD Series'),
            (r'^Aavik U-', 'Aavik U Series'),
        ],
        "Borresen": [
            (r'^C\d', 'Borresen C Series'),
            (r'^M\d', 'Borresen M Series'),
            (r'^T\d', 'Borresen T Series'),
            (r'^X\d', 'X Series'),
            (r'^P\d', 'Borresen C Series'),
            (r'^A\d', 'Borresen C Series'),
        ],
        "Axxess": [
            (r'^FORTE', 'Axxess FORTE'),
            (r'^L\d', 'Axxess L Series'),
            (r'Power Distributor', 'Axxess Power Distributor'),
            (r'Power Cable', 'Axxess Power Cable'),
            (r'RCA Interconnect|Signal', 'Axxess Signal Cable'),
            (r'Speaker Cable', 'Axxess Speaker Cable'),
            (r'Digital Interconnect', 'Axxess Digital cable'),
            (r'Ehternet|Ethernet', 'Axxess Ethernet Cable'),
            (r'Resonance', 'Axxess Resonance Control'),
        ],
        "Rotel": [
            (r'^Michi', 'Rotel Michi Series'),
            (r'^S\d|^A\d', 'Rotel A Series'),
            (r'^C\d', 'Rotel Diamond Series'),
            (r'^RA-|^RB-|^RMB-', 'Rotel 15 Series'),
        ],
        "Bowers&Wilkins": [
            (r'CT7|CT SW|CT8', 'B&W Custom Theater'),
            (r'CCM36|CCM38|CWM 36', 'B&W Custom Install 300 Series'),
            (r'CCM6', 'Custom Install 600 Series'),
            (r'FS M1', 'B&W Custom Install 300 Series'),
            (r'SA 1000', 'B&W Custom Theater'),
        ],
        "Artesania Audio": [
            (r'^MIR', 'Prestige Line'),
            (r'^PR', 'Classic Mini Line'),
        ],
        "Magna": [
            (r'^Polly', 'Polly Series'),
            (r'^Aura', 'Aura Series'),
        ],
        "Lumibright": [
            (r'Array|LBA', 'Lumibright Array Series'),
            (r'Down|LBM.*DR', 'Lumibright LED Down Lights'),
            (r'Spot|LBS', 'Lumibright Spot Lights'),
            (r'Panel|LBP', 'Lumibright Panel Lights'),
            (r'Modular|LBM', 'Lumibright Modular Lighting'),
            (r'Omnia|LBO', 'Lumibright Omnia Lighting'),
            (r'LBTMG', 'Lumibright Modular Lighting'),
            (r'LB33|L130', 'Lumibright LED Down Lights'),
        ],
        "Lexa Lifestyle": [
            (r'^LXT', 'Lexa Lifestyle'),
        ],
        "Lifesmart": [
            (r'Natur|Nature', 'Lifesmart'),
            (r'Blend', 'Lifesmart'),
            (r'QuickLink', 'Lifesmart'),
            (r'Smart Door', 'Lifesmart'),
        ],
        "Sonos": [
            (r'Arc|Sub', 'Sonos'),
            (r'Move|Five|Era|Port|Amp', 'Sonos'),
        ],
    }

    brand_key = brand
    if brand_key in series_patterns:
        for pattern, series in series_patterns[brand_key]:
            if re.search(pattern, product_name, re.IGNORECASE):
                return series

    return None


async def download_image(client: httpx.AsyncClient, url: str, filename: str) -> str:
    """Download an image and save to uploads dir. Returns local path."""
    try:
        filepath = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(filepath):
            return f"/api/uploads/files/products/{filename}"

        resp = await client.get(url, timeout=30, follow_redirects=True)
        if resp.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(resp.content)
            return f"/api/uploads/files/products/{filename}"
        else:
            print(f"  Failed to download {url}: {resp.status_code}")
            return ""
    except Exception as e:
        print(f"  Error downloading {url}: {e}")
        return ""


async def scrape_products(client: httpx.AsyncClient) -> list:
    """Scrape all products from the live site"""
    print("Fetching product catalog page...")
    resp = await client.get(PRODUCTS_URL, timeout=60, follow_redirects=True)
    if resp.status_code != 200:
        print(f"Failed to fetch catalog: {resp.status_code}")
        return []

    soup = BeautifulSoup(resp.text, 'html.parser')
    products = []

    # Find all product cards - they typically have a specific structure
    # Looking for product elements in the page
    product_elements = soup.select('.jet-woo-products__inner-box, .jet-woo-builder-archive-product-wrapper, article.product, .product-card, li.product')

    if not product_elements:
        # Try alternative selectors
        product_elements = soup.select('[data-product-id], .elementor-widget-jet-woo-builder-products .jet-woo-products__inner-box')

    if not product_elements:
        # Broader approach - find all product links
        print("Using broad scraping approach...")
        all_links = soup.find_all('a', href=re.compile(r'/products/[^/]+/?$'))
        seen = set()
        for link in all_links:
            href = link.get('href', '')
            if href in seen or '/lexa-products/' in href:
                continue
            seen.add(href)

            name = link.get_text(strip=True)
            if not name or len(name) < 2:
                img = link.find('img')
                if img:
                    name = img.get('alt', '').strip()
                if not name:
                    continue

            # Find image
            img = link.find('img')
            img_url = ''
            if img:
                img_url = img.get('data-lazy-src') or img.get('src', '')
                # Get full size image (remove -300x300 suffix)
                img_url = re.sub(r'-\d+x\d+\.', '.', img_url)

            products.append({
                'name': name,
                'url': href,
                'image_url': img_url,
                'brand': '',
                'category': '',
            })

    print(f"Found {len(products)} product links from broad scraping")
    return products


async def scrape_products_structured(client: httpx.AsyncClient) -> list:
    """Parse the page HTML more carefully to extract brand, category, and product info"""
    print("Fetching product catalog page for structured parse...")
    resp = await client.get(PRODUCTS_URL, timeout=60, follow_redirects=True)
    if resp.status_code != 200:
        print(f"Failed to fetch catalog: {resp.status_code}")
        return []

    html = resp.text
    soup = BeautifulSoup(html, 'html.parser')

    products = []
    seen_slugs = set()

    # Find all product card containers
    cards = soup.select('.jet-woo-products .jet-woo-products__inner-box')
    if not cards:
        cards = soup.select('.jet-woo-builder-archive-product-wrapper')
    if not cards:
        cards = soup.select('li.product')

    print(f"Found {len(cards)} product cards using structured selectors")

    for card in cards:
        try:
            # Get product link and name
            link_el = card.select_one('a[href*="/products/"]')
            if not link_el:
                continue

            href = link_el.get('href', '')
            slug_match = re.search(r'/products/([^/]+)/?$', href)
            if not slug_match:
                continue
            slug = slug_match.group(1)
            if slug in seen_slugs:
                continue
            seen_slugs.add(slug)

            # Product name
            name = ''
            name_el = card.select_one('.jet-woo-builder-archive-product-title a, h2 a, .woocommerce-loop-product__title')
            if name_el:
                name = name_el.get_text(strip=True)
            if not name:
                img_el = card.select_one('img')
                if img_el:
                    name = img_el.get('alt', '').strip()
            if not name:
                name = slug.replace('-', ' ').title()

            # Image
            img_el = card.select_one('img')
            img_url = ''
            if img_el:
                img_url = img_el.get('data-lazy-src') or img_el.get('data-src') or img_el.get('src', '')
                img_url = re.sub(r'-\d+x\d+\.', '.', img_url)

            # Brand - often shown as text above or near the product
            brand = ''
            brand_el = card.select_one('.jet-woo-builder-archive-product-categories, .posted_in, .product-brand')
            if brand_el:
                brand = brand_el.get_text(strip=True)

            # Category - from category icon
            category = ''
            cat_icon = card.select_one('.jet-woo-builder-archive-product-categories img, .product-category-icon img')
            if cat_icon:
                category = detect_category_from_icon(cat_icon.get('src', ''))

            products.append({
                'name': name,
                'slug': slug,
                'url': href,
                'image_url': img_url,
                'brand': brand,
                'category': category,
            })
        except Exception as e:
            print(f"  Error parsing card: {e}")
            continue

    print(f"Parsed {len(products)} products from structured cards")
    return products


# Hardcoded product data extracted from the live site crawl
# This is the most reliable approach since the JS-rendered site may not yield complete data via scraping
PRODUCTS_DATA = [
    # E-electron products (Automation/Electrical)
    {"name": "DALI-2 PRESENCE DETECTOR STANDARD WITH LIGHTING CONTROL", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/PRESENCE-DETECTOR-2.webp"},
    {"name": "KNX PRESENCE DETECTOR - BASIC", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/PRESENCE-DETECTOR.webp"},
    {"name": "POWER SUPPLY 640 mA", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/POWER-SUPPLY.webp"},
    {"name": "GATEWAY KNX /DMX 512", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/DMX.webp"},
    {"name": "Universal Fancoil Controller 0-10 V | 5 In - 4 Out", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/FAN-COIL-CONTROLLER-3.webp"},
    {"name": "Universal Fan-Coil Controller", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/FAN-COIL-CONTROLLER-2.webp"},
    {"name": "Fan Coil Controller 0-10V", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/FAN-COIL-CONTROLLER.webp"},
    {"name": "KNX Line Coupler", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/LINE-COUPLER.webp"},
    {"name": "UNIVERSAL DIN MODULE 12 OUT", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-8.webp"},
    {"name": "UNIVERSAL DIN MODULE 8 OUT", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-7.webp"},
    {"name": "UNIVERSAL DIN MODULE 4 OUT", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-6.webp"},
    {"name": "24-Channel Actuator", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-5.webp"},
    {"name": "Universal DIN Module 16 OUTPUTS Plus", "brand": "E-electron", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-4.webp"},
    {"name": "Universal DIN Module 12 OUTPUTS Plus", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-3.webp"},
    {"name": "Universal DIN Module 8 OUTPUTS Plus", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR-2.webp"},
    {"name": "Universal DIN Module 4 OUTPUTS Plus", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RELAY-ACTUATOR.webp"},
    {"name": "UNIVERSAL DIMMER 2 CHANNELS X 300W", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/DIMMER-3.webp"},
    {"name": "UNIVERSAL DIMMER 4 CHANNELS X 300W", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/DIMMER-2.webp"},
    {"name": "DIN module Dimmer 4 channels x 1-10V", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/DIMMER.webp"},
    {"name": "KNX IP Router", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/IP-ROUTER.webp"},
    {"name": "KNX DALI GATEWAY BROADCAST - 4 CHANNELS", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/KNX-DALI-GATEWAY-3.webp"},
    {"name": "KNX DALI Gateway 1 channel", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/KNX-DALI-GATEWAY-2.webp"},
    {"name": "KNX DALI Gateway 2 channel", "brand": "E-electron", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/KNX-DALI-GATEWAY.webp"},
    # Rotel products (Audio)
    {"name": "Michi X5 S2", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel Michi Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/Michi-X5-S2.webp"},
    {"name": "Michi P5 S2", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel Michi Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/Michi-P5-S2.webp"},
    {"name": "C8+", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel Diamond Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/C8.webp"},
    {"name": "RA-6000", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel Diamond Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RA-6000.webp"},
    {"name": "RMB-1587MKII", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel 15 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RMB-1587MKII.webp"},
    {"name": "RMB-1555", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel 15 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RMB-1555.webp"},
    {"name": "RB-1590", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel 15 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RB-1590.webp"},
    {"name": "RA-1592MKII", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel 15 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RA-1592MKII.webp"},
    {"name": "S14", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel A Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/S14.webp"},
    {"name": "A14MKII", "brand": "Rotel", "category": "Audio", "sub_category": "Rotel A Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/A14MKII.webp"},
    # Russound products (Audio)
    {"name": "Half-Rack Digital 2-Channel Amplifier", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RUSSOUND-Half-Rack-Digital-2-Channel-Amplifier.webp"},
    {"name": "Two-Channel, 75W, Dual Source Amplifier", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RUSSOUND-Two-Channel-75W-Dual-Source-Amplifier.webp"},
    {"name": "Eight-Channel Digital Amplifier", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RUSSOUND-Eight-Channel-Digital-Amplifier.webp"},
    {"name": "Twelve-Channel Digital Amplifier", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RUSSOUND-Twelve-Channel-Digital-Amplifier.webp"},
    {"name": "3.1-Channel Low-Profile Mini-AVR with HDMI", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RUSSOUND-3.1-Channel-Low-Profile-Mini-AVR-with-HDMI.webp"},
    {"name": "2-Way OutBack Rock Speaker", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/11/RUSSOUND-2-Way-OutBack-Rock-Speaker.webp"},
    {"name": "IC-830", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/gtbd5lbescbqil1zjwrj.webp"},
    {"name": "IW-620", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/ezdpu5nojkcbyft1o2o5.webp"},
    {"name": "IC-610", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/fgl4gnqynu1ljqgivdgl.webp"},
    {"name": "IC-630", "brand": "Russound", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/mmirmddnfd79u3ydc9us.webp"},
    # Tridonic (Electrical)
    {"name": "DALI PCD 1-380 one4all G3", "brand": "Tridonic", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/DALI-PCD-1-380-one4all-G3.webp"},
    {"name": "BasicDIM Wireless PWM CV 4CH", "brand": "Tridonic", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/basicDIM-Wireless-PWM-CV-4CH.webp"},
    {"name": "BasicDIM Wireless Outdoor", "brand": "Tridonic", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/basicDIM-Wireless-Outdoor.webp"},
    {"name": "BasicDIM Wireless module G2", "brand": "Tridonic", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/basicDIM-Wireless-module-G2.webp"},
    {"name": "BasicDIM ILD G2 4DPI WDA", "brand": "Tridonic", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/basicDIM-ILD-G2-4DPI-WDA.webp"},
    {"name": "BasicDIM DGC", "brand": "Tridonic", "category": "Electrical", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/basicDIM-DGC.webp"},
    # Magna (Audio)
    {"name": "Polly 240", "brand": "Magna", "category": "Audio", "sub_category": "Polly Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/apktsciqhzvwggibuir4.webp"},
    {"name": "Polly Spot", "brand": "Magna", "category": "Audio", "sub_category": "Polly Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/MAGNA-Polly-Spot-2.webp"},
    {"name": "Polly Sub", "brand": "Magna", "category": "Audio", "sub_category": "Polly Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/jl7yoi2s3reu37wafjtd.webp"},
    {"name": "Aura Mini", "brand": "Magna", "category": "Audio", "sub_category": "Aura Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/kpr6vl2pknsyp8sdodvi.webp"},
    {"name": "Aura Sub", "brand": "Magna", "category": "Audio", "sub_category": "Aura Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/k9vnmcn4yrhjixeooubj.webp"},
    {"name": "Aura 6", "brand": "Magna", "category": "Audio", "sub_category": "Aura Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/r3auykszo5pggkw3mnwo.webp"},
    {"name": "Aura 5", "brand": "Magna", "category": "Audio", "sub_category": "Aura Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/cwpvsboynhvom2qogrd5.webp"},
    {"name": "Aura 4", "brand": "Magna", "category": "Audio", "sub_category": "Aura Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/diprenjjt4yrq3yj2xab-1.webp"},
    {"name": "Aura 3", "brand": "Magna", "category": "Audio", "sub_category": "Aura Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/diprenjjt4yrq3yj2xab.webp"},
    # Nakymatone (Audio)
    {"name": "Base", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/s4oyrbweqvxtwpqipcad.webp"},
    {"name": "Twee", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/ywktwsj7v90rpmohkvn3.webp"},
    {"name": "Goed", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/npqr4yyuklggw46ex3o3.webp"},
    {"name": "Mooi", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/fi6msoxnzsntea6hsjzz.webp"},
    {"name": "Naky", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/invprkxblkux0skfktsr.webp"},
    {"name": "Laag", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/e9zjybfxdzxek1at4yie.webp"},
    {"name": "ECHT", "brand": "Nakymatone", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/dosexbsf24da6mwo2xdb.webp"},
    # Savant (Audio/Automation)
    {"name": "Savant IP AUDIO 125 WITH SAVANT MUSIC SERVER", "brand": "Savant", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-IP-AUDIO-125-WITH-SAVANT-MUSIC-SERVER.webp"},
    {"name": "Savant 5 PORT AVB COMPLIANT SWITCH", "brand": "Savant", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-5-PORT-AVB-COMPLIANT-SWITCH.webp"},
    {"name": "Savant Smart Host With standard License", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-Smart-Host-With-standard-License.webp"},
    {"name": "Savant Pro Host | MAC MINI M4", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-Pro-Host-MAC-MINI-M4.webp"},
    {"name": "IP Audio 1 With Integrated Host and Savant Music 2.0 + Airplay", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/IP-Audio-1-With-Integrated-Host-and-Savant-Music-2.0-Airplay.webp"},
    {"name": "Savant Touch 5.5 Inch Control screen - White", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-Touch-5.5-Inch-Control-screen-White.webp"},
    {"name": "Savant Touch 5.5 Inch Control screen - Black", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-Touch-5.5-Inch-Control-screen-Black.webp"},
    {"name": "Savant Touch 8 Inch Control screen - White", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-Touch-8-Inch-Control-screen-White.webp"},
    {"name": "Savant Touch 8 Inch Control screen - Black", "brand": "Savant", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-Touch-8-Inch-Control-screen-Black.webp"},
    {"name": "Savant IP AUDIO 50 V2 WITH SAVANT MUSIC SERVER", "brand": "Savant", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Savant-IP-AUDIO-50-V2-WITH-SAVANT-MUSIC-SERVER.webp"},
    # Lifesmart (Automation)
    {"name": "Natur Switch 3 Way Black Glass - Grey Surround", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/mnzqsewnsfwpocbrk3hf.webp"},
    {"name": "Blend Switch 3 Way Grey", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/ozbxdd73amciuub2ts80.webp"},
    {"name": "Blend Switch Metal - Graphit 3 Way", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/xm3s9ez43yzm3zoo5gtv.webp"},
    {"name": "Nature Thermostat (Grey Frame - Black glass)", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/wk019ge0kv4al23v6ul5.webp"},
    {"name": "Nature mini Pro Thermostat-Grey", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/uqhhbianlmrlrqtsdnra.webp"},
    {"name": "Nature mini Pro Grey - 3 Way", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/x5jj3zforoxw0toy8xtq.webp"},
    {"name": "Smart Door Lock C200", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/Smart-Door-Lock-C200.webp"},
    {"name": "Nature X", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/stunulr9egt9tuft8tsm.webp"},
    {"name": "QuickLink Curtain Motor", "brand": "Lifesmart", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/lh1y3rg0liwj2jrco152.webp"},
    # Leica (Home Cinema)
    {"name": "Cine 1 + Screen + Prestige Cabinet + MP - 100\"", "brand": "Leica", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/LEICA-PRODUCT-Cine-1ScreenPrestige-Cabinet-MP-100.webp"},
    {"name": "Cine 1 + Screen + Prestige Cabinet + MP - 120\"", "brand": "Leica", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/LEICA-Cine-1-Screen-Prestige-Cabinet-MP-120.webp"},
    {"name": "Cine 1 + Screen + MP + Cine 1 Case + Screen Case - 120\"", "brand": "Leica", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/LEICA-PRODUCT-Cine-1ScreenMPCine1CaseScreen-Case-120.webp"},
    {"name": "Cine 1 + Screen + Fort Cabinet + MP-100", "brand": "Leica", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/LEICA-PRODUCT-Cine-1ScreenFort-CabinetMP-100.webp"},
    {"name": "Cine 1 + Screen + SOLO Cabinet + MP", "brand": "Leica", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/LEICA-Cine-1-Screen-SOLO-Cabinet-MP-2.webp"},
    # K-Array (Audio)
    {"name": "KU44 I", "brand": "K-Array", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/K-ARRAY-KU44-I.webp"},
    {"name": "KTR24", "brand": "K-Array", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/K-ARRAY-KTR24.webp"},
    # Brightluxx (Video)
    {"name": "BRIGHTLUXX 55INCH ANDROID 4+16G PCAP TOUCH WALL MOUNT DISPLAY", "brand": "Brightluxx", "category": "Video", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/ma4xi9g3cplism82mwoz.webp"},
    {"name": "BRIGHTLUXX 98 INCH ANDROID 14 4GB RAM TOUCH WALL MOUNT DISPLAY", "brand": "Brightluxx", "category": "Video", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/vow0i920pnhytxas098i.webp"},
    {"name": "BRIGHTLUXX 55 INCH ANDROID 4+16G PCAP TOUCH ULTRA SLIM DISPLAY", "brand": "Brightluxx", "category": "Video", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/undtyljqbxz2j4frm9jy.webp"},
    {"name": "BRIGHTLUXX P2.5 LED POSTER SCREEN WATERPROOF FLOOR STAND", "brand": "Brightluxx", "category": "Video", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/msjaernn6uefdokl69en.webp"},
    # Sonos (Audio/Home Cinema)
    {"name": "Streaming Amplifier", "brand": "Sonos", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Amplifier-AMPG1UK1BLK.webp"},
    {"name": "PORT1UK1BLK", "brand": "Sonos", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Port-PORT1UK1BLK.webp"},
    {"name": "Sonos Move 2 Black", "brand": "Sonos", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Sonos-Move-2-Black-MOVE2UK1BLKR2.webp"},
    {"name": "Sonos Move 2 White", "brand": "Sonos", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Sonos-Move-2-White-MOVE2UK1R2.webp"},
    {"name": "Sonos Five White", "brand": "Sonos", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Sonos-Five-White-FIVE1UK1.webp"},
    {"name": "Era 300 UK R2 White", "brand": "Sonos", "category": "Audio", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Era-300-UK-R2-White-E30G1UK1R2.webp"},
    {"name": "Sonos Arc Ultra White", "brand": "Sonos", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Sonos-Arc-Ultra-White-ARCG2UK1.webp"},
    {"name": "Sonos Sub 4 White", "brand": "Sonos", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Sonos-Sub-4-White-SUBG4UK1.webp"},
    {"name": "Sonos Sub Mini White", "brand": "Sonos", "category": "Home Cinema", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/10/SONOS-Sonos-Sub-Mini-White-SUBM1UK1.webp"},
    # Bowers & Wilkins (Audio)
    {"name": "B&W CT7.3 LCRS Black", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Theater", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CT7.3-LCRS-Black-1.webp"},
    {"name": "B&W CCM663 RD", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "Custom Install 600 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM663-RD.webp"},
    {"name": "B&W FS M1 Black", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Install 300 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-FS-M1-black.webp"},
    {"name": "B&W FS M1 White", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Install 300 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-FS-M1-White.webp"},
    {"name": "B&W CCM664 SR", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "Custom Install 600 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM664-SR.webp"},
    {"name": "B&W CCM663", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "Custom Install 600 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM663.webp"},
    {"name": "B&W CT SW10 Black", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Theater", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CT-SW10-Black.webp"},
    {"name": "B&W CT SW12 Black", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Theater", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CT-SW12-Black.webp"},
    {"name": "B&W CT SW15 Black", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Theater", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CT-SW15-Black.webp"},
    {"name": "B&W SA 1000", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Theater", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-SA-1000.webp"},
    {"name": "B&W CCM362", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Install 300 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM362.webp"},
    {"name": "B&W CCM382", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Install 300 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM382.webp"},
    {"name": "B&W CWM 362", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "B&W Custom Install 300 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CWM-362.webp"},
    {"name": "B&W CCM 632", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "Custom Install 600 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM-632.webp"},
    {"name": "B&W CCM665", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "Custom Install 600 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM665.webp"},
    {"name": "B&W CCM664", "brand": "Bowers&Wilkins", "category": "Audio", "sub_category": "Custom Install 600 Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BW-CCM664.webp"},
    # Artesania Audio (Audio/Furniture)
    {"name": "MIR3 - 3 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Prestige Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-MIR3-3-Level.webp"},
    {"name": "MIR33 - 3+3 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Prestige Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-MIR33-33-Level.webp"},
    {"name": "PR2 - 2 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR2-2-Level.webp"},
    {"name": "PR 22 - 2+2 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR-22-22-Level.webp"},
    {"name": "PR 222 - 2+2+2 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR-222-222-Level.webp"},
    {"name": "PR 3 - 3 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR-3-3-Level.webp"},
    {"name": "PR 33 - 3+3 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR-33-33-Level.webp"},
    {"name": "PR 333 - 3+3+3 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR-333-333-Level.webp"},
    {"name": "PR - 4 Level", "brand": "Artesania Audio", "category": "Audio", "sub_category": "Classic Mini Line", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/ARTESANIA-PR-4-Level.webp"},
    # Axxess (Audio/Accessories)
    {"name": "FORTE 1", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess FORTE", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/FORTE-1.webp"},
    {"name": "FORTE 2", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess FORTE", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/FORTE-2.webp"},
    {"name": "FORTE 3", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess FORTE", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/FORTE-3.webp"},
    {"name": "L1 PER PAIR", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess L Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/L1-PER-PAIR.webp"},
    {"name": "L3 PER PAIR", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess L Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/L3-PER-PAIR.webp"},
    {"name": "L1 FS PER PAIR", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess L Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/L1-FS-PER-PAIR.webp"},
    {"name": "Power Distributor 4 Outlets", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess Power Distributor", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Power-Distributor-4-Outlets.webp"},
    {"name": "Power Distributor SE 4 Outlets", "brand": "Axxess", "category": "Audio", "sub_category": "Axxess Power Distributor", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Power-Distributor-SE-4-Outlets.webp"},
    {"name": "Power Cable - 1 mtr - EU/US", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Power Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Power-Cable-1mtr-EU.US_.webp"},
    {"name": "Power Cable - 2 mtr - EU/US", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Power Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Power-Cable-2-mtr-EU.US_.webp"},
    {"name": "Power Cable - 4 mtr - EU/US", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Power Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Power-Cable-4-mtr-EU.US_.webp"},
    {"name": "RCA Interconnect - 1 mtr PAIR", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Signal Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/RCA-Interconnect-1-mtr-PAIR.webp"},
    {"name": "RCA Interconnect - 2 mtr PAIR", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Signal Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/RCA-Interconnect-2-mtr-PAIR.webp"},
    {"name": "Speaker Cable 3 mtr PAIR (Banana Plugs)", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Speaker Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Speaker-Cable-3-mtr-PAIR-Banana-Plugs.webp"},
    {"name": "Speaker Cable 4 mtr PAIR (Banana Plugs)", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Speaker Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Speaker-Cable-4-mtr-PAIR-Banana-Plugs.webp"},
    {"name": "Digital Interconnect BNC 1 mtr pc", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Digital cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Digital-Interconnect-BNC-1-mtr-pc.webp"},
    {"name": "Digital Interconnect BNC 2 mtr pc", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Digital cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Digital-Interconnect-BNC-2-mtr-pc.webp"},
    {"name": "Ethernet Cable 1 mtr CAT 8", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Ethernet Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Ehternet-Cable-1-mtr-CAT-8.webp"},
    {"name": "Ethernet Cable 2 mtr CAT 8", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Ethernet Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Ehternet-Cable-2-mtr-CAT-8.webp"},
    {"name": "Ethernet Cable 4 mtr CAT 8", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Ethernet Cable", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Ehternet-Cable-4-mtr-CAT-8.webp"},
    {"name": "Resonance Control 4 pc Set", "brand": "Axxess", "category": "Accessories", "sub_category": "Axxess Resonance Control", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Resonance-Control-4-pc-Set.webp"},
    # Aavik (Audio)
    {"name": "Aavik P-188", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik P Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-P-188.webp"},
    {"name": "Aavik P-288", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik P Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-P-288.webp"},
    {"name": "Aavik P-588", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik P Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-P-588.webp"},
    {"name": "Aavik P-880", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik P Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-P-880.webp"},
    {"name": "Aavik I-188", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik I Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-I-188.webp"},
    {"name": "Aavik I-288", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik I Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-I-288.webp"},
    {"name": "Aavik I-588", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik I Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-I-588.webp"},
    {"name": "Aavik I-880", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik I Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-I-880.webp"},
    {"name": "Aavik SD-188", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik SD Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-SD-188.webp"},
    {"name": "Aavik SD-288", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik SD Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-SD-288.webp"},
    {"name": "Aavik SD-588", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik SD Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-SD-588.webp"},
    {"name": "Aavik SD-880", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik SD Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-SD-880.webp"},
    {"name": "Aavik R-180", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik R Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/AAVIK-R-180.webp"},
    {"name": "Aavik R-280", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik R Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/AAVIK-R280.webp"},
    {"name": "Aavik R-580", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik R Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/AAVIK-R580.webp"},
    {"name": "Aavik R-880", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik R Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-R-880.webp"},
    {"name": "Aavik U-188", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik U Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-U-188.webp"},
    {"name": "Aavik U-288", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik U Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-U-288.webp"},
    {"name": "Aavik U-588", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik U Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-U-588.webp"},
    {"name": "Aavik C-880", "brand": "Aavik", "category": "Audio", "sub_category": "Aavik C Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Aavik-C-880.webp"},
    # Borresen (Audio)
    {"name": "T5 CRYO - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen T Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-06.webp"},
    {"name": "C1 - PER PAIR Incl Stands", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen C Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-01-1.webp"},
    {"name": "C2 - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen C Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-12.webp"},
    {"name": "C3 - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen C Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-03.webp"},
    {"name": "X1 - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "X Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-14.webp"},
    {"name": "X1 Floor Stand - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "X Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-15.webp"},
    {"name": "X2 - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "X Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-16.webp"},
    {"name": "X3 - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "X Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-17.webp"},
    {"name": "X6 - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "X Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-18.webp"},
    {"name": "M1 - PER PAIR Incl Floor Stands with Darkz Z2S", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen M Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-01-2.webp"},
    {"name": "M2 - PER PAIR with Darkz Z2S", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen M Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-13.webp"},
    {"name": "M3 - PER PAIR with Darkz Z2S", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen M Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-04.webp"},
    {"name": "M6 - PER PAIR with Darkz Z2S", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen M Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-17-1.webp"},
    {"name": "T1 Silver Supreme Edition PER PAIR Incl Floor Stands", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen T Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-05.webp"},
    {"name": "T3 Silver Supreme Edition PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen T Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-06-1.webp"},
    {"name": "T5 Silver Supreme Edition PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen T Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-10.webp"},
    {"name": "T1 CRYO Incl Floor Stands PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen T Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-08.webp"},
    {"name": "T3 CRYO - PER PAIR", "brand": "Borresen", "category": "Audio", "sub_category": "Borresen T Series", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/BORRESEN-20-PRODUCTS-09.webp"},
    # Lumibright (Lighting)
    {"name": "LBM019.T.8TW.WBK.20.DR", "brand": "Lumibright", "category": "Lighting", "sub_category": "Lumibright LED Down Lights", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Untitled-8-04.webp"},
    {"name": "LB3326.T.8TW1.9003.90.DDR", "brand": "Lumibright", "category": "Lighting", "sub_category": "Lumibright LED Down Lights", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Untitled-8-05.webp"},
    {"name": "L13007.9TW.01.120.DR", "brand": "Lumibright", "category": "Lighting", "sub_category": "Lumibright LED Down Lights", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Untitled-8-06.webp"},
    {"name": "LBTMG36", "brand": "Lumibright", "category": "Lighting", "sub_category": "Lumibright Modular Lighting", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/Untitled-8-01.webp"},
    # Lexa Lifestyle (Automation)
    {"name": "LXT1160", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1160.webp"},
    {"name": "LXT1159", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1159.webp"},
    {"name": "LXT1161", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1161.webp"},
    {"name": "LXT1162", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1162.webp"},
    {"name": "LXT1165", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1165.webp"},
    {"name": "LXT1166", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1166.webp"},
    {"name": "LXT1167", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1167.webp"},
    {"name": "LXT1168", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1168.webp"},
    {"name": "LXT1169", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1169.webp"},
    {"name": "LXT1170", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1170.webp"},
    {"name": "LXT1171", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1171.webp"},
    {"name": "LXT1172", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1172.webp"},
    {"name": "LXT1173", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1173.webp"},
    {"name": "LXT1174", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1174.webp"},
    {"name": "LXT1175", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1175.webp"},
    {"name": "LXT1176", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1176.webp"},
    {"name": "LXT1177", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1177.webp"},
    {"name": "LXT1178", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1178.webp"},
    {"name": "LXT1179", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1179.webp"},
    {"name": "LXT1180", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1180.webp"},
    {"name": "LXT1181", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1181.jpg"},
    {"name": "LXT1182", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1182.jpg"},
    {"name": "LXT1183", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1183.jpg"},
    {"name": "LXT1184", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1184.jpg"},
    {"name": "LXT1185", "brand": "Lexa Lifestyle", "category": "Automation", "image_url": "https://lexalifestyle.com/wp-content/uploads/2025/09/LEXA-LXT1185-1.jpg"},
]


async def main():
    client_db = AsyncIOMotorClient(mongo_url)
    db = client_db[db_name]

    # Clear existing catalog products
    deleted = await db.catalog_products.delete_many({})
    print(f"Cleared {deleted.deleted_count} existing catalog products")

    now = datetime.now(timezone.utc).isoformat()
    success_count = 0
    fail_count = 0

    async with httpx.AsyncClient(
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
        timeout=30,
        follow_redirects=True,
        limits=httpx.Limits(max_connections=10)
    ) as http_client:
        for i, prod in enumerate(PRODUCTS_DATA):
            name = prod["name"]
            brand = prod["brand"]
            category = prod["category"]
            sub_cat = prod.get("sub_category")
            image_url = prod.get("image_url", "")

            slug = slugify(name)

            # Download image
            local_image = ""
            if image_url:
                # Create filename from URL
                parsed = urlparse(image_url)
                ext = os.path.splitext(parsed.path)[1] or '.webp'
                safe_name = re.sub(r'[^\w.-]', '_', os.path.basename(parsed.path))
                if not safe_name:
                    safe_name = f"product_{slug}{ext}"
                local_image = await download_image(http_client, image_url, safe_name)

            # Auto-detect series if not set
            if not sub_cat:
                sub_cat = detect_series(brand, name)

            product_doc = {
                "id": str(uuid4()),
                "slug": slug,
                "name": name,
                "brand": brand,
                "category": category,
                "sub_category": sub_cat,
                "description": "",
                "image": local_image,
                "images": [],
                "specifications": [],
                "features": [],
                "related_solutions": [],
                "featured": False,
                "published": True,
                "source_url": f"https://lexalifestyle.com/products/{slug}/",
                "created_at": now,
                "updated_at": now,
            }

            try:
                await db.catalog_products.insert_one(product_doc)
                success_count += 1
                if (i + 1) % 20 == 0:
                    print(f"  Progress: {i+1}/{len(PRODUCTS_DATA)} products seeded...")
            except Exception as e:
                print(f"  Error inserting {name}: {e}")
                fail_count += 1

    # Create indexes
    await db.catalog_products.create_index("slug", unique=True)
    await db.catalog_products.create_index("brand")
    await db.catalog_products.create_index("category")
    await db.catalog_products.create_index("sub_category")
    await db.catalog_products.create_index("published")
    await db.catalog_products.create_index([("name", 1)])
    await db.catalog_products.create_index([
        ("name", "text"),
        ("brand", "text"),
        ("category", "text"),
        ("description", "text"),
    ])

    print(f"\nSeed complete: {success_count} products created, {fail_count} failures")
    print(f"Total products in DB: {await db.catalog_products.count_documents({})}")

    client_db.close()


if __name__ == "__main__":
    asyncio.run(main())
