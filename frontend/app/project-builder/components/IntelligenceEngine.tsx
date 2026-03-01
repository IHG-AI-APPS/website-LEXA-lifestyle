'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle2, ArrowRight, Loader2, Network, ChevronDown, ChevronRight, Info, Zap, Shield, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import KnowledgeGraphVisualizer from './KnowledgeGraphVisualizer'
import IntelligentLoading from './IntelligentLoading'
import SpectacularLoading from './SpectacularLoading'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL

interface IntelligenceEngineProps {
  sessionId: string
  projectData: any
  onComplete: (data: any) => void
}

// Classification icons
const CLASSIFICATION_CONFIG = {
  mandatory: { icon: Shield, color: 'text-red-600', bg: 'bg-red-50', label: 'Mandatory' },
  recommended: { icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Recommended' },
  luxury: { icon: Lightbulb, color: 'text-[#C9A962]', bg: 'bg-[#C9A962]/5', label: 'Luxury Enhancement' }
}

export default function IntelligenceEngine({ sessionId, projectData, onComplete }: IntelligenceEngineProps) {
  const [loading, setLoading] = useState(true)
  const [resolution, setResolution] = useState<any>(null)
  const [expandedDomains, setExpandedDomains] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list')

  useEffect(() => {
    resolveProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resolveProject = async () => {
    setLoading(true)
    try {
      // Step 1: Start the resolution job
      const startResponse = await fetch(`${BACKEND_URL}/api/project-builder/resolve-with-dependencies`, {
        method: 'POST',
        cache: 'no-store',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          session_id: sessionId,
          selected_bundle_ids: []
        })
      })

      if (!startResponse.ok) {
        throw new Error('Failed to start resolution job')
      }

      const { job_id, poll_interval_ms } = await startResponse.json()
      
      // Step 2: Poll for job status
      const pollInterval = poll_interval_ms || 2000
      const maxAttempts = 60 // 2 min timeout (60 * 2000ms = 120s)
      let attempts = 0
      
      const pollStatus = async (): Promise<any> => {
        attempts++
        
        if (attempts > maxAttempts) {
          throw new Error('Resolution timeout. Please try again.')
        }
        
        const statusResponse = await fetch(`${BACKEND_URL}/api/project-builder/job-status/${job_id}`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
        
        if (!statusResponse.ok) {
          throw new Error('Failed to check job status')
        }
        
        const statusData = await statusResponse.json()
        
        if (statusData.status === 'completed') {
          return statusData.result
        } else if (statusData.status === 'failed') {
          throw new Error(statusData.error || 'Resolution job failed')
        } else {
          // Still processing, poll again
          await new Promise(resolve => setTimeout(resolve, pollInterval))
          return pollStatus()
        }
      }
      
      // Wait for completion
      const data = await pollStatus()
      setResolution(data)
      
      // Auto-select all mandatory and recommended features
      if (data.recommended_bundles) {
        const autoSelected: string[] = []
        data.recommended_bundles.forEach((bundle: any) => {
          if (bundle.features) {
            bundle.features.forEach((feature: any) => {
              if (feature.classification !== 'luxury') {
                autoSelected.push(feature.feature_id)
              }
            })
          }
        })
        setSelectedFeatures(autoSelected)
      }
    } catch (error) {
      console.error('Resolution error:', error)
      alert(`Failed to resolve project: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const toggleDomain = (domain: string) => {
    if (expandedDomains.includes(domain)) {
      setExpandedDomains(expandedDomains.filter(d => d !== domain))
    } else {
      setExpandedDomains([...expandedDomains, domain])
    }
  }

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featureId))
    } else {
      setSelectedFeatures([...selectedFeatures, featureId])
    }
  }

  const classifyFeature = (feature: any, bundle: any): 'mandatory' | 'recommended' | 'luxury' => {
    // AI Classification Logic
    const score = bundle.score || 0
    const complexity = feature.complexity || 3
    const tier = feature.tier || 'Essential'
    
    if (score >= 35 && tier === 'Essential') return 'mandatory'
    if (score >= 25 || tier === 'Premium') return 'recommended'
    return 'luxury'
  }

  const getAIReasoning = (feature: any, bundle: any, projectData: any): string => {
    const reasons: string[] = []
    
    const propertyType = projectData.property_type || 'property'
    const areaSqft = projectData.area_sqft || 0
    const projectStage = projectData.project_stage || 'Concept'
    const objectives = projectData.objectives || projectData.selected_objectives || []
    
    // Property-based reasoning
    if (propertyType === 'Villa' && bundle.system_domain === 'Automation') {
      reasons.push(`Essential for ${areaSqft} sqft ${propertyType} - multi-room control required`)
    }
    
    // Objective-based reasoning
    if (objectives.includes('comfort') && bundle.system_domain === 'HVAC') {
      reasons.push('Comfort objective prioritizes climate control systems')
    }
    
    if (objectives.includes('security') && bundle.system_domain === 'Security') {
      reasons.push('Security objective makes this mandatory for comprehensive protection')
    }
    
    // Stage-based reasoning
    if (projectStage === 'Concept' && feature.invasiveness === 'High') {
      reasons.push('⚠️ High invasiveness - ideal to plan during concept stage')
    }
    
    // Default reasoning
    if (reasons.length === 0) {
      reasons.push(`Recommended for ${propertyType} properties based on industry best practices`)
    }
    
    return reasons.join(' • ')
  }

  const handleContinue = () => {
    if (resolution) {
      const enhancedResolution = {
        ...resolution,
        selected_feature_ids: selectedFeatures,
        feature_count: selectedFeatures.length
      }
      onComplete(enhancedResolution)
    }
  }

  if (loading) {
    return (
      <SpectacularLoading 
        estimatedTime={45}
        onPhaseChange={(phase) => {
          // Could sync with backend progress here
        }}
      />
    )
  }

  if (!resolution) return null

  const mandatoryCount = selectedFeatures.length
  const totalFeatures = resolution.recommended_bundles?.reduce((acc: number, b: any) => 
    acc + (b.features?.length || 0), 0) || 0

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#C9A962]/5 to-[#A68B4B]/5 rounded-full mb-6 border border-blue-200">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-xs uppercase tracking-widest text-blue-900 font-medium">
              AI Intelligence Analysis Complete
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#A68B4B]">Graph</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            693 Features Analyzed • {mandatoryCount} Selected • {resolution.recommended_bundles?.length || 0} Systems
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">
            AI filtered down to {totalFeatures} relevant features for your project
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Systems', value: resolution.recommended_bundles?.length || 0, icon: Network, color: 'blue' },
            { label: 'Features', value: totalFeatures, icon: Zap, color: 'gold' },
            { label: 'Selected', value: mandatoryCount, icon: CheckCircle2, color: 'green' },
            { label: 'Dependencies', value: resolution.dependencies?.auto_added_systems?.length || 0, icon: AlertTriangle, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center hover:border-blue-600 hover:shadow-md transition-all duration-300"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-3 text-${stat.color}-600`} />
              <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              {Object.entries(CLASSIFICATION_CONFIG).map(([key, config]) => {
                const Icon = config.icon
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`${config.bg} p-2 rounded`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300">{config.label}</span>
                  </div>
                )
              })}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">
              💡 Click features to customize • Hover for AI reasoning
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-medium uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">
            System Analysis
          </h3>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-4 py-2 text-sm font-medium rounded transition-all flex items-center gap-2 ${
                viewMode === 'graph'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Network className="w-4 h-4" />
              Graph View
            </button>
          </div>
        </div>

        {/* Knowledge Graph View */}
        {viewMode === 'graph' && resolution.dependency_graph && (
          <div className="mb-12">
            <KnowledgeGraphVisualizer
              graphData={resolution.dependency_graph}
              selectedSystems={resolution.recommended_bundles?.map((b: any) => b.system_domain) || []}
            />
          </div>
        )}

        {/* System Domains with Feature Drill-Down (List View) */}
        {viewMode === 'list' && (
          <div className="space-y-4 mb-12">
            <h3 className="text-lg font-medium mb-6 uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">
              Recommended Systems & Features
            </h3>
          
          {resolution.recommended_bundles?.map((bundle: any, bundleIndex: number) => {
            const isExpanded = expandedDomains.includes(bundle.system_domain)
            const bundleFeatures = bundle.features || []
            const selectedInBundle = bundleFeatures.filter((f: any) => 
              selectedFeatures.includes(f.feature_id || f.feature_name)
            ).length
            
            return (
              <motion.div
                key={bundleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: bundleIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-600 transition-all duration-300"
              >
                {/* Domain Header - Clickable */}
                <button
                  onClick={() => toggleDomain(bundle.system_domain)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white dark:text-white">{bundle.system_domain}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {bundleFeatures.length} features • {selectedInBundle} selected • Score: {Math.round(bundle.score)}/100
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-gradient-to-r from-[#C9A962] to-[#A68B4B] text-white text-xs font-mono rounded">
                      {bundle.tier}
                    </div>
                    <span className="text-xs text-gray-500">Click to expand</span>
                  </div>
                </button>

                {/* Features List - Expandable */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 dark:border-gray-700 bg-gray-50"
                    >
                      <div className="p-6 space-y-3">
                        {bundleFeatures.slice(0, 10).map((feature: any, featureIndex: number) => {
                          const featureId = feature.feature_id || feature.feature_name
                          const isSelected = selectedFeatures.includes(featureId)
                          const classification = classifyFeature(feature, bundle)
                          const classConfig = CLASSIFICATION_CONFIG[classification]
                          const ClassIcon = classConfig.icon
                          const reasoning = getAIReasoning(feature, bundle, projectData)
                          
                          return (
                            <motion.button
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.05 }}
                              onClick={() => toggleFeature(featureId)}
                              onMouseEnter={() => setHoveredFeature(featureId)}
                              onMouseLeave={() => setHoveredFeature(null)}
                              className={`w-full p-4 border rounded text-left transition-all duration-300 relative group ${
                                isSelected
                                  ? 'border-blue-600 bg-white dark:bg-gray-800 shadow-md'
                                  : 'border-gray-200 dark:border-gray-700 bg-white hover:border-gray-300 dark:border-gray-600 hover:shadow-sm'
                              }`}
                            >
                              {/* Selection Checkbox */}
                              <div className="flex items-start gap-3">
                                <div className={`mt-0.5 flex-shrink-0 ${
                                  isSelected ? 'text-blue-600' : 'text-gray-300'
                                }`}>
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                
                                <div className="flex-1">
                                  {/* Feature Name + Classification */}
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <h5 className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                                      {feature.feature_name}
                                    </h5>
                                    <div className={`${classConfig.bg} px-2 py-1 rounded flex items-center gap-1 flex-shrink-0`}>
                                      <ClassIcon className={`w-3 h-3 ${classConfig.color}`} />
                                      <span className={`text-[10px] uppercase font-medium ${classConfig.color}`}>
                                        {classConfig.label}
                                      </span>
                                    </div>
                                  </div>

                                  {/* AI Reasoning */}
                                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex items-start gap-1">
                                    <Brain className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span>{reasoning}</span>
                                  </div>

                                  {/* Metadata Row */}
                                  <div className="flex items-center gap-4 text-[10px] text-gray-500">
                                    <span>Complexity: {feature.complexity || 3}/10</span>
                                    <span>•</span>
                                    <span>Tier: {feature.tier}</span>
                                    {feature.dependencies && (
                                      <>
                                        <span>•</span>
                                        <span className="text-orange-600">Requires: {feature.dependencies.slice(0, 2).join(', ')}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Hover Tooltip */}
                              {hoveredFeature === featureId && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute left-0 right-0 top-full mt-2 p-3 bg-[#0A0A0A] dark:bg-[#050505] text-white text-xs rounded shadow-lg z-10"
                                >
                                  <div className="font-medium mb-1">AI Analysis:</div>
                                  <div>{reasoning}</div>
                                  {feature.dependencies && (
                                    <div className="mt-2 pt-2 border-t border-gray-700">
                                      <span className="font-medium">Dependencies:</span> {feature.dependencies.join(', ')}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </motion.button>
                          )
                        })}
                        
                        {bundleFeatures.length > 10 && (
                          <div className="text-center py-2 text-xs text-gray-500">
                            + {bundleFeatures.length - 10} more features in this system
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
        )}
        {/* End List View */}

        {/* Dependency Visualization */}
        {resolution.dependencies?.auto_added_systems?.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-8 mb-12">
            <div className="flex items-start gap-3 mb-4">
              <Network className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="text-sm font-medium uppercase tracking-widest text-gray-900 dark:text-white mb-2">Auto-Resolved Dependencies</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                  These systems were automatically added as prerequisites:
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {resolution.dependencies.auto_added_systems.map((system: string, index: number) => (
                <div key={index} className="px-4 py-2 bg-white border-2 border-orange-600 text-sm font-medium text-orange-900 shadow-sm">
                  {system}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
            <span className="font-semibold text-blue-600">{mandatoryCount}</span> features selected from {totalFeatures} analyzed
          </div>
          <Button
            onClick={handleContinue}
            disabled={selectedFeatures.length === 0}
            className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
          >
            Generate Architecture Proposals ({selectedFeatures.length} features)
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            AI will generate 3 architecture options based on your selections
          </p>
        </div>
      </motion.div>
    </div>
  )
}
