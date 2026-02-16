'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function WorkplaceAnalyticsPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: "Smart Workplace",
        title: "WORKPLACE",
        titleHighlight: "ANALYTICS",
        subtitle: "Occupancy Tracking. Space Utilization. Energy Insights.",
        description: "Data-driven workplace optimization with occupancy sensors, desk booking, and analytics for hybrid work environments.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        primaryCTA: {
          text: "Request Workplace Assessment",
          href: "/consultation"
        }
      }}
      audience={['Corporate Offices', 'Co-Working Spaces', 'Educational Campuses', 'Government Facilities']}
      problems={{
        items: [
          { problem: 'Underutilized Space', impact: 'Paying for office space that sits empty' },
          { problem: 'No Occupancy Data', impact: 'Can\'t make informed real estate decisions' },
          { problem: 'Energy Waste', impact: 'HVAC and lighting running in empty rooms' },
          { problem: 'Poor Desk Allocation', impact: 'Hot-desking chaos, no visibility' },
          { problem: 'Meeting Room Squatting', impact: 'Rooms booked but unused' },
          { problem: 'No Hybrid Insights', impact: 'Don\'t know when people are in office' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Users', title: 'Occupancy Sensors', desc: 'Real-time people counting, desk occupancy' },
          { icon: 'Eye', title: 'Space Utilization', desc: 'Meeting room usage, desk booking analytics' },
          { icon: 'Thermometer', title: 'Environmental Monitoring', desc: 'Temperature, humidity, air quality, CO2' },
          { icon: 'Zap', title: 'Energy Optimization', desc: 'Automated HVAC/lighting based on occupancy' },
          { icon: 'BarChart3', title: 'Analytics Dashboard', desc: 'Real-time and historical insights' },
          { icon: 'Clock', title: 'Desk Booking', desc: 'Hot-desk reservation, wayfinding integration' }
        ]
      }}
      process={{
        title: "Our Analytics Implementation",
        subtitle: "Data-driven workplace transformation",
        steps: [
          { step: '01', title: 'Assessment', desc: 'Space audit, user survey, existing systems review, KPI definition' },
          { step: '02', title: 'System Design', desc: 'Sensor placement, network design, analytics platform selection' },
          { step: '03', title: 'Deployment', desc: 'Sensor installation, network integration, desk booking setup' },
          { step: '04', title: 'Optimization', desc: 'Dashboard customization, user training, policy refinement' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Analytics Solutions',
        items: [
          { name: 'Basic Analytics', subtitle: '1,000-5,000 sq ft', features: ['Occupancy Sensors', 'Meeting Room Tracking', 'Basic Dashboard', 'Mobile App'] },
          { name: 'Complete Analytics', subtitle: '5,000-20,000 sq ft', features: ['Full Sensor Coverage', 'Desk Booking System', 'Environmental Monitoring', 'HVAC Integration', 'Advanced Analytics'] },
          { name: 'Enterprise Analytics', subtitle: '20,000+ sq ft', features: ['Multi-Site Support', 'Predictive Analytics', 'BMS Integration', 'Custom Reporting', 'API Access'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '50+', label: 'Workplaces Optimized' },
          { number: '200K+', label: 'Sq Ft Monitored' },
          { number: '30%', label: 'Avg Energy Savings' },
          { number: '24/7', label: 'Monitoring' }
        ]
      }}
      conversion={{
        title: "Optimize Your Workplace?",
        subtitle: "Get a workplace analytics assessment and ROI analysis",
        primaryCTA: {
          text: "Request Workplace Assessment",
          href: "/consultation"
        }
      }}
    />
  )
}
