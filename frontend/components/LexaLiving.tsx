'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Users, Music, Sparkles, Home } from 'lucide-react'

export default function LexaLiving() {
  const [activeScene, setActiveScene] = useState(0)

  const lifestyleMoments = [
    {
      id: 'morning',
      title: 'Morning Awakening',
      icon: Sun,
      description: 'Your day begins gently',
      details: 'Curtains open to natural light. Climate adjusts to 22°C. Bathroom floor heating activates. Coffee machine starts brewing. Your playlist begins softly.',
      color: 'from-orange-400 to-yellow-400',
      image: '☀️'
    },
    {
      id: 'entertaining',
      title: 'Hosting Guests',
      icon: Users,
      description: 'Effortless entertaining',
      details: 'One touch sets perfect ambiance. Outdoor lighting illuminates. Pool features activate. Music flows through garden speakers. Temperature optimizes.',
      color: 'from-purple-500 to-pink-500',
      image: '🥂'
    },
    {
      id: 'cinema',
      title: 'Cinema Evening',
      icon: Sparkles,
      description: 'Private screening experience',
      details: 'Lights dim automatically. Projector descends. Dolby Atmos activates. Climate cools. Phone notifications pause. Pure immersion begins.',
      color: 'from-red-500 to-purple-600',
      image: '🎬'
    },
    {
      id: 'bedtime',
      title: 'Evening Retreat',
      icon: Moon,
      description: 'Peaceful transition to rest',
      details: 'All doors lock. Security activates. Lights fade gradually. Temperature drops. White noise begins. Tomorrow\'s routine sets automatically.',
      color: 'from-indigo-600 to-blue-800',
      image: '🌙'
    },
    {
      id: 'away',
      title: 'Away Mode',
      icon: Home,
      description: 'Villa protection activated',
      details: 'All systems secure. Lighting simulates presence. Climate maintains efficiency. Security heightened. Remote monitoring active. Peace of mind guaranteed.',
      color: 'from-gray-700 to-gray-900',
      image: '🏠'
    },
    {
      id: 'party',
      title: 'Party Mode',
      icon: Music,
      description: 'Celebration ready',
      details: 'Synchronized lighting across villa. Multi-zone music control. Pool lighting choreographed. Bar area activated. Climate keeps perfect. Memories made effortlessly.',
      color: 'from-pink-500 to-red-500',
      image: '🎉'
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4">
              LEXA Living
            </h2>
            <p className="text-xl text-gray-400">
              Not technology. Moments.
            </p>
          </motion.div>

          {/* Scene Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {lifestyleMoments.map((moment, index) => (
              <button
                key={moment.id}
                onClick={() => setActiveScene(index)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  activeScene === index
                    ? 'border-white bg-white/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <moment.icon 
                  size={32} 
                  className={`mx-auto mb-2 ${activeScene === index ? 'text-white' : 'text-gray-400'}`}
                />
                <p className={`text-sm font-medium ${activeScene === index ? 'text-white' : 'text-gray-400'}`}>
                  {moment.title}
                </p>
              </button>
            ))}
          </div>

          {/* Active Scene Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${lifestyleMoments[activeScene].color} p-12 md:p-16`}
            >
              <div className="relative z-10">
                <div className="text-8xl mb-6 text-center">
                  {lifestyleMoments[activeScene].image}
                </div>
                
                <h3 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
                  {lifestyleMoments[activeScene].title}
                </h3>
                
                <p className="text-xl text-center mb-8 text-white/90">
                  {lifestyleMoments[activeScene].description}
                </p>

                <div className="max-w-3xl mx-auto">
                  <p className="text-lg leading-relaxed text-center text-white/80">
                    {lifestyleMoments[activeScene].details}
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>
            </motion.div>
          </AnimatePresence>

          {/* Automation Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">
              Powered by intelligent automation that learns your preferences
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
              <span>KNX</span>
              <span>•</span>
              <span>Control4</span>
              <span>•</span>
              <span>Crestron</span>
              <span>•</span>
              <span>Lutron</span>
              <span>•</span>
              <span>Savant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
