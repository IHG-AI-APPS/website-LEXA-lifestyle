/**
 * JSON-LD Structured Data Components for Intelligence Builder
 * Add rich snippets and schema markup for better SEO
 */

export const intelligenceBuilderSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LEXA Intelligent Home Builder",
  "description": "Design your home's intelligence with our smart home configuration tool based on 2025-2026 industry standards",
  "url": "https://lexalifestyle.com/home-intelligence-builder",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AED",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "247",
    "bestRating": "5"
  },
  "featureList": [
    "Lifestyle-based smart home design",
    "23+ intelligent home features",
    "Real-time IQ score calculation (0-100)",
    "System compatibility matching",
    "Energy savings projections up to 35%",
    "Matter and Thread protocol support",
    "Achievement badge gamification",
    "Personalized intelligence reports"
  ],
  "screenshot": "https://lexalifestyle.com/images/intelligence-builder-screenshot.jpg",
  "softwareVersion": "1.0",
  "author": {
    "@type": "Organization",
    "name": "LEXA Lifestyle",
    "url": "https://lexalifestyle.com"
  }
}

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Design Your Intelligent Home",
  "description": "Complete guide to creating a personalized smart home configuration with LEXA Intelligence Builder",
  "image": "https://lexalifestyle.com/images/intelligence-builder-guide.jpg",
  "totalTime": "PT15M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "AED",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select Your Lifestyle Priorities",
      "text": "Choose what matters most to you: comfort, security, energy efficiency, entertainment, wellness, or convenience. Select at least 2 priorities.",
      "url": "https://lexalifestyle.com/home-intelligence-builder",
      "image": "https://lexalifestyle.com/images/lifestyle-selection.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Choose Intelligence Features",
      "text": "Browse 23+ smart home features including scene automation, AI learning, circadian lighting, presence detection, and voice control. Select features that align with your lifestyle.",
      "url": "https://lexalifestyle.com/home-intelligence-builder/features",
      "image": "https://lexalifestyle.com/images/features-selection.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "View Your Intelligence Score",
      "text": "See your home's IQ score (0-100), unlock achievements, and discover category breakdowns showing automation coverage, AI features, energy efficiency, wellness, and security levels.",
      "url": "https://lexalifestyle.com/home-intelligence-builder/score",
      "image": "https://lexalifestyle.com/images/iq-score.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Find Compatible Systems",
      "text": "Discover control systems matched to your configuration. Compare compatibility percentages, IQ potential, Matter/Thread support, and pricing tiers.",
      "url": "https://lexalifestyle.com/home-intelligence-builder/systems",
      "image": "https://lexalifestyle.com/images/systems-comparison.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Get Your Intelligence Report",
      "text": "Download your complete home intelligence profile with energy savings projections, wellness benefits, security assessment, and next steps for implementation.",
      "url": "https://lexalifestyle.com/home-intelligence-builder/report",
      "image": "https://lexalifestyle.com/images/intelligence-report.jpg"
    }
  ]
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Home Intelligence Score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Home Intelligence Score (IQ) is a 0-100 rating that measures how smart and automated your home will be based on selected features. It considers automation coverage (30 points), AI/predictive features (25 points), energy efficiency (20 points), wellness integration (15 points), and security intelligence (10 points). Scores range from Basic Smart Home (0-20) to Orchestrated Living (81-100)."
      }
    },
    {
      "@type": "Question",
      "name": "How many smart home features can I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can choose from 23+ intelligent home features across 16 categories including scene automation, presence detection, circadian lighting, voice control, AI behavioral learning, multi-zone control, energy analytics, security intelligence, climate optimization, wellness monitoring, and more. Select at least 3 features to continue."
      }
    },
    {
      "@type": "Question",
      "name": "What control systems are compatible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Intelligence Builder recommends control systems based on your feature selections, showing compatibility match percentage, IQ potential, Matter/Thread protocol support, voice integration (Josh.ai, Alexa, Google, Siri), and price tiers. Systems include Control4, Savant, Qbus, and other professional-grade platforms."
      }
    },
    {
      "@type": "Question",
      "name": "How much energy can I save with intelligent automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on 2025-2026 industry research, intelligent homes can achieve 25-35% energy savings through features like occupancy-based HVAC, automated lighting, peak-hour load shifting, predictive climate control, and AI-powered optimization. The Intelligence Builder calculates projected savings based on your specific feature selections."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Intelligence Builder free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the LEXA Intelligent Home Builder is completely free. You can explore features, calculate your home IQ score, get system recommendations, and download your intelligence report at no cost. Professional consultation and installation are available as optional next steps."
      }
    }
  ]
}

export const breadcrumbSchema = (phase: string) => {
  const phases: { [key: string]: { position: number; name: string; url: string } } = {
    lifestyle: { position: 2, name: "Lifestyle Discovery", url: "/home-intelligence-builder" },
    features: { position: 3, name: "Feature Selection", url: "/home-intelligence-builder/features" },
    score: { position: 4, name: "Intelligence Score", url: "/home-intelligence-builder/score" },
    systems: { position: 5, name: "System Recommendations", url: "/home-intelligence-builder/systems" },
    report: { position: 6, name: "Intelligence Report", url: "/home-intelligence-builder/report" }
  }

  const currentPhase = phases[phase]
  if (!currentPhase) return null

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://lexalifestyle.com"
      },
      {
        "@type": "ListItem",
        "position": currentPhase.position,
        "name": currentPhase.name,
        "item": `https://lexalifestyle.com${currentPhase.url}`
      }
    ]
  }
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "LEXA Intelligent Home Design Service",
  "description": "Professional intelligent home design and consultation service based on your personalized IQ assessment",
  "brand": {
    "@type": "Brand",
    "name": "LEXA Lifestyle"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://lexalifestyle.com/home-intelligence-builder",
    "priceCurrency": "AED",
    "price": "0",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "247"
  }
}
