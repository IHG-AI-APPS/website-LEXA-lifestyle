'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Save, Plus, Trash2, CheckCircle } from 'lucide-react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'

interface FAQ {
  question: string
  answer: string
}

interface Solution {
  slug: string
  title: string
  faqs?: FAQ[]
}

export default function AdminFAQsManager() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/admin/content/solutions`)
      const data = await response.json()
      
      if (data.success) {
        setSolutions(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch solutions:', error)
      setMessage('Failed to load solutions')
    } finally {
      setLoading(false)
    }
  }

  const loadSolutionFAQs = async (slug: string) => {
    try {
      const solution = solutions.find(s => s.slug === slug)
      setSelectedSolution(solution || null)
      setFaqs(solution?.faqs || [])
    } catch (error) {
      console.error('Failed to load FAQs:', error)
    }
  }

  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '' }])
  }

  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  const saveFAQs = async () => {
    if (!selectedSolution) return

    try {
      setSaving(true)
      setMessage('')
      
      const response = await fetch(
        `${BACKEND_URL}/api/admin/content/solutions/${selectedSolution.slug}/faqs`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ faqs })
        }
      )

      const data = await response.json()

      if (data.success) {
        setMessage(`✓ Successfully saved ${faqs.length} FAQs`)
        // Update local solutions list
        setSolutions(solutions.map(s =>
          s.slug === selectedSolution.slug ? { ...s, faqs } : s
        ))
        
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save FAQs')
      }
    } catch (error) {
      console.error('Failed to save FAQs:', error)
      setMessage('Error saving FAQs')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded"></div>
              ))}
            </div>
            <div className="lg:col-span-3 h-64 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Solution FAQs</h1>
          <p className="text-gray-600">
            Add, edit, or remove FAQs for each solution. Changes will appear on both dynamic and static solution pages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Solutions List */}
          <div className="lg:col-span-1 space-y-2">
            <h2 className="font-semibold mb-3">Solutions</h2>
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {solutions.map((solution) => (
                <button
                  key={solution.slug}
                  onClick={() => loadSolutionFAQs(solution.slug)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedSolution?.slug === solution.slug
                      ? 'bg-[#E8DCC8] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium text-sm">{solution.title}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {solution.faqs?.length || 0} FAQs
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* FAQs Editor */}
          <div className="lg:col-span-3">
            {selectedSolution ? (
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSolution.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={addFAQ}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add FAQ
                    </Button>
                    <Button
                      onClick={saveFAQs}
                      disabled={saving}
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
                          Save FAQs
                        </>
                      )}
                    </Button>
                  </div>
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

                <div className="space-y-6 max-h-[600px] overflow-y-auto">
                  {faqs.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No FAQs yet. Click &quot;Add FAQ&quot; to create one.</p>
                    </div>
                  ) : (
                    faqs.map((faq, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-500">
                            FAQ #{index + 1}
                          </span>
                          <button
                            onClick={() => removeFAQ(index)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Question
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8DCC8] focus:border-transparent"
                              placeholder="Enter question..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Answer
                            </label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8DCC8] focus:border-transparent resize-none"
                              placeholder="Enter answer..."
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed rounded-lg p-12 text-center">
                <p className="text-gray-500">
                  Select a solution from the list to manage its FAQs
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
