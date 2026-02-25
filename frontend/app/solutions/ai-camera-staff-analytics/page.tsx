'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import { internalLinking } from '@/lib/internal-linking-data'

export default function AICameraStaffAnalyticsPage() {
  const links = internalLinking['ai-camera-staff-analytics']
  
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_ai-camera-staff-analytics"
      cmsKey="page_solutions_ai-camera-staff-analytics"
      hero={{
        badge: "AI-Powered Intelligence",
        title: "AI CAMERA",
        titleHighlight: "STAFF ANALYTICS",
        subtitle: "People Counting. Heat Maps. Dwell Time Analysis.",
        description: "AI-powered camera analytics for retail, commercial, and hospitality environments with people counting, staff performance, and customer behavior insights.",
        image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567",
        primaryCTA: {
          text: "Request AI Analytics Demo",
          href: "/consultation"
        }
      }}
      audience={['Retail Stores', 'Shopping Malls', 'Hotels & Restaurants', 'Corporate Offices']}
      problems={{
        items: [
          { problem: 'No Customer Insights', impact: 'Don\'t know peak times, customer flow, hot zones' },
          { problem: 'Staff Optimization', impact: 'Over/under staffing, no data-driven scheduling' },
          { problem: 'Loss Prevention', impact: 'Can\'t identify suspicious behavior or dwell patterns' },
          { problem: 'No Conversion Tracking', impact: 'Don\'t know browse-to-buy ratio, engagement' },
          { problem: 'Queue Management', impact: 'Long waits, no real-time queue alerts' },
          { problem: 'Marketing ROI Unknown', impact: 'Can\'t measure display effectiveness, traffic patterns' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Camera', title: 'AI-Powered Cameras', desc: '4K cameras with edge AI processing, privacy-compliant' },
          { icon: 'Eye', title: 'People Counting', desc: 'Accurate entry/exit counting, occupancy tracking' },
          { icon: 'Brain', title: 'Behavior Analytics', desc: 'Dwell time, path analysis, interaction zones' },
          { icon: 'BarChart3', title: 'Heat Maps', desc: 'Traffic patterns, hot zones, engagement areas' },
          { icon: 'Users', title: 'Staff Performance', desc: 'Service time, customer interaction analytics' },
          { icon: 'Shield', title: 'Privacy Compliant', desc: 'Anonymous analytics, GDPR-ready, no facial identification' }
        ]
      }}
      process={{
        title: "Our AI Analytics Deployment",
        subtitle: "From installation to insights",
        steps: [
          { step: '01', title: 'Site Analysis', desc: 'Space assessment, camera placement, analytics goals, KPI definition' },
          { step: '02', title: 'System Design', desc: 'Camera selection, coverage planning, server sizing, integration' },
          { step: '03', title: 'Installation', desc: 'Camera mounting, network setup, AI configuration, testing' },
          { step: '04', title: 'Insights', desc: 'Dashboard training, report generation, optimization recommendations' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'AI Analytics Packages',
        items: [
          { name: 'Basic Analytics', subtitle: 'Single location', features: ['4-8 AI Cameras', 'People Counting', 'Heat Maps', 'Basic Dashboard', 'Monthly Reports'] },
          { name: 'Complete Analytics', subtitle: 'Multi-zone facility', features: ['10-20 AI Cameras', 'Advanced Behavior', 'Queue Management', 'Staff Analytics', 'Real-Time Dashboard'] },
          { name: 'Enterprise Analytics', subtitle: 'Multi-site', features: ['20+ Cameras per Site', 'Predictive Analytics', 'Custom KPIs', 'API Integration', 'Dedicated Analyst'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '30+', label: 'Deployments' },
          { number: '1M+', label: 'People Counted Daily' },
          { number: 'Privacy', label: 'Compliant' },
          { number: '24/7', label: 'Monitoring' }
        ]
      }}
      conversion={{
        title: "Ready for AI-Powered Insights?",
        subtitle: "Get a demo with sample analytics from your industry",
        primaryCTA: {
          text: "Request AI Analytics Demo",
          href: "/consultation"
        }
      }}
      relatedPersonas={links.relatedPersonas}
      relatedSolutions={links.relatedSolutions}
      geoPages={links.geoPages}
    />
  )
}
