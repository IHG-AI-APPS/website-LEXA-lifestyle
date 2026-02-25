import VideoGallery from '@/components/sections/VideoGallery'
import { Metadata } from 'next'
import CmsReg from './CmsReg'

export const metadata: Metadata = {
  title: 'Media Gallery',
  description: 'Watch our smart home automation projects, client testimonials, and product demonstrations. LEXA Lifestyle Dubai video gallery.'
}

export default function MediaGalleryPage() {
  return (
        <CmsReg />
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            MEDIA GALLERY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Explore our smart home projects, client testimonials, and behind-the-scenes content
          </p>
        </div>
      </section>

      {/* Featured Videos */}
      <VideoGallery
        featured={true}
        limit={6}
        title="Featured Videos"
        description="Our most popular projects and testimonials"
        cols={3}
      />

      {/* Case Studies */}
      <VideoGallery
        category="case-study"
        limit={6}
        title="Project Case Studies"
        description="Complete project walkthroughs and transformations"
        cols={3}
      />

      {/* Client Testimonials */}
      <VideoGallery
        category="testimonial"
        limit={4}
        title="Client Testimonials"
        description="Hear from our satisfied customers"
        cols={2}
      />

      {/* Service Videos */}
      <VideoGallery
        category="service"
        limit={6}
        title="Services & Solutions"
        description="Learn about our smart home services"
        cols={3}
      />

      {/* All Videos */}
      <VideoGallery
        limit={12}
        title="All Videos"
        description="Browse our complete video library"
        cols={4}
      />
    </main>
  )
}
