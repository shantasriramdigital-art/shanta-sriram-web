'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Lightbox from '@/components/ui/Lightbox'

interface CarouselImage {
  url: string
  alt: string
  label?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  title: string
  label: string
  autoScrollInterval?: number
  showThumbnails?: boolean
  aspectRatio?: string
  background?: string
}

export default function ImageCarousel({
  images,
  title,
  label,
  autoScrollInterval = 4000,
  showThumbnails = true,
  aspectRatio = '16/9',
  background = 'bg-white',
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set())
  const thumbRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = images.length
  if (total === 0) return null

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])

  useEffect(() => {
    if (paused || total <= 1) return
    const timer = setInterval(next, autoScrollInterval)
    return () => clearInterval(timer)
  }, [paused, next, autoScrollInterval, total])

  useEffect(() => {
    if (!showThumbnails || !thumbRef.current) return
    const activeThumb = thumbRef.current.children[current] as HTMLElement
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [current, showThumbnails])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    }
    el.addEventListener('keydown', handleKey)
    return () => el.removeEventListener('keydown', handleKey)
  }, [next, prev])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  const shouldRender = (i: number) =>
    i === current || i === (current + 1) % total || i === (current - 1 + total) % total

  const markLoaded = (i: number) => setLoadedSet((prev) => new Set(prev).add(i))

  const bgColor = background === 'bg-[#F8F4EF]' ? '#F8F4EF' : '#ffffff'

  return (
    <section className={`${background} py-12 md:py-20`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionLabel className="mb-4">{label}</SectionLabel>
        <h2 className="text-h2 font-serif text-[#1A1A2E] mb-8">{title}</h2>

        <div
          ref={containerRef}
          className="relative"
          role="region"
          aria-label={title}
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Main image - fixed container, no layout shift */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ aspectRatio, backgroundColor: '#F8F4EF' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 cursor-pointer"
                style={{ opacity: i === current ? 1 : 0, transition: 'opacity 0.4s ease', zIndex: i === current ? 1 : 0 }}
                onClick={() => setLightboxOpen(true)}
              >
                {shouldRender(i) && (
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onLoad={() => markLoaded(i)}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: loadedSet.has(i) ? 1 : 0, transition: 'opacity 0.3s ease' }}
                  />
                )}
              </div>
            ))}

            {images[current]?.label && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 pointer-events-none z-[2]">
                <span className="font-sans text-sm text-white">{images[current].label}</span>
              </div>
            )}

            <div className="absolute top-3 right-3 z-[2]">
              <span className="font-sans text-xs text-white bg-black/50 px-3 py-1.5 rounded-full">{current + 1} / {total}</span>
            </div>

            {total > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#CD0E12] group transition-colors z-[3]" aria-label="Previous image">
                  <ChevronLeft size={18} className="text-[#CD0E12] group-hover:text-white transition-colors" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#CD0E12] group transition-colors z-[3]" aria-label="Next image">
                  <ChevronRight size={18} className="text-[#CD0E12] group-hover:text-white transition-colors" />
                </button>
              </>
            )}

            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
                {images.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#CD0E12] w-6' : 'bg-white/60 w-2'}`} aria-label={`Image ${i + 1}`} />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {showThumbnails && total > 1 && (
            <div className="relative mt-3">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }} />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }} />
              <div ref={thumbRef} className="flex gap-2 overflow-x-auto py-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`flex-shrink-0 overflow-hidden transition-all duration-200 relative ${i === current ? 'border-2 border-[#CD0E12] scale-105 opacity-100' : 'border-2 border-transparent opacity-60 hover:opacity-80'}`}
                    style={{ width: '80px', height: '56px', borderRadius: '4px' }}
                  >
                    <img src={img.url} alt={img.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox images={images} currentIndex={current} onClose={() => setLightboxOpen(false)} onNavigate={setCurrent} />
      )}
    </section>
  )
}
