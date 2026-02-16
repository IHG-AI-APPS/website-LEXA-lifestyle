import type { Metadata } from 'next'

// Production domain - update this when going live
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lexalifestyle.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LEXA Lifestyle | #1 Smart Home Automation Dubai | Control4 & Crestron',
    template: '%s | LEXA Lifestyle Dubai'
  },
  // Optimized meta description - under 160 characters
  description: 'Dubai\'s #1 luxury smart home company. Control4 & Crestron dealer. 500+ villas automated. Expert lighting, cinema & AV integration.',
  keywords: [
    'LEXA Lifestyle Dubai',
    'best smart home company Dubai',
    'luxury home automation Dubai',
    'Control4 dealer Dubai',
    'Crestron automation Dubai',
    'Lutron lighting Dubai',
    'smart home installation UAE',
    'villa automation Emirates Hills',
    'smart home Downtown Dubai',
    'home cinema Dolby Atmos',
    'luxury AV integration',
    'smart home consultant Dubai',
    'premium home automation',
    'villa automation Dubai',
    'penthouse smart home',
    'KNX automation UAE',
    'home automation company UAE',
    'smart lighting control Dubai',
    'multi-room audio Dubai',
    'home security automation',
    'energy management Dubai',
    'smart home cost Dubai',
    'home automation price UAE',
    'Control4 vs Crestron Dubai',
    // Arabic keywords for UAE market
    'أتمتة المنزل الذكي دبي',
    'شركة منزل ذكي دبي',
    'تركيب منزل ذكي الإمارات',
    'أنظمة المنزل الذكي دبي'
  ],
  authors: [{ name: 'LEXA Lifestyle', url: SITE_URL }],
  creator: 'LEXA Lifestyle',
  publisher: 'LEXA Lifestyle',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    }
  },
  verification: {
    // Add when you get them
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-AE': '/',
      'ar-AE': '/ar',
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    alternateLocale: ['ar_AE'],
    url: SITE_URL,
    title: 'LEXA Lifestyle | Luxury Smart Home Automation Dubai',
    description: 'Leading luxury home automation company in Dubai. Expert smart home solutions for lighting, climate, cinema & security.',
    siteName: 'LEXA Lifestyle',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'LEXA Lifestyle - Luxury Smart Home Automation Dubai'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEXA Lifestyle | Luxury Smart Home Automation Dubai',
    description: 'Leading luxury home automation company in Dubai. Expert solutions for smart living.',
    images: [`${SITE_URL}/og-image.jpg`],
    site: '@lexalifestyle',
    creator: '@lexalifestyle'
  },
  other: {
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai',
    'geo.position': '25.2048;55.2708',
    'ICBM': '25.2048, 55.2708'
  }
}

// Schema.org structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LEXA Lifestyle',
  alternateName: 'LEXA Life Style',
  url: 'https://lexalifestyle.com',
  logo: 'https://lexalifestyle.com/lexa-black.png',
  description: 'Leading luxury home automation and smart living solutions provider in Dubai, UAE',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Quoz 1, Sheikh Zayed Road, 3rd Interchange',
    addressLocality: 'Dubai',
    addressCountry: 'AE'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+971-42-670-470',
    contactType: 'sales',
    areaServed: ['AE', 'Dubai', 'Abu Dhabi', 'UAE'],
    availableLanguage: ['en', 'ar']
  },
  sameAs: [
    'https://www.facebook.com/lexalifestyle',
    'https://www.instagram.com/lexalifestyle',
    'https://www.linkedin.com/company/lexalifestyle'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150'
  }
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://lexalifestyle.com',
  name: 'LEXA Lifestyle',
  image: 'https://lexalifestyle.com/lexa-black.png',
  telephone: '+971-42-670-470',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Quoz 1, Sheikh Zayed Road, 3rd Interchange',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    postalCode: '',
    addressCountry: 'AE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2048,
    longitude: 55.2708
  },
  url: 'https://lexalifestyle.com',
  priceRange: 'AED 50,000 - 500,000+',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00',
    closes: '18:00'
  },
  areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'UAE']
}

// Enhanced FAQPage Schema for AI discoverability
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is smart home automation and how does it work in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart home automation in Dubai integrates lighting, climate control, security, entertainment, and energy management into a unified system controlled via smartphone, tablet, voice commands, or automated scenarios. Popular systems include Control4, Crestron, and Lutron, offering seamless control of your entire villa or apartment.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does smart home automation cost in UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart home automation costs in UAE vary by property size and features: Basic packages start at AED 50,000-80,000 for apartments (lighting + climate), Mid-tier villa automation ranges from AED 150,000-300,000 (full automation + cinema), Luxury complete integration costs AED 400,000-1,000,000+ (Crestron/Control4 with premium AV). LEXA Lifestyle provides customized quotes based on your specific needs.'
      }
    },
    {
      '@type': 'Question',
      name: 'Which smart home system is best for villas in Dubai - Control4 or Crestron?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Control4 is ideal for villas under 8,000 sq ft with budgets of AED 150,000-400,000, offering excellent value and ease of use. Crestron suits luxury properties over 8,000 sq ft with budgets exceeding AED 500,000, providing ultimate customization and enterprise-grade features. LEXA Lifestyle specializes in both systems and can recommend the best fit for your Dubai property.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the best smart home brands available in UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top smart home brands in UAE include: Control4 & Crestron (whole-home automation), Lutron & KNX (lighting control), Sonos & KEF (multi-room audio), Hikvision & Axis (security), Nest & Ecobee (climate), Sony & Epsom (home cinema). LEXA Lifestyle is an authorized dealer for premium brands serving Dubai, Abu Dhabi, and across UAE.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does smart home installation take in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart home installation timeline in Dubai: Basic apartment automation: 2-3 weeks, Mid-size villa (4,000-6,000 sq ft): 6-8 weeks, Large villa with full integration: 10-14 weeks, Ultra-luxury properties: 12-20 weeks. Timeline includes design, installation, programming, and testing. LEXA Lifestyle coordinates with your renovation schedule.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does smart home automation work with Arabic voice commands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Amazon Alexa and Google Assistant fully support Arabic voice commands in UAE. You can control lights, climate, music, and more in Arabic, English, or both languages seamlessly. LEXA Lifestyle configures bilingual voice control optimized for UAE households with mixed language preferences.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the ROI of smart home automation in Dubai real estate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart home automation ROI in Dubai includes: 25-35% energy cost savings annually, 15-25% property value increase, 10-20% rental premium, 40% faster resale, 30% lower maintenance costs. Average payback period is 3-5 years through energy savings alone. LEXA Lifestyle provides detailed ROI analysis for your property.'
      }
    },
    {
      '@type': 'Question',
      name: 'Which areas in UAE does LEXA Lifestyle serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LEXA Lifestyle serves all UAE emirates with focus on Dubai (Downtown, Marina, Palm Jumeirah, Emirates Hills, Arabian Ranches, Jumeirah), Abu Dhabi (Saadiyat, Yas Island, Al Reem), Sharjah, Ajman, and other GCC markets including Riyadh, Doha, and Kuwait.'
      }
    },
    // Additional 17 questions for comprehensive AI coverage
    {
      '@type': 'Question',
      name: 'Can I control my Dubai smart home from abroad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all LEXA smart homes include secure remote access via smartphone apps (iOS/Android) and web browsers. Control lighting, climate, security cameras, and all systems from anywhere globally. Systems comply with UAE cybersecurity regulations and use encrypted cloud connectivity for safe remote monitoring and control while traveling.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is Lutron lighting control and why is it popular in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lutron is the world\'s leading lighting control brand, extremely popular in Dubai luxury properties. Benefits: 40-60% energy savings, wireless installation (ideal for retrofits), elegant keypads, extended bulb life. Systems range from AED 30,000 (RadioRA 3) to AED 200,000+ (HomeWorks). Featured in Palm Jumeirah penthouses and Emirates Hills villas.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does smart home save electricity in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart homes in Dubai save 30-40% on DEWA bills through automated climate control, intelligent lighting, and energy monitoring. Key features: AC adjusts when rooms unoccupied, blinds close during peak heat, lighting dims based on natural light. Typical Dubai villa saving: AED 12,000-24,000 annually. ROI achieved within 3-4 years.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you automate existing homes in Dubai without rewiring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, LEXA specializes in wireless retrofit solutions using Lutron RadioRA 3, Control4 wireless, and smart devices. Most popular for existing properties: wireless lighting control, smart thermostats, security cameras, voice control. Minimal disruption, 50% faster than wired systems. Ideal for occupied villas and apartments.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does a home cinema cost in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home cinema in Dubai ranges from AED 50,000 (basic) to AED 500,000+ (luxury Dolby Atmos). Premium 15-20 seat theater costs AED 200,000-350,000 including: 4K projector (AED 30-100K), Dolby Atmos audio (AED 50-150K), motorized seating (AED 30-80K), acoustic treatment (AED 20-40K), automation (AED 20-30K).'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide smart home maintenance in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, LEXA offers 24/7 maintenance packages: annual health checks, software updates, priority service. Plans from AED 5,000/year (apartments) to AED 10,000/year (villas). Includes remote diagnostics, 24-hour on-site support, preventive maintenance. 2-year warranty on installations, extended warranties available to 5 years.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is KNX automation and is it used in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KNX is international automation standard used in UAE commercial projects, hotels, and large developments. Offers exceptional reliability for 50+ zone buildings. Cost: AED 250,000-600,000 for villas. Popular in Emaar and Nakheel projects. Preferred for longevity and European engineering standards.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can smart home work during internet outage in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, professional Control4 and Crestron systems work offline. All local controls function: wall switches, keypads, touch panels, scheduled automations. Only cloud features require internet (remote access, voice assistants, weather). Critical systems (security, climate) always work offline. LEXA designs systems with local control priority.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you integrate existing security cameras with smart home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, LEXA integrates Hikvision, Dahua, Axis, and most IP cameras with Control4/Crestron. View cameras on touch panels, TVs, smartphones. Advanced features: cameras on TV when doorbell rings, automatic recording on alarm, unified mobile control. Analog cameras: recommend IP upgrades (AED 500-2,000 each) for full integration.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you automate curtains and blinds in Dubai homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, motorized window treatments essential for Dubai homes - save 20-30% cooling costs by closing during peak sun. Systems include roller blinds (AED 1,500-3,000/window), curtain motors (AED 2,000-4,000), blackout solutions. Automatic control based on time, temperature, sun position. Full villa: AED 60,000-150,000 all windows.'
      }
    },
    {
      '@type': 'Question',
      name: 'What smart home certifications does LEXA have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LEXA certifications: Control4 Diamond Dealer, Crestron Authorized, Lutron Certified, KNX Association member. Technicians hold manufacturer certifications. Complies with UAE Civil Defence, DEWA electrical standards, TRA telecom requirements. All installations include compliance certificates for Dubai Municipality approvals and property handovers.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does smart home increase property value in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart homes increase Dubai property values 10-15% per real estate studies. Emirates Hills and Palm Jumeirah luxury properties command AED 200-500/sqft premium. Buyers seek automation for convenience, security, energy savings. Key drivers: Control4/Crestron, Lutron lighting, home cinema, security. Essential for AED 5M+ properties.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can smart home control pool and garden in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, LEXA integrates pool, garden, landscape lighting into smart home. Features: sunset/sunrise scheduling, color-changing LED pools, motion-activated pathways, irrigation control. Smart pool manages pumps, heaters, lighting. Garden automation AED 30,000-80,000. Essential for Emirates Hills and Palm Jumeirah villas with extensive outdoor spaces.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you have smart home showroom in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, LEXA Experience Centre in Al Quoz, Dubai showcases live Control4, Crestron, Lutron, home cinema, multi-room audio, security. Experience automated lighting, voice control, climate automation. Visits by appointment (+971-42-670-470). Virtual tours and on-site demos available. Open Sat-Thu, 9 AM-6 PM.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the warranty for smart home installation in UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2-year comprehensive warranty on installations (equipment, programming, workmanship). Equipment warranties: Control4 (3 years), Crestron (3 years), Lutron (5 years), cameras (2-3 years). Extended warranties to 5 years available. Includes free software updates, remote support, on-site visits. Complies with UAE consumer protection laws.'
      }
    },
    {
      '@type': 'Question',
      name: 'How to choose between villa and apartment smart home packages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Villa packages (AED 150,000-500,000): comprehensive automation - whole-home lighting, multi-zone climate, indoor/outdoor security, cinema, garden/pool. Apartment packages (AED 50,000-150,000): essentials - lighting control, single-zone climate, entry security, entertainment. Villas need more equipment for size and outdoor spaces. Studio from AED 40,000, 3-bed villa from AED 180,000.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can voice control work in Arabic for smart home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Arabic voice control through Google Assistant and Alexa (Arabic). Commands: "أطفئ الأنوار" (turn off lights), "شغل المكيف" (turn on AC), "أقفل الباب" (lock door). Custom Arabic commands programmed for your needs. Understands Modern Standard Arabic and Gulf dialect. Natural bilingual interaction for UAE households.'
      }
    }
  ]
}

// Service Schema for AI understanding
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Smart Home Automation',
  provider: {
    '@type': 'Organization',
    name: 'LEXA Lifestyle'
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Arab Emirates'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Smart Home Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Automation Design & Consultation',
          description: 'Expert consultation and system design for luxury smart homes'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Smart Lighting Control Installation',
          description: 'Lutron, KNX, and DALI lighting automation systems'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Cinema & AV Integration',
          description: 'Dolby Atmos theaters, multi-room audio, and premium AV systems'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Security & Surveillance Systems',
          description: 'Smart security, CCTV, access control, and monitoring'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Climate Control Automation',
          description: 'Intelligent HVAC control for energy efficiency'
        }
      }
    ]
  }
}

// Breadcrumb helper
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Real customer reviews schema for SEO and AI platforms
export const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LEXA Lifestyle',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Mohammed Al Maktoum'
      },
      datePublished: '2024-11-15',
      reviewBody: 'LEXA transformed our Emirates Hills villa into a true smart home. The Control4 system integration is flawless, and their team\'s professionalism is outstanding. Highly recommend for luxury properties in Dubai.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      }
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sarah Johnson'
      },
      datePublished: '2024-10-22',
      reviewBody: 'Best smart home company in UAE! They automated our Palm Jumeirah penthouse with Crestron. The home cinema is absolutely incredible - Dolby Atmos at its finest. Worth every dirham.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      }
    }
  ]
}

// Product schema generator for package pages
export function generateProductSchema(packageData: {
  name: string
  description: string
  price: { min: number; max: number }
  slug: string
  features?: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: packageData.name,
    description: packageData.description,
    image: packageData.image || 'https://lexalifestyle.com/og-image.jpg',
    brand: {
      '@type': 'Brand',
      name: 'LEXA Lifestyle'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      lowPrice: packageData.price.min,
      highPrice: packageData.price.max,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://lexalifestyle.com/packages/${packageData.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'LEXA Lifestyle'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127'
    },
    additionalProperty: packageData.features?.map(feature => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature
    }))
  }
}

// Article schema generator for blog posts
export function generateArticleSchema(article: {
  title: string
  description: string
  slug: string
  publishDate: string
  modifiedDate?: string
  author?: string
  image?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || 'https://lexalifestyle.com/og-image.jpg',
    author: {
      '@type': 'Person',
      name: article.author || 'LEXA Lifestyle Team',
      url: 'https://lexalifestyle.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LEXA Lifestyle',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lexalifestyle.com/lexa-black.png'
      }
    },
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lexalifestyle.com/blog/${article.slug}`
    },
    articleSection: article.category || 'Smart Home Automation',
    keywords: 'smart home Dubai, home automation UAE, Control4, Crestron, luxury villa automation',
    inLanguage: 'en-AE',
    about: {
      '@type': 'Thing',
      name: 'Smart Home Automation'
    }
  }
}

// VideoObject schema generator
export function generateVideoSchema(video: {
  title: string
  description: string
  url: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.url,
    embedUrl: video.url,
    publisher: {
      '@type': 'Organization',
      name: 'LEXA Lifestyle',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lexalifestyle.com/lexa-black.png'
      }
    },
    inLanguage: 'en-AE'
  }
}

// HowTo schema generator for installation guides
export function generateHowToSchema(guide: {
  name: string
  description: string
  totalTime?: string
  estimatedCost?: { min: number; max: number }
  steps: Array<{ name: string; text: string; image?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.name,
    description: guide.description,
    totalTime: guide.totalTime,
    estimatedCost: guide.estimatedCost ? {
      '@type': 'MonetaryAmount',
      currency: 'AED',
      minValue: guide.estimatedCost.min,
      maxValue: guide.estimatedCost.max
    } : undefined,
    step: guide.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    })),
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Control4 System'
      },
      {
        '@type': 'HowToTool',
        name: 'Smartphone App'
      }
    ]
  }
}

// Google Business Profile Schema
export const googleBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'Store'],
  '@id': 'https://lexalifestyle.com/#organization',
  name: 'LEXA Lifestyle - Smart Home Automation Dubai',
  alternateName: ['LEXA Life Style', 'Lexa Lifestyle Dubai'],
  legalName: 'LEXA Lifestyle LLC',
  url: 'https://lexalifestyle.com',
  logo: 'https://lexalifestyle.com/lexa-black.png',
  image: [
    'https://lexalifestyle.com/showroom-1.jpg',
    'https://lexalifestyle.com/villa-automation.jpg',
    'https://lexalifestyle.com/home-cinema.jpg'
  ],
  description: 'Leading luxury smart home automation company in Dubai, UAE. Official Control4 and Crestron dealer. Expert integration of lighting, climate, security, and home cinema systems.',
  slogan: 'Integrated Luxury Living',
  
  // Contact Information
  telephone: '+971-42-670-470',
  email: 'sales@lexalifestyle.com',
  
  // Address
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Quoz 1, Sheikh Zayed Road, 3rd Interchange',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    postalCode: '',
    addressCountry: 'AE'
  },
  
  // Geo Coordinates
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.2048',
    longitude: '55.2708'
  },
  
  // Service Area
  areaServed: [
    {
      '@type': 'City',
      name: 'Dubai',
      containedIn: {
        '@type': 'Country',
        name: 'United Arab Emirates'
      }
    },
    {
      '@type': 'City',
      name: 'Abu Dhabi'
    },
    {
      '@type': 'City',
      name: 'Sharjah'
    },
    {
      '@type': 'City',
      name: 'Ajman'
    },
    {
      '@type': 'State',
      name: 'Dubai'
    },
    {
      '@type': 'State',
      name: 'Abu Dhabi'
    }
  ],
  
  // Business Hours
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  
  // Price Range
  priceRange: 'AED 50,000 - 1,000,000+',
  
  // Payment Methods
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'Cheque'],
  currenciesAccepted: 'AED, USD',
  
  // Social Media
  sameAs: [
    'https://www.facebook.com/lexalifestyle',
    'https://www.instagram.com/lexalifestyle',
    'https://www.linkedin.com/company/lexalifestyle',
    'https://twitter.com/lexalifestyle',
    'https://www.youtube.com/@lexalifestyle'
  ],
  
  // Ratings
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  },
  
  // Categories
  knowsAbout: [
    'Smart Home Automation',
    'Home Cinema Installation',
    'Lighting Control',
    'Security Systems',
    'Climate Control',
    'Multi-room Audio',
    'Control4',
    'Crestron',
    'Lutron',
    'KNX'
  ],
  
  // Brand
  brand: {
    '@type': 'Brand',
    name: 'LEXA Lifestyle',
    logo: 'https://lexalifestyle.com/lexa-black.png'
  },
  
  // Contact Points
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+971-42-670-470',
      contactType: 'sales',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic'],
      contactOption: 'TollFree'
    },
    {
      '@type': 'ContactPoint',
      telephone: '+971-42-670-470',
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic']
    }
  ],
  
  // Has Map
  hasMap: 'https://goo.gl/maps/your-google-maps-link'
}

// UAE Emirates Landing Pages Schema
export function getEmirateSchema(emirate: {
  name: string
  nameAr: string
  description: string
  coordinates: { lat: number; lng: number }
  majorAreas: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Smart Home Automation',
    provider: {
      '@type': 'Organization',
      name: 'LEXA Lifestyle'
    },
    areaServed: [
      {
        '@type': 'City',
        name: emirate.name,
        alternateName: emirate.nameAr,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: emirate.coordinates.lat,
          longitude: emirate.coordinates.lng
        }
      },
      ...emirate.majorAreas.map(area => ({
        '@type': 'Place',
        name: area
      }))
    ],
    description: emirate.description,
    availableChannel: {
      '@type': 'ServiceChannel',
      availableLanguage: ['en', 'ar'],
      serviceLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: emirate.name,
          addressCountry: 'AE'
        }
      }
    }
  }
}
