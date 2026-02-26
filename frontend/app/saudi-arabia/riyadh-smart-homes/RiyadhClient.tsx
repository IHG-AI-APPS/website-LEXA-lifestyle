'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Riyadh",
  "region": "Saudi Arabia",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Riyadh",
  "heroDescription": "Vision 2030 ready smart living for Riyadh's finest properties. From Al Malqa villas to KAFD penthouses, LEXA delivers intelligent luxury.",
  "stats": [
    {
      "value": "150+",
      "label": "Riyadh Projects"
    },
    {
      "value": "15+",
      "label": "Years Experience"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Al Malqa",
      "type": "Luxury Villas",
      "projects": "40+"
    },
    {
      "name": "Al Nakheel",
      "type": "Premium Compounds",
      "projects": "35+"
    },
    {
      "name": "Hittin",
      "type": "Modern Villas",
      "projects": "30+"
    },
    {
      "name": "Diplomatic Quarter",
      "type": "Embassy Residences",
      "projects": "25+"
    },
    {
      "name": "KAFD",
      "type": "Luxury Apartments",
      "projects": "20+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Riyadh?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Riyadh Smart Homes",
    "description": "Vision 2030 ready smart living for Riyadh's finest properties. From Al Malqa villas to KAFD penthouses, LEXA delivers intelligent luxury.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressRegion": "Saudi Arabia",
      "addressCountry": "Saudi Arabia"
    },
    "areaServed": [
      "Riyadh",
      "Al Malqa",
      "Hittin",
      "KAFD"
    ],
    "priceRange": "SAR 80,000 - 500,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function RiyadhClient() {
  return <GeoPageTemplate data={pageData} slug="saudi-arabia/riyadh-smart-homes" />
}
