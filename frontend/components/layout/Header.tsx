'use client'

import Link from 'next/link'
import SafeImage from '@/components/ui/SafeImage'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'
import ConsultationForm from '@/components/forms/ConsultationForm'
import { motion, AnimatePresence } from 'framer-motion'
import SolutionsMegaMenu from '@/components/navigation/SolutionsMegaMenu'
import ServicesMegaMenu from '@/components/navigation/ServicesMegaMenu'
import IntelligenceMegaMenu from '@/components/navigation/IntelligenceMegaMenu'
import PackagesMegaMenu from '@/components/navigation/PackagesMegaMenu'
import MobileMegaMenu from '@/components/navigation/MobileMegaMenu'
import { LanguageSwitcherCompact } from '@/components/ui/LanguageSwitcher'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

export default function Header() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showConsultationForm, setShowConsultationForm] = useState(false)
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [intelligenceMenuOpen, setIntelligenceMenuOpen] = useState(false)
  const [packagesMenuOpen, setPackagesMenuOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileIntelligenceOpen, setMobileIntelligenceOpen] = useState(false)
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false)
  const pathname = usePathname()
  
  // 🌟 Adaptive header behavior
  const [headerVisible, setHeaderVisible] = useState(true)
  const [prevScroll, setPrevScroll] = useState(0)
  
  // Timers for menu delays
  const solutionsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intelligenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const packagesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openSolutionsMenu = () => {
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current)
    setSolutionsMenuOpen(true)
    setServicesMenuOpen(false)
    setIntelligenceMenuOpen(false)
  }

  const closeSolutionsMenu = () => {
    solutionsTimerRef.current = setTimeout(() => {
      setSolutionsMenuOpen(false)
    }, 300) // 300ms delay before closing
  }

  const openServicesMenu = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current)
    setServicesMenuOpen(true)
    setSolutionsMenuOpen(false)
    setIntelligenceMenuOpen(false)
  }

  const closeServicesMenu = () => {
    servicesTimerRef.current = setTimeout(() => {
      setServicesMenuOpen(false)
    }, 300)
  }

  const openIntelligenceMenu = () => {
    if (intelligenceTimerRef.current) clearTimeout(intelligenceTimerRef.current)
    setIntelligenceMenuOpen(true)
    setSolutionsMenuOpen(false)
    setServicesMenuOpen(false)
  }

  const closeIntelligenceMenu = () => {
    intelligenceTimerRef.current = setTimeout(() => {
      setIntelligenceMenuOpen(false)
    }, 300)
  }

  const openPackagesMenu = () => {
    if (packagesTimerRef.current) clearTimeout(packagesTimerRef.current)
    setPackagesMenuOpen(true)
    setSolutionsMenuOpen(false)
    setServicesMenuOpen(false)
    setIntelligenceMenuOpen(false)
  }

  const closePackagesMenu = () => {
    packagesTimerRef.current = setTimeout(() => {
      setPackagesMenuOpen(false)
    }, 300)
  }
  
  // Determine if we're on homepage
  const isHomepage = pathname === '/'
  
  // For homepage: use white text at top, dark text when scrolled
  // For other pages: always use dark text with white background
  const shouldUseDarkText = !isHomepage || isScrolled

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      
      // Basic scroll detection for styling
      setIsScrolled(currentScroll > 20)
      
      // 🌟 Always keep header visible (sticky behavior)
      setHeaderVisible(true)
      
      setPrevScroll(currentScroll)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScroll])

  const navigation = [
    { name: t('nav.brands'), href: '/brands' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.experience'), href: '/experience-centre' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: headerVisible ? 0 : -100, 
          opacity: headerVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1] // Luxury easing
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          shouldUseDarkText
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md elevation-4 border-b border-gray-200 dark:border-gray-700' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            <Link href="/" className="relative group">
              <div className="relative w-24 h-10 sm:w-28 sm:h-12 lg:w-36 lg:h-14 transition-opacity duration-300 group-hover:opacity-70">
                <SafeImage
                  src={shouldUseDarkText ? "/lexa-black.png" : "/lexa-white.png"}
                  alt="LEXA"
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 144px"
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>
            </Link>

            <nav 
              className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8"
            >
              {/* Solutions with Mega Menu */}
              <div 
                onMouseEnter={openSolutionsMenu}
                onMouseLeave={closeSolutionsMenu}
                className="relative"
              >
                <Link
                  href="/solutions"
                  className={`text-[11px] xl:text-xs 2xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors duration-300 flex items-center gap-1 whitespace-nowrap ${
                    shouldUseDarkText
                      ? 'text-gray-700 dark:text-gray-200 hover:text-[#1A1A1A] dark:hover:text-white'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    textShadow: !shouldUseDarkText ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {t('nav.solutions')}
                  <ChevronDown className={`h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform ${solutionsMenuOpen ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Services with Mega Menu */}
              <div 
                onMouseEnter={openServicesMenu}
                onMouseLeave={closeServicesMenu}
                className="relative"
              >
                <Link
                  href="/services"
                  className={`text-[11px] xl:text-xs 2xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors duration-300 flex items-center gap-1 whitespace-nowrap ${
                    shouldUseDarkText
                      ? 'text-gray-700 dark:text-gray-200 hover:text-[#1A1A1A] dark:hover:text-white'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    textShadow: !shouldUseDarkText ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {t('nav.services')}
                  <ChevronDown className={`h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Intelligence with Mega Menu */}
              <div 
                onMouseEnter={openIntelligenceMenu}
                onMouseLeave={closeIntelligenceMenu}
                className="relative"
              >
                <Link
                  href="/intelligence"
                  className={`text-[11px] xl:text-xs 2xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors duration-300 flex items-center gap-1 whitespace-nowrap ${
                    shouldUseDarkText
                      ? 'text-gray-700 dark:text-gray-200 hover:text-[#1A1A1A] dark:hover:text-white'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    textShadow: !shouldUseDarkText ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {language === 'ar' ? 'الذكاء' : 'Intelligence'}
                  <ChevronDown className={`h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform ${intelligenceMenuOpen ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Packages with Mega Menu */}
              <div 
                onMouseEnter={openPackagesMenu}
                onMouseLeave={closePackagesMenu}
                className="relative"
              >
                <Link
                  href="/packages"
                  className={`text-[11px] xl:text-xs 2xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors duration-300 flex items-center gap-1 whitespace-nowrap ${
                    shouldUseDarkText
                      ? 'text-gray-700 dark:text-gray-200 hover:text-[#1A1A1A] dark:hover:text-white'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    textShadow: !shouldUseDarkText ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {language === 'ar' ? 'الباقات' : 'Packages'}
                  <ChevronDown className={`h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform ${packagesMenuOpen ? 'rotate-180' : ''}`} />
                </Link>
              </div>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[11px] xl:text-xs 2xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors duration-300 link-underline whitespace-nowrap ${
                    shouldUseDarkText
                      ? 'text-gray-700 dark:text-gray-200 hover:text-[#1A1A1A] dark:hover:text-white' 
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    textShadow: !shouldUseDarkText ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3 xl:gap-4 ml-6 xl:ml-8 2xl:ml-10">
              <Button
                size="default"
                variant="outline"
                className={`px-4 xl:px-5 py-2 text-xs font-semibold uppercase tracking-wider btn-magnetic ${
                  shouldUseDarkText
                    ? 'border-2 border-[#1A1A1A] dark:border-gray-300 text-[#1A1A1A] dark:text-gray-200 hover:bg-[#1A1A1A] dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900'
                    : 'border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A]'
                }`}
                onClick={() => setShowConsultationForm(true)}
                data-testid="header-book-consultation-btn"
              >
                {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
              </Button>
              <ThemeToggle 
                variant="compact" 
                className={shouldUseDarkText ? 'text-gray-700 hover:text-[#1A1A1A]' : 'text-white hover:text-white'}
              />
              <LanguageSwitcherCompact />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                shouldUseDarkText ? 'text-charcoal' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden py-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0f1a] overflow-y-auto max-h-[calc(100vh-80px)]"
              >
                {/* Mobile Solutions Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                >
                  <button
                    onClick={() => {
                      setMobileSolutionsOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-4 transition-colors uppercase tracking-wider"
                  >
                    {t('nav.solutions')}
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </motion.div>

                {/* Mobile Services Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <button
                    onClick={() => {
                      setMobileServicesOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-4 transition-colors uppercase tracking-wider"
                  >
                    {t('nav.services')}
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </motion.div>

                {/* Mobile Intelligence Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => {
                      setMobileIntelligenceOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-4 transition-colors uppercase tracking-wider"
                  >
                    {language === 'ar' ? 'الذكاء' : 'Intelligence'}
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </motion.div>

                {/* Mobile Packages Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <button
                    onClick={() => {
                      setMobilePackagesOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-4 transition-colors uppercase tracking-wider"
                  >
                    {language === 'ar' ? 'الباقات' : 'Packages'}
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                </motion.div>

                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 3) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-4 transition-colors uppercase tracking-wider"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    {theme === 'dark' ? (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode') : (language === 'ar' ? 'الوضع الفاتح' : 'Light Mode')}
                  </span>
                  <ThemeToggle variant="compact" className="text-gray-700 dark:text-gray-300" />
                </motion.div>
                
                <div className="pt-4 px-4">
                  <Button
                    className="w-full bg-[#1A1A1A] dark:bg-[#E8DCC8] hover:bg-[#1A1A1A]/90 dark:hover:bg-[#E8DCC8]/90 text-white dark:text-[#1A1A1A] uppercase tracking-wider"
                    onClick={() => {
                      setShowConsultationForm(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {t('header.cta')}
                  </Button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <ConsultationForm isOpen={showConsultationForm} onClose={() => setShowConsultationForm(false)} />
      
      {/* Desktop Mega Menus */}
      <SolutionsMegaMenu
        isOpen={solutionsMenuOpen}
        onClose={() => setSolutionsMenuOpen(false)}
        onMouseEnter={openSolutionsMenu}
        onMouseLeave={closeSolutionsMenu}
      />

      <ServicesMegaMenu
        isOpen={servicesMenuOpen}
        onClose={() => setServicesMenuOpen(false)}
        onMouseEnter={openServicesMenu}
        onMouseLeave={closeServicesMenu}
      />

      <IntelligenceMegaMenu
        isOpen={intelligenceMenuOpen}
        onClose={() => setIntelligenceMenuOpen(false)}
        onMouseEnter={openIntelligenceMenu}
        onMouseLeave={closeIntelligenceMenu}
      />

      <PackagesMegaMenu
        isOpen={packagesMenuOpen}
        onClose={() => setPackagesMenuOpen(false)}
        onMouseEnter={openPackagesMenu}
        onMouseLeave={closePackagesMenu}
      />

      {/* Mobile Mega Menus */}
      <MobileMegaMenu
        isOpen={mobileSolutionsOpen}
        onClose={() => setMobileSolutionsOpen(false)}
        type="solutions"
      />

      <MobileMegaMenu
        isOpen={mobileServicesOpen}
        onClose={() => setMobileServicesOpen(false)}
        type="services"
      />

      <MobileMegaMenu
        isOpen={mobileIntelligenceOpen}
        onClose={() => setMobileIntelligenceOpen(false)}
        type="intelligence"
      />

      <MobileMegaMenu
        isOpen={mobilePackagesOpen}
        onClose={() => setMobilePackagesOpen(false)}
        type="packages"
      />
    </>
  )
}
