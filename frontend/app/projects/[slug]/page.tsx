'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Share2, Heart, ExternalLink } from 'lucide-react'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

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
        
        // Track this project as recently viewed
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
          setRelatedProjects(related.filter((p: Project) => p.id !== data.id).slice(0, 6))
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
  }

  const nextImage = () => {
    if (project) {
      setLightboxIndex((prev) => (prev + 1) % allImages.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="animate-pulse">
          <div className="w-full h-64 bg-gray-100"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="h-8 bg-gray-100 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-gray-100 rounded"></div>
              <div className="h-48 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const allImages = project.images.length > 0 ? project.images : [project.image]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image - Shorter with Title Overlay */}
      <section className="pt-20">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gray-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* Title on Hero */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto max-w-7xl">
              <Link 
                href={`/projects?category=${project.type || 'Residential'}`}
                className="inline-block text-sm font-medium text-white/80 hover:text-white mb-2 transition-colors"
              >
                {project.type || 'Residential'}
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Back Link */}
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>

              {/* See All Images Link - Only show if multiple images */}
              {allImages.length > 1 && (
                <button 
                  onClick={() => openLightbox(0)}
                  className="text-sm text-gray-500 hover:text-black mb-8 underline underline-offset-4"
                >
                  See all Images ({allImages.length})
                </button>
              )}

              {/* About Section - Extended */}
              <div className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  About the project
                </h2>
                <div className="prose prose-lg max-w-none space-y-4">
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {project.description}
                  </p>
                  
                  {project.challenge && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">The Challenge</h3>
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {project.challenge}
                      </p>
                    </>
                  )}
                  
                  {project.solution && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Our Solution</h3>
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {project.solution}
                      </p>
                    </>
                  )}

                  {/* Extended description from features */}
                  {project.features && project.features.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Key Highlights</h3>
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        This project showcases our expertise in creating sophisticated smart home environments. 
                        {project.features.slice(0, 3).join('. ')}. 
                        Every detail was carefully considered to ensure seamless integration between aesthetics and technology, 
                        delivering an unparalleled living experience for the client.
                      </p>
                    </>
                  )}

                  {/* Systems narrative */}
                  {project.systems && project.systems.length > 0 && (
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      The comprehensive smart home ecosystem integrates {project.systems.slice(0, 4).join(', ').toLowerCase()}
                      {project.systems.length > 4 ? ` and ${project.systems.length - 4} more systems` : ''}, 
                      all working in perfect harmony to create an intuitive and luxurious environment.
                    </p>
                  )}
                </div>
              </div>

              {/* Image Gallery Tiles - Show more images */}
              {allImages.length > 1 && (
                <div className="mb-10">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {allImages.slice(0, 10).map((img, idx) => {
                      // First and 5th images span 2 columns for variety
                      const isWide = idx === 0 || idx === 4
                      return (
                        <div 
                          key={idx}
                          className={`relative cursor-pointer overflow-hidden bg-gray-100 ${
                            isWide ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                          }`}
                          onClick={() => openLightbox(idx)}
                        >
                          <Image
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
                  {allImages.length > 10 && (
                    <button 
                      onClick={() => openLightbox(0)}
                      className="mt-4 text-sm text-blue-600 hover:underline"
                    >
                      View all {allImages.length} images →
                    </button>
                  )}
                </div>
              )}

              {/* Systems & Features */}
              {project.systems && project.systems.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Systems Implemented
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.systems.map((system, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div className="mb-10 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Results & Impact
                  </h2>
                  <ul className="space-y-2">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 py-6 border-t border-b border-gray-200">
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors">
                  <Heart className="h-4 w-4" />
                  Save
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                
                {/* Project Info */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Project info
                  </h3>
                  <div className="space-y-4">
                    {project.client_name && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Client:</p>
                        <p className="text-sm font-medium text-gray-900">{project.client_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Industry:</p>
                      <Link href={`/projects?category=${project.type}`} className="text-sm font-medium text-blue-600 hover:underline">
                        {project.type || 'Residential'}
                      </Link>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Location:</p>
                      <p className="text-sm font-medium text-gray-900">{project.location}</p>
                    </div>
                    {project.size && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Size:</p>
                        <p className="text-sm font-medium text-gray-900">{project.size}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Completed On:</p>
                      <p className="text-sm font-medium text-gray-900">{project.completion_date || project.year}</p>
                    </div>
                    {project.budget_range && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Investment:</p>
                        <p className="text-sm font-medium text-gray-900">{project.budget_range}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Team / Brands */}
                {project.brands && project.brands.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                      Premium Brands
                    </h3>
                    <div className="space-y-3">
                      {project.brands.slice(0, 6).map((brand, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {brand.logo ? (
                            <div className="relative w-12 h-12 bg-gray-50 rounded flex items-center justify-center p-1">
                              <Image 
                                src={brand.logo} 
                                alt={brand.name} 
                                width={40} 
                                height={40} 
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-400">
                                {brand.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                            {brand.category && (
                              <p className="text-xs text-gray-400">{brand.category}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gray-900 text-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Start Your Project</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Let's create something similar for your space.
                  </p>
                  <Link href="/contact" className="block">
                    <Button className="w-full bg-white text-black hover:bg-gray-100">
                      Get Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 border-t bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-8">
              Similar Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <Link 
                  key={rp.id} 
                  href={`/projects/${rp.slug || rp.id}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden mb-3">
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs text-blue-600 mb-1 block">{rp.type || 'Residential'}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-gray-500">{rp.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
          
          {/* Navigation */}
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
          
          {/* Image */}
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
              <Image
                src={allImages[lightboxIndex]}
                alt={`${project.title} - Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
            <div className="flex gap-2 overflow-x-auto justify-center">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all ${
                    idx === lightboxIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
