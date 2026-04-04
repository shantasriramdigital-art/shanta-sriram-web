import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { MARKETS } from '@/lib/data/markets'

export default function MarketsPreview() {
  return (
    <section className="bg-[#F4F7FC] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel className="mb-4">MARKET INTELLIGENCE</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] text-balance font-bold">
                Strategic Growth Corridors
              </h2>
              <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mt-4 max-w-xl">
                Deep analysis of Hyderabad&apos;s most promising micro-markets, where infrastructure investment meets demographic demand.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKETS.map((market) => (
              <div
                key={market.slug}
                className="bg-white border border-[#E8ECF0] rounded-md p-6 hover:border-[#CD0E12]/30 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-[#1A1A2E] text-xl font-medium">{market.name}</h3>
                  <span className="font-sans text-xs font-medium text-[#CD0E12] bg-[#CD0E12]/8 px-2 py-1 rounded-sm flex-shrink-0 ml-2">
                    {market.appreciation} {market.period}
                  </span>
                </div>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                  {market.description}
                </p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {market.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="font-sans text-xs text-[#6B6B6B] flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-1.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/markets/${market.slug}`}
                  className="font-sans text-sm font-medium text-[#CD0E12] hover:underline mt-auto"
                >
                  View Analysis
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/markets"
              className="inline-block font-sans text-sm font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
            >
              Explore All Markets
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
