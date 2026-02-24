'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
      <button
        onClick={() => setLanguage('en')}
        className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5
          ${language === 'en' 
            ? 'bg-white text-black' 
            : 'text-white/70 hover:text-white'
          }
        `}
      >
        <Globe size={14} />
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-all
          ${language === 'ar' 
            ? 'bg-white text-black' 
            : 'text-white/70 hover:text-white'
          }
        `}
      >
        عربي
      </button>
    </div>
  )
}

export function LanguageToggleDark() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5
          ${language === 'en' 
            ? 'bg-black text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:text-black'
          }
        `}
      >
        <Globe size={14} />
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`
          px-3 py-1.5 rounded-full text-sm font-medium transition-all
          ${language === 'ar' 
            ? 'bg-black text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:text-black'
          }
        `}
      >
        عربي
      </button>
    </div>
  )
}
