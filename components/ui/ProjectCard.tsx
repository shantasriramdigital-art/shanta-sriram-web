'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PROJECTS } from '@/lib/data/projects'

type Project = (typeof PROJECTS)[number]

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const p = project as any

  return (
    <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden hover:border-[#CD0E12]/30 transition-colors duration-200 flex flex-col hover:shadow-md">
      {/* Image - fixed aspect ratio, never collapses */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '65%', height: 0, overflow: 'hidden', backgroundColor: '#1A1A2E', flexShrink: 0 }}>
        {/* Fallback with project name */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)', zIndex: 0 }}>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '14px', fontFamily: 'var(--font-playfair, serif)', letterSpacing: '0.05em' }}>{project.name}</span>
        </div>

        {/* Real image */}
        {!imgError && p.cardImage && (
          <img
            src={p.cardImage}
            alt={project.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.5s ease', zIndex: 1, display: 'block' }}
          />
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2, flexWrap: 'wrap' }}>
          <span style={{ background: project.status === 'Ready to Move' ? 'rgba(45,122,79,0.9)' : 'rgba(205,14,18,0.9)', color: 'white', padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontFamily: 'var(--font-dm-sans, sans-serif)', fontWeight: 500, letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
            {project.status}
          </span>
          <span style={{ background: 'rgba(26,26,46,0.8)', color: 'rgba(255,255,255,0.9)', padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontFamily: 'var(--font-dm-sans, sans-serif)', letterSpacing: '0.05em', backdropFilter: 'blur(4px)' }}>
            {project.type}
          </span>
          {featured && (
            <span style={{ background: 'rgba(201,169,110,0.9)', color: 'white', padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontFamily: 'var(--font-dm-sans, sans-serif)', fontWeight: 500, backdropFilter: 'blur(4px)' }}>
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-1">{project.name}</h3>
        <p className="font-sans text-[#6B6B6B] text-sm mb-0.5">{project.location}</p>
        <p className="font-mono text-[10px] text-[#6B6B6B] mb-1">RERA: {project.rera}</p>
        <p className="font-sans text-[#6B6B6B] text-xs mb-3">{project.units}</p>
        <p className="font-sans text-[#4A4A5A] text-sm line-clamp-2 leading-relaxed flex-1 mb-4">{project.description}</p>

        <div className="mb-3">
          <p className="font-serif text-[#CD0E12] text-lg font-medium">{project.priceRange}</p>
          {p.priceDisclaimer && <p className="font-sans text-[9px] text-[#6B6B6B] mt-0.5">{p.priceDisclaimer}</p>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E8ECF0]">
          <span className="font-sans text-xs text-[#6B6B6B]">Possession: {project.possession}</span>
          <Link href={`/projects/${project.slug}`} className="font-sans text-sm font-medium text-[#CD0E12] hover:underline">View Details</Link>
        </div>
      </div>
    </div>
  )
}
