'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import SafeImage from '@/components/ui/SafeImage'
import { motion } from 'framer-motion'
import { 
  Check, 
  Sparkles, 
  Home,
  Zap,
  Shield,
  Tv,
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react'
import RelatedPackages from '../components/RelatedPackages'
import PricingDisclaimer from '@/components/shared/PricingDisclaimer'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

// Static color classes for Tailwind JIT to detect
const tierColorClasses = {
  essential: {
    border: 'border-blue-500',
    bg: 'bg-blue-500',
    bgHover: 'hover:bg-blue-600',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    borderHover: 'hover:border-blue-500',
    textHover: 'hover:text-blue-600',
    shadow: 'shadow-blue-500/20'
  },
  enhanced: {
    border: 'border-purple-500',
    bg: 'bg-purple-500',
    bgHover: 'hover:bg-purple-600',
    bgLight: 'bg-purple-50',
    text: 'text-purple-600',
    borderHover: 'hover:border-purple-500',
    textHover: 'hover:text-purple-600',
    shadow: 'shadow-purple-500/20'
  },
  highend: {
    border: 'border-amber-500',
    bg: 'bg-amber-500',
    bgHover: 'hover:bg-amber-600',
    bgLight: 'bg-amber-50',
    text: 'text-amber-600',
    borderHover: 'hover:border-amber-500',
    textHover: 'hover:text-amber-600',
    shadow: 'shadow-amber-500/20'
  }
}

const formatPrice = (price: number) => {
  return `AED ${(price / 1000).toFixed(0)}K`
}

export default function PropertyPackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [packageData, setPackageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedTier, setExpandedTier] = useState<string | null>(null) // Start with no tier expanded

  const handleSelectTier = (tierLevel: string) => {
    // Navigate to package builder with pre-selected property type and tier
    router.push(`/package-builder?property=${slug}&tier=${tierLevel}`)
  }

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/packages/property-types/${slug}`)
        const data = await response.json()
        setPackageData(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load package:', error)
        setLoading(false)
      }
    }

    if (slug) {
      fetchPackageDetails()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="animate-pulse">
          <div className="h-[60vh] bg-gray-200"></div>
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Package not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Centered */}
      <section className="relative h-[60vh] min-h-[400px]">
        <SafeImage
          src={packageData.image || packageData.hero_image}
          alt={packageData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-blue-400 font-medium mb-2 uppercase tracking-wider text-sm">{packageData.subtitle}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                {packageData.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                {packageData.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Specs */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <Home className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Property Size</p>
              <p className="font-bold text-gray-900 dark:text-white dark:text-white">{packageData.typical_size_range}</p>
            </div>
            {packageData.typical_features?.slice(0, 3).map((feature: string, i: number) => (
              <div key={i} className="text-center">
                <Check className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Tiers */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Package Tier
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Select the automation level that fits your lifestyle. Each tier builds on the previous, 
              adding more advanced features and capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            {packageData.tiers?.map((tier: any, index: number) => {
              const colors = tierColorClasses[tier.tier_level as keyof typeof tierColorClasses] || tierColorClasses.essential
              const isExpanded = expandedTier === tier.tier_level
              const isRecommended = tier.recommended

              return (
                <motion.div
                  key={tier.tier_level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`relative rounded-2xl border-2 ${
                    isRecommended 
                      ? `${colors.border} shadow-xl lg:scale-105` 
                      : 'border-gray-200 hover:border-gray-300'
                  } transition-all duration-300 bg-white self-start`}
                >
                  {isRecommended && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 ${colors.bg} text-white text-sm font-bold rounded-full z-10`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {tier.tier_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{tier.tier_subtitle}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white dark:text-white">
                          {formatPrice(tier.base_price_aed)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">+</span>
                      </div>
                      <p className="text-sm text-gray-500">{tier.typical_rooms_count}</p>
                    </div>

                    {/* Core Features Preview */}
                    <div className="space-y-3 mb-6">
                      <FeatureSection 
                        icon={Zap} 
                        title="Lighting" 
                        count={tier.lighting_features?.length || 0}
                        colors={colors}
                      />
                      <FeatureSection 
                        icon={Home} 
                        title="Climate" 
                        count={tier.climate_features?.length || 0}
                        colors={colors}
                      />
                      <FeatureSection 
                        icon={Shield} 
                        title="Security" 
                        count={tier.security_features?.length || 0}
                        colors={colors}
                      />
                      <FeatureSection 
                        icon={Tv} 
                        title="Entertainment" 
                        count={tier.entertainment_features?.length || 0}
                        colors={colors}
                      />
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => setExpandedTier(isExpanded ? null : tier.tier_level)}
                      className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition-colors mb-4 flex items-center justify-center gap-2 ${
                        isRecommended
                          ? `${colors.bg} text-white ${colors.bgHover} ${colors.border}`
                          : `border-gray-300 text-gray-700 dark:text-gray-300 ${colors.borderHover} ${colors.textHover}`
                      }`}
                    >
                      {isExpanded ? 'Hide Details' : 'View Full Features'}
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>

                    {/* CTA Button */}
                    <button 
                      onClick={() => handleSelectTier(tier.tier_level)}
                      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                        isRecommended
                          ? `${colors.bg} text-white ${colors.bgHover} shadow-lg hover:shadow-xl`
                          : `bg-gray-100 text-gray-900 dark:text-white hover:bg-gray-200`
                      }`}
                    >
                      Select {tier.tier_name}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 p-6 lg:p-8 bg-gray-50 dark:bg-gray-800"
                    >
                      <DetailedFeatureList title="Lighting Features" features={tier.lighting_features || []} />
                      <DetailedFeatureList title="Climate Features" features={tier.climate_features || []} />
                      <DetailedFeatureList title="Security Features" features={tier.security_features || []} />
                      <DetailedFeatureList title="Entertainment Features" features={tier.entertainment_features || []} />
                      <DetailedFeatureList title="Additional Features" features={tier.additional_features || []} />
                      
                      {tier.included_specialty_count > 0 && (
                        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="font-bold text-amber-900 mb-2">
                            <Plus className="inline h-5 w-5 mr-2" />
                            Choose {tier.included_specialty_count} Specialty Rooms
                          </p>
                          <p className="text-sm text-amber-800">
                            Wine Room, Vault, Game Room, Home Bar, Spa, Gym, and more
                          </p>
                        </div>
                      )}

                      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">Support Level:</p>
                        <p>{tier.support_level}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Related Packages Section */}
      <RelatedPackages currentSlug={slug} currentTitle={packageData.title} />

      {/* Pricing Disclaimer */}
      <PricingDisclaimer variant="light" />
    </div>
  )
}

function FeatureSection({ icon: Icon, title, count, colors }: any) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className={`p-2 rounded-lg ${colors.bgLight}`}>
        <Icon className={`h-4 w-4 ${colors.text}`} />
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white dark:text-white">{title}</p>
        <p className="text-gray-500">{count} features</p>
      </div>
    </div>
  )
}

function DetailedFeatureList({ title, features }: { title: string; features: string[] }) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="font-bold text-gray-900 dark:text-white mb-3">{title}</h4>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
