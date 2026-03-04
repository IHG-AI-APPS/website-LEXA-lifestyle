'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Jumeirah Beach Residence",
  "region": "Dubai, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Jumeirah Beach Residence",
  "heroDescription": "Transform your JBR beachfront apartment into a connected smart home. Coastal-grade systems designed for Dubai's premium beach lifestyle.",
  "stats": [
    {
      "value": "80+",
      "label": "JBR Projects"
    },
    {
      "value": "15yr",
      "label": "Coastal Experience"
    }
  ],
  "communities": [
    {
      "name": "Murjan",
      "type": "Beachfront towers",
      "price": "AED 2M+"
    },
    {
      "name": "Bahar",
      "type": "Premium residences",
      "price": "AED 2.5M+"
    },
    {
      "name": "Shams",
      "type": "Sea-view apartments",
      "price": "AED 1.5M+"
    },
    {
      "name": "Amwaj",
      "type": "Luxury beach living",
      "price": "AED 3M+"
    },
    {
      "name": "Sadaf",
      "type": "Central JBR towers",
      "price": "AED 1.8M+"
    },
    {
      "name": "Rimal",
      "type": "Family residences",
      "price": "AED 2M+"
    }
  ],
  "ctaTitle": "Ready for Smart JBR Living?",
  "heroImage": "https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/4edca8631e11ca9f4dec02b133b2353a5b85b70e16c0c8a664f375231ab3060f.png",
  "ctaSubtitle": "Book a free consultation and discover how we can transform your JBR apartment.",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Lighting Control",
      "description": "Ocean-view optimized lighting scenes"
    },
    {
      "icon": "Music",
      "title": "Multi-Room Audio",
      "description": "Waterproof speakers for balconies"
    },
    {
      "icon": "Shield",
      "title": "Security Systems",
      "description": "HD cameras & smart locks"
    },
    {
      "icon": "Thermometer",
      "title": "Climate Control",
      "description": "Energy-efficient AC automation"
    },
    {
      "icon": "Film",
      "title": "Entertainment",
      "description": "4K displays & streaming integration"
    },
    {
      "icon": "Home",
      "title": "Smart Shading",
      "description": "Automated blinds for sea views"
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Jumeirah Beach Residence Smart Homes",
    "description": "Transform your JBR beachfront apartment into a connected smart home. Coastal-grade systems designed for Dubai's premium beach lifestyle.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jumeirah Beach Residence",
      "addressRegion": "Dubai, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "JBR",
      "Jumeirah Beach Residence"
    ],
    "priceRange": "AED 50,000 - 250,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function JBRClient() {
  return <GeoPageTemplate data={pageData} slug="dubai/jumeirah-beach-residence" />
}
