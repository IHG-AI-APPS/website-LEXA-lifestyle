import {
  Home,
  Building2,
  Hotel,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Building
} from 'lucide-react'

export const PROJECT_TYPES = [
  {
    id: 'residential',
    label: 'Residential',
    icon: Home,
    description: 'Homes, villas, apartments',
    subCategories: [
      { id: 'single-family', label: 'Single-Family Home / Villa' },
      { id: 'multi-family', label: 'Multi-Family Unit / Apartment' },
      { id: 'luxury-estate', label: 'Luxury Estate / Mansion' },
      { id: 'penthouse', label: 'Penthouse' }
    ]
  },
  {
    id: 'commercial-office',
    label: 'Commercial Office',
    icon: Building2,
    description: 'Offices, workspaces',
    subCategories: [
      { id: 'corporate-office', label: 'Corporate Office' },
      { id: 'coworking', label: 'Co-working Space' },
      { id: 'business-park', label: 'Business Park' },
      { id: 'branch-office', label: 'Branch Office' }
    ]
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: Hotel,
    description: 'Hotels, resorts',
    subCategories: [
      { id: 'boutique-hotel', label: 'Boutique Hotel' },
      { id: 'luxury-resort', label: 'Luxury Resort' },
      { id: 'business-hotel', label: 'Business Hotel' },
      { id: 'serviced-apartments', label: 'Serviced Apartments' }
    ]
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: Hospital,
    description: 'Hospitals, clinics',
    subCategories: [
      { id: 'hospital', label: 'Hospital' },
      { id: 'clinic', label: 'Clinic / Medical Center' },
      { id: 'surgery-center', label: 'Surgery Center' },
      { id: 'wellness-center', label: 'Wellness Center' }
    ]
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    description: 'Schools, universities',
    subCategories: [
      { id: 'university', label: 'University / College' },
      { id: 'k12-school', label: 'K-12 School' },
      { id: 'training-center', label: 'Training Center' },
      { id: 'library', label: 'Library' }
    ]
  },
  {
    id: 'retail',
    label: 'Retail & F&B',
    icon: ShoppingBag,
    description: 'Stores, restaurants',
    subCategories: [
      { id: 'restaurant', label: 'Restaurant / Cafe' },
      { id: 'retail-store', label: 'Retail Store' },
      { id: 'mall', label: 'Shopping Mall' },
      { id: 'showroom', label: 'Showroom' }
    ]
  },
  {
    id: 'mixed-use',
    label: 'Mixed-Use',
    icon: Building,
    description: 'Multi-purpose developments',
    subCategories: [
      { id: 'residential-commercial', label: 'Residential + Commercial' },
      { id: 'lifestyle-center', label: 'Lifestyle Center' },
      { id: 'business-park', label: 'Business Park' }
    ]
  }
]

export const SOLUTIONS_MATRIX: Record<string, Array<{
  id: string
  label: string
  basePrice: number
  levels: Array<{ id: string; label: string; price: number }>
}>> = {
  residential: [
    { id: 'lighting', label: 'Lighting Control', basePrice: 80000, levels: [
      { id: 'basic', label: 'Basic (15-20 zones)', price: 50000 },
      { id: 'standard', label: 'Standard (30-40 zones + Scenes)', price: 80000 },
      { id: 'premium', label: 'Premium (Lutron HomeWorks)', price: 150000 }
    ]},
    { id: 'hvac', label: 'Climate Control', basePrice: 60000, levels: [
      { id: 'basic', label: 'Basic (Smart Thermostats)', price: 30000 },
      { id: 'standard', label: 'Standard (Zone Control)', price: 60000 },
      { id: 'premium', label: 'Premium (Full HVAC Integration)', price: 120000 }
    ]},
    { id: 'av', label: 'Audio/Video', basePrice: 100000, levels: [
      { id: 'basic', label: 'Basic (Multi-room Audio)', price: 50000 },
      { id: 'standard', label: 'Standard (6-8 zones)', price: 100000 },
      { id: 'premium', label: 'Premium (Whole-home + Cinema)', price: 250000 }
    ]},
    { id: 'shades', label: 'Motorized Shades', basePrice: 80000, levels: [
      { id: 'basic', label: 'Basic (10-15 windows)', price: 40000 },
      { id: 'standard', label: 'Standard (20-30 windows)', price: 80000 },
      { id: 'premium', label: 'Premium (Full Property)', price: 150000 }
    ]},
    { id: 'security', label: 'Security & Surveillance', basePrice: 70000, levels: [
      { id: 'basic', label: 'Basic (8-camera CCTV)', price: 40000 },
      { id: 'standard', label: 'Standard (16-camera + Smart Locks)', price: 70000 },
      { id: 'premium', label: 'Premium (Full Security Suite)', price: 150000 }
    ]},
    { id: 'energy', label: 'Energy Management', basePrice: 50000, levels: [
      { id: 'standard', label: 'Standard (Monitoring)', price: 50000 },
      { id: 'premium', label: 'Premium (Optimization + Solar)', price: 100000 }
    ]}
  ],
  'commercial-office': [
    { id: 'lighting', label: 'Commercial Lighting', basePrice: 150000, levels: [
      { id: 'standard', label: 'Standard (DALI/KNX)', price: 150000 },
      { id: 'premium', label: 'Premium (Daylight Harvesting)', price: 280000 }
    ]},
    { id: 'hvac', label: 'Building HVAC', basePrice: 180000, levels: [
      { id: 'standard', label: 'Standard (BMS Integration)', price: 180000 },
      { id: 'premium', label: 'Premium (AI Optimization)', price: 320000 }
    ]},
    { id: 'av-conferencing', label: 'AV & Conferencing', basePrice: 120000, levels: [
      { id: 'basic', label: 'Basic (3-5 rooms)', price: 80000 },
      { id: 'standard', label: 'Standard (10+ rooms)', price: 120000 },
      { id: 'premium', label: 'Premium (Enterprise AV)', price: 250000 }
    ]},
    { id: 'access-control', label: 'Access Control', basePrice: 100000, levels: [
      { id: 'standard', label: 'Standard (Card + Mobile)', price: 100000 },
      { id: 'premium', label: 'Premium (Biometric)', price: 180000 }
    ]},
    { id: 'surveillance', label: 'Surveillance', basePrice: 90000, levels: [
      { id: 'standard', label: 'Standard (20-camera IP)', price: 90000 },
      { id: 'premium', label: 'Premium (AI Analytics)', price: 180000 }
    ]},
    { id: 'energy', label: 'Energy Management', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Monitoring)', price: 120000 },
      { id: 'premium', label: 'Premium (20-30% Savings)', price: 220000 }
    ]}
  ],
  hospitality: [
    { id: 'lighting', label: 'Hotel Lighting', basePrice: 200000, levels: [
      { id: 'standard', label: 'Standard (In-room + Corridors)', price: 200000 },
      { id: 'premium', label: 'Premium (Full Property + Outdoor)', price: 380000 }
    ]},
    { id: 'hvac', label: 'Guest Room HVAC', basePrice: 180000, levels: [
      { id: 'standard', label: 'Standard (Occupancy-based)', price: 180000 },
      { id: 'premium', label: 'Premium (Predictive + Comfort)', price: 320000 }
    ]},
    { id: 'energy', label: 'Energy Management', basePrice: 150000, levels: [
      { id: 'standard', label: 'Standard (Occupancy-based)', price: 150000 },
      { id: 'premium', label: 'Premium (Smart Grid + 30% Savings)', price: 280000 }
    ]},
    { id: 'security-access', label: 'Security & Access', basePrice: 180000, levels: [
      { id: 'basic', label: 'Basic (Card Keys)', price: 90000 },
      { id: 'standard', label: 'Standard (Mobile Keys)', price: 180000 },
      { id: 'premium', label: 'Premium (Biometric + Master)', price: 320000 }
    ]},
    { id: 'entertainment', label: 'In-Room Entertainment', basePrice: 100000, levels: [
      { id: 'basic', label: 'Basic (Smart TVs)', price: 50000 },
      { id: 'standard', label: 'Standard (Casting + Streaming)', price: 100000 },
      { id: 'premium', label: 'Premium (Full Control)', price: 180000 }
    ]},
    { id: 'operations', label: 'Operational Efficiency', basePrice: 100000, levels: [
      { id: 'standard', label: 'Standard (Housekeeping Status)', price: 100000 },
      { id: 'premium', label: 'Premium (Predictive + Maintenance)', price: 180000 }
    ]},
    { id: 'common-areas', label: 'Common Area Management', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Lobby + Restaurant)', price: 120000 },
      { id: 'premium', label: 'Premium (Full Property)', price: 220000 }
    ]}
  ],
  healthcare: [
    { id: 'hvac-air', label: 'HVAC & Air Quality', basePrice: 250000, levels: [
      { id: 'standard', label: 'Standard (Infection Control)', price: 250000 },
      { id: 'premium', label: 'Premium (Negative Pressure + HEPA)', price: 450000 }
    ]},
    { id: 'lighting', label: 'Healthcare Lighting', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Circadian + Patient Care)', price: 120000 },
      { id: 'premium', label: 'Premium (Surgical + Full Control)', price: 220000 }
    ]},
    { id: 'security-access', label: 'Security & Access Control', basePrice: 280000, levels: [
      { id: 'standard', label: 'Standard (Staff Badge + RTLS)', price: 280000 },
      { id: 'enterprise', label: 'Enterprise (Patient Tracking)', price: 480000 }
    ]},
    { id: 'nurse-call', label: 'Nurse Call Integration', basePrice: 150000, levels: [
      { id: 'standard', label: 'Standard (Patient Alerts)', price: 150000 },
      { id: 'premium', label: 'Premium (Workflow Integration)', price: 280000 }
    ]},
    { id: 'medical-equipment', label: 'Medical Equipment Monitoring', basePrice: 180000, levels: [
      { id: 'standard', label: 'Standard (Asset Tracking)', price: 180000 },
      { id: 'premium', label: 'Premium (Full Monitoring)', price: 320000 }
    ]}
  ],
  education: [
    { id: 'campus-security', label: 'Campus Security', basePrice: 200000, levels: [
      { id: 'standard', label: 'Standard (Access + Surveillance)', price: 200000 },
      { id: 'premium', label: 'Premium (Lockdown Protocols)', price: 350000 }
    ]},
    { id: 'hvac-energy', label: 'HVAC & Energy', basePrice: 180000, levels: [
      { id: 'standard', label: 'Standard (Scheduling)', price: 180000 },
      { id: 'premium', label: 'Premium (AI Optimization)', price: 320000 }
    ]},
    { id: 'classroom-av', label: 'Classroom AV', basePrice: 150000, levels: [
      { id: 'basic', label: 'Basic (10 classrooms)', price: 100000 },
      { id: 'standard', label: 'Standard (20 classrooms)', price: 150000 },
      { id: 'premium', label: 'Premium (Full Campus)', price: 280000 }
    ]},
    { id: 'auditorium', label: 'Auditorium Systems', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Audio + Video)', price: 120000 },
      { id: 'premium', label: 'Premium (Broadcast Quality)', price: 250000 }
    ]},
    { id: 'building-lighting', label: 'Building-wide Lighting', basePrice: 140000, levels: [
      { id: 'standard', label: 'Standard (Scheduling)', price: 140000 },
      { id: 'premium', label: 'Premium (Occupancy + Daylight)', price: 250000 }
    ]}
  ],
  retail: [
    { id: 'lighting', label: 'Retail Lighting', basePrice: 100000, levels: [
      { id: 'basic', label: 'Basic (Accent + Display)', price: 60000 },
      { id: 'standard', label: 'Standard (Dynamic Scenes)', price: 100000 },
      { id: 'premium', label: 'Premium (Full Control + Exterior)', price: 180000 }
    ]},
    { id: 'audio-ambience', label: 'Audio & Ambience', basePrice: 70000, levels: [
      { id: 'basic', label: 'Basic (Background Music)', price: 40000 },
      { id: 'standard', label: 'Standard (Zoned Audio)', price: 70000 },
      { id: 'premium', label: 'Premium (Immersive Experience)', price: 150000 }
    ]},
    { id: 'hvac', label: 'Climate Control', basePrice: 80000, levels: [
      { id: 'standard', label: 'Standard (Zone Control)', price: 80000 },
      { id: 'premium', label: 'Premium (Customer Comfort)', price: 150000 }
    ]},
    { id: 'surveillance-analytics', label: 'Surveillance & Analytics', basePrice: 90000, levels: [
      { id: 'standard', label: 'Standard (16-camera)', price: 90000 },
      { id: 'premium', label: 'Premium (AI + People Counting)', price: 180000 }
    ]},
    { id: 'access-pos', label: 'Access & POS Integration', basePrice: 70000, levels: [
      { id: 'standard', label: 'Standard (Staff Access)', price: 70000 },
      { id: 'premium', label: 'Premium (POS + Analytics)', price: 140000 }
    ]}
  ],
  'mixed-use': [
    { id: 'residential-systems', label: 'Residential Systems', basePrice: 200000, levels: [
      { id: 'standard', label: 'Standard (Basic Automation)', price: 200000 },
      { id: 'premium', label: 'Premium (Full Integration)', price: 380000 }
    ]},
    { id: 'commercial-systems', label: 'Commercial Systems', basePrice: 180000, levels: [
      { id: 'standard', label: 'Standard (BMS)', price: 180000 },
      { id: 'premium', label: 'Premium (Enterprise)', price: 350000 }
    ]},
    { id: 'common-areas', label: 'Common Area Management', basePrice: 150000, levels: [
      { id: 'standard', label: 'Standard (Lobbies + Amenities)', price: 150000 },
      { id: 'premium', label: 'Premium (Full Property)', price: 280000 }
    ]},
    { id: 'parking-access', label: 'Parking & Access', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Barriers + Guidance)', price: 120000 },
      { id: 'premium', label: 'Premium (Smart Parking + EV)', price: 250000 }
    ]},
    { id: 'unified-security', label: 'Unified Security', basePrice: 200000, levels: [
      { id: 'standard', label: 'Standard (CCTV + Access)', price: 200000 },
      { id: 'enterprise', label: 'Enterprise (AI + Central)', price: 400000 }
    ]}
  ]
}

export const ADDITIONAL_FEATURES = [
  { id: 'voice-control', label: 'Voice Control (Alexa/Google)', price: 15000 },
  { id: 'mobile-app', label: 'Custom Mobile App', price: 25000 },
  { id: 'outdoor-automation', label: 'Outdoor Automation (Pool, Garden)', price: 40000 },
  { id: 'home-cinema', label: 'Dedicated Home Cinema', price: 150000 },
  { id: 'solar-integration', label: 'Solar Panel Integration', price: 50000 },
  { id: 'backup-power', label: 'UPS/Generator Integration', price: 30000 }
]

export const CONTROL_PLATFORMS = ['Control4', 'Crestron', 'KNX', 'Savant', 'No Preference']
export const SECURITY_BRANDS = ['Hikvision', 'Axis', 'Hanwha', 'Bosch', 'No Preference']
export const LIGHTING_BRANDS = ['Lutron', 'KNX', 'DALI', 'Wireless (Zigbee/Z-Wave)', 'No Preference']

export const LOCATIONS = {
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'RAK', 'Fujairah', 'UAQ'],
  KSA: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'],
  Other: ['Qatar', 'Bahrain', 'Kuwait', 'Oman']
}
