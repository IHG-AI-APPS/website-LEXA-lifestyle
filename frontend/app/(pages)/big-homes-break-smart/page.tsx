'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Smartphone, Users, Zap, DollarSign, Brain, Check, X } from 'lucide-react'
import Link from 'next/link'

export default function BigHomesBreakSmartPage() {
  const problems = [
    {
      icon: Smartphone,
      title: 'App Chaos',
      problem: '15+ different apps to control your home',
      impact: 'Confusion, frustration, and systems that nobody actually uses',
      stat: '78% of smart devices become abandoned within 6 months'
    },
    {
      icon: Users,
      title: 'Vendor Dependency',
      problem: 'Multiple contractors, each protecting their territory',
      impact: 'No single point of contact. Finger-pointing when issues arise.',
      stat: 'Average 8-12 different vendors involved in luxury installations'
    },
    {
      icon: Zap,
      title: 'Failure Cascades',
      problem: 'One system fails, everything else breaks',
      impact: 'Your climate control goes down, security cameras stop recording, lights won\'t turn off',
      stat: '3-5 days average downtime for system failures in fragmented setups'
    },
    {
      icon: Brain,
      title: 'No Intelligence',
      problem: 'Devices that don\'t learn, adapt, or communicate',
      impact: 'You manually adjust everything. The "smart" home isn\'t actually smart.',
      stat: '0 learning capability in traditional installations'
    },
    {
      icon: DollarSign,
      title: 'Hidden Costs',
      problem: 'Energy waste, water damage risk, security gaps',
      impact: 'Cooling bills 35% higher than optimized homes. Water leaks cause AED 500K+ in damage.',
      stat: 'AED 50,000-100,000 annual waste in non-intelligent systems'
    }
  ]

  const hiddenCosts = [
    {
      category: 'Energy Waste',
      cost: 'AED 30,000-50,000/year',
      description: 'Cooling empty rooms, inefficient scheduling, no occupancy detection',
      solution: 'AI learning reduces costs by 25-35%'
    },
    {
      category: 'Water Damage',
      cost: 'AED 500,000-2M risk',
      description: 'Undetected leaks in bathrooms, kitchens, pools causing structural damage',
      solution: 'Auto-shutoff prevents catastrophic losses'
    },
    {
      category: 'Security Gaps',
      cost: 'Invaluable',
      description: 'Cameras not recording, delayed alerts, no perimeter intelligence',
      solution: 'AI surveillance with predictive detection'
    },
    {
      category: 'System Downtime',
      cost: 'AED 20,000-40,000/year',
      description: 'Emergency callouts, vendor coordination, temporary fixes',
      solution: 'Proactive monitoring prevents 90% of failures'
    }
  ]

  const comparison = {
    traditional: [
      { feature: 'Multiple apps per system', status: false },
      { feature: 'Vendor lock-in and dependency', status: false },
      { feature: 'Static, non-learning systems', status: false },
      { feature: 'Reactive support only', status: false },
      { feature: 'No cross-system intelligence', status: false },
      { feature: 'Energy waste and inefficiency', status: false },
      { feature: 'Manual troubleshooting required', status: false }
    ],
    lexa: [
      { feature: 'One unified control interface', status: true },
      { feature: 'Single trusted partner for life', status: true },
      { feature: 'AI-driven learning and adaptation', status: true },
      { feature: 'Proactive 24/7 monitoring', status: true },
      { feature: 'Intelligence Layer connects everything', status: true },
      { feature: '25-35% energy cost reduction', status: true },
      { feature: 'White-glove concierge support', status: true }
    ]
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <AlertTriangle className="w-4 h-4" />
              Critical Challenge
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.95] mb-8">
              BIG HOMES
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">BREAK SMART</span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-red-400 to-transparent mb-8 mx-auto" />
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Traditional &quot;smart home&quot; solutions work fine for apartments. But luxury villas over 5,000 sq ft? 
              They collapse under their own complexity. Here&apos;s why—and how LEXA solves it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The 5 Critical Failures</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Why traditional smart home setups fail in luxury estates
            </p>
          </motion.div>

          <div className="space-y-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white border-2 border-gray-200 hover:border-red-400 transition-all duration-300 p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg inline-flex">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{problem.title}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm uppercase tracking-wider text-red-600 font-semibold">Problem:</span>
                          <p className="text-gray-700 mt-1">{problem.problem}</p>
                        </div>
                        <div>
                          <span className="text-sm uppercase tracking-wider text-orange-600 font-semibold">Impact:</span>
                          <p className="text-gray-700 mt-1">{problem.impact}</p>
                        </div>
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-sm text-gray-500 italic">📊 {problem.stat}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Hidden Costs Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hidden Cost of &quot;No Intelligence&quot;</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What you&apos;re paying for systems that don&apos;t communicate, learn, or protect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {hiddenCosts.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{item.category}</h3>
                  <span className="text-red-600 font-bold text-lg">{item.cost}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs uppercase tracking-wider text-green-600 font-semibold">LEXA Solution:</span>
                  <p className="text-sm text-gray-700 mt-1">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-red-100 border-2 border-red-300 p-8 max-w-3xl mx-auto"
          >
            <DollarSign className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Total Annual Hidden Cost</h3>
            <div className="text-4xl font-bold text-red-600 mb-2">AED 100,000 - 150,000</div>
            <p className="text-gray-700 dark:text-gray-300">
              Plus catastrophic risk exposure of AED 500K - 2M from undetected water damage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Traditional vs LEXA Approach</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The difference between installed and orchestrated
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 border-2 border-red-200 p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-red-800">Traditional Smart Home</h3>
              <div className="space-y-3">
                {comparison.traditional.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-700 dark:text-gray-300">{item.feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LEXA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 border-2 border-green-200 p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-green-800">LEXA Orchestration</h3>
              <div className="space-y-3">
                {comparison.lexa.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-700 dark:text-gray-300">{item.feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The LEXA Solution</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Intelligence Layer + One Partner = Luxury, Orchestrated
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">Unified Interface</h3>
              <p className="text-gray-400">One app. One partner. Complete control.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Intelligence</h3>
              <p className="text-gray-400">Systems that learn, predict, and protect.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">Lifelong Evolution</h3>
              <p className="text-gray-400">Continuous optimization and improvement.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
