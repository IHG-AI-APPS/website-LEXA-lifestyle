'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ArrowLeft, Award, TrendingUp, Globe, Users, Star, Shield, CheckCircle, Building2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Available icons for stats
const AVAILABLE_ICONS = [
  { name: 'Award', icon: Award },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'Globe', icon: Globe },
  { name: 'Users', icon: Users },
  { name: 'Star', icon: Star },
  { name: 'Shield', icon: Shield },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'Building2', icon: Building2 },
  { name: 'Clock', icon: Clock },
]

interface StatItem {
  icon: string
  value: string | number
  suffix?: string
  label: string
}

interface StatsGroup {
  key: string
  label: string
  description: string
  value: StatItem[]
}

export default function StatsSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [statsGroups, setStatsGroups] = useState<StatsGroup[]>([
    {
      key: 'hero_stats',
      label: 'Hero Section Stats',
      description: 'Stats shown below the hero video (15+ Years, 500+ Projects, 4.9 Rating)',
      value: []
    },
    {
      key: 'homepage_stats',
      label: 'Homepage Stats Section',
      description: 'Large animated stats section (1,000+ Premium Brands, 15+ Years, etc.)',
      value: []
    },
    {
      key: 'trust_badges_stats',
      label: 'Trust Badges Stats',
      description: 'Stats shown in the trust badges component',
      value: []
    }
  ])

  useEffect(() => {
    fetchAllStats()
  }, [])

  const fetchAllStats = async () => {
    try {
      const keys = ['hero_stats', 'homepage_stats', 'trust_badges_stats']
      const results = await Promise.all(
        keys.map(key => 
          fetch(`${BACKEND_URL}/api/settings/${key}`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      )

      setStatsGroups(prev => prev.map((group, index) => ({
        ...group,
        value: results[index]?.value || group.value
      })))
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveStats = async (key: string) => {
    setSaving(key)
    try {
      const group = statsGroups.find(g => g.key === key)
      if (!group) return

      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${BACKEND_URL}/api/admin/settings/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: group.value })
      })

      if (response.ok) {
        alert('Stats saved successfully!')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save stats')
    } finally {
      setSaving(null)
    }
  }

  const updateStat = (groupKey: string, index: number, field: keyof StatItem, value: string) => {
    setStatsGroups(prev => prev.map(group => {
      if (group.key !== groupKey) return group
      const newValue = [...group.value]
      newValue[index] = { ...newValue[index], [field]: value }
      return { ...group, value: newValue }
    }))
  }

  const addStat = (groupKey: string) => {
    setStatsGroups(prev => prev.map(group => {
      if (group.key !== groupKey) return group
      return {
        ...group,
        value: [...group.value, { icon: 'Award', value: '0', label: 'New Stat' }]
      }
    }))
  }

  const removeStat = (groupKey: string, index: number) => {
    setStatsGroups(prev => prev.map(group => {
      if (group.key !== groupKey) return group
      return {
        ...group,
        value: group.value.filter((_, i) => i !== index)
      }
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Homepage Statistics</h1>
            <p className="text-gray-600">Manage all statistics displayed on the homepage</p>
          </div>
        </div>

        {/* Stats Groups */}
        <div className="space-y-8">
          {statsGroups.map((group) => (
            <div key={group.key} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">{group.label}</h2>
                <p className="text-sm text-gray-500 mt-1">{group.description}</p>
              </div>

              <div className="p-6 space-y-4">
                {group.value.map((stat, index) => {
                  const IconComponent = AVAILABLE_ICONS.find(i => i.name === stat.icon)?.icon || Award
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {/* Icon Preview */}
                      <div className="w-12 h-12 bg-[#C9A962]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-[#C9A962]" />
                      </div>

                      {/* Icon Selector */}
                      <select
                        value={stat.icon}
                        onChange={(e) => updateStat(group.key, index, 'icon', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-32"
                      >
                        {AVAILABLE_ICONS.map(icon => (
                          <option key={icon.name} value={icon.name}>{icon.name}</option>
                        ))}
                      </select>

                      {/* Value */}
                      <Input
                        value={stat.value}
                        onChange={(e) => updateStat(group.key, index, 'value', e.target.value)}
                        placeholder="Value (e.g., 500+)"
                        className="w-28"
                      />

                      {/* Suffix (for animated stats) */}
                      {group.key === 'homepage_stats' && (
                        <Input
                          value={stat.suffix || ''}
                          onChange={(e) => updateStat(group.key, index, 'suffix', e.target.value)}
                          placeholder="Suffix (+, s)"
                          className="w-20"
                        />
                      )}

                      {/* Label */}
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(group.key, index, 'label', e.target.value)}
                        placeholder="Label"
                        className="flex-1"
                      />

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStat(group.key, index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )
                })}

                {/* Add & Save Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => addStat(group.key)}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Stat
                  </Button>

                  <Button
                    onClick={() => saveStats(group.key)}
                    disabled={saving === group.key}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {saving === group.key ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <Save size={16} />
                    )}
                    Save {group.label}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <p className="text-sm text-gray-500 mb-4">This is how the Hero Stats will appear on the homepage:</p>
          
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center gap-6">
            {statsGroups.find(g => g.key === 'hero_stats')?.value.map((stat, index) => {
              const IconComponent = AVAILABLE_ICONS.find(i => i.name === stat.icon)?.icon || Shield
              return (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <IconComponent className="w-4 h-4 text-[#C9A962]" />
                  <span>{stat.value} {stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
