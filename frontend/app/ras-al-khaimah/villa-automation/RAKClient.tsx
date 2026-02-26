'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Ras Al Khaimah",
  "region": "RAK, UAE",
  "heroTitle": "Villa Automation",
  "heroHighlight": "Ras Al Khaimah",
  "heroDescription": "Smart home automation for RAK's premium residences. From Al Hamra Village to Mina Al Arab, LEXA delivers intelligent living with mountain and sea views.",
  "stats": [
    {
      "value": "20+",
      "label": "RAK Projects"
    },
    {
      "value": "Premium",
      "label": "Quality"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Al Hamra Village",
      "type": "Golf & Marina",
      "projects": "10+"
    },
    {
      "name": "Mina Al Arab",
      "type": "Waterfront Living",
      "projects": "8+"
    },
    {
      "name": "Hayat Island",
      "type": "Resort Community",
      "projects": "5+"
    },
    {
      "name": "Al Marjan Island",
      "type": "Island Residences",
      "projects": "4+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in RAK?",
  "faqs": [
    {
      "question": "Does LEXA service Ras Al Khaimah?",
      "answer": "Yes, LEXA provides complete smart home services across RAK including Al Hamra Village and Mina Al Arab."
    },
    {
      "question": "What packages are available for RAK homes?",
      "answer": "RAK packages start from AED 35,000 for apartments and AED 70,000 for villas. We offer special packages for Al Hamra residents."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Ras Al Khaimah Smart Homes",
    "description": "Smart home automation for RAK's premium residences. From Al Hamra Village to Mina Al Arab, LEXA delivers intelligent living with mountain and sea views.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ras Al Khaimah",
      "addressRegion": "RAK, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Ras Al Khaimah",
      "Al Hamra Village",
      "Mina Al Arab"
    ],
    "priceRange": "AED 35,000 - 200,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function RAKClient() {
  return <GeoPageTemplate data={pageData} slug="ras-al-khaimah/villa-automation" />
}
