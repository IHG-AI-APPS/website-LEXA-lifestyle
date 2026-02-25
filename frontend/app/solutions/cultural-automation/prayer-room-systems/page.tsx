import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function PrayerRoomSystemsPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_cultural-automation_prayer-room-systems"
      hero={{
        badge: 'Cultural Automation',
        title: 'PRAYER ROOM',
        titleHighlight: 'AUTOMATION',
        subtitle: 'Prayer Times. Climate. Lighting. Audio.',
        description: 'Automated prayer room systems for offices, hotels, and residential buildings. Islamic calendar integration with climate and lighting control.',
        image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
        primaryCTA: {
          text: 'Request Prayer Room System',
          href: '/consultation'
        }
      }}
      audience={[
        'Office Buildings',
        'Hotels & Resorts',
        'Shopping Malls',
        'Residential Towers'
      ]}
      problems={{
        title: 'Prayer Room Challenges',
        items: [
          {
            problem: 'Manual Lighting Control',
            impact: 'Staff manually managing lights, inconsistent experience for worshippers'
          },
          {
            problem: 'Climate Discomfort',
            impact: 'Room too hot or too cold, AC running unnecessarily when empty'
          },
          {
            problem: 'No Prayer Time Integration',
            impact: 'No automated system to prepare room before prayer times'
          },
          {
            problem: 'Audio Management',
            impact: 'Manual Adhan playback or no call to prayer in corporate environments'
          }
        ]
      }}
      deliverables={{
        title: 'Complete Prayer Room Systems',
        items: [
          {
            icon: 'Clock',
            title: 'Islamic Calendar Integration',
            desc: 'Automatic prayer time scheduling synchronized with geographic location'
          },
          {
            icon: 'Wind',
            title: 'Pre-Prayer Cooling',
            desc: 'Climate activates 15 minutes before each prayer time, optimal comfort'
          },
          {
            icon: 'Sun',
            title: 'Lighting Automation',
            desc: 'Appropriate lighting for each prayer time, energy-saving between prayers'
          },
          {
            icon: 'Volume2',
            title: 'Adhan Audio System',
            desc: 'Optional pre-recorded Adhan playback for corporate prayer rooms'
          },
          {
            icon: 'BookOpen',
            title: 'Qibla Indicators',
            desc: 'Integrated lighting to mark prayer direction clearly'
          },
          {
            icon: 'Sparkles',
            title: 'Occupancy Detection',
            desc: 'Automatic lighting and climate adjustment based on room usage'
          }
        ]
      }}
      process={{
        title: 'Implementation Process',
        steps: [
          {
            step: '1',
            title: 'Religious Consultation',
            desc: 'Understanding prayer protocols, community needs, and cultural sensitivity'
          },
          {
            step: '2',
            title: 'System Design',
            desc: 'Prayer time integration, climate scheduling, audio system specification'
          },
          {
            step: '3',
            title: 'Installation',
            desc: 'Climate control, lighting automation, and audio system deployment'
          },
          {
            step: '4',
            title: 'Programming & Testing',
            desc: 'Islamic calendar configuration, scene testing, staff training'
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '40+', label: 'Prayer Rooms Automated' },
          { number: '5x', label: 'Daily Prayer Times' },
          { number: '100%', label: 'Religious Appropriateness' }
        ]
      }}
      conversion={{
        title: 'Enhance Your Workplace Prayer Room',
        subtitle: 'Provide your employees and guests with a comfortable, respectful prayer environment.',
        primaryCTA: {
          text: 'Request System Design',
          href: '/consultation'
        }
      }}
      relatedSolutions={[
        { name: 'Masjid Automation', link: '/solutions/cultural-automation/masjid-automation', description: 'Mosque systems' },
        { name: 'BMS Automation', link: '/solutions/bms-automation', description: 'Building management' },
        { name: 'Climate Control', link: '/solutions/climate-control', description: 'HVAC automation' }
      ]}
      relatedPersonas={[
        { name: 'For Commercial', link: '/persona/commercial', description: 'Office buildings' },
        { name: 'For Developers', link: '/persona/developer', description: 'Multi-tenant buildings' }
      ]}
      geoPages={[
        { name: 'Dubai Smart Buildings', link: '/dubai/smart-buildings' }
      ]}
    />
  )
}
