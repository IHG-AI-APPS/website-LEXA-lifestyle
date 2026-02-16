'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function HiFiAudioPage() {
  return (
    <SeoLandingPageTemplate
      hero={{
        badge: "Audiophile Solutions",
        title: "HI-FI AUDIO",
        titleHighlight: "SYSTEMS",
        subtitle: "Stereo Amplifiers. Audiophile Speakers. Vinyl Setups.",
        description: "Premium high-fidelity audio systems for dedicated listening rooms with audiophile-grade components and acoustic treatment.",
        image: "https://images.unsplash.com/photo-1616449733103-501451bde2ee",
        primaryCTA: {
          text: "Design Listening Room",
          href: "/consultation"
        }
      }}
      audience={['Music Enthusiasts', 'Vinyl Collectors', 'Audiophiles', 'Musicians & Producers']}
      problems={{
        items: [
          { problem: 'Lack of Detail', impact: 'Missing nuances in music, compressed sound' },
          { problem: 'Poor Imaging', impact: 'Can\'t locate instruments, no soundstage' },
          { problem: 'Room Acoustics', impact: 'Standing waves, bass buildup, reflections' },
          { problem: 'Component Mismatch', impact: 'Speakers and amp not properly matched' },
          { problem: 'Digital Fatigue', impact: 'Streaming sounds harsh, missing analog warmth' },
          { problem: 'No Isolation', impact: 'External noise contaminating listening experience' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Headphones', title: 'Audiophile Speakers', desc: 'Floor-standing, bookshelf, reference monitors' },
          { icon: 'Music', title: 'Stereo Amplification', desc: 'Class A, A/B, or D amplifiers, tube options' },
          { icon: 'Radio', title: 'Source Components', desc: 'Network streamers, DACs, CD players' },
          { icon: 'Disc', title: 'Vinyl Systems', desc: 'Turntables, phono stages, cartridge setup' },
          { icon: 'Volume2', title: 'Acoustic Treatment', desc: 'Bass traps, absorption panels, diffusers' },
          { icon: 'Waves', title: 'Room Calibration', desc: 'Speaker positioning, EQ, measurement' }
        ]
      }}
      process={{
        title: "Our Hi-Fi Process",
        subtitle: "Precision audio engineering",
        steps: [
          { step: '01', title: 'Consultation', desc: 'Musical preferences, room assessment, budget, existing components' },
          { step: '02', title: 'System Design', desc: 'Component matching, acoustic planning, placement optimization' },
          { step: '03', title: 'Installation', desc: 'Equipment setup, acoustic treatment, careful positioning' },
          { step: '04', title: 'Tuning', desc: 'Speaker placement, room correction, critical listening evaluation' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Hi-Fi System Tiers',
        items: [
          { name: 'Entry Audiophile', subtitle: 'AED 40K - 80K', features: ['Bookshelf Speakers', 'Integrated Amplifier', 'Network Streamer', 'Basic Treatment', 'Professional Setup'] },
          { name: 'Reference System', subtitle: 'AED 80K - 200K', features: ['Floor-Standing Speakers', 'Separate Pre/Power Amps', 'High-End DAC', 'Turntable Setup', 'Full Acoustic Treatment'] },
          { name: 'Statement System', subtitle: 'AED 200K+', features: ['Reference Speakers', 'Mono-Block Amplifiers', 'Analog/Digital Sources', 'Dedicated Room Build', 'Expert Tuning'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '150+', label: 'Hi-Fi Systems' },
          { number: '50+', label: 'Listening Rooms' },
          { number: '15+', label: 'Years Experience' },
          { number: 'Custom', label: 'Tuning' }
        ]
      }}
      conversion={{
        title: "Ready for Audiophile Sound?",
        subtitle: "Get a custom hi-fi system design and acoustic plan",
        primaryCTA: {
          text: "Schedule Listening Session",
          href: "/consultation"
        }
      }}
    />
  )
}
