'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function SecurityPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_security"
      cmsKey="page_solutions_security"
      hero={{
        badge: "Protection Solutions",
        title: "SMART SECURITY",
        titleHighlight: "& ACCESS CONTROL",
        subtitle: "AI Surveillance. Biometric Access. 24/7 Monitoring.",
        description: "Comprehensive security solutions with IP cameras, facial recognition, and integrated access control for homes and businesses.",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9",
        primaryCTA: {
          text: "Design Security System",
          href: "/consultation"
        }
      }}
      audience={['Villa Owners', 'Commercial Buildings', 'Retail Stores', 'Industrial Facilities']}
      problems={{
        items: [
          { problem: 'Blind Spots', impact: 'Limited camera coverage, vulnerable entry points' },
          { problem: 'False Alarms', impact: 'Constant notifications for pets, shadows, movement' },
          { problem: 'No Remote Access', impact: 'Can\'t check property when away' },
          { problem: 'Lost Keys', impact: 'Physical keys, no audit trail, rekeying costs' },
          { problem: 'Storage Issues', impact: 'DVR fails, footage lost, limited retention' },
          { problem: 'Reactive Security', impact: 'Only discover issues after they happen' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Camera', title: 'AI-Powered Cameras', desc: '4K IP cameras with person/vehicle detection' },
          { icon: 'Shield', title: 'Perimeter Protection', desc: 'Motion sensors, glass break, door/window contacts' },
          { icon: 'Lock', title: 'Access Control', desc: 'Biometric readers, card access, mobile credentials' },
          { icon: 'AlertTriangle', title: 'Smart Alerts', desc: 'Instant notifications with video clips' },
          { icon: 'Eye', title: 'Cloud Recording', desc: '30-90 day video retention with redundancy' },
          { icon: 'Smartphone', title: 'Mobile Monitoring', desc: 'Live view and playback from anywhere' }
        ]
      }}
      process={{
        title: "Our Security Implementation",
        subtitle: "Professional installation in 1-2 weeks",
        steps: [
          { step: '01', title: 'Risk Assessment', desc: 'Property survey, vulnerability analysis, coverage planning' },
          { step: '02', title: 'System Design', desc: 'Camera placement, sensor layout, access points, NVR sizing' },
          { step: '03', title: 'Installation', desc: 'Equipment mounting, cabling, network setup, testing' },
          { step: '04', title: 'Configuration', desc: 'Zone programming, user setup, mobile app, training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Security Packages',
        subtitle: 'Scalable solutions for any property',
        items: [
          { name: 'Essential Security', subtitle: 'Small properties', features: ['4 IP Cameras (4MP)', 'Door/Window Sensors', 'Mobile App', 'Cloud Storage (7 days)'] },
          { name: 'Complete Security', subtitle: 'Medium properties', features: ['8 IP Cameras (4K)', 'Full Sensor Coverage', 'Access Control (2 doors)', 'NVR + Cloud (30 days)', 'Smart Alerts'] },
          { name: 'Premium Security', subtitle: 'Large estates', features: ['16+ IP Cameras (4K)', 'Perimeter Detection', 'Biometric Access', 'Redundant Storage (90 days)', '24/7 Monitoring Option'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '500+', label: 'Properties Secured' },
          { number: '10,000+', label: 'Cameras Installed' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Monitoring' }
        ]
      }}
      conversion={{
        title: "Secure Your Property Today",
        subtitle: "Get a comprehensive security assessment and proposal within 48 hours",
        primaryCTA: {
          text: "Request Security Assessment",
          href: "/consultation"
        }
      }}
    />
  )
}
