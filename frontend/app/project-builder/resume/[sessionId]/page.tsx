'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCms } from '@/hooks/useCms'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface SessionState {
  session_id: string
  current_step: string
  project_data: {
    segment?: string
    property_type?: string
    project_stage?: string
    area_sqft?: number
    location?: string
    num_floors?: number
    num_rooms?: number
    selected_objectives?: string[]
    selected_proposal?: any
    selected_services?: string[]
  }
  completed_steps: string[]
  created_at?: string
  last_updated?: string
}

export default function ResumePage() {
  const cms = useCms('page_project_builder_resume', null)

  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionState, setSessionState] = useState<SessionState | null>(null)

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/project-builder/resume/${sessionId}`)
        const data = await response.json()
        
        if (!response.ok) {
          setError(data.detail || 'Session not found or expired')
          return
        }
        
        if (data.valid && data.session_state) {
          setSessionState(data.session_state)
        } else {
          setError('Unable to restore session')
        }
      } catch (err) {
        setError('Failed to connect to server')
        console.error('Resume validation error:', err)
      } finally {
        setLoading(false)
      }
    }
    
    if (sessionId) {
      validateSession()
    }
  }, [sessionId])

  const handleContinue = () => {
    if (sessionState) {
      // Store session data in localStorage for the builder to pick up
      localStorage.setItem('resumeSession', JSON.stringify({
        sessionId: sessionState.session_id,
        currentStep: sessionState.current_step,
        projectData: sessionState.project_data,
        completedSteps: sessionState.completed_steps
      }))
      
      // Navigate to the project builder
      router.push('/project-builder/start')
    }
  }

  const getStepName = (step: string) => {
    const stepNames: Record<string, string> = {
      'dna': 'Project DNA',
      'objectives': 'Objectives',
      'priorities': 'Priorities',
      'intelligence': 'AI Analysis',
      'proposals': 'Proposals',
      'services': 'Services',
      'boq': 'BOQ Summary',
      'submission': 'Submission'
    }
    return stepNames[step] || step
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 border-2 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Session Unavailable</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Button onClick={() => router.push('/project-builder')} className="gap-2">
            Start New Project
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C9A962] to-[#A68B4B] p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-6 h-6" />
              <h1 className="text-xl font-semibold">Session Restored</h1>
            </div>
            <p className="text-blue-100 text-sm">
              Welcome back! Your project progress has been saved.
            </p>
          </div>

          {/* Session Details */}
          <div className="p-6">
            {sessionState && (
              <>
                {/* Project Overview */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                    Project Overview
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Property Type:</span>
                      <span className="font-medium">{sessionState.project_data.property_type || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Segment:</span>
                      <span className="font-medium">{sessionState.project_data.segment || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Area:</span>
                      <span className="font-medium">
                        {sessionState.project_data.area_sqft 
                          ? `${sessionState.project_data.area_sqft.toLocaleString()} sqft` 
                          : 'Not set'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                    Your Progress
                  </h2>
                  <div className="space-y-2">
                    {['dna', 'objectives', 'priorities', 'intelligence', 'proposals', 'services', 'boq', 'submission'].map((step) => (
                      <div key={step} className="flex items-center gap-3 text-sm">
                        {sessionState.completed_steps.includes(step) ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : sessionState.current_step === step ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#C9A962]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={
                          sessionState.completed_steps.includes(step) 
                            ? 'text-green-700' 
                            : sessionState.current_step === step 
                              ? 'text-blue-700 font-medium' 
                              : 'text-gray-400'
                        }>
                          {getStepName(step)}
                          {sessionState.current_step === step && ' (Resume here)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last Updated */}
                {sessionState.last_updated && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {new Date(sessionState.last_updated).toLocaleDateString()}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/project-builder')}
                    className="flex-1"
                  >
                    Start Fresh
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="flex-1 gap-2 bg-[#C9A962] hover:bg-[#B8983F]"
                    data-testid="continue-session-btn"
                  >
                    Continue Project
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
