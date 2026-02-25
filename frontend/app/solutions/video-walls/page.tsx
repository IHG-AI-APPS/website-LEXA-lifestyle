'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'

export default function VideoWallsPage() {
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_video-walls"
      cmsKey="page_solutions_video-walls"
      hero={{
        badge: "Visual Impact",
        title: "VIDEO WALLS",
        titleHighlight: "& DISPLAYS",
        subtitle: "LED Walls. LCD Arrays. Control Rooms.",
        description: "Stunning video wall solutions for control rooms, lobbies, retail, and corporate environments with seamless displays.",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17",
        primaryCTA: {
          text: "Request Video Wall Design",
          href: "/consultation"
        }
      }}
      audience={['Control & Command Centers', 'Corporate Lobbies', 'Retail Stores', 'Broadcasting Studios']}
      problems={{
        items: [
          { problem: 'Visible Bezels', impact: 'Thick borders break visual continuity' },
          { problem: 'Poor Brightness', impact: 'Washed out in ambient light, can\'t see content' },
          { problem: 'Limited Sources', impact: 'Can\'t display multiple inputs simultaneously' },
          { problem: 'No Flexibility', impact: 'Fixed layouts, can\'t change content arrangement' },
          { problem: 'Maintenance Nightmare', impact: 'Panel failures require full dismounting' },
          { problem: 'Power Consumption', impact: 'High energy costs for 24/7 operation' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Monitor', title: 'LED Video Walls', desc: 'Seamless displays with narrow pixel pitch' },
          { icon: 'Columns', title: 'LCD Video Walls', desc: 'Ultra-narrow bezel displays, front service' },
          { icon: 'Zap', title: 'Video Processors', desc: 'Multi-source switching, scaling, windowing' },
          { icon: 'Eye', title: 'Control Room Solutions', desc: 'Multi-operator workstations, KVM systems' },
          { icon: 'BarChart3', title: 'Content Management', desc: 'Digital signage, scheduling, playlists' },
          { icon: 'Smartphone', title: 'Remote Management', desc: 'Cloud-based monitoring and control' }
        ]
      }}
      process={{
        title: "Our Video Wall Process",
        subtitle: "From design to deployment",
        steps: [
          { step: '01', title: 'Requirements', desc: 'Viewing distance, resolution needs, content sources, ambient light' },
          { step: '02', title: 'Design', desc: 'Display selection, processor sizing, mounting structure, power/data' },
          { step: '03', title: 'Installation', desc: 'Mounting frame, panel installation, calibration, integration' },
          { step: '04', title: 'Configuration', desc: 'Layout programming, source mapping, user training' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Video Wall Solutions',
        items: [
          { name: 'LCD Video Wall', subtitle: '2x2 to 5x5 arrays', features: ['55" or 65" LCD Panels', '1.8mm Bezels', 'Video Processor', 'Wall Mount System'] },
          { name: 'Indoor LED Wall', subtitle: 'Custom sizes', features: ['1.2mm - 2.5mm Pixel Pitch', 'Modular Cabinets', 'Front Service', 'Video Processing', 'High Brightness'] },
          { name: 'Control Room', subtitle: 'Mission critical', features: ['24/7 Rated Displays', 'Redundant Processing', 'Multi-Operator Stations', 'KVM Matrix', 'Dedicated Support'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '100+', label: 'Video Walls' },
          { number: '1,000+', label: 'Displays Deployed' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Support' }
        ]
      }}
      conversion={{
        title: "Ready for a Video Wall?",
        subtitle: "Get a custom video wall design with 3D visualization",
        primaryCTA: {
          text: "Request Video Wall Design",
          href: "/consultation"
        }
      }}
    />
  )
}
