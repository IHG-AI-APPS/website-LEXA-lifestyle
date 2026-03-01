'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { Calculator, TrendingUp, Package, Sparkles, ArrowRight, Brain, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''
const ICON_MAP: Record<string, any> = { Calculator, TrendingUp, Package, Sparkles, Brain, Zap }

const DEFAULT_FEATURED = {
  title: 'Smart Project Builder',
  description: 'AI-powered consultant-grade system that analyzes your needs and creates intelligent architecture proposals with 650+ features',
  href: '/project-builder',
  cta: 'Start Building',
  badge: 'NEW',
  icon: 'Brain'
}

const DEFAULT_TOOLS = [
  { icon: 'Package', title: 'Package Builder', description: 'Design your complete smart home package step-by-step with live pricing', href: '/package-builder', cta: 'Build Your Package', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop' },
  { icon: 'Sparkles', title: 'Specialty Rooms', description: 'Explore 22 premium specialty room automation solutions', href: '/specialty-rooms', cta: 'Explore Rooms', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85&auto=format&fit=crop' },
  { icon: 'Calculator', title: 'Cost Calculator', description: 'Quick estimate your smart home investment', href: '/calculator', cta: 'Calculate Cost', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop' },
  { icon: 'TrendingUp', title: 'ROI Calculator', description: 'Analyze your return on investment over time', href: '/roi-calculator', cta: 'Calculate ROI', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop' }
]

const GRADIENTS = [
  'from-amber-900/80 via-amber-800/70 to-transparent',
  'from-black via-black/80 to-black/30',
  'from-black via-black/80 to-black/30',
  'from-emerald-900/80 via-emerald-800/70 to-transparent'
]

export default function CalculatorCardsSection() {
  const [cmsData, setCmsData] = useState<any>(null)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cms/sections/homepage_calculator_cards`)
      .then(r => r.json())
      .then(d => { if (d?.value) setCmsData(d.value) })
      .catch(() => {})
  }, [])

  const featuredData = cmsData?.featured_tool || DEFAULT_FEATURED
  const toolsData = cmsData?.tools?.length ? cmsData.tools : DEFAULT_TOOLS

  const FeaturedIcon = ICON_MAP[featuredData.icon] || Brain
  const featuredTool = {
    icon: FeaturedIcon,
    title: featuredData.title,
    description: featuredData.description,
    href: featuredData.href,
    cta: featuredData.cta,
    badge: featuredData.badge,
    gradient: 'from-[#0A0A0A] via-[#111111] to-[#0A0A0A]'
  }

  const tools = toolsData.map((t: any, i: number) => ({
    icon: ICON_MAP[t.icon] || Package,
    title: t.title,
    description: t.description,
    href: t.href,
    cta: t.cta,
    image: t.image,
    gradient: GRADIENTS[i % GRADIENTS.length]
  }))

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-[#050505]">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
            Planning & Design Tools
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Explore our tools to plan, calculate costs, and build your perfect smart home solution
          </p>
        </motion.div>

        {/* Featured: Smart Project Builder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href={featuredTool.href} className="block group">
            <div className={`relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111111] rounded-2xl border border-[#C9A962]/20`}>
              {/* Subtle gold glow */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A962]/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A962]/20 rounded-full blur-3xl" />
              </div>
              
              <div className="relative p-6 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Icon */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Brain className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-[#C9A962] rounded-full">
                    <Zap className="w-3 h-3 text-black" />
                    <span className="text-xs font-bold text-black">AI</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading">
                      {featuredTool.title}
                    </h3>
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/20 text-white rounded-full">
                      {featuredTool.badge}
                    </span>
                  </div>
                  <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">
                    {featuredTool.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#C9A962]" />
                      8-step guided flow
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#C9A962]" />
                      650+ smart features
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#C9A962]" />
                      Instant AI proposal
                    </div>
                  </div>

                  <Button 
                    className="bg-[#C9A962] hover:bg-[#E8DCC8] text-black font-semibold py-6 px-8 transition-all duration-300 group-hover:shadow-lg rounded-none"
                    size="lg"
                    data-testid="homepage-project-builder-cta"
                  >
                    <span>{featuredTool.cta}</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other Tools - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="min-w-[80vw] snap-center flex-shrink-0"
              >
                <Link href={tool.href} className="block group">
                  <div className="relative h-[280px] overflow-hidden rounded-2xl bg-gray-900">
                    <SafeImage
                      src={tool.image}
                      alt={tool.title}
                      fill
                      sizes="80vw"
                      className="object-cover"
                      loading="lazy"
                      quality={75}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30`} />
                    <div className="relative h-full flex flex-col items-center justify-end p-6 text-center">
                      <div className="inline-flex items-center justify-center w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl mb-3">
                        <tool.icon className="w-5 h-5 text-[#C9A962]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1.5">{tool.title}</h3>
                      <p className="text-white/70 text-xs mb-4 max-w-[240px]">{tool.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-[#C9A962] text-xs font-semibold uppercase tracking-wider">
                        {tool.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={tool.href} className="block group">
                <div className="relative h-[400px] overflow-hidden bg-gray-900">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${tool.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tool.gradient}`} />
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20">
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{tool.title}</h3>
                    <p className="text-white/80 text-sm mb-6">{tool.description}</p>
                    <Button 
                      className="w-full bg-[#C9A962] hover:bg-[#E8DCC8] text-black font-semibold py-6 transition-all duration-300 group-hover:shadow-lg rounded-none"
                      size="lg"
                    >
                      <span>{tool.cta}</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need expert guidance? <Link href="/consultation" className="text-[#1A1A1A] dark:text-white dark:text-white font-semibold hover:underline">Schedule a consultation</Link> with our team
          </p>
        </motion.div>
      </div>
    </section>
  )
}
