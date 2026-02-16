import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function MajlisAutomationPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: 'Cultural Automation',
        title: 'MAJLIS',
        titleHighlight: 'AUTOMATION',
        subtitle: 'Climate. Lighting. Audio. Respecting Tradition.',
        description: 'Modern comfort for traditional Arabic reception spaces. Invisible technology that enhances hospitality without compromising cultural aesthetics.',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716',
        primaryCTA: {
          text: 'Design Majlis System',
          href: '/consultation'
        }
      }}
      audience={[
        'Private Villas',
        'Palaces & Estates',
        'Corporate Majlis',
        'Government Buildings'
      ]}
      problems={{
        title: 'Majlis Comfort Challenges',
        items: [
          {
            problem: 'Climate Discomfort',
            impact: 'Guests arrive before room is cooled, AC manually controlled by staff'
          },
          {
            problem: 'Lighting Complexity',
            impact: 'Multiple switches, no scene control, difficult to create proper ambiance'
          },
          {
            problem: 'Visible Technology',
            impact: 'Modern devices clash with traditional Arabic décor and aesthetics'
          },
          {
            problem: 'Manual Operations',
            impact: 'Staff managing lights, temperature, music - takes focus away from hospitality'
          }
        ]
      }}
      deliverables={{
        title: 'Complete Majlis Automation',
        items: [
          {
            icon: 'Thermometer',
            title: 'Climate Pre-Cooling',
            desc: 'Automatic temperature control based on calendar events and occupancy'
          },
          {
            icon: 'Sun',
            title: 'Ambient Lighting',
            desc: 'Scene-based control with hidden keypads matching traditional décor'
          },
          {
            icon: 'Volume2',
            title: 'Invisible Audio',
            desc: 'In-ceiling speakers for Arabic instrumental and nature sounds'
          },
          {
            icon: 'Palmtree',
            title: 'Motorized Curtains',
            desc: 'Traditional fabric curtains with silent motors for privacy control'
          },
          {
            icon: 'Users',
            title: 'One-Touch Scenes',
            desc: 'Welcoming Guests, Formal Gathering, Evening Majlis, Business Meeting'
          },
          {
            icon: 'Sparkles',
            title: 'Hidden Control',
            desc: 'Concealed keypads with Arabic calligraphy covers, smartphone backup'
          }
        ]
      }}
      process={{
        title: 'Cultural Integration Process',
        steps: [
          {
            step: '1',
            title: 'Cultural Consultation',
            desc: 'Understanding traditional use, guest protocols, and aesthetic requirements'
          },
          {
            step: '2',
            title: 'Invisible Design',
            desc: 'Planning speaker placement, keypad concealment, and hidden infrastructure'
          },
          {
            step: '3',
            title: 'Coordinated Installation',
            desc: 'Working with traditional craftsmen (carpenters, fabric artisans) for integration'
          },
          {
            step: '4',
            title: 'Scene Programming',
            desc: 'Custom scenes matching traditional majlis activities and protocols'
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '60+', label: 'Majlis Spaces Automated' },
          { number: '0', label: 'Visible Technology' },
          { number: '100%', label: 'Cultural Respect' }
        ]
      }}
      conversion={{
        title: 'Honor Tradition with Modern Comfort',
        subtitle: 'Schedule a consultation to discuss invisible automation for your majlis space.',
        primaryCTA: {
          text: 'Request Consultation',
          href: '/consultation'
        }
      }}
      relatedSolutions={[
        { name: 'Masjid Automation', link: '/solutions/cultural-automation/masjid-automation', description: 'Prayer space automation' },
        { name: 'Lighting Control', link: '/solutions/lighting-automation', description: 'Scene-based lighting' },
        { name: 'Multi-Room Audio', link: '/solutions/multi-room-audio', description: 'Invisible speakers' }
      ]}
      relatedPersonas={[
        { name: 'For Homeowners', link: '/persona/homeowner', description: 'Luxury villas' },
        { name: 'For Commercial', link: '/persona/commercial', description: 'Corporate spaces' }
      ]}
      geoPages={[
        { name: 'Emirates Hills Automation', link: '/dubai/emirates-hills-villa-automation' }
      ]}
    />
  )
}
