'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function AuditoriumsPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_auditoriums"
      hero={{
        badge: "Large Venues",
        title: "AUDITORIUM",
        titleHighlight: "AV SYSTEMS",
        subtitle: "Professional Sound. Large Format Displays. Event Production.",
        description: "Complete AV solutions for auditoriums, theaters, and event spaces with professional sound reinforcement and video systems.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
        primaryCTA: {
          text: "Request Auditorium Solution",
          href: "/consultation"
        }
      }}
      audience={['Educational Institutions', 'Corporate Headquarters', 'Event Venues', 'Government Facilities']}
      problems={{
        items: [
          { problem: 'Poor Acoustics', impact: 'Speech unintelligible at back rows, echo problems' },
          { problem: 'Inadequate Coverage', impact: 'Dead zones, hot spots, uneven sound distribution' },
          { problem: 'Complex Operation', impact: 'Requires AV technician for every event' },
          { problem: 'Limited Visibility', impact: 'Screens too small, poor viewing angles' },
          { problem: 'No Recording', impact: 'Can\'t capture or stream events' },
          { problem: 'Presentation Issues', impact: 'HDMI switching, laptop compatibility problems' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Monitor', title: 'LED Video Walls', desc: 'Large format displays, ultra-high brightness' },
          { icon: 'Video', title: 'Professional Cameras', desc: 'PTZ cameras for recording and streaming' },
          { icon: 'Users', title: 'Sound Reinforcement', desc: 'Line array speakers, even coverage throughout' },
          { icon: 'Mic', title: 'Microphone Systems', desc: 'Wireless handheld, lapel, podium microphones' },
          { icon: 'Presentation', title: 'Presentation Switching', desc: 'Seamless source routing, preview/program' },
          { icon: 'Wifi', title: 'Streaming & Recording', desc: 'Live streaming, lecture capture, archiving' }
        ]
      }}
      process={{
        title: "Our Auditorium Implementation",
        subtitle: "Professional installation and commissioning",
        steps: [
          { step: '01', title: 'Acoustic Analysis', desc: 'Room modeling, speech intelligibility study, coverage planning' },
          { step: '02', title: 'System Design', desc: 'Speaker placement, video sizing, equipment selection, rigging plan' },
          { step: '03', title: 'Installation', desc: 'Professional mounting, cabling, rack building, system integration' },
          { step: '04', title: 'Commissioning', desc: 'Audio tuning, video calibration, operator training, documentation' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Auditorium Capacity',
        items: [
          { name: 'Small Auditorium', subtitle: '100-200 seats', features: ['Professional PA System', 'Projection or LED Wall', 'Wireless Microphones', 'Recording Capable'] },
          { name: 'Medium Auditorium', subtitle: '200-500 seats', features: ['Line Array Sound System', 'Large LED Display', 'Advanced DSP', 'PTZ Camera System', 'Live Streaming'] },
          { name: 'Large Auditorium', subtitle: '500-1000+ seats', features: ['Tour-Grade Sound', 'Modular LED Walls', 'Broadcast Cameras', 'Lighting Control', 'Full Production Suite'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '50+', label: 'Auditoriums Equipped' },
          { number: '15+', label: 'Years Experience' },
          { number: 'AVIXA', label: 'Certified Team' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Upgrade Your Auditorium?",
        subtitle: "Get a detailed auditorium AV proposal with acoustic analysis",
        primaryCTA: {
          text: "Request Auditorium Solution",
          href: "/consultation"
        }
      }}
    />
  )
}
