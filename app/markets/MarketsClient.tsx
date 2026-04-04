'use client'

import Link from 'next/link'

interface Market {
  slug: string
  name: string
  appreciation: string
  period: string
  description: string
  population: string
  employment: string
  infrastructure: string
  highlights: string[]
  growthDrivers: string[]
}

export default function MarketsClient({ markets }: { markets: Market[] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-xs font-sans font-semibold uppercase tracking-widest text-[#CD0E12] mb-4">GROWTH CORRIDORS</div>
        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] mb-16 text-balance font-bold">
          Hyderabad&apos;s Strategic Micro-Markets
        </h2>

        <div className="flex flex-col gap-16">
          {markets.map((market, i) => (
            <div
              key={market.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? 'lg:grid-flow-col' : ''}`}
            >
              {/* Image placeholder */}
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] bg-[#F8F4EF] rounded-md flex items-center justify-center border border-[#E8ECF0]">
                  <div className="text-center">
                    <p className="font-serif text-[#1A1A2E]/20 text-2xl">{market.name}</p>
                    <p className="font-sans text-[#1A1A2E]/15 text-xs mt-1">Hyderabad</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-start gap-4 mb-4">
                  <h2 className="font-serif text-[#1A1A2E] text-3xl font-bold flex-1">{market.name}</h2>
                  <span className="font-sans text-sm font-medium text-[#CD0E12] bg-[#CD0E12]/8 px-3 py-1.5 rounded-sm flex-shrink-0">
                    {market.appreciation} {market.period}
                  </span>
                </div>
                <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-6">{market.description}</p>

                {/* Stats */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-between py-2.5 border-b border-[#E8ECF0]">
                    <span className="font-sans text-xs text-[#6B6B6B]">Population Growth</span>
                    <span className="font-sans text-sm font-medium text-[#1A1A2E]">{market.population}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-[#E8ECF0]">
                    <span className="font-sans text-xs text-[#6B6B6B]">Employment Density</span>
                    <span className="font-sans text-sm font-medium text-[#1A1A2E]">{market.employment}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="font-sans text-xs text-[#6B6B6B]">Infrastructure Score</span>
                    <span className="font-sans text-sm font-medium text-[#1A1A2E]">{market.infrastructure}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-2 mb-6">
                  {market.highlights.map((h, hi) => (
                    <div key={hi} className="font-sans text-sm text-[#4A4A5A] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>

                {/* Growth drivers */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {market.growthDrivers.map((d) => (
                    <span key={d} className="font-sans text-xs font-medium text-white bg-[#1A1A2E] px-3 py-1.5 rounded-sm">
                      {d}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/markets/${market.slug}`}
                    className="font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors"
                  >
                    View Detailed Analysis
                  </Link>
                  <Link
                    href="/contact"
                    className="font-sans text-sm font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  >
                    Enquire About This Corridor
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
