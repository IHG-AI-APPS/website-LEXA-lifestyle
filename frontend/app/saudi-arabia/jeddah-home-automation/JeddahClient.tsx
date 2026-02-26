'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Jeddah",
  "region": "Saudi Arabia",
  "heroTitle": "Home Automation",
  "heroHighlight": "Jeddah",
  "heroDescription": "Coastal smart living for Jeddah's finest residences. From Obhur villas to Al Shati palaces, LEXA brings intelligent luxury to the Red Sea coast.",
  "stats": [
    {
      "value": "80+",
      "label": "Jeddah Projects"
    },
    {
      "value": "Premium",
      "label": "Brands"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Obhur",
      "type": "Waterfront Villas",
      "projects": "30+"
    },
    {
      "name": "Al Shati",
      "type": "Luxury Palaces",
      "projects": "25+"
    },
    {
      "name": "Al Rawdah",
      "type": "Modern Compounds",
      "projects": "20+"
    },
    {
      "name": "Al Mohammadiyah",
      "type": "Premium Residences",
      "projects": "15+"
    },
    {
      "name": "King Abdullah Economic City",
      "type": "Smart Developments",
      "projects": "10+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Jeddah?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Jeddah Smart Homes",
    "description": "Coastal smart living for Jeddah's finest residences. From Obhur villas to Al Shati palaces, LEXA brings intelligent luxury to the Red Sea coast.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jeddah",
      "addressRegion": "Saudi Arabia",
      "addressCountry": "Saudi Arabia"
    },
    "areaServed": [
      "Jeddah",
      "Obhur",
      "Al Shati"
    ],
    "priceRange": "SAR 60,000 - 400,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function JeddahClient() {
  return <GeoPageTemplate data={pageData} />
}
