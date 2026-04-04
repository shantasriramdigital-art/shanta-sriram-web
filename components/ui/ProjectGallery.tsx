'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nextHero = useCallback(() => setHeroIndex((i) => (i + 1) % heroImages.length), [heroImages.length])
  const prevHero = useCallback(() => setHeroIndex((i) => (i - 1 + heroImages.length) % heroImages.length), [heroImages.length])

  useEffect(() => {
    const timer = setInterval(nextHero, 5000)
    return () => clearInterval(timer)
  }, [nextHero])

  return (
    <>
      {/* HERO IMAGE CAROUSEL */}
      <section className="relative overflow-hidden bg-[#1A1A2E]">
        <div className="relative h-[50vh] md:h-[70vh]">
          {heroImages.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
              style={{ cursor: 'pointer' }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
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
          <button onClick={prevHero} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10" aria-label="Previous image">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button onClick={nextHero} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10" aria-label="Next image">
            <ChevronRight size={20} className="text-white" />
          </button>
          <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-6' : 'bg-white/40 w-2'}`} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTIONS */}
      {sections.map((section, i) => (
        <ImageCarousel
          key={i}
          label={section.sectionLabel}
          title={section.heading}
          images={section.images}
          autoScrollInterval={section.autoScrollInterval || 4000}
          showThumbnails={true}
          background={section.background || (i % 2 === 0 ? 'bg-white' : 'bg-[#F8F4EF]')}
        />
      ))}

      {/* Hero lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={heroImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
