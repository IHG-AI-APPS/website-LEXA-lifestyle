'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Muscat",
  "region": "Oman",
  "heroTitle": "Home Automation",
  "heroHighlight": "Muscat",
  "heroDescription": "Oman's premier smart home solutions. From Muscat Hills villas to Al Mouj residences, LEXA delivers intelligent automation designed for Omani living.",
  "stats": [
    {
      "value": "40+",
      "label": "Oman Projects"
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
      "name": "Al Mouj",
      "type": "Waterfront Living",
      "projects": "20+"
    },
    {
      "name": "Muscat Hills",
      "type": "Golf Community",
      "projects": "15+"
    },
    {
      "name": "Shatti Al Qurum",
      "type": "Beach Villas",
      "projects": "10+"
    },
    {
      "name": "Madinat Sultan Qaboos",
      "type": "Premium Residences",
      "projects": "8+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Muscat?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Muscat Smart Homes",
    "description": "Oman's premier smart home solutions. From Muscat Hills villas to Al Mouj residences, LEXA delivers intelligent automation designed for Omani living.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Muscat",
      "addressRegion": "Oman",
      "addressCountry": "Oman"
    },
    "areaServed": [
      "Muscat",
      "Al Mouj",
      "Muscat Hills"
    ],
    "priceRange": "OMR 10,000 - 80,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function MuscatClient() {
  return <GeoPageTemplate data={pageData} />
}
