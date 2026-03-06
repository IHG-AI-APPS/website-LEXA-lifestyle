'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Palm Jumeirah",
  "region": "Dubai, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Palm Jumeirah",
  "heroDescription": "Premium automation for Dubai's iconic island. From Signature Villas to Frond homes, LEXA delivers world-class smart living for Palm Jumeirah residents.",
  "stats": [
    {
      "value": "150+",
      "label": "Palm Projects"
    },
    {
      "value": "15yr",
      "label": "Island Experience"
    },
    {
      "value": "4hr",
      "label": "Response Time"
    }
  ],
  "communities": [
    {
      "name": "Signature Villas",
      "type": "Ultra-luxury beachfront",
      "price": "AED 50M+"
    },
    {
      "name": "Garden Homes",
      "type": "Premium waterfront villas",
      "price": "AED 25M+"
    },
    {
      "name": "Frond Villas",
      "type": "Private beach access",
      "price": "AED 15M+"
    },
    {
      "name": "Shoreline Apartments",
      "type": "Luxury high-rise living",
      "price": "AED 3M+"
    },
    {
      "name": "Palm Tower",
      "type": "Iconic residences",
      "price": "AED 5M+"
    },
    {
      "name": "FIVE Palm",
      "type": "Branded residences",
      "price": "AED 4M+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Palm Jumeirah Home?",
  "heroImage": "https://files.ihgbrands.com/lexa/migrated/10250d9b8890d3f8.webp",
  "ctaSubtitle": "Schedule a free consultation with our Palm Jumeirah smart home specialists.",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Lutron Lighting Design",
      "description": "Beachfront lighting scenes, UV-protected outdoor systems"
    },
    {
      "icon": "Thermometer",
      "title": "Climate Control",
      "description": "Sea-facing humidity management & efficient cooling"
    },
    {
      "icon": "Film",
      "title": "Home Cinema",
      "description": "Dolby Atmos theaters with Dubai skyline views"
    },
    {
      "icon": "Shield",
      "title": "Security Systems",
      "description": "Marine-grade cameras, yacht dock monitoring"
    },
    {
      "icon": "Music",
      "title": "Indoor-Outdoor Audio",
      "description": "Pool, beach, garden zones with Sonos & KEF"
    },
    {
      "icon": "Home",
      "title": "Whole-Home Control",
      "description": "Control4 & Crestron for seamless island living"
    }
  ],
  "faqs": [
    {
      "question": "How much does smart home automation cost on Palm Jumeirah?",
      "answer": "Palm Jumeirah automation ranges from AED 150,000 for apartments to AED 1,500,000+ for Signature Villas. Frond villas typically invest AED 300,000-500,000. Garden Homes average AED 400,000-700,000. LEXA provides complimentary consultations."
    },
    {
      "question": "Can you retrofit smart systems in existing Palm Jumeirah villas?",
      "answer": "Yes, LEXA specializes in Palm Jumeirah retrofits. Using wireless Lutron RadioRA 3 and Control4, we upgrade villas without major construction. Most retrofits complete in 8-12 weeks with minimal disruption to your lifestyle."
    },
    {
      "question": "What brands work best for Palm Jumeirah's coastal environment?",
      "answer": "For Palm's salt-air exposure, we use marine-grade equipment: Lutron (corrosion-resistant), Coastal-rated Sonance speakers, Axis cameras with marine housing, and Control4 with enhanced protection. All backed by extended warranties."
    },
    {
      "question": "Do you provide maintenance for Palm Jumeirah smart homes?",
      "answer": "Yes, LEXA offers Palm Jumeirah-dedicated maintenance with same-day response. Our AMC includes quarterly inspections, salt-air equipment checks, software updates, and 24/7 emergency support. Plans from AED 12,000/year."
    },
    {
      "question": "Can smart homes integrate with Palm Jumeirah marina systems?",
      "answer": "Absolutely. We integrate yacht dock cameras, marina lighting, and boat lift controls into your home automation. Monitor your yacht from anywhere, automate dock lighting, and receive alerts."
    },
    {
      "question": "How long does full villa automation take on Palm Jumeirah?",
      "answer": "Timelines vary: Apartments (3-4 weeks), Frond villas (10-14 weeks), Garden Homes (12-16 weeks), Signature Villas (16-24 weeks). LEXA manages all coordination with Palm security and your contractors."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Palm Jumeirah Smart Homes",
    "description": "Premium automation for Dubai's iconic island. From Signature Villas to Frond homes, LEXA delivers world-class smart living for Palm Jumeirah residents.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Palm Jumeirah",
      "addressRegion": "Dubai, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Palm Jumeirah",
      "Signature Villas",
      "Garden Homes",
      "Frond Villas",
      "Shoreline Apartments"
    ],
    "priceRange": "AED 150,000 - 1,500,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function PalmJumeirahClient() {
  return <GeoPageTemplate data={pageData} slug="dubai/palm-jumeirah-smart-homes" />
}
