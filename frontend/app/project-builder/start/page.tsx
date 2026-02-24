'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectDNACapture from '../components/ProjectDNACapture'
import ObjectiveSelector from '../components/ObjectiveSelector'
import NeedPrioritization from '../components/NeedPrioritization'
import IntelligenceEngine from '../components/IntelligenceEngine'
import IntelligenceCapture from '../components/IntelligenceCapture'
import ProposalComparison from '../components/ProposalComparison'
import ServiceLayer from '../components/ServiceLayer'
import BOQSummary from '../components/BOQSummary'
import FinalSubmission from '../components/FinalSubmission'
import StepProgress from '../components/StepProgress'
import NavigationControls from '../components/NavigationControls'

export default function ProjectBuilderFlow() {
  const [currentView, setCurrentView] = useState<string>('dna') 
  // dna, objectives, priorities, intelligence, capture, proposals, services, boq, submission
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [projectData, setProjectData] = useState<any>({})
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  // Track completed steps
  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  // Navigation helpers
  const goToStep = (stepId: string) => {
    // Only allow going to completed steps or current step
    if (completedSteps.includes(stepId) || stepId === currentView) {
      setCurrentView(stepId)
    }
  }

  const canGoBack = () => {
    const steps = ['dna', 'objectives', 'priorities', 'intelligence', 'proposals', 'services', 'boq', 'submission']
    const currentIndex = steps.indexOf(currentView)
    return currentIndex > 0
  }

  const goBack = () => {
    const steps = ['dna', 'objectives', 'priorities', 'intelligence', 'proposals', 'services', 'boq', 'submission']
    const currentIndex = steps.indexOf(currentView)
    if (currentIndex > 0) {
      setCurrentView(steps[currentIndex - 1])
    }
  }

  const canGoForward = () => {
    // Add logic for when forward is enabled (step is complete)
    return false // Will be updated based on current step state
  }

  // Save session to localStorage for dashboard
  const saveSessionToStorage = (sessionData: any) => {
    try {
      const savedSessions = localStorage.getItem('lexaSessions')
      const sessions = savedSessions ? JSON.parse(savedSessions) : []
      
      // Check if session already exists
      const existingIndex = sessions.findIndex((s: any) => s.session_id === sessionData.session_id)
      
      const sessionRecord = {
        session_id: sessionData.session_id,
        segment: sessionData.segment,
        property_type: sessionData.property_type,
        area_sqft: sessionData.area_sqft,
        project_stage: sessionData.project_stage,
        current_step: 'objectives',
        completed_steps: ['dna'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed: false
      }
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = { ...sessions[existingIndex], ...sessionRecord }
      } else {
        sessions.unshift(sessionRecord) // Add to beginning
      }
      
      // Keep only last 10 sessions
      localStorage.setItem('lexaSessions', JSON.stringify(sessions.slice(0, 10)))
    } catch (error) {
      console.error('Failed to save session to storage:', error)
    }
  }

  const handleDNAComplete = (data: any) => {
    setSessionId(data.session_id)
    setProjectData({ ...projectData, ...data })
    markStepComplete('dna')
    saveSessionToStorage(data)
    setCurrentView('objectives')
  }

  const handleObjectivesComplete = (data: any) => {
    setProjectData({ ...projectData, objectives: data })
    markStepComplete('objectives')
    setCurrentView('priorities')
  }

  const handlePrioritiesComplete = (data: any) => {
    setProjectData({ ...projectData, priorities: data })
    markStepComplete('priorities')
    setCurrentView('intelligence')
  }

  const handleIntelligenceComplete = (data: any) => {
    setProjectData({ ...projectData, resolution: data })
    markStepComplete('intelligence')
    // Skip capture step - go directly to proposals  
    setCurrentView('proposals')
  }

  const handleCaptureComplete = (data: any) => {
    setProjectData({ ...projectData, intelligence_capture: data })
    markStepComplete('capture')
    setCurrentView('proposals')
  }

  const handleProposalSelected = (data: any) => {
    setProjectData({ ...projectData, selectedProposal: data })
    markStepComplete('proposals')
    setCurrentView('services')
  }

  const handleServicesComplete = (data: any) => {
    setProjectData({ ...projectData, services: data })
    setCurrentView('boq')
  }

  const handleBOQComplete = () => {
    setCurrentView('submission')
  }

  const handleSubmissionComplete = () => {
    console.log('Project submitted successfully')
  }

  return (
    <div className="min-h-screen bg-white pb-32 lg:pb-24">
      {/* Step Progress Indicator */}
      <StepProgress
        currentStep={currentView}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-7xl">
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentView === 'dna' && (
              <ProjectDNACapture onComplete={handleDNAComplete} />
            )}

            {currentView === 'objectives' && sessionId && (
              <ObjectiveSelector 
                sessionId={sessionId} 
                onComplete={handleObjectivesComplete} 
              />
            )}

            {currentView === 'priorities' && sessionId && (
              <NeedPrioritization
                sessionId={sessionId}
                projectData={projectData}
                onComplete={handlePrioritiesComplete}
              />
            )}

            {currentView === 'intelligence' && sessionId && (
              <IntelligenceEngine 
                sessionId={sessionId}
                projectData={projectData}
                onComplete={handleIntelligenceComplete}
              />
            )}

            {currentView === 'capture' && sessionId && (
              <IntelligenceCapture
                sessionId={sessionId}
                onComplete={handleCaptureComplete}
              />
            )}

            {currentView === 'proposals' && sessionId && (
              <ProposalComparison
                sessionId={sessionId}
                resolutionData={projectData.resolution}
                onSelect={handleProposalSelected}
              />
            )}

            {currentView === 'services' && sessionId && (
              <ServiceLayer
                sessionId={sessionId}
                projectData={projectData}
                onComplete={handleServicesComplete}
              />
            )}

            {currentView === 'boq' && sessionId && (
              <BOQSummary
                sessionId={sessionId}
                selectedProposal={projectData.selectedProposal}
                onComplete={handleBOQComplete}
              />
            )}

            {currentView === 'submission' && sessionId && (
              <FinalSubmission
                sessionId={sessionId}
                projectData={projectData}
                onComplete={handleSubmissionComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        onBack={goBack}
        onForward={() => {}} // Each step handles its own forward logic
        canGoBack={canGoBack()}
        canGoForward={false} // Managed by individual step components
      />
    </div>
  )
}
