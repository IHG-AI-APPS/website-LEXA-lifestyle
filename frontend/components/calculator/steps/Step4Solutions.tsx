import { Solution } from '../types'

interface Step4Props {
  solutions: Solution[]
  selectedSolutions: Record<string, string>
  onSolutionSelect: (solutionId: string, levelId: string) => void
}

export default function Step4Solutions({ solutions, selectedSolutions, onSolutionSelect }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Select Smart Home Solutions</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose the systems you want and select your preferred feature level
        </p>
      </div>

      <div className="space-y-6">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className={`border-2 rounded-xl p-6 transition-all ${
              selectedSolutions[solution.id]
                ? 'border-black bg-gray-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{solution.label}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Starting from AED {solution.basePrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Feature Level Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {solution.levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => onSolutionSelect(solution.id, level.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedSolutions[solution.id] === level.id
                      ? 'border-black bg-white'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{level.label}</div>
                  <div className="text-lg font-bold text-black">
                    AED {level.price.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-900">
          <strong>Selected:</strong> {Object.keys(selectedSolutions).length} system(s)
        </p>
      </div>
    </div>
  )
}
