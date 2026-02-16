'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Persona = 'homeowner' | 'architect' | 'developer' | 'commercial' | null

interface PersonaContextType {
  persona: Persona
  setPersona: (persona: Persona) => void
  clearPersona: () => void
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined)

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(null)

  // Load persona from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('lexa_persona')
    if (stored && ['homeowner', 'architect', 'developer', 'commercial'].includes(stored)) {
      setPersonaState(stored as Persona)
    }
  }, [])

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona)
    if (newPersona) {
      localStorage.setItem('lexa_persona', newPersona)
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'persona_selected', {
          persona: newPersona
        })
      }
    }
  }

  const clearPersona = () => {
    setPersonaState(null)
    localStorage.removeItem('lexa_persona')
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona, clearPersona }}>
      {children}
    </PersonaContext.Provider>
  )
}

export function usePersona() {
  const context = useContext(PersonaContext)
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider')
  }
  return context
}
