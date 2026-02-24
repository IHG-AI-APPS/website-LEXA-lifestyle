import FloorPlanUploader from '@/components/FloorPlanUploader'

interface AdditionalFeature {
  id: string
  label: string
  icon: string
}

interface Step8Props {
  additionalFeatures: AdditionalFeature[]
  selectedFeatures: string[]
  floorPlanImage: string
  floorPlanAnnotations: any[]
  onFeatureToggle: (featureId: string) => void
  onFloorPlanSave: (imageUrl: string, annotations: any[]) => void
}

export default function Step8Extras({
  additionalFeatures,
  selectedFeatures,
  floorPlanImage,
  floorPlanAnnotations,
  onFeatureToggle,
  onFloorPlanSave,
}: Step8Props) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Additional Features</h2>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Select any extra features you&apos;d like to include
        </p>
      </div>

      {/* Additional Features Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Optional Upgrades</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onFeatureToggle(feature.id)}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedFeatures.includes(feature.id)
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="text-sm font-semibold">{feature.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Floor Plan Upload */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-xl font-semibold mb-2">Upload Floor Plan (Optional)</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Mark exact locations where you want smart devices installed</p>
        <FloorPlanUploader
          onSave={onFloorPlanSave}
          initialImage={floorPlanImage}
          initialAnnotations={floorPlanAnnotations}
        />
      </div>
    </div>
  )
}
