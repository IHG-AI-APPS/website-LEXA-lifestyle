'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import HeroCurator from '@/components/gallery/HeroCurator'
import StatsSection from '@/components/homepage/StatsSection'
import PersonaModal from '@/components/sections/PersonaModal'

const TrustBadges = dynamic(() => import('@/components/social-proof/TrustBadges'))

// Lazy load below-the-fold components for performance
const SolutionsBentoGrid = dynamic(() => import('@/components/homepage/SolutionsBentoGrid'), {
  loading: () => <div className="h-[600px] bg-gray-50" />
})
const TetrisProjects = dynamic(() => import('@/components/gallery/TetrisProjects'))
const CalculatorCardsSection = dynamic(() => import('@/components/homepage/CalculatorCardsSection'))
const ExperienceCentreCTA = dynamic(() => import('@/components/homepage/ExperienceCentreCTA'))
const RecentlyViewedSection = dynamic(() => import('@/components/widgets/RecentlyViewedSection'), {
  ssr: false
})
const SmartRecommendations = dynamic(() => import('@/components/widgets/SmartRecommendations'), {
  ssr: false
})
const TrustedInUAE = dynamic(() => import('@/components/sections/TrustedInUAE'), {
  loading: () => <div className="h-[300px] bg-gray-50" />
})

export default function HomePage() {
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
      <TrustBadges variant="compact" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800" />
      
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
