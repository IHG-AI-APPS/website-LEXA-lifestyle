'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import HeroCurator from '@/components/gallery/HeroCurator'
import StatsSection from '@/components/homepage/StatsSection'
import PersonaModal from '@/components/sections/PersonaModal'
import { useCms } from '@/hooks/useCms'

const Noop = () => null
const TrustBadges = dynamic(() => import('@/components/social-proof/TrustBadges').catch(() => ({ default: Noop })))

const SolutionsBentoGrid = dynamic(() => import('@/components/homepage/SolutionsBentoGrid').catch(() => ({ default: Noop })), {
  loading: () => <div className="h-[600px] bg-[#050505]" />
})
const TetrisProjects = dynamic(() => import('@/components/gallery/TetrisProjects').catch(() => ({ default: Noop })))
const CalculatorCardsSection = dynamic(() => import('@/components/homepage/CalculatorCardsSection').catch(() => ({ default: Noop })))
const ExperienceCentreCTA = dynamic(() => import('@/components/homepage/ExperienceCentreCTA').catch(() => ({ default: Noop })))
const TrustedInUAE = dynamic(() => import('@/components/sections/TrustedInUAE').catch(() => ({ default: Noop })), {
  loading: () => <div className="h-[300px] bg-[#050505]" />
})
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').catch(() => ({ default: Noop })))

export default function HomePage() {
  const cms = useCms('page_homepage', null)

  const [showPersonaModal, setShowPersonaModal] = useState(false)

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen">
      <HeroCurator onPersonaClick={() => setShowPersonaModal(true)} />
      
      <TrustBadges variant="compact" className="bg-gray-50/80 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200 dark:border-white/5" />
      
      <SolutionsBentoGrid />
      
      <CalculatorCardsSection />
      
      <TetrisProjects />
      
      <TrustedInUAE variant="full" showStats={true} />
      
      <Testimonials />
      
      <StatsSection />
      
      <ExperienceCentreCTA />
      
      <PersonaModal 
        isOpen={showPersonaModal} 
        onClose={() => setShowPersonaModal(false)}
      />
    </div>
  )
}
