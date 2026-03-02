'use client'

import { useState, useEffect } from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Sparkles, Monitor, Volume2, Cpu, ExternalLink } from 'lucide-react'
import { type Solution, type Project } from '@/lib/api'
import RelatedItemsCarousel from '@/components/sections/RelatedItemsCarousel'
import RelatedSolutions from '../components/RelatedSolutions'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'

interface SolutionClientProps {
  solution: Solution
  relatedProjects: Project[]
  otherSolutions: Solution[]
  productSolutions?: Solution[]
}

export default function SolutionClient({ 
  solution, 
  relatedProjects, 
  otherSolutions,
  productSolutions = []
}: SolutionClientProps) {
  const [showContactForm, setShowContactForm] = useState(false)
  const { addItem } = useRecentlyViewed()

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

  const galleryImages = solution.gallery_images || []
  const featureCardIcons = [Monitor, Volume2, Cpu]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Hero Section — Split layout */}
      <section className="relative overflow-hidden bg-[#0A0A0A] dark:bg-[#050505] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero-animate-badge inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                {solution.category}
              </span>
              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight leading-tight">
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
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    View Projects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <SafeImage src={solution.image} alt={solution.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Detailed Content — What We Deliver */}
      {solution.long_description && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold" data-testid="content-label">What We Deliver</span>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">
                    Complete Smart Systems for {solution.title}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    {solution.long_description}
                  </p>
                  
                  {/* Systems capability grid */}
                  {solution.features && solution.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {solution.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: i * 0.03 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#C9A962]/40 transition-colors"
                        >
                          <CheckCircle2 size={16} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side — Quick stats / highlights */}
                <div className="lg:col-span-2">
                  <div className="sticky top-28 space-y-5">
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Why Choose LEXA?</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Custom Design', desc: 'Every system engineered for your exact space' },
                          { label: 'Premium Brands', desc: `${(solution.brands || []).length}+ certified technology partners` },
                          { label: 'Full Integration', desc: 'AV, lighting, climate, security — one system' },
                          { label: 'UAE Expertise', desc: '10+ years in Dubai & Abu Dhabi projects' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#C9A962]/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-[#C9A962] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-gray-400">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold"
                      onClick={() => setShowContactForm(true)}
                      data-testid="sidebar-cta"
                    >
                      Request Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Cards — What You Get */}
      {solution.feature_cards && solution.feature_cards.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">System Categories</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">What You Get</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {solution.feature_cards.map((card, i) => {
                  const IconComp = featureCardIcons[i] || Sparkles
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group"
                    >
                      <div className="h-1 bg-gradient-to-r from-[#C9A962] to-[#C9A962]/30" />
                      <div className="p-7">
                        <div className="w-11 h-11 rounded-lg bg-gray-900 dark:bg-[#C9A962] flex items-center justify-center mb-5 group-hover:bg-[#C9A962] transition-colors">
                          <IconComp className="text-white dark:text-gray-900 group-hover:text-gray-900 transition-colors" size={20} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{card.description}</p>
                        {card.benefits && card.benefits.length > 0 && (
                          <ul className="space-y-2">
                            {card.benefits.map((benefit, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle2 size={14} className="text-[#C9A962] flex-shrink-0 mt-0.5" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products We Offer — Image-based clickable cards */}
      {productSolutions.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="products-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Solutions & Systems</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Products We Offer</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                  Explore the systems and technologies we integrate into {solution.title.toLowerCase()} environments
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productSolutions.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/solutions/${product.slug}`}
                      className="group block relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#C9A962]/60 hover:shadow-xl transition-all"
                      data-testid={`product-card-${product.slug}`}
                    >
                      <div className="relative aspect-[4/3]">
                        <SafeImage
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm leading-tight">{product.title}</h3>
                          <span className="text-[#C9A962] text-xs mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Explore <ExternalLink size={10} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brands We Partner With */}
      {solution.brands && solution.brands.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900" data-testid="brands-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Certified Partners</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Brands We Integrate</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  We work exclusively with world-class AV and automation manufacturers
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {solution.brands.map((brand, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="group"
                  >
                    <Link
                      href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex flex-col items-center justify-center p-5 h-24 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-[#C9A962]/60 hover:shadow-md transition-all"
                      data-testid={`brand-card-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#C9A962] transition-colors tracking-wide">
                        {brand}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Partner</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Inspirations Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950" data-testid="inspirations-section">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Design Ideas</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Inspirations</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Modern {solution.title.toLowerCase()} designs featuring the latest in smart technology
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  >
                    <div className={`relative ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
                      <SafeImage
                        src={typeof img === 'string' ? img : (img as any).url || (img as any).src}
                        alt={`${solution.title} inspiration ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <RelatedItemsCarousel title="Related Projects" items={relatedProjects} basePath="/projects" />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Got Questions?</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {solution.faqs && solution.faqs.length > 0 ? (
                solution.faqs.map((faq, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">What is {solution.title}?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {solution.title} is the integration of intelligent systems — lighting, audio-visual equipment,
                      sensors, climate control, and user interfaces — designed specifically for this room experience.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">How much does it cost in Dubai/UAE?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Costs vary based on room size, technology brands, and customization. Typical projects range from AED 25,000 to AED 85,000. Contact us for a detailed quote.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">How long does installation take?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Most projects take 2-6 weeks from consultation to completion. We provide full design, engineering, and installation planning.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Do you provide support & maintenance?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Yes. LEXA offers comprehensive AMC packages for ongoing support, software updates, system health checks, and priority service across Dubai and UAE.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#C9A962] text-xs uppercase tracking-widest font-semibold">Ready to Start?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Let&apos;s Design Your {solution.title} System
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get a bespoke proposal from our engineering team. Free consultation with no obligation.
            </p>
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8"
                onClick={() => setShowContactForm(true)}
                data-testid="cta-get-quote"
              >
                Get a Free Quote
              </Button>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Solutions */}
      {otherSolutions.length > 0 && (
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-5 sm:px-8 lg:px-16">
            <RelatedItemsCarousel title="Explore More Solutions" items={otherSolutions} basePath="/solutions" />
          </div>
        </section>
      )}

      <RelatedSolutions solutions={otherSolutions} currentSlug={solution.slug} />
    </div>
  )
}
