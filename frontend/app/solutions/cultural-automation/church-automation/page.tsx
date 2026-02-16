import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function ChurchAutomationPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: 'Cultural Automation',
        title: 'CHURCH',
        titleHighlight: 'AV SYSTEMS',
        subtitle: 'Worship Audio. Video. Live Stream. Recording.',
        description: 'Professional audio-visual systems for churches and Christian worship centers. Deliver clear sermons, powerful worship music, and reach your congregation anywhere.',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3',
        primaryCTA: {
          text: 'Request Church AV System',
          href: '/consultation'
        }
      }}
      audience={[
        'Churches',
        'Chapels',
        'Worship Centers',
        'Christian Schools'
      ]}
      problems={{
        title: 'Church AV Challenges',
        items: [
          {
            problem: 'Unintelligible Sermons',
            impact: 'Congregation in back rows cannot hear pastor clearly'
          },
          {
            problem: 'Worship Band Issues',
            impact: 'Poor sound mixing, instruments overpowering vocals, feedback problems'
          },
          {
            problem: 'No Live Streaming',
            impact: 'Elderly, sick, and traveling members miss services'
          },
          {
            problem: 'Video Display Problems',
            impact: 'Lyrics, scripture, and announcements difficult to read on small screens'
          }
        ]
      }}
      deliverables={{
        title: 'Complete Church AV Solutions',
        items: [
          {
            icon: 'Volume2',
            title: 'Sanctuary Audio',
            desc: 'Professional sound system with even coverage, crystal-clear speech intelligibility'
          },
          {
            icon: 'Music',
            title: 'Worship Band Mixing',
            desc: 'Digital mixing console, in-ear monitors, stage speakers for live music'
          },
          {
            icon: 'Video',
            title: 'Live Streaming & Recording',
            desc: 'Multi-camera production, live streaming to YouTube/Facebook, sermon archive'
          },
          {
            icon: 'Mic',
            title: 'Wireless Microphones',
            desc: 'Multiple wireless systems for pastor, worship team, choir, speakers'
          },
          {
            icon: 'Users',
            title: 'Video Projection',
            desc: 'Large screens for lyrics, scripture, announcements, and live video'
          },
          {
            icon: 'Radio',
            title: 'Hearing Assistance',
            desc: 'Induction loop or FM system for hearing-impaired congregation members'
          }
        ]
      }}
      process={{
        title: 'Implementation Process',
        steps: [
          {
            step: '1',
            title: 'Ministry Consultation',
            desc: 'Understanding worship style, service flow, and technical requirements'
          },
          {
            step: '2',
            title: 'Acoustic Assessment',
            desc: 'Sanctuary acoustics, speaker placement, and sound coverage design'
          },
          {
            step: '3',
            title: 'System Installation',
            desc: 'Audio, video, streaming, and display systems deployment'
          },
          {
            step: '4',
            title: 'Team Training',
            desc: 'Volunteer tech team training on sound mixing, cameras, streaming'
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '35+', label: 'Churches Equipped' },
          { number: '200K+', label: 'Online Viewers/Month' },
          { number: '24/7', label: 'Technical Support' }
        ]
      }}
      conversion={{
        title: 'Amplify Your Ministry Impact',
        subtitle: 'Professional AV systems that help you reach more people with your message.',
        primaryCTA: {
          text: 'Schedule Consultation',
          href: '/consultation'
        }
      }}
      relatedSolutions={[
        { name: 'Temple Automation', link: '/solutions/cultural-automation/temple-automation', description: 'Multi-faith worship AV' },
        { name: 'Auditorium AV', link: '/solutions/auditoriums', description: 'Large venue systems' },
        { name: 'Conference Room AV', link: '/solutions/conference-room-av-systems', description: 'Meeting spaces' }
      ]}
      relatedPersonas={[
        { name: 'For Commercial', link: '/persona/commercial', description: 'Community facilities' },
        { name: 'For Architects', link: '/persona/architect', description: 'Worship design' }
      ]}
      geoPages={[
        { name: 'Dubai Smart Buildings', link: '/dubai/smart-buildings' }
      ]}
    />
  )
}
