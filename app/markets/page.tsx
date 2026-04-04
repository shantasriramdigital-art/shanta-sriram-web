import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'
import SectionLabel from '@/components/ui/SectionLabel'
import { MARKETS, MARKET_METHODOLOGY, MARKET_INTELLIGENCE_PILLARS } from '@/lib/data/markets'
import MarketsClient from './MarketsClient'

export const metadata = {
  title: 'Strategic Growth Corridors | Shanta Sriram Constructions',
  description: 'Deep analysis of Hyderabad\'s most promising micro-markets: Appa Junction, Kokapet, ORR Belt, and Tellapur.',
}

export default function MarketsPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-xs text-[#6B6B6B]">
              <li><Link href="/" className="hover:text-[#CD0E12] transition-colors">Home</Link></li>
              <li className="text-[#E8ECF0]">/</li>
              <li className="text-[#4A4A5A]">Markets</li>
            </ol>
          </nav>
          <SectionLabel className="mb-4">MARKET INTELLIGENCE</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 text-balance max-w-2xl">
            Strategic Growth Corridors
          </h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">
            Deep analysis of Hyderabad&apos;s most promising micro-markets, where infrastructure investment meets demographic demand. Make informed decisions with institutional-grade market intelligence.
          </p>
        </div>
      </section>

      {/* Intelligence Pillars */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">MARKET INTELLIGENCE</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-12 text-balance">
            How We Read the Market
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKET_INTELLIGENCE_PILLARS.map((pillar) => (
              <div key={pillar.title} className="bg-white border border-[#E8ECF0] rounded-md p-6 border-t-2" style={{ borderTopColor: '#C9A96E' }}>
                <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-3">{pillar.title}</h3>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Cards */}
      <MarketsClient markets={MARKETS} />

      {/* Methodology */}
      <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <SectionLabel className="!text-[#C9A96E] mb-4">OUR METHODOLOGY</SectionLabel>
          <h2 className="text-h2 font-serif text-white mb-4 text-balance">
            How We Identify Growth Corridors
          </h2>
          <p className="font-sans text-white/65 text-base leading-relaxed max-w-2xl mb-16">
            Our market intelligence combines proprietary research, government planning documents, infrastructure investment tracking, and demographic analysis to identify corridors with the highest long-term value creation potential.
          </p>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-[#C9A96E]/20" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {MARKET_METHODOLOGY.map((step, i) => (
                <div key={step.step} className="relative">
                  <div className="font-serif text-[#C9A96E]/30 mb-3" style={{ fontSize: '48px', lineHeight: 1 }}>
                    {step.step}
                  </div>
                  <h3 className="font-serif text-white text-lg font-medium mb-2">{step.title}</h3>
                  <p className="font-sans text-white/65 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
          }} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4 text-balance">
            Interested in a Specific Corridor?
          </h2>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-8 max-w-md mx-auto">
            Our market research team can provide a detailed analysis tailored to your investment criteria.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors"
          >
            Speak with Our Market Team
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
