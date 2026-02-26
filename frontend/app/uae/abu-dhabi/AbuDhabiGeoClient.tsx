'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Abu Dhabi",
  "region": "Abu Dhabi, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Abu Dhabi",
  "heroDescription": "Abu Dhabi's premier smart home automation company. Serving Saadiyat Island, Yas Island, Al Reem, Khalifa City, and all major residential areas.",
  "stats": [
    {"value": "150+", "label": "Projects Completed"},
    {"value": "AED 280K", "label": "Average Project"},
    {"value": "4.9/5", "label": "Customer Rating"}
  ],
  "communities": [
    {"name": "Saadiyat Island", "type": "Cultural district", "projects": "45+"},
    {"name": "Yas Island", "type": "Entertainment hub", "projects": "30+"},
    {"name": "Al Reem Island", "type": "Urban high-rise", "projects": "60+"},
    {"name": "Khalifa City", "type": "Family villas", "projects": "40+"},
    {"name": "Al Reef", "type": "Modern compounds", "projects": "20+"},
    {"name": "Corniche", "type": "Premium waterfront", "projects": "15+"},
    {"name": "Al Raha Beach", "type": "Beachfront living", "projects": "25+"},
    {"name": "Al Bateen", "type": "Exclusive area", "projects": "10+"}
  ],
  "services": [
    {"icon": "Lightbulb", "title": "Intelligent Lighting", "description": "Lutron & KNX systems for Abu Dhabi homes"},
    {"icon": "Thermometer", "title": "Climate Control", "description": "ADDC-optimized AC automation"},
    {"icon": "Film", "title": "Home Cinema", "description": "Dolby Atmos theater rooms"},
    {"icon": "Shield", "title": "Security Systems", "description": "Integrated CCTV & access control"},
    {"icon": "Music", "title": "Multi-Room Audio", "description": "Sonos & architectural speakers"},
    {"icon": "Home", "title": "Whole-Home Control", "description": "Control4 & Crestron integration"}
  ],
  "ctaTitle": "Ready to Automate Your Abu Dhabi Home?",
  "ctaSubtitle": "Contact LEXA Lifestyle for a free consultation for your Abu Dhabi property.",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Smart Home Abu Dhabi",
    "description": "Abu Dhabi's premier smart home automation company.",
    "address": {"@type": "PostalAddress", "addressLocality": "Abu Dhabi", "addressRegion": "Abu Dhabi", "addressCountry": "AE"},
    "areaServed": ["Abu Dhabi", "Saadiyat Island", "Yas Island", "Al Reem Island"],
    "priceRange": "AED 80,000 - 500,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AbuDhabiGeoClient() {
  return <GeoPageTemplate data={pageData} />
}
