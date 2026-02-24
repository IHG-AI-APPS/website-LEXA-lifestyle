'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowRight, Sparkles, Shield, Zap, Network, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectBuilderLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(192, 192, 192, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(192, 192, 192, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent opacity-40" />

        <div className="container relative z-10 mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="mb-8">
                <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium">
                  Project Intelligence / AI-Powered
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-[clamp(3rem,10vw,10rem)] font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
                SMART
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">PROJECT</span>
                <br />
                BUILDER
              </h1>

              {/* Separator + Subtitle */}
              <div className="flex items-center gap-8 mb-12">
                <div className="h-px w-24 bg-gradient-to-r from-gray-300 to-transparent" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl">
                  Intelligence-driven specification for luxury automation.
                  <br className="hidden sm:block" />
                  693 features · Dependency resolution · Instant proposals
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link href="/project-builder/smart">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white border-0 px-10 py-7 text-sm font-medium tracking-wide transition-all duration-300 group"
                    data-testid="smart-builder-cta"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    NEW: Smart Builder
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/project-builder/start">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 px-10 py-7 text-sm font-medium tracking-wide transition-all duration-300 group"
                  >
                    Classic Builder
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-8 mt-12 text-xs text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span>Consultant-grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-600" />
                  <span>Instant output</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From concept to specification in minutes
              </p>
            </div>

            {/* Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: '01',
                  icon: Lightbulb,
                  title: 'Project DNA',
                  description: 'Define property type, area, stage, objectives. AI learns your requirements.'
                },
                {
                  number: '02',
                  icon: Network,
                  title: 'Intelligence Graph',
                  description: 'Analyzes 693 features. Resolves dependencies. Excludes conflicts.'
                },
                {
                  number: '03',
                  icon: Brain,
                  title: 'Proposals',
                  description: 'Three architectures: Value, Balanced, Flagship. Compare and select.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:border-gray-600 p-8 transition-all duration-500 hover:shadow-lg"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-mono text-sm font-medium">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <step.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors duration-300 mb-6" />

                  {/* Content */}
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 dark:border-gray-800 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Brain, label: 'AI Reasoning', desc: 'Every recommendation explained' },
                { icon: Shield, label: 'Dependency Mapping', desc: 'Auto-resolve prerequisites' },
                { icon: Sparkles, label: 'Smart Filtering', desc: '693 → 20-40 features' },
                { icon: Zap, label: 'Instant Proposals', desc: '3 architectures generated' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-600 hover:shadow-md transition-all duration-300"
                >
                  <feature.icon className="w-6 h-6 text-blue-600 mb-4" />
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 uppercase tracking-widest">{feature.label}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-gray-100 dark:border-gray-800 dark:border-gray-800">
        <div className="container mx-auto px-8 lg:px-16 max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
            Ready to begin?
          </h2>
          <Link href="/project-builder/start">
            <Button
              size="lg"
              className="bg-charcoal hover:bg-charcoal-light text-white border-0 px-12 py-7 text-sm font-medium tracking-wide transition-all duration-300"
            >
              Start Project Builder
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
