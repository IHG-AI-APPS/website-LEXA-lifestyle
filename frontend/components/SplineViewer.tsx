'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Maximize2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SplineViewerProps {
  sceneUrl?: string
  title?: string
  description?: string
}

// Default Spline scene URLs (you'll replace these with actual scenes)
const DEFAULT_SCENES = {
  'smart-home-living': 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  'smart-home-kitchen': 'https://prod.spline.design/XpKz1x5JkNVGdGKj/scene.splinecode',
  'smart-office': 'https://prod.spline.design/ZF0W7WgB5u-hDKcH/scene.splinecode',
}

export default function SplineViewer({ sceneUrl, title, description }: SplineViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedScene, setSelectedScene] = useState('smart-home-living')

  const currentSceneUrl = sceneUrl || DEFAULT_SCENES[selectedScene as keyof typeof DEFAULT_SCENES]

  return (
    <div className="space-y-6">
      {/* Scene Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">{title || '3D Smart Home Visualization'}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description || 'Explore our smart home solutions in 3D'}</p>
        </div>
        
        <select
          value={selectedScene}
          onChange={(e) => setSelectedScene(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-2 font-semibold"
        >
          <option value="smart-home-living">Living Room</option>
          <option value="smart-home-kitchen">Kitchen</option>
          <option value="smart-office">Smart Office</option>
        </select>
      </div>

      {/* 3D Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: isFullscreen ? '100vh' : '600px' }}
      >
        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all"
        >
          {isFullscreen ? <X size={24} /> : <Maximize2 size={24} />}
        </button>

        {/* Spline Embed */}
        <iframe
          src={currentSceneUrl}
          frameBorder="0"
          width="100%"
          height="100%"
          title="3D Smart Home Visualization"
          className="w-full h-full"
        />

        {/* Loading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center pointer-events-none">
          <div className="text-white text-center">
            <Eye className="mx-auto mb-4 animate-pulse" size={48} />
            <p className="text-lg">Loading 3D Experience...</p>
          </div>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="text-blue-600 font-semibold mb-1">Interactive</div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Click and drag to rotate the 3D model</p>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <div className="text-purple-600 font-semibold mb-1">Explore</div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Zoom in to see device details and placement</p>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="text-green-600 font-semibold mb-1">Realistic</div>
          <p className="text-sm text-gray-700 dark:text-gray-300">See how smart devices integrate in real spaces</p>
        </div>
      </div>

      {/* Setup Instructions (For Developer) */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
        <h4 className="font-bold text-yellow-900 mb-2">🎨 Setup Instructions (For Admin)</h4>
        <div className="text-sm text-yellow-800 space-y-2">
          <p><strong>To add custom 3D scenes:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Go to <a href="https://spline.design" target="_blank" rel="noopener noreferrer" className="underline">spline.design</a> and create a free account</li>
            <li>Create your smart home 3D scene (or use templates)</li>
            <li>Click &quot;Export&quot; → &quot;Code Export&quot; → Get the Spline URL</li>
            <li>Update <code className="bg-yellow-100 px-1 py-0.5 rounded">DEFAULT_SCENES</code> in <code className="bg-yellow-100 px-1 py-0.5 rounded">SplineViewer.tsx</code></li>
          </ol>
          <p className="mt-3"><strong>Current Status:</strong> Using placeholder Spline scenes. Replace URLs with your custom designs.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Experience It In Person</h3>
        <p className="text-gray-300 mb-6">
          Visit our Experience Center to interact with these smart home systems
        </p>
        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-100"
          onClick={() => window.location.href = '/contact'}
        >
          Book Your Visit
        </Button>
      </div>
    </div>
  )
}
