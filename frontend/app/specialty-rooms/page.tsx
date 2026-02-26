'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { Wine, Shield, Gamepad2, Music, Briefcase, Sparkles, Dumbbell, Baby, Bed, Users, Waves, Speaker, Plus } from 'lucide-react'
import { useCms } from '@/hooks/useCms'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

const categoryIcons: Record<string, any> = {
  'wine-room': Wine,
  'vault-panic-room': Shield,
  'game-room': Gamepad2,
  'home-bar-club': Music,
  'executive-office': Briefcase,
  'private-spa': Sparkles,
  'home-gym': Dumbbell,
  'childrens-playroom': Baby,
  'master-suite-experience': Bed,
  'guest-wing-control': Users,
  'pool-garden-automation': Waves,
  'audiophile-music-room': Speaker
}

export default function SpecialtyRoomsPage() {
  const cms = useCms('page_specialty_rooms_listing', null)

  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/packages/specialty-rooms`)
      const data = await response.json()
      setRooms(data.specialty_rooms || [])
      setLoading(false)
    } catch (error) {
      console.error('Failed to load specialty rooms:', error)
      setLoading(false)
    }
  }

  const categories = ['all', 'Entertainment', 'Wellness', 'Security & Safety', 'Productivity', 'Family', 'Outdoor Living']
  
  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === filter)

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20" data-testid="specialty-rooms-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs uppercase tracking-widest mb-5">A La Carte Add-Ons</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight" data-testid="specialty-rooms-title">
              Specialty Room Automation
            </h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto mb-8">
              Elevate your smart home with bespoke automation for wine cellars, game rooms, 
              private gyms, spas, and more.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-xs text-gray-400">Price Range</p>
                <p className="font-bold text-[#C9A962]">AED 28K - 85K</p>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-xs text-gray-400">Total Options</p>
                <p className="font-bold text-[#C9A962]">{rooms.length} Rooms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b sticky top-16 bg-white dark:bg-gray-950 z-30">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex overflow-x-auto gap-2 py-4 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  filter === cat
                    ? 'bg-[#C9A962] text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Rooms' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room, index) => {
              const Icon = categoryIcons[room.slug] || Sparkles
              
              return (
                <motion.div
                  key={room.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    href={`/specialty-rooms/${room.slug}`}
                    className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <SafeImage
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <p className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">
                          +AED {(room.base_price_aed / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-xs font-medium text-blue-600 mb-2">{room.category}</p>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {room.description}
                      </p>

                      {/* Quick Features */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{room.features?.length || 0} features</span>
                        <span className="text-blue-600 font-medium group-hover:gap-2 flex items-center transition-all">
                          View Details
                          <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Customize Your Smart Home?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            These specialty rooms can be added to any package tier. 
            High-End tier includes your choice of ANY 3 rooms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Packages
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 dark:text-white rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 transition-colors font-medium"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
