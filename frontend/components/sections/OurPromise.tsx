'use client'

import { motion } from 'framer-motion'
import { Shield, Headphones, GraduationCap, Award, Building, Leaf } from 'lucide-react'

const promises = [
  {
    icon: Shield,
    title: 'Solutions',
    description: 'Complete luxury home automation solutions, bespoke cinema and AV system design, integrated smart home control across all major platforms.',
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Dedicated presales consultancy and 24/7 aftersales support, certified system integrators, rapid-response maintenance team.',
  },
  {
    icon: GraduationCap,
    title: 'Knowledge',
    description: 'Expertise in the latest smart home and luxury AV technologies, strong partnerships with leading global brands.',
  },
  {
    icon: Award,
    title: 'Value',
    description: 'Premium brands with unmatched warranties and service guarantees, transparent pricing, personalized experiences.',
  },
  {
    icon: Building,
    title: 'Facilities',
    description: 'State-of-the-art LEXA Experience Center, private cinema and immersive audio-visual zones, dedicated training space.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Energy-optimized automation, seamless integration with renewable energy systems, eco-certified materials.',
  },
]

export default function OurPromise() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-zinc-400 font-bold block mb-6">
            Why Choose LEXA
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-black dark:text-white">
            OUR PROMISE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-zinc-800 p-8 group hover:border-[#C9A962]/50 transition-all duration-300 rounded-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-[#C9A962]/10 flex items-center justify-center mb-6">
                <promise.icon className="w-6 h-6 text-[#C9A962] stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-black dark:text-white mb-4">
                {promise.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                {promise.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
