'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import SolutionFAQs from '@/components/sections/SolutionFAQs'

export default function MarineAudioPage() {
  return (
    <>
      <SeoLandingPageTemplate
      cmsKey="page_solutions_marine-audio"
        hero={{
          badge: "Marine Audio",
          title: "MARINE",
          titleHighlight: "AUDIO SYSTEMS",
          subtitle: "Yacht Audio. Boat Entertainment. Marine Speakers.",
          description: "Professional marine audio systems with corrosion-resistant speakers, multi-zone control, and seamless entertainment for luxury vessels.",
          image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          primaryCTA: {
            text: "Explore Marine Audio",
            href: "/consultation"
          }
        }}
        audience={['Luxury Yachts', 'Motor Boats', 'Sailing Vessels', 'Commercial Marine']}
        problems={{
          items: [
            { problem: 'Corrosion Issues', impact: 'Regular speakers fail in saltwater environment' },
            { problem: 'Poor Sound Quality', impact: 'Wind and water noise overwhelm audio' },
            { problem: 'No Zone Control', impact: 'Can\'t play different music in different areas' },
            { problem: 'Visible Wiring', impact: 'Cables exposed and unaesthetic' },
            { problem: 'Limited Coverage', impact: 'Dead spots with no audio' },
            { problem: 'Complex Operation', impact: 'Difficult to control from multiple locations' }
          ]
        }}
        deliverables={{
          items: [
            { icon: 'Speaker', title: 'Marine Speakers', desc: 'Titanium tweeters, polymer cones, corrosion-resistant' },
            { icon: 'Waves', title: 'Multi-Zone Audio', desc: 'Independent control for salon, deck, cabins' },
            { icon: 'Volume2', title: 'High-Fidelity Sound', desc: 'Crystal clear audio even at sea' },
            { icon: 'Wifi', title: 'Wireless Streaming', desc: 'Bluetooth, AirPlay, Spotify Connect' },
            { icon: 'Shield', title: 'Marine-Grade', desc: 'IP67 rated, UV resistant, salt-proof' },
            { icon: 'Anchor', title: 'Concealed Installation', desc: 'Hidden speakers and invisible wiring' }
          ]
        }}
        process={{
          title: "Our Marine Audio Process",
          subtitle: "Professional marine installation",
          steps: [
            { step: '01', title: 'Survey', desc: 'Vessel inspection, zone planning, acoustic assessment' },
            { step: '02', title: 'Design', desc: 'Speaker placement, amplifier sizing, system architecture' },
            { step: '03', title: 'Installation', desc: 'Marine-grade wiring, waterproof connections, testing' },
            { step: '04', title: 'Integration', desc: 'Control setup, streaming configuration, crew training' }
          ]
        }}
        section6={{
          type: 'custom',
          title: 'Marine Audio Zones',
          items: [
            { name: 'Flybridge Audio', features: ['Weather Resistant', 'High SPL', 'Wind Optimized', 'Touch Controls', 'Subwoofers'] },
            { name: 'Salon Entertainment', features: ['Premium Fidelity', 'Hidden Speakers', 'Multi-Source', 'Smart Integration', 'Surround Sound'] },
            { name: 'Deck & Aft', features: ['Marine Grade', 'Directional Sound', 'Volume Zones', 'App Control', 'Underwater Speakers'] }
          ]
        }}
        trustSignals={{
          stats: [
            { number: '150+', label: 'Yachts Equipped' },
            { number: 'IP67', label: 'Water Resistance' },
            { number: 'Multi-Zone', label: 'Audio Control' },
            { number: '5 Year', label: 'Marine Warranty' }
          ]
        }}
        conversion={{
          title: "Ready for Marine Audio?",
          subtitle: "Get a custom marine audio system design and quote",
          primaryCTA: {
            text: "Request Marine Audio Quote",
            href: "/consultation"
          }
        }}
      />
      
      {/* Dynamic FAQs from Database */}
      <SolutionFAQs solutionSlug="marine-audio" />
    </>
  )
}
