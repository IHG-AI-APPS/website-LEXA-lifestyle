'use client'

import SplineViewer from '@/components/SplineViewer'
import { Sparkles, Zap, Eye, Lightbulb } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

export default function Visualize3DPage() {
  const cms = useCms('page_visualize_3d', null)

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-20">
      {/* Header */}
      <section className="py-12 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Sparkles size={28} strokeWidth={2} />
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              3D SMART HOME VISUALIZATION
            </h1>
            
            <p className="text-xl text-gray-300">
              Explore our smart home solutions in interactive 3D
            </p>
          </div>
        </div>
      </section>

      {/* Main 3D Viewer */}
      <section className="py-16">
        <div className="container mx-auto px-8 lg:px-16">
          <SplineViewer />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Visualize in 3D?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-lg text-center border border-transparent dark:border-white/10">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-[#C9A962]/10 rounded-full">
                <Eye className="text-[#C9A962]" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Better Understanding</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                See exactly how devices will look and function in your space
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-lg text-center border border-transparent dark:border-white/10">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-[#C9A962]/10 dark:bg-[#C9A962]/30 rounded-full">
                <Lightbulb className="text-[#C9A962] dark:text-[#C9A962]" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Design Confidence</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Make informed decisions about device placement and aesthetics
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-lg text-center border border-transparent dark:border-white/10">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Zap className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Interactive Experience</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Click, zoom, and explore every detail of the smart home setup
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-lg text-center border border-transparent dark:border-white/10">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-[#C9A962]/10 rounded-full">
                <Sparkles className="text-[#C9A962]" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Realistic Preview</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Photorealistic rendering shows true-to-life integration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcases */}
      <section className="py-16">
        <div className="container mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Different Spaces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Living Room',
                description: 'Entertainment, lighting, climate control',
                devices: ['Smart TV', 'Voice Control', 'Mood Lighting', 'Smart Blinds'],
                gradient: 'from-[#1a1a1a] to-[#0a0a0a]'
              },
              {
                title: 'Kitchen',
                description: 'Appliances, safety, convenience',
                devices: ['Smart Appliances', 'Leak Sensors', 'Voice Assistant', 'Smart Lighting'],
                gradient: 'from-[#1a1a1a] to-[#0a0a0a]'
              },
              {
                title: 'Bedroom',
                description: 'Comfort, privacy, security',
                devices: ['Sleep Tracking', 'Smart Locks', 'Climate Control', 'Curtain Automation'],
                gradient: 'from-[#1a1a1a] to-[#0a0a0a]'
              },
            ].map((room, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 rounded-xl shadow-lg overflow-hidden border border-transparent dark:border-white/10">
                <div className={`h-32 bg-gradient-to-br ${room.gradient}`} />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{room.description}</p>
                  <div className="space-y-2">
                    {room.devices.map((device, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {device}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Bring Your Vision to Life?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get a personalized quote based on your space and requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/calculator'}
              className="bg-[#C9A962] text-black font-semibold px-8 py-4 rounded-lg hover:bg-[#E8DCC8] transition-all text-lg"
            >
              Get Your Free Quote
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-all text-lg"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
