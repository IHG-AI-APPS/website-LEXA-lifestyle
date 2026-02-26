'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Star, Save, X, GripVertical, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface IntelligenceFeature {
  id: string
  slug: string
  title: string
  category: string
  icon: string
  short_description: string
  detailed_description: string
  iq_points: number
  scoring_category: string
  scenarios: Array<{ room: string; scenario: string }>
  benefits: string[]
  required_devices: string[]
  compatible_systems: string[]
  lifestyle_tags: string[]
  is_premium: boolean
  display_order: number
  featured: boolean
}

export default function IntelligenceFeaturesAdmin() {
  const [features, setFeatures] = useState<IntelligenceFeature[]>([])
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [editingFeature, setEditingFeature] = useState<IntelligenceFeature | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'scene_automation', 'presence_detection', 'circadian_lighting', 'voice_control',
    'ai_predictive', 'zone_control', 'energy_management', 'security_intelligence',
    'climate_control', 'wellness_environmental', 'appliance_coordination',
    'multi_room_audio', 'entertainment_optimization', 'outdoor_automation',
    'garage_automation', 'access_management'
  ]

  const scoringCategories = ['automation_coverage', 'ai_features', 'energy', 'wellness', 'security']
  const lifestyleTags = ['comfort', 'security', 'energy', 'entertainment', 'wellness', 'convenience']

  useEffect(() => {
    fetchFeatures()
    fetchStats()
  }, [])

  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/intelligence/admin/features`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        const rawFeatures = data.features || []
        // Ensure all features have proper defaults
        const featuresWithDefaults = rawFeatures.map((f: any) => ({
          ...f,
          title: f.title || '',
          category: f.category || '',
          description: f.description || '',
          image: f.image || '',
          icon: f.icon || '',
          details: f.details || [],
          benefits: f.benefits || [],
          featured: f.featured || false,
          order: f.order || 0
        }))
        setFeatures(featuresWithDefaults)
      }
    } catch (error) {
      console.error('Error fetching features:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/intelligence/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const toggleFeatured = async (featureId: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/intelligence/admin/features/${featureId}/toggle-featured`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        fetchFeatures()
      }
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const deleteFeature = async (featureId: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/intelligence/admin/features/${featureId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        fetchFeatures()
        fetchStats()
      }
    } catch (error) {
      console.error('Error deleting feature:', error)
    }
  }

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.short_description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div><div className="space-y-3"><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div></div></div>
          <p className="text-gray-600">Loading intelligence features...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Intelligence Features Management</h1>
          <p className="text-gray-600">Manage smart home intelligence features and categories</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{stats.total_features || 0}</div>
            <div className="text-sm text-gray-600">Total Features</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#E8DCC8] mb-1">{stats.featured_features || 0}</div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{stats.total_categories || 0}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{stats.total_sessions || 0}</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#10B981] mb-1">{stats.average_iq_score || 0}</div>
            <div className="text-sm text-gray-600">Avg IQ Score</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 border-2 border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Features</label>
              <Input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 border-2 border-gray-200 bg-white text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace(/_/g, ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Feature
            </Button>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white border-2 border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Feature</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IQ Points</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Scoring</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFeatures.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No features found. {searchQuery && 'Try adjusting your search.'}
                    </td>
                  </tr>
                ) : (
                  filteredFeatures.map((feature, index) => (
                    <tr key={feature.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                          <span className="text-sm font-mono text-gray-600">{feature.display_order}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold text-[#1A1A1A] text-sm">{feature.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{feature.short_description.substring(0, 60)}...</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {feature.category.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-[#10B981]" />
                          <span className="font-bold text-[#1A1A1A]">{feature.iq_points}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                          {feature.scoring_category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          {feature.featured && (
                            <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                              <Star className="w-3 h-3 fill-yellow-600" />
                              Featured
                            </span>
                          )}
                          {feature.is_premium && (
                            <span className="text-xs text-purple-600">Premium</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleFeatured(feature.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Toggle Featured"
                          >
                            <Star className={`w-4 h-4 ${feature.featured ? 'fill-yellow-600 text-yellow-600' : 'text-gray-400'}`} />
                          </button>
                          <button
                            onClick={() => setEditingFeature(feature)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => deleteFeature(feature.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {filteredFeatures.length} of {features.length} features
        </div>
      </div>

      {/* Edit/Add Modal would go here - keeping it simple for now */}
      {editingFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border-2 border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Edit Feature</h2>
              <button onClick={() => setEditingFeature(null)} className="p-2 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Feature ID: {editingFeature.id}
            </p>
            <p className="text-xs text-gray-500 italic">
              Full editing interface will be implemented in the detailed view.
              For now, you can toggle featured status and delete features from the list.
            </p>
            <Button 
              onClick={() => setEditingFeature(null)}
              className="mt-6 w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Add New Feature Modal */}
      {showAddModal && (
        <AddFeatureModal 
          categories={categories}
          scoringCategories={scoringCategories}
          lifestyleTags={lifestyleTags}
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            fetchFeatures()
            fetchStats()
            setShowAddModal(false)
          }}
        />
      )}
    </div>
  )
}

// Add Feature Modal Component
function AddFeatureModal({ 
  categories, 
  scoringCategories, 
  lifestyleTags,
  onClose, 
  onSave 
}: { 
  categories: string[]
  scoringCategories: string[]
  lifestyleTags: string[]
  onClose: () => void
  onSave: () => void 
}) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: categories[0] || '',
    icon: '🏠',
    short_description: '',
    detailed_description: '',
    iq_points: 10,
    scoring_category: scoringCategories[0] || '',
    benefits: [''],
    required_devices: [''],
    compatible_systems: ['Control4', 'Crestron'],
    lifestyle_tags: [] as string[],
    is_premium: false,
    featured: false,
    display_order: 0,
    faqs: [] as any[],
    feature_cards: [] as any[]
  })

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: generateSlug(value)
    }))
  }

  const handleArrayChange = (field: 'benefits' | 'required_devices', index: number, value: string) => {
    setFormData(prev => {
      const arr = [...prev[field]]
      arr[index] = value
      return { ...prev, [field]: arr }
    })
  }

  const addArrayItem = (field: 'benefits' | 'required_devices') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field: 'benefits' | 'required_devices', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const toggleLifestyleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      lifestyle_tags: prev.lifestyle_tags.includes(tag)
        ? prev.lifestyle_tags.filter(t => t !== tag)
        : [...prev.lifestyle_tags, tag]
    }))
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }
    if (!formData.short_description.trim()) {
      setError('Short description is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        benefits: formData.benefits.filter(b => b.trim()),
        required_devices: formData.required_devices.filter(d => d.trim()),
        faqs: (formData.faqs || []).filter((f: any) => f.question?.trim()),
        feature_cards: (formData.feature_cards || []).filter((c: any) => c.title?.trim())
      }

      const response = await fetch(`${backendUrl}/api/intelligence/admin/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      })

      if (response.ok) {
        onSave()
      } else {
        const data = await response.json()
        setError(data.detail || 'Failed to create feature')
      }
    } catch (error) {
      console.error('Error creating feature:', error)
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 border-2 border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Add New Intelligence Feature</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Title & Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Automated Scene Control"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (auto-generated)</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="automated-scene-control"
                className="w-full bg-gray-50"
              />
            </div>
          </div>

          {/* Category & Icon */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace(/_/g, ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="🏠"
                className="w-full text-2xl"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
            <Input
              value={formData.short_description}
              onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
              placeholder="Brief description for cards and lists"
              className="w-full"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
            <textarea
              value={formData.detailed_description}
              onChange={(e) => setFormData(prev => ({ ...prev, detailed_description: e.target.value }))}
              placeholder="Full description with details..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* IQ Points & Scoring Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IQ Points</label>
              <Input
                type="number"
                value={formData.iq_points}
                onChange={(e) => setFormData(prev => ({ ...prev, iq_points: parseInt(e.target.value) || 0 }))}
                min={0}
                max={100}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scoring Category</label>
              <select
                value={formData.scoring_category}
                onChange={(e) => setFormData(prev => ({ ...prev, scoring_category: e.target.value }))}
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
              >
                {scoringCategories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace(/_/g, ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  placeholder="Enter a benefit..."
                  className="flex-1"
                />
                <button
                  onClick={() => removeArrayItem('benefits', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('benefits')}
              className="text-sm text-blue-600 hover:underline"
              type="button"
            >
              + Add Benefit
            </button>
          </div>

          {/* Required Devices */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Devices</label>
            {formData.required_devices.map((device, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={device}
                  onChange={(e) => handleArrayChange('required_devices', index, e.target.value)}
                  placeholder="Enter a device..."
                  className="flex-1"
                />
                <button
                  onClick={() => removeArrayItem('required_devices', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('required_devices')}
              className="text-sm text-blue-600 hover:underline"
              type="button"
            >
              + Add Device
            </button>
          </div>

          {/* Lifestyle Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lifestyle Tags</label>
            <div className="flex flex-wrap gap-2">
              {lifestyleTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleLifestyleTag(tag)}
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.lifestyle_tags.includes(tag)
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Feature Cards ({formData.feature_cards?.length || 0})</label>
            <div className="space-y-3">
              {(formData.feature_cards || []).map((card: any, i: number) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={card.title || ''}
                      onChange={(e) => {
                        const cards = [...(formData.feature_cards || [])]
                        cards[i] = { ...cards[i], title: e.target.value }
                        setFormData(prev => ({ ...prev, feature_cards: cards }))
                      }}
                      placeholder="Card title"
                      className="flex-1"
                    />
                    <button type="button" onClick={() => setFormData(prev => ({
                      ...prev,
                      feature_cards: (prev.feature_cards || []).filter((_: any, j: number) => j !== i)
                    }))}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <Input
                    value={card.description || ''}
                    onChange={(e) => {
                      const cards = [...(formData.feature_cards || [])]
                      cards[i] = { ...cards[i], description: e.target.value }
                      setFormData(prev => ({ ...prev, feature_cards: cards }))
                    }}
                    placeholder="Description"
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setFormData(prev => ({
                ...prev,
                feature_cards: [...(prev.feature_cards || []), { title: '', description: '', benefits: [] }]
              }))}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Feature Card
              </Button>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">FAQs ({formData.faqs?.length || 0})</label>
            <div className="space-y-3">
              {(formData.faqs || []).map((faq: any, i: number) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={faq.question || ''}
                      onChange={(e) => {
                        const faqs = [...(formData.faqs || [])]
                        faqs[i] = { ...faqs[i], question: e.target.value }
                        setFormData(prev => ({ ...prev, faqs }))
                      }}
                      placeholder="Question"
                      className="flex-1"
                    />
                    <button type="button" onClick={() => setFormData(prev => ({
                      ...prev,
                      faqs: (prev.faqs || []).filter((_: any, j: number) => j !== i)
                    }))}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <Textarea
                    value={faq.answer || ''}
                    onChange={(e) => {
                      const faqs = [...(formData.faqs || [])]
                      faqs[i] = { ...faqs[i], answer: e.target.value }
                      setFormData(prev => ({ ...prev, faqs }))
                    }}
                    placeholder="Answer"
                    rows={2}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setFormData(prev => ({
                ...prev,
                faqs: [...(prev.faqs || []), { question: '', answer: '' }]
              }))}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Add FAQ
              </Button>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_premium}
                onChange={(e) => setFormData(prev => ({ ...prev, is_premium: e.target.checked }))}
                className="w-4 h-4"
              />
              <span className="text-sm">Premium Feature</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Feature
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
