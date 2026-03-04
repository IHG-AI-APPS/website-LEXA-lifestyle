'use client'

const clients = [
  'Eagle Hills',
  'DWTC',
  'Emaar',
  'Dubai Police',
  'Landmark',
  'Radisson',
  'Rixos',
  'Nestle',
]

export default function ClientLogos() {
  const duplicated = [...clients, ...clients, ...clients]

  return (
    <section className="py-10 bg-[#050505] border-y border-zinc-800/50 overflow-hidden" data-testid="client-logos">
      <div className="container mx-auto px-4 max-w-7xl mb-6">
        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-semibold">Trusted By Industry Leaders</span>
      </div>
      <div className="relative">
        <div className="flex gap-14 animate-marquee-slow">
          {duplicated.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-shrink-0 text-base font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white/60 transition-colors whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 45s linear infinite;
        }
      `}</style>
    </section>
  )
}
