'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, Award, TrendingUp, Globe, Users } from 'lucide-react'

interface Stat {
  icon: string
  value: number
  suffix: string
  label: string
}

const availableIcons = ['Award', 'TrendingUp', 'Globe', 'Users']

export default function SettingsPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchStats()
    fetchMaintenanceMode()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings/homepage_stats`)
      const data = await response.json()
      setStats(data.value || [])
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMaintenanceMode = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings/maintenance_mode`)
      const data = await response.json()
      setMaintenanceMode(data.value || false)
    } catch (error) {
      console.error('Error fetching maintenance mode:', error)
    }
  }

  const toggleMaintenanceMode = async () => {
    try {
      const newValue = !maintenanceMode
      const token = localStorage.getItem('admin_token')
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/settings/maintenance_mode`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ value: newValue })
        }
      )
      setMaintenanceMode(newValue)
      setMessage(`✅ Maintenance mode ${newValue ? 'enabled' : 'disabled'}`)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Failed to update maintenance mode')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/settings/homepage_stats`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ value: stats })
        }
      )

      if (!response.ok) throw new Error('Failed to save')
      
      setMessage('✅ Stats updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Failed to save stats')
      console.error('Error saving stats:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateStat = (index: number, field: keyof Stat, value: any) => {
    const newStats = [...stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setStats(newStats)
  }

  const addStat = () => {
    setStats([...stats, { icon: 'Award', value: 0, suffix: '+', label: 'New Stat' }])
  }

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Site Settings</h1>
          <p className="text-gray-600">Manage homepage stats and site-wide content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded"
        >
          {message}
        </motion.div>
      )}

      {/* Maintenance Mode Section */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Maintenance Mode</h2>
            <p className="text-gray-600">
              Enable to show maintenance page to visitors. Admins can still access the site.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${maintenanceMode ? 'text-red-600' : 'text-green-600'}`}>
              {maintenanceMode ? 'ENABLED' : 'DISABLED'}
            </span>
            <button
              onClick={toggleMaintenanceMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                maintenanceMode ? 'bg-red-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  maintenanceMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        {maintenanceMode && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">
              ⚠️ <strong>Warning:</strong> Maintenance mode is active. Public visitors will see a maintenance page.
            </p>
          </div>
        )}
      </div>

      {/* Homepage Stats Section */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Homepage Statistics</h2>
          <button
            onClick={addStat}
            className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
            Add Stat
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 p-4 relative"
            >
              <button
                onClick={() => removeStat(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <select
                    value={stat.icon}
                    onChange={(e) => updateStat(index, 'icon', e.target.value)}
                    className="w-full border border-gray-300 p-2"
                  >
                    {availableIcons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Value</label>
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Suffix</label>
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                    className="w-full border border-gray-300 p-2"
                    placeholder="+ or s"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    className="w-full border border-gray-300 p-2"
                    placeholder="Premium Brands"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const iconMap: any = { Award, TrendingUp, Globe, Users }
            const Icon = iconMap[stat.icon] || Award
            return (
              <div key={index} className="text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-[#E8DCC8]" />
                <div className="text-3xl font-bold mb-1">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <p className="text-sm text-gray-600 uppercase">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
