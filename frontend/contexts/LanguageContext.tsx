'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import enTranslations from '../locales/en.json'
import arTranslations from '../locales/ar.json'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Type for nested translation objects
type TranslationValue = string | { [key: string]: TranslationValue }
type TranslationObject = { [key: string]: TranslationValue }

// Load translations from JSON files
const translations: Record<Language, TranslationObject> = {
  en: enTranslations,
  ar: arTranslations
}

/**
 * Get a nested value from an object using dot notation
 * Example: getNestedValue(obj, 'nav.home') returns obj.nav.home
 */
function getNestedValue(obj: TranslationObject, path: string): string | undefined {
  const keys = path.split('.')
  let current: TranslationValue | undefined = obj

  for (const key of keys) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined
    }
    current = (current as TranslationObject)[key]
  }

  return typeof current === 'string' ? current : undefined
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('lexa-language') as Language
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved)
      // Update document direction
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = saved
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('lexa-language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [])

  /**
   * Translation function that supports nested keys with dot notation
   * Examples:
   *   t('nav.home') -> 'Home' (en) / 'الرئيسية' (ar)
   *   t('hero.cta.primary') -> 'Discover Our Solutions'
   */
  const t = useCallback((key: string): string => {
    const value = getNestedValue(translations[language], key)
    return value ?? key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
