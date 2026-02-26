'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Al Ain",
  "region": "Abu Dhabi, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Al Ain",
  "heroDescription": "The Garden City's smart home automation partner. From Al Ain's traditional villas to modern compounds, LEXA delivers intelligent luxury with desert-optimized systems.",
  "stats": [
    {
      "value": "25+",
      "label": "Al Ain Projects"
    },
    {
      "value": "Desert",
      "label": "Optimized"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Al Towayya",
      "type": "Luxury Villas",
      "projects": "10+"
    },
    {
      "name": "Al Muwaiji",
      "type": "Modern Compounds",
      "projects": "8+"
    },
    {
      "name": "Al Jimi",
      "type": "Family Residences",
      "projects": "5+"
    },
    {
      "name": "Al Sarooj",
      "type": "Premium Area",
      "projects": "4+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Al Ain?",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Lighting Automation",
      "description": "Energy-efficient smart lighting for Al Ain homes"
    },
    {
      "icon": "Thermometer",
      "title": "Desert Climate Control",
      "description": "High-performance AC automation for extreme heat"
    },
    {
      "icon": "Shield",
      "title": "Security Systems",
      "description": "Comprehensive home and perimeter security"
    },
    {
      "icon": "Music",
      "title": "Entertainment",
      "description": "Multi-room audio and home cinema"
    }
  ],
  "faqs": [
    {
      "question": "Does LEXA service Al Ain?",
      "answer": "Yes, LEXA has a dedicated team for Al Ain with same-day response for existing clients."
    },
    {
      "question": "How do systems handle Al Ain's heat?",
      "answer": "All our equipment is rated for extreme desert conditions. Climate control systems are optimized for Al Ain's unique weather patterns."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Al Ain Smart Homes",
    "description": "The Garden City's smart home automation partner. From Al Ain's traditional villas to modern compounds, LEXA delivers intelligent luxury with desert-optimized systems.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Al Ain",
      "addressRegion": "Abu Dhabi, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Al Ain",
      "Al Towayya",
      "Al Muwaiji"
    ],
    "priceRange": "AED 40,000 - 200,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AlAinClient() {
  return <GeoPageTemplate data={pageData} />
}
