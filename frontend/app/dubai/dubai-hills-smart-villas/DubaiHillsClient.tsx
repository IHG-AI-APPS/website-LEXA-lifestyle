'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Dubai Hills Estate",
  "region": "Dubai, UAE",
  "heroTitle": "Smart Villas",
  "heroHighlight": "Dubai Hills Estate",
  "heroDescription": "Family-focused automation for Dubai's premier golf community. LEXA delivers smart living designed for modern family life.",
  "stats": [
    {
      "value": "120+",
      "label": "Hills Projects"
    },
    {
      "value": "Family",
      "label": "Focused Design"
    }
  ],
  "communities": [
    {
      "name": "Fairways Villas",
      "type": "Golf course frontage",
      "price": "AED 8M+"
    },
    {
      "name": "Grove Villas",
      "type": "Park-facing family homes",
      "price": "AED 5M+"
    },
    {
      "name": "Maple Townhouses",
      "type": "Modern family living",
      "price": "AED 3M+"
    },
    {
      "name": "Club Villas",
      "type": "Exclusive golf community",
      "price": "AED 12M+"
    },
    {
      "name": "Sidra Villas",
      "type": "Contemporary design",
      "price": "AED 6M+"
    },
    {
      "name": "Parkway Vistas",
      "type": "Central park views",
      "price": "AED 4M+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Dubai Hills Villa?",
  "heroImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920",
  "faqs": [
    {
      "question": "How much does Dubai Hills villa automation cost?",
      "answer": "Dubai Hills automation ranges from AED 80,000 for townhouses to AED 400,000+ for Club Villas. Standard 4-5 bedroom villas typically invest AED 120,000-200,000."
    },
    {
      "question": "Is Dubai Hills automation family-friendly?",
      "answer": "Absolutely! We design systems with families in mind: child-safe controls, easy-to-use interfaces, homework lighting modes, bedtime routines, and parental controls for media systems."
    },
    {
      "question": "Can you integrate with Dubai Hills community features?",
      "answer": "Yes, we integrate with community access systems, golf club reservations displays, and can monitor community security feeds on your home system."
    },
    {
      "question": "What about outdoor automation for Dubai Hills gardens?",
      "answer": "We specialize in outdoor automation: landscape lighting, irrigation control, pool/spa automation, outdoor audio, and BBQ area systems."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Dubai Hills Estate Smart Homes",
    "description": "Family-focused automation for Dubai's premier golf community. LEXA delivers smart living designed for modern family life.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai Hills Estate",
      "addressRegion": "Dubai, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Dubai Hills Estate"
    ],
    "priceRange": "AED 80,000 - 400,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function DubaiHillsClient() {
  return <GeoPageTemplate data={pageData} slug="dubai/dubai-hills-smart-villas" />
}
