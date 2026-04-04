'use client'

import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { TRUST_STATS } from '@/lib/data/trust'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function TrustStrip() {
  return (
    <section className="bg-[#F8F4EF] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel className="mb-4">TRUST &amp; GOVERNANCE</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] text-balance font-bold">
              Transparency That Builds Confidence
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {TRUST_STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-6 hover:shadow-md transition-shadow"
            >
              <div className="font-serif text-[#1A1A2E] mb-1" style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1 }}>
                {stat.prefix && <span>{stat.prefix}</span>}
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-sans text-[#4A4A5A] text-sm font-medium mb-2">{stat.label}</p>
              <p className="font-sans text-[#6B6B6B] text-xs">{stat.benchmark}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/trust"
            className="inline-block font-sans text-sm font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
          >
            View Full Governance Report
          </Link>
        </div>
      </div>
    </section>
  )
}
