'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Saadiyat Island",
  "region": "Abu Dhabi, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Saadiyat Island",
  "heroDescription": "Premium automation for Abu Dhabi's cultural district. From Louvre-adjacent villas to Saadiyat Beach estates, LEXA delivers world-class smart living.",
  "stats": [
    {
      "value": "45+",
      "label": "Saadiyat Projects"
    },
    {
      "value": "8yr",
      "label": "Island Experience"
    },
    {
      "value": "4hr",
      "label": "Response Time"
    }
  ],
  "communities": [
    {
      "name": "Saadiyat Beach Villas",
      "type": "Beachfront luxury villas",
      "price": "AED 15M+"
    },
    {
      "name": "Saadiyat Reserve",
      "type": "Nature-integrated estates",
      "price": "AED 25M+"
    },
    {
      "name": "Mamsha Al Saadiyat",
      "type": "Waterfront residences",
      "price": "AED 5M+"
    },
    {
      "name": "Louvre Abu Dhabi District",
      "type": "Cultural quarter homes",
      "price": "AED 8M+"
    },
    {
      "name": "Nurai Island",
      "type": "Private island villas",
      "price": "AED 30M+"
    },
    {
      "name": "Saadiyat Grove",
      "type": "Family community villas",
      "price": "AED 10M+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Saadiyat Villa?",
  "heroImage": "https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/fde448452b60b4d7082b20789cf57c345c47ef92d345d41e1e1e10bc87460a66.png",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Lutron Lighting Design",
      "description": "Circadian lighting for beach homes, UV-protected outdoor systems"
    },
    {
      "icon": "Thermometer",
      "title": "Coastal Climate Control",
      "description": "Humidity management & energy-efficient cooling"
    },
    {
      "icon": "Film",
      "title": "Private Cinema Suites",
      "description": "Dolby Atmos theaters with acoustic treatment"
    },
    {
      "icon": "Shield",
      "title": "Estate Security",
      "description": "Perimeter protection, marine-grade cameras"
    },
    {
      "icon": "Music",
      "title": "Indoor-Outdoor Audio",
      "description": "Weather-resistant speakers, pool audio zones"
    },
    {
      "icon": "Home",
      "title": "Whole-Villa Automation",
      "description": "Control4 & Crestron integration"
    }
  ],
  "faqs": [
    {
      "question": "How much does smart home automation cost in Saadiyat Island?",
      "answer": "Costs range from AED 150,000 for Mamsha apartments to AED 800,000+ for beachfront villas. Saadiyat Reserve estates typically invest AED 400,000-600,000."
    },
    {
      "question": "Can you automate existing villas in Saadiyat Beach?",
      "answer": "Yes, LEXA specializes in retrofit automation. Using wireless Lutron RadioRA 3 and Control4, we upgrade homes with minimal disruption. Most retrofits complete in 6-8 weeks."
    },
    {
      "question": "What brands work best for Saadiyat's coastal climate?",
      "answer": "We recommend marine-grade equipment: Lutron for lighting, Sonance for outdoor audio, and Axis cameras with coastal housing. All with enhanced corrosion protection."
    },
    {
      "question": "Do you provide maintenance on Saadiyat Island?",
      "answer": "Yes, LEXA offers dedicated Saadiyat Island maintenance with 4-hour response time. Annual plans from AED 8,000."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Saadiyat Island Smart Homes",
    "description": "Premium automation for Abu Dhabi's cultural district. From Louvre-adjacent villas to Saadiyat Beach estates, LEXA delivers world-class smart living.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Saadiyat Island",
      "addressRegion": "Abu Dhabi, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Saadiyat Island",
      "Saadiyat Beach",
      "Saadiyat Reserve",
      "Nurai Island"
    ],
    "priceRange": "AED 150,000 - 800,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function SaadiyatIslandClient() {
  return <GeoPageTemplate data={pageData} slug="abu-dhabi/saadiyat-island-smart-homes" />
}
