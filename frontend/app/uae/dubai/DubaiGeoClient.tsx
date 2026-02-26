'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Dubai",
  "region": "Dubai, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Dubai",
  "heroDescription": "Dubai's #1 luxury home automation company. Serving Emirates Hills, Downtown, Palm Jumeirah, Marina, Arabian Ranches, and all premium communities.",
  "stats": [
    {"value": "300+", "label": "Villas Automated"},
    {"value": "AED 250K", "label": "Average Project"},
    {"value": "4.9/5", "label": "Customer Rating"}
  ],
  "communities": [
    {"name": "Emirates Hills", "type": "Golf course estates", "price": "AED 30M+"},
    {"name": "Downtown Dubai", "type": "Burj Khalifa views", "price": "AED 5M+"},
    {"name": "Palm Jumeirah", "type": "Beachfront villas", "price": "AED 15M+"},
    {"name": "Dubai Marina", "type": "Waterfront towers", "price": "AED 2M+"},
    {"name": "Arabian Ranches", "type": "Family community", "price": "AED 4M+"},
    {"name": "Jumeirah", "type": "Premium beachside", "price": "AED 8M+"},
    {"name": "Business Bay", "type": "Modern high-rises", "price": "AED 2M+"},
    {"name": "Dubai Hills Estate", "type": "Golf community", "price": "AED 5M+"},
    {"name": "The Springs", "type": "Family villas", "price": "AED 3M+"},
    {"name": "The Meadows", "type": "Lakeside living", "price": "AED 4M+"}
  ],
  "services": [
    {"icon": "Lightbulb", "title": "Intelligent Lighting", "description": "Lutron & KNX systems tailored for Dubai climate"},
    {"icon": "Thermometer", "title": "Climate Control", "description": "Energy-efficient AC automation for desert heat"},
    {"icon": "Film", "title": "Home Cinema", "description": "Dolby Atmos theaters and entertainment rooms"},
    {"icon": "Shield", "title": "Security Systems", "description": "Integrated CCTV, access control & smart locks"},
    {"icon": "Music", "title": "Multi-Room Audio", "description": "Sonos & architectural speakers throughout"},
    {"icon": "Home", "title": "Whole-Home Control", "description": "Control4 & Crestron complete integration"}
  ],
  "ctaTitle": "Ready to Automate Your Dubai Home?",
  "ctaSubtitle": "Contact LEXA Lifestyle for a free consultation and quote for your Dubai property.",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Smart Home Automation Dubai",
    "description": "Dubai's leading smart home automation company.",
    "address": {"@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE"},
    "areaServed": ["Dubai", "Emirates Hills", "Palm Jumeirah", "Downtown Dubai", "Dubai Marina"],
    "priceRange": "AED 60,000 - 2,000,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function DubaiGeoClient() {
  return <GeoPageTemplate data={pageData} slug="uae/dubai" />
}
