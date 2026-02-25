import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function TempleAutomationPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_cultural-automation_temple-automation"
      hero={{
        badge: 'Cultural Automation',
        title: 'TEMPLE & WORSHIP',
        titleHighlight: 'AV SYSTEMS',
        subtitle: 'Audio. Video. Lighting. Live Streaming.',
        description: 'Professional audio-visual systems for Hindu temples, Sikh Gurdwaras, and other worship spaces. Crystal-clear sound, immersive lighting, and live streaming capabilities.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
        primaryCTA: {
          text: 'Request Worship AV System',
          href: '/consultation'
        }
      }}
      audience={[
        'Hindu Temples',
        'Sikh Gurdwaras',
        'Buddhist Centers',
        'Community Worship Halls'
      ]}
      problems={{
        title: 'Worship Space Challenges',
        items: [
          {
            problem: 'Poor Audio Quality',
            impact: 'Congregation cannot hear prayers, bhajans, or kirtan clearly'
          },
          {
            problem: 'No Live Streaming',
            impact: 'Remote community members unable to participate in ceremonies'
          },
          {
            problem: 'Inadequate Lighting',
            impact: 'Aarti and ceremonies lack proper illumination and ambiance'
          },
          {
            problem: 'Complex Operations',
            impact: 'Volunteers struggling with multiple devices during ceremonies'
          }
        ]
      }}
      deliverables={{
        title: 'Complete Worship AV Solutions',
        items: [
          {
            icon: 'Volume2',
            title: 'Professional Audio',
            desc: 'Crystal-clear sound system for prayers, music, and congregation participation'
          },
          {
            icon: 'Mic',
            title: 'Wireless Microphones',
            desc: 'Multiple wireless mics for priests, singers, and ceremony participants'
          },
          {
            icon: 'Video',
            title: 'Live Streaming',
            desc: 'HD video streaming to YouTube, Facebook for remote congregation'
          },
          {
            icon: 'Sun',
            title: 'Ceremony Lighting',
            desc: 'Programmable lighting scenes for aarti, special occasions, festivals'
          },
          {
            icon: 'Users',
            title: 'Multi-Camera Setup',
            desc: 'Multiple camera angles capturing altar, priest, and congregation'
          },
          {
            icon: 'Sparkles',
            title: 'Simple Control',
            desc: 'One-touch operation for volunteers, pre-programmed for ceremonies'
          }
        ]
      }}
      process={{
        title: 'Implementation Process',
        steps: [
          {
            step: '1',
            title: 'Worship Consultation',
            desc: 'Understanding ceremony needs, acoustic challenges, and community requirements'
          },
          {
            step: '2',
            title: 'Acoustic Design',
            desc: 'Speaker placement, sound coverage, and echo management for worship hall'
          },
          {
            step: '3',
            title: 'AV Installation',
            desc: 'Audio system, video cameras, lighting, and streaming equipment deployment'
          },
          {
            step: '4',
            title: 'Training & Support',
            desc: 'Volunteer training on system operation and ongoing technical support'
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '25+', label: 'Worship Spaces' },
          { number: '100K+', label: 'Remote Viewers' },
          { number: '99.9%', label: 'System Reliability' }
        ]
      }}
      conversion={{
        title: 'Enhance Your Worship Experience',
        subtitle: 'Professional AV systems that serve your congregation and extend your reach globally.',
        primaryCTA: {
          text: 'Schedule Consultation',
          href: '/consultation'
        }
      }}
      relatedSolutions={[
        { name: 'Church Automation', link: '/solutions/cultural-automation/church-automation', description: 'Christian worship AV' },
        { name: 'Auditorium AV', link: '/solutions/auditoriums', description: 'Large venue systems' },
        { name: 'Multi-Room Audio', link: '/solutions/multi-room-audio', description: 'Professional audio' }
      ]}
      relatedPersonas={[
        { name: 'For Commercial', link: '/persona/commercial', description: 'Community spaces' },
        { name: 'For Architects', link: '/persona/architect', description: 'Worship design' }
      ]}
      geoPages={[
        { name: 'Dubai Smart Buildings', link: '/dubai/smart-buildings' }
      ]}
    />
  )
}
