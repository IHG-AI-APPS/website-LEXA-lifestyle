'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Umm Al Quwain",
  "region": "UAQ, UAE",
  "heroTitle": "Home Automation",
  "heroHighlight": "Umm Al Quwain",
  "heroDescription": "Smart home automation for Umm Al Quwain residences. LEXA brings intelligent living to UAQ's growing residential communities at competitive prices.",
  "stats": [
    {
      "value": "10+",
      "label": "UAQ Projects"
    },
    {
      "value": "Value",
      "label": "Packages"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Al Salamah",
      "type": "Residential Area",
      "projects": "5+"
    },
    {
      "name": "Umm Al Quwain Marina",
      "type": "Waterfront",
      "projects": "3+"
    },
    {
      "name": "Al Raas",
      "type": "Heritage Area",
      "projects": "2+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in UAQ?",
  "faqs": [
    {
      "question": "Do you service Umm Al Quwain?",
      "answer": "Yes, LEXA provides full smart home services in UAQ including installation, programming, and ongoing maintenance support."
    },
    {
      "question": "What are the costs for UAQ?",
      "answer": "UAQ packages start from AED 25,000 for apartments and AED 45,000 for villas. Very competitive pricing with premium service quality."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Umm Al Quwain Smart Homes",
    "description": "Smart home automation for Umm Al Quwain residences. LEXA brings intelligent living to UAQ's growing residential communities at competitive prices.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Umm Al Quwain",
      "addressRegion": "UAQ, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Umm Al Quwain"
    ],
    "priceRange": "AED 25,000 - 120,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function UAQClient() {
  return <GeoPageTemplate data={pageData} slug="umm-al-quwain/home-automation" />
}
