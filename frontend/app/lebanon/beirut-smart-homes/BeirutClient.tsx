'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Beirut",
  "region": "Lebanon",
  "heroTitle": "Smart Home Solutions",
  "heroHighlight": "Beirut",
  "heroDescription": "Lebanon's smart home automation experts. From Achrafieh apartments to Rabieh villas, LEXA delivers intelligent living for Beirut's discerning homeowners.",
  "stats": [
    {
      "value": "25+",
      "label": "Lebanon Projects"
    },
    {
      "value": "Premium",
      "label": "Brands"
    },
    {
      "value": "Dedicated",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Achrafieh",
      "type": "Historic Quarter",
      "projects": "10+"
    },
    {
      "name": "Rabieh",
      "type": "Mountain Villas",
      "projects": "8+"
    },
    {
      "name": "Verdun",
      "type": "Urban Luxury",
      "projects": "6+"
    },
    {
      "name": "Dbayeh",
      "type": "Waterfront Living",
      "projects": "5+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Beirut?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Beirut Smart Homes",
    "description": "Lebanon's smart home automation experts. From Achrafieh apartments to Rabieh villas, LEXA delivers intelligent living for Beirut's discerning homeowners.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beirut",
      "addressRegion": "Lebanon",
      "addressCountry": "Lebanon"
    },
    "areaServed": [
      "Beirut",
      "Achrafieh",
      "Rabieh"
    ],
    "priceRange": "USD 10,000 - 80,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function BeirutClient() {
  return <GeoPageTemplate data={pageData} slug="lebanon/beirut-smart-homes" />
}
