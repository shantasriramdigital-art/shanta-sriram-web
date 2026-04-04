'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Lightbox from '@/components/ui/Lightbox'

interface CarouselImage {
  url: string
  alt: string
  label?: string
  category?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  label?: string
  title?: string
  autoScrollInterval?: number
  background?: string
}

export default function ImageCarousel({
  images,
  label,
  title,
  autoScrollInterval = 5000,
  background = 'bg-white',
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(new Set())
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHovered = useRef(false)
  const isReady = useRef(false)

  const onLoad = useCallback((index: number) => {
    setLoaded((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
    if (index === 0) isReady.current = true
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    timerRef.current = setInterval(() => {
      if (!isReady.current || isHovered.current || document.hidden) return
      setCurrent((prev) => (prev + 1) % images.length)
    }, autoScrollInterval)
  }, [images.length, autoScrollInterval, stopTimer])

  useEffect(() => {
    if (loaded.has(0)) {
      const t = setTimeout(startTimer, 1500)
      return () => clearTimeout(t)
    }
  }, [loaded, startTimer])

  useEffect(() => {
    const fn = () => document.hidden ? stopTimer() : startTimer()
    document.addEventListener('visibilitychange', fn)
    return () => document.removeEventListener('visibilitychange', fn)
  }, [startTimer, stopTimer])

  useEffect(() => () => stopTimer(), [stopTimer])

  const goTo = (index: number) => {
    stopTimer()
    setCurrent(index)
    setTimeout(startTimer, 8000)
  }

  if (!images || images.length === 0) return null

  return (
    <section className={`${background} py-12 md:py-20`}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Label and title */}
        {(label || title) && (
          <div className="mb-6">
            {label && (
              <div className="flex items-center gap-3 mb-3">
                <span className="block h-px w-6 flex-shrink-0" style={{ backgroundColor: '#CD0E12' }} />
                <span style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>{label}</span>
                <span className="block h-px w-6 flex-shrink-0" style={{ backgroundColor: '#CD0E12' }} />
              </div>
            )}
            {title && (
              <h3 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 500, color: '#1A1A2E', margin: 0 }}>{title}</h3>
            )}
          </div>
        )}

        {/* Carousel - FIXED paddingBottom, never collapses */}
        <div
          onMouseEnter={() => { isHovered.current = true; stopTimer() }}
          onMouseLeave={() => { isHovered.current = false; startTimer() }}
          style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor: '#1A1A2E', borderRadius: '8px', flexShrink: 0 }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{ position: 'absolute', inset: 0, opacity: index === current ? 1 : 0, transition: 'opacity 0.7s ease-in-out', pointerEvents: index === current ? 'auto' : 'none' }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: loaded.has(index) ? 0 : 1, transition: 'opacity 0.4s ease', background: 'linear-gradient(90deg, #1A1A2E 0%, #2d2d4e 50%, #1A1A2E 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s ease-in-out infinite', zIndex: 0 }} />
              <img
                src={image.url}
                alt={image.alt || ''}
                onLoad={() => onLoad(index)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : undefined}
                decoding="async"
                onClick={() => setLightboxOpen(true)}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded.has(index) ? 1 : 0, transition: 'opacity 0.5s ease', zIndex: 1, display: 'block', cursor: 'pointer' }}
              />
              {image.label && loaded.has(index) && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 16px', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', zIndex: 2 }}>
                  <span style={{ color: 'white', fontSize: '13px', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>{image.label}</span>
                </div>
              )}
            </div>
          ))}

          {images.length > 1 && (
            <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 10px', borderRadius: '100px', fontSize: '12px', zIndex: 10 }}>{current + 1} / {images.length}</div>
          )}

          {images.length > 1 && (
            <>
              <button onClick={() => goTo((current - 1 + images.length) % images.length)} aria-label="Previous image" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#1A1A2E', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>&#8249;</button>
              <button onClick={() => goTo((current + 1) % images.length)} aria-label="Next image" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#1A1A2E', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>&#8250;</button>
            </>
          )}

          {images.length > 1 && images.length <= 12 && (
            <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
              {images.map((_, index) => (
                <button key={index} onClick={() => goTo(index)} aria-label={`Image ${index + 1}`} style={{ width: index === current ? '24px' : '8px', height: '8px', borderRadius: '100px', border: 'none', background: index === current ? '#CD0E12' : 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails - fixed height, own scroll container, never affects page */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', overflowY: 'hidden', height: '64px', flexShrink: 0, scrollbarWidth: 'none' }}>
            {images.map((image, index) => (
              <button key={index} onClick={() => goTo(index)} style={{ flexShrink: 0, width: '80px', height: '56px', padding: 0, border: index === current ? '2px solid #CD0E12' : '2px solid transparent', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', opacity: index === current ? 1 : 0.6, transition: 'all 0.2s ease', background: '#1A1A2E' }}>
                <img src={image.url} alt={image.alt || ''} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox images={images} currentIndex={current} onClose={() => setLightboxOpen(false)} onNavigate={setCurrent} />
      )}
    </section>
  )
}
