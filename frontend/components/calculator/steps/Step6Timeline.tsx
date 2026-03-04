interface Step6Props {
  timeline: string
  budgetRange: string
  privilegeCard: string
  onTimelineChange: (value: string) => void
  onBudgetChange: (value: string) => void
  onPrivilegeCardChange: (value: string) => void
}

export default function Step6Timeline({
  timeline,
  budgetRange,
  privilegeCard,
  onTimelineChange,
  onBudgetChange,
  onPrivilegeCardChange,
}: Step6Props) {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Timeline & Budget</h2>
        <p className="text-gray-600 dark:text-zinc-500">
          Help us understand your project timeline and budget expectations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Desired Timeline *
          </label>
          <select
            value={timeline}
            onChange={(e) => onTimelineChange(e.target.value)}
            className="w-full border-2 border-gray-200 dark:border-zinc-800 px-4 py-3 rounded-lg focus:border-black"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP (Less than 2 months)</option>
            <option value="3-6">3-6 months</option>
            <option value="6-12">6-12 months</option>
            <option value="12+">12+ months / Phased</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Budget Range *
          </label>
          <select
            value={budgetRange}
            onChange={(e) => onBudgetChange(e.target.value)}
            className="w-full border-2 border-gray-200 dark:border-zinc-800 px-4 py-3 rounded-lg focus:border-black"
          >
            <option value="">Select budget range</option>
            <option value="under-200k">Under AED 200,000</option>
            <option value="200k-500k">AED 200,000 - 500,000</option>
            <option value="500k-1m">AED 500,000 - 1,000,000</option>
            <option value="1m-2.5m">AED 1,000,000 - 2,500,000</option>
            <option value="2.5m+">AED 2,500,000+</option>
            <option value="no-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* Privilege Card Section */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-xl font-semibold mb-4">Special Discounts</h3>
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Government Privilege Card (Optional)
          </label>
          <select
            value={privilegeCard}
            onChange={(e) => onPrivilegeCardChange(e.target.value)}
            className="w-full border-2 border-gray-200 dark:border-zinc-800 px-4 py-3 rounded-lg focus:border-black"
          >
            <option value="">None</option>
            <option value="esaad">Esaad Card (10% Discount)</option>
            <option value="fazaa">Fazaa Card (10% Discount)</option>
            <option value="corporate">Corporate Partner (Negotiable)</option>
          </select>
          {privilegeCard && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Discount will be applied to your final quote
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
