'use client'

import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { MapPin, Calendar, DollarSign, Home } from 'lucide-react'
import VideoGallery from '@/components/sections/VideoGallery'
import { useCms } from '@/hooks/useCms'

// Placeholder case studies - replace with real data from backend
const caseStudies = [
  {
    id: 1,
    slug: 'emirates-hills-villa-automation',
    title: 'Emirates Hills Villa - Complete Smart Home Integration',
    location: 'Emirates Hills, Dubai',
    propertyType: 'Luxury Villa',
    size: '12,000 sq ft',
    budget: 'AED 850,000',
    completionDate: '2024',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/612beb91b87e9b41f962da6eb8b91f5cf254e933d63cb3ef71ace28718b4eefa.png',
    excerpt: 'Full Crestron automation with Dolby Atmos cinema, Lutron lighting, multi-room audio, and integrated security for 6-bedroom villa.',
    features: ['Crestron Home Automation', 'Dolby Atmos Theater', 'Lutron Lighting Control', 'Multi-Room Sonos Audio', 'Smart Security System'],
    challenge: 'Integrating 150+ devices across large property with reliable network infrastructure',
    solution: 'Enterprise-grade networking with POE switches, Crestron control, and comprehensive testing',
    results: '35% energy savings, seamless control of all systems, family trained on operation'
  },
  {
    id: 2,
    slug: 'downtown-penthouse-control4',
    title: 'Downtown Dubai Penthouse - Control4 Smart Living',
    location: 'Downtown Dubai',
    propertyType: 'Penthouse',
    size: '5,500 sq ft',
    budget: 'AED 320,000',
    completionDate: '2024',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/b3570c7015b31682071eb87950ebfdff9602a7f133b63d501cecb160fe9478c8.png',
    excerpt: 'Control4 system with automated lighting scenes, climate control, and premium audio-visual integration.',
    features: ['Control4 Automation', 'Automated Shading', 'Smart Climate', 'KEF Audio System', 'Voice Control (Arabic & English)'],
    challenge: 'Working within existing finished apartment without major renovations',
    solution: 'Wireless solutions where needed, strategic cable runs, minimal disruption to finishes',
    results: 'Installation completed in 4 weeks, 28% reduction in electricity bills'
  },
  {
    id: 3,
    slug: 'palm-jumeirah-home-theater',
    title: 'Palm Jumeirah - Dedicated Home Cinema',
    location: 'Palm Jumeirah, Dubai',
    propertyType: 'Villa',
    size: 'Theater: 450 sq ft',
    budget: 'AED 280,000',
    completionDate: '2023',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/dacc01ae1dc53730f34dd34f41895419010586a0427c0ebf9fc72d8a4b27d191.png',
    excerpt: 'Dedicated cinema room with Sony 4K projector, Dolby Atmos 9.2.4 sound, acoustic treatment, and automated seating.',
    features: ['Sony VPL-VW915ES Projector', 'Dolby Atmos 9.2.4', 'Acoustic Treatment', 'Motorized Seating', 'Starlight Ceiling'],
    challenge: 'Achieving commercial-grade acoustics in residential setting',
    solution: 'Professional acoustic panels, bass traps, and calibrated DSP tuning',
    results: 'THX-certified performance, immersive viewing experience matching commercial cinemas'
  },
  {
    id: 4,
    slug: 'arabian-ranches-energy-efficient',
    title: 'Arabian Ranches - Energy-Efficient Smart Villa',
    location: 'Arabian Ranches, Dubai',
    propertyType: 'Villa',
    size: '8,000 sq ft',
    budget: 'AED 245,000',
    completionDate: '2024',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/62d43cba6589d11595604f8eb5a5612d5de0c231512a8ad4e0d58f8f69756c2f.png',
    excerpt: 'Focus on energy management with smart climate control, automated shading, and LED lighting throughout.',
    features: ['Smart HVAC Zoning', 'Automated Lutron Shades', 'LED Lighting Throughout', 'Energy Monitoring', 'Solar Integration'],
    challenge: 'Reducing high summer cooling costs while maintaining comfort',
    solution: 'Occupancy-based HVAC control, automated shading based on sun position, LED conversion',
    results: '42% reduction in summer cooling costs, AED 45,000 annual savings'
  },
  {
    id: 5,
    slug: 'business-bay-apartment-retrofit',
    title: 'Business Bay Apartment - Smart Retrofit',
    location: 'Business Bay, Dubai',
    propertyType: 'Apartment',
    size: '2,200 sq ft',
    budget: 'AED 95,000',
    completionDate: '2024',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/14bda4364129415663f1943a6e802b58725e25b08c852e41e66e988c494c88bf.png',
    excerpt: 'Affordable smart home upgrade for rented property with Control4 and wireless solutions.',
    features: ['Control4 Automation', 'Wireless Lighting Control', 'Nest Thermostats', 'Smart Door Locks', 'Sonos Audio'],
    challenge: 'Tenant-friendly installation without permanent modifications',
    solution: 'Wireless devices, plug-and-play solutions, easily removable components',
    results: 'Increased property rental value by 18%, tenant satisfaction improved'
  },
  {
    id: 6,
    slug: 'abu-dhabi-saadiyat-villa',
    title: 'Saadiyat Island Villa - Integrated Living',
    location: 'Saadiyat Island, Abu Dhabi',
    propertyType: 'Luxury Villa',
    size: '10,500 sq ft',
    budget: 'AED 680,000',
    completionDate: '2023',
    image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/936068f0524b9c9cc532513f25129e8f74338526303d701c7365d259f7061105.png',
    excerpt: 'Comprehensive automation with KNX lighting, multi-zone audio, outdoor entertainment, and pool automation.',
    features: ['KNX Automation', 'Outdoor Audio/Video', 'Pool Automation', 'Landscape Lighting', 'Gate/Garage Control'],
    challenge: 'Integrating indoor and outdoor systems with extreme heat considerations',
    solution: 'Weather-rated equipment, proper ventilation for AV racks, robust networking',
    results: 'Seamless indoor-outdoor living, all systems controlled from single interface'
  }
]

export default function CaseStudiesPage() {
  const cms = useCms('page_case_studies', null) as any
  const studies = cms?.studies || caseStudies

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pt-20">
      {/* Hero */}
      <section className="py-20 bg-gray-50 dark:bg-[#171717]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
                {cms?.hero_badge || 'Our Work'}
              </span>
              <h1 className="h1 uppercase mb-6">
                {cms?.hero_title || 'SMART HOME CASE STUDIES'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-zinc-500">
                {cms?.hero_subtitle || 'Real projects, real results. Explore how LEXA Lifestyle has transformed luxury properties across Dubai, Abu Dhabi, and UAE with cutting-edge smart home automation.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-20">
            {studies.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-[400px] overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
                      {project.propertyType}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin size={16} />
                      <span>{project.location}</span>
                    </div>

                    <h2 className="text-3xl uppercase font-bold mb-4 group-hover:text-gray-600 dark:text-zinc-500 transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-gray-600 dark:text-zinc-500 mb-6 leading-relaxed">
                      {project.excerpt}
                    </p>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Home size={16} />
                          <span>Property Size</span>
                        </div>
                        <p className="font-semibold">{project.size}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <DollarSign size={16} />
                          <span>Investment</span>
                        </div>
                        <p className="font-semibold">{project.budget}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Calendar size={16} />
                          <span>Completed</span>
                        </div>
                        <p className="font-semibold">{project.completionDate}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">KEY FEATURES</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-zinc-400">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-gray-50 p-6 mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">RESULTS</h4>
                      <p className="text-sm text-gray-700 dark:text-zinc-400">{project.results}</p>
                    </div>

                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="inline-block text-sm font-semibold text-gray-900 dark:text-white hover:underline"
                    >
                      View Full Case Study →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Case Studies Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#171717]">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="h2 uppercase mb-4">VIDEO CASE STUDIES</h2>
            <p className="text-xl text-gray-600 dark:text-zinc-500 max-w-3xl mx-auto">
              Watch complete walkthroughs of our smart home projects
            </p>
          </div>
          
          <VideoGallery
            category="case-study"
            limit={6}
            title=""
            cols={3}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 text-center">
          <h2 className="h2 uppercase mb-6">READY TO TRANSFORM YOUR PROPERTY?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s create a case study for your Dubai villa, penthouse, or apartment. Schedule a consultation with our smart home experts.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-gray-900 dark:text-white px-8 py-4 text-lg font-semibold hover:bg-gray-100 dark:bg-[#171717] transition-colors"
          >
            Book Free Consultation
          </a>
        </div>
      </section>
    </div>
  )
}
