'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Lagos",
  "region": "Nigeria",
  "heroTitle": "Smart Home Solutions",
  "heroHighlight": "Lagos",
  "heroDescription": "West Africa's smart home automation leader. From Ikoyi mansions to Banana Island estates, LEXA delivers premium intelligent living for Lagos's elite.",
  "stats": [
    {
      "value": "20+",
      "label": "Nigeria Projects"
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
      "name": "Banana Island",
      "type": "Ultra-Luxury",
      "projects": "10+"
    },
    {
      "name": "Ikoyi",
      "type": "Premium Villas",
      "projects": "8+"
    },
    {
      "name": "Victoria Island",
      "type": "Luxury Apartments",
      "projects": "5+"
    },
    {
      "name": "Lekki Phase 1",
      "type": "Modern Living",
      "projects": "4+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Lagos?",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Lagos Smart Homes",
    "description": "West Africa's smart home automation leader. From Ikoyi mansions to Banana Island estates, LEXA delivers premium intelligent living for Lagos's elite.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressRegion": "Nigeria",
      "addressCountry": "Nigeria"
    },
    "areaServed": [
      "Lagos",
      "Banana Island",
      "Ikoyi",
      "Victoria Island"
    ],
    "priceRange": "NGN 5M - 50M+",
    "telephone": "+971-42-670-470"
  }
}

export default function LagosClient() {
  return <GeoPageTemplate data={pageData} slug="nigeria/lagos-smart-homes" />
}
