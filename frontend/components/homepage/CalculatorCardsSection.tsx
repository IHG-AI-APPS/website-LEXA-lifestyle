'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calculator, TrendingUp, Package, Sparkles, ArrowRight, Brain, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CalculatorCardsSection() {
  const featuredTool = {
    icon: Brain,
    title: 'Smart Project Builder',
    description: 'AI-powered consultant-grade system that analyzes your needs and creates intelligent architecture proposals with 650+ features',
    href: '/project-builder',
    cta: 'Start Building',
    badge: 'NEW',
    gradient: 'from-blue-600 via-purple-600 to-indigo-600'
  }

  const tools = [
    {
      icon: Package,
      title: 'Package Builder',
      description: 'Design your complete smart home package step-by-step with live pricing',
      href: '/package-builder',
      cta: 'Build Your Package',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
      gradient: 'from-amber-900/80 via-amber-800/70 to-transparent'
    },
    {
      icon: Sparkles,
      title: 'Specialty Rooms',
      description: 'Explore 22 premium specialty room automation solutions',
      href: '/specialty-rooms',
      cta: 'Explore Rooms',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85&auto=format&fit=crop',
      gradient: 'from-purple-900/80 via-purple-800/70 to-transparent'
    },
    {
      icon: Calculator,
      title: 'Cost Calculator',
      description: 'Quick estimate your smart home investment',
      href: '/calculator',
      cta: 'Calculate Cost',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop',
      gradient: 'from-blue-900/80 via-blue-800/70 to-transparent'
    },
    {
      icon: TrendingUp,
      title: 'ROI Calculator',
      description: 'Analyze your return on investment over time',
      href: '/roi-calculator',
      cta: 'Calculate ROI',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop',
      gradient: 'from-emerald-900/80 via-emerald-800/70 to-transparent'
    }
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-[#0a0f1a]">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-white dark:text-white mb-4 font-heading">
            Planning & Design Tools
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 dark:text-gray-300 max-w-2xl mx-auto">
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
            <div className={`relative overflow-hidden bg-gradient-to-r ${featuredTool.gradient} rounded-2xl`}>
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
              
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                {/* Icon */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Brain className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-yellow-400 rounded-full">
                    <Zap className="w-3 h-3 text-yellow-900" />
                    <span className="text-xs font-bold text-yellow-900">AI</span>
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
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      8-step guided flow
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      650+ smart features
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      Instant AI proposal
                    </div>
                  </div>

                  <Button 
                    className="bg-white hover:bg-[#E8DCC8] text-[#1A1A1A] dark:text-white font-semibold py-6 px-8 transition-all duration-300 group-hover:shadow-lg"
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

        {/* Other Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
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
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${tool.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${tool.gradient}`} />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20">
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                      {tool.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-6">
                      {tool.description}
                    </p>

                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-white hover:bg-[#E8DCC8] text-[#1A1A1A] dark:text-white font-semibold py-6 transition-all duration-300 group-hover:shadow-lg"
                      size="lg"
                    >
                      <span>{tool.cta}</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Hover Border Effect */}
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
