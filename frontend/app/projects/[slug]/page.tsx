'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Share2, Heart, MapPin, Calendar, Ruler } from 'lucide-react'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useCms } from '@/hooks/useCms'

interface Project {
  id: string
  title: string
  slug: string | null
  location: string
  year: string
  type?: string
  image: string
  images: string[]
  video_url?: string
  description: string
  challenge?: string
  solution?: string
  size?: string
  budget_range?: string
  completion_date?: string
  systems: string[]
  features: string[]
  results?: string[]
  brands: { name: string; logo?: string; category?: string }[]
  products: { name: string; category: string; brand?: string }[]
  testimony?: { quote: string; client_name: string; client_title?: string }
  category?: string
  client_name?: string
  consultant?: string
  contractor?: string
}

export default function ProjectDetailPage() {
  const cms = useCms('page_projects_detail', null)
  const params = useParams()
  const slug = params.slug as string
  const { addItem } = useRecentlyViewed()
  
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}`)
        if (!response.ok) throw new Error('Project not found')
        const data: Project = await response.json()
        setProject(data)
        
        addItem({
          id: data.id,
          type: 'project',
          slug: data.slug || slug,
          title: data.title,
          image: data.image,
          category: data.category
        })
        
        if (data.category) {
          const relatedRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?category=${data.category}&limit=6`
          )
          const related = await relatedRes.json()
          setRelatedProjects(related.filter((p: Project) => p.id !== data.id).slice(0, 3))
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to load project:', error)
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug, addItem])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const nextImage = () => {
    if (project) setLightboxIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    if (project) setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
        <div className="animate-pulse">
          <div className="w-full h-64 bg-gray-100 dark:bg-[#171717]"></div>
          <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-8">
            <div className="h-8 bg-gray-100 dark:bg-[#171717] rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-100 dark:bg-[#171717] rounded w-2/3 mb-8"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Not Found</h1>
          <Link href="/projects">
            <Button className="bg-[#C9A962] hover:bg-[#B8983F] text-white">Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const allImages = project.images.length > 0 ? project.images : (project.image ? [project.image] : [])
  
  // Determine the best hero image:
  // 1. If gallery/images array has items, prefer the first one (typically higher quality)
  // 2. Fall back to the main image field
  // 3. Use a placeholder if neither exists
  const heroImage = allImages.length > 0 ? allImages[0] : project.image

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]" data-testid="project-detail-page">
      {/* Hero Image */}
      <section className="pt-20">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gray-900">
          <SafeImage
            src={heroImage || project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto max-w-7xl">
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-3 transition-colors"
                data-testid="back-to-projects"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#C9A962]/90 text-white text-xs tracking-wider uppercase rounded-full">
                  {project.type || 'Residential'}
                </span>
                <span className="text-white/60 text-sm">{project.year}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight" data-testid="project-detail-title">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Gallery link */}
              {allImages.length > 1 && (
                <button 
                  onClick={() => openLightbox(0)}
                  className="text-sm text-[#C9A962] hover:text-[#B8983F] mb-8 underline underline-offset-4 transition-colors"
                  data-testid="view-gallery"
                >
                  View all images ({allImages.length})
                </button>
              )}

              {/* About */}
              <div className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-4">
                  About the project
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-zinc-400 leading-relaxed text-base lg:text-lg">
                    {project.description}
                  </p>
                  
                  {project.challenge && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">The Challenge</h3>
                      <p className="text-gray-700 dark:text-zinc-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </>
                  )}
                  
                  {project.solution && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">Our Solution</h3>
                      <p className="text-gray-700 dark:text-zinc-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </>
                  )}

                  {project.features && project.features.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">Key Highlights</h3>
                      <p className="text-gray-700 dark:text-zinc-400 leading-relaxed">
                        This project showcases our expertise in creating sophisticated smart home environments. 
                        {project.features.slice(0, 3).join('. ')}. 
                        Every detail was carefully considered to ensure seamless integration between aesthetics and technology.
                      </p>
                    </>
                  )}

                  {project.systems && project.systems.length > 0 && (
                    <p className="text-gray-700 dark:text-zinc-400 leading-relaxed">
                      The comprehensive smart home ecosystem integrates {project.systems.slice(0, 4).join(', ').toLowerCase()}
                      {project.systems.length > 4 ? ` and ${project.systems.length - 4} more systems` : ''}, 
                      all working in perfect harmony to create an intuitive and luxurious environment.
                    </p>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              {allImages.length > 1 && (
                <div className="mb-10">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-4">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {allImages.slice(0, 10).map((img, idx) => {
                      const isWide = idx === 0 || idx === 4
                      return (
                        <div 
                          key={idx}
                          className={`relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-[#171717] ${
                            isWide ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                          }`}
                          onClick={() => openLightbox(idx)}
                          data-testid={`gallery-image-${idx}`}
                        >
                          <SafeImage
                            src={img}
                            alt={`${project.title} - Image ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                          {idx === 9 && allImages.length > 10 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white text-lg font-medium">+{allImages.length - 10} more</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Systems */}
              {project.systems && project.systems.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-4">
                    Systems Implemented
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.systems.map((system, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-400 text-sm rounded-full border border-gray-200 dark:border-white/10"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div className="mb-10 bg-gray-50 dark:bg-white/[0.03] p-6 rounded-lg border border-gray-200 dark:border-white/[0.06]">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-4">
                    Results & Impact
                  </h2>
                  <ul className="space-y-2">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-zinc-400">
                        <span className="text-[#C9A962] mt-1">&#10003;</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 py-6 border-t border-b border-gray-200 dark:border-white/10">
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-zinc-500 hover:text-[#C9A962] transition-colors">
                  <Heart className="h-4 w-4" />
                  Save
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-zinc-500 hover:text-[#C9A962] transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                
                {/* Project Info */}
                <div className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-6 border border-gray-200 dark:border-white/[0.06]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-5">
                    Project Info
                  </h3>
                  <div className="space-y-4">
                    {project.client_name && (
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Client</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{project.client_name}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Category</p>
                        <p className="text-sm font-medium text-[#C9A962]">{project.type || 'Residential'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-gray-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Location</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{project.location}</p>
                      </div>
                    </div>
                    {project.size && (
                      <div className="flex items-start gap-3">
                        <Ruler size={14} className="text-gray-400 mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Size</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{project.size}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <Calendar size={14} className="text-gray-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Completed</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{project.completion_date || project.year}</p>
                      </div>
                    </div>
                    {project.budget_range && (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Investment</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{project.budget_range}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Brands */}
                {project.brands && project.brands.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-4">
                      Premium Brands
                    </h3>
                    <div className="space-y-3">
                      {project.brands.slice(0, 6).map((brand, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {brand.logo ? (
                            <div className="relative w-12 h-12 rounded flex items-center justify-center p-1">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={brand.logo} 
                                alt={brand.name} 
                                width={40} 
                                height={40} 
                                className="object-contain brand-logo-white"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-400">{brand.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-white">{brand.name}</p>
                            {brand.category && <p className="text-xs text-gray-400">{brand.category}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-[#0A0A0A] text-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Start Your Project</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Let us create something similar for your space.
                  </p>
                  <Link href="/consultation" className="block" data-testid="detail-cta">
                    <Button className="w-full bg-[#C9A962] hover:bg-[#B8983F] text-white">
                      Get Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0A0A0A]">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-7xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C9A962] mb-8">
              Similar Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((rp) => (
                <Link 
                  key={rp.id} 
                  href={`/projects/${rp.slug || rp.id}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] bg-gray-200 dark:bg-[#171717] overflow-hidden rounded-lg mb-3">
                    <SafeImage
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs text-[#C9A962] mb-1 block uppercase tracking-wider">{rp.type || 'Residential'}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#C9A962] transition-colors mb-1">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-500">{rp.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black overflow-hidden" style={{ height: '100vh', maxHeight: '100vh' }}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            data-testid="lightbox-close"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="absolute top-4 left-4 z-10 text-white text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Main image area */}
          <div className="absolute inset-0 top-12 bottom-24 flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-6xl">
              <SafeImage
                src={allImages[lightboxIndex]}
                alt={`${project.title} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Thumbnail strip - fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/90 border-t border-white/10 px-4 py-2">
            <div className="h-full flex gap-2 overflow-x-auto items-center justify-center scrollbar-thin scrollbar-thumb-white/20">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all ${
                    idx === lightboxIndex ? 'ring-2 ring-[#C9A962]' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <SafeImage src={img} alt={`${project?.title || 'Project'} gallery image ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
