import SafeImage from '@/components/ui/SafeImage'

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  { name: 'Althaf Ali', role: 'Co-Founder', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/189b2063a7c9f4fbf713db28c2fc309b0cbd08282a9e26f32177849125b480c7.png' },
  { name: 'Munir Taher', role: 'Co-Founder', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/81113236aea1d470de7f5dc2060093ba48905134dfadb518d9ea0899ccc1f7c1.png' },
  { name: 'Shahnawaz Sheikh', role: 'Business Head', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/ba0a4f880b7032b40af93c3055859acb1fb26773462280bb5ad5467e3948ff2c.png' },
  { name: 'Mohammad Salih', role: 'Project Head', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/0f48dc4796cf6b760fd9f06e1e885bdbd444fc6b167916d39b612ed77ab9839d.png' },
  { name: 'Sri Harish', role: 'Junior Automation Engineer', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/a58f940fe55587d1ffad529df3a455c7d9ec35f0e7738b4b2d3a804387778780.png' },
  { name: 'Maria Ralota', role: 'Admin & Sales Coordinator', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/32677d42d1e55588c33a9566236c3aafee694bddf693e2f9ea14bc6ee70e4091.png' },
  { name: 'Shibili Zahir', role: 'Operations Executive', image: 'https://static.prod-images.emergentagent.com/jobs/9a576253-3f34-4de3-9ad4-57e7617524d7/images/7706427d769fae74912f274da47e9bf82bd33c743cd24ddbfebd9c7e662fd25a.png' },
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
