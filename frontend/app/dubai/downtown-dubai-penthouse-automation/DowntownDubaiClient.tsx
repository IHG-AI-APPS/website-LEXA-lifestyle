'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Downtown Dubai",
  "region": "Dubai, UAE",
  "heroTitle": "Penthouse Automation",
  "heroHighlight": "Downtown Dubai",
  "heroDescription": "Smart living with Burj Khalifa views. LEXA delivers world-class automation for Downtown Dubai's most prestigious addresses.",
  "stats": [
    {
      "value": "100+",
      "label": "Downtown Projects"
    },
    {
      "value": "20+",
      "label": "Buildings Served"
    }
  ],
  "communities": [
    {
      "name": "Burj Khalifa Residences",
      "type": "Iconic tower living",
      "price": "AED 15M+"
    },
    {
      "name": "Address Downtown",
      "type": "Branded residences",
      "price": "AED 5M+"
    },
    {
      "name": "Boulevard Point",
      "type": "Premium apartments",
      "price": "AED 3M+"
    },
    {
      "name": "The Address Sky View",
      "type": "Sky-high luxury",
      "price": "AED 8M+"
    },
    {
      "name": "Opera Grand",
      "type": "Cultural district",
      "price": "AED 4M+"
    },
    {
      "name": "Vida Residences",
      "type": "Lifestyle living",
      "price": "AED 2M+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Downtown Residence?",
  "heroImage": "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920",
  "faqs": [
    {
      "question": "How much does Downtown Dubai apartment automation cost?",
      "answer": "Downtown Dubai automation ranges from AED 60,000 for 1-bed apartments to AED 500,000+ for penthouses. Average 2-3 bed apartments invest AED 80,000-150,000."
    },
    {
      "question": "Can you work with Downtown Dubai building management?",
      "answer": "Yes, LEXA has established relationships with major Downtown buildings. We handle NOC applications, coordinate with security, and ensure all installations comply with Emaar community regulations."
    },
    {
      "question": "What about Burj Khalifa residences?",
      "answer": "LEXA has completed multiple Burj Khalifa automation projects. We understand the building's unique requirements and work within Armani Residences guidelines."
    },
    {
      "question": "Do you offer Downtown Dubai maintenance?",
      "answer": "Yes, same-day response for Downtown residents. AMC from AED 6,000/year includes quarterly visits, software updates, and 24/7 remote support."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Downtown Dubai Smart Homes",
    "description": "Smart living with Burj Khalifa views. LEXA delivers world-class automation for Downtown Dubai's most prestigious addresses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Downtown Dubai",
      "addressRegion": "Dubai, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Downtown Dubai",
      "Burj Khalifa"
    ],
    "priceRange": "AED 60,000 - 500,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function DowntownDubaiClient() {
  return <GeoPageTemplate data={pageData} slug="dubai/downtown-dubai-penthouse-automation" />
}
