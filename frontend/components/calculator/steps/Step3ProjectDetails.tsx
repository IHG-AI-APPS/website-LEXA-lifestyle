import { Input } from '@/components/ui/input'

interface Step3Props {
  squareFootage: string
  numRooms: string
  numFloors: string
  constructionStage: string
  onSquareFootageChange: (value: string) => void
  onNumRoomsChange: (value: string) => void
  onNumFloorsChange: (value: string) => void
  onConstructionStageChange: (value: string) => void
}

export default function Step3ProjectDetails({
  squareFootage,
  numRooms,
  numFloors,
  constructionStage,
  onSquareFootageChange,
  onNumRoomsChange,
  onNumFloorsChange,
  onConstructionStageChange,
}: Step3Props) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Project Details</h2>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">
          Tell us about your property specifications
        </p>
      </div>

      <div className="space-y-6">
        {/* Square Footage */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Total Area (sq ft) *
          </label>
          <Input
            type="number"
            placeholder="e.g., 5000"
            value={squareFootage}
            onChange={(e) => onSquareFootageChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Number of Rooms */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Number of Rooms *
          </label>
          <Input
            type="number"
            placeholder="e.g., 8"
            value={numRooms}
            onChange={(e) => onNumRoomsChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Number of Floors */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Number of Floors *
          </label>
          <Input
            type="number"
            placeholder="e.g., 2"
            value={numFloors}
            onChange={(e) => onNumFloorsChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Construction Stage */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Construction Stage *
          </label>
          <select
            value={constructionStage}
            onChange={(e) => onConstructionStageChange(e.target.value)}
            className="w-full border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg focus:border-black"
          >
            <option value="">Select construction stage</option>
            <option value="new-construction">New Construction (Best for Integration)</option>
            <option value="under-construction">Under Construction</option>
            <option value="renovation">Renovation / Upgrade</option>
            <option value="retrofit">Retrofit Existing Property</option>
          </select>
        </div>
      </div>
    </div>
  )
}
