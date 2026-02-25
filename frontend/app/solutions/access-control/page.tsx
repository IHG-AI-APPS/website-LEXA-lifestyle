'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function AccessControlPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_access-control"
      cmsKey="page_solutions_access-control"
      hero={{
        badge: "Entry Security",
        title: "ACCESS CONTROL",
        titleHighlight: "SYSTEMS",
        subtitle: "Biometric Readers. Card Access. Mobile Credentials.",
        description: "Professional access control with biometric authentication, card readers, and mobile credentials for secure entry management.",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
        primaryCTA: {
          text: "Request Access Control Quote",
          href: "/consultation"
        }
      }}
      audience={['Commercial Buildings', 'Gated Communities', 'Corporate Offices', 'Industrial Sites']}
      problems={{
        items: [
          { problem: 'Lost Keys', impact: 'Rekeying costs, security breach risk' },
          { problem: 'No Audit Trail', impact: 'Don\'t know who entered, when, or where' },
          { problem: 'Shared Credentials', impact: 'Keys/codes passed around, no accountability' },
          { problem: 'Manual Management', impact: 'Adding/removing users is time-consuming' },
          { problem: 'No Time Control', impact: 'Can\'t restrict access to business hours' },
          { problem: 'Multiple Systems', impact: 'Different keys for different doors' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Fingerprint', title: 'Biometric Readers', desc: 'Fingerprint, facial recognition, iris scanning' },
          { icon: 'CreditCard', title: 'Card Access', desc: 'Proximity cards, smart cards, fobs' },
          { icon: 'Smartphone', title: 'Mobile Credentials', desc: 'Smartphone access, Bluetooth, NFC' },
          { icon: 'Lock', title: 'Electronic Locks', desc: 'Maglocks, electric strikes, motorized bolts' },
          { icon: 'Clock', title: 'Time Schedules', desc: 'Access groups, time zones, holidays' },
          { icon: 'Shield', title: 'Integrated Security', desc: 'Works with cameras, alarms, intercom' }
        ]
      }}
      process={{
        title: "Our Access Control Implementation",
        subtitle: "Secure entry deployment",
        steps: [
          { step: '01', title: 'Security Assessment', desc: 'Entry points audit, user groups, access policies, integration needs' },
          { step: '02', title: 'System Design', desc: 'Controller placement, reader selection, network topology, power planning' },
          { step: '03', title: 'Installation', desc: 'Controller mounting, reader installation, lock replacement, wiring' },
          { step: '04', title: 'Programming', desc: 'User enrollment, access groups, time schedules, admin training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Access Control Solutions',
        items: [
          { name: 'Small Business', subtitle: '1-4 doors', features: ['Card Readers', 'Proximity Cards', 'Time Schedules', 'Audit Logs', 'Cloud Management'] },
          { name: 'Medium Business', subtitle: '5-20 doors', features: ['Card + Biometric', 'Mobile Credentials', 'Advanced Scheduling', 'Video Integration', 'Multi-Site Support'] },
          { name: 'Enterprise', subtitle: '20+ doors', features: ['Multi-Factor Authentication', 'Visitor Management', 'Elevator Control', 'HR System Integration', 'Dedicated Support'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '300+', label: 'Systems Deployed' },
          { number: '2,000+', label: 'Doors Secured' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready for Access Control?",
        subtitle: "Get a professional access control assessment and quote",
        primaryCTA: {
          text: "Request Access Control Quote",
          href: "/consultation"
        }
      }}
    />
  )
}
