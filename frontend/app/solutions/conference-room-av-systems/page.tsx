'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import { internalLinking } from '@/lib/internal-linking-data'

export default function ConferenceRoomAVSystemsPage() {
  const links = internalLinking['conference-room-av-systems']
  
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_conference-room-av-systems"
      hero={{
        badge: "Enterprise AV Solutions",
        title: "CONFERENCE ROOM",
        titleHighlight: "AV SYSTEMS",
        subtitle: "Video Conferencing. Wireless Presentation. Integrated Control.",
        description: "Complete audiovisual solutions for conference rooms and boardrooms with Zoom Rooms, Teams Rooms, wireless presentation, and unified control.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        primaryCTA: {
          text: "Design Conference AV",
          href: "/consultation"
        }
      }}
      audience={['Corporate Offices', 'Boardrooms', 'Training Rooms', 'Executive Suites']}
      problems={{
        items: [
          { problem: 'Complicated Setup', impact: 'Meetings delayed while troubleshooting technology' },
          { problem: 'Poor Video Quality', impact: 'Remote participants can\'t see presentations clearly' },
          { problem: 'Audio Issues', impact: 'Echo, feedback, can\'t hear remote attendees' },
          { problem: 'Cable Chaos', impact: 'HDMI dongles, adapter searching, connectivity issues' },
          { problem: 'Platform Incompatibility', impact: 'Zoom works but Teams doesn\'t, or vice versa' },
          { problem: 'No IT Integration', impact: 'Can\'t monitor room status, no booking system' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Monitor', title: 'Large Format Displays', desc: '65-98 inch 4K displays or interactive touchscreens' },
          { icon: 'Video', title: 'Video Conferencing', desc: 'Zoom Rooms, Microsoft Teams Rooms, Cisco Webex certified' },
          { icon: 'Users', title: 'Camera Systems', desc: 'PTZ cameras, auto-tracking, speaker framing' },
          { icon: 'Presentation', title: 'Audio DSP', desc: 'Beamforming microphones, echo cancellation, noise reduction' },
          { icon: 'Wifi', title: 'Wireless Presentation', desc: 'AirPlay, Miracast, Barco ClickShare, one-click sharing' },
          { icon: 'Zap', title: 'Unified Control', desc: 'Touch panels, room scheduling, IT monitoring' }
        ]
      }}
      process={{
        title: "Our Conference Room Deployment",
        subtitle: "Minimal disruption, maximum impact",
        steps: [
          { step: '01', title: 'Requirements', desc: 'Room size, usage patterns, platform preferences, IT infrastructure' },
          { step: '02', title: 'System Design', desc: 'Equipment selection, layout planning, network integration' },
          { step: '03', title: 'Installation', desc: 'After-hours setup, equipment mounting, cabling, testing' },
          { step: '04', title: 'Training', desc: 'User training, admin handover, IT documentation, ongoing support' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Conference Room Packages',
        items: [
          { name: 'Huddle Room', subtitle: '4-6 people', features: ['55" Display', 'USB Soundbar', 'Wireless Casting', 'BYOD Support'] },
          { name: 'Meeting Room', subtitle: '8-12 people', features: ['75" Interactive Display', 'PTZ Camera', 'Ceiling Mic Array', 'Zoom/Teams Room', 'ClickShare'] },
          { name: 'Boardroom', subtitle: '14-20 people', features: ['98" Display or Dual', 'Tracking Camera', 'DSP Audio', 'Crestron Control', 'Room Scheduling'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '500+', label: 'Rooms Deployed' },
          { number: 'Certified', label: 'Zoom & Teams' },
          { number: '15+', label: 'Years Experience' },
          { number: '24/7', label: 'Support Desk' }
        ]
      }}
      conversion={{
        title: "Upgrade Your Conference Rooms?",
        subtitle: "Get a detailed AV proposal with system design and ROI analysis",
        primaryCTA: {
          text: "Request Conference AV Quote",
          href: "/consultation"
        }
      }}
      relatedPersonas={links.relatedPersonas}
      relatedSolutions={links.relatedSolutions}
      geoPages={links.geoPages}
    />
  )
}
