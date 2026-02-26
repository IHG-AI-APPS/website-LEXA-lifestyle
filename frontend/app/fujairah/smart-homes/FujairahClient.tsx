'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Fujairah",
  "region": "Fujairah, UAE",
  "heroTitle": "Smart Homes",
  "heroHighlight": "Fujairah",
  "heroDescription": "Smart home automation for Fujairah's coastal and mountain residences. LEXA delivers premium automation tailored to Fujairah's unique environment.",
  "stats": [
    {
      "value": "15+",
      "label": "Fujairah Projects"
    },
    {
      "value": "Coastal",
      "label": "Optimized"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Fujairah City",
      "type": "Urban Residences",
      "projects": "8+"
    },
    {
      "name": "Dibba Al Fujairah",
      "type": "Coastal Homes",
      "projects": "5+"
    },
    {
      "name": "Al Faseel",
      "type": "Luxury Area",
      "projects": "3+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Fujairah?",
  "faqs": [
    {
      "question": "Does LEXA service Fujairah?",
      "answer": "Yes, LEXA provides full smart home services across Fujairah emirate including installation and maintenance."
    },
    {
      "question": "What are costs for Fujairah homes?",
      "answer": "Fujairah packages start from AED 30,000 for apartments and AED 60,000 for villas."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Fujairah Smart Homes",
    "description": "Smart home automation for Fujairah's coastal and mountain residences. LEXA delivers premium automation tailored to Fujairah's unique environment.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fujairah",
      "addressRegion": "Fujairah, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Fujairah"
    ],
    "priceRange": "AED 30,000 - 150,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function FujairahClient() {
  return <GeoPageTemplate data={pageData} slug="fujairah/smart-homes" />
}
