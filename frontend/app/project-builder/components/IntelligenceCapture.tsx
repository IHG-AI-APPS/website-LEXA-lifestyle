'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, ArrowRight, X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IntelligenceCaptureProps {
  sessionId: string
  onComplete: (data: any) => void
}

export default function IntelligenceCapture({ sessionId, onComplete }: IntelligenceCaptureProps) {
  const [constraints, setConstraints] = useState({
    budget_max: '',
    timeline_constraint: '',
    no_ceiling_work: false,
    no_wall_drilling: false,
    noise_restrictions: false,
    custom_constraints: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleContinue = () => {
    const captureData = {
      constraints,
      uploaded_files: uploadedFiles.map(f => f.name),
      file_count: uploadedFiles.length
    }
    onComplete(captureData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#A68B4B]">Intelligence</span>
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            Constraints & Documentation (Optional)
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">
            Help AI refine recommendations with project-specific requirements
          </p>
        </div>

        {/* Budget Constraint */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h3 className="text-sm font-medium uppercase tracking-widest text-gray-900 dark:text-white mb-4">Budget Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Maximum Budget (Optional)</label>
              <Input
                type="text"
                value={constraints.budget_max}
                onChange={(e) => setConstraints({ ...constraints, budget_max: e.target.value })}
                placeholder="e.g., AED 500,000"
                className="border-gray-200 dark:border-gray-700 focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Timeline Constraint</label>
              <Input
                type="text"
                value={constraints.timeline_constraint}
                onChange={(e) => setConstraints({ ...constraints, timeline_constraint: e.target.value })}
                placeholder="e.g., Must complete in 3 months"
                className="border-gray-200 dark:border-gray-700 focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Site Constraints */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h3 className="text-sm font-medium uppercase tracking-widest text-gray-900 dark:text-white mb-4">Site Constraints</h3>
          <div className="space-y-3">
            {[
              { key: 'no_ceiling_work', label: 'No ceiling work allowed', desc: 'Exclude ceiling-mounted features' },
              { key: 'no_wall_drilling', label: 'Minimize wall drilling', desc: 'Prefer wireless/surface-mount solutions' },
              { key: 'noise_restrictions', label: 'Noise restrictions', desc: 'Limit installation noise (occupied building)' }
            ].map((constraint) => (
              <label key={constraint.key} className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-600 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={constraints[constraint.key as keyof typeof constraints] as boolean}
                  onChange={(e) => setConstraints({ ...constraints, [constraint.key]: e.target.checked })}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">{constraint.label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">{constraint.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Constraints */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h3 className="text-sm font-medium uppercase tracking-widest text-gray-900 dark:text-white mb-4">Additional Requirements</h3>
          <textarea
            value={constraints.custom_constraints}
            onChange={(e) => setConstraints({ ...constraints, custom_constraints: e.target.value })}
            placeholder="Any other specific requirements or constraints...\ne.g., 'Must use specific brand for lighting', 'Avoid smart speakers due to privacy', 'Integration with existing Crestron system required'"
            rows={4}
            className="w-full border border-gray-200 dark:border-gray-700 focus:border-blue-600 outline-none text-gray-900 dark:text-white placeholder-gray-400 p-4 text-sm"
          />
        </div>

        {/* File Upload */}
        <div className="bg-gradient-to-br from-[#C9A962]/5 to-[#A68B4B]/5 border border-blue-200 p-8 mb-12">
          <div className="flex items-start gap-3 mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-gray-900 dark:text-white mb-2">Upload Drawings (Optional)</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                Floor plans, elevations, or site photos help AI understand spatial constraints
              </p>
            </div>
          </div>

          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.dwg"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="block w-full p-8 border-2 border-dashed border-blue-300 hover:border-blue-600 cursor-pointer transition-colors text-center"
          >
            <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">Click to upload or drag files here</div>
            <div className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, DWG (Max 10MB each)</div>
          </label>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-900 dark:text-white dark:text-white">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(0)} KB)</span>
                  </div>
                  <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-700 dark:text-gray-300 dark:text-gray-300">
            <span className="font-medium">AI Enhancement:</span> Constraints help the recommendation engine filter out incompatible features and prioritize solutions that fit your specific requirements. This step is optional but improves proposal accuracy.
          </div>
        </div>

        {/* Continue */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            className="bg-charcoal hover:bg-charcoal-light text-white px-12 py-6 h-auto group"
          >
            Continue to Proposals
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            You can skip this step if you don&apos;t have specific constraints
          </p>
        </div>
      </motion.div>
    </div>
  )
}
