import { Input } from '@/components/ui/input'

interface Step7Props {
  locations: Record<string, string[]>
  emirate: string
  city: string
  propertyName: string
  onEmirateChange: (value: string) => void
  onCityChange: (value: string) => void
  onPropertyNameChange: (value: string) => void
}

export default function Step7Location({
  locations,
  emirate,
  city,
  propertyName,
  onEmirateChange,
  onCityChange,
  onPropertyNameChange,
}: Step7Props) {
  const emirates = Object.keys(locations)
  const cities = emirate ? locations[emirate] || [] : []

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Property Location</h2>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Tell us where your property is located
        </p>
      </div>

      <div className="space-y-6">
        {/* Emirate */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Emirate *
          </label>
          <select
            value={emirate}
            onChange={(e) => {
              onEmirateChange(e.target.value)
              onCityChange('') // Reset city when emirate changes
            }}
            className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
          >
            <option value="">Select emirate</option>
            {emirates.map((em) => (
              <option key={em} value={em}>
                {em}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        {emirate && (
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
              City / Area
            </label>
            <select
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
            >
              <option value="">Select city/area</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Property Name */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Property / Building Name (Optional)
          </label>
          <Input
            type="text"
            placeholder="e.g., Emirates Hills, Marina Heights"
            value={propertyName}
            onChange={(e) => onPropertyNameChange(e.target.value)}
            className="text-base py-3"
          />
        </div>
      </div>
    </div>
  )
}
