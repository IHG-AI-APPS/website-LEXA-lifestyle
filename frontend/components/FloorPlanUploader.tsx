'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import SafeImage from '@/components/ui/SafeImage'
import { Upload, X, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

// Dynamically import ReactImageAnnotate to avoid SSR issues
const ReactImageAnnotate = dynamic(
  () => import('react-image-annotate').then((mod: any) => mod.default || mod),
  { ssr: false, loading: () => <div className="h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">Loading annotation tool...</div> }
) as any

interface FloorPlanUploaderProps {
  onSave: (imageUrl: string, annotations: any[]) => void
  initialImage?: string
  initialAnnotations?: any[]
}

const DEVICE_TYPES = [
  { id: 'smart-light', label: '💡 Smart Light', color: '#FCD34D' },
  { id: 'motion-sensor', label: '👁️ Motion Sensor', color: '#60A5FA' },
  { id: 'camera', label: '📷 Security Camera', color: '#EF4444' },
  { id: 'door-lock', label: '🔐 Smart Lock', color: '#8B5CF6' },
  { id: 'thermostat', label: '🌡️ Thermostat', color: '#10B981' },
  { id: 'smoke-detector', label: '🔔 Smoke Detector', color: '#F97316' },
  { id: 'speaker', label: '🔊 Smart Speaker', color: '#EC4899' },
  { id: 'switch', label: '🎚️ Smart Switch', color: '#6366F1' },
]

export default function FloorPlanUploader({ onSave, initialImage, initialAnnotations }: FloorPlanUploaderProps) {
  const [floorPlanImage, setFloorPlanImage] = useState<string | null>(initialImage || null)
  const [annotations, setAnnotations] = useState<any[]>(initialAnnotations || [])
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [selectedDeviceType, setSelectedDeviceType] = useState('smart-light')

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setFloorPlanImage(imageUrl)
        setIsAnnotating(true)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Handle annotation save
  const handleAnnotationSave = (regions: any[]) => {
    const processedAnnotations = regions.map(region => ({
      ...region,
      deviceType: selectedDeviceType,
      deviceLabel: DEVICE_TYPES.find(d => d.id === selectedDeviceType)?.label || 'Device',
    }))
    setAnnotations(processedAnnotations)
  }

  // Save and close
  const handleSaveAndClose = () => {
    if (floorPlanImage) {
      onSave(floorPlanImage, annotations)
      setIsAnnotating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {!floorPlanImage && (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-gray-400 transition-colors">
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold mb-2">Upload Your Floor Plan</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Upload an image of your floor plan to mark device locations
          </p>
          <label className="inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button size="lg" className="bg-black text-white cursor-pointer">
              <Upload size={20} className="mr-2" />
              Choose Floor Plan Image
            </Button>
          </label>
          <p className="text-sm text-gray-500 mt-4">
            Supports: JPG, PNG, PDF (first page)
          </p>
        </div>
      )}

      {/* Annotation Interface */}
      {floorPlanImage && isAnnotating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Device Type Selector */}
          <div className="bg-gray-50 border-b p-4">
            <h3 className="font-semibold mb-3">Select Device Type to Place:</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {DEVICE_TYPES.map(device => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDeviceType(device.id)}
                  className={`p-3 text-center rounded-lg border-2 transition-all text-sm ${
                    selectedDeviceType === device.id
                      ? 'border-black bg-gray-100 scale-105'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                  style={selectedDeviceType === device.id ? { borderColor: device.color } : {}}
                >
                  <div className="text-2xl mb-1">{device.label.split(' ')[0]}</div>
                  <div className="text-xs">{device.label.split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Annotator */}
          <div style={{ height: '600px' }}>
            <ReactImageAnnotate
              regionClsList={DEVICE_TYPES.map(d => d.label)}
              regionTagList={DEVICE_TYPES.map(d => d.label)}
              images={[
                {
                  src: floorPlanImage,
                  name: 'Floor Plan',
                  regions: annotations,
                }
              ]}
              selectedImage={0}
              onExit={handleAnnotationSave}
              RegionEditLabel={(props: any) => (
                <div>
                  <select
                    value={props.region.deviceType || selectedDeviceType}
                    onChange={(e) => {
                      props.onChange({
                        ...props.region,
                        deviceType: e.target.value,
                      })
                    }}
                    className="border-2 border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                  >
                    {DEVICE_TYPES.map(device => (
                      <option key={device.id} value={device.id}>
                        {device.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 border-t p-4 flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
              <strong>{annotations.length}</strong> devices marked
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setFloorPlanImage(null)
                  setAnnotations([])
                  setIsAnnotating(false)
                }}
              >
                <X size={20} className="mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveAndClose}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check size={20} className="mr-2" />
                Save Floor Plan
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Saved Preview */}
      {floorPlanImage && !isAnnotating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-4 bg-green-50 border-b border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold text-green-900">Floor Plan Saved</h3>
                  <p className="text-sm text-green-700">{annotations.length} devices marked</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnnotating(true)}
              >
                Edit Markings
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="relative w-full h-auto">
              <SafeImage
                src={floorPlanImage}
                alt="Floor plan"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Device List */}
          <div className="p-4 bg-gray-50">
            <h4 className="font-semibold mb-3">Marked Devices:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {DEVICE_TYPES.map(device => {
                const count = annotations.filter(a => a.deviceType === device.id).length
                if (count === 0) return null
                return (
                  <div
                    key={device.id}
                    className="bg-white border-2 rounded-lg p-3 text-center"
                    style={{ borderColor: device.color }}
                  >
                    <div className="text-2xl mb-1">{device.label.split(' ')[0]}</div>
                    <div className="text-xs font-semibold">{count}x</div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
