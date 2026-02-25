'use client'

import SeoLandingPageTemplate from '@/components/templates/SeoLandingPageTemplate'
import { internalLinking } from '@/lib/internal-linking-data'

export default function AudioRoomsStudiosPage() {
  const links = internalLinking['audio-rooms-studios']
  
  return (
    <SeoLandingPageTemplate
      cmsKey="page_solutions_audio-rooms-studios"
      hero={{
        badge: "Professional Audio Spaces",
        title: "AUDIO ROOMS",
        titleHighlight: "& STUDIOS",
        subtitle: "Recording Studios. Podcast Rooms. Music Production.",
        description: "Professional audio room design and build for recording studios, podcast rooms, voice-over booths, and music production spaces with acoustic treatment.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
        primaryCTA: {
          text: "Design Audio Room",
          href: "/consultation"
        }
      }}
      audience={['Content Creators', 'Musicians & Producers', 'Podcasters', 'Voice-Over Artists']}
      problems={{
        items: [
          { problem: 'Poor Room Acoustics', impact: 'Echo, reflections, muddy recordings' },
          { problem: 'External Noise', impact: 'Traffic, AC noise contaminating recordings' },
          { problem: 'Amateur Setup', impact: 'Consumer equipment, inconsistent quality' },
          { problem: 'No Sound Isolation', impact: 'Sound leaking in/out, neighbors complaining' },
          { problem: 'Inefficient Layout', impact: 'Poor monitoring position, bad ergonomics' },
          { problem: 'Equipment Issues', impact: 'Unclear signal chain, cable mess' }
        ]
      }}
      deliverables={{
        items: [
          { icon: 'Music', title: 'Acoustic Treatment', desc: 'Bass traps, absorption panels, diffusers, proper room modes' },
          { icon: 'Mic', title: 'Professional Equipment', desc: 'Studio monitors, interfaces, microphones, preamps' },
          { icon: 'Headphones', title: 'Monitoring Systems', desc: 'Reference monitors, headphone distribution, talkback' },
          { icon: 'Radio', title: 'Sound Isolation', desc: 'Floating floors, decoupled walls, mass-loaded vinyl' },
          { icon: 'Waves', title: 'Room Calibration', desc: 'Measurement, EQ, speaker positioning, sweet spot' },
          { icon: 'Smartphone', title: 'Remote Recording', desc: 'Source-Connect, remote session capability' }
        ]
      }}
      process={{
        title: "Our Audio Room Build Process",
        subtitle: "From design to first session",
        steps: [
          { step: '01', title: 'Acoustic Assessment', desc: 'Room measurement, modal analysis, noise floor testing' },
          { step: '02', title: 'Design', desc: 'Treatment plan, equipment selection, layout optimization' },
          { step: '03', title: 'Construction', desc: 'Acoustic treatment installation, isolation work, equipment mounting' },
          { step: '04', title: 'Calibration', desc: 'Room tuning, monitor alignment, frequency response optimization' }
        ]
      }}
      section6={{
        type: 'custom',
        title: 'Audio Room Solutions',
        items: [
          { name: 'Podcast Room', subtitle: 'AED 40K - 80K', features: ['Basic Treatment', 'Podcast Microphones', 'Audio Interface', 'Monitors', 'Soundproofing'] },
          { name: 'Voice-Over Booth', subtitle: 'AED 60K - 120K', features: ['Professional Treatment', 'Studio Microphone', 'Preamp Chain', 'Full Isolation', 'Source-Connect Ready'] },
          { name: 'Recording Studio', subtitle: 'AED 150K+', features: ['Complete Acoustic Design', 'Control Room + Live Room', 'High-End Equipment', 'Floating Floor', 'Professional Calibration'] }
        ]
      }}
      trustSignals={{
        stats: [
          { number: '50+', label: 'Studios Built' },
          { number: 'Acoustic', label: 'Certified Engineers' },
          { number: '15+', label: 'Years Experience' },
          { number: 'Custom', label: 'Every Room' }
        ]
      }}
      conversion={{
        title: "Ready to Build Your Audio Room?",
        subtitle: "Get a detailed acoustic design and equipment proposal",
        primaryCTA: {
          text: "Request Audio Room Design",
          href: "/consultation"
        }
      }}
      relatedPersonas={links.relatedPersonas}
      relatedSolutions={links.relatedSolutions}
      geoPages={links.geoPages}
    />
  )
}
