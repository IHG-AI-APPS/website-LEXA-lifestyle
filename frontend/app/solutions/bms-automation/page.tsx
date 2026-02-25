'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function BMSAutomationPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_bms-automation"
      hero={{
        badge: 'Smart Buildings',
        title: 'BUILDING MANAGEMENT',
        titleHighlight: 'SYSTEMS (BMS)',
        subtitle: 'HVAC Control. Energy Management. Access Integration.',
        description: 'Centralized control and automation for commercial buildings, towers, and facilities across the UAE.',
        image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
        primaryCTA: {
          text: 'Request BMS Proposal',
          href: '/consultation'
        }
      }}
      audience={[
        'Commercial Towers',
        'Industrial Facilities',
        'Hotels & Resorts',
        'Healthcare Facilities'
      ]}
      problems={{
        title: 'Common Building Management Challenges',
        items: [
          {
            problem: 'High Operational Costs',
            impact: 'Inefficient HVAC and lighting systems waste 30-40% of energy budget'
          },
          {
            problem: 'Manual Monitoring',
            impact: 'Staff spending hours checking systems across multiple floors daily'
          },
          {
            problem: 'No Predictive Maintenance',
            impact: 'Equipment failures cause downtime and expensive emergency repairs'
          },
          {
            problem: 'Disconnected Systems',
            impact: 'HVAC, lighting, access, and security operating independently'
          }
        ]
      }}
      deliverables={{
        title: 'Complete BMS Solutions',
        items: [
          {
            icon: 'Thermometer',
            title: 'HVAC Control',
            desc: 'Zone-based climate control with occupancy detection and scheduling'
          },
          {
            icon: 'Zap',
            title: 'Energy Management',
            desc: 'Real-time monitoring, load balancing, and consumption analytics'
          },
          {
            icon: 'Shield',
            title: 'Access Integration',
            desc: 'Unified access control across parking, elevators, and entry points'
          },
          {
            icon: 'BarChart3',
            title: 'Analytics Dashboard',
            desc: 'Centralized monitoring, reporting, and system diagnostics'
          },
          {
            icon: 'Smartphone',
            title: 'Remote Management',
            desc: 'Control and monitor building systems from anywhere via mobile app'
          },
          {
            icon: 'AlertTriangle',
            title: 'Predictive Maintenance',
            desc: 'AI-powered alerts for equipment issues before failures occur'
          }
        ]
      }}
      process={{
        title: 'Implementation Process',
        steps: [
          {
            step: '1',
            title: 'Site Assessment',
            desc: 'Comprehensive audit of existing building systems, infrastructure, and operational requirements'
          },
          {
            step: '2',
            title: 'System Design',
            desc: 'Custom BMS architecture integrating HVAC, lighting, access, and energy management'
          },
          {
            step: '3',
            title: 'Installation & Integration',
            desc: 'Professional deployment with minimal disruption to building operations'
          },
          {
            step: '4',
            title: 'Training & Support',
            desc: 'Facility staff training and ongoing 24/7 technical support'
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '25-40%', label: 'Energy Cost Reduction' },
          { number: '50+', label: 'Buildings Automated' },
          { number: '24/7', label: 'Technical Support' }
        ]
      }}
      conversion={{
        title: 'Ready to Optimize Your Building?',
        subtitle: 'Schedule a consultation with our BMS experts to discuss your facility requirements.',
        primaryCTA: {
          text: 'Request Proposal',
          href: '/consultation'
        }
      }}
      relatedSolutions={[
        { name: 'Energy Management', link: '/solutions/energy-management', description: 'Monitor & optimize consumption' },
        { name: 'Access Control', link: '/solutions/access-control', description: 'Unified access systems' },
        { name: 'Smart Parking', link: '/solutions/smart-parking', description: 'Automated parking management' }
      ]}
      relatedPersonas={[
        { name: 'For Developers', link: '/persona/developer', description: 'Multi-unit projects' },
        { name: 'For Commercial', link: '/persona/commercial', description: 'Enterprise clients' }
      ]}
      geoPages={[
        { name: 'Dubai Smart Buildings', link: '/dubai/smart-buildings' }
      ]}
    />
  )
}
