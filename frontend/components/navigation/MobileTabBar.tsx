'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home,
  Sparkles,
  FolderOpen,
  Layers,
  Phone
} from 'lucide-react'

const TABS = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'builder', icon: Sparkles, label: 'Builder', path: '/project-builder' },
  { id: 'projects', icon: FolderOpen, label: 'Projects', path: '/projects' },
  { id: 'services', icon: Layers, label: 'Services', path: '/services' },
  { id: 'contact', icon: Phone, label: 'Contact', path: '/contact' }
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const router = useRouter()

  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/project-builder')) return 'builder'
    if (pathname.startsWith('/projects')) return 'projects'
    if (pathname.startsWith('/services')) return 'services'
    if (pathname.startsWith('/contact')) return 'contact'
    return ''
  }

  const activeTab = getActiveTab()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden" data-testid="mobile-tab-bar">
      {/* Floating pill container */}
      <div className="px-4 pb-[env(safe-area-inset-bottom,8px)] pt-0">
        <nav className="relative bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.6)] mx-auto max-w-sm">
          <div className="flex justify-around items-stretch h-[64px]">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  data-testid={`tab-${tab.id}`}
                  onClick={() => router.push(tab.path)}
                  className="flex flex-col items-center justify-center flex-1 relative group active:scale-95 transition-transform duration-150"
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-gradient-to-r from-transparent via-[#C9A962] to-transparent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className={`p-2 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#C9A962]/10' 
                        : 'bg-transparent'
                    }`}>
                      <Icon
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isActive ? 'text-[#C9A962]' : 'text-white/30 group-active:text-white/50'
                        }`}
                        strokeWidth={isActive ? 2.2 : 1.5}
                      />
                    </div>
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                        isActive ? 'text-[#C9A962]' : 'text-white/30'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
