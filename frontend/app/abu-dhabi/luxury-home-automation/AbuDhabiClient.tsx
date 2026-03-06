'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Abu Dhabi",
  "region": "Abu Dhabi, UAE",
  "heroTitle": "Luxury Home Automation",
  "heroHighlight": "Abu Dhabi",
  "heroDescription": "From Saadiyat Island villas to Yas Island waterfront homes, LEXA delivers world-class smart home solutions tailored for Abu Dhabi's luxury lifestyle.",
  "stats": [
    {
      "value": "200+",
      "label": "Abu Dhabi Projects"
    },
    {
      "value": "15+",
      "label": "Years Experience"
    },
    {
      "value": "4hr",
      "label": "Response Time"
    }
  ],
  "communities": [
    {
      "name": "Saadiyat Island",
      "type": "Cultural district luxury villas",
      "projects": "45+"
    },
    {
      "name": "Yas Island",
      "type": "Waterfront smart homes",
      "projects": "30+"
    },
    {
      "name": "Al Reem Island",
      "type": "High-rise penthouse automation",
      "projects": "60+"
    },
    {
      "name": "Al Raha Beach",
      "type": "Beachfront villa integration",
      "projects": "25+"
    },
    {
      "name": "Khalifa City",
      "type": "Family villa automation",
      "projects": "40+"
    },
    {
      "name": "Mohammed Bin Zayed City",
      "type": "Modern smart living",
      "projects": "35+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Abu Dhabi Home?",
  "heroImage": "https://files.ihgbrands.com/lexa/migrated/e24c1460208302ff.webp",
  "ctaSubtitle": "Schedule a free consultation with our Abu Dhabi smart home experts.",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Intelligent Lighting",
      "description": "Lutron & KNX systems for Abu Dhabi climate"
    },
    {
      "icon": "Thermometer",
      "title": "Climate Control",
      "description": "Energy-efficient AC automation"
    },
    {
      "icon": "Film",
      "title": "Home Cinema",
      "description": "Dolby Atmos theaters for desert acoustics"
    },
    {
      "icon": "Shield",
      "title": "Security Systems",
      "description": "Integrated CCTV & access control"
    },
    {
      "icon": "Music",
      "title": "Multi-Room Audio",
      "description": "Sonos & architectural speakers"
    },
    {
      "icon": "Home",
      "title": "Whole-Home Control",
      "description": "Control4 & Crestron integration"
    }
  ],
  "faqs": [
    {
      "question": "How much does smart home automation cost in Abu Dhabi?",
      "answer": "Smart home automation in Abu Dhabi ranges from AED 80,000 for apartments to AED 500,000+ for luxury villas. Cost depends on property size, automation scope, and brand selection."
    },
    {
      "question": "Can you retrofit smart home systems in existing Abu Dhabi villas?",
      "answer": "Yes, LEXA specializes in wireless retrofit solutions. Using Lutron RadioRA 3 and Control4 wireless, we automate your villa with minimal disruption."
    },
    {
      "question": "What is the installation timeline for Abu Dhabi projects?",
      "answer": "Typical timelines: Apartments (2-3 weeks), Standard villas (4-6 weeks), Luxury villas on Saadiyat/Yas (8-12 weeks)."
    },
    {
      "question": "Do you provide maintenance services in Abu Dhabi?",
      "answer": "Yes, LEXA offers comprehensive AMC packages including 24/7 emergency support, quarterly preventive maintenance, software updates, and remote diagnostics."
    },
    {
      "question": "Can smart home automation reduce electricity bills?",
      "answer": "Yes, properly designed automation reduces ADDC bills by 25-35%. Typical annual savings: AED 15,000-30,000 for large villas."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Abu Dhabi Smart Homes",
    "description": "From Saadiyat Island villas to Yas Island waterfront homes, LEXA delivers world-class smart home solutions tailored for Abu Dhabi's luxury lifestyle.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abu Dhabi",
      "addressRegion": "Abu Dhabi, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Abu Dhabi",
      "Saadiyat Island",
      "Yas Island",
      "Al Reem Island"
    ],
    "priceRange": "AED 80,000 - 500,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AbuDhabiClient() {
  return <GeoPageTemplate data={pageData} slug="abu-dhabi/luxury-home-automation" />
}
