'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import SolutionFAQs from '@/components/sections/SolutionFAQs'

export default function YachtAutomationPage() {
  return (
    <>
      <SeoLandingPageTemplate
      cmsKey="page_solutions_yacht-automation"
      cmsKey="page_solutions_yacht-automation"
      hero={{
        badge: "Marine Solutions",
        title: "YACHT",
        titleHighlight: "AUTOMATION",
        subtitle: "Marine Audio. Satellite TV. Network. Entertainment.",
        description: "Complete yacht automation with marine-grade AV systems, satellite connectivity, and integrated entertainment for luxury vessels.",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a",
        primaryCTA: {
          text: "Request Yacht Solution",
          href: "/consultation"
        }
      }}
      audience={['Yacht Owners', 'Superyachts', 'Marine Contractors', 'Boat Builders']}
      problems={{
        items: [
          { problem: 'Equipment Corrosion', impact: 'Salt air damages non-marine grade equipment' },
          { problem: 'Poor Connectivity', impact: 'No internet or streaming while offshore' },
          { problem: 'Limited Entertainment', impact: 'Bored guests, no TV or music options' },
          { problem: 'Complex Controls', impact: 'Different systems, no unified control' },
          { problem: 'Installation Challenges', impact: 'Space constraints, weight restrictions' },
          { problem: 'No Integration', impact: 'Navigation, AV, lighting all separate' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Speaker', title: 'Marine Audio', desc: 'Waterproof speakers, multi-zone systems, Bluetooth' },
          { icon: 'Tv', title: 'Marine Entertainment', desc: 'Satellite TV, streaming, outdoor displays' },
          { icon: 'Wifi', title: 'Marine Network', desc: 'Satellite internet, 4G/5G, WiFi throughout' },
          { icon: 'Anchor', title: 'Yacht Integration', desc: 'NMEA integration, navigation displays' },
          { icon: 'Shield', title: 'Marine Grade', desc: 'IP67 rated, salt-fog tested, UV resistant' },
          { icon: 'Waves', title: 'Stabilized Systems', desc: 'Gyro-stabilized satellite, shock-mounted racks' }
        ]
      }}
      process={{
        title: "Our Marine Installation Process",
        subtitle: "Certified marine integrators",
        steps: [
          { step: '01', title: 'Survey', desc: 'Vessel inspection, space assessment, power audit, requirements gathering' },
          { step: '02', title: 'Design', desc: 'Marine-grade equipment selection, layout planning, integration design' },
          { step: '03', title: 'Installation', desc: 'Equipment mounting, marine-rated cabling, waterproofing, testing' },
          { step: '04', title: 'Sea Trial', desc: 'On-water testing, system commissioning, crew training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Yacht Automation Packages',
        items: [
          { name: 'Basic Marine AV', subtitle: 'Up to 40 ft', features: ['Marine Stereo', 'Cockpit Speakers', 'TV System', 'WiFi Extender'] },
          { name: 'Complete Yacht System', subtitle: '40-80 ft', features: ['Multi-Zone Audio', 'Satellite TV', 'Marine Network', 'Integrated Control', 'Outdoor Entertainment'] },
          { name: 'Superyacht Solution', subtitle: '80+ ft', features: ['Whole-Vessel Audio/Video', 'Stabilized Satellite', 'Cinema', 'Automation Integration', 'Dedicated Support'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '50+', label: 'Vessels Equipped' },
          { number: 'NMEA', label: 'Certified' },
          { number: 'IP67', label: 'Marine Rated' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready to Automate Your Yacht?",
        subtitle: "Get a marine-grade entertainment and automation proposal",
        primaryCTA: {
          text: "Request Yacht Solution",
          href: "/consultation"
        }
      }}
    />
    
    {/* Dynamic FAQs from Database */}
    <SolutionFAQs solutionSlug="yacht-automation" />
  </>
  )
}
