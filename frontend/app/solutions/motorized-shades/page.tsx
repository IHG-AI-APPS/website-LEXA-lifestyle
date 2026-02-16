'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function MotorizedShadesPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: "Window Automation",
        title: "MOTORIZED SHADES",
        titleHighlight: "& BLINDS",
        subtitle: "Automated Curtains. Smart Shades. Solar Control.",
        description: "Intelligent window treatments with automated shades, blackout blinds, and solar control for energy efficiency and privacy.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        primaryCTA: {
          text: "Explore Motorized Shades",
          href: "/consultation"
        }
      }}
      audience={['Villa Owners', 'Luxury Apartments', 'Hotels', 'Commercial Offices']}
      problems={{
        items: [
          { problem: 'Hard to Reach Windows', impact: 'High windows, skylights impossible to access' },
          { problem: 'Sun Glare', impact: 'Morning sun, screen glare, fading furniture' },
          { problem: 'No Privacy Control', impact: 'Manual adjustment every morning/evening' },
          { problem: 'Energy Waste', impact: 'Heat gain/loss, high AC costs' },
          { problem: 'Inconsistent Look', impact: 'Shades at different heights, uncoordinated' },
          { problem: 'No Automation', impact: 'Can\'t create scenes or schedules' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Sun', title: 'Solar Shades', desc: 'UV protection, glare reduction, view-through' },
          { icon: 'Moon', title: 'Blackout Shades', desc: 'Complete light blocking for bedrooms, theaters' },
          { icon: 'Wind', title: 'Outdoor Shades', desc: 'Weatherproof, wind-rated, pergola shading' },
          { icon: 'Zap', title: 'Quiet Motors', desc: 'Whisper-quiet operation, battery or wired' },
          { icon: 'Clock', title: 'Scheduling', desc: 'Automated open/close based on time or sun position' },
          { icon: 'Smartphone', title: 'Smart Control', desc: 'App, voice, or integration with home automation' }
        ]
      }}
      process={{
        title: "Our Shade Installation Process",
        subtitle: "From measurement to automation",
        steps: [
          { step: '01', title: 'Consultation', desc: 'Window survey, solar analysis, fabric selection, motor type' },
          { step: '02', title: 'Custom Fabrication', desc: 'Precise measurements, shade manufacturing, motor selection' },
          { step: '03', title: 'Installation', desc: 'Professional mounting, motor installation, limit setting' },
          { step: '04', title: 'Programming', desc: 'Scene creation, schedules, automation integration, training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Popular Shade Types',
        items: [
          { name: 'Roller Shades', features: ['Wide Fabric Selection', 'Blackout or Sheer', 'Battery or Wired', 'Modern Clean Look'] },
          { name: 'Roman Shades', features: ['Elegant Fabric Folds', 'Luxury Appearance', 'Custom Fabrics', 'Soft Diffused Light'] },
          { name: 'Vertical Blinds', features: ['Large Window Coverage', 'Sliding Door Ideal', 'Tilt + Traverse', 'Commercial Grade'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '2,000+', label: 'Shades Installed' },
          { number: '500+', label: 'Homes Automated' },
          { number: 'Somfy', label: 'Certified Partner' },
          { number: '5 Year', label: 'Motor Warranty' }
        ]
      }}
      conversion={{
        title: "Ready to Automate Your Windows?",
        subtitle: "Get a custom motorized shade proposal with fabric samples",
        primaryCTA: {
          text: "Request Shade Consultation",
          href: "/consultation"
        }
      }}
    />
  )
}
