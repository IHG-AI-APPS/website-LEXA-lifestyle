'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function MasjidAutomationPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_cultural-automation_masjid-automation"
      cmsKey="page_solutions_cultural-automation_masjid-automation"
      hero={{
        badge: "Cultural Spaces",
        title: "MASJID & MOSQUE",
        titleHighlight: "AUTOMATION",
        subtitle: "Prayer Timings. Audio Systems. Climate Control.",
        description: "Intelligent automation for mosques, prayer rooms, and Islamic centers designed with respect for spiritual spaces.",
        image: "https://images.unsplash.com/photo-1761639935129-4e2ebf652a4c",
        primaryCTA: {
          text: "Request Masjid Consultation",
          href: "/consultation"
        }
      }}
      audience={['Mosques & Masjids', 'Islamic Centers', 'Corporate Prayer Rooms', 'Community Majlis Spaces']}
      problems={{
        title: "Common Masjid System Challenges",
        items: [
          { problem: 'Inaccurate Prayer Times', impact: 'Manual adjustments needed, incorrect Azan timing' },
          { problem: 'Poor Audio Quality', impact: 'Unclear announcements, echo in prayer hall' },
          { problem: 'Manual Climate Control', impact: 'Uncomfortable temperatures during prayers' },
          { problem: 'Lighting Complexity', impact: 'Staff manually adjusting lights for each prayer' },
          { problem: 'Energy Waste', impact: 'Systems running 24/7 even when masjid is empty' },
          { problem: 'No Remote Management', impact: 'Staff must be on-site to control everything' }
        ]
      }}
      deliverables={{
        title: "What LEXA Delivers",
        items: [
          { icon: 'Clock', title: 'Automated Azan System', desc: 'GPS-based prayer time calculations with automatic scheduling' },
          { icon: 'Volume2', title: 'Multi-Zone Audio', desc: 'Separate control for prayer hall, courtyard, and minaret' },
          { icon: 'Lightbulb', title: 'Smart Lighting', desc: 'Scheduled dimming for prayer times, energy-efficient LEDs' },
          { icon: 'Thermometer', title: 'Climate Control', desc: 'Occupancy-based HVAC for comfort during prayers' },
          { icon: 'Radio', title: 'Announcement System', desc: 'Crystal-clear public address for khutbahs and notices' },
          { icon: 'Moon', title: 'Remote Management', desc: 'Cloud-based control from anywhere via smartphone' }
        ]
      }}
      process={{
        title: "Our Installation Process",
        subtitle: "Respectful implementation with minimal disruption",
        steps: [
          { step: '01', title: 'Site Visit', desc: 'Prayer hall assessment, acoustics evaluation, infrastructure review' },
          { step: '02', title: 'Design', desc: 'System layout, equipment selection, respecting sacred space' },
          { step: '03', title: 'Installation', desc: 'Scheduled around prayer times, clean cable routing, testing' },
          { step: '04', title: 'Training', desc: 'Staff training, prayer time configuration, ongoing support' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'System Packages',
        subtitle: 'Complete automation solutions',
        items: [
          {
            name: 'Essential Package',
            subtitle: 'Small Masjids',
            features: ['Automated Azan System', 'Basic Audio (2-zone)', 'LED Lighting Control', 'Single Thermostat', 'Mobile App Control']
          },
          {
            name: 'Complete Package',
            subtitle: 'Medium Mosques',
            features: ['GPS Prayer Time System', 'Multi-Zone Audio (4-zone)', 'Smart Lighting (Full)', 'Climate Control (Multi-zone)', 'Display Screens', 'Cloud Management']
          },
          {
            name: 'Premium Package',
            subtitle: 'Large Islamic Centers',
            features: ['Advanced Azan Automation', 'Professional PA System', 'Integrated Lighting Design', 'Building Management', 'Video Distribution', 'Dedicated Support']
          }
        ]
      }}
      trustSignals={{
        title: "Trusted Across the UAE",
        stats: [
          { number: '50+', label: 'Masjids Automated' },
          { number: '15+', label: 'Years Experience' },
          { number: '99.9%', label: 'System Uptime' },
          { number: '24/7', label: 'Technical Support' }
        ]
      }}
      conversion={{
        title: "Ready to Automate Your Masjid?",
        subtitle: "Get a detailed proposal with system design and prayer time setup within 48 hours",
        primaryCTA: {
          text: "Request Consultation",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "Schedule Site Visit",
          href: "/contact"
        }
      }}
      relatedSolutions={[
        { name: 'Prayer Room Systems', link: '/solutions/cultural-automation/prayer-room-systems', description: 'Corporate prayer facilities' },
        { name: 'Majlis Automation', link: '/solutions/cultural-automation/majlis-automation', description: 'Cultural meeting spaces' },
        { name: 'Yacht Automation', link: '/solutions/cultural-automation/yacht-automation', description: 'Marine automation systems' }
      ]}
    />
  )
}
