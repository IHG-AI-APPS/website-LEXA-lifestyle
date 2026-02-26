'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Casablanca",
  "region": "Morocco",
  "heroTitle": "Home Automation",
  "heroHighlight": "Casablanca",
  "heroDescription": "Morocco's smart home automation leader. From Anfa villas to CFC residences, LEXA delivers intelligent luxury for Casablanca's finest properties.",
  "stats": [
    {
      "value": "20+",
      "label": "Morocco Projects"
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
      "name": "Anfa Place",
      "type": "Luxury District",
      "projects": "10+"
    },
    {
      "name": "CFC",
      "type": "Financial Center",
      "projects": "8+"
    },
    {
      "name": "Ain Diab",
      "type": "Coastal Villas",
      "projects": "6+"
    },
    {
      "name": "Bouskoura",
      "type": "Golf Estates",
      "projects": "5+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Casablanca?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Casablanca Smart Homes",
    "description": "Morocco's smart home automation leader. From Anfa villas to CFC residences, LEXA delivers intelligent luxury for Casablanca's finest properties.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Casablanca",
      "addressRegion": "Morocco",
      "addressCountry": "Morocco"
    },
    "areaServed": [
      "Casablanca",
      "Anfa",
      "CFC"
    ],
    "priceRange": "MAD 100,000 - 800,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function CasablancaClient() {
  return <GeoPageTemplate data={pageData} slug="morocco/casablanca-home-automation" />
}
