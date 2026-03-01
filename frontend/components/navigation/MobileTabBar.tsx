/**
 * Mobile Tab Bar — Luxury Dark Glass
 * Thumb-friendly bottom navigation with gold active accents
 */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home,
  Sparkles,
  FolderOpen,
  Grid3X3,
  Phone
} from 'lucide-react'

const TABS = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'builder', icon: Sparkles, label: 'Builder', path: '/project-builder' },
  { id: 'dashboard', icon: FolderOpen, label: 'Projects', path: '/dashboard' },
  { id: 'services', icon: Grid3X3, label: 'Services', path: '/services' },
  { id: 'contact', icon: Phone, label: 'Contact', path: '/contact' }
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const router = useRouter()

  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/project-builder')) return 'builder'
    if (pathname.startsWith('/dashboard')) return 'dashboard'
    if (pathname.startsWith('/services')) return 'services'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }

  const activeTab = getActiveTab()

  return (
    <nav
      data-testid="mobile-tab-bar"
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      {/* Glass background */}
      <div className="bg-black/80 backdrop-blur-2xl border-t border-white/[0.08]">
        <div className="flex justify-around items-center h-[68px] max-w-lg mx-auto px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                data-testid={`tab-${tab.id}`}
                onClick={() => router.push(tab.path)}
                className="flex flex-col items-center justify-center flex-1 h-full relative group"
              >
                {/* Active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-2xl bg-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <Icon
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${
                      isActive ? 'text-[#C9A962]' : 'text-white/40 group-active:text-white/60'
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <span
                    className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-[#C9A962]' : 'text-white/40'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
        
        {/* Safe area spacer for iPhones with home indicator */}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </nav>
  )
}
