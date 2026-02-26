'use client'

import GeoPageTemplate from '@/components/geo/GeoPageTemplate'
import type { GeoPageData } from '@/components/geo/GeoPageTemplate'

const pageData: GeoPageData = {
  "locationName": "Ajman",
  "region": "Ajman, UAE",
  "heroTitle": "Smart Home Automation",
  "heroHighlight": "Ajman",
  "heroDescription": "Professional smart home automation solutions in Ajman. Serving Al Nuaimiya, Al Rashidiya, and all Ajman communities at competitive prices.",
  "stats": [
    {"value": "45+", "label": "Homes Automated"},
    {"value": "AED 150K", "label": "Avg Project"},
    {"value": "4.9/5", "label": "Customer Rating"}
  ],
  "communities": [
    {"name": "Al Nuaimiya", "type": "Central residential", "projects": "15+"},
    {"name": "Al Rashidiya", "type": "Family area", "projects": "10+"},
    {"name": "Al Jurf", "type": "Growing community", "projects": "8+"},
    {"name": "Al Rawda", "type": "Modern living", "projects": "6+"},
    {"name": "Al Hamidiya", "type": "Established area", "projects": "4+"},
    {"name": "Al Zahra", "type": "Quiet residential", "projects": "3+"}
  ],
  "ctaTitle": "Ready to Automate Your Ajman Home?",
  "ctaSubtitle": "Contact LEXA Lifestyle for a free consultation for your Ajman property.",
  "schemaData": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LEXA Lifestyle - Smart Home Ajman",
    "description": "Professional smart home automation in Ajman.",
    "address": {"@type": "PostalAddress", "addressLocality": "Ajman", "addressRegion": "Ajman", "addressCountry": "AE"},
    "areaServed": ["Ajman", "Al Nuaimiya", "Al Rashidiya"],
    "priceRange": "AED 25,000 - 150,000+",
    "telephone": "+971-42-670-470"
  }
}

export default function AjmanGeoClient() {
  return <GeoPageTemplate data={pageData} slug="uae/ajman" />
}
