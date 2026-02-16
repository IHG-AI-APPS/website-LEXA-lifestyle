'use client'

import { ReactNode } from 'react'
import { LanguageProvider as LanguageContextProvider } from '@/contexts/LanguageContext'

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageContextProvider>{children}</LanguageContextProvider>
}
