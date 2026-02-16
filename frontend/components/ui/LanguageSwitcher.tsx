'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`
          relative px-3 py-1 text-sm font-medium rounded-full transition-colors
          ${language === 'en' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
        `}
        data-testid="lang-switch-en"
      >
        {language === 'en' && (
          <motion.div
            layoutId="languageIndicator"
            className="absolute inset-0 bg-gray-900 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`
          relative px-3 py-1 text-sm font-medium rounded-full transition-colors
          ${language === 'ar' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
        `}
        data-testid="lang-switch-ar"
      >
        {language === 'ar' && (
          <motion.div
            layoutId="languageIndicator"
            className="absolute inset-0 bg-gray-900 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">عربي</span>
      </button>
    </div>
  )
}

// Compact version for header
export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      data-testid="lang-toggle"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
    </button>
  )
}
