'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MapPin, Home, Clock, IndianRupee } from 'lucide-react'
import { PROJECTS } from '@/lib/data/projects'

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % PROJECTS.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + PROJECTS.length) % PROJECTS.length), [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [paused, next])

  const project = PROJECTS[current]
  const isReadyToMove = project.status === 'Ready to Move'

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#F8F4EF] to-[#F4F7FC]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center" style={{ minHeight: '420px' }}>
          {/* Left: Project Details (3/5 width) */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-5">
            <div>
              <span className={`inline-block text-xs font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded mb-4 ${
                isReadyToMove ? 'bg-green-100 text-green-700' : 'bg-[#CD0E12]/10 text-[#CD0E12]'
              }`}>
                {project.status}
              </span>
              <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: '#1A1A2E', lineHeight: 1.1, margin: '0 0 10px 0' }}>
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-[#4A4A5A]">
                <MapPin size={16} className="text-[#CD0E12]" />
                <span className="font-sans text-base">{project.location}</span>
              </div>
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-[#4A4A5A] line-clamp-2">{project.description}</p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', rowGap: '8px' }}>
              {[
                { label: 'Type', value: project.type },
                { label: 'Units', value: project.units },
                { label: 'Price', value: project.priceRange },
              ].map((stat, i, arr) => (
                <div key={i} style={{ paddingRight: '20px', marginRight: '20px', borderRight: i < arr.length - 1 ? '1px solid #E8ECF0' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px' }}>{stat.label}</div>
                  <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', color: '#1A1A2E', fontWeight: 500 }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={`/projects/${project.slug}`} className="text-sm font-sans font-bold text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
                View Project
              </Link>
              <Link href="/site-visit" className="text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors">
                Book Site Visit
              </Link>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#CD0E12] border border-[#CD0E12]/30 px-2.5 py-1 rounded-sm">TSRERA Registered</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#6B6B6B] border border-[#E8ECF0] px-2.5 py-1 rounded-sm">Est. 1995</span>
            </div>
          </div>

          {/* Right: Image (2/5 width) */}
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden shadow-xl aspect-[4/3] relative" style={{ backgroundColor: '#1A1A2E' }}>
              {(project as any).cardImage ? (
                <img src={(project as any).cardImage} alt={project.name} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 50%, #1A1A2E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '20px', color: 'rgba(255,255,255,0.15)' }}>{project.name}</p>
                </div>
              )}
            </div>
            {/* Location pills below image */}
            {(project as any).locationAdvantages && (
              <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginTop: '12px', paddingBottom: '4px' }}>
                {(project as any).locationAdvantages.slice(0, 4).map((adv: { label: string; value: string }, i: number) => (
                  <div key={i} style={{ backgroundColor: 'white', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '8px 12px', minWidth: '80px', flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ fontSize: '8px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{adv.label}</div>
                    <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '14px', color: '#1A1A2E' }}>{adv.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="font-sans text-[10px] uppercase tracking-widest text-[#6B6B6B]">Scroll to explore</span>
        <div className="w-px h-4 bg-[#6B6B6B]" />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-[#CD0E12] w-8'
                : 'bg-[#1A1A2E]/20 w-2 hover:bg-[#1A1A2E]/40'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white border border-[#E8ECF0] rounded-full hover:border-[#1A1A2E]/40 hover:shadow-md transition-all duration-200 z-10"
        aria-label="Previous project"
      >
        <ChevronLeft size={20} className="text-[#1A1A2E]" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white border border-[#E8ECF0] rounded-full hover:border-[#1A1A2E]/40 hover:shadow-md transition-all duration-200 z-10"
        aria-label="Next project"
      >
        <ChevronRight size={20} className="text-[#1A1A2E]" />
      </button>
    </section>
  )
}
