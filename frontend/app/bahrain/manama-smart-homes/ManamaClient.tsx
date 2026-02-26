'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Manama",
  "region": "Bahrain",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Manama",
  "heroDescription": "Bahrain's trusted smart home automation partner. From Amwaj Islands to Seef District, LEXA delivers intelligent luxury for Manama's finest residences.",
  "stats": [
    {
      "value": "50+",
      "label": "Bahrain Projects"
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
      "name": "Amwaj Islands",
      "type": "Island Living",
      "projects": "30+"
    },
    {
      "name": "Seef District",
      "type": "Urban Luxury",
      "projects": "25+"
    },
    {
      "name": "Riffa",
      "type": "Royal Area Villas",
      "projects": "20+"
    },
    {
      "name": "Durrat Al Bahrain",
      "type": "Resort Living",
      "projects": "15+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Manama?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Manama Smart Homes",
    "description": "Bahrain's trusted smart home automation partner. From Amwaj Islands to Seef District, LEXA delivers intelligent luxury for Manama's finest residences.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Manama",
      "addressRegion": "Bahrain",
      "addressCountry": "Bahrain"
    },
    "areaServed": [
      "Manama",
      "Amwaj Islands",
      "Seef",
      "Riffa"
    ],
    "priceRange": "BHD 15,000 - 100,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function ManamaClient() {
  return <GeoPageTemplate data={pageData} />
}
