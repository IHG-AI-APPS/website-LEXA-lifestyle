'use client'

import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

interface HeroBandProps {
  onPersonaClick?: () => void
}

export default function HeroBand({ onPersonaClick }: HeroBandProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2" data-testid="hero-cta-band">
      {/* Find Your Perfect Solution */}
      <button
        onClick={onPersonaClick}
        data-testid="band-find-solution"
        className="group flex items-center justify-center gap-3 py-4 sm:py-5 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-[#050505] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:from-[#D4B872] hover:to-[#F0E0B5]"
      >
        <Users size={16} strokeWidth={2} />
        Find Your Perfect Solution
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* View Projects */}
      <Link
        href="/projects"
        data-testid="band-view-projects"
        className="group flex items-center justify-center gap-3 py-4 sm:py-5 bg-gradient-to-r from-[#B89A52] to-[#C9A962] text-[#050505] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:from-[#C9A962] hover:to-[#D4B872] border-l border-[#050505]/10"
      >
        View Projects
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
