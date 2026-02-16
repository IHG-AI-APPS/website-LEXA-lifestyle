/**
 * Mobile Tab Bar - Bottom Navigation
 * Thumb-friendly navigation for mobile devices
 * Follows iOS/Android design patterns
 */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Home,
  Sparkles,
  FolderOpen,
  Settings,
  MessageCircle
} from 'lucide-react'

interface Tab {
  id: string
  icon: any
  label: string
  path: string
}

const TABS: Tab[] = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'builder', icon: Sparkles, label: 'Builder', path: '/project-builder' },
  { id: 'dashboard', icon: FolderOpen, label: 'My Projects', path: '/dashboard' },
  { id: 'services', icon: Settings, label: 'Services', path: '/services' },
  { id: 'contact', icon: MessageCircle, label: 'Contact', path: '/contact' }
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const router = useRouter()

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/project-builder')) return 'builder'
    if (pathname.startsWith('/dashboard')) return 'dashboard'
    if (pathname.startsWith('/services')) return 'services'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }

  const activeTab = getActiveTab()

  const handleTabClick = (tab: Tab) => {
    router.push(tab.path)
  }

  return (
    <nav className="
      fixed bottom-0 left-0 right-0 z-50
      lg:hidden
      bg-white/95 backdrop-blur-xl
      border-t border-gray-200
      elevation-6
      pb-safe
    ">
      <div className="flex justify-around items-center h-16">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className="
                flex flex-col items-center justify-center
                flex-1 h-full
                transition-colors duration-200
                active:scale-95
                relative
              "
            >
              {/* Icon */}
              <div className="relative">
                <Icon
                  className={`
                    w-6 h-6 transition-all duration-300
                    ${isActive 
                      ? 'text-black scale-110' 
                      : 'text-gray-400 scale-100'
                    }
                  `}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="
                      absolute -bottom-1 left-1/2 -translate-x-1/2
                      w-1 h-1 rounded-full bg-black
                    "
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-xs mt-1 font-medium transition-colors duration-200
                  ${isActive ? 'text-black' : 'text-gray-500'}
                `}
              >
                {tab.label}
              </span>

              {/* Touch ripple effect */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="
                    absolute inset-0
                    rounded-full bg-gray-900
                    pointer-events-none
                  "
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
