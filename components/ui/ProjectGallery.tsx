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

interface GallerySection {
  sectionLabel: string
  heading: string
  images: GalleryImage[]
  layout: 'split' | 'grid-2' | 'grid-3' | 'masonry' | 'towers'
  subheading?: string
  background?: string
}

interface ProjectGalleryProps {
  heroImages: GalleryImage[]
  sections: GallerySection[]
  projectName: string
  location: string
  rera: string
  totalUnits?: string
}

export default function ProjectGallery({
  heroImages,
  sections,
  projectName,
  location,
  rera,
  totalUnits,
}: ProjectGalleryProps) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Build unified image array
  const allImages: GalleryImage[] = [
    ...heroImages,
    ...sections.flatMap((s) => s.images),
  ]

  const openLightbox = (globalIndex: number) => {
    setLightboxIndex(globalIndex)
    setLightboxOpen(true)
  }

  // Hero auto-rotate
  const nextHero = useCallback(() => setHeroIndex((i) => (i + 1) % heroImages.length), [heroImages.length])
  const prevHero = useCallback(() => setHeroIndex((i) => (i - 1 + heroImages.length) % heroImages.length), [heroImages.length])

  useEffect(() => {
    const timer = setInterval(nextHero, 5000)
    return () => clearInterval(timer)
  }, [nextHero])

  // Track cumulative offset for lightbox indexing
  let cumulativeOffset = heroImages.length

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
              onClick={() => openLightbox(i)}
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

      {/* DYNAMIC GALLERY SECTIONS */}
      {sections.map((section, sIdx) => {
        const sectionOffset = cumulativeOffset
        cumulativeOffset += section.images.length
        const bg = section.background || (sIdx % 2 === 0 ? 'bg-white' : 'bg-[#F4F7FC]')

        return (
          <section key={sIdx} className={`${bg} py-20 md:py-24`}>
            <div className="max-w-[1200px] mx-auto px-6">
              <SectionLabel className="mb-4">{section.sectionLabel}</SectionLabel>
              <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4">{section.heading}</h2>
              {section.subheading && <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-10">{section.subheading}</p>}
              {!section.subheading && <div className="mb-6" />}

              {section.layout === 'split' && section.images.length >= 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                  <div className="lg:col-span-3 cursor-pointer" onClick={() => openLightbox(sectionOffset)}>
                    <img src={section.images[0].url} alt={section.images[0].alt} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" />
                  </div>
                  <div className="lg:col-span-2 cursor-pointer" onClick={() => openLightbox(sectionOffset + 1)}>
                    <img src={section.images[1].url} alt={section.images[1].alt} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" />
                  </div>
                </div>
              )}

              {section.layout === 'grid-2' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {section.images.map((img, i) => (
                    <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(sectionOffset + i)}>
                      <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500" />
                      {img.label && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                          <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.layout === 'grid-3' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {section.images.map((img, i) => (
                    <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(sectionOffset + i)}>
                      <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                      {img.label && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                          <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.layout === 'masonry' && (
                <div className="flex flex-col gap-5">
                  {section.images[0] && (
                    <div className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(sectionOffset)}>
                      <img src={section.images[0].url} alt={section.images[0].alt} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500" />
                      {section.images[0].label && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-5">
                          <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{section.images[0].label}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {section.images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {section.images.slice(1, 4).map((img, i) => (
                        <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(sectionOffset + i + 1)}>
                          <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                          {img.label && (
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                              <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {section.images.length > 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {section.images.slice(4, 7).map((img, i) => (
                        <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group" onClick={() => openLightbox(sectionOffset + i + 4)}>
                          <img src={img.url} alt={img.alt} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                          {img.label && (
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                              <span className="font-sans text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {section.layout === 'towers' && (
                <div className="flex flex-col gap-5">
                  {/* Tower 1: full width hero */}
                  {section.images[0] && (
                    <div className="cursor-pointer overflow-hidden rounded-lg relative group h-[300px] md:h-[450px]" onClick={() => openLightbox(sectionOffset)}>
                      <img src={section.images[0].url} alt={section.images[0].alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                      <span className="absolute bottom-4 left-4 font-serif text-white text-lg">{section.images[0].label}</span>
                    </div>
                  )}
                  {/* Towers 2-7: 3x2 grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {section.images.slice(1, 7).map((img, i) => (
                      <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group h-[200px] md:h-[280px]" onClick={() => openLightbox(sectionOffset + i + 1)}>
                        <img src={img.url} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <span className="absolute bottom-4 left-4 font-serif text-white text-lg">{img.label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Towers 8-10: 3 columns */}
                  {section.images.length > 7 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                      {section.images.slice(7, 10).map((img, i) => (
                        <div key={i} className="cursor-pointer overflow-hidden rounded-lg relative group h-[200px] md:h-[280px]" onClick={() => openLightbox(sectionOffset + i + 7)}>
                          <img src={img.url} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                          <span className="absolute bottom-4 left-4 font-serif text-white text-lg">{img.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )
      })}

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
