'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Emirates Hills",
  "region": "Dubai, UAE",
  "heroTitle": "Villa Automation",
  "heroHighlight": "Emirates Hills",
  "heroDescription": "Intelligent living for Dubai's most prestigious address. LEXA delivers world-class automation for Emirates Hills estates.",
  "stats": [
    {
      "value": "80+",
      "label": "Emirates Hills Projects"
    },
    {
      "value": "15yr",
      "label": "Community Experience"
    }
  ],
  "communities": [
    {
      "name": "Emirates Hills Villas",
      "type": "Golf course estates",
      "price": "AED 30M+"
    },
    {
      "name": "Sector E",
      "type": "Premium lake views",
      "price": "AED 40M+"
    },
    {
      "name": "Sector W",
      "type": "Signature mansions",
      "price": "AED 50M+"
    },
    {
      "name": "Sector P",
      "type": "Private estates",
      "price": "AED 35M+"
    },
    {
      "name": "Sector R",
      "type": "Renovated classics",
      "price": "AED 25M+"
    },
    {
      "name": "Sector L",
      "type": "Lake-facing luxury",
      "price": "AED 45M+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Emirates Hills Villa?",
  "heroImage": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920",
  "faqs": [
    {
      "question": "How much does Emirates Hills villa automation cost?",
      "answer": "Emirates Hills automation ranges from AED 400,000 for standard systems to AED 2,000,000+ for ultra-luxury estates. Average investment is AED 600,000-900,000 for comprehensive whole-home automation."
    },
    {
      "question": "Can you retrofit smart systems in older Emirates Hills villas?",
      "answer": "Yes, many Emirates Hills villas were built before smart home technology was standard. LEXA specializes in retrofitting using wireless Lutron and Control4 systems."
    },
    {
      "question": "What maintenance do Emirates Hills smart homes require?",
      "answer": "Emirates Hills smart homes benefit from quarterly maintenance visits. LEXA AMC packages from AED 15,000/year include preventive maintenance, software updates, 24/7 support, and priority service response."
    },
    {
      "question": "How do you handle Emirates Hills security requirements?",
      "answer": "We coordinate with Emirates Hills security for all installations. Our teams are pre-approved, and we manage access permits, ensuring seamless project execution while respecting community protocols."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Emirates Hills Smart Homes",
    "description": "Intelligent living for Dubai's most prestigious address. LEXA delivers world-class automation for Emirates Hills estates.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Emirates Hills",
      "addressRegion": "Dubai, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Emirates Hills"
    ],
    "priceRange": "AED 400,000 - 2,000,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function EmiratesHillsClient() {
  return <GeoPageTemplate data={pageData} />
}
