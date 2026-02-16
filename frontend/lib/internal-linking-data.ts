// Internal Linking Data for SEO Cross-linking
// This file contains related personas, solutions, and geo pages for each solution

export const internalLinking = {
  'home-cinema': {
    relatedPersonas: [
      { name: 'Homeowners', link: '/persona/homeowner', description: 'Transform your villa into a private cinema' },
      { name: 'Architects', link: '/persona/architect', description: 'Design integration for luxury developments' },
      { name: 'Developers', link: '/persona/developer', description: 'Cinema packages for show villas' }
    ],
    relatedSolutions: [
      { name: 'Audio Systems', link: '/solutions/audio-systems', description: 'Multi-room audio throughout your home' },
      { name: 'Lighting Automation', link: '/solutions/lighting-automation', description: 'Scene control for perfect ambiance' },
      { name: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', description: 'Complete home automation integration' }
    ],
    geoPages: [
      { name: 'Palm Jumeirah', link: '/locations/palm-jumeirah', badge: 'Popular' },
      { name: 'Emirates Hills', link: '/locations/emirates-hills' }
    ]
  },
  
  'luxury-home-cinema-dubai': {
    relatedPersonas: [
      { name: 'Villa Owners', link: '/persona/homeowner', description: 'Luxury cinema systems for your Dubai villa' },
      { name: 'Interior Designers', link: '/persona/architect', description: 'Seamless integration with your design' }
    ],
    relatedSolutions: [
      { name: 'Home Cinema', link: '/solutions/home-cinema', description: 'Explore our cinema packages' },
      { name: 'HiFi Audio', link: '/solutions/hifi-audio', description: 'Audiophile listening rooms' },
      { name: 'Outdoor Living', link: '/solutions/outdoor-living', description: 'Extend entertainment outdoors' }
    ],
    geoPages: [
      { name: 'Dubai Hills Estate', link: '/locations/dubai-hills' },
      { name: 'Downtown Dubai', link: '/locations/downtown-dubai' }
    ]
  },
  
  'conference-rooms': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Enterprise AV solutions for your business' },
      { name: 'Architects', link: '/persona/architect', description: 'Technical coordination for office fit-outs' }
    ],
    relatedSolutions: [
      { name: 'Conference Room AV Systems', link: '/solutions/conference-room-av-systems', description: 'Dedicated AV room solutions' },
      { name: 'Video Walls', link: '/solutions/video-walls', description: 'Large format displays for boardrooms' },
      { name: 'Workplace Analytics', link: '/solutions/workplace-analytics', description: 'Smart office insights' }
    ],
    geoPages: [
      { name: 'Downtown Dubai', link: '/locations/downtown-dubai', badge: 'Business Hub' },
      { name: 'Dubai Hills', link: '/locations/dubai-hills' }
    ]
  },
  
  'masjid-automation': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Automation for Islamic centers and mosques' }
    ],
    relatedSolutions: [
      { name: 'Prayer Room Systems', link: '/solutions/cultural-automation/prayer-room-systems', description: 'Corporate prayer facilities' },
      { name: 'Majlis Automation', link: '/solutions/cultural-automation/majlis-automation', description: 'Traditional meeting spaces' },
      { name: 'Audio Systems', link: '/solutions/audio-systems', description: 'Professional sound reinforcement' }
    ],
    geoPages: [
      { name: 'Sharjah', link: '/locations/sharjah' },
      { name: 'Abu Dhabi', link: '/locations/abu-dhabi' }
    ]
  },
  
  'smart-parking': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Parking solutions for commercial properties' },
      { name: 'Developers', link: '/persona/developer', description: 'Smart parking for new developments' }
    ],
    relatedSolutions: [
      { name: 'BMS Automation', link: '/solutions/bms-automation', description: 'Complete building management' },
      { name: 'Access Control', link: '/solutions/access-control', description: 'Integrated entry security' },
      { name: 'AI Camera Analytics', link: '/solutions/ai-camera-staff-analytics', description: 'Traffic flow optimization' }
    ],
    geoPages: [
      { name: 'Downtown Dubai', link: '/locations/downtown-dubai' },
      { name: 'Dubai Hills', link: '/locations/dubai-hills' }
    ]
  },
  
  'security': {
    relatedPersonas: [
      { name: 'Homeowners', link: '/persona/homeowner', description: 'Villa security systems' },
      { name: 'Commercial', link: '/persona/commercial', description: 'Enterprise security solutions' },
      { name: 'Developers', link: '/persona/developer', description: 'Security packages for developments' }
    ],
    relatedSolutions: [
      { name: 'Surveillance', link: '/solutions/surveillance', description: 'Advanced camera systems' },
      { name: 'Access Control', link: '/solutions/access-control', description: 'Biometric entry systems' },
      { name: 'Networking', link: '/solutions/networking', description: 'Secure network infrastructure' }
    ],
    geoPages: [
      { name: 'Palm Jumeirah', link: '/locations/palm-jumeirah' },
      { name: 'Emirates Hills', link: '/locations/emirates-hills' }
    ]
  },
  
  'lighting-automation': {
    relatedPersonas: [
      { name: 'Homeowners', link: '/persona/homeowner', description: 'Smart lighting for your home' },
      { name: 'Interior Designers', link: '/persona/architect', description: 'Lighting design integration' }
    ],
    relatedSolutions: [
      { name: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', description: 'Complete home automation' },
      { name: 'Motorized Shades', link: '/solutions/motorized-shades', description: 'Automated window treatments' },
      { name: 'Climate Control', link: '/solutions/climate-control', description: 'Comfort automation' }
    ],
    geoPages: [
      { name: 'Emirates Hills', link: '/locations/emirates-hills' },
      { name: 'Jumeirah Golf Estates', link: '/locations/jumeirah-golf-estates' }
    ]
  },
  
  // NEW PAGES - Template-based with full internal linking
  'temple-automation': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Automation for temples and religious centers' }
    ],
    relatedSolutions: [
      { name: 'Church Automation', link: '/solutions/cultural-automation/church-automation', description: 'Christian worship spaces' },
      { name: 'Masjid Automation', link: '/solutions/cultural-automation/masjid-automation', description: 'Islamic prayer facilities' },
      { name: 'Audio Systems', link: '/solutions/audio-systems', description: 'Professional sound systems' }
    ],
    geoPages: [
      { name: 'Dubai', link: '/locations/downtown-dubai' },
      { name: 'Sharjah', link: '/locations/sharjah' }
    ]
  },
  
  'church-automation': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Technology for worship spaces' }
    ],
    relatedSolutions: [
      { name: 'Temple Automation', link: '/solutions/cultural-automation/temple-automation', description: 'Hindu worship automation' },
      { name: 'Audio Systems', link: '/solutions/audio-systems', description: 'Professional PA systems' },
      { name: 'Lighting Automation', link: '/solutions/lighting-automation', description: 'Worship lighting scenes' }
    ],
    geoPages: [
      { name: 'Dubai', link: '/locations/downtown-dubai' },
      { name: 'Abu Dhabi', link: '/locations/abu-dhabi' }
    ]
  },
  
  'audio-rooms-studios': {
    relatedPersonas: [
      { name: 'Homeowners', link: '/persona/homeowner', description: 'Home studios and podcast rooms' },
      { name: 'Commercial', link: '/persona/commercial', description: 'Professional recording facilities' }
    ],
    relatedSolutions: [
      { name: 'HiFi Audio', link: '/solutions/hifi-audio', description: 'Audiophile listening rooms' },
      { name: 'Home Cinema', link: '/solutions/home-cinema', description: 'Private cinema acoustics' },
      { name: 'Audio Systems', link: '/solutions/audio-systems', description: 'Multi-room audio' }
    ],
    geoPages: [
      { name: 'Downtown Dubai', link: '/locations/downtown-dubai' },
      { name: 'Dubai Hills', link: '/locations/dubai-hills' }
    ]
  },
  
  'conference-room-av-systems': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Enterprise AV solutions' },
      { name: 'Architects', link: '/persona/architect', description: 'Office AV integration' }
    ],
    relatedSolutions: [
      { name: 'Video Walls', link: '/solutions/video-walls', description: 'Large format displays' },
      { name: 'Auditoriums', link: '/solutions/auditoriums', description: 'Large venue AV' },
      { name: 'Networking', link: '/solutions/networking', description: 'Enterprise WiFi infrastructure' }
    ],
    geoPages: [
      { name: 'Downtown Dubai', link: '/locations/downtown-dubai', badge: 'Business Hub' },
      { name: 'Dubai Hills', link: '/locations/dubai-hills' }
    ]
  },
  
  'ai-camera-staff-analytics': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Data-driven business insights' },
      { name: 'Developers', link: '/persona/developer', description: 'Smart building analytics' }
    ],
    relatedSolutions: [
      { name: 'Surveillance', link: '/solutions/surveillance', description: 'Security camera systems' },
      { name: 'Workplace Analytics', link: '/solutions/workplace-analytics', description: 'Office space optimization' },
      { name: 'Smart Parking', link: '/solutions/smart-parking', description: 'Parking occupancy analytics' }
    ],
    geoPages: [
      { name: 'Downtown Dubai', link: '/locations/downtown-dubai' },
      { name: 'Dubai Hills', link: '/locations/dubai-hills' }
    ]
  },
  
  'custom-iot-automation': {
    relatedPersonas: [
      { name: 'Commercial', link: '/persona/commercial', description: 'Bespoke business automation' },
      { name: 'Developers', link: '/persona/developer', description: 'Custom building systems' }
    ],
    relatedSolutions: [
      { name: 'BMS Automation', link: '/solutions/bms-automation', description: 'Building management systems' },
      { name: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', description: 'Residential automation' },
      { name: 'Workplace Analytics', link: '/solutions/workplace-analytics', description: 'Smart workplace solutions' }
    ],
    geoPages: [
      { name: 'Dubai', link: '/locations/downtown-dubai' },
      { name: 'Abu Dhabi', link: '/locations/abu-dhabi' }
    ]
  },
  
  'smart-gadgets-accessories': {
    relatedPersonas: [
      { name: 'Homeowners', link: '/persona/homeowner', description: 'Smart home products' },
      { name: 'Tech Enthusiasts', link: '/persona/homeowner', description: 'Latest smart devices' }
    ],
    relatedSolutions: [
      { name: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', description: 'Complete home automation' },
      { name: 'Lighting Automation', link: '/solutions/lighting-automation', description: 'Smart lighting control' },
      { name: 'Security', link: '/solutions/security', description: 'Smart security devices' }
    ],
    geoPages: [
      { name: 'Palm Jumeirah', link: '/locations/palm-jumeirah' },
      { name: 'Dubai Hills', link: '/locations/dubai-hills' }
    ]
  }
}

export type SolutionKey = keyof typeof internalLinking

export function getInternalLinks(solutionKey: string) {
  return internalLinking[solutionKey as SolutionKey] || null
}
