import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ProjectType {
  id: string
  label: string
  icon: LucideIcon
  description: string
  subCategories?: Array<{ id: string; label: string }>
}

interface ProjectTypeSelectorProps {
  projectTypes: ProjectType[]
  selectedType: string | null
  selectedSubCategory: string | null
  onSelectType: (typeId: string) => void
  onSelectSubCategory: (subCatId: string) => void
}

export default function ProjectTypeSelector({
  projectTypes,
  selectedType,
  selectedSubCategory,
  onSelectType,
  onSelectSubCategory
}: ProjectTypeSelectorProps) {
  const selectedProjectType = projectTypes.find(pt => pt.id === selectedType)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Select Project Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            
            return (
              <motion.button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-white' : 'text-black'}`} />
                <h3 className="font-bold mb-1">{type.label}</h3>
                <p className={`text-sm ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                  {type.description}
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {selectedProjectType?.subCategories && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold mb-4">Select Sub-Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedProjectType.subCategories.map((subCat) => (
              <button
                key={subCat.id}
                onClick={() => onSelectSubCategory(subCat.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedSubCategory === subCat.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{subCat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
