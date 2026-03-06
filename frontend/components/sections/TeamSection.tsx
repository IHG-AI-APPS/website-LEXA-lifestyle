import SafeImage from '@/components/ui/SafeImage'

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  { name: 'Althaf Ali', role: 'Co-Founder', image: 'https://files.ihgbrands.com/lexa/migrated/28b67688c620f88d.webp' },
  { name: 'Munir Taher', role: 'Co-Founder', image: 'https://files.ihgbrands.com/lexa/migrated/ec9afb366796afe8.webp' },
  { name: 'Shahnawaz Sheikh', role: 'Business Head', image: 'https://files.ihgbrands.com/lexa/migrated/04cfad6343e74c55.webp' },
  { name: 'Mohammad Salih', role: 'Project Head', image: 'https://files.ihgbrands.com/lexa/migrated/c53459892ffdeaf4.webp' },
  { name: 'Sri Harish', role: 'Junior Automation Engineer', image: 'https://files.ihgbrands.com/lexa/migrated/a7f8e411c92d5554.webp' },
  { name: 'Maria Ralota', role: 'Admin & Sales Coordinator', image: 'https://files.ihgbrands.com/lexa/migrated/aaa77e6aff30338c.webp' },
  { name: 'Shibili Zahir', role: 'Operations Executive', image: 'https://files.ihgbrands.com/lexa/migrated/1ba1b4da39f32a90.webp' },
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
            <p className="text-lg text-gray-600 dark:text-zinc-500 font-light max-w-2xl mx-auto">
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
                <p className="text-sm text-gray-600 dark:text-zinc-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
