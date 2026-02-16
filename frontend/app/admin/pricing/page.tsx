'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertCircle,
  Loader2,
  Package,
  Zap,
  Settings,
  Home,
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface PricingData {
  calculator_solutions: Record<string, any[]>
  additional_features: any[]
  package_bundles: any[]
  system_pricing: any[]
  budget_ranges: any[]
  upgrade_features: any[]
  package_tier_pricing: any[]
}

export default function PricingManagementPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [activeSection, setActiveSection] = useState<string>('system_pricing')
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    system_pricing: true,
    budget_ranges: false,
    upgrade_features: false,
    package_bundles: false,
    additional_features: false,
    package_tier_pricing: false
  })

  useEffect(() => {
    fetchPricingData()
  }, [])

  const fetchPricingData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/pricing/all`)
      if (response.ok) {
        const data = await response.json()
        setPricingData(data)
      } else {
        toast.error('Failed to load pricing data')
      }
    } catch (error) {
      console.error('Error fetching pricing:', error)
      toast.error('Failed to load pricing data')
    } finally {
      setLoading(false)
    }
  }

  const saveSection = async (section: string, data: any) => {
    setSaving(true)
    try {
      const response = await fetch(`${API_URL}/api/pricing/${section.replace(/_/g, '-')}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        toast.success(`${section.replace(/_/g, ' ')} saved successfully`)
        setEditingItem(null)
      } else {
        toast.error('Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const resetToDefaults = async () => {
    if (!confirm('Are you sure you want to reset ALL pricing to defaults? This cannot be undone.')) {
      return
    }
    
    setSaving(true)
    try {
      const response = await fetch(`${API_URL}/api/pricing/reset-defaults`, {
        method: 'POST'
      })
      
      if (response.ok) {
        toast.success('Pricing reset to defaults')
        fetchPricingData()
      } else {
        toast.error('Failed to reset')
      }
    } catch (error) {
      toast.error('Failed to reset')
    } finally {
      setSaving(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `${Math.round(price / 1000)}K`
    return price.toString()
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const updateSystemPrice = (index: number, field: string, value: any) => {
    if (!pricingData) return
    const newData = [...pricingData.system_pricing]
    newData[index] = { ...newData[index], [field]: field.includes('price') ? parseInt(value) || 0 : value }
    setPricingData({ ...pricingData, system_pricing: newData })
  }

  const updateBudgetRange = (index: number, field: string, value: any) => {
    if (!pricingData) return
    const newData = [...pricingData.budget_ranges]
    newData[index] = { ...newData[index], [field]: field.includes('value') ? parseInt(value) || 0 : value }
    setPricingData({ ...pricingData, budget_ranges: newData })
  }

  const updateUpgradeFeature = (index: number, field: string, value: any) => {
    if (!pricingData) return
    const newData = [...pricingData.upgrade_features]
    newData[index] = { ...newData[index], [field]: field === 'price' ? parseInt(value) || 0 : value }
    setPricingData({ ...pricingData, upgrade_features: newData })
  }

  const updateAdditionalFeature = (index: number, field: string, value: any) => {
    if (!pricingData) return
    const newData = [...pricingData.additional_features]
    newData[index] = { ...newData[index], [field]: field.includes('price') ? parseInt(value) || 0 : value }
    setPricingData({ ...pricingData, additional_features: newData })
  }

  const updatePackageTier = (index: number, field: string, value: any) => {
    if (!pricingData) return
    const newData = [...pricingData.package_tier_pricing]
    newData[index] = { ...newData[index], [field]: parseInt(value) || 0 }
    setPricingData({ ...pricingData, package_tier_pricing: newData })
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!pricingData) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
        <p className="text-gray-600">Failed to load pricing data</p>
        <Button onClick={fetchPricingData} className="mt-4">Retry</Button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pricing Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Edit all prices across Calculator & Smart Project Builder</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            disabled={saving}
            className="text-red-600 border-red-200 hover:bg-red-50 text-sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Reset to Defaults</span>
            <span className="sm:hidden">Reset</span>
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">How Pricing Works</h3>
            <p className="text-sm text-blue-700 mt-1">
              All prices are shown as ranges (min-max). The frontend displays prices as &quot;AED XK-YK&quot; format.
              Changes here will reflect immediately on the Calculator and Smart Project Builder.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Sections */}
      <div className="space-y-6">
        
        {/* System Pricing */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('system_pricing')}
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Control System Pricing</span>
              <span className="text-sm text-gray-500">({pricingData.system_pricing?.length || 0} systems)</span>
            </div>
            {expandedSections.system_pricing ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.system_pricing && (
            <div className="p-4">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-semibold">System</th>
                      <th className="text-left p-2 text-sm font-semibold">Tier</th>
                      <th className="text-left p-2 text-sm font-semibold">Min Price (AED)</th>
                      <th className="text-left p-2 text-sm font-semibold">Max Price (AED)</th>
                      <th className="text-left p-2 text-sm font-semibold">Display</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.system_pricing?.map((system, index) => (
                      <tr key={system.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{system.name}</div>
                          <div className="text-xs text-gray-500">{system.description}</div>
                        </td>
                        <td className="p-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{system.tier}</span>
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={system.price_min}
                            onChange={(e) => updateSystemPrice(index, 'price_min', e.target.value)}
                            className="w-28"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={system.price_max}
                            onChange={(e) => updateSystemPrice(index, 'price_max', e.target.value)}
                            className="w-28"
                          />
                        </td>
                        <td className="p-2 text-sm text-green-600 font-medium">
                          AED {formatPrice(system.price_min)}-{formatPrice(system.price_max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {pricingData.system_pricing?.map((system, index) => (
                  <div key={system.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-sm">{system.name}</div>
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{system.tier}</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        AED {formatPrice(system.price_min)}-{formatPrice(system.price_max)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Min Price</label>
                        <Input
                          type="number"
                          value={system.price_min}
                          onChange={(e) => updateSystemPrice(index, 'price_min', e.target.value)}
                          className="w-full text-sm h-9"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Max Price</label>
                        <Input
                          type="number"
                          value={system.price_max}
                          onChange={(e) => updateSystemPrice(index, 'price_max', e.target.value)}
                          className="w-full text-sm h-9"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => saveSection('system_pricing', pricingData.system_pricing)}
                  disabled={saving}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save System Pricing
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Budget Ranges */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('budget_ranges')}
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-sm sm:text-base">Budget Ranges</span>
              <span className="text-xs sm:text-sm text-gray-500">({pricingData.budget_ranges?.length || 0} tiers)</span>
            </div>
            {expandedSections.budget_ranges ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.budget_ranges && (
            <div className="p-4">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-semibold">Tier ID</th>
                      <th className="text-left p-2 text-sm font-semibold">Label</th>
                      <th className="text-left p-2 text-sm font-semibold">Description</th>
                      <th className="text-left p-2 text-sm font-semibold">Min (AED)</th>
                      <th className="text-left p-2 text-sm font-semibold">Max (AED)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.budget_ranges?.map((range, index) => (
                      <tr key={range.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono text-sm">{range.id}</td>
                        <td className="p-2">
                          <Input
                            value={range.label}
                            onChange={(e) => updateBudgetRange(index, 'label', e.target.value)}
                            className="w-36"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            value={range.description}
                            onChange={(e) => updateBudgetRange(index, 'description', e.target.value)}
                            className="w-40"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={range.min_value}
                            onChange={(e) => updateBudgetRange(index, 'min_value', e.target.value)}
                            className="w-28"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={range.max_value}
                            onChange={(e) => updateBudgetRange(index, 'max_value', e.target.value)}
                            className="w-28"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {pricingData.budget_ranges?.map((range, index) => (
                  <div key={range.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded font-mono">{range.id}</span>
                      <span className="text-sm text-green-600 font-medium">
                        AED {formatPrice(range.min_value)}-{formatPrice(range.max_value)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Label</label>
                        <Input
                          value={range.label}
                          onChange={(e) => updateBudgetRange(index, 'label', e.target.value)}
                          className="w-full text-sm h-9"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Min (AED)</label>
                          <Input
                            type="number"
                            value={range.min_value}
                            onChange={(e) => updateBudgetRange(index, 'min_value', e.target.value)}
                            className="w-full text-sm h-9"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 block mb-1">Max (AED)</label>
                          <Input
                            type="number"
                            value={range.max_value}
                            onChange={(e) => updateBudgetRange(index, 'max_value', e.target.value)}
                            className="w-full text-sm h-9"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => saveSection('budget_ranges', pricingData.budget_ranges)}
                  disabled={saving}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Budget Ranges
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Upgrade Features */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('upgrade_features')}
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-sm sm:text-base">Upgrade Features</span>
              <span className="text-xs sm:text-sm text-gray-500">({pricingData.upgrade_features?.length || 0})</span>
            </div>
            {expandedSections.upgrade_features ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.upgrade_features && (
            <div className="p-4">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-semibold">Feature ID</th>
                      <th className="text-left p-2 text-sm font-semibold">Label</th>
                      <th className="text-left p-2 text-sm font-semibold">Price (AED)</th>
                      <th className="text-left p-2 text-sm font-semibold">Display</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.upgrade_features?.map((feature, index) => (
                      <tr key={feature.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono text-sm">{feature.id}</td>
                        <td className="p-2">
                          <Input
                            value={feature.label}
                            onChange={(e) => updateUpgradeFeature(index, 'label', e.target.value)}
                            className="w-52"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={feature.price}
                            onChange={(e) => updateUpgradeFeature(index, 'price', e.target.value)}
                            className="w-28"
                          />
                        </td>
                        <td className="p-2 text-sm text-green-600 font-medium">
                          +AED {formatPrice(feature.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {pricingData.upgrade_features?.map((feature, index) => (
                  <div key={feature.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded font-mono">{feature.id}</span>
                      <span className="text-sm text-green-600 font-medium">+AED {formatPrice(feature.price)}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Label</label>
                        <Input
                          value={feature.label}
                          onChange={(e) => updateUpgradeFeature(index, 'label', e.target.value)}
                          className="w-full text-sm h-9"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Price (AED)</label>
                        <Input
                          type="number"
                          value={feature.price}
                          onChange={(e) => updateUpgradeFeature(index, 'price', e.target.value)}
                          className="w-full text-sm h-9"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => saveSection('upgrade_features', pricingData.upgrade_features)}
                  disabled={saving}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Upgrade Features
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Features (Calculator) */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('additional_features')}
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Additional Features (Calculator)</span>
              <span className="text-sm text-gray-500">({pricingData.additional_features?.length || 0} features)</span>
            </div>
            {expandedSections.additional_features ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.additional_features && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-semibold">Feature ID</th>
                      <th className="text-left p-2 text-sm font-semibold">Label</th>
                      <th className="text-left p-2 text-sm font-semibold">Min Price</th>
                      <th className="text-left p-2 text-sm font-semibold">Max Price</th>
                      <th className="text-left p-2 text-sm font-semibold">Display</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.additional_features?.map((feature, index) => (
                      <tr key={feature.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-mono text-sm">{feature.id}</td>
                        <td className="p-2">
                          <Input
                            value={feature.label}
                            onChange={(e) => updateAdditionalFeature(index, 'label', e.target.value)}
                            className="w-64"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={feature.price_min}
                            onChange={(e) => updateAdditionalFeature(index, 'price_min', e.target.value)}
                            className="w-28"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={feature.price_max}
                            onChange={(e) => updateAdditionalFeature(index, 'price_max', e.target.value)}
                            className="w-28"
                          />
                        </td>
                        <td className="p-2 text-sm text-green-600 font-medium">
                          AED {formatPrice(feature.price_min)}-{formatPrice(feature.price_max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => saveSection('additional_features', pricingData.additional_features)}
                  disabled={saving}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Additional Features
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Package Tier Pricing */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('package_tier_pricing')}
            className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Package Tier Pricing (Essential/Premium/Ultimate)</span>
              <span className="text-sm text-gray-500">({pricingData.package_tier_pricing?.length || 0} tiers)</span>
            </div>
            {expandedSections.package_tier_pricing ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.package_tier_pricing && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Budget Tier</th>
                      <th className="text-left p-2 font-semibold">Essential Min</th>
                      <th className="text-left p-2 font-semibold">Essential Max</th>
                      <th className="text-left p-2 font-semibold">Premium Min</th>
                      <th className="text-left p-2 font-semibold">Premium Max</th>
                      <th className="text-left p-2 font-semibold">Ultimate Min</th>
                      <th className="text-left p-2 font-semibold">Ultimate Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData.package_tier_pricing?.map((tier, index) => (
                      <tr key={tier.budget_tier} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium capitalize">{tier.budget_tier}</td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={tier.essential_min}
                            onChange={(e) => updatePackageTier(index, 'essential_min', e.target.value)}
                            className="w-24"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={tier.essential_max}
                            onChange={(e) => updatePackageTier(index, 'essential_max', e.target.value)}
                            className="w-24"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={tier.premium_min}
                            onChange={(e) => updatePackageTier(index, 'premium_min', e.target.value)}
                            className="w-24"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={tier.premium_max}
                            onChange={(e) => updatePackageTier(index, 'premium_max', e.target.value)}
                            className="w-24"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={tier.ultimate_min}
                            onChange={(e) => updatePackageTier(index, 'ultimate_min', e.target.value)}
                            className="w-24"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={tier.ultimate_max}
                            onChange={(e) => updatePackageTier(index, 'ultimate_max', e.target.value)}
                            className="w-24"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => saveSection('package_tier_pricing', pricingData.package_tier_pricing)}
                  disabled={saving}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Package Tier Pricing
                </Button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
