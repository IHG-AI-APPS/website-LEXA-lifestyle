'use client'

import SafeImage from '@/components/ui/SafeImage'

const clients = [
  { name: 'Eagle Hills', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Dubai World Trade Center', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Emaar', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Dubai Police', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Landmark Group', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Radisson', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Rixos', logo: '/images/client-logo-placeholder.svg' },
  { name: 'Nestle', logo: '/images/client-logo-placeholder.svg' },
]

export default function ClientLogos() {
  const duplicatedClients = [...clients, ...clients, ...clients]

  return (
    <section className="py-24 bg-white border-y border-gray-200 dark:border-zinc-800 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-12">
        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-gray-600 dark:text-zinc-500 font-bold block mb-6">
          Trusted By
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-black">
          WHO WE WORK WITH
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-zinc-500 mt-6 max-w-3xl">
          Our valued clients span entertainment, cultural destinations, theme parks, corporate, and more.
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-16 animate-marquee-slow">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 w-40 h-20 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            >
              <SafeImage
                src={client.logo}
                alt={client.name}
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-slow {
          animation: marquee-slow 90s linear infinite;
        }
      `}</style>
    </section>
  )
}
