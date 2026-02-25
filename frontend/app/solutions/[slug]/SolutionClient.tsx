'use client'

import { useState, useEffect } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { type Solution, type Project } from '@/lib/api'
import RelatedItemsCarousel from '@/components/sections/RelatedItemsCarousel'
import RelatedSolutions from '../components/RelatedSolutions'
import StatsGrid from '@/components/StatsGrid'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

interface SolutionClientProps {
  solution: Solution
  relatedProjects: Project[]
  otherSolutions: Solution[]
}

export default function SolutionClient({ 
  solution, 
  relatedProjects, 
  otherSolutions 
}: SolutionClientProps) {
  const [showContactForm, setShowContactForm] = useState(false)
  const { addItem } = useRecentlyViewed()

  // Track this solution as recently viewed
  useEffect(() => {
    if (solution) {
      addItem({
        id: solution.id || solution.slug,
        type: 'solution',
        slug: solution.slug,
        title: solution.title,
        image: solution.image,
        category: solution.category
      })
    }
  }, [solution, addItem])

  // Gallery images for visual sections
  const galleryImages = solution.gallery_images || []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section — Split layout with visible image */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* Left: Content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                {solution.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight">
                {solution.title}
              </h1>
              
              <p className="text-base text-gray-300 mb-8 max-w-lg leading-relaxed">
                {solution.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold"
                  onClick={() => setShowContactForm(true)}
                  data-testid="hero-cta-design"
                >
                  Get a Free Quote <ArrowRight className="ml-2" size={18} />
                </Button>
                <Link href="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    View Projects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right: Hero Image */}
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage
              src={solution.image}
              alt={solution.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Long Description with accent bar */}
      {solution.long_description && (
        <section className="py-14 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto flex gap-6">
              <div className="w-1 bg-[#C9A962] rounded-full flex-shrink-0 hidden sm:block" />
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {solution.long_description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid — Visual cards with numbered layout */}
      {solution.features && solution.features.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Capabilities</span>
                <h2 className="text-3xl font-semibold mt-2">Key Features</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {solution.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-[#C9A962]/40 hover:shadow-sm transition-all group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 dark:bg-[#C9A962] text-white dark:text-gray-900 flex items-center justify-center text-xs font-bold group-hover:bg-[#C9A962] group-hover:text-gray-900 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed pt-1">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Cards — Premium design */}
      {solution.feature_cards && solution.feature_cards.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">What&apos;s Included</span>
                <h2 className="text-3xl font-semibold mt-2">What You Get</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {solution.feature_cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow group"
                  >
                    {/* Top accent bar */}
                    <div className="h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/40" />
                    <div className="p-7">
                      <div className="w-10 h-10 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 group-hover:bg-[#C9A962] transition-colors">
                        <Sparkles className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{card.description}</p>
                      
                      {card.benefits && card.benefits.length > 0 && (
                        <ul className="space-y-2">
                          {card.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brands — Clean pill design */}
      {solution.brands && solution.brands.length > 0 && (
        <section className="py-14 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Trusted Technology</span>
              <h3 className="text-2xl font-semibold mt-2 mb-8">Premium Brands We Integrate</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {solution.brands.map((brand, index) => (
                  <span
                    key={index}
                    className="px-5 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-200 dark:border-gray-700 rounded-full hover:border-[#C9A962]/50 transition-colors"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-8 lg:px-16">
            <RelatedItemsCarousel
              title="Related Projects"
              items={relatedProjects}
              basePath="/projects"
            />
          </div>
        </section>
      )}

      {/* Other Solutions */}
      {otherSolutions.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <RelatedItemsCarousel
              title="Explore More Solutions"
              items={otherSolutions}
              basePath="/solutions"
            />
          </div>
        </section>
      )}

      {/* FAQ Section — Accordion style */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Got Questions?</span>
              <h2 className="text-3xl font-semibold mt-2">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-8">
              {/* Dynamic FAQs from database */}
              {solution.faqs && solution.faqs.length > 0 ? (
                solution.faqs.map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))
              ) : (
                /* Fallback generic FAQs if no database FAQs exist */
                <>
                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">What is {solution.title}?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      {solution.title} is the integration of intelligent systems — lighting, audio-visual equipment, 
                      sensors, climate control, and user interfaces — designed specifically for this room experience. 
                      It combines automation, convenience, and luxury to create the perfect environment.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">How much does {solution.title} cost in Dubai/UAE?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      Costs vary based on room size, technology brands, and customization level. Typical projects in UAE 
                      range from AED 25,000 to AED 85,000. We customize every installation to match your property 
                      requirements and budget. Contact us for a detailed quote.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">How long does installation take?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      Installation timeframes depend on project scope and complexity. Most projects take 2–6 weeks from 
                      initial consultation to completion. We provide full design, engineering, and installation planning 
                      before any work begins to ensure a smooth process.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">Can automation be added to existing rooms?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      Yes — retrofit automation packages are very common in UAE villas and apartments. Modern systems can 
                      be installed without major renovation. We specialize in adding smart technology to existing spaces 
                      with minimal disruption.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">Is this suitable for Dubai&apos;s climate?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      Absolutely. All our systems are specifically selected and configured for UAE&apos;s climate conditions. 
                      We use weatherproof outdoor components, climate-resistant materials, and ensure proper ventilation 
                      and cooling for indoor equipment.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">Do you provide support & maintenance?</h3>
                    <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">
                      Yes. LEXA Lifestyle offers comprehensive AMC (Annual Maintenance Contract) packages for ongoing 
                      support, software updates, system health checks, and priority service. Our local team provides 
                      fast response times across Dubai and UAE.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal to-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let our experts design the perfect {solution.title.toLowerCase()} for your space.
            </p>
            <Button
              size="lg"
              className="bg-platinum text-charcoal hover:bg-platinum/90"
              onClick={() => setShowContactForm(true)}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Related Solutions Section */}
      <RelatedSolutions solutions={otherSolutions} currentSlug={solution.slug} />
    </div>
  )
}
