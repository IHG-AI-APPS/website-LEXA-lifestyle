'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function HomeTheaterPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_home-theater"
      cmsKey="page_solutions_home-theater"
      hero={{
        badge: "Entertainment Solutions",
        title: "HOME THEATER",
        titleHighlight: "PACKAGES",
        subtitle: "4K Projectors. Surround Sound. Theater Seating.",
        description: "Complete home theater packages with projector, screen, audio, and seating for dedicated media rooms and family spaces.",
        image: "https://images.unsplash.com/photo-1635274922891-a0ebdb4d3d9e",
        primaryCTA: {
          text: "Explore Theater Packages",
          href: "/consultation"
        }
      }}
      audience={['Family Homes', 'Media Room Owners', 'Apartment Residents', 'Entertainment Enthusiasts']}
      problems={{
        items: [
          { problem: 'Small TV Screen', impact: 'Limited immersion, not cinema-like experience' },
          { problem: 'Poor Sound', impact: 'TV speakers insufficient, no surround experience' },
          { problem: 'Bright Room', impact: 'Can\'t watch during day, ambient light ruins image' },
          { problem: 'Uncomfortable Seating', impact: 'Regular furniture not optimized for viewing' },
          { problem: 'Complex Setup', impact: 'Too many remotes, complicated source switching' },
          { problem: 'Budget Uncertainty', impact: 'Don\'t know what\'s achievable within budget' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Film', title: 'Projector Systems', desc: '4K laser or lamp projectors, 100-150 inch screens' },
          { icon: 'Tv', title: 'Large Format TVs', desc: '75-98 inch 4K OLED or QLED displays' },
          { icon: 'Speaker', title: 'Surround Sound', desc: '5.1, 7.1 or Dolby Atmos audio systems' },
          { icon: 'Armchair', title: 'Theater Seating', desc: 'Reclining seats with cup holders' },
          { icon: 'Zap', title: 'Smart Control', desc: 'Universal remote or automation integration' },
          { icon: 'Award', title: 'Professional Install', desc: 'Expert setup, calibration, training' }
        ]
      }}
      process={{
        title: "Our Home Theater Process",
        subtitle: "From consultation to movie night",
        steps: [
          { step: '01', title: 'Consultation', desc: 'Room assessment, budget discussion, usage needs, equipment options' },
          { step: '02', title: 'Design', desc: 'Equipment selection, layout planning, acoustic considerations' },
          { step: '03', title: 'Installation', desc: 'Professional mounting, wiring, equipment setup, seating delivery' },
          { step: '04', title: 'Calibration', desc: 'Video calibration, audio tuning, control programming, user training' }
        ]
      }}
      section6={{
        type: 'pricing',
        title: 'Home Theater Packages',
        subtitle: 'Complete solutions for any budget',
        items: [
          { name: 'Essential Theater', price: 'AED 35K - 60K', features: ['4K Projector + 120" Screen', '5.1 Surround Sound', '4-6 Seats', 'Universal Remote', 'Professional Install'] },
          { name: 'Premium Theater', price: 'AED 60K - 120K', featured: true, badge: 'Most Popular', features: ['4K Laser Projector + 150" Screen', '7.1.2 Atmos Sound', '8-10 Theater Seats', 'Smart Control', 'Acoustic Treatment'] },
          { name: 'Ultimate Theater', price: 'AED 120K+', features: ['Native 4K Laser', 'Full Atmos 7.1.4', '12+ Luxury Seats', 'Complete Automation', 'Dedicated Design Build'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '400+', label: 'Home Theaters' },
          { number: '15+', label: 'Years Experience' },
          { number: 'THX', label: 'Certified Installers' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready for Your Home Theater?",
        subtitle: "Get a custom home theater design and package pricing",
        primaryCTA: {
          text: "Get Theater Package Quote",
          href: "/consultation"
        },
        secondaryCTA: {
          text: "Visit Showroom",
          href: "/experience-centre"
        }
      }}
    />
  )
}
