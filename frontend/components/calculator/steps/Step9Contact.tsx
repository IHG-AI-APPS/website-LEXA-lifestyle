import { Input } from '@/components/ui/input'

interface Step9Props {
  contactName: string
  contactEmail: string
  contactPhone: string
  contactCompany: string
  contactRole: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onCompanyChange: (value: string) => void
  onRoleChange: (value: string) => void
}

export default function Step9Contact({
  contactName,
  contactEmail,
  contactPhone,
  contactCompany,
  contactRole,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onCompanyChange,
  onRoleChange,
}: Step9Props) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Contact Information</h2>
        <p className="text-gray-600">
          How can we reach you with your personalized quote?
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Full Name *
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            value={contactName}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={contactEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Phone Number *
          </label>
          <Input
            type="tel"
            placeholder="+971 50 123 4567"
            value={contactPhone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Company (Optional) */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Company Name (Optional)
          </label>
          <Input
            type="text"
            placeholder="Your Company"
            value={contactCompany}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="text-base py-3"
          />
        </div>

        {/* Role (Optional) */}
        <div>
          <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
            Your Role (Optional)
          </label>
          <select
            value={contactRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:border-black"
          >
            <option value="">Select your role</option>
            <option value="homeowner">Homeowner</option>
            <option value="architect">Architect</option>
            <option value="developer">Developer</option>
            <option value="contractor">Contractor</option>
            <option value="designer">Interior Designer</option>
            <option value="property-manager">Property Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-green-900">
          <strong>Privacy Note:</strong> Your information is secure and will only be used to provide you with a customized quote and follow-up consultation.
        </p>
      </div>
    </div>
  )
}
