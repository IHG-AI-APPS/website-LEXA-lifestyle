'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Kuwait City",
  "region": "Kuwait",
  "heroTitle": "Home Automation",
  "heroHighlight": "Kuwait City",
  "heroDescription": "Kuwait's trusted smart home automation partner. From Salmiya villas to Mishref estates, LEXA delivers intelligent luxury for Kuwait's finest properties.",
  "stats": [
    {
      "value": "35+",
      "label": "Kuwait Projects"
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
      "name": "Salmiya",
      "type": "Coastal Residences",
      "projects": "15+"
    },
    {
      "name": "Mishref",
      "type": "Luxury Villas",
      "projects": "12+"
    },
    {
      "name": "Salwa",
      "type": "Premium Estates",
      "projects": "10+"
    },
    {
      "name": "Shaab",
      "type": "Waterfront Homes",
      "projects": "8+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Kuwait?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Kuwait City Smart Homes",
    "description": "Kuwait's trusted smart home automation partner. From Salmiya villas to Mishref estates, LEXA delivers intelligent luxury for Kuwait's finest properties.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kuwait City",
      "addressRegion": "Kuwait",
      "addressCountry": "Kuwait"
    },
    "areaServed": [
      "Kuwait City",
      "Salmiya",
      "Mishref"
    ],
    "priceRange": "KWD 8,000 - 50,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function KuwaitClient() {
  return <GeoPageTemplate data={pageData} />
}
