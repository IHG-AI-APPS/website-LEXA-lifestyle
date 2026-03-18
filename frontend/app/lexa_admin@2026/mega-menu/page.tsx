'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Save, Eye, EyeOff, Star, CheckCircle, BarChart3 } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface Solution {
  slug: string
  title: string
  featured?: boolean
  popular?: boolean
  badge?: string
  mega_menu_category?: string
  mega_menu_order?: number
}

interface Stats {
  solutions: {
    total: number
    with_faqs: number
    featured: number
    faq_completion: string
  }
}

export default function AdminMegaMenuConfig() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [changes, setChanges] = useState<Record<string, Partial<Solution>>>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch solutions and stats in parallel
      const [solutionsRes, statsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/admin/content/solutions`),
        fetch(`${BACKEND_URL}/api/admin/content/stats`)
      ])

      const [solutionsData, statsData] = await Promise.all([
        solutionsRes.json(),
        statsRes.json()
      ])

      if (solutionsData.success) {
        setSolutions(solutionsData.data.sort((a: Solution, b: Solution) => 
          (a.mega_menu_order || 999) - (b.mega_menu_order || 999)
        ))
      }

      if (statsData.success) {
        setStats(statsData.data)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setMessage('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const updateSolution = (slug: string, field: keyof Solution, value: any) => {
    setChanges({
      ...changes,
      [slug]: {
        ...changes[slug],
        slug,
        [field]: value
      }
    })

    // Update local state immediately for UI feedback
    setSolutions(solutions.map(s =>
      s.slug === slug ? { ...s, [field]: value } : s
    ))
  }

  const saveChanges = async () => {
    const changesToSave = Object.values(changes)
    if (changesToSave.length === 0) {
      setMessage('No changes to save')
      return
    }

    try {
      setSaving(true)
      setMessage('')

      const response = await fetch(`${BACKEND_URL}/api/admin/content/mega-menu/bulk-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solutions: changesToSave })
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`✓ Successfully updated ${data.updated_count} solutions`)
        setChanges({})
        
        // Refresh data
        await fetchData()
        
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save changes')
      }
    } catch (error) {
      console.error('Failed to save changes:', error)
      setMessage('Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'residential': return 'bg-blue-100 text-blue-800'
      case 'commercial': return 'bg-purple-100 text-purple-800'
      case 'specialized': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mega Menu Configuration</h1>
          <p className="text-gray-600">
            Control which solutions appear in the mega menu, their categories, order, and badges.
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Total Solutions</span>
              </div>
              <div className="text-2xl font-bold">{stats.solutions.total}</div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-[#E8DCC8]" />
                <span className="text-sm font-medium text-gray-600">Featured</span>
              </div>
              <div className="text-2xl font-bold">{stats.solutions.featured}</div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">With FAQs</span>
              </div>
              <div className="text-2xl font-bold">{stats.solutions.with_faqs}</div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">FAQ Completion</span>
              </div>
              <div className="text-2xl font-bold">{stats.solutions.faq_completion}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            {Object.keys(changes).length > 0 && (
              <span className="text-orange-600 font-medium">
                {Object.keys(changes).length} unsaved change{Object.keys(changes).length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <Button
            onClick={saveChanges}
            disabled={saving || Object.keys(changes).length === 0}
            className="bg-[#E8DCC8] hover:bg-[#B5952F] text-white flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
            message.startsWith('✓') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.startsWith('✓') && <CheckCircle className="h-4 w-4" />}
            {message}
          </div>
        )}

        {/* Solutions Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Solution
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Featured
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Badge
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {solutions.map((solution) => (
                <tr key={solution.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{solution.title}</div>
                    <div className="text-xs text-gray-500">{solution.slug}</div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => updateSolution(solution.slug, 'featured', !solution.featured)}
                      className={`p-2 rounded-lg transition-colors ${
                        solution.featured
                          ? 'bg-[#E8DCC8] text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {solution.featured ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={solution.mega_menu_category || ''}
                      onChange={(e) => updateSolution(solution.slug, 'mega_menu_category', e.target.value)}
                      disabled={!solution.featured}
                      className={`px-3 py-1.5 text-sm rounded-lg border ${
                        solution.featured ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                      } ${getCategoryColor(solution.mega_menu_category)}`}
                    >
                      <option value="">None</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="specialized">Specialized</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={solution.mega_menu_order || ''}
                      onChange={(e) => updateSolution(solution.slug, 'mega_menu_order', parseInt(e.target.value))}
                      disabled={!solution.featured}
                      className={`w-16 px-2 py-1.5 text-sm text-center rounded-lg border ${
                        solution.featured ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={solution.badge || ''}
                      onChange={(e) => updateSolution(solution.slug, 'badge', e.target.value)}
                      disabled={!solution.featured}
                      placeholder="e.g. Popular"
                      className={`px-3 py-1.5 text-sm rounded-lg border w-full max-w-[120px] ${
                        solution.featured ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Toggle &quot;Featured&quot; to show/hide solutions in the mega menu</li>
            <li>Category determines which column the solution appears in</li>
            <li>Lower order numbers appear first (1, 2, 3...)</li>
            <li>Badge adds a label like &quot;Popular&quot;, &quot;Premium&quot;, or &quot;New&quot;</li>
            <li>Changes take effect immediately on the frontend after saving</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
