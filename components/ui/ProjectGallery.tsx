'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHovered = useRef(false)
  const isReady = useRef(false)

  const heroTotal = heroImages.length

  const onHeroLoad = useCallback((i: number) => {
    setHeroLoaded((prev) => { const n = new Set(prev); n.add(i); return n })
    if (i === 0) isReady.current = true
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  const startTimer = useCallback(() => {
    if (heroTotal <= 1) return
    stopTimer()
    timerRef.current = setInterval(() => {
      if (!isReady.current || isHovered.current || document.hidden) return
      setHeroIndex((i) => (i + 1) % heroTotal)
    }, 5000)
  }, [heroTotal, stopTimer])

  useEffect(() => {
    if (heroLoaded.has(0)) {
      const t = setTimeout(startTimer, 1500)
      return () => clearTimeout(t)
    }
  }, [heroLoaded, startTimer])

  useEffect(() => {
    const fn = () => document.hidden ? stopTimer() : startTimer()
    document.addEventListener('visibilitychange', fn)
    return () => document.removeEventListener('visibilitychange', fn)
  }, [startTimer, stopTimer])

  useEffect(() => () => stopTimer(), [stopTimer])

  const goToHero = (i: number) => {
    stopTimer()
    setHeroIndex(i)
    setTimeout(startTimer, 8000)
  }

  return (
    <>
      {/* HERO - fixed height, never changes, no scroll interference */}
      <div
        onMouseEnter={() => { isHovered.current = true; stopTimer() }}
        onMouseLeave={() => { isHovered.current = false; startTimer() }}
        style={{ position: 'relative', width: '100%', height: 'clamp(300px, 65vh, 750px)', overflow: 'hidden', backgroundColor: '#1A1A2E', flexShrink: 0 }}
      >
        {heroImages.map((img, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === heroIndex ? 1 : 0, transition: 'opacity 0.7s ease-in-out', pointerEvents: i === heroIndex ? 'auto' : 'none' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: heroLoaded.has(i) ? 0 : 1, transition: 'opacity 0.4s ease', background: 'linear-gradient(90deg, #1A1A2E 0%, #2d2d4e 50%, #1A1A2E 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s ease-in-out infinite', zIndex: 0 }} />
            <img
              src={img.url}
              alt={img.alt}
              onLoad={() => onHeroLoad(i)}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
              decoding="async"
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: heroLoaded.has(i) ? 1 : 0, transition: 'opacity 0.5s ease', zIndex: 1, cursor: 'pointer', display: 'block' }}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Text overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 3 }}>
          <div className="max-w-[1200px] mx-auto flex items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-white text-3xl md:text-5xl font-bold mb-2">{projectName}</h1>
              <p className="font-sans text-white/70 text-sm md:text-base">{location}</p>
            </div>
            <span className="font-mono text-[10px] text-white/50 bg-white/10 px-3 py-1.5 rounded-sm flex-shrink-0">RERA: {rera}</span>
          </div>
        </div>

        {/* Arrows */}
        {heroTotal > 1 && (
          <>
            <button onClick={() => goToHero((heroIndex - 1 + heroTotal) % heroTotal)} aria-label="Previous image" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white' }}>&#8249;</button>
            <button onClick={() => goToHero((heroIndex + 1) % heroTotal)} aria-label="Next image" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white' }}>&#8250;</button>
          </>
        )}

        {/* Dots */}
        {heroTotal > 1 && (
          <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => goToHero(i)} aria-label={`Image ${i + 1}`} style={{ width: i === heroIndex ? '24px' : '8px', height: '8px', borderRadius: '100px', border: 'none', background: i === heroIndex ? 'white' : 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
            ))}
          </div>
        )}
      </div>

      {/* IMAGE CAROUSEL SECTIONS */}
      {sections.map((section, i) => (
        <ImageCarousel
          key={i}
          label={section.sectionLabel}
          title={section.heading}
          images={section.images}
          autoScrollInterval={section.autoScrollInterval || 5000}
          background={section.background || (i % 2 === 0 ? 'bg-white' : 'bg-[#F8F4EF]')}
        />
      ))}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox images={heroImages} currentIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} onNavigate={setLightboxIndex} />
      )}
    </>
  )
}
