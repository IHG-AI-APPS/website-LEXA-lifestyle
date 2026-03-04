'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

interface ThemeToggleProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function ThemeToggle({ className = '', variant = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  
  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${className}`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        data-testid="theme-toggle"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5 text-amber-400" />
          )}
        </motion.div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-[#171717] transition-all duration-300 hover:shadow-md ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle"
    >
      <motion.div
        className="absolute left-1 w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm"
        initial={false}
        animate={{ x: theme === 'dark' ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <Sun className={`h-5 w-5 z-10 transition-colors ${theme === 'light' ? 'text-amber-500' : 'text-gray-400'}`} />
      <Moon className={`h-5 w-5 z-10 transition-colors ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
    </button>
  )
}

export default ThemeToggle
