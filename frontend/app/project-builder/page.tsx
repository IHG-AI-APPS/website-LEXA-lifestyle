'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, ArrowRight, Sparkles, Shield, Zap, Network, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCms } from '@/hooks/useCms'

export default function ProjectBuilderLanding() {
  const cms = useCms('page_project_builder', null)

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      {/* Hero Section — Matching site-wide Dark Luxury pattern */}
      <section className="relative bg-[#0A0A0A] dark:bg-[#050505] pt-32 pb-20 overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(201, 169, 98, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(201, 169, 98, 0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero-animate-badge inline-block px-2.5 py-1 sm:px-3 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">
                AI-Powered Intelligence
              </span>

              <h1 className="hero-animate-title text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-5 tracking-tight text-white" data-testid="project-builder-title">
                SMART PROJECT BUILDER
              </h1>

              <p className="hero-animate-desc text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
                Intelligence-driven specification for luxury automation. 693 features, dependency resolution, and instant proposals.
              </p>

              <div className="hero-animate-cta flex flex-wrap gap-4 justify-center">
                <Link href="/project-builder/smart">
                  <Button
                    size="lg"
                    className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-8 py-6 text-sm uppercase tracking-wider"
                    data-testid="smart-builder-cta"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Smart Builder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/project-builder/start">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-sm uppercase tracking-wider"
                  >
                    Classic Builder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="hero-animate-extra flex flex-wrap items-center gap-6 mt-10 justify-center text-xs text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#C9A962]" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-[#C9A962]" />
                  <span>Consultant-grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#C9A962]" />
                  <span>Instant output</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#C9A962] font-semibold">Process</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mt-3 mb-4">
                How It Works
              </h2>
              <p className="text-base text-gray-600 dark:text-zinc-500 max-w-2xl mx-auto">
                From concept to specification in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '01', icon: Lightbulb, title: 'Project DNA', description: 'Define property type, area, stage, objectives. AI learns your requirements.' },
                { number: '02', icon: Network, title: 'Intelligence Graph', description: 'Analyzes 693 features. Resolves dependencies. Excludes conflicts.' },
                { number: '03', icon: Brain, title: 'Proposals', description: 'Three architectures: Value, Balanced, Flagship. Compare and select.' }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-8 text-center hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-[#C9A962]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <span className="text-xs text-[#C9A962] uppercase tracking-widest font-semibold">{step.number}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-500 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Brain, label: 'AI Reasoning', desc: 'Every recommendation explained' },
                { icon: Shield, label: 'Dependency Mapping', desc: 'Auto-resolve prerequisites' },
                { icon: Sparkles, label: 'Smart Filtering', desc: '693 to 20-40 features' },
                { icon: Zap, label: 'Instant Proposals', desc: '3 architectures generated' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 text-center hover:border-[#C9A962]/30 hover:shadow-md transition-all"
                >
                  <feature.icon className="w-6 h-6 text-[#C9A962] mx-auto mb-4" />
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-widest">{feature.label}</h4>
                  <p className="text-xs text-gray-600 dark:text-zinc-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0A0A0A] border-t border-white/5">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Ready to Begin?
          </h2>
          <p className="text-gray-400 mb-8">Start building your smart home specification today</p>
          <Link href="/project-builder/smart">
            <Button
              size="lg"
              className="bg-[#C9A962] text-gray-900 hover:bg-[#C9A962]/90 font-semibold px-10 py-6 text-sm uppercase tracking-wider"
            >
              Start Project Builder
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
