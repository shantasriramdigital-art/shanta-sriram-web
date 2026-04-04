import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'
import SectionLabel from '@/components/ui/SectionLabel'
import LeadForm from '@/components/ui/LeadForm'
import { MARKETS } from '@/lib/data/markets'

export function generateStaticParams() {
  return MARKETS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const market = MARKETS.find((m) => m.slug === slug)
  if (!market) return {}
  return {
    title: `${market.name} Market Analysis | Shanta Sriram Constructions`,
    description: market.description,
  }
}

export default async function MarketDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const market = MARKETS.find((m) => m.slug === slug)
  if (!market) notFound()

  const otherMarkets = MARKETS.filter((m) => m.slug !== slug).slice(0, 3)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-xs text-[#6B6B6B]">
              <li><Link href="/" className="hover:text-[#CD0E12]">Home</Link></li>
              <li className="text-[#E8ECF0]">/</li>
              <li><Link href="/markets" className="hover:text-[#CD0E12]">Markets</Link></li>
              <li className="text-[#E8ECF0]">/</li>
              <li className="text-[#4A4A5A]">{market.name}</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel className="mb-4">GROWTH CORRIDOR ANALYSIS</SectionLabel>
              <h1 className="text-h1 font-serif text-[#1A1A2E] mb-4 text-balance">{market.name}</h1>
              <span className="inline-block font-sans text-sm font-medium text-[#CD0E12] bg-[#CD0E12]/8 px-3 py-1.5 rounded-sm mb-5">
                {market.appreciation} appreciation over {market.period}
              </span>
              <p className="font-sans text-[#4A4A5A] text-base leading-relaxed">{market.description}</p>
            </div>
            <div className="bg-white border border-[#E8ECF0] rounded-md p-6">
              <h3 className="font-serif text-[#1A1A2E] text-xl mb-6">Key Metrics</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Price Appreciation', value: `${market.appreciation} (${market.period})` },
                  { label: 'Population Growth', value: market.population },
                  { label: 'Employment Density', value: market.employment },
                  { label: 'Infrastructure Score', value: market.infrastructure },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-[#E8ECF0] last:border-0">
                    <span className="font-sans text-sm text-[#6B6B6B]">{label}</span>
                    <span className="font-sans text-sm font-medium text-[#1A1A2E]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Growth Drivers */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionLabel className="mb-4">KEY HIGHLIGHTS</SectionLabel>
              <h2 className="font-serif text-[#1A1A2E] text-h3 mb-8">Market Advantages</h2>
              <div className="flex flex-col gap-3">
                {market.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-[#E8ECF0]">
                    <div className="w-5 h-5 rounded-sm bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                    </div>
                    <p className="font-sans text-[#4A4A5A] text-sm">{h}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel className="mb-4">GROWTH DRIVERS</SectionLabel>
              <h2 className="font-serif text-[#1A1A2E] text-h3 mb-8">Infrastructure Catalysts</h2>
              <div className="grid grid-cols-2 gap-3">
                {market.growthDrivers.map((d) => (
                  <div key={d} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-4">
                    <p className="font-sans text-sm font-medium text-[#1A1A2E]">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form + other markets */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel className="mb-4">ENQUIRE</SectionLabel>
              <h2 className="font-serif text-[#1A1A2E] text-h3 mb-4">
                Interested in {market.name}?
              </h2>
              <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-6">
                Our team can share available projects, investment analysis, and market insights for this corridor.
              </p>
              <div className="bg-white border border-[#E8ECF0] rounded-md p-6">
                <LeadForm compact title="" subtitle="" />
              </div>
            </div>
            <div>
              <SectionLabel className="mb-4">OTHER CORRIDORS</SectionLabel>
              <h2 className="font-serif text-[#1A1A2E] text-h3 mb-8">Explore More Markets</h2>
              <div className="flex flex-col gap-4">
                {otherMarkets.map((m) => (
                  <Link key={m.slug} href={`/markets/${m.slug}`}>
                    <div className="bg-white border border-[#E8ECF0] rounded-md p-5 hover:border-[#CD0E12]/30 transition-colors flex items-center justify-between group">
                      <div>
                        <h3 className="font-serif text-[#1A1A2E] text-lg font-medium group-hover:text-[#CD0E12] transition-colors">{m.name}</h3>
                        <p className="font-sans text-xs text-[#6B6B6B] mt-0.5">{m.population}</p>
                      </div>
                      <span className="font-sans text-xs font-medium text-[#CD0E12] bg-[#CD0E12]/8 px-2.5 py-1 rounded-sm">
                        {m.appreciation}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
