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
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1A1A2E] mb-3 text-balance">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-[#4A4A5A] mb-6">
                <MapPin size={18} className="text-[#CD0E12]" />
                <span className="font-sans text-lg">{project.location}</span>
              </div>
            </div>

            <p className="font-sans text-base leading-relaxed text-[#4A4A5A] max-w-lg">
              {project.description}
            </p>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 py-6">
              <div className="bg-white border border-[#E8ECF0] rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Home size={16} className="text-[#CD0E12]" />
                  <span className="font-sans text-xs uppercase tracking-wider text-[#6B6B6B]">Type</span>
                </div>
                <p className="font-serif text-lg font-medium text-[#1A1A2E]">{project.type}</p>
              </div>

              <div className="bg-white border border-[#E8ECF0] rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Home size={16} className="text-[#CD0E12]" />
                  <span className="font-sans text-xs uppercase tracking-wider text-[#6B6B6B]">Units</span>
                </div>
                <p className="font-serif text-lg font-medium text-[#1A1A2E]">{project.units}</p>
              </div>

              <div className="bg-white border border-[#E8ECF0] rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-[#CD0E12]" />
                  <span className="font-sans text-xs uppercase tracking-wider text-[#6B6B6B]">Possession</span>
                </div>
                <p className="font-serif text-lg font-medium text-[#1A1A2E]">{project.possession}</p>
              </div>

              <div className="bg-white border border-[#E8ECF0] rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee size={16} className="text-[#CD0E12]" />
                  <span className="font-sans text-xs uppercase tracking-wider text-[#6B6B6B]">Price</span>
                </div>
                <p className="font-serif text-lg font-medium text-[#1A1A2E]">{project.priceRange}</p>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <p className="font-sans text-xs uppercase tracking-wider text-[#6B6B6B] mb-3">Key Highlights</p>
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="font-sans text-sm px-3 py-1.5 bg-[#1A1A2E]/5 text-[#1A1A2E] rounded-full border border-[#1A1A2E]/10"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
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
              <div className="rounded-lg overflow-hidden shadow-xl mb-6 aspect-[4/3] relative">
                {(project as any).heroImages?.[0] ? (
                  <img
                    src={(project as any).heroImages[0].url}
                    alt={(project as any).heroImages[0].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
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

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-[#E8ECF0] rounded-md p-4 text-center">
                  <div className="font-serif text-[#CD0E12] text-2xl font-bold mb-1">
                    {project.nearby.itParks?.length || 0}
                  </div>
                  <p className="font-sans text-[10px] text-[#6B6B6B] uppercase tracking-wider">IT Parks</p>
                </div>
                <div className="bg-white border border-[#E8ECF0] rounded-md p-4 text-center">
                  <div className="font-serif text-[#CD0E12] text-2xl font-bold mb-1">
                    {project.amenities?.length || 0}
                  </div>
                  <p className="font-sans text-[10px] text-[#6B6B6B] uppercase tracking-wider">Amenities</p>
                </div>
                <div className="bg-white border border-[#E8ECF0] rounded-md p-4 text-center">
                  <div className="font-serif text-[#CD0E12] text-2xl font-bold mb-1">
                    {project.nearby.metro?.length || 0}
                  </div>
                  <p className="font-sans text-[10px] text-[#6B6B6B] uppercase tracking-wider">Metro</p>
                </div>
              </div>
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
