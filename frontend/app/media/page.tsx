import VideoGallery from '@/components/sections/VideoGallery'
import { Metadata } from 'next'
import CmsReg from './CmsReg'
import { generateCmsMetadata } from '@/lib/cmsMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateCmsMetadata('seo_media', {
    title: 'Media Gallery | LEXA Lifestyle',
    description: 'Watch our smart home automation projects, client testimonials, and product demonstrations.',
  })
}

export default function MediaGalleryPage() {
  return (
    <>
      <CmsReg />
      <main className="min-h-screen pt-20 bg-white dark:bg-gray-950" data-testid="media-page">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
          <div className="container mx-auto px-8 lg:px-16 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">Video Library</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="media-title">Media Gallery</h1>
              <p className="text-base text-gray-300 max-w-lg mx-auto">Explore our smart home projects, client testimonials, and behind-the-scenes content</p>
            </div>
          </div>
        </section>

        <VideoGallery featured={true} limit={6} title="Featured Videos" description="Our most popular projects and testimonials" cols={3} />
        <VideoGallery category="case-study" limit={6} title="Project Case Studies" description="Complete project walkthroughs and transformations" cols={3} />
        <VideoGallery category="testimonial" limit={4} title="Client Testimonials" description="Hear from our satisfied customers" cols={2} />
        <VideoGallery category="service" limit={6} title="Services & Solutions" description="Learn about our smart home services" cols={3} />
        <VideoGallery limit={12} title="All Videos" description="Browse our complete video library" cols={4} />
      </main>
    </>
  )
}
