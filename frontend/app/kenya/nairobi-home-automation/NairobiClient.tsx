'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Nairobi",
  "region": "Kenya",
  "heroTitle": "Home Automation",
  "heroHighlight": "Nairobi",
  "heroDescription": "East Africa's smart home automation pioneer. From Karen estates to Runda villas, LEXA delivers world-class intelligent living for Nairobi's premium residences.",
  "stats": [
    {
      "value": "15+",
      "label": "Kenya Projects"
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
      "name": "Karen",
      "type": "Luxury Estates",
      "projects": "8+"
    },
    {
      "name": "Runda",
      "type": "Premium Villas",
      "projects": "5+"
    },
    {
      "name": "Muthaiga",
      "type": "Diplomatic Quarter",
      "projects": "4+"
    },
    {
      "name": "Lavington",
      "type": "Modern Residences",
      "projects": "3+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Nairobi?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Nairobi Smart Homes",
    "description": "East Africa's smart home automation pioneer. From Karen estates to Runda villas, LEXA delivers world-class intelligent living for Nairobi's premium residences.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressRegion": "Kenya",
      "addressCountry": "Kenya"
    },
    "areaServed": [
      "Nairobi",
      "Karen",
      "Runda",
      "Muthaiga"
    ],
    "priceRange": "KES 1M - 10M+",
    "telephone": "+971-42-670-470"
  }
}

export default function NairobiClient() {
  return <GeoPageTemplate data={pageData} slug="kenya/nairobi-home-automation" />
}
