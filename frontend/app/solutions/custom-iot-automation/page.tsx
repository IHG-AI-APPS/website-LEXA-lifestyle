'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import { internalLinking } from '@/lib/internal-linking-data'

export default function CustomIoTAutomationPage() {
  const links = internalLinking['custom-iot-automation']
  
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_custom-iot-automation"
      cmsKey="page_solutions_custom-iot-automation"
      hero={{
        badge: "Custom Solutions",
        title: "CUSTOM IoT",
        titleHighlight: "AUTOMATION",
        subtitle: "Bespoke Systems. API Integration. Unique Requirements.",
        description: "Custom IoT automation solutions for unique business needs with API integration, bespoke hardware, and tailored software platforms.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        primaryCTA: {
          text: "Discuss Custom Project",
          href: "/consultation"
        }
      }}
      audience={['Unique Business Needs', 'Industrial Facilities', 'R&D Centers', 'Innovation Labs']}
      problems={{
        items: [
          { problem: 'Off-Shelf Won\'t Work', impact: 'Standard solutions don\'t fit unique requirements' },
          { problem: 'Legacy System Integration', impact: 'Need to connect old equipment with new technology' },
          { problem: 'Custom Workflows', impact: 'Business processes don\'t match standard automation' },
          { problem: 'Proprietary Protocols', impact: 'Equipment speaks different languages, won\'t integrate' },
          { problem: 'Scalability Issues', impact: 'Need solution that grows with business' },
          { problem: 'No Vendor Support', impact: 'Unique application, no standard product exists' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Cpu', title: 'Custom Hardware', desc: 'Bespoke sensors, controllers, IoT gateways' },
          { icon: 'Code', title: 'Software Development', desc: 'Custom dashboards, mobile apps, web portals' },
          { icon: 'Wifi', title: 'API Integration', desc: 'Connect disparate systems, data exchange, webhooks' },
          { icon: 'Cloud', title: 'Cloud Platforms', desc: 'AWS/Azure deployment, scalable infrastructure' },
          { icon: 'Smartphone', title: 'Mobile Control', desc: 'Native iOS/Android apps or PWAs' },
          { icon: 'Zap', title: 'Automation Logic', desc: 'Complex rules, AI/ML integration, predictive automation' }
        ]
      }}
      process={{
        title: "Our Custom Development Process",
        subtitle: "From concept to deployment",
        steps: [
          { step: '01', title: 'Discovery', desc: 'Requirements gathering, feasibility study, proof-of-concept' },
          { step: '02', title: 'Design', desc: 'System architecture, UI/UX design, technology stack selection' },
          { step: '03', title: 'Development', desc: 'Agile sprints, testing, stakeholder reviews, iteration' },
          { step: '04', title: 'Deployment', desc: 'Pilot installation, training, scaling, ongoing support' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Custom IoT Project Examples',
        items: [
          { name: 'Industrial Monitoring', features: ['Equipment Sensors', 'Predictive Maintenance', 'Real-Time Alerts', 'Custom Dashboard'] },
          { name: 'Smart Retail', features: ['Inventory Tracking', 'Customer Analytics', 'Dynamic Pricing', 'POS Integration'] },
          { name: 'Facility Management', features: ['Asset Tracking', 'Maintenance Scheduling', 'Energy Optimization', 'Mobile Workforce'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '40+', label: 'Custom Projects' },
          { number: 'Full Stack', label: 'Development' },
          { number: '15+', label: 'Years Experience' },
          { number: 'Agile', label: 'Methodology' }
        ]
      }}
      conversion={{
        title: "Have a Unique Automation Need?",
        subtitle: "Let's discuss your custom IoT automation project",
        primaryCTA: {
          text: "Schedule Discovery Call",
          href: "/consultation"
        }
      }}
      relatedPersonas={links.relatedPersonas}
      relatedSolutions={links.relatedSolutions}
      geoPages={links.geoPages}
    />
  )
}
