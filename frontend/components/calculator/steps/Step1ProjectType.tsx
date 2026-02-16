import { ProjectType } from '../types'

interface Step1Props {
  projectTypes: ProjectType[]
  selectedType: string
  onSelect: (typeId: string) => void
}

export default function Step1ProjectType({ projectTypes, selectedType, onSelect }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Select Your Project Type</h2>
        <p className="text-gray-600">
          Choose the category that best describes your property
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`p-6 border-2 rounded-xl text-left transition-all transform hover:scale-105 ${
              selectedType === type.id
                ? 'border-black bg-gray-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <type.icon
              size={40}
              className={selectedType === type.id ? 'text-black mb-4' : 'text-gray-400 mb-4'}
            />
            <h3 className="text-xl font-bold mb-2">{type.label}</h3>
            <p className="text-gray-600 text-sm">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
