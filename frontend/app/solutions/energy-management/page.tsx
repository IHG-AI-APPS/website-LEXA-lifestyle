'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function EnergyManagementPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_energy-management"
      cmsKey="page_solutions_energy-management"
      hero={{
        badge: "Sustainability Solutions",
        title: "ENERGY",
        titleHighlight: "MANAGEMENT",
        subtitle: "Real-Time Monitoring. Load Optimization. Solar Integration.",
        description: "Intelligent energy management systems for monitoring consumption, optimizing loads, and reducing utility costs with smart automation.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
        primaryCTA: {
          text: "Request Energy Audit",
          href: "/consultation"
        }
      }}
      audience={['Commercial Buildings', 'Industrial Facilities', 'Large Villas', 'Hotels & Resorts']}
      problems={{
        items: [
          { problem: 'High Utility Bills', impact: 'No visibility into energy consumption patterns' },
          { problem: 'Peak Demand Charges', impact: 'Expensive spikes during high-usage periods' },
          { problem: 'Energy Waste', impact: 'Equipment running unnecessarily, no automation' },
          { problem: 'No Solar Visibility', impact: 'Can\'t track solar production vs consumption' },
          { problem: 'Reactive Approach', impact: 'Only see bills after the fact, can\'t optimize' },
          { problem: 'No Load Shedding', impact: 'Can\'t automatically reduce non-critical loads' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Zap', title: 'Real-Time Monitoring', desc: 'Sub-meter level tracking, live consumption data' },
          { icon: 'BarChart3', title: 'Analytics Dashboard', desc: 'Historical trends, cost analysis, forecasting' },
          { icon: 'Sun', title: 'Solar Integration', desc: 'Production monitoring, self-consumption tracking' },
          { icon: 'Battery', title: 'Battery Management', desc: 'Storage optimization, backup power control' },
          { icon: 'Lightbulb', title: 'Load Control', desc: 'Automated load shedding, demand response' },
          { icon: 'TrendingDown', title: 'Cost Reduction', desc: 'Peak shaving, time-of-use optimization' }
        ]
      }}
      process={{
        title: "Our Energy Management Process",
        subtitle: "Data-driven energy optimization",
        steps: [
          { step: '01', title: 'Energy Audit', desc: 'Load profiling, consumption analysis, inefficiency identification' },
          { step: '02', title: 'System Design', desc: 'Metering points, sensor placement, automation strategy' },
          { step: '03', title: 'Installation', desc: 'Sub-meters, current sensors, gateway deployment' },
          { step: '04', title: 'Optimization', desc: 'Baseline establishment, automation rules, ongoing tuning' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Energy Management Solutions',
        items: [
          { name: 'Basic Monitoring', features: ['Main Meter Monitoring', 'Real-Time Dashboard', 'Mobile App', 'Cost Tracking', 'Monthly Reports'] },
          { name: 'Complete Management', features: ['Sub-Metering (10-20 circuits)', 'Load Control', 'Solar Monitoring', 'Automated Optimization', 'Alert System'] },
          { name: 'Enterprise Solution', features: ['Full Circuit Metering', 'Demand Response', 'Battery Integration', 'Predictive Analytics', 'Carbon Tracking'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '100+', label: 'Systems Deployed' },
          { number: '20-30%', label: 'Avg Energy Savings' },
          { number: '50M+ kWh', label: 'Energy Tracked' },
          { number: '24/7', label: 'Monitoring' }
        ]
      }}
      conversion={{
        title: "Ready to Reduce Energy Costs?",
        subtitle: "Get a comprehensive energy audit and management proposal",
        primaryCTA: {
          text: "Request Energy Audit",
          href: "/consultation"
        }
      }}
    />
  )
}
