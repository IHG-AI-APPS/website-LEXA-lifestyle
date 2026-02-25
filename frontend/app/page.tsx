'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import HeroCurator from '@/components/gallery/HeroCurator'
import StatsSection from '@/components/homepage/StatsSection'
import PersonaModal from '@/components/sections/PersonaModal'
import { useCms } from '@/hooks/useCms'

const Noop = () => null
const TrustBadges = dynamic(() => import('@/components/social-proof/TrustBadges').catch(() => ({ default: Noop })))

// Lazy load below-the-fold components for performance
const SolutionsBentoGrid = dynamic(() => import('@/components/homepage/SolutionsBentoGrid').catch(() => ({ default: Noop })), {
  loading: () => <div className="h-[600px] bg-gray-50 dark:bg-gray-800" />
})
const TetrisProjects = dynamic(() => import('@/components/gallery/TetrisProjects').catch(() => ({ default: Noop })))
const CalculatorCardsSection = dynamic(() => import('@/components/homepage/CalculatorCardsSection').catch(() => ({ default: Noop })))
const ExperienceCentreCTA = dynamic(() => import('@/components/homepage/ExperienceCentreCTA').catch(() => ({ default: Noop })))
const RecentlyViewedSection = dynamic(() => import('@/components/widgets/RecentlyViewedSection').catch(() => ({ default: Noop })), {
  ssr: false
})
const SmartRecommendations = dynamic(() => import('@/components/widgets/SmartRecommendations').catch(() => ({ default: Noop })), {
  ssr: false
})
const TrustedInUAE = dynamic(() => import('@/components/sections/TrustedInUAE').catch(() => ({ default: Noop })), {
  loading: () => <div className="h-[300px] bg-gray-50 dark:bg-gray-800" />
})

export default function HomePage() {
  const cms = useCms('page_homepage', null)

  const [showPersonaModal, setShowPersonaModal] = useState(false)

  // Register service worker for offline support and caching
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <>
      {/* HERO - Above the Fold with Video Background */}
      <HeroCurator onPersonaClick={() => setShowPersonaModal(true)} />
      
      {/* TRUST BADGES - Quick social proof strip below hero */}
      <TrustBadges variant="compact" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 dark:border-gray-800" />
      
      {/* RECENTLY VIEWED - Personalized re-engagement (shows only if user has history) */}
      <RecentlyViewedSection maxItems={4} variant="horizontal" className="bg-gray-50 dark:bg-gray-900/50" />
      
      {/* SMART RECOMMENDATIONS - AI-powered suggestions based on browsing history */}
      <SmartRecommendations maxItems={4} variant="horizontal" className="bg-white dark:bg-gray-900" />
      
      {/* SOLUTIONS - Core offering showcase */}
      <SolutionsBentoGrid />
      
      {/* CALCULATOR CARDS - Simplified: Package Builder & Specialty Rooms */}
      <CalculatorCardsSection />
      
      {/* PROJECTS - Social proof through work */}
      <TetrisProjects />
      
      {/* TRUSTED IN UAE - Technology partners, Developer trust & Certifications */}
      <TrustedInUAE variant="full" showStats={true} />
      
      {/* STATS - Breathing space + social proof */}
      <StatsSection />
      
      {/* EXPERIENCE CENTRE CTA - Visit showroom + booking */}
      <ExperienceCentreCTA />
      
      {/* Persona Selection Modal */}
      <PersonaModal 
        isOpen={showPersonaModal} 
        onClose={() => setShowPersonaModal(false)}
      />
    </>
  )
}
