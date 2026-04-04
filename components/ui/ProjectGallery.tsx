'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Lightbox from '@/components/ui/Lightbox'

interface GalleryImage {
  url: string
  alt: string
  category?: string
  label?: string
}

interface ProjectGalleryProps {
  heroImages: GalleryImage[]
  aerialImages: GalleryImage[]
  landscapeImages: GalleryImage[]
  amenityImages: GalleryImage[]
  elevationImages: GalleryImage[]
  projectName: string
  location: string
  rera: string
}

export default function ProjectGallery({
  heroImages,
  aerialImages,
  landscapeImages,
  amenityImages,
  elevationImages,
  projectName,
  location,
  rera,
}: ProjectGalleryProps) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const allImages: GalleryImage[] = [...heroImages, ...aerialImages, ...landscapeImages, ...amenityImages, ...elevationImages]

  const openLightbox = (globalIndex: number) => {
    setLightboxIndex(globalIndex)
    setLightboxOpen(true)
  }

  const getGlobalIndex = (sectionOffset: number, localIndex: number) => sectionOffset + localIndex

  const heroOffset = 0
  const aerialOffset = heroImages.length
  const landscapeOffset = aerialOffset + aerialImages.length
  const amenityOffset = landscapeOffset + landscapeImages.length
  const elevationOffset = amenityOffset + amenityImages.length

  // Hero auto-rotate
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
              onClick={() => openLightbox(getGlobalIndex(heroOffset, i))}
              style={{ cursor: 'pointer' }}
            />
          ))}
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          {/* Text overlay */}
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
          {/* Arrows */}
          <button onClick={prevHero} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10" aria-label="Previous image">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button onClick={nextHero} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10" aria-label="Next image">
            <ChevronRight size={20} className="text-white" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-6' : 'bg-white/40 w-2'}`} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* MASTER PLAN */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">MASTER PLAN</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Thoughtfully Planned for 775 Families</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 cursor-pointer" onClick={() => openLightbox(getGlobalIndex(aerialOffset, 0))}>
              <img src={aerialImages[0]?.url} alt={aerialImages[0]?.alt} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" />
            </div>
            <div className="lg:col-span-2 cursor-pointer" onClick={() => openLightbox(getGlobalIndex(aerialOffset, 1))}>
              <img src={aerialImages[1]?.url} alt={aerialImages[1]?.alt} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* LANDSCAPE GALLERY */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">LANDSCAPE</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Where Nature Meets Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {landscapeImages.map((img, i) => (
              <div key={i} className="cursor-pointer overflow-hidden rounded-lg" onClick={() => openLightbox(getGlobalIndex(landscapeOffset, i))}>
                <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[16/9] object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES PHOTO GRID */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">AMENITIES</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Designed for Every Moment of Joy</h2>
          <div className="flex flex-col gap-5">
            {/* Full width hero image */}
            {amenityImages[0] && (
              <div className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(getGlobalIndex(amenityOffset, 0))}>
                <img src={amenityImages[0].url} alt={amenityImages[0].alt} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-5">
                  <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{amenityImages[0].label}</span>
                </div>
              </div>
            )}
            {/* Row of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {amenityImages.slice(1, 4).map((img, i) => (
                <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(getGlobalIndex(amenityOffset, i + 1))}>
                  <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                    <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Row of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {amenityImages.slice(4, 7).map((img, i) => (
                <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(getGlobalIndex(amenityOffset, i + 4))}>
                  <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                    <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ELEVATIONS */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">ELEVATIONS</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Three Towers. One Vision.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {elevationImages.map((img, i) => (
              <div key={i} className="cursor-pointer overflow-hidden rounded-lg" onClick={() => openLightbox(getGlobalIndex(elevationOffset, i))}>
                <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
