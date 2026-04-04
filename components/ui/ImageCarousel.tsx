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
  autoScrollInterval = 5000,
  showThumbnails = true,
  aspectRatio = '16/9',
  background = 'bg-white',
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [isReady, setIsReady] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const manualNavTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = images.length
  if (total === 0) return null

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      const next = new Set(prev)
      next.add(index)
      if (next.size >= Math.min(2, total)) {
        setIsReady(true)
      }
      return next
    })
  }, [total])

  // Auto-scroll controls
  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startAutoScroll = useCallback(() => {
    if (!isReady || total <= 1) return
    stopAutoScroll()
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, autoScrollInterval)
  }, [isReady, total, autoScrollInterval, stopAutoScroll])

  // Start auto-scroll when ready and not paused
  useEffect(() => {
    if (isReady && !paused) startAutoScroll()
    else stopAutoScroll()
    return stopAutoScroll
  }, [isReady, paused, startAutoScroll, stopAutoScroll])

  // Pause on tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopAutoScroll()
      else if (isReady && !paused) startAutoScroll()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [isReady, paused, startAutoScroll, stopAutoScroll])

  // Preload next image
  useEffect(() => {
    const nextIdx = (current + 1) % total
    const img = new Image()
    img.src = images[nextIdx].url
  }, [current, total, images])

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!showThumbnails || !thumbRef.current) return
    const activeThumb = thumbRef.current.children[current] as HTMLElement
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [current, showThumbnails])

  // Keyboard
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleManualNav((current - 1 + total) % total) }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleManualNav((current + 1) % total) }
    }
    el.addEventListener('keydown', handleKey)
    return () => el.removeEventListener('keydown', handleKey)
  }, [current, total])

  const handleManualNav = useCallback((newIndex: number) => {
    stopAutoScroll()
    setCurrent(newIndex)
    if (manualNavTimeout.current) clearTimeout(manualNavTimeout.current)
    manualNavTimeout.current = setTimeout(() => {
      if (isReady) startAutoScroll()
    }, 8000)
  }, [stopAutoScroll, startAutoScroll, isReady])

  useEffect(() => {
    return () => {
      if (manualNavTimeout.current) clearTimeout(manualNavTimeout.current)
    }
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      handleManualNav(diff > 0 ? (current + 1) % total : (current - 1 + total) % total)
    }
  }

  // Only render images near current slide
  const shouldRender = (i: number) =>
    i === current || i === (current + 1) % total || i === (current - 1 + total) % total

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
          {/* Main image - crossfade, fixed container with padding-bottom for CLS */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              paddingBottom: aspectRatio === '16/9' ? '56.25%' : aspectRatio === '4/3' ? '75%' : '56.25%',
              height: 0,
              backgroundColor: '#F8F4EF',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: i === current ? 1 : 0,
                  transition: 'opacity 0.6s ease-in-out',
                  zIndex: i === current ? 1 : 0,
                  pointerEvents: i === current ? 'auto' : 'none',
                }}
              >
                {/* Skeleton */}
                <div
                  className={`absolute inset-0 skeleton-shimmer transition-opacity duration-300 ${loadedImages.has(i) ? 'opacity-0' : 'opacity-100'}`}
                  style={{ zIndex: 0 }}
                />
                {/* Image */}
                {shouldRender(i) && (
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onLoad={() => handleImageLoad(i)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${loadedImages.has(i) ? 'opacity-100' : 'opacity-0'}`}
                    style={{ zIndex: 1, cursor: 'pointer', transitionDuration: '0.4s' }}
                    onClick={() => setLightboxOpen(true)}
                  />
                )}
              </div>
            ))}

            {/* Label overlay */}
            {images[current]?.label && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 pointer-events-none z-[2]">
                <span className="font-sans text-sm text-white">{images[current].label}</span>
              </div>
            )}

            {/* Counter */}
            <div className="absolute top-3 right-3 z-[2]">
              <span className="font-sans text-xs text-white bg-black/50 px-3 py-1.5 rounded-full">{current + 1} / {total}</span>
            </div>

            {/* Arrows */}
            {total > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); handleManualNav((current - 1 + total) % total) }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#CD0E12] group transition-colors z-[3]" aria-label="Previous image">
                  <ChevronLeft size={18} className="text-[#CD0E12] group-hover:text-white transition-colors" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleManualNav((current + 1) % total) }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#CD0E12] group transition-colors z-[3]" aria-label="Next image">
                  <ChevronRight size={18} className="text-[#CD0E12] group-hover:text-white transition-colors" />
                </button>
              </>
            )}

            {/* Dots */}
            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
                {images.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); handleManualNav(i) }} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#CD0E12] w-6' : 'bg-white/60 w-2'}`} aria-label={`Image ${i + 1}`} />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails - space always reserved to prevent CLS */}
          {showThumbnails && total > 1 && (
            <div style={{ height: '72px', marginTop: '12px' }}>
            {isReady && (
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }} />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }} />
              <div ref={thumbRef} className="flex gap-2 overflow-x-auto py-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleManualNav(i)}
                    className={`flex-shrink-0 overflow-hidden relative transition-all duration-200 ${i === current ? 'border-2 border-[#CD0E12] scale-105 opacity-100' : 'border-2 border-transparent opacity-60 hover:opacity-80'}`}
                    style={{ width: '80px', height: '56px', borderRadius: '4px' }}
                  >
                    <img src={img.url} alt={img.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            )}
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
