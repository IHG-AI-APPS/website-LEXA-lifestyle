'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function HomeCinemaPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: "Affordable Home Entertainment",
        title: "LIVING ROOM",
        titleHighlight: "HOME THEATER",
        subtitle: "Front Projector. Sonos Audio. Simple Setup.",
        description: "Transform your existing living room into a home theater with a motorized projector screen, Sonos soundbar system, and smart control - no dedicated room needed.",
        image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8",
        primaryCTA: {
          text: "Get Living Room Theater Quote",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "See Packages",
          href: "#packages"
        }
      }}
      audience={['Apartment Residents', 'Family Homes', 'Living Room Upgrades', 'Budget-Conscious Buyers']}
      problems={{
        items: [
          { problem: 'Small TV Not Immersive', impact: '55-65 inch TV does not create cinema experience' },
          { problem: 'No Dedicated Room', impact: 'Want cinema but need to use living room' },
          { problem: 'Budget Constraints', impact: 'Full cinema build too expensive (AED 250K+)' },
          { problem: 'Bright Living Room', impact: 'Sunlight ruins daytime viewing' },
          { problem: 'Complex Installation', impact: 'Worried about construction, mess, wiring' },
          { problem: 'Wife Approval Factor', impact: 'Permanent cinema would ruin home aesthetics' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Film', title: 'Motorized Projector Screen', desc: '100-120 inch retractable screen, disappears when not in use' },
          { icon: 'Tv', title: '4K Short-Throw Projector', desc: 'Ceiling-mounted, minimal shadows, bright image' },
          { icon: 'Speaker', title: 'Sonos Soundbar System', desc: 'Arc or Beam soundbar + wireless subwoofer + surrounds' },
          { icon: 'Sofa', title: 'Use Existing Furniture', desc: 'No need for theater seating, enjoy your sofa' },
          { icon: 'Zap', title: 'One-Touch Control', desc: 'Single button lowers screen, starts projector, dims lights' },
          { icon: 'DollarSign', title: 'Affordable Investment', desc: 'Cinema experience for AED 35K-80K' }
        ]
      }}
      process={{
        title: "Our Living Room Theater Process",
        subtitle: "From consultation to movie night in 2-3 weeks",
        steps: [
          { step: '01', title: 'Consultation', desc: 'Living room assessment, existing furniture, viewing distance, ambient light' },
          { step: '02', title: 'Design', desc: 'Screen sizing, projector selection, audio placement, control setup' },
          { step: '03', title: 'Installation', desc: 'Projector mounting, screen installation, Sonos setup, clean wiring' },
          { step: '04', title: 'Training', desc: 'Image adjustment, audio tuning, one-touch scenes, family training' }
        ]
      }}
      section6={{
        type: 'pricing',
        title: 'Living Room Theater Packages',
        subtitle: 'Cinema without the construction',
        items: [
          { 
            name: 'Essential Package', 
            price: 'AED 35K - 50K', 
            features: [
              '100" Motorized Screen',
              '4K Projector (3,000 lumens)',
              'Sonos Beam + Sub',
              'Ceiling Mount',
              'Smart Remote',
              'Professional Install'
            ]
          },
          { 
            name: 'Premium Package', 
            price: 'AED 50K - 80K',
            featured: true,
            badge: 'Most Popular',
            features: [
              '120" Motorized Screen',
              '4K Laser Projector (3,500 lumens)',
              'Sonos Arc + Sub + Surrounds',
              'Automated Light Dimming',
              'Smart Home Integration',
              'Acoustic Panels (optional)'
            ]
          },
          { 
            name: 'Ultimate Package', 
            price: 'AED 80K - 120K', 
            features: [
              '150" Motorized Screen',
              'Native 4K Laser (4,000 lumens)',
              'Sonos Arc + Dual Subs + Surrounds',
              'Full Lighting Automation',
              'Motorized Curtains',
              'Complete Smart Home Integration'
            ]
          }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '200+', label: 'Living Room Theaters' },
          { number: '2-3 Weeks', label: 'Install Time' },
          { number: 'No Construction', label: 'Clean Install' },
          { number: '3 Year', label: 'Warranty' }
        ]
      }}
      conversion={{
        title: "Ready for Living Room Cinema?",
        subtitle: "Get your living room theater concept and quote within 24 hours",
        primaryCTA: {
          text: "WhatsApp for Quick Quote",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "Calculate Your Package",
          href: "/calculator"
        }
      }}
      relatedPersonas={[
        { name: 'Homeowners', link: '/persona/homeowner', description: 'Living room entertainment solutions' },
        { name: 'Apartment Residents', link: '/persona/homeowner', description: 'No construction required' }
      ]}
      relatedSolutions={[
        { name: 'Luxury Home Cinema Dubai', link: '/solutions/luxury-home-cinema-dubai', description: 'Dedicated cinema rooms with acoustic build' },
        { name: 'Outdoor Living', link: '/solutions/outdoor-living', description: 'Outdoor entertainment systems' },
        { name: 'Smart Lifestyle', link: '/solutions/smart-lifestyle', description: 'Complete home automation' }
      ]}
      geoPages={[
        { name: 'Dubai Hills Estate', link: '/locations/dubai-hills' },
        { name: 'Downtown Dubai', link: '/locations/downtown-dubai' }
      ]}
    />
  )
}
