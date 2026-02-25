'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function NetworkingPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_networking"
      hero={{
        badge: "Infrastructure Solutions",
        title: "NETWORK",
        titleHighlight: "INFRASTRUCTURE",
        subtitle: "Enterprise WiFi. Structured Cabling. Network Security.",
        description: "Professional network design and implementation with enterprise-grade WiFi, structured cabling, and secure connectivity for homes and businesses.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
        primaryCTA: {
          text: "Request Network Assessment",
          href: "/consultation"
        }
      }}
      audience={['Smart Homes', 'Corporate Offices', 'Hotels & Resorts', 'Educational Institutions']}
      problems={{
        items: [
          { problem: 'WiFi Dead Zones', impact: 'No coverage in bedrooms, outdoor areas' },
          { problem: 'Slow Speeds', impact: 'Buffering, dropped calls, poor streaming' },
          { problem: 'Too Many Devices', impact: 'Network crashes with guests, IoT devices' },
          { problem: 'No Security', impact: 'Vulnerable to intrusions, no guest isolation' },
          { problem: 'Unreliable Connection', impact: 'Constant disconnections, rebooting router' },
          { problem: 'No Scalability', impact: 'Can\'t add more access points or devices' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Wifi', title: 'Enterprise WiFi', desc: 'Seamless roaming, high-density support, guest networks' },
          { icon: 'Network', title: 'Structured Cabling', desc: 'Cat6A/Cat7 backbone, fiber optics, patch panels' },
          { icon: 'Shield', title: 'Network Security', desc: 'Firewalls, VLANs, intrusion detection' },
          { icon: 'Zap', title: 'High-Speed Internet', desc: 'Multi-WAN, failover, load balancing' },
          { icon: 'Server', title: 'Network Equipment', desc: 'Enterprise switches, routers, PoE injectors' },
          { icon: 'Cloud', title: 'Remote Management', desc: 'Cloud-based monitoring, analytics, alerts' }
        ]
      }}
      process={{
        title: "Our Network Implementation",
        subtitle: "Professional infrastructure deployment",
        steps: [
          { step: '01', title: 'Site Survey', desc: 'RF survey, bandwidth analysis, device count, coverage planning' },
          { step: '02', title: 'Design', desc: 'Network topology, VLAN design, access point placement, cabling plan' },
          { step: '03', title: 'Installation', desc: 'Structured cabling, equipment mounting, patch panel termination' },
          { step: '04', title: 'Configuration', desc: 'Network setup, security policies, testing, documentation' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Network Solutions',
        items: [
          { name: 'Residential Network', subtitle: 'Up to 5,000 sq ft', features: ['3-5 WiFi Access Points', 'Managed Switch', 'Firewall', 'Guest Network', 'Mobile App'] },
          { name: 'Large Home Network', subtitle: 'Up to 15,000 sq ft', features: ['8-12 Access Points', 'Core & Access Switches', 'Enterprise Firewall', 'VLANs', 'Outdoor Coverage'] },
          { name: 'Commercial Network', subtitle: '15,000+ sq ft', features: ['High-Density WiFi', 'Redundant Core', 'Advanced Security', 'Network Management', 'SLA Support'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '400+', label: 'Networks Deployed' },
          { number: '99.9%', label: 'Uptime' },
          { number: 'Ubiquiti', label: 'Elite Partner' },
          { number: '24/7', label: 'Monitoring' }
        ]
      }}
      conversion={{
        title: "Ready for Enterprise WiFi?",
        subtitle: "Get a professional network assessment and proposal",
        primaryCTA: {
          text: "Request Network Assessment",
          href: "/consultation"
        }
      }}
    />
  )
}
