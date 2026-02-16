'use client'

import { useState } from 'react'
import { CreditCard, TrendingDown, Info } from 'lucide-react'

interface TabbyWidgetProps {
  totalAmount: number
  currency?: string
}

export default function TabbyWidget({ totalAmount, currency = 'AED' }: TabbyWidgetProps) {
  const [selectedPlan, setSelectedPlan] = useState<'4' | '12'>('4')

  // Calculate installment amounts
  const fourMonthInstallment = Math.ceil(totalAmount / 4)
  const twelveMonthInstallment = Math.ceil(totalAmount / 12)

  const plans = {
    '4': {
      months: 4,
      installment: fourMonthInstallment,
      description: '4 interest-free payments',
      popular: true
    },
    '12': {
      months: 12,
      installment: twelveMonthInstallment,
      description: '12 monthly installments',
      popular: false
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white p-2 rounded-lg">
          <CreditCard className="text-purple-600" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Buy Now, Pay Later with Tabby</h3>
          <p className="text-sm text-gray-600">Split your purchase into easy installments</p>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(plans).map(([key, plan]) => (
          <button
            key={key}
            onClick={() => setSelectedPlan(key as '4' | '12')}
            className={`relative p-4 border-2 rounded-lg transition-all text-left ${
              selectedPlan === key
                ? 'border-purple-600 bg-white shadow-md'
                : 'border-purple-200 bg-white/50 hover:border-purple-400'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Popular
              </span>
            )}
            <div className="text-xs text-gray-500 mb-1">{plan.description}</div>
            <div className="text-2xl font-bold text-purple-600">
              {currency} {plan.installment.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">per month</div>
          </button>
        ))}
      </div>

      {/* Selected Plan Details */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="text-green-600" size={20} />
          <span className="font-semibold text-sm">Your Payment Plan</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-semibold">{currency} {totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Payment</span>
            <span className="font-semibold text-purple-600">
              {currency} {plans[selectedPlan].installment.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-semibold">{plans[selectedPlan].months} months</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="text-gray-600">Interest Rate</span>
            <span className="font-semibold text-green-600">0% (Interest-free!)</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
          <Info size={16} />
          Why Choose Tabby?
        </h4>
        <ul className="space-y-1 text-xs text-gray-700">
          <li>✓ 0% interest & no hidden fees</li>
          <li>✓ Instant approval decision</li>
          <li>✓ No impact on your credit score</li>
          <li>✓ Automatic payment reminders</li>
        </ul>
      </div>

      {/* CTA Button */}
      <button
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
        onClick={() => {
          // TODO: Integrate with actual Tabby checkout
          alert('Tabby integration requires merchant account setup. Contact Tabby at https://tabby.ai to get your API keys.')
        }}
      >
        Apply for Tabby Financing
      </button>

      {/* Powered by Tabby */}
      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">
          Powered by <span className="font-semibold text-purple-600">Tabby</span> • Available for UAE residents
        </p>
      </div>

      {/* Note for merchant */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Merchant Setup Required:</strong> To enable live Tabby payments, sign up at{' '}
          <a href="https://tabby.ai" target="_blank" rel="noopener noreferrer" className="underline">
            tabby.ai
          </a>{' '}
          and configure your API keys.
        </p>
      </div>
    </div>
  )
}
