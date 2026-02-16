'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import SolutionFAQs from '@/components/sections/SolutionFAQs'

export default function MarineVideoPage() {
  return (
    <>
      <SeoLandingPageTemplate
        hero={{
          badge: "Marine Video",
          title: "MARINE",
          titleHighlight: "VIDEO SYSTEMS",
          subtitle: "Satellite TV. Video Distribution. Marine Displays.",
          description: "Complete marine video solutions with stabilized satellite TV, multi-cabin distribution, and waterproof displays for luxury vessels.",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
          primaryCTA: {
            text: "Explore Marine Video",
            href: "/consultation"
          }
        }}
        audience={['Super Yachts', 'Luxury Vessels', 'Charter Boats', 'Private Yachts']}
        problems={{
          items: [
            { problem: 'No TV at Sea', impact: 'Signal loss when away from shore' },
            { problem: 'Single TV Limit', impact: 'Can\'t watch different channels in cabins' },
            { problem: 'Poor Picture Quality', impact: 'Low resolution, pixelation issues' },
            { problem: 'Moisture Damage', impact: 'Displays fail in marine environment' },
            { problem: 'Complex Wiring', impact: 'Difficult to add TVs to new areas' },
            { problem: 'No Streaming', impact: 'Can\'t access Netflix, YouTube at sea' }
          ]
        }}
        deliverables={{
          items: [
            { icon: 'Satellite', title: 'Satellite TV', desc: 'Stabilized antennas for signal at sea' },
            { icon: 'Tv', title: 'Multi-Cabin Distribution', desc: 'Different channels in each cabin' },
            { icon: 'Monitor', title: 'Marine Displays', desc: 'Waterproof TVs for exposed areas' },
            { icon: 'Wifi', title: 'IPTV System', desc: 'Stream throughout the vessel' },
            { icon: 'Shield', title: 'Weather Protection', desc: 'IP-rated displays for flybridge & deck' },
            { icon: 'Anchor', title: 'Navigation Integration', desc: 'Display charts and camera feeds' }
          ]
        }}
        process={{
          title: "Our Marine Video Process",
          subtitle: "Professional marine AV installation",
          steps: [
            { step: '01', title: 'Assessment', desc: 'Vessel layout, viewing locations, satellite requirements' },
            { step: '02', title: 'Design', desc: 'Display selection, distribution planning, system architecture' },
            { step: '03', title: 'Installation', desc: 'Marine wiring, satellite mounting, display integration' },
            { step: '04', title: 'Configuration', desc: 'Channel programming, streaming setup, testing' }
          ]
        }}
        section6={{
          type: 'custom',
          title: 'Marine Video Solutions',
          items: [
            { name: 'Satellite TV Systems', features: ['Stabilized Antenna', 'Multi-LNB', 'Auto-Tracking', 'Global Coverage', 'HD/4K'] },
            { name: 'Video Distribution', features: ['HDMI Over IP', 'Multi-Source', 'Zone Control', 'Any TV Any Source', 'Central Management'] },
            { name: 'Waterproof Displays', features: ['IP65 Rated', 'Sunlight Readable', 'Marine Grade', 'Touch Screen', 'Custom Integration'] }
          ]
        }}
        trustSignals={{
          stats: [
            { number: '100+', label: 'Marine Installations' },
            { number: 'Global', label: 'Satellite Coverage' },
            { number: '4K', label: 'Resolution' },
            { number: '5 Year', label: 'Warranty' }
          ]
        }}
        conversion={{
          title: "Ready for Marine Video?",
          subtitle: "Get a custom marine video system design with satellite TV and displays",
          primaryCTA: {
            text: "Request Marine Video Quote",
            href: "/consultation"
          }
        }}
      />
      
      {/* Dynamic FAQs from Database */}
      <SolutionFAQs solutionSlug="marine-video" />
    </>
  )
}
