'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Sharjah",
  "region": "Sharjah, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Sharjah",
  "heroDescription": "Leading smart home automation in Sharjah. Serving Al Majaz, Al Qasimia, Muwailih, and all Sharjah communities. Official Control4 & Crestron dealer.",
  "stats": [
    {"value": "40+", "label": "Sharjah Projects"},
    {"value": "Value", "label": "Focused"},
    {"value": "4.9/5", "label": "Customer Rating"}
  ],
  "communities": [
    {"name": "Al Majaz", "type": "Waterfront area", "projects": "15+"},
    {"name": "Al Qasimia", "type": "Central Sharjah", "projects": "10+"},
    {"name": "Muwailih", "type": "Residential hub", "projects": "8+"},
    {"name": "Al Nahda", "type": "Modern living", "projects": "6+"},
    {"name": "Al Khan", "type": "Lagoon views", "projects": "5+"},
    {"name": "Al Zahia", "type": "Master community", "projects": "12+"}
  ],
  "services": [
    {"icon": "Lightbulb", "title": "Smart Lighting", "description": "SEWA-optimized energy-efficient lighting"},
    {"icon": "Thermometer", "title": "AC Automation", "description": "Smart climate control for Sharjah homes"},
    {"icon": "Shield", "title": "Security Systems", "description": "Complete security with smart locks"},
    {"icon": "Music", "title": "Audio Systems", "description": "Multi-room audio for family living"},
    {"icon": "Film", "title": "Home Theater", "description": "Family entertainment systems"},
    {"icon": "Home", "title": "Full Automation", "description": "Control4 whole-home integration"}
  ],
  "ctaTitle": "Ready to Automate Your Sharjah Home?",
  "ctaSubtitle": "Contact LEXA Lifestyle for a free consultation for your Sharjah property.",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Smart Home Sharjah",
    "description": "Leading smart home automation in Sharjah.",
    "address": {"@type": "PostalAddress", "addressLocality": "Sharjah", "addressRegion": "Sharjah", "addressCountry": "AE"},
    "areaServed": ["Sharjah", "Al Majaz", "Muwailih", "Al Zahia"],
    "priceRange": "AED 30,000 - 200,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function SharjahGeoClient() {
  return <GeoPageTemplate data={pageData} />
}
