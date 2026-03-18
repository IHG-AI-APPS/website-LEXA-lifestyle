'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  FlaskConical, 
  TrendingUp, 
  Eye, 
  Target, 
  Plus, 
  Edit2, 
  Trash2, 
  RefreshCw,
  Trophy,
  BarChart3,
  Save,
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface ABTestVariant {
  id: string
  name: string
  headline: string
  subheadline: string
  offer_badge: string
  benefits: string[]
  cta_text: string
  success_message: string
  weight: number
  active: boolean
  impressions?: number
  conversions?: number
  conversion_rate?: number
}

interface ABTestResults {
  variants: ABTestVariant[]
  total_impressions: number
  total_conversions: number
  overall_conversion_rate: number
  best_performer: {
    id: string
    name: string
    conversion_rate: number
  } | null
}

export default function ABTestingPage() {
  const [results, setResults] = useState<ABTestResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingVariant, setEditingVariant] = useState<ABTestVariant | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)

  const fetchResults = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/leads/ab-test/results`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setResults(data)
      }
    } catch (error) {
      console.error('Failed to fetch A/B test results:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  const handleSaveVariant = async (variant: ABTestVariant) => {
    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const method = isCreating ? 'POST' : 'PUT'
      const url = isCreating 
        ? `${API_URL}/api/leads/ab-test/variant`
        : `${API_URL}/api/leads/ab-test/variant/${variant.id}`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(variant)
      })

      if (response.ok) {
        setEditingVariant(null)
        setIsCreating(false)
        fetchResults()
      } else {
        const error = await response.json()
        alert(error.detail || 'Failed to save variant')
      }
    } catch (error) {
      console.error('Failed to save variant:', error)
      alert('Failed to save variant')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm('Are you sure you want to delete this variant?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/leads/ab-test/variant/${variantId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        fetchResults()
      } else {
        const error = await response.json()
        alert(error.detail || 'Failed to delete variant')
      }
    } catch (error) {
      console.error('Failed to delete variant:', error)
    }
  }

  const handleResetStats = async () => {
    if (!confirm('Are you sure you want to reset all A/B test statistics? This cannot be undone.')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/leads/ab-test/reset`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        fetchResults()
      }
    } catch (error) {
      console.error('Failed to reset stats:', error)
    }
  }

  const createNewVariant = () => {
    const newId = `variant_${Date.now()}`
    setEditingVariant({
      id: newId,
      name: 'New Variant',
      headline: 'Your Headline Here',
      subheadline: 'Your subheadline here',
      offer_badge: 'Special Offer!',
      benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
      cta_text: 'Get Started',
      success_message: 'Thank you! We will be in touch soon.',
      weight: 25,
      active: true
    })
    setIsCreating(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FlaskConical className="w-7 h-7 text-purple-600" />
            A/B Testing - Exit Intent Popup
          </h1>
          <p className="text-gray-500 mt-1">
            Test different offers to optimize conversion rates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetStats}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Stats
          </Button>
          <Button onClick={createNewVariant}>
            <Plus className="w-4 h-4 mr-2" />
            New Variant
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Impressions</p>
                  <p className="text-2xl font-bold">{results.total_impressions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Conversions</p>
                  <p className="text-2xl font-bold">{results.total_conversions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Overall Conversion</p>
                  <p className="text-2xl font-bold">{results.overall_conversion_rate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={results.best_performer ? 'border-yellow-400 bg-yellow-50' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Best Performer</p>
                  {results.best_performer ? (
                    <p className="text-lg font-bold truncate">{results.best_performer.name}</p>
                  ) : (
                    <p className="text-sm text-gray-400">Not enough data</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Variant Editor Modal */}
      {editingVariant && (
        <Card className="border-2 border-purple-300 bg-purple-50/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{isCreating ? 'Create New Variant' : 'Edit Variant'}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => { setEditingVariant(null); setIsCreating(false) }}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Variant ID</label>
                <Input
                  value={editingVariant.id}
                  onChange={(e) => setEditingVariant({ ...editingVariant, id: e.target.value })}
                  disabled={!isCreating}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Variant Name</label>
                <Input
                  value={editingVariant.name}
                  onChange={(e) => setEditingVariant({ ...editingVariant, name: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Headline</label>
              <Input
                value={editingVariant.headline}
                onChange={(e) => setEditingVariant({ ...editingVariant, headline: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Subheadline</label>
              <Input
                value={editingVariant.subheadline}
                onChange={(e) => setEditingVariant({ ...editingVariant, subheadline: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Offer Badge</label>
              <Input
                value={editingVariant.offer_badge}
                onChange={(e) => setEditingVariant({ ...editingVariant, offer_badge: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Benefits (one per line)</label>
              <Textarea
                value={editingVariant.benefits.join('\n')}
                onChange={(e) => setEditingVariant({ ...editingVariant, benefits: e.target.value.split('\n').filter(b => b.trim()) })}
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">CTA Button Text</label>
                <Input
                  value={editingVariant.cta_text}
                  onChange={(e) => setEditingVariant({ ...editingVariant, cta_text: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Weight (traffic %)</label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={editingVariant.weight}
                  onChange={(e) => setEditingVariant({ ...editingVariant, weight: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Success Message</label>
              <Textarea
                value={editingVariant.success_message}
                onChange={(e) => setEditingVariant({ ...editingVariant, success_message: e.target.value })}
                rows={2}
                className="mt-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingVariant({ ...editingVariant, active: !editingVariant.active })}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                {editingVariant.active ? (
                  <ToggleRight className="w-10 h-10 text-purple-600" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-gray-400" />
                )}
              </button>
              <label className="text-sm font-medium">{editingVariant.active ? 'Active' : 'Inactive'}</label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleSaveVariant(editingVariant)} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Variant'}
              </Button>
              <Button variant="outline" onClick={() => { setEditingVariant(null); setIsCreating(false) }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Variants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Test Variants Performance
          </CardTitle>
          <CardDescription>
            Compare conversion rates across different popup variants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results?.variants.map((variant) => (
              <div
                key={variant.id}
                className={`p-4 border rounded-lg ${
                  results.best_performer?.id === variant.id 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{variant.name}</h3>
                      {results.best_performer?.id === variant.id && (
                        <Badge className="bg-yellow-500">
                          <Trophy className="w-3 h-3 mr-1" />
                          Best
                        </Badge>
                      )}
                      {variant.id === 'control' && (
                        <Badge variant="outline">Control</Badge>
                      )}
                      <Badge variant={variant.active ? 'default' : 'secondary'}>
                        {variant.active ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      "{variant.headline}" • Weight: {variant.weight}%
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditingVariant(variant); setIsCreating(false) }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    {variant.id !== 'control' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteVariant(variant.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Impressions</p>
                    <p className="text-xl font-bold">{(variant.impressions || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="text-xl font-bold">{(variant.conversions || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-xl font-bold text-green-600">{variant.conversion_rate || 0}%</p>
                  </div>
                </div>

                {/* Visual conversion bar */}
                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        results.best_performer?.id === variant.id
                          ? 'bg-yellow-500'
                          : 'bg-purple-500'
                      }`}
                      style={{ width: `${Math.min((variant.conversion_rate || 0) * 5, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {(!results?.variants || results.variants.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <FlaskConical className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No variants configured yet.</p>
                <p className="text-sm">Click "New Variant" to create your first A/B test.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-purple-800 mb-2">💡 A/B Testing Tips</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Run tests for at least 1-2 weeks to get statistically significant results</li>
            <li>• Keep the control variant active to compare against new ideas</li>
            <li>• Test one element at a time for clearer insights (headline, offer, CTA)</li>
            <li>• A conversion rate difference of 20%+ is typically significant</li>
            <li>• Use weights to gradually roll out winning variants</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
