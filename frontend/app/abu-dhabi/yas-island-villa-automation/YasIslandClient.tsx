'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Yas Island",
  "region": "Abu Dhabi, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Yas Island",
  "heroDescription": "Premium automation for Abu Dhabi's entertainment island. From Yas Acres golf villas to West Yas waterfront estates, LEXA delivers smart living for active lifestyles.",
  "stats": [
    {
      "value": "30+",
      "label": "Yas Projects"
    },
    {
      "value": "F1",
      "label": "Viewing Experts"
    },
    {
      "value": "4hr",
      "label": "Response Time"
    }
  ],
  "communities": [
    {
      "name": "Yas Acres",
      "type": "Golf course villas & townhouses",
      "price": "AED 3M+"
    },
    {
      "name": "West Yas",
      "type": "Waterfront luxury villas",
      "price": "AED 8M+"
    },
    {
      "name": "Yas Bay",
      "type": "Premium waterfront apartments",
      "price": "AED 2M+"
    },
    {
      "name": "Mayan",
      "type": "Resort-style residences",
      "price": "AED 1.5M+"
    },
    {
      "name": "Waters Edge",
      "type": "Contemporary townhouses",
      "price": "AED 2.5M+"
    },
    {
      "name": "Ansam",
      "type": "Family apartments",
      "price": "AED 1M+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Yas Island Home?",
  "heroImage": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Smart Lighting Control",
      "description": "Lutron systems with outdoor entertainment lighting"
    },
    {
      "icon": "Thermometer",
      "title": "Climate Automation",
      "description": "Energy-efficient cooling with zone control"
    },
    {
      "icon": "Film",
      "title": "Sports & Entertainment",
      "description": "F1 viewing rooms, outdoor screens, surround sound"
    },
    {
      "icon": "Shield",
      "title": "Security Integration",
      "description": "Smart locks, video doorbell, perimeter cameras"
    },
    {
      "icon": "Music",
      "title": "Multi-Room Audio",
      "description": "Pool, garden, and indoor zones with Sonos & KEF"
    },
    {
      "icon": "Home",
      "title": "Complete Automation",
      "description": "Control4 whole-home integration"
    }
  ],
  "faqs": [
    {
      "question": "What does smart home automation cost in Yas Acres?",
      "answer": "Yas Acres costs range from AED 80,000 for townhouses to AED 250,000+ for large villas. Golf course villas typically invest AED 150,000-200,000."
    },
    {
      "question": "Can you retrofit smart home systems in existing Yas properties?",
      "answer": "Yes, LEXA specializes in wireless retrofit solutions. Most Yas Acres retrofits complete in 4-6 weeks with minimal disruption."
    },
    {
      "question": "Do you offer F1 viewing room setups?",
      "answer": "Absolutely! We've designed many dedicated F1 viewing rooms with large-format displays, Dolby Atmos sound, and automated lighting scenes."
    },
    {
      "question": "What maintenance packages do you offer?",
      "answer": "Annual maintenance packages from AED 5,000 include quarterly checkups, software updates, 24/7 remote support, and priority emergency service."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Yas Island Smart Homes",
    "description": "Premium automation for Abu Dhabi's entertainment island. From Yas Acres golf villas to West Yas waterfront estates, LEXA delivers smart living for active lifestyles.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yas Island",
      "addressRegion": "Abu Dhabi, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Yas Island",
      "Yas Acres",
      "West Yas",
      "Yas Bay"
    ],
    "priceRange": "AED 60,000 - 250,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function YasIslandClient() {
  return <GeoPageTemplate data={pageData} />
}
