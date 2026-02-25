'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function SmartLifestylePage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_smart-lifestyle"
      cmsKey="page_solutions_smart-lifestyle"
      hero={{
        badge: "Connected Living",
        title: "SMART LIFESTYLE",
        titleHighlight: "SOLUTIONS",
        subtitle: "Complete Home Automation. Voice Control. Remote Access.",
        description: "Integrated smart home systems that control lighting, climate, entertainment, and security from a single platform.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        primaryCTA: {
          text: "Explore Smart Home",
          href: "/consultation"
        }
      }}
      audience={['Modern Villa Owners', 'Tech Enthusiasts', 'Busy Professionals', 'Luxury Apartments']}
      problems={{
        items: [
          { problem: 'Too Many Apps', impact: 'Different app for lights, thermostat, security, audio' },
          { problem: 'No Integration', impact: 'Systems don\'t talk to each other' },
          { problem: 'Complex Control', impact: 'Family can\'t operate, need instructions' },
          { problem: 'No Scenes', impact: 'Can\'t create "movie mode" or "goodnight" automation' },
          { problem: 'Remote Access Issues', impact: 'Can\'t control home when traveling' },
          { problem: 'Energy Waste', impact: 'No automated scheduling, high utility bills' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Smartphone', title: 'Unified Control', desc: 'Single app for lighting, climate, AV, security' },
          { icon: 'Lightbulb', title: 'Scene Automation', desc: 'Pre-programmed scenes for any activity' },
          { icon: 'Thermometer', title: 'Climate Management', desc: 'Smart thermostats with occupancy sensing' },
          { icon: 'Tv', title: 'Entertainment Control', desc: 'Integrated audio, video, streaming control' },
          { icon: 'Lock', title: 'Access Management', desc: 'Smart locks, doorbell cameras, guest access' },
          { icon: 'Shield', title: 'Security Integration', desc: 'Cameras, sensors, alerts in one system' }
        ]
      }}
      process={{
        title: "Our Smart Home Process",
        subtitle: "From consultation to automation",
        steps: [
          { step: '01', title: 'Discovery', desc: 'Lifestyle interview, space assessment, system requirements' },
          { step: '02', title: 'Design', desc: 'System architecture, device selection, automation planning' },
          { step: '03', title: 'Installation', desc: 'Equipment installation, network setup, integration' },
          { step: '04', title: 'Programming', desc: 'Scene creation, schedule setup, family training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Smart Home Packages',
        items: [
          { name: 'Starter Smart Home', features: ['Smart Lighting (10 devices)', 'Smart Thermostat', 'Video Doorbell', 'Voice Control', 'Mobile App'] },
          { name: 'Complete Smart Home', features: ['Full Lighting Control', 'Climate Automation', 'Multi-Room Audio', 'Security System', 'Scene Programming', 'Remote Access'] },
          { name: 'Ultimate Smart Home', features: ['Whole-Home Control4/Crestron', 'Cinema Integration', 'Advanced Automation', 'Energy Management', 'Concierge Support'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '600+', label: 'Smart Homes' },
          { number: '99.9%', label: 'System Uptime' },
          { number: '15+', label: 'Years Experience' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready for a Smart Home?",
        subtitle: "Get a personalized smart home design and quote",
        primaryCTA: {
          text: "Start Smart Home Journey",
          href: "/consultation"
        }
      }}
    />
  )
}
