'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Cairo",
  "region": "Egypt",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Cairo",
  "heroDescription": "Egypt's premier smart living. From New Cairo compounds to Zamalek penthouses, LEXA delivers intelligent luxury to the land of the Pharaohs.",
  "stats": [
    {
      "value": "120+",
      "label": "Egypt Projects"
    },
    {
      "value": "15+",
      "label": "Years"
    },
    {
      "value": "Premium",
      "label": "Brands"
    }
  ],
  "communities": [
    {
      "name": "New Cairo",
      "type": "Gated Communities",
      "projects": "45+"
    },
    {
      "name": "Maadi",
      "type": "Luxury Villas",
      "projects": "35+"
    },
    {
      "name": "Zamalek",
      "type": "Premium Apartments",
      "projects": "25+"
    },
    {
      "name": "Sheikh Zayed City",
      "type": "Modern Compounds",
      "projects": "30+"
    },
    {
      "name": "6th of October",
      "type": "Smart Compounds",
      "projects": "20+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Cairo?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Cairo Smart Homes",
    "description": "Egypt's premier smart living. From New Cairo compounds to Zamalek penthouses, LEXA delivers intelligent luxury to the land of the Pharaohs.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "addressRegion": "Egypt",
      "addressCountry": "Egypt"
    },
    "areaServed": [
      "Cairo",
      "New Cairo",
      "Maadi",
      "Zamalek"
    ],
    "priceRange": "EGP 200,000 - 2,000,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function CairoClient() {
  return <GeoPageTemplate data={pageData} />
}
