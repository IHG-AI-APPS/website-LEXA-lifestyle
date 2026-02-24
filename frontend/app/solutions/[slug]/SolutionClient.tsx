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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute inset-0 opacity-10">
          <SafeImage
            src={solution.image}
            alt={solution.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-platinum/10 border border-platinum/20 text-platinum text-xs uppercase tracking-widest mb-6">
                {solution.category}
              </span>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                {solution.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                {solution.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-platinum text-charcoal hover:bg-platinum/90"
                  onClick={() => setShowContactForm(true)}
                >
                  Design {solution.title.split(' ')[0]} System <ArrowRight className="ml-2" size={20} />
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
        </div>
      </section>

      {/* Long Description */}
      {solution.long_description && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                {solution.long_description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {solution.features && solution.features.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-semibold mb-12 text-center">Key Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solution.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-charcoal transition-colors"
                  >
                    <CheckCircle2 className="text-charcoal flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-800">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Cards (if available) */}
      {solution.feature_cards && solution.feature_cards.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-semibold mb-12 text-center">What You Get</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {solution.feature_cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700"
                  >
                    {card.icon && (
                      <Sparkles className="text-charcoal mb-4" size={32} />
                    )}
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    
                    {card.benefits && card.benefits.length > 0 && (
                      <ul className="space-y-2">
                        {card.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle2 size={16} className="text-charcoal flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brands */}
      {solution.brands && solution.brands.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-8">Premium Brands We Work With</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {solution.brands.map((brand, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-full"
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

      {/* FAQ Section - Dynamic from Database */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              {/* Dynamic FAQs from database */}
              {solution.faqs && solution.faqs.length > 0 ? (
                solution.faqs.map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))
              ) : (
                /* Fallback generic FAQs if no database FAQs exist */
                <>
                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">What is {solution.title}?</h3>
                    <p className="text-gray-700">
                      {solution.title} is the integration of intelligent systems — lighting, audio-visual equipment, 
                      sensors, climate control, and user interfaces — designed specifically for this room experience. 
                      It combines automation, convenience, and luxury to create the perfect environment.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">How much does {solution.title} cost in Dubai/UAE?</h3>
                    <p className="text-gray-700">
                      Costs vary based on room size, technology brands, and customization level. Typical projects in UAE 
                      range from AED 25,000 to AED 85,000. We customize every installation to match your property 
                      requirements and budget. Contact us for a detailed quote.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">How long does installation take?</h3>
                    <p className="text-gray-700">
                      Installation timeframes depend on project scope and complexity. Most projects take 2–6 weeks from 
                      initial consultation to completion. We provide full design, engineering, and installation planning 
                      before any work begins to ensure a smooth process.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">Can automation be added to existing rooms?</h3>
                    <p className="text-gray-700">
                      Yes — retrofit automation packages are very common in UAE villas and apartments. Modern systems can 
                      be installed without major renovation. We specialize in adding smart technology to existing spaces 
                      with minimal disruption.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">Is this suitable for Dubai&apos;s climate?</h3>
                    <p className="text-gray-700">
                      Absolutely. All our systems are specifically selected and configured for UAE&apos;s climate conditions. 
                      We use weatherproof outdoor components, climate-resistant materials, and ensure proper ventilation 
                      and cooling for indoor equipment.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-3">Do you provide support & maintenance?</h3>
                    <p className="text-gray-700">
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
