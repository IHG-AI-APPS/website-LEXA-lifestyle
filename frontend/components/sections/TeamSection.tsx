import SafeImage from '@/components/ui/SafeImage'

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  { name: 'Althaf Ali', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop' },
  { name: 'Munir Taher', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop' },
  { name: 'Shahnawaz Sheikh', role: 'Business Head', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop' },
  { name: 'Mohammad Salih', role: 'Project Head', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop' },
  { name: 'Sri Harish', role: 'Junior Automation Engineer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop' },
  { name: 'Maria Ralota', role: 'Admin & Sales Coordinator', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop' },
  { name: 'Shibili Zahir', role: 'Operations Executive', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop' },
]

export default function TeamSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 font-medium mb-6 block">
              Meet the Team
            </span>
            <h2 className="text-5xl font-semibold mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              Get to know the minds behind our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="relative h-80 overflow-hidden mb-4">
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
