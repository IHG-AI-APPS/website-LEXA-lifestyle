'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Shield, 
  Zap, 
  Music, 
  Heart, 
  Smartphone,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface LifestyleQuizProps {
  onComplete: (recommendations: any[]) => void
  onSkip: () => void
}

const priorities = [
  { id: 'comfort', name: 'Comfort', icon: Home, color: 'gold' },
  { id: 'security', name: 'Security', icon: Shield, color: 'emerald' },
  { id: 'energy', name: 'Energy Savings', icon: Zap, color: 'amber' },
  { id: 'entertainment', name: 'Entertainment', icon: Music, color: 'gold' },
  { id: 'wellness', name: 'Wellness', icon: Heart, color: 'rose' },
  { id: 'convenience', name: 'Convenience', icon: Smartphone, color: 'gold' }
]

export default function LifestyleQuizMini({ onComplete, onSkip }: LifestyleQuizProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id))
    } else if (selected.length < 3) {
      setSelected([...selected, id])
    }
  }

  const getRecommendations = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/intelligence/ai-recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priorities: selected,
          property_type: 'villa',
          budget_range: 'medium'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        onComplete(data.recommendations || [])
      } else {
        onSkip()
      }
    } catch (error) {
      console.error('Failed to get recommendations:', error)
      onSkip()
    } finally {
      setLoading(false)
    }
  }

  const colorMap: Record<string, string> = {
    gold: 'bg-[#C9A962]/20 text-[#C9A962] border-[#C9A962]',
    emerald: 'bg-emerald-100 text-emerald-600 border-emerald-500',
    amber: 'bg-amber-100 text-amber-600 border-amber-500',
    rose: 'bg-rose-100 text-rose-600 border-rose-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-[#C9A962]/10 to-[#C9A962]/5 rounded-2xl p-6 mb-8 border border-[#C9A962]/30"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#C9A962]" />
          <h3 className="font-bold text-gray-900 dark:text-white">Quick: What matters most to you?</h3>
        </div>
        <button
          onClick={onSkip}
          className="text-gray-400 hover:text-gray-600 dark:text-zinc-500 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-zinc-500 mb-4">
        Select up to 3 priorities and we'll highlight features that match your lifestyle
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {priorities.map((p) => {
          const Icon = p.icon
          const isSelected = selected.includes(p.id)
          
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                isSelected 
                  ? colorMap[p.color]
                  : 'bg-white border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-400 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium truncate">{p.name}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{selected.length}/3 selected</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-gray-500"
          >
            Skip
          </Button>
          <Button
            size="sm"
            onClick={getRecommendations}
            disabled={selected.length === 0 || loading}
            className="bg-[#C9A962] hover:bg-[#B8983F] text-gray-900"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                Apply
                <ArrowRight className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
