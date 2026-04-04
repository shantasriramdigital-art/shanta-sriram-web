import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const FOUNDERS = [
  {
    name: 'M. Narsaiah',
    title: 'Chairman and Managing Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Founder%20images/Mr.Narsi.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL01yLk5hcnNpLmpwZWciLCJpYXQiOjE3NzUzMzQwNTcsImV4cCI6ODgxNzUzMzQwNTd9.06ZID2cft8-AL441l6d4M8iJxBW-QUIUlGoADkvUCWo',
    quote: "We don't build homes; we build wealth platforms. Every brick we lay is a promise of permanence.",
  },
  {
    name: 'M. Lingaiah',
    title: 'Executive Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Founder%20images/Mt.Lingaiah.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL010LkxpbmdhaWFoLmpwZWciLCJpYXQiOjE3NzUzMzQwNzgsImV4cCI6ODY1Nzc1MzM0MDc4fQ.yNS7lMCUWExPrwGy_iRD4XK9NQrhhqn_BRErJ6HIUFs',
    quote: 'Our philosophy is simple: acquire land in tomorrow\'s growth corridors, develop with uncompromising quality, deliver without compromise.',
  },
]

export default function AboutStrip() {
  return (
    <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <SectionLabel className="!text-[#CD0E12] mb-4">OUR FOUNDERS</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 text-balance font-bold">
              Three Decades of Trust. Built Person by Person.
            </h2>
            <p className="font-sans text-white/70 text-base leading-relaxed mb-10">
              Founded in 1995 by M. Narsaiah and M. Lingaiah, Shanta Sriram Constructions has delivered 8,000+ homes across Hyderabad. Our philosophy has never changed: acquire land in tomorrow&apos;s corridors, build with uncompromising quality, deliver on every promise.
            </p>

            {/* Stat row */}
            <div className="flex items-center gap-0 mb-10">
              <div className="flex-1 text-center">
                <p className="font-serif text-white text-2xl md:text-3xl font-bold">30+</p>
                <p className="font-sans text-white/40 text-[10px] uppercase tracking-wider mt-1">Years</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="flex-1 text-center">
                <p className="font-serif text-white text-2xl md:text-3xl font-bold">8,000+</p>
                <p className="font-sans text-white/40 text-[10px] uppercase tracking-wider mt-1">Homes</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="flex-1 text-center">
                <p className="font-serif text-white text-2xl md:text-3xl font-bold">80+</p>
                <p className="font-sans text-white/40 text-[10px] uppercase tracking-wider mt-1">Projects</p>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-block font-sans text-sm font-medium text-white border border-white/40 px-6 py-3 rounded hover:bg-white hover:text-[#1A1A2E] transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Right column: founder cards */}
          <div className="flex flex-col gap-6">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="bg-white/5 border border-white/15 p-6 flex flex-col md:flex-row gap-5"
                style={{ borderRadius: '12px' }}
              >
                {/* Photo */}
                <div className="flex-shrink-0">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    loading="lazy"
                    className="w-full md:w-[100px] h-[200px] md:h-[120px] object-cover object-top border-2 border-[#CD0E12]"
                    style={{ borderRadius: '8px', filter: 'contrast(1.08) brightness(1.04) saturate(1.12)' }}
                  />
                </div>
                {/* Text */}
                <div className="flex-1">
                  <p className="font-serif text-white text-lg font-medium">{founder.name}</p>
                  <p className="font-sans text-[#CD0E12] text-xs uppercase tracking-[0.08em] mb-3">{founder.title}</p>
                  <div>
                    <span className="font-serif text-[#CD0E12] text-3xl leading-none select-none">&ldquo;</span>
                    <p className="quote-text text-white/75 -mt-3 ml-1" style={{ fontSize: '13px' }}>
                      {founder.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
        }} />
      </div>
    </section>
  )
}
