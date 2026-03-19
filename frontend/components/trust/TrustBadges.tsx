'use client'

import { Shield, Award, Clock, Users, CheckCircle, Star } from 'lucide-react'

interface TrustBadgesProps {
  variant?: 'horizontal' | 'compact' | 'footer'
  showAll?: boolean
}

const badges = [
  {
    icon: Clock,
    label: '10+ Years',
    description: 'Industry Experience'
  },
  {
    icon: Award,
    label: 'Certified',
    description: 'CEDIA Member'
  },
  {
    icon: Shield,
    label: 'Official Dealer',
    description: 'Savant • Control4 • Crestron'
  },
  {
    icon: Users,
    label: '500+',
    description: 'Projects Completed'
  },
  {
    icon: CheckCircle,
    label: '24/7',
    description: 'Support Available'
  },
  {
    icon: Star,
    label: '4.9★',
    description: 'Client Rating'
  }
]

export function TrustBadges({ variant = 'horizontal', showAll = true }: TrustBadgesProps) {
  const displayBadges = showAll ? badges : badges.slice(0, 4)

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 py-4">
        {displayBadges.slice(0, 4).map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-zinc-400">
            <badge.icon className="w-4 h-4 text-[#C9A962]" />
            <span className="text-xs font-medium">{badge.label}</span>
            <span className="text-xs opacity-60">{badge.description}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-3 px-4 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
        {displayBadges.slice(0, 4).map((badge, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <badge.icon className="w-3.5 h-3.5 text-[#C9A962]" />
            <span className="text-xs font-medium text-white/90">{badge.label}</span>
          </div>
        ))}
      </div>
    )
  }

  // Horizontal (default)
  return (
    <div className="py-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-[#0A0A0A] dark:via-[#111] dark:to-[#0A0A0A] border-y border-gray-200 dark:border-zinc-800/50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
          {displayBadges.map((badge, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-3 group-hover:bg-[#C9A962]/20 transition-colors">
                <badge.icon className="w-5 h-5 text-[#C9A962]" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{badge.label}</div>
              <div className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Brand Partner Logos Strip
export function BrandPartnerStrip() {
  const partners = ['Savant', 'Control4', 'Crestron', 'Lutron', 'Bang & Olufsen', 'Sonos']
  
  return (
    <div className="py-6 bg-[#0A0A0A] border-b border-zinc-800/50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-widest text-zinc-500">Official Technology Partners</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {partners.map((partner, index) => (
            <span key={index} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Certification Badges for About/Footer
export function CertificationBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
        <Award className="w-5 h-5 text-[#C9A962]" />
        <div>
          <div className="text-xs font-semibold text-white">CEDIA</div>
          <div className="text-[10px] text-zinc-500">Member</div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
        <Shield className="w-5 h-5 text-[#C9A962]" />
        <div>
          <div className="text-xs font-semibold text-white">Savant</div>
          <div className="text-[10px] text-zinc-500">Authorized Dealer</div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
        <Shield className="w-5 h-5 text-[#C9A962]" />
        <div>
          <div className="text-xs font-semibold text-white">Control4</div>
          <div className="text-[10px] text-zinc-500">Certified Dealer</div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
        <Shield className="w-5 h-5 text-[#C9A962]" />
        <div>
          <div className="text-xs font-semibold text-white">Crestron</div>
          <div className="text-[10px] text-zinc-500">Integration Partner</div>
        </div>
      </div>
    </div>
  )
}
