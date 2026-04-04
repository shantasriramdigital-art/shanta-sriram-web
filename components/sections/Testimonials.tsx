'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth >= 1024) setPerView(3)
      else if (window.innerWidth >= 768) setPerView(2)
      else setPerView(1)
    }
    updatePerView()
    window.addEventListener('resize', updatePerView)
    return () => window.removeEventListener('resize', updatePerView)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    }, 7000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const maxStart = Math.max(0, TESTIMONIALS.length - perView)
  const startIndex = Math.min(current, maxStart)
  const visible = TESTIMONIALS.slice(startIndex, startIndex + perView)

  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1))
  const handleNext = () => setCurrent((c) => Math.min(maxStart, c + 1))

  return (
    <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div>
          <div className="text-center mb-14">
            <SectionLabel className="!text-[#C9A96E] mb-4">CLIENT TESTIMONIALS</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif text-white text-balance font-bold">
              What Our Homeowners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((t, i) => (
              <div key={`${startIndex}-${i}`} className="bg-white rounded-md p-6 flex flex-col">
                <div className="font-serif text-[#CD0E12] text-5xl leading-none mb-4 select-none">&ldquo;</div>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex-1 mb-5">
                  {t.text}
                </p>
                <div className="border-t border-[#E8ECF0] pt-4">
                  <p className="font-serif text-[#1A1A2E] text-base font-medium">{t.name}</p>
                  <p className="font-sans text-[#6B6B6B] text-xs mt-0.5">{t.location}</p>
                  <p className="font-sans text-[#6B6B6B] text-xs">{t.profession}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="p-2 border border-white/30 text-white rounded hover:border-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === startIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={current >= maxStart}
              className="p-2 border border-white/30 text-white rounded hover:border-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
        }} />
      </div>
    </section>
  )
}
