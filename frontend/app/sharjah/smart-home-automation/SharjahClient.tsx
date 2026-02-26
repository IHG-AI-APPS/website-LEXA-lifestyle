'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Sharjah",
  "region": "Sharjah, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Sharjah",
  "heroDescription": "Sharjah's trusted smart home partner. From Al Zahia villas to Tilal City compounds, LEXA delivers premium automation at exceptional value.",
  "stats": [
    {
      "value": "40+",
      "label": "Sharjah Projects"
    },
    {
      "value": "Value",
      "label": "Focused"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Al Zahia",
      "type": "Master Community",
      "projects": "15+"
    },
    {
      "name": "Tilal City",
      "type": "Modern Villas",
      "projects": "12+"
    },
    {
      "name": "Al Tai",
      "type": "Family Compounds",
      "projects": "10+"
    },
    {
      "name": "Muwailih",
      "type": "Residential Area",
      "projects": "8+"
    },
    {
      "name": "Al Mamzar",
      "type": "Waterfront",
      "projects": "5+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Sharjah Home?",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Smart Lighting",
      "description": "Energy-efficient lighting automation for Sharjah homes"
    },
    {
      "icon": "Thermometer",
      "title": "AC Automation",
      "description": "SEWA-optimized climate control systems"
    },
    {
      "icon": "Shield",
      "title": "Security Systems",
      "description": "Complete home security with smart locks"
    },
    {
      "icon": "Music",
      "title": "Audio Systems",
      "description": "Multi-room audio for family living"
    },
    {
      "icon": "Film",
      "title": "Home Theater",
      "description": "Cinema experiences for family entertainment"
    },
    {
      "icon": "Home",
      "title": "Full Automation",
      "description": "Control4 whole-home integration"
    }
  ],
  "faqs": [
    {
      "question": "How much does smart home automation cost in Sharjah?",
      "answer": "Sharjah automation is very competitive: Apartments from AED 30,000, villas from AED 60,000. LEXA offers Sharjah-specific packages optimized for value."
    },
    {
      "question": "Do you serve all areas of Sharjah?",
      "answer": "Yes, LEXA covers all Sharjah residential areas including Al Zahia, Tilal City, Muwailih, Al Tai, and the university area."
    },
    {
      "question": "Can you help reduce SEWA bills?",
      "answer": "Absolutely! Smart climate and lighting control typically reduces SEWA bills by 20-30%. Our systems optimize energy usage automatically."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Sharjah Smart Homes",
    "description": "Sharjah's trusted smart home partner. From Al Zahia villas to Tilal City compounds, LEXA delivers premium automation at exceptional value.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Sharjah",
      "Al Zahia",
      "Tilal City"
    ],
    "priceRange": "AED 30,000 - 200,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function SharjahClient() {
  return <GeoPageTemplate data={pageData} />
}
