'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import BrochureGateModal from '@/components/ui/BrochureGateModal'
import { MapPin, Shield, Home } from 'lucide-react'

export default function FeaturedProject() {
  const [brochureOpen, setBrochureOpen] = useState(false)

  return (
    <section className="bg-[#F8F4EF] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionLabel className="mb-4">FEATURED PROJECT</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: image placeholder (60%) */}
          <div className="lg:col-span-3">
            <div className="aspect-[16/10] bg-gradient-to-br from-[#CD0E12]/20 to-[#1A1A2E]/20 rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <Home size={48} className="text-[#1A1A2E]/15 mx-auto mb-3" />
                <p className="font-serif text-[#1A1A2E]/20 text-xl">The Bodhivriksha</p>
              </div>
              <div className="absolute top-4 left-4">
                <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-sm bg-[#F59E0B]/10 text-amber-800 border border-[#F59E0B]/20">
                  Under Construction
                </span>
              </div>
            </div>
          </div>

          {/* Right: details (40%) */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] font-bold mb-2">
              The Bodhivriksha
            </h2>
            <p className="font-serif text-[#C9A96E] text-lg italic mb-4">The Ripples of Joy</p>

            <div className="flex items-center gap-2 text-[#4A4A5A] mb-2">
              <MapPin size={14} className="text-[#CD0E12]" />
              <span className="font-sans text-sm">Bandlaguda Jagir, near TSPA Junction</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Shield size={14} className="text-[#2E7D32]" />
              <span className="font-mono text-xs text-[#6B6B6B]">TS RERA: P02400003070</span>
            </div>

            {/* Quick stats 2x2 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Units', value: '775' },
                { label: 'Towers', value: '3' },
                { label: 'Sizes', value: '1090-1975 sft' },
                { label: 'Rating', value: 'IGBC Platinum' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-[#E8ECF0] rounded-md p-3">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#6B6B6B] mb-1">{stat.label}</p>
                  <p className="font-serif text-[#1A1A2E] text-base font-medium">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects/bodhivriksha"
                className="text-sm font-sans font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors"
              >
                View Full Details
              </Link>
              <button
                onClick={() => setBrochureOpen(true)}
                className="text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      <BrochureGateModal open={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </section>
  )
}
