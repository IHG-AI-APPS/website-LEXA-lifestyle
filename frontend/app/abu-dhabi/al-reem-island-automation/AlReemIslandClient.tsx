'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Al Reem Island",
  "region": "Abu Dhabi, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Al Reem Island",
  "heroDescription": "High-rise smart living specialists. From Sun Tower penthouses to Marina Square apartments, LEXA delivers wireless automation for Abu Dhabi's urban lifestyle.",
  "stats": [
    {
      "value": "60+",
      "label": "Reem Projects"
    },
    {
      "value": "15+",
      "label": "Buildings Served"
    },
    {
      "value": "Same Day",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "Sun & Sky Towers",
      "type": "Iconic twin towers",
      "projects": "60+"
    },
    {
      "name": "Marina Square",
      "type": "Waterfront living",
      "projects": "45+"
    },
    {
      "name": "Shams Abu Dhabi",
      "type": "Mixed-use development",
      "projects": "80+"
    },
    {
      "name": "Gate Towers",
      "type": "Landmark residences",
      "projects": "35+"
    },
    {
      "name": "Tala Tower",
      "type": "Premium apartments",
      "projects": "25+"
    },
    {
      "name": "The Arc",
      "type": "Curved architectural icon",
      "projects": "20+"
    }
  ],
  "ctaTitle": "Ready to Automate Your Al Reem Apartment?",
  "heroImage": "https://files.ihgbrands.com/lexa/migrated/4d8329d492af65cd.webp",
  "services": [
    {
      "icon": "Lightbulb",
      "title": "Apartment Lighting",
      "description": "Lutron Caseta & RadioRA for high-rise living"
    },
    {
      "icon": "Thermometer",
      "title": "Climate Control",
      "description": "Smart AC integration with building HVAC"
    },
    {
      "icon": "Film",
      "title": "Media Rooms",
      "description": "Compact home theater for apartments"
    },
    {
      "icon": "Shield",
      "title": "Smart Security",
      "description": "Video doorbell, smart locks, intercom"
    },
    {
      "icon": "Music",
      "title": "Audio Systems",
      "description": "Sonos & in-ceiling speakers"
    },
    {
      "icon": "Home",
      "title": "Building Integration",
      "description": "Work with building management systems"
    }
  ],
  "faqs": [
    {
      "question": "How much does apartment automation cost on Al Reem Island?",
      "answer": "Al Reem Island apartment automation ranges from AED 40,000 for studios to AED 150,000+ for penthouses. Standard 2-3 bedroom apartments typically invest AED 60,000-90,000."
    },
    {
      "question": "Can you install smart home systems in Al Reem high-rises?",
      "answer": "Yes, LEXA specializes in high-rise installations. We use wireless solutions that don't require building permission for rewiring."
    },
    {
      "question": "Do you work with Al Reem Island building management?",
      "answer": "Yes, we have established relationships with major Al Reem building managers. We handle NOC applications and coordinate with security."
    },
    {
      "question": "How long does apartment automation take?",
      "answer": "Most Al Reem apartment installations complete in 2-3 weeks including NOC approval, installation, programming and handover."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Al Reem Island Smart Homes",
    "description": "High-rise smart living specialists. From Sun Tower penthouses to Marina Square apartments, LEXA delivers wireless automation for Abu Dhabi's urban lifestyle.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Al Reem Island",
      "addressRegion": "Abu Dhabi, UAE",
      "addressCountry": "UAE"
    },
    "areaServed": [
      "Al Reem Island",
      "Sun Tower",
      "Marina Square",
      "Shams Abu Dhabi"
    ],
    "priceRange": "AED 40,000 - 150,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AlReemIslandClient() {
  return <GeoPageTemplate data={pageData} slug="abu-dhabi/al-reem-island-automation" />
}
