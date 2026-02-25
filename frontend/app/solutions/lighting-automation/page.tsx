'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function LightingAutomationPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_lighting-automation"
      hero={{
        badge: "Smart Living",
        title: "LIGHTING",
        titleHighlight: "AUTOMATION",
        subtitle: "Scene Control. Circadian Rhythm. Energy Savings.",
        description: "Intelligent lighting that adapts to your lifestyle with automated scenes, dimming control, and energy optimization.",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
        primaryCTA: {
          text: "Design Lighting System",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "View Projects",
          href: "/projects"
        }
      }}
      audience={['Villa Owners', 'Interior Designers', 'Property Developers', 'Commercial Offices']}
      problems={{
        items: [
          { problem: 'Manual Control', impact: 'Switching lights on/off room by room, no automation' },
          { problem: 'Energy Waste', impact: 'Lights left on unnecessarily, high electricity bills' },
          { problem: 'No Scene Control', impact: 'Can\'t create ambiance, single brightness level' },
          { problem: 'Poor Integration', impact: 'Separate apps for different light brands' },
          { problem: 'Harsh Lighting', impact: 'No circadian rhythm support, affects sleep quality' },
          { problem: 'Security Gaps', impact: 'No automated presence simulation when away' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Lightbulb', title: 'Scene Programming', desc: 'Pre-set lighting scenes for any mood or activity' },
          { icon: 'Sun', title: 'Daylight Harvesting', desc: 'Automatic dimming based on natural light levels' },
          { icon: 'Moon', title: 'Circadian Lighting', desc: 'Color temperature shifts matching your body clock' },
          { icon: 'Zap', title: 'Energy Optimization', desc: 'Reduce consumption by 30-40% with smart scheduling' },
          { icon: 'Clock', title: 'Scheduling', desc: 'Automated on/off based on time, sunrise/sunset' },
          { icon: 'Smartphone', title: 'Mobile Control', desc: 'Control from anywhere via smartphone or voice' }
        ]
      }}
      process={{
        title: "Our Implementation Process",
        subtitle: "From design to deployment in 2-4 weeks",
        steps: [
          { step: '01', title: 'Assessment', desc: 'Site survey, fixture count, lighting zones, usage patterns' },
          { step: '02', title: 'Design', desc: 'Scene programming, control layout, integration planning' },
          { step: '03', title: 'Installation', desc: 'Smart switches, dimmers, sensors, system commissioning' },
          { step: '04', title: 'Programming', desc: 'Scene setup, schedule configuration, user training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Popular Brands We Work With',
        subtitle: 'Professional-grade lighting control',
        items: [
          { name: 'Lutron', features: ['Industry Leader', 'Fade-to-Black Dimming', 'Ketra Integration'] },
          { name: 'Philips Hue', features: ['16M Colors', 'Matter Compatible', 'Entertainment Sync'] },
          { name: 'Vantage', features: ['Architectural Grade', 'Color Tuning', 'Astronomical Clock'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '1,000+', label: 'Homes Automated' },
          { number: '30-40%', label: 'Energy Savings' },
          { number: '15+', label: 'Years Experience' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready to Automate Your Lighting?",
        subtitle: "Get a detailed lighting design and quote within 48 hours",
        primaryCTA: {
          text: "Request Lighting Design",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "View Showroom",
          href: "/experience-centre"
        }
      }}
    />
  )
}
