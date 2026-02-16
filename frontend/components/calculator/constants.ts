import {
  Home,
  Building2,
  Hotel,
  Hospital,
  GraduationCap,
  ShoppingBag,
  Building
} from 'lucide-react'
import { ProjectType, Solution } from './types'

export const PROJECT_TYPES: ProjectType[] = [
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
      { id: 'professional-services', label: 'Professional Services Office' }
    ]
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: Hotel,
    description: 'Hotels, resorts',
    subCategories: [
      { id: 'hotel', label: 'Hotel / Resort' },
      { id: 'serviced-apartments', label: 'Serviced Apartments' },
      { id: 'boutique-hotel', label: 'Boutique Hotel' },
      { id: 'vacation-rental', label: 'Vacation Rental Property' }
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
      { id: 'senior-living', label: 'Senior Living Facility' },
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
    label: 'Retail',
    icon: ShoppingBag,
    description: 'Stores, malls, F&B',
    subCategories: [
      { id: 'shopping-mall', label: 'Shopping Mall' },
      { id: 'standalone-store', label: 'Standalone Store' },
      { id: 'showroom', label: 'Showroom' },
      { id: 'restaurant', label: 'Restaurant / F&B' }
    ]
  },
  {
    id: 'mixed-use',
    label: 'Mixed-Use',
    icon: Building,
    description: 'Multi-purpose developments',
    subCategories: [
      { id: 'residential-commercial', label: 'Residential + Commercial' },
      { id: 'residential-retail', label: 'Residential + Retail' },
      { id: 'multi-purpose', label: 'Multi-Purpose Complex' }
    ]
  }
]

export const SOLUTIONS_MATRIX: Record<string, Solution[]> = {
  residential: [
    { id: 'security-access', label: 'Security & Access Control', basePrice: 100000, levels: [
      { id: 'basic', label: 'Basic (Smart Locks + Cameras)', price: 50000 },
      { id: 'standard', label: 'Standard (AI Detection + Access Control)', price: 100000 },
      { id: 'premium', label: 'Premium (Biometric + Full Integration)', price: 200000 }
    ]},
    { id: 'lighting', label: 'Lighting Automation', basePrice: 80000, levels: [
      { id: 'basic', label: 'Basic (Wireless Smart Lights)', price: 40000 },
      { id: 'standard', label: 'Standard (Wired with Scenes)', price: 80000 },
      { id: 'premium', label: 'Premium (Lutron HomeWorks)', price: 150000 }
    ]},
    { id: 'climate', label: 'Climate Control (HVAC)', basePrice: 70000, levels: [
      { id: 'basic', label: 'Basic (Smart Thermostats)', price: 35000 },
      { id: 'standard', label: 'Standard (Zone Control)', price: 70000 },
      { id: 'premium', label: 'Premium (Full HVAC Integration)', price: 120000 }
    ]},
    { id: 'entertainment', label: 'Entertainment Systems', basePrice: 150000, levels: [
      { id: 'basic', label: 'Basic (Multi-Room Audio)', price: 60000 },
      { id: 'standard', label: 'Standard (Home Cinema 7.1)', price: 150000 },
      { id: 'premium', label: 'Premium (Dolby Atmos 9.2.4)', price: 280000 }
    ]},
    { id: 'energy', label: 'Energy Management', basePrice: 50000, levels: [
      { id: 'basic', label: 'Basic (Monitoring)', price: 25000 },
      { id: 'standard', label: 'Standard (Solar Integration)', price: 50000 },
      { id: 'premium', label: 'Premium (Full Energy + EV)', price: 100000 }
    ]},
    { id: 'shades', label: 'Motorized Shades', basePrice: 50000, levels: [
      { id: 'basic', label: 'Basic (5-8 Windows)', price: 30000 },
      { id: 'standard', label: 'Standard (10-15 Windows)', price: 50000 },
      { id: 'premium', label: 'Premium (15+ Windows)', price: 90000 }
    ]},
    { id: 'wellness', label: 'Wellness Systems', basePrice: 40000, levels: [
      { id: 'basic', label: 'Basic (Air Quality Monitoring)', price: 20000 },
      { id: 'standard', label: 'Standard (Air + Water Quality)', price: 40000 },
      { id: 'premium', label: 'Premium (Full Wellness Suite)', price: 80000 }
    ]},
    { id: 'integration', label: 'System Integration Platform', basePrice: 80000, levels: [
      { id: 'control4', label: 'Control4 Standard', price: 50000 },
      { id: 'control4-pro', label: 'Control4 Pro', price: 80000 },
      { id: 'crestron', label: 'Crestron', price: 150000 }
    ]}
  ],
  'commercial-office': [
    { id: 'hvac', label: 'HVAC Systems', basePrice: 150000, levels: [
      { id: 'basic', label: 'Basic (Zone Control)', price: 80000 },
      { id: 'standard', label: 'Standard (Smart HVAC + CO2)', price: 150000 },
      { id: 'premium', label: 'Premium (Predictive + Analytics)', price: 250000 }
    ]},
    { id: 'lighting', label: 'Lighting Control', basePrice: 100000, levels: [
      { id: 'basic', label: 'Basic (Occupancy Sensors)', price: 50000 },
      { id: 'standard', label: 'Standard (Daylight Harvesting)', price: 100000 },
      { id: 'premium', label: 'Premium (Full Automation)', price: 180000 }
    ]},
    { id: 'security-access', label: 'Security & Access Control', basePrice: 200000, levels: [
      { id: 'basic', label: 'Basic (Card Access)', price: 100000 },
      { id: 'standard', label: 'Standard (Badge + Visitor Mgmt)', price: 200000 },
      { id: 'enterprise', label: 'Enterprise (Full Integration)', price: 350000 }
    ]},
    { id: 'fire-safety', label: 'Fire Safety & Life Safety', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Code Compliant)', price: 120000 },
      { id: 'premium', label: 'Premium (Integrated Protocols)', price: 200000 }
    ]},
    { id: 'energy-analytics', label: 'Energy Analytics & Reporting', basePrice: 80000, levels: [
      { id: 'basic', label: 'Basic (Monitoring)', price: 40000 },
      { id: 'standard', label: 'Standard (LEED Tracking)', price: 80000 },
      { id: 'enterprise', label: 'Enterprise (Full Analytics)', price: 150000 }
    ]},
    { id: 'network', label: 'Network Infrastructure', basePrice: 100000, levels: [
      { id: 'standard', label: 'Standard (Enterprise WiFi 6E)', price: 100000 },
      { id: 'premium', label: 'Premium (Full IoT + Cloud)', price: 180000 }
    ]},
    { id: 'meeting-rooms', label: 'Meeting Room Management', basePrice: 60000, levels: [
      { id: 'basic', label: 'Basic (Booking System)', price: 30000 },
      { id: 'standard', label: 'Standard (AV Control)', price: 60000 },
      { id: 'premium', label: 'Premium (Full Automation)', price: 120000 }
    ]}
  ],
  hospitality: [
    { id: 'guest-room', label: 'Guest Room Automation', basePrice: 120000, levels: [
      { id: 'basic', label: 'Basic (Smart Thermostat + Lights)', price: 60000 },
      { id: 'standard', label: 'Standard (Welcome Scenes)', price: 120000 },
      { id: 'premium', label: 'Premium (Full Personalization)', price: 200000 }
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
      { id: 'standard', label: 'Standard (Classroom Control)', price: 180000 },
      { id: 'premium', label: 'Premium (Green Building)', price: 320000 }
    ]},
    { id: 'lighting', label: 'Lighting Control', basePrice: 100000, levels: [
      { id: 'standard', label: 'Standard (Classroom Automation)', price: 100000 },
      { id: 'premium', label: 'Premium (Campus-wide)', price: 180000 }
    ]},
    { id: 'fire-safety', label: 'Fire Safety', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Code Compliant)', price: 120000 }
    ]},
    { id: 'classroom-tech', label: 'Classroom Technology', basePrice: 100000, levels: [
      { id: 'basic', label: 'Basic (AV Systems)', price: 50000 },
      { id: 'standard', label: 'Standard (Smart Boards)', price: 100000 },
      { id: 'premium', label: 'Premium (Full Integration)', price: 180000 }
    ]}
  ],
  retail: [
    { id: 'hvac-refrigeration', label: 'HVAC & Refrigeration', basePrice: 200000, levels: [
      { id: 'standard', label: 'Standard (Zone + Cooler Monitoring)', price: 200000 },
      { id: 'premium', label: 'Premium (Predictive + 30% Savings)', price: 350000 }
    ]},
    { id: 'lighting', label: 'Retail Lighting', basePrice: 120000, levels: [
      { id: 'standard', label: 'Standard (Display Lighting)', price: 120000 },
      { id: 'premium', label: 'Premium (Full Automation)', price: 220000 }
    ]},
    { id: 'security', label: 'Security Systems', basePrice: 150000, levels: [
      { id: 'standard', label: 'Standard (Surveillance + Loss Prevention)', price: 150000 },
      { id: 'premium', label: 'Premium (Integrated Security)', price: 280000 }
    ]},
    { id: 'customer-experience', label: 'Customer Experience', basePrice: 80000, levels: [
      { id: 'standard', label: 'Standard (Digital Signage + Music)', price: 80000 },
      { id: 'premium', label: 'Premium (Full Ambiance Control)', price: 150000 }
    ]},
    { id: 'energy', label: 'Energy Management', basePrice: 100000, levels: [
      { id: 'standard', label: 'Standard (Monitoring)', price: 100000 },
      { id: 'premium', label: 'Premium (Demand Response)', price: 180000 }
    ]}
  ],
  'mixed-use': [
    { id: 'integrated-systems', label: 'Integrated Systems', basePrice: 300000, levels: [
      { id: 'standard', label: 'Standard (Unified Platform)', price: 300000 },
      { id: 'premium', label: 'Premium (Full Integration)', price: 550000 }
    ]},
    { id: 'security-access', label: 'Security & Access', basePrice: 250000, levels: [
      { id: 'standard', label: 'Standard (Multi-Zone)', price: 250000 },
      { id: 'enterprise', label: 'Enterprise (Complex-wide)', price: 450000 }
    ]},
    { id: 'energy', label: 'Energy Management', basePrice: 180000, levels: [
      { id: 'standard', label: 'Standard (Multi-Use Monitoring)', price: 180000 },
      { id: 'premium', label: 'Premium (Full Analytics)', price: 320000 }
    ]},
    { id: 'hvac-climate', label: 'HVAC & Climate', basePrice: 220000, levels: [
      { id: 'standard', label: 'Standard (Zone Control)', price: 220000 },
      { id: 'premium', label: 'Premium (Integrated Control)', price: 400000 }
    ]}
  ]
}

export const CONTROL_PLATFORMS = ['Control4', 'Crestron', 'KNX', 'Savant', 'Lutron HomeWorks', 'Other']
export const SECURITY_BRANDS = ['Hikvision', 'Axis', 'Bosch', 'Honeywell', 'Dahua', 'Avigilon', 'Other']
export const LIGHTING_BRANDS = ['Lutron', 'KNX', 'DALI', 'Control4', 'Crestron', 'Legrand', 'Other']

export const LOCATIONS: Record<string, string[]> = {
  Dubai: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Emirates Hills', 'Arabian Ranches', 'Business Bay', 'JBR', 'Jumeirah', 'Other'],
  'Abu Dhabi': ['Al Reem Island', 'Saadiyat Island', 'Yas Island', 'Al Raha Beach', 'Al Reef', 'Khalifa City', 'Other'],
  Sharjah: ['Al Khan', 'Al Majaz', 'Al Nahda', 'Muwaileh', 'Other'],
  Ajman: ['Al Rashidiya', 'Al Nuaimiya', 'Other'],
  'Ras Al Khaimah': ['Al Hamra Village', 'Mina Al Arab', 'Other'],
  'Umm Al Quwain': ['UAQ Marina', 'Other'],
  Fujairah: ['Fujairah City', 'Dibba', 'Other']
}

export const ADDITIONAL_FEATURES = [
  { id: 'voice-control', label: 'Voice Control (Alexa/Google)', icon: '🎙️' },
  { id: 'outdoor-entertainment', label: 'Outdoor Entertainment', icon: '🎵' },
  { id: 'pool-spa', label: 'Pool & Spa Automation', icon: '🏊' },
  { id: 'landscape-lighting', label: 'Landscape Lighting', icon: '💡' },
  { id: 'solar', label: 'Solar Integration', icon: '☀️' },
  { id: 'backup-generator', label: 'Backup Generator', icon: '⚡' },
  { id: 'ev-charging', label: 'EV Charging Station', icon: '🔌' },
  { id: 'future-wiring', label: 'Future-Proof Wiring', icon: '🔮' }
]
