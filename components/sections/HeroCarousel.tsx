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
      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px]">
          {/* Left: Project Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-block mb-4">
                <span className={`text-xs font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded ${
                  isReadyToMove 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-[#CD0E12]/10 text-[#CD0E12]'
                }`}>
                  {project.status}
                </span>
              </div>
              <h1 className="hero-heading text-[#1A1A2E] mb-3 text-balance">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-[#4A4A5A] mb-6">
                <MapPin size={18} className="text-[#CD0E12]" />
                <span className="font-sans text-lg">{project.location}</span>
              </div>
            </div>

            <p className="font-sans text-base leading-relaxed text-[#4A4A5A] max-w-lg line-clamp-3">
              {project.description}
            </p>

            {/* Quick stats row */}
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', rowGap: '8px', paddingTop: '8px' }}>
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
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/site-visit"
                className="text-sm font-sans font-bold text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors"
              >
                Book Free Site Visit
              </Link>
              <Link
                href="/#projects-grid"
                className="text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
              >
                View All Projects
              </Link>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-3 pt-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#CD0E12] border border-[#CD0E12]/30 px-2.5 py-1 rounded-sm">
                TSRERA Registered
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#6B6B6B] border border-[#E8ECF0] px-2.5 py-1 rounded-sm">
                Est. 1995
              </span>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Project Image */}
              <div className="rounded-lg overflow-hidden shadow-xl mb-6 aspect-[4/3] relative" style={{ backgroundColor: '#1A1A2E' }}>
                {(project as any).cardImage ? (
                  <img
                    src={(project as any).cardImage}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-[#CD0E12] to-[#1A1A2E] w-full h-full flex items-center justify-center">
                    <div className="text-center px-6">
                      <Home size={48} className="text-white/30 mx-auto mb-3" />
                      <p className="font-serif text-white/40 text-lg">{project.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Advantages */}
              {(project as any).locationAdvantages && (
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
                  {(project as any).locationAdvantages.slice(0, 4).map((adv: { label: string; value: string }, i: number) => (
                    <div key={i} style={{ backgroundColor: 'white', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '12px 16px', minWidth: '100px', flexShrink: 0, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '4px' }}>{adv.label}</div>
                      <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '16px', fontWeight: 500, color: '#1A1A2E' }}>{adv.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
