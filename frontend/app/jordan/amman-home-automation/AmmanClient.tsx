'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Amman",
  "region": "Jordan",
  "heroTitle": "Home Automation",
  "heroHighlight": "Amman",
  "heroDescription": "Jordan's smart home automation leader. From Abdoun villas to Dabouq estates, LEXA delivers intelligent luxury for Amman's most prestigious addresses.",
  "stats": [
    {
      "value": "30+",
      "label": "Jordan Projects"
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
      "name": "Abdoun",
      "type": "Luxury Villas",
      "projects": "15+"
    },
    {
      "name": "Dabouq",
      "type": "Hilltop Estates",
      "projects": "10+"
    },
    {
      "name": "Deir Ghbar",
      "type": "Modern Residences",
      "projects": "8+"
    },
    {
      "name": "Um Uthaina",
      "type": "Premium Living",
      "projects": "5+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Amman?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Amman Smart Homes",
    "description": "Jordan's smart home automation leader. From Abdoun villas to Dabouq estates, LEXA delivers intelligent luxury for Amman's most prestigious addresses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amman",
      "addressRegion": "Jordan",
      "addressCountry": "Jordan"
    },
    "areaServed": [
      "Amman",
      "Abdoun",
      "Dabouq"
    ],
    "priceRange": "JOD 10,000 - 60,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AmmanClient() {
  return <GeoPageTemplate data={pageData} />
}
