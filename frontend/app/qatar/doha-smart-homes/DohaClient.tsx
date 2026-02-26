'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Doha",
  "region": "Qatar",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Doha",
  "heroDescription": "Qatar's premier smart home partner. From The Pearl to West Bay, LEXA delivers world-class automation for Doha's most exclusive properties.",
  "stats": [
    {
      "value": "100+",
      "label": "Qatar Projects"
    },
    {
      "value": "15+",
      "label": "Years"
    },
    {
      "value": "24/7",
      "label": "Support"
    }
  ],
  "communities": [
    {
      "name": "The Pearl-Qatar",
      "type": "Island Luxury",
      "projects": "40+"
    },
    {
      "name": "West Bay",
      "type": "High-Rise Premium",
      "projects": "30+"
    },
    {
      "name": "Lusail City",
      "type": "New Smart City",
      "projects": "25+"
    },
    {
      "name": "Al Dafna",
      "type": "Diplomatic Area",
      "projects": "15+"
    },
    {
      "name": "Katara Hills",
      "type": "Cultural District",
      "projects": "10+"
    }
  ],
  "ctaTitle": "Ready for Smart Living in Doha?",
  "faqs": [
    {
      "question": "Does LEXA operate in Qatar?",
      "answer": "Yes, LEXA serves Qatar with a dedicated team for Doha properties. We handle everything from design to installation and ongoing maintenance."
    },
    {
      "question": "What systems do you recommend for Doha?",
      "answer": "We recommend Control4 and Crestron for their reliability in Qatar's climate. All equipment is rated for extreme heat and humidity conditions."
    }
  ],
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Doha Smart Homes",
    "description": "Qatar's premier smart home partner. From The Pearl to West Bay, LEXA delivers world-class automation for Doha's most exclusive properties.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Doha",
      "addressRegion": "Qatar",
      "addressCountry": "Qatar"
    },
    "areaServed": [
      "Doha",
      "The Pearl-Qatar",
      "West Bay",
      "Lusail"
    ],
    "priceRange": "QAR 80,000 - 500,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function DohaClient() {
  return <GeoPageTemplate data={pageData} slug="qatar/doha-smart-homes" />
}
