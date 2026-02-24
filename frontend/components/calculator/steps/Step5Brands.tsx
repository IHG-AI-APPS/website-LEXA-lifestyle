interface Step5Props {
  controlPlatforms: string[]
  securityBrands: string[]
  lightingBrands: string[]
  selectedControl: string
  selectedSecurity: string
  selectedLighting: string
  onControlChange: (value: string) => void
  onSecurityChange: (value: string) => void
  onLightingChange: (value: string) => void
}

export default function Step5Brands({
  controlPlatforms,
  securityBrands,
  lightingBrands,
  selectedControl,
  selectedSecurity,
  selectedLighting,
  onControlChange,
  onSecurityChange,
  onLightingChange,
}: Step5Props) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Brand & Protocol Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select your preferred brands and control platforms
        </p>
      </div>

      {/* Control Platform */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
          Control Platform / Integration Hub
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {controlPlatforms.map((platform) => (
            <button
              key={platform}
              onClick={() => onControlChange(platform)}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedControl === platform
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="font-semibold">{platform}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Security Brand */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
          Security & Camera Brand
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {securityBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => onSecurityChange(brand)}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedSecurity === brand
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="font-semibold">{brand}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lighting System */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wide mb-4">
          Lighting Control System
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lightingBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => onLightingChange(brand)}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedLighting === brand
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="font-semibold">{brand}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
