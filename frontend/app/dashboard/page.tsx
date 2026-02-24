'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FolderOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus,
  Trash2,
  RefreshCw,
  Building2,
  Calendar,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface SavedSession {
  session_id: string
  segment: string
  property_type: string
  area_sqft: number
  project_stage: string
  current_step: string
  completed_steps: string[]
  created_at: string
  updated_at: string
  completed: boolean
  selected_proposal?: string
}

export default function DashboardPage() {
  const [sessions, setSessions] = useState<SavedSession[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    setLoading(true)
    try {
      // Load from localStorage (client-side storage)
      const savedSessions = localStorage.getItem('lexaSessions')
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions)
        
        // Validate sessions against backend
        const validatedSessions = await Promise.all(
          parsed.map(async (session: SavedSession) => {
            try {
              const response = await fetch(`${API_URL}/api/project-builder/resume/${session.session_id}`)
              if (response.ok) {
                const data = await response.json()
                if (data.valid && data.session_state) {
                  return {
                    ...session,
                    current_step: data.session_state.current_step,
                    completed_steps: data.session_state.completed_steps,
                    completed: data.session_state.current_step === 'submission_complete'
                  }
                }
              }
              return null
            } catch {
              return null
            }
          })
        )
        
        const validSessions = validatedSessions.filter(Boolean)
        setSessions(validSessions)
        localStorage.setItem('lexaSessions', JSON.stringify(validSessions))
      }
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteSession = async (sessionId: string) => {
    setDeletingId(sessionId)
    try {
      // Remove from localStorage
      const updatedSessions = sessions.filter(s => s.session_id !== sessionId)
      setSessions(updatedSessions)
      localStorage.setItem('lexaSessions', JSON.stringify(updatedSessions))
      toast.success('Project removed from dashboard')
    } catch (error) {
      toast.error('Failed to remove project')
    } finally {
      setDeletingId(null)
    }
  }

  const getStepProgress = (session: SavedSession) => {
    const totalSteps = 8
    const completed = session.completed_steps?.length || 0
    return Math.round((completed / totalSteps) * 100)
  }

  const getStepLabel = (step: string) => {
    const labels: Record<string, string> = {
      'dna': 'Project DNA',
      'objectives': 'Objectives',
      'priorities': 'Priorities',
      'intelligence': 'AI Analysis',
      'proposals': 'Proposals',
      'services': 'Services',
      'boq': 'BOQ Summary',
      'submission': 'Submission',
      'submission_complete': 'Complete'
    }
    return labels[step] || step
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">My Projects</h1>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Track and manage your smart home projects</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={loadSessions}
                className="gap-2"
                data-testid="refresh-projects-btn"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Link href="/project-builder">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="new-project-btn">
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-100 rounded-xl"></div>
              <div className="h-32 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && sessions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Projects Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start building your smart home project and it will appear here. 
              Your progress is automatically saved.
            </p>
            <Link href="/project-builder">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Start Your First Project
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && sessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session, index) => (
              <motion.div
                key={session.session_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                data-testid={`project-card-${session.session_id}`}
              >
                {/* Card Header */}
                <div className={`p-4 ${session.completed ? 'bg-green-50' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className={`w-5 h-5 ${session.completed ? 'text-green-600' : 'text-blue-600'}`} />
                      <span className="font-medium text-gray-900 dark:text-white dark:text-white">{session.property_type}</span>
                    </div>
                    {session.completed ? (
                      <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Complete
                      </span>
                    ) : (
                      <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Segment:</span>
                      <span className="font-medium">{session.segment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Area:</span>
                      <span className="font-medium">{session.area_sqft?.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Stage:</span>
                      <span className="font-medium">{session.project_stage}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {!session.completed && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{getStepProgress(session)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${getStepProgress(session)}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Current: {getStepLabel(session.current_step)}
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {session.updated_at 
                        ? `Updated ${formatDate(session.updated_at)}`
                        : `Created ${formatDate(session.created_at)}`
                      }
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/project-builder/resume/${session.session_id}`} className="flex-1">
                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                        data-testid={`continue-project-${session.session_id}`}
                      >
                        {session.completed ? 'View Details' : 'Continue'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSession(session.session_id)}
                      disabled={deletingId === session.session_id}
                      className="text-gray-400 hover:text-red-600 hover:border-red-200 p-2"
                      data-testid={`delete-project-${session.session_id}`}
                    >
                      {deletingId === session.session_id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {!loading && sessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-3xl font-semibold text-gray-900 dark:text-white dark:text-white">{sessions.length}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-3xl font-semibold text-blue-600">
                {sessions.filter(s => !s.completed).length}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-3xl font-semibold text-green-600">
                {sessions.filter(s => s.completed).length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
