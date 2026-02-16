'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function ConferenceRoomsPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: "Enterprise Solutions",
        title: "CONFERENCE ROOM",
        titleHighlight: "AV SYSTEMS",
        subtitle: "Boardroom Displays. Video Conferencing. Wireless Presentation.",
        description: "Professional meeting room technology designed for seamless hybrid collaboration and executive presentations.",
        image: "https://images.pexels.com/photos/6949382/pexels-photo-6949382.jpeg",
        primaryCTA: {
          text: "Request Enterprise Quote",
          href: "/consultation"
        }
      }}
      audience={['Corporate Offices', 'Government Entities', 'Financial Institutions', 'Law Firms & Consultancies']}
      problems={{
        title: "Common Meeting Room Problems",
        items: [
          { problem: 'Poor Audio Quality', impact: 'Echo, feedback, participants can\'t hear clearly' },
          { problem: 'Complex Systems', impact: 'Meetings delayed while staff troubleshoot tech' },
          { problem: 'No Hybrid Support', impact: 'Remote participants feel disconnected' },
          { problem: 'Incompatible Platforms', impact: 'Can\'t connect Zoom, Teams, WebEx reliably' },
          { problem: 'Display Issues', impact: 'Low resolution, poor viewing angles, glare' },
          { problem: 'Cable Chaos', impact: 'Messy wiring, HDMI dongles, connectivity hassles' }
        ]
      }}
      deliverables={{
        title: "What LEXA Delivers",
        items: [
          { icon: 'Monitor', title: 'Large Format Displays', desc: '75-98 inch 4K interactive touchscreens' },
          { icon: 'Video', title: 'Video Conferencing', desc: 'Zoom Rooms, Microsoft Teams, Cisco WebEx certified' },
          { icon: 'Mic', title: 'Audio DSP', desc: 'Beamforming microphones with echo cancellation' },
          { icon: 'Wifi', title: 'Wireless Presentation', desc: 'AirPlay, Miracast, Barco ClickShare' },
          { icon: 'Users', title: 'Room Booking', desc: 'Meeting room scheduling integration' },
          { icon: 'Clock', title: 'Support & Training', desc: '24/7 helpdesk and user onboarding' }
        ]
      }}
      process={{
        title: "Our Deployment Process",
        subtitle: "Minimal disruption to your operations",
        steps: [
          { step: '01', title: 'Assessment', desc: 'Site survey, room analysis, usage requirements, IT infrastructure review' },
          { step: '02', title: 'Design', desc: 'System architecture, equipment selection, integration planning' },
          { step: '03', title: 'Installation', desc: 'After-hours setup, structured cabling, equipment mounting, testing' },
          { step: '04', title: 'Training', desc: 'User training, admin handover, documentation, ongoing support' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Solutions by Room Size',
        subtitle: 'Scalable systems for every meeting space',
        items: [
          {
            name: 'Huddle Rooms',
            subtitle: '4-6 people',
            features: ['55" 4K Display', 'USB Soundbar', 'Wireless Casting', 'Single Cable Connect']
          },
          {
            name: 'Meeting Rooms',
            subtitle: '8-12 people',
            features: ['75" Interactive Display', 'PTZ Camera', 'Ceiling Mic Array', 'Zoom Rooms Controller', 'ClickShare']
          },
          {
            name: 'Boardrooms',
            subtitle: '14-20 people',
            features: ['98" LED Wall or Dual Displays', 'Tracking Camera System', 'DSP Audio Processing', 'Crestron Control', 'Recording Integration']
          }
        ]
      }}
      trustSignals={{
        title: "Trusted by UAE Enterprises",
        stats: [
          { number: '500+', label: 'Meeting Rooms' },
          { number: '15+', label: 'Years in UAE' },
          { number: 'Certified', label: 'Zoom & Teams' },
          { number: '24/7', label: 'Support Desk' }
        ]
      }}
      conversion={{
        title: "Upgrade Your Meeting Rooms?",
        subtitle: "Get a detailed proposal with system design and pricing within 48 hours",
        primaryCTA: {
          text: "Request Enterprise Quote",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "Schedule Demo",
          href: "/contact"
        }
      }}
      relatedSolutions={[
        { name: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', description: 'Residential automation' },
        { name: 'BMS Automation', link: '/solutions/bms-automation', description: 'Building management systems' },
        { name: 'Workplace Analytics', link: '/solutions/workplace-analytics', description: 'AI-powered insights' }
      ]}
    />
  )
}
