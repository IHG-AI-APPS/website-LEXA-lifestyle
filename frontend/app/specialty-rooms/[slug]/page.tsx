'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Sparkles, Package, DollarSign, ArrowRight } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

export default function SpecialtyRoomDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/packages/specialty-rooms`)
        const data = await response.json()
        const foundRoom = data.specialty_rooms?.find((r: any) => r.slug === slug)
        setRoom(foundRoom)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load room:', error)
        setLoading(false)
      }
    }

    if (slug) {
      fetchRoomDetails()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="animate-pulse">
          <div className="h-[50vh] bg-gray-200"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Specialty room not found</p>
          <Link href="/specialty-rooms" className="text-blue-600 hover:underline">
            View all specialty rooms
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <p className="text-blue-400 font-medium mb-2">{room.category}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {room.name}
              </h1>
              <p className="text-xl text-gray-200">
                {room.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Starting Price</p>
              <p className="font-bold text-gray-900">AED {(room.base_price_aed / 1000).toFixed(0)}K</p>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Features Included</p>
              <p className="font-bold text-gray-900">{room.features?.length || 0}</p>
            </div>
            <div className="text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="text-sm text-gray-600">Typical Size</p>
              <p className="font-bold text-gray-900">{room.typical_size}</p>
            </div>
            <div className="text-center">
              <Check className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Installation</p>
              <p className="font-bold text-gray-900">Professional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {room.long_description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Components */}
            {room.typical_components && room.typical_components.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Typical Components
                </h2>
                <div className="bg-blue-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {room.typical_components.map((component: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Integration */}
            {room.integration_with && room.integration_with.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Integrates With
                </h2>
                <div className="flex flex-wrap gap-3">
                  {room.integration_with.map((system: string, i: number) => (
                    <div
                      key={i}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
                    >
                      {system}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Add This to Your Package
              </h3>
              <p className="text-gray-700 mb-6">
                This specialty room can be added to any smart home package. 
                High-End tier customers choose 3 specialty rooms at no additional cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-colors font-medium"
                >
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Other Specialty Rooms
            </h2>
            <Link 
              href="/specialty-rooms"
              className="text-blue-600 hover:underline"
            >
              View all specialty rooms →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
