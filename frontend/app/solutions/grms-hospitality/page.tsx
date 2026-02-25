'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function GRMSHospitalityPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_grms-hospitality"
      hero={{
        badge: "Guest Experience",
        title: "HOTEL",
        titleHighlight: "AUTOMATION",
        subtitle: "Guest Room Management. In-Room Entertainment. Energy Control.",
        description: "Complete hotel automation solutions with GRMS, IPTV, smart room controls, and energy management for enhanced guest experience.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        primaryCTA: {
          text: "Request Hospitality Solution",
          href: "/consultation"
        }
      }}
      audience={['Hotels & Resorts', 'Serviced Apartments', 'Hospital VIP Suites', 'Boutique Hotels']}
      problems={{
        items: [
          { problem: 'High Energy Costs', impact: 'Rooms consuming power when unoccupied' },
          { problem: 'Poor Guest Experience', impact: 'Complicated controls, limited entertainment' },
          { problem: 'No Automation', impact: 'Staff manually controlling room systems' },
          { problem: 'Limited Analytics', impact: 'No data on room usage, guest preferences' },
          { problem: 'Maintenance Issues', impact: 'Can\'t monitor room status, reactive only' },
          { problem: 'No Integration', impact: 'PMS, IPTV, HVAC all separate systems' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Bed', title: 'Guest Room Management', desc: 'Occupancy detection, automated welcome/farewell scenes' },
          { icon: 'Tv', title: 'IPTV Systems', desc: 'Live TV, VOD, casting, guest information' },
          { icon: 'Users', title: 'Smart Room Control', desc: 'Lighting, climate, curtains via tablet or mobile' },
          { icon: 'Utensils', title: 'Service Integration', desc: 'Room service, housekeeping, maintenance requests' },
          { icon: 'Music', title: 'In-Room Entertainment', desc: 'Music streaming, Bluetooth, smart speakers' },
          { icon: 'Building2', title: 'PMS Integration', desc: 'Check-in/out automation, billing, guest profiles' }
        ]
      }}
      process={{
        title: "Our Hospitality Implementation",
        subtitle: "Seamless hotel technology deployment",
        steps: [
          { step: '01', title: 'Assessment', desc: 'Property survey, guest journey mapping, system requirements, brand standards' },
          { step: '02', title: 'Design', desc: 'System architecture, equipment selection, integration planning, pilot room' },
          { step: '03', title: 'Deployment', desc: 'Phased rollout, room installation, PMS integration, staff training' },
          { step: '04', title: 'Support', desc: 'Guest feedback, system optimization, ongoing maintenance, updates' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Hospitality Solutions',
        items: [
          { name: 'Essential GRMS', subtitle: 'Up to 50 rooms', features: ['Basic Room Control', 'IPTV System', 'Energy Savings', 'Mobile App', 'PMS Integration'] },
          { name: 'Complete GRMS', subtitle: '50-200 rooms', features: ['Advanced Automation', 'Interactive IPTV', 'Tablet Control', 'Guest Analytics', 'Full Integration'] },
          { name: 'Luxury GRMS', subtitle: '200+ rooms', features: ['Bespoke Guest Experience', 'AI Personalization', 'Voice Control', 'Predictive Services', 'Dedicated Support'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '30+', label: 'Hotels Automated' },
          { number: '3,000+', label: 'Rooms Deployed' },
          { number: '25%', label: 'Energy Savings' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready to Transform Guest Experience?",
        subtitle: "Get a hospitality technology proposal with ROI analysis",
        primaryCTA: {
          text: "Request Hospitality Solution",
          href: "/consultation"
        }
      }}
    />
  )
}
