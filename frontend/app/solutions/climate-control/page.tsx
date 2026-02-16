'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function ClimateControlPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: "Comfort Solutions",
        title: "CLIMATE",
        titleHighlight: "CONTROL",
        subtitle: "Smart Thermostats. Zone Control. Energy Optimization.",
        description: "Intelligent HVAC automation with multi-zone control, smart scheduling, and energy optimization for perfect indoor comfort.",
        image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3",
        primaryCTA: {
          text: "Design Climate System",
          href: "/consultation"
        }
      }}
      audience={['Villa Owners', 'Luxury Apartments', 'Hotels', 'Commercial Offices']}
      problems={{
        items: [
          { problem: 'Uneven Temperatures', impact: 'Some rooms too hot, others too cold' },
          { problem: 'High Cooling Costs', impact: 'AC running full blast 24/7' },
          { problem: 'Manual Adjustments', impact: 'Constantly changing thermostat settings' },
          { problem: 'No Automation', impact: 'Can\'t schedule or create climate scenes' },
          { problem: 'Energy Waste', impact: 'Cooling empty rooms, no occupancy sensing' },
          { problem: 'Poor Air Quality', impact: 'No humidity or air quality monitoring' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Thermometer', title: 'Smart Thermostats', desc: 'Wi-Fi thermostats, learning algorithms, geofencing' },
          { icon: 'Wind', title: 'Zone Control', desc: 'Independent temperature for each room or area' },
          { icon: 'Droplets', title: 'Humidity Management', desc: 'Dehumidification, humidification control' },
          { icon: 'Zap', title: 'Energy Optimization', desc: 'Occupancy-based cooling, demand response' },
          { icon: 'Clock', title: 'Scheduling', desc: 'Time-based, occupancy-based, weather-adaptive' },
          { icon: 'BarChart3', title: 'Analytics', desc: 'Usage tracking, efficiency reporting, cost analysis' }
        ]
      }}
      process={{
        title: "Our Climate Control Process",
        subtitle: "Comfort and efficiency optimization",
        steps: [
          { step: '01', title: 'Assessment', desc: 'HVAC system review, zone analysis, usage patterns, inefficiency identification' },
          { step: '02', title: 'Design', desc: 'Thermostat selection, zone layout, integration planning' },
          { step: '03', title: 'Installation', desc: 'Thermostat installation, zone dampers, sensor deployment' },
          { step: '04', title: 'Programming', desc: 'Schedule setup, automation scenes, user training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Climate Control Solutions',
        items: [
          { name: 'Single Zone', features: ['Smart Thermostat', 'App Control', 'Voice Integration', 'Scheduling', 'Energy Reports'] },
          { name: 'Multi-Zone (2-5 zones)', features: ['Zone Thermostats', 'Central Control', 'Occupancy Sensors', 'Advanced Scheduling', 'Integration'] },
          { name: 'Whole-Home (6+ zones)', features: ['Full Zone Control', 'Environmental Sensors', 'Humidity Management', 'BMS Integration', 'Predictive Optimization'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '800+', label: 'Systems Installed' },
          { number: '25-35%', label: 'Avg Energy Savings' },
          { number: '15+', label: 'Years Experience' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready for Smart Climate Control?",
        subtitle: "Get a custom climate control design and energy savings analysis",
        primaryCTA: {
          text: "Request Climate Assessment",
          href: "/consultation"
        }
      }}
    />
  )
}
