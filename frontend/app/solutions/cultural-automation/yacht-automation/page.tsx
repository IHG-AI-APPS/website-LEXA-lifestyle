import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function YachtAutomationPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_cultural-automation_yacht-automation"
      cmsKey="page_solutions_cultural-automation_yacht-automation"
      hero={{
        badge: 'Marine Automation',
        title: 'YACHT',
        titleHighlight: 'AUTOMATION',
        subtitle: 'Audio. Lighting. Climate. Entertainment.',
        description: 'Marine-grade automation systems for superyachts and luxury vessels. Weatherproof entertainment, climate control, and sophisticated ambiance at sea.',
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a',
        primaryCTA: {
          text: 'Request Yacht System',
          href: '/consultation'
        }
      }}
      audience={[
        'Superyacht Owners',
        'Yacht Builders',
        'Marine Refitters',
        'Luxury Vessel Operators'
      ]}
      problems={{
        title: 'Marine Automation Challenges',
        items: [
          {
            problem: 'Harsh Marine Environment',
            impact: 'Standard equipment corrodes from salt air, humidity, and temperature extremes'
          },
          {
            problem: 'Complex Multi-Zone Audio',
            impact: 'Different music in cabins, deck, bridge - difficult to manage'
          },
          {
            problem: 'Inconsistent Climate',
            impact: 'Manual AC control in every cabin, no centralized management'
          },
          {
            problem: 'Outdoor Entertainment',
            impact: 'Deck parties require weather-resistant audio and lighting systems'
          }
        ]
      }}
      deliverables={{
        title: 'Complete Yacht Automation',
        items: [
          {
            icon: 'Volume2',
            title: 'Marine Audio System',
            desc: 'Weatherproof speakers, multi-zone control, underwater speakers for swim platform'
          },
          {
            icon: 'Sun',
            title: 'Deck Lighting',
            desc: 'Underwater LED lights, deck accent lighting, party scenes, navigation integration'
          },
          {
            icon: 'Wind',
            title: 'Climate Control',
            desc: 'Centralized HVAC management for all cabins, automatic temperature adjustment'
          },
          {
            icon: 'Smartphone',
            title: 'Integrated Control',
            desc: 'Single interface for audio, lighting, climate, entertainment across vessel'
          },
          {
            icon: 'Shield',
            title: 'Security Systems',
            desc: 'Marine-grade cameras, access control, perimeter monitoring when docked'
          },
          {
            icon: 'Anchor',
            title: 'Navigation Integration',
            desc: 'Lighting and audio automation tied to vessel mode (cruising, anchored, docked)'
          }
        ]
      }}
      process={{
        title: 'Marine Installation Process',
        steps: [
          {
            step: '1',
            title: 'Vessel Assessment',
            desc: 'Survey of existing systems, space constraints, and owner requirements'
          },
          {
            step: '2',
            title: 'Marine System Design',
            desc: 'Weatherproof equipment selection, zone planning, integration architecture'
          },
          {
            step: '3',
            title: 'Certified Installation',
            desc: 'Marine-certified technicians, weatherproof wiring, corrosion protection'
          },
          {
            step: '4',
            title: 'Sea Trials & Training',
            desc: 'System testing at sea, crew training, captain briefing'
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '20+', label: 'Yachts Automated' },
          { number: 'IP67', label: 'Weatherproof Rating' },
          { number: '10+', label: 'Years Marine Experience' }
        ]
      }}
      conversion={{
        title: 'Elevate Your Yacht Experience',
        subtitle: 'Marine-grade automation systems designed for the harshest conditions at sea.',
        primaryCTA: {
          text: 'Request Marine Consultation',
          href: '/consultation'
        }
      }}
      relatedSolutions={[
        { name: 'Outdoor AV Systems', link: '/solutions/outdoor-av-systems', description: 'Weatherproof entertainment' },
        { name: 'Multi-Room Audio', link: '/solutions/multi-room-audio', description: 'Whole-vessel audio' },
        { name: 'Lighting Automation', link: '/solutions/lighting-automation', description: 'Scene control' }
      ]}
      relatedPersonas={[
        { name: 'For Homeowners', link: '/persona/homeowner', description: 'Luxury lifestyles' },
        { name: 'For Commercial', link: '/persona/commercial', description: 'Hospitality vessels' }
      ]}
      geoPages={[
        { name: 'Dubai Marina Living', link: '/dubai/dubai-marina' }
      ]}
    />
  )
}
