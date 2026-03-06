'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Dubai Marina",
  "region": "Dubai, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Dubai Marina",
  "heroDescription": "Elevate your Dubai Marina penthouse or apartment with intelligent automation. Experience seamless control of lighting, climate, security, and entertainment.",
  "stats": [
    {
      "value": "200+",
      "label": "Marina Projects"
    },
    {
      "value": "50+",
      "label": "Towers Served"
    }
  ],
  "communities": [
    {
      "name": "Marina Gate",
      "type": "Premium tower residences",
      "price": "AED 3M+"
    },
    {
      "name": "Cayan Tower",
      "type": "Iconic twisted tower",
      "price": "AED 2M+"
    },
    {
      "name": "Princess Tower",
      "type": "Luxury high-rise",
      "price": "AED 2.5M+"
    },
    {
      "name": "23 Marina",
      "type": "Premium residences",
      "price": "AED 3M+"
    },
    {
      "name": "Elite Residence",
      "type": "Luxury apartments",
      "price": "AED 2M+"
    },
    {
      "name": "Trident Grand",
      "type": "Waterfront living",
      "price": "AED 1.5M+"
    }
  ],
  "ctaTitle": "Transform Your Marina Home",
  "heroImage": "https://files.ihgbrands.com/lexa/migrated/997eba18d3897afd.png",
  "ctaSubtitle": "Join hundreds of Dubai Marina residents enjoying smart home living.",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Lighting Design",
      "description": "Yacht-view optimized lighting scenes"
    },
    {
      "icon": "Music",
      "title": "Whole-Home Audio",
      "description": "Multi-zone streaming systems"
    },
    {
      "icon": "Shield",
      "title": "Smart Security",
      "description": "Video intercoms & access control"
    },
    {
      "icon": "Thermometer",
      "title": "Climate Control",
      "description": "Zoned AC with energy monitoring"
    },
    {
      "icon": "Film",
      "title": "Home Cinema",
      "description": "Dedicated theater or living room setup"
    },
    {
      "icon": "Home",
      "title": "Marina Integration",
      "description": "Control systems from your yacht"
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Dubai Marina Smart Homes",
    "description": "Elevate your Dubai Marina penthouse or apartment with intelligent automation. Experience seamless control of lighting, climate, security, and entertainment.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai Marina",
      "addressRegion": "Dubai, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Dubai Marina"
    ],
    "priceRange": "AED 60,000 - 300,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function DubaiMarinaClient() {
  return <GeoPageTemplate data={pageData} slug="dubai/dubai-marina-smart-homes" />
}
