'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import SolutionFAQs from '@/components/sections/SolutionFAQs'

export default function MirrorTVPage() {
  return (
    <>
      <SeoLandingPageTemplate
      cmsKey="page_solutions_mirror-tv"
        hero={{
          badge: "Hidden Technology",
          title: "MIRROR TV",
          titleHighlight: "SOLUTIONS",
          subtitle: "Hidden Displays. Bathroom TVs. Bedroom Mirrors.",
          description: "Elegant mirror TVs that disappear when off, perfect for bathrooms, bedrooms, and luxury spaces where aesthetics matter.",
          image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
          primaryCTA: {
            text: "Explore Mirror TVs",
            href: "/consultation"
          }
        }}
        audience={['Luxury Bathrooms', 'Master Bedrooms', 'Hotel Suites', 'Spa & Wellness Centers']}
        problems={{
          items: [
            { problem: 'TV Ruins Aesthetics', impact: 'Black screen dominates room design when off' },
            { problem: 'Bathroom Moisture', impact: 'Regular TVs fail in humid environments' },
            { problem: 'Limited Space', impact: 'No room for traditional TV installation' },
            { problem: 'Design Conflicts', impact: 'Technology clashes with interior design' },
            { problem: 'No Hidden Option', impact: 'Want TV but don\'t want it visible' },
            { problem: 'Poor Integration', impact: 'TV doesn\'t match mirror or fixtures' }
          ]
        }}
        deliverables={{
          items: [
            { icon: 'Tv', title: 'Mirror TVs', desc: '32" to 75" displays hidden behind mirrors' },
            { icon: 'Eye', title: 'Vanishing Technology', desc: 'Appears as mirror when off, TV when on' },
            { icon: 'Sparkles', title: 'Custom Frames', desc: 'Match any décor, bathroom fixtures, room style' },
            { icon: 'Bath', title: 'Waterproof Options', desc: 'IP65 rated for bathrooms and wet areas' },
            { icon: 'Home', title: 'Smart Features', desc: 'Touch controls, voice activation, app control' },
            { icon: 'Dumbbell', title: 'Gym Integration', desc: 'Perfect for home gyms and fitness rooms' }
          ]
        }}
        process={{
          title: "Our Mirror TV Process",
          subtitle: "Custom fabrication and installation",
          steps: [
            { step: '01', title: 'Design', desc: 'Space measurement, frame selection, TV sizing, placement planning' },
            { step: '02', title: 'Fabrication', desc: 'Custom mirror cutting, frame building, TV integration' },
            { step: '03', title: 'Installation', desc: 'Professional mounting, wiring concealment, waterproofing' },
            { step: '04', title: 'Integration', desc: 'Smart home connection, control setup, demonstration' }
          ]
        }}
        section6={{
          type: 'custom',
          title: 'Mirror TV Locations',
          items: [
            { name: 'Bathroom Mirror TV', features: ['Waterproof IP65', 'Anti-Fog', 'Touch Controls', 'Chrome/Gold Frame', 'Flush Mount'] },
            { name: 'Bedroom Mirror TV', features: ['Large Format Available', 'Custom Framing', 'Smart Home Integration', 'Recessed or Surface', '4K Display'] },
            { name: 'Gym Mirror TV', features: ['Tempered Safety Glass', 'Wall-to-Wall Options', 'Multi-Display', 'Workout Apps', 'Moisture Resistant'] }
          ]
        }}
        trustSignals={{
          stats: [
            { number: '200+', label: 'Mirror TVs Installed' },
            { number: 'Custom', label: 'Sizing' },
            { number: 'IP65', label: 'Waterproof Rated' },
            { number: '3 Year', label: 'Warranty' }
          ]
        }}
        conversion={{
          title: "Ready for a Mirror TV?",
          subtitle: "Get a custom mirror TV design with frame options and pricing",
          primaryCTA: {
            text: "Request Mirror TV Quote",
            href: "/consultation"
          }
        }}
      />
      
      {/* Dynamic FAQs from Database */}
      <SolutionFAQs solutionSlug="mirror-tv" />
    </>
  )
}
