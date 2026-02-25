'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function AudioSystemsPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_audio-systems"
      hero={{
        badge: "Premium Audio",
        title: "WHOLE-HOME",
        titleHighlight: "AUDIO SYSTEMS",
        subtitle: "Multi-Room Audio. Streaming. Hi-Fi Quality.",
        description: "Distributed audio solutions for every room with centralized control, streaming services, and premium sound quality.",
        image: "https://images.unsplash.com/photo-1545128485-c400e7702796",
        primaryCTA: {
          text: "Design Audio System",
          href: "/consultation"
        }
      }}
      audience={['Villa Owners', 'Restaurants & Bars', 'Retail Stores', 'Hotels & Resorts']}
      problems={{
        items: [
          { problem: 'No Multi-Room Audio', impact: 'Different speakers in each room, no synchronization' },
          { problem: 'Complex Setup', impact: 'Multiple devices, confusing controls' },
          { problem: 'Poor Sound Quality', impact: 'Consumer-grade speakers, tinny sound' },
          { problem: 'Visible Wiring', impact: 'Messy cables ruining aesthetics' },
          { problem: 'No Streaming', impact: 'Limited to Bluetooth, no Spotify/Apple Music integration' },
          { problem: 'Volume Issues', impact: 'Too loud in one room, too quiet in another' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Radio', title: 'Multi-Zone Audio', desc: 'Independent control for every room and outdoor area' },
          { icon: 'Waves', title: 'Streaming Integration', desc: 'Spotify, Apple Music, Tidal, TuneIn built-in' },
          { icon: 'Volume2', title: 'Premium Speakers', desc: 'In-ceiling, in-wall, architectural speakers' },
          { icon: 'Headphones', title: 'Hi-Fi Quality', desc: 'Studio-grade amplifiers and DSP processing' },
          { icon: 'Smartphone', title: 'Unified Control', desc: 'Single app for all zones, voice control support' },
          { icon: 'Tv', title: 'System Integration', desc: 'Works with home theater, security, automation' }
        ]
      }}
      process={{
        title: "Our Audio Installation Process",
        subtitle: "Professional installation in 1-3 weeks",
        steps: [
          { step: '01', title: 'Audio Design', desc: 'Room acoustics, speaker placement, zone planning, usage analysis' },
          { step: '02', title: 'Equipment Selection', desc: 'Amplifier sizing, speaker matching, streaming devices' },
          { step: '03', title: 'Installation', desc: 'Speaker mounting, amplifier rack, cabling, network setup' },
          { step: '04', title: 'Tuning', desc: 'Room EQ, level balancing, streaming setup, user training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Audio Solutions',
        items: [
          { name: 'Essential Audio', subtitle: '4-6 zones', features: ['Streaming Amplifier', 'In-Ceiling Speakers', 'Mobile App Control', 'Spotify/Apple Music'] },
          { name: 'Premium Audio', subtitle: '8-12 zones', features: ['Multi-Zone Matrix', 'Architectural Speakers', 'DSP Processing', 'Voice Control', 'Outdoor Audio'] },
          { name: 'Hi-Fi Audio', subtitle: '12+ zones', features: ['Audiophile Amplification', 'Custom Speakers', 'Room Correction', 'Vinyl/Analog Integration', 'Dedicated Listening Rooms'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '800+', label: 'Audio Installs' },
          { number: '5,000+', label: 'Zones Deployed' },
          { number: '15+', label: 'Years Experience' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready for Whole-Home Audio?",
        subtitle: "Get a custom audio design and quote within 48 hours",
        primaryCTA: {
          text: "Request Audio Design",
          href: "/consultation"
        }
      }}
    />
  )
}
