'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Ajman",
  "region": "Ajman, UAE",
  "heroTitle": "Home Automation",
  "heroHighlight": "Ajman",
  "heroDescription": "Smart home automation solutions for Ajman residents. Affordable luxury automation from LEXA for Ajman's growing residential communities.",
  "stats": [
    {
      "value": "20+",
      "label": "Ajman Projects"
    },
    {
      "value": "Affordable",
      "label": "Packages"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Al Zorah",
      "type": "Waterfront Community",
      "projects": "8+"
    },
    {
      "name": "Ajman Uptown",
      "type": "Modern Villas",
      "projects": "6+"
    },
    {
      "name": "Al Rashidiya",
      "type": "Residential Area",
      "projects": "5+"
    },
    {
      "name": "Al Helio",
      "type": "Family Villas",
      "projects": "4+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Ajman?",
  "faqs": [
    {
      "question": "Does LEXA service Ajman?",
      "answer": "Yes, LEXA provides full smart home services in Ajman including design, installation, programming, and maintenance."
    },
    {
      "question": "What are the costs for Ajman home automation?",
      "answer": "Ajman packages start from AED 25,000 for apartments and AED 50,000 for villas. Very competitive pricing with the same premium quality."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Ajman Smart Homes",
    "description": "Smart home automation solutions for Ajman residents. Affordable luxury automation from LEXA for Ajman's growing residential communities.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ajman",
      "addressRegion": "Ajman, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Ajman",
      "Al Zorah",
      "Ajman Uptown"
    ],
    "priceRange": "AED 25,000 - 150,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AjmanClient() {
  return <GeoPageTemplate data={pageData} slug="ajman/home-automation" />
}
