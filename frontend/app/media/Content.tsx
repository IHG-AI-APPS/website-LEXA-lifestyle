'use client'

import VideoGallery from '@/components/sections/VideoGallery'
import { useCms } from '@/hooks/useCms'

const fallback = {
  hero_badge: 'Video Library',
  hero_title: 'Media Gallery',
  hero_description: 'Explore our smart home projects, client testimonials, and behind-the-scenes content',
  sections: [
    { type: 'featured', limit: 6, title: 'Featured Videos', description: 'Our most popular projects and testimonials', cols: 3 },
    { type: 'case-study', limit: 6, title: 'Project Case Studies', description: 'Complete project walkthroughs and transformations', cols: 3 },
    { type: 'testimonial', limit: 4, title: 'Client Testimonials', description: 'Hear from our satisfied customers', cols: 2 },
    { type: 'service', limit: 6, title: 'Services & Solutions', description: 'Learn about our smart home services', cols: 3 },
    { type: 'all', limit: 12, title: 'All Videos', description: 'Browse our complete video library', cols: 4 },
  ],
}

export default function MediaContent() {
  const cms = useCms('page_media', fallback)

  const badge = cms?.hero_badge || fallback.hero_badge
  const title = cms?.hero_title || fallback.hero_title
  const desc = cms?.hero_description || fallback.hero_description
  const sections = cms?.sections?.length ? cms.sections : fallback.sections

  return (
    <main className="min-h-screen pt-20 bg-white dark:bg-gray-950" data-testid="media-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">{badge}</span>
            <h1 className="hero-animate-title text-4xl sm:text-5xl lg:text-6xl font-bold uppercase mb-5 tracking-tight" data-testid="media-title">{title}</h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto">{desc}</p>
          </div>
        </div>
      </section>

      {sections.map((sec: any, i: number) => (
        <VideoGallery
          key={i}
          {...(sec.type === 'featured' ? { featured: true } : sec.type !== 'all' ? { category: sec.type } : {})}
          limit={sec.limit}
          title={sec.title}
          description={sec.description}
          cols={sec.cols}
        />
      ))}
    </main>
  )
}
