'use client'

import { useState, useEffect } from 'react'
import { Edit2, Save, X, CheckCircle2, Wifi, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ControlSystem {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price_range_aed: string
  type: string
  platform: string
  protocols: string[]
  best_for: string[]
  compatibility: {
    native_brands: string[]
    matter_certified: string[]
    third_party: string[]
  }
  capabilities: string[]
  has_ai: boolean
  professional_grade: boolean
  supports_matter: boolean
  supports_thread: boolean
  voice_integration: string[]
  price_tier: string
  image_url: string
}

export default function IntelligenceSystemsAdmin() {
  const [systems, setSystems] = useState<ControlSystem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSystem, setEditingSystem] = useState<ControlSystem | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSystems()
  }, [])

  const fetchSystems = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/intelligence/admin/control-systems`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSystems(data.systems || [])
      }
    } catch (error) {
      console.error('Error fetching systems:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSystem = async (system: ControlSystem) => {
    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL
      
      const response = await fetch(`${backendUrl}/api/intelligence/admin/control-systems/${system.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(system)
      })
      
      if (response.ok) {
        await fetchSystems()
        setEditingSystem(null)
        alert('System updated successfully!')
      }
    } catch (error) {
      console.error('Error saving system:', error)
      alert('Failed to save system')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div><div className="space-y-3"><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div><div className="h-10 bg-gray-100 rounded"></div></div></div>
          <p className="text-gray-600">Loading control systems...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Control Systems Management</h1>
          <p className="text-gray-600">Manage control systems for intelligence builder recommendations</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{systems.length}</div>
            <div className="text-sm text-gray-600">Total Systems</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#10B981] mb-1">
              {systems.filter(s => s.has_ai).length}
            </div>
            <div className="text-sm text-gray-600">AI-Powered</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#E8DCC8] mb-1">
              {systems.filter(s => s.supports_matter).length}
            </div>
            <div className="text-sm text-gray-600">Matter Support</div>
          </div>
          <div className="bg-white p-6 border-2 border-gray-200">
            <div className="text-3xl font-bold text-[#1A1A1A] mb-1">
              {systems.filter(s => s.professional_grade).length}
            </div>
            <div className="text-sm text-gray-600">Professional Grade</div>
          </div>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systems.map((system) => (
            <div key={system.id} className="bg-white border-2 border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{system.name}</h3>
                  <p className="text-sm text-gray-600">{system.tagline}</p>
                </div>
                <button
                  onClick={() => setEditingSystem(system)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              <p className="text-sm text-gray-700 mb-4">{system.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Price Tier</div>
                  <div className="text-sm font-semibold text-[#1A1A1A] capitalize">{system.price_tier}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Platform</div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">{system.platform}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {system.has_ai && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                    <Cpu className="w-3 h-3" />
                    AI-Powered
                  </span>
                )}
                {system.supports_matter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                    <Wifi className="w-3 h-3" />
                    Matter
                  </span>
                )}
                {system.supports_thread && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    Thread
                  </span>
                )}
                {system.professional_grade && (
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded">
                    Professional
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Voice Integration</div>
                <div className="text-sm text-gray-700">
                  {system.voice_integration && system.voice_integration.length > 0 
                    ? system.voice_integration.join(', ')
                    : 'None'}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Compatible Brands ({system.compatibility?.native_brands?.length || 0})</div>
                <div className="text-xs text-gray-600">
                  {system.compatibility?.native_brands?.slice(0, 5).join(', ')}
                  {system.compatibility?.native_brands?.length > 5 && ` +${system.compatibility.native_brands.length - 5} more`}
                </div>
              </div>

              <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
                ID: {system.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingSystem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 border-2 border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Edit Control System</h2>
              <button onClick={() => setEditingSystem(null)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
                <Input
                  value={editingSystem.name}
                  onChange={(e) => setEditingSystem({...editingSystem, name: e.target.value})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <Input
                  value={editingSystem.tagline}
                  onChange={(e) => setEditingSystem({...editingSystem, tagline: e.target.value})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingSystem.description}
                  onChange={(e) => setEditingSystem({...editingSystem, description: e.target.value})}
                  className="w-full h-24 p-3 border-2 border-gray-200 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Tier</label>
                  <select
                    value={editingSystem.price_tier}
                    onChange={(e) => setEditingSystem({...editingSystem, price_tier: e.target.value})}
                    className="w-full h-10 px-3 border-2 border-gray-200 bg-white text-sm"
                  >
                    <option value="entry">Entry</option>
                    <option value="mid">Mid-Range</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <Input
                    value={editingSystem.platform}
                    onChange={(e) => setEditingSystem({...editingSystem, platform: e.target.value})}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 p-4 bg-gray-50 border border-gray-200">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingSystem.has_ai}
                    onChange={(e) => setEditingSystem({...editingSystem, has_ai: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">AI-Powered</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingSystem.supports_matter}
                    onChange={(e) => setEditingSystem({...editingSystem, supports_matter: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Supports Matter Protocol</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingSystem.supports_thread}
                    onChange={(e) => setEditingSystem({...editingSystem, supports_thread: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Supports Thread</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingSystem.professional_grade}
                    onChange={(e) => setEditingSystem({...editingSystem, professional_grade: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Professional Grade</span>
                </label>
              </div>

              {/* Save Button */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => setEditingSystem(null)}
                  variant="outline"
                  className="flex-1"
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => saveSystem(editingSystem)}
                  className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
                  disabled={saving}
                >
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
