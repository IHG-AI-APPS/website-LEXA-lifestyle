'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function OutdoorLivingPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_outdoor-living"
      hero={{
        badge: "Outdoor Entertainment",
        title: "OUTDOOR LIVING",
        titleHighlight: "AUTOMATION",
        subtitle: "Weatherproof AV. Outdoor Lighting. Climate Control.",
        description: "Transform your outdoor spaces with weatherproof entertainment systems, automated lighting, and climate solutions.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        primaryCTA: {
          text: "Design Outdoor Space",
          href: "/consultation"
        }
      }}
      audience={['Villa Owners', 'Pool Areas', 'Terrace & Balconies', 'Outdoor Entertainment Areas']}
      problems={{
        items: [
          { problem: 'Equipment Damage', impact: 'Indoor gear used outside, water damage, heat failure' },
          { problem: 'Poor Audio Quality', impact: 'Sound doesn\'t carry outdoors, weak bass' },
          { problem: 'Glare on Screens', impact: 'Can\'t see TV during day, washed out image' },
          { problem: 'Manual Controls', impact: 'Going inside to adjust lights, music, temperature' },
          { problem: 'Weather Unpredictable', impact: 'No automated response to rain, wind, temperature' },
          { problem: 'Energy Waste', impact: 'Outdoor systems left on, no scheduling' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Tv', title: 'Outdoor Displays', desc: 'Weatherproof 4K TVs, anti-glare, high brightness' },
          { icon: 'Speaker', title: 'Outdoor Audio', desc: 'Landscape speakers, rock speakers, soundbars' },
          { icon: 'Sun', title: 'Outdoor Lighting', desc: 'Path lights, uplighting, pool lighting, scene control' },
          { icon: 'Wind', title: 'Motorized Shades', desc: 'Pergola shades, retractable awnings, sun sensors' },
          { icon: 'Zap', title: 'Smart Outlets', desc: 'Weatherproof outlets, automated pool equipment' },
          { icon: 'Droplets', title: 'Misting Systems', desc: 'Automated cooling, humidity control integration' }
        ]
      }}
      process={{
        title: "Our Outdoor Integration Process",
        subtitle: "Weather-resistant installation",
        steps: [
          { step: '01', title: 'Site Assessment', desc: 'Space layout, sun exposure, weather protection needs' },
          { step: '02', title: 'System Design', desc: 'Equipment selection, placement, power/data planning' },
          { step: '03', title: 'Installation', desc: 'Mounting, cabling, weatherproofing, landscape integration' },
          { step: '04', title: 'Integration', desc: 'Automation scenes, weather triggers, mobile control' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Outdoor Packages',
        items: [
          { name: 'Essential Outdoor', features: ['55" Outdoor TV', 'Outdoor Soundbar', 'Path Lighting', 'Mobile Control'] },
          { name: 'Premium Outdoor', features: ['75" Outdoor TV', 'Landscape Audio (6 speakers)', 'Full Lighting Design', 'Motorized Shades', 'Smart Irrigation'] },
          { name: 'Ultimate Outdoor', features: ['98" Outdoor Display', 'Outdoor Home Theater', 'Architectural Lighting', 'Climate Control', 'Pool/Spa Automation'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '300+', label: 'Outdoor Spaces' },
          { number: 'IP65', label: 'Weather Rating' },
          { number: '5 Year', label: 'Warranty' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready to Transform Your Outdoor Space?",
        subtitle: "Get a custom outdoor entertainment design and quote",
        primaryCTA: {
          text: "Request Outdoor Design",
          href: "/consultation"
        }
      }}
    />
  )
}
