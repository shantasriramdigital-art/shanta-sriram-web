'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Lightbox from '@/components/ui/Lightbox'
import ImageCarousel from '@/components/ui/ImageCarousel'

interface GalleryImage {
  url: string
  alt: string
  category?: string
  label?: string
}

interface GallerySection {
  sectionLabel: string
  heading: string
  images: GalleryImage[]
  autoScrollInterval?: number
  background?: string
}

interface ProjectGalleryProps {
  heroImages: GalleryImage[]
  sections: GallerySection[]
  projectName: string
  location: string
  rera: string
}

export default function ProjectGallery({
  heroImages,
  sections,
  projectName,
  location,
  rera,
}: ProjectGalleryProps) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState<Set<number>>(new Set())
  const [heroReady, setHeroReady] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const manualRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const heroTotal = heroImages.length

  const handleHeroLoad = useCallback((i: number) => {
    setHeroLoaded((prev) => {
      const next = new Set(prev)
      next.add(i)
      if (next.size >= Math.min(2, heroTotal)) setHeroReady(true)
      return next
    })
  }, [heroTotal])

  const stopHeroScroll = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const startHeroScroll = useCallback(() => {
    if (!heroReady || heroTotal <= 1) return
    stopHeroScroll()
    intervalRef.current = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroTotal)
    }, 5000)
  }, [heroReady, heroTotal, stopHeroScroll])

  useEffect(() => {
    if (heroReady) startHeroScroll()
    return stopHeroScroll
  }, [heroReady, startHeroScroll, stopHeroScroll])

  useEffect(() => {
    const onVis = () => { if (document.hidden) stopHeroScroll(); else if (heroReady) startHeroScroll() }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [heroReady, startHeroScroll, stopHeroScroll])

  // Preload next hero
  useEffect(() => {
    const nextIdx = (heroIndex + 1) % heroTotal
    const img = new Image()
    img.src = heroImages[nextIdx].url
  }, [heroIndex, heroTotal, heroImages])

  const handleHeroNav = useCallback((i: number) => {
    stopHeroScroll()
    setHeroIndex(i)
    if (manualRef.current) clearTimeout(manualRef.current)
    manualRef.current = setTimeout(() => { if (heroReady) startHeroScroll() }, 8000)
  }, [stopHeroScroll, startHeroScroll, heroReady])

  useEffect(() => { return () => { if (manualRef.current) clearTimeout(manualRef.current) } }, [])

  const isNearHero = (i: number) =>
    i === heroIndex || i === (heroIndex + 1) % heroTotal || i === (heroIndex - 1 + heroTotal) % heroTotal

  return (
    <>
      {/* HERO - fixed height, skeleton, crossfade */}
      <section className="aspect-hero">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === heroIndex ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              zIndex: i === heroIndex ? 1 : 0,
              pointerEvents: i === heroIndex ? 'auto' : 'none',
            }}
          >
            {/* Skeleton */}
            <div className={`absolute inset-0 skeleton-shimmer transition-opacity duration-300 ${heroLoaded.has(i) ? 'opacity-0' : 'opacity-100'}`} style={{ zIndex: 0 }} />
            {/* Image */}
            {isNearHero(i) && (
              <img
                src={img.url}
                alt={img.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                onLoad={() => handleHeroLoad(i)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${heroLoaded.has(i) ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: 1, cursor: 'pointer', transitionDuration: '0.4s' }}
                onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-[3]">
          <div className="max-w-[1200px] mx-auto flex items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-white text-3xl md:text-5xl font-bold mb-2">{projectName}</h1>
              <p className="font-sans text-white/70 text-sm md:text-base">{location}</p>
            </div>
            <span className="font-mono text-[10px] text-white/50 bg-white/10 px-3 py-1.5 rounded-sm flex-shrink-0">
              RERA: {rera}
            </span>
          </div>
        </div>
        <button onClick={() => handleHeroNav((heroIndex - 1 + heroTotal) % heroTotal)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10" aria-label="Previous image">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button onClick={() => handleHeroNav((heroIndex + 1) % heroTotal)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10" aria-label="Next image">
          <ChevronRight size={20} className="text-white" />
        </button>
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => handleHeroNav(i)} className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-6' : 'bg-white/40 w-2'}`} aria-label={`Image ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* CAROUSEL SECTIONS */}
      {sections.map((section, i) => (
        <ImageCarousel
          key={i}
          label={section.sectionLabel}
          title={section.heading}
          images={section.images}
          autoScrollInterval={section.autoScrollInterval || 5000}
          showThumbnails={true}
          background={section.background || (i % 2 === 0 ? 'bg-white' : 'bg-[#F8F4EF]')}
        />
      ))}

      {lightboxOpen && (
        <Lightbox images={heroImages} currentIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />
      )}
    </>
  )
}
