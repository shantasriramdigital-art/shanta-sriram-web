'use client'

import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxImage {
  url: string
  alt: string
  label?: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const prev = useCallback(() => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }, [currentIndex, images.length, onNavigate])

  const next = useCallback(() => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const current = images[currentIndex]
  if (!current) return null

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center" onClick={onClose}>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <span className="font-sans text-sm text-white/60">{currentIndex + 1} of {images.length}</span>
      </div>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      {/* Image */}
      <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={current.url}
          alt={current.alt}
          className="max-w-full max-h-[85vh] object-contain"
          loading="eager"
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Caption */}
      {current.label && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <span className="font-sans text-sm text-white/80 bg-black/40 px-4 py-2 rounded">{current.label}</span>
        </div>
      )}
    </div>
  )
}
