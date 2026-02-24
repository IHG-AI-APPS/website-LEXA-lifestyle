import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface Feature {
  id: string
  label: string
  price: number
}

interface AdditionalFeaturesSelectorProps {
  features: Feature[]
  selectedFeatures: string[]
  onToggleFeature: (featureId: string) => void
}

export default function AdditionalFeaturesSelector({
  features,
  selectedFeatures,
  onToggleFeature
}: AdditionalFeaturesSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Additional Features (Optional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const isSelected = selectedFeatures.includes(feature.id)
          
          return (
            <motion.button
              key={feature.id}
              onClick={() => onToggleFeature(feature.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all relative ${
                isSelected
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-black" />
              )}
              <h3 className="font-bold mb-2 pr-8">{feature.label}</h3>
              <p className="text-lg font-semibold text-black">
                +AED {feature.price.toLocaleString()}
              </p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
