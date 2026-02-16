import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

interface BreakdownItem {
  name: string
  cost: number
}

interface CostBreakdownProps {
  breakdown: BreakdownItem[]
  totalCost: number
  estimatedTimeline: number
}

export default function CostBreakdown({
  breakdown,
  totalCost,
  estimatedTimeline
}: CostBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-black to-gray-900 text-white rounded-2xl p-8 sticky top-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6" />
        <h3 className="text-2xl font-bold">Cost Estimate</h3>
      </div>

      <div className="space-y-4 mb-6">
        {breakdown.length > 0 ? (
          <>
            {breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-gray-300">{item.name}</span>
                <span className="font-semibold">AED {item.cost.toLocaleString()}</span>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t-2 border-white/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">Total Investment</span>
                <span className="text-2xl font-bold">
                  AED {totalCost.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Estimated project timeline: {estimatedTimeline} weeks
              </p>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-xs text-gray-300 leading-relaxed">
                This is a preliminary estimate based on your selections. Final pricing may vary based on:
                site conditions, specific product choices, and customization requirements.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Select options to see your estimate</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
