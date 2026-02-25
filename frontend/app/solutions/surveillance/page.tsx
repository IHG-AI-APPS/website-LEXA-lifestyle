'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function SurveillancePage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_surveillance"
      cmsKey="page_solutions_surveillance"
      hero={{
        badge: "Video Security",
        title: "SURVEILLANCE",
        titleHighlight: "SYSTEMS",
        subtitle: "IP Cameras. AI Analytics. 24/7 Recording.",
        description: "Professional video surveillance with AI-powered analytics, facial recognition, and cloud recording for comprehensive security monitoring.",
        image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567",
        primaryCTA: {
          text: "Request Security Assessment",
          href: "/consultation"
        }
      }}
      audience={['Commercial Properties', 'Residential Estates', 'Retail Stores', 'Industrial Facilities']}
      problems={{
        items: [
          { problem: 'Blind Spots', impact: 'Vulnerable areas with no camera coverage' },
          { problem: 'Poor Image Quality', impact: 'Can\'t identify people, license plates' },
          { problem: 'False Alarms', impact: 'Alerts for every movement, alarm fatigue' },
          { problem: 'Storage Limitations', impact: 'Only 7-14 days retention, footage lost' },
          { problem: 'No Remote Access', impact: 'Can\'t check cameras when away' },
          { problem: 'Difficult Search', impact: 'Hours to find specific events in footage' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Camera', title: 'IP Cameras', desc: '4K resolution, night vision, weatherproof' },
          { icon: 'Eye', title: 'AI Analytics', desc: 'Person/vehicle detection, line crossing, loitering' },
          { icon: 'Shield', title: 'Facial Recognition', desc: 'Known person alerts, blacklist notifications' },
          { icon: 'AlertTriangle', title: 'Smart Alerts', desc: 'Instant notifications with video clips' },
          { icon: 'Cloud', title: 'Cloud Recording', desc: '30-90 day retention, redundant storage' },
          { icon: 'Smartphone', title: 'Mobile Access', desc: 'Live view, playback, PTZ control from phone' }
        ]
      }}
      process={{
        title: "Our Surveillance Implementation",
        subtitle: "Strategic security deployment",
        steps: [
          { step: '01', title: 'Security Assessment', desc: 'Site survey, risk analysis, coverage requirements, lighting evaluation' },
          { step: '02', title: 'System Design', desc: 'Camera selection, placement planning, NVR sizing, network design' },
          { step: '03', title: 'Installation', desc: 'Camera mounting, cabling, NVR setup, network integration' },
          { step: '04', title: 'Configuration', desc: 'Zone setup, analytics tuning, mobile app, user training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Surveillance Packages',
        items: [
          { name: 'Basic Surveillance', subtitle: '4-8 cameras', features: ['4MP IP Cameras', 'Night Vision', 'Mobile App', 'NVR (7-14 day storage)', 'Motion Detection'] },
          { name: 'Professional Surveillance', subtitle: '8-16 cameras', features: ['4K IP Cameras', 'AI Person/Vehicle Detection', 'License Plate Recognition', 'NVR + Cloud (30 days)', 'Smart Alerts'] },
          { name: 'Enterprise Surveillance', subtitle: '16+ cameras', features: ['4K PTZ & Fixed Cameras', 'Facial Recognition', 'Advanced Analytics', 'Redundant Storage (90 days)', '24/7 Monitoring Option'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '600+', label: 'Installations' },
          { number: '5,000+', label: 'Cameras Deployed' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Monitoring' }
        ]
      }}
      conversion={{
        title: "Secure Your Property with Surveillance",
        subtitle: "Get a professional security assessment and camera layout",
        primaryCTA: {
          text: "Request Security Assessment",
          href: "/consultation"
        }
      }}
    />
  )
}
