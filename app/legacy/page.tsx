'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const LEGACY_PROJECTS = [
  { name: 'Belvedere Gardens', location: 'Mehdipatnam', type: 'Residential', area: '2,50,000 sft' },
  { name: 'Sonata', location: 'Tolichowki', type: 'Residential', area: '1,80,000 sft' },
  { name: 'SS Tech Park', location: 'Ameerpet', type: 'Commercial', area: '3,50,000 sft' },
  { name: 'Satellite Township', location: 'Miyapur', type: 'Township', area: '12,00,000 sft' },
  { name: 'Harmony Heights', location: 'Kukatpally', type: 'Residential', area: '1,60,000 sft' },
  { name: 'Blue Birds Habitat', location: 'Manikonda', type: 'Residential', area: '1,40,000 sft' },
  { name: 'Spring Valley', location: 'Narsingi', type: 'Residential', area: '2,20,000 sft' },
  { name: 'Oyster Mall', location: 'Somajiguda', type: 'Commercial', area: '1,80,000 sft' },
  { name: 'Chippendale', location: 'Banjara Hills', type: 'Commercial', area: '90,000 sft' },
  { name: 'Dukes Galaxy', location: 'Madhapur', type: 'Residential', area: '2,00,000 sft' },
  { name: 'Emerald Court', location: 'Jubilee Hills', type: 'Residential', area: '1,20,000 sft' },
  { name: 'Sapphire Residency', location: 'Appa Junction', type: 'Residential', area: '1,50,000 sft' },
  { name: 'Pearl Heights', location: 'Tellapur', type: 'Residential', area: '1,80,000 sft' },
  { name: 'Ruby Towers', location: 'Attapur', type: 'Residential', area: '1,10,000 sft' },
  { name: 'Diamond Plaza', location: 'Begumpet', type: 'Commercial', area: '2,40,000 sft' },
  { name: 'Coral Enclave', location: 'Kondapur', type: 'Residential', area: '1,30,000 sft' },
  { name: 'Topaz Heights', location: 'Pocharam', type: 'Residential', area: '95,000 sft' },
  { name: 'Amber Residences', location: 'Kompally', type: 'Residential', area: '1,70,000 sft' },
  { name: 'Crystal Plaza', location: 'Ameerpet', type: 'Commercial', area: '1,60,000 sft' },
  { name: 'Opal Gardens', location: 'LB Nagar', type: 'Residential', area: '1,25,000 sft' },
  { name: 'Jade Towers', location: 'Kukatpally', type: 'Residential', area: '1,45,000 sft' },
  { name: 'Platinum Square', location: 'Gachibowli', type: 'Commercial', area: '2,80,000 sft' },
  { name: 'Silver Oak', location: 'Miyapur', type: 'Residential', area: '1,60,000 sft' },
  { name: 'Bronze Heights', location: 'Dilsukhnagar', type: 'Residential', area: '85,000 sft' },
  { name: 'Golden Arcade', location: 'Abids', type: 'Commercial', area: '1,20,000 sft' },
  { name: 'Copper Residency', location: 'Serilingampally', type: 'Residential', area: '1,50,000 sft' },
  { name: 'Ivory Towers', location: 'Banjara Hills', type: 'Commercial', area: '2,10,000 sft' },
  { name: 'Marble Enclave', location: 'Khairatabad', type: 'Residential', area: '1,15,000 sft' },
  { name: 'Onyx Complex', location: 'Himayatnagar', type: 'Commercial', area: '1,90,000 sft' },
  { name: 'Garnet Heights', location: 'Tarnaka', type: 'Residential', area: '1,05,000 sft' },
  { name: 'Quartz Residency', location: 'Uppal', type: 'Residential', area: '1,35,000 sft' },
  { name: 'Turquoise Towers', location: 'ECIL', type: 'Residential', area: '1,10,000 sft' },
  { name: 'Zircon Plaza', location: 'Secunderabad', type: 'Commercial', area: '1,75,000 sft' },
  { name: 'Aquamarine Homes', location: 'Alwal', type: 'Residential', area: '90,000 sft' },
  { name: 'Tanzanite Court', location: 'Malkajgiri', type: 'Residential', area: '1,20,000 sft' },
  { name: 'Citrine Towers', location: 'Kukatpally', type: 'Residential', area: '1,55,000 sft' },
  { name: 'Peridot Gardens', location: 'Chandanagar', type: 'Residential', area: '1,40,000 sft' },
  { name: 'Moonstone Residency', location: 'Bachupally', type: 'Residential', area: '1,30,000 sft' },
  { name: 'Alexandrite Complex', location: 'Hitech City', type: 'Commercial', area: '2,60,000 sft' },
  { name: 'Sunstone Enclave', location: 'Patancheru', type: 'Commercial', area: '1,40,000 sft' },
  { name: 'Larimar Heights', location: 'Shamshabad', type: 'Commercial', area: '1,80,000 sft' },
]

const TICKER_NAMES = LEGACY_PROJECTS.map((p) => p.name).join(' \u00B7 ') + ' \u00B7 '

const FILTERS = ['All', 'Residential', 'Commercial', 'Township'] as const

function getCounts() {
  const counts: Record<string, number> = { All: LEGACY_PROJECTS.length }
  LEGACY_PROJECTS.forEach((p) => { counts[p.type] = (counts[p.type] || 0) + 1 })
  return counts
}

export default function LegacyPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [transitioning, setTransitioning] = useState(false)
  const counts = getCounts()

  const filtered = activeFilter === 'All'
    ? LEGACY_PROJECTS
    : LEGACY_PROJECTS.filter((p) => p.type === activeFilter)

  const handleFilter = (f: string) => {
    if (f === activeFilter) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveFilter(f)
      setTransitioning(false)
    }, 200)
  }

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#1A1A2E] flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h1
            className="font-serif italic text-white font-bold text-balance"
            style={{ fontSize: 'clamp(36px, 8vw, 96px)', lineHeight: 1.05 }}
          >
            A Legacy Built<br />Brick by Brick.
          </h1>
          <div className="w-[120px] h-px bg-[#C9A96E] mx-auto mt-8 mb-6" />
          <p className="font-sans text-white/60 text-base md:text-lg">
            30 years. 41 projects. 6 million square feet. Zero defaults.
          </p>
        </div>

        {/* Ticker */}
        <div className="w-full bg-[#CD0E12] py-3 overflow-hidden">
          <div className="ticker-track">
            <span className="font-sans text-white/90 text-sm whitespace-nowrap px-2">{TICKER_NAMES}</span>
            <span className="font-sans text-white/90 text-sm whitespace-nowrap px-2">{TICKER_NAMES}</span>
          </div>
        </div>

        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 30s linear infinite;
          }
          @media (max-width: 768px) {
            .ticker-track { animation-duration: 40s; }
          }
        `}</style>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#CD0E12] py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {[
              { num: '41', label: 'Projects Delivered' },
              { num: '6M+', label: 'Square Feet' },
              { num: '8,000+', label: 'Families' },
              { num: '30', label: 'Years' },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center ${i > 0 ? 'md:border-l md:border-[#C9A96E]/30' : ''}`}>
                <p className="font-serif italic text-white text-4xl md:text-5xl font-bold">{stat.num}</p>
                <p className="font-sans text-white/80 text-[11px] uppercase tracking-[0.15em] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-[#F8F4EF] pt-12 pb-6">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#CD0E12] font-medium mb-3">COMPLETED PORTFOLIO</p>
              <h2 className="font-serif text-[#1A1A2E] text-3xl md:text-4xl font-bold">Every Project. Delivered.</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  className={`font-sans text-xs uppercase tracking-[0.1em] font-medium px-5 py-2.5 transition-all duration-200 ${
                    activeFilter === f
                      ? 'bg-[#1A1A2E] text-[#F8F4EF]'
                      : 'bg-transparent text-[#1A1A2E] border border-[#1A1A2E]'
                  }`}
                >
                  {f} ({counts[f] || 0})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="bg-[#F8F4EF] pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8ECF0] transition-all duration-200 ${transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            {filtered.map((project, i) => (
              <div
                key={project.name}
                className="bg-white p-7 flex flex-col group hover:bg-[#1A1A2E] hover:-translate-y-0.5 transition-all duration-250 cursor-default"
              >
                {/* Badge row */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-sans text-[10px] uppercase tracking-[0.1em] font-medium px-2.5 py-1 ${
                    project.type === 'Residential' ? 'bg-[#CD0E12] text-white' :
                    project.type === 'Commercial' ? 'bg-[#1A1A2E] text-[#F8F4EF] group-hover:bg-white group-hover:text-[#1A1A2E]' :
                    'bg-[#C9A96E] text-[#1A1A2E]'
                  }`}>
                    {project.type}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans text-[10px] text-[#2D7A4F] group-hover:text-[#6FCF97]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F] group-hover:bg-[#6FCF97]" />
                    Delivered
                  </span>
                </div>

                <div className="h-px bg-[#F0F0F0] group-hover:bg-white/10 mb-4" />

                {/* Project name */}
                <h3 className="font-serif text-[#1A1A2E] text-xl font-medium leading-snug group-hover:text-white transition-colors">
                  {project.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CD0E12] flex-shrink-0" />
                  <span className="font-sans text-[13px] text-[#888] group-hover:text-white/60 transition-colors">{project.location}</span>
                </div>

                {/* Area */}
                <p className="font-sans text-[13px] text-[#CD0E12] font-medium mt-2 group-hover:text-[#C9A96E] transition-colors">
                  {project.area}
                </p>

                {/* Number */}
                <div className="flex-1 flex items-end justify-end mt-4">
                  <span className="font-serif italic text-[32px] text-[#F0F0F0] group-hover:text-[#CD0E12] transition-colors leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Statement */}
      <section className="bg-[#1A1A2E] py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <p className="font-serif italic text-white text-2xl md:text-4xl leading-snug mb-8">
            &ldquo;We have never missed a possession date.<br />Not once. In 30 years.&rdquo;
          </p>
          <div className="w-[80px] h-px bg-[#C9A96E] mx-auto mb-6" />
          <p className="font-sans text-[#C9A96E] text-sm mb-8">
            M. Narsaiah, Chairman and Managing Director
          </p>
          <p className="font-sans text-white/60 text-base leading-relaxed max-w-[600px] mx-auto">
            This is not a claim. It is a record. Every one of the 41 projects listed above was handed over on the committed date, with the committed specifications, to families who trusted us with their life savings.
          </p>
        </div>
        <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
          }} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2 className="font-serif text-[#1A1A2E] text-3xl md:text-4xl font-bold">Join 8,000+ Families</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/site-visit"
                className="text-center font-sans text-sm uppercase tracking-[0.1em] font-medium text-[#F8F4EF] bg-[#1A1A2E] px-10 py-4 hover:bg-[#CD0E12] transition-colors"
              >
                Book a Site Visit
              </Link>
              <Link
                href="/#projects-grid"
                className="text-center font-sans text-sm uppercase tracking-[0.1em] font-medium text-[#1A1A2E] border border-[#1A1A2E] px-10 py-4 hover:bg-[#1A1A2E] hover:text-[#F8F4EF] transition-colors"
              >
                View Ongoing Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
