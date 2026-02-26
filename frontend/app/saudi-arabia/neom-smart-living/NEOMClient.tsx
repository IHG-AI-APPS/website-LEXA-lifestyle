'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "NEOM",
  "region": "Saudi Arabia",
  "heroTitle": "Smart Living",
  "heroHighlight": "NEOM",
  "heroDescription": "Next-generation smart home automation for NEOM's revolutionary communities. LEXA is ready to power the future of intelligent living in Saudi Arabia's mega-city.",
  "stats": [
    {
      "value": "Future",
      "label": "Ready"
    },
    {
      "value": "IoT",
      "label": "Integrated"
    },
    {
      "value": "AI",
      "label": "Powered"
    }
  ],
  "communities": [
    {
      "name": "THE LINE",
      "type": "Cognitive City",
      "projects": "Planning"
    },
    {
      "name": "Oxagon",
      "type": "Industrial Innovation",
      "projects": "Planning"
    },
    {
      "name": "Trojena",
      "type": "Mountain Tourism",
      "projects": "Planning"
    },
    {
      "name": "Sindalah",
      "type": "Luxury Island",
      "projects": "Planning"
    }
  ],
  "ctaTitle": "Partner with LEXA for NEOM Projects",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - NEOM Smart Homes",
    "description": "Next-generation smart home automation for NEOM's revolutionary communities. LEXA is ready to power the future of intelligent living in Saudi Arabia's mega-city.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "NEOM",
      "addressRegion": "Saudi Arabia",
      "addressCountry": "Saudi Arabia"
    },
    "areaServed": [
      "NEOM",
      "THE LINE",
      "Oxagon",
      "Trojena"
    ],
    "priceRange": "Custom",
    "telephone": "+971-42-670-470"
  }
}

export default function NEOMClient() {
  return <GeoPageTemplate data={pageData} slug="saudi-arabia/neom-smart-living" />
}
