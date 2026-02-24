'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { getSolution, getSolutions, getProjects, type Solution, type Project } from '@/lib/api'
import RelatedItemsCarousel from '@/components/sections/RelatedItemsCarousel'
import StatsGrid from '@/components/StatsGrid'

export default function SolutionDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [solution, setSolution] = useState<Solution | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [otherSolutions, setOtherSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load solution details
        const solutionData = await getSolution(slug)
        setSolution(solutionData)
        
        // Load related projects (projects that use this solution)
        const allProjects = await getProjects()
        const related = allProjects.filter(project => 
          project.systems.some(system => 
            system.toLowerCase().includes(solutionData.title.split(' ')[0].toLowerCase())
          )
        ).slice(0, 3)
        setRelatedProjects(related)
        
        // Load other solutions
        const allSolutions = await getSolutions()
        const others = allSolutions.filter(s => s.slug !== slug).slice(0, 4)
        setOtherSolutions(others)
        
        setLoading(false)
      } catch (err) {
        console.error('Failed to load solution:', err)
        setError('Solution not found')
        setLoading(false)
      }
    }
    
    loadData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-gray-400">Loading solution...</div>
      </div>
    )
  }

  if (error || !solution) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Solution Not Found</h1>
          <p className="text-gray-600 mb-8">The solution you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/solutions">
            <Button>View All Solutions</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6">
                  {solution.category}
                </div>
                
                <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                  {solution.title}
                </h1>
                
                <div className="h-px w-32 bg-gradient-to-r from-platinum to-transparent mb-8" />
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {solution.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-7"
                  onClick={() => window.location.href = '/contact'}
                >
                  Private Design Session
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[500px] lg:h-[600px] overflow-hidden"
              >
                <SafeImage
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover grayscale-[20%]"
                  quality={95}
                  priority
                />
                {/* Platinum accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-platinum/30 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsGrid stats={[
        { value: 500, suffix: '+', label: 'Installations' },
        { value: 98, suffix: '%', label: 'Satisfaction' },
        { value: 15, suffix: '+', label: 'Years Experience' },
        { value: 24, suffix: '/7', label: 'Support' }
      ]} />

      {/* Long Description Section */}
      {solution.long_description && (
        <section className="py-20 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-semibold mb-6">Overview</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {solution.long_description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Cards Section - Rich Content */}
      {solution.feature_cards && solution.feature_cards.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-5xl font-semibold mb-4">Comprehensive Features</h2>
                <p className="text-xl text-gray-600">
                  Everything you need for the ultimate {solution.title.toLowerCase()} experience
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.feature_cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 border border-gray-200 p-8 hover:border-charcoal transition-all duration-300"
                  >
                    <div className="mb-4">
                      <Sparkles className="text-charcoal" size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                    {card.benefits && card.benefits.length > 0 && (
                      <ul className="space-y-2">
                        {card.benefits.map((benefit, bIndex) => (
                          <li key={bIndex} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 size={16} className="text-charcoal flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-5xl font-semibold mb-4">Key Features</h2>
              <p className="text-xl text-gray-600">
                Everything you need for the ultimate {solution.title.toLowerCase()} experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solution.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <CheckCircle2 className="text-charcoal flex-shrink-0 mt-1" size={24} strokeWidth={2} />
                  <div>
                    <h3 className="text-lg font-medium mb-1">{feature}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Brands Section */}
      {solution.brands.length > 0 && (
        <section className="py-20 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-semibold mb-4">Premium Technology Partners</h2>
                <p className="text-xl text-gray-600">
                  We work with the world&apos;s leading brands
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-8"
              >
                {solution.brands.map((brand, index) => (
                  <div
                    key={index}
                    className="px-8 py-4 border border-gray-300 text-lg font-medium tracking-wide hover:border-charcoal transition-colors"
                  >
                    {brand}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {solution.benefits && solution.benefits.length > 0 ? (
        <section className="py-20 bg-charcoal text-white">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-5xl font-semibold mb-4">Why Choose This Solution</h2>
                <p className="text-xl text-gray-400">
                  The advantages that set {solution.title} apart
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Sparkles className="text-platinum mb-4" size={32} />
                    <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-charcoal text-white">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12"
              >
                <div>
                  <Sparkles className="text-platinum mb-4" size={32} />
                  <h3 className="text-2xl font-semibold mb-3">Professional Installation</h3>
                  <p className="text-gray-400">
                    Expert installation by certified technicians with meticulous attention to detail
                  </p>
                </div>
                <div>
                  <Sparkles className="text-platinum mb-4" size={32} />
                  <h3 className="text-2xl font-semibold mb-3">Seamless Integration</h3>
                  <p className="text-gray-400">
                    Works perfectly with your existing systems and future upgrades
                  </p>
                </div>
                <div>
                  <Sparkles className="text-platinum mb-4" size={32} />
                  <h3 className="text-2xl font-semibold mb-3">24/7 Support</h3>
                  <p className="text-gray-400">
                    Dedicated support team available whenever you need assistance
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">
                  Everything you need to know about {solution.title.toLowerCase()}
                </p>
              </motion.div>

              <div className="space-y-6">
                {solution.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {solution.use_cases && solution.use_cases.length > 0 && (
        <section className="py-20 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-4xl font-semibold mb-4">Real-World Applications</h2>
                <p className="text-xl text-gray-600">
                  See how {solution.title} transforms different properties
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {solution.use_cases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white border-2 border-gray-200 p-8 hover:border-charcoal transition-colors"
                  >
                    <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs Section */}
      {solution.technical_specs && Object.keys(solution.technical_specs).length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="text-4xl font-semibold mb-4">Technical Specifications</h2>
                <p className="text-xl text-gray-600">
                  Industry-leading technology and components
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(solution.technical_specs).map(([key, value], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <CheckCircle2 className="text-charcoal flex-shrink-0 mt-1" size={24} strokeWidth={2} />
                    <div>
                      <h3 className="text-lg font-semibold mb-1 capitalize">
                        {key.replace(/_/g, ' ')}
                      </h3>
                      <p className="text-gray-600">{value}</p>
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
        <section className="py-20">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl font-semibold mb-4">Featured Projects</h2>
                <p className="text-xl text-gray-600">
                  See how we&apos;ve implemented {solution.title} in real projects
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <div className="group">
                        <div className="relative h-64 overflow-hidden mb-4">
                          <SafeImage
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500">{project.location}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-semibold mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Book a free consultation with our experts to discuss your {solution.title.toLowerCase()} project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-7"
                  onClick={() => window.location.href = '/contact'}
                >
                  Private Design Session
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 px-12 py-7"
                  onClick={() => window.location.href = '/calculator'}
                >
                  Calculate Cost
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Solutions */}
      {otherSolutions.length > 0 && (
        <RelatedItemsCarousel
          items={otherSolutions.map(s => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            image: s.image,
            description: s.description
          }))}
          title="Other Solutions"
          basePath="/solutions"
        />
      )}
    </div>
  )
}
