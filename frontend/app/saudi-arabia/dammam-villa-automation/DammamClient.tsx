'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Dammam",
  "region": "Saudi Arabia",
  "heroTitle": "Villa Automation",
  "heroHighlight": "Dammam",
  "heroDescription": "Smart home solutions for the Eastern Province. From Al Khobar compounds to Dammam villas, LEXA delivers intelligent living for Saudi Arabia's oil capital.",
  "stats": [
    {
      "value": "60+",
      "label": "Eastern Province Projects"
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
      "name": "Al Khobar",
      "type": "Corniche Villas",
      "projects": "25+"
    },
    {
      "name": "Dhahran",
      "type": "Aramco Communities",
      "projects": "20+"
    },
    {
      "name": "Half Moon Bay",
      "type": "Waterfront Homes",
      "projects": "15+"
    },
    {
      "name": "Al Shatea",
      "type": "Premium Residences",
      "projects": "10+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Dammam?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Dammam Smart Homes",
    "description": "Smart home solutions for the Eastern Province. From Al Khobar compounds to Dammam villas, LEXA delivers intelligent living for Saudi Arabia's oil capital.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dammam",
      "addressRegion": "Saudi Arabia",
      "addressCountry": "Saudi Arabia"
    },
    "areaServed": [
      "Dammam",
      "Al Khobar",
      "Dhahran"
    ],
    "priceRange": "SAR 50,000 - 300,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function DammamClient() {
  return <GeoPageTemplate data={pageData} slug="saudi-arabia/dammam-villa-automation" />
}
