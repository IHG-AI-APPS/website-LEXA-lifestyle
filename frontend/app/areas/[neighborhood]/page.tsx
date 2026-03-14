import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NeighborhoodLandingPage from '@/components/templates/NeighborhoodLandingPage'

// Dubai's premium neighborhoods for smart home automation
const neighborhoods = {
  'palm-jumeirah': {
    name: 'Palm Jumeirah',
    title: 'Smart Home Automation Palm Jumeirah | LEXA Lifestyle Dubai',
    description: 'Premium smart home automation for Palm Jumeirah villas and apartments. Home theaters, lighting control, and complete villa automation by LEXA Lifestyle.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600',
    features: ['Beachfront Villa Automation', 'Outdoor Entertainment Systems', 'Pool & Garden Control', 'Marine-Grade Equipment'],
    stats: { projects: 45, avgSize: '12,000 sqft', avgBudget: 'AED 350K+' },
    testimonial: {
      quote: 'LEXA transformed our Palm villa into a smart sanctuary. The outdoor automation is perfect for our beach lifestyle.',
      author: 'Ahmed K.',
      role: 'Villa Owner, Palm Jumeirah'
    },
    keywords: ['palm jumeirah smart home', 'palm jumeirah villa automation', 'palm jumeirah home theater']
  },
  'emirates-hills': {
    name: 'Emirates Hills',
    title: 'Smart Home Automation Emirates Hills | Luxury Villa Technology',
    description: 'Exclusive smart home solutions for Emirates Hills estates. Complete automation, home cinema, and intelligent lighting for Dubai\'s most prestigious address.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
    features: ['Estate-Wide Automation', 'Private Cinema Rooms', 'Golf Course View Integration', 'Multi-Zone Audio'],
    stats: { projects: 38, avgSize: '20,000 sqft', avgBudget: 'AED 500K+' },
    testimonial: {
      quote: 'The level of sophistication LEXA brought to our Emirates Hills estate is unmatched. True luxury automation.',
      author: 'Sarah M.',
      role: 'Homeowner, Emirates Hills'
    },
    keywords: ['emirates hills smart home', 'emirates hills automation', 'luxury villa technology dubai']
  },
  'dubai-marina': {
    name: 'Dubai Marina',
    title: 'Smart Home Automation Dubai Marina | Apartment & Penthouse',
    description: 'Smart home solutions designed for Dubai Marina high-rises. Compact automation, stunning views integration, and seamless city living technology.',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600',
    features: ['High-Rise Automation', 'Motorized Blinds', 'Compact Home Theater', 'Smart Climate Control'],
    stats: { projects: 67, avgSize: '2,500 sqft', avgBudget: 'AED 85K+' },
    testimonial: {
      quote: 'Perfect smart home setup for our Marina penthouse. The automated blinds and lighting scenes are incredible.',
      author: 'James T.',
      role: 'Penthouse Owner, Marina'
    },
    keywords: ['dubai marina smart home', 'marina apartment automation', 'penthouse smart technology']
  },
  'downtown-dubai': {
    name: 'Downtown Dubai',
    title: 'Smart Home Automation Downtown Dubai | Burj Khalifa Views',
    description: 'Smart home automation for Downtown Dubai residences. Experience luxury living with intelligent control and Burj Khalifa view integration.',
    heroImage: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1600',
    features: ['Burj View Optimization', 'Executive Apartments', 'Smart Building Integration', 'Concierge System'],
    stats: { projects: 52, avgSize: '3,200 sqft', avgBudget: 'AED 120K+' },
    testimonial: {
      quote: 'LEXA integrated our smart home perfectly with the building systems. The Burj views are now part of our automation scenes.',
      author: 'Mohammed R.',
      role: 'Resident, Downtown Dubai'
    },
    keywords: ['downtown dubai smart home', 'burj khalifa residence automation', 'downtown apartment technology']
  },
  'arabian-ranches': {
    name: 'Arabian Ranches',
    title: 'Smart Home Automation Arabian Ranches | Family Villa Technology',
    description: 'Family-focused smart home automation for Arabian Ranches villas. Child-safe systems, outdoor entertainment, and community-integrated solutions.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
    features: ['Family-Safe Automation', 'Garden & Pool Control', 'Kids Room Technology', 'Security Integration'],
    stats: { projects: 89, avgSize: '8,000 sqft', avgBudget: 'AED 180K+' },
    testimonial: {
      quote: 'As a family, we needed automation that was safe and easy to use. LEXA delivered exactly that for our Arabian Ranches villa.',
      author: 'Fatima A.',
      role: 'Villa Owner, Arabian Ranches'
    },
    keywords: ['arabian ranches smart home', 'family villa automation', 'arabian ranches technology']
  },
  'jumeirah': {
    name: 'Jumeirah',
    title: 'Smart Home Automation Jumeirah | Beachside Villa Technology',
    description: 'Coastal-optimized smart home solutions for Jumeirah villas. Salt-air resistant systems, beach lifestyle automation, and luxury outdoor control.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
    features: ['Coastal-Grade Systems', 'Beach House Automation', 'Outdoor Entertainment', 'Weather-Resistant Tech'],
    stats: { projects: 34, avgSize: '10,000 sqft', avgBudget: 'AED 280K+' },
    testimonial: {
      quote: 'Living by the beach requires special consideration. LEXA understood this perfectly for our Jumeirah villa.',
      author: 'David L.',
      role: 'Villa Owner, Jumeirah'
    },
    keywords: ['jumeirah smart home', 'beach villa automation', 'jumeirah home technology']
  },
  'business-bay': {
    name: 'Business Bay',
    title: 'Smart Office & Home Automation Business Bay | Executive Living',
    description: 'Smart automation for Business Bay residences and offices. Work-from-home integration, executive apartments, and professional spaces.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600',
    features: ['Home Office Integration', 'Video Conferencing Rooms', 'Executive Lighting', 'Privacy Systems'],
    stats: { projects: 41, avgSize: '2,800 sqft', avgBudget: 'AED 95K+' },
    testimonial: {
      quote: 'My Business Bay apartment doubles as my office. LEXA created seamless transitions between work and living modes.',
      author: 'Priya S.',
      role: 'Executive, Business Bay'
    },
    keywords: ['business bay smart home', 'smart office dubai', 'executive apartment automation']
  },
  'al-barari': {
    name: 'Al Barari',
    title: 'Smart Home Automation Al Barari | Nature-Integrated Technology',
    description: 'Eco-conscious smart home solutions for Al Barari villas. Nature-integrated automation that complements the botanical lifestyle.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
    features: ['Eco-Friendly Systems', 'Garden Automation', 'Natural Light Optimization', 'Energy Management'],
    stats: { projects: 22, avgSize: '15,000 sqft', avgBudget: 'AED 400K+' },
    testimonial: {
      quote: 'Al Barari is about harmony with nature. LEXA created automation that enhances rather than disrupts our botanical paradise.',
      author: 'Nadia K.',
      role: 'Villa Owner, Al Barari'
    },
    keywords: ['al barari smart home', 'eco villa automation', 'nature integrated technology']
  }
}

type NeighborhoodSlug = keyof typeof neighborhoods

interface PageProps {
  params: { neighborhood: string }
}

export async function generateStaticParams() {
  return Object.keys(neighborhoods).map((neighborhood) => ({
    neighborhood,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = neighborhoods[params.neighborhood as NeighborhoodSlug]
  
  if (!data) {
    return {
      title: 'Area Not Found | LEXA Lifestyle',
    }
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.heroImage }],
      type: 'website',
      locale: 'en_AE',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.heroImage],
    },
    alternates: {
      canonical: `https://lexalifestyle.com/areas/${params.neighborhood}`,
    },
  }
}

export default function NeighborhoodPage({ params }: PageProps) {
  const data = neighborhoods[params.neighborhood as NeighborhoodSlug]
  
  if (!data) {
    notFound()
  }

  return <NeighborhoodLandingPage {...data} slug={params.neighborhood} />
}
