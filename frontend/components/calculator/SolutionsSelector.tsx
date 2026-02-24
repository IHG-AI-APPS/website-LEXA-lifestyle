import { motion } from 'framer-motion'

interface Solution {
  id: string
  label: string
  basePrice: number
  levels: Array<{ id: string; label: string; price: number }>
}

interface SolutionsSelectorProps {
  solutions: Solution[]
  selectedSolutions: Record<string, string>
  onToggleSolution: (solutionId: string, level: string) => void
}

export default function SolutionsSelector({
  solutions,
  selectedSolutions,
  onToggleSolution
}: SolutionsSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Solutions & Levels</h2>
      <div className="space-y-6">
        {solutions.map((solution) => {
          const selectedLevel = selectedSolutions[solution.id]
          
          return (
            <motion.div
              key={solution.id}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4">
                <h3 className="font-bold text-lg">{solution.label}</h3>
                <p className="text-sm text-gray-500">Starting from AED {solution.basePrice.toLocaleString()}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {solution.levels.map((level) => {
                  const isSelected = selectedLevel === level.id
                  
                  return (
                    <button
                      key={level.id}
                      onClick={() => onToggleSolution(solution.id, level.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-2">{level.label}</div>
                      <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-black'}`}>
                        AED {level.price.toLocaleString()}
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
