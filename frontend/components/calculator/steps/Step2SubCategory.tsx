interface Step2Props {
  subCategories: { id: string; label: string }[]
  selectedSubCategory: string
  onSelect: (subCategoryId: string) => void
}

export default function Step2SubCategory({ subCategories, selectedSubCategory, onSelect }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Choose Your Property Sub-Type</h2>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Select the specific category for more accurate recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelect(sub.id)}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              selectedSubCategory === sub.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <h3 className="font-semibold text-lg">{sub.label}</h3>
          </button>
        ))}
      </div>
    </div>
  )
}
