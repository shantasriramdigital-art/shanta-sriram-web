'use client'

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import ProjectCard from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/data/projects'

const FILTERS = ['All', 'Apartments', 'Villas', 'Commercial']

interface ProjectsGridProps {
  filteredProjects?: typeof PROJECTS
}

export default function ProjectsGrid({ filteredProjects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  const displayProjects = filteredProjects ?? (
    activeFilter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.type === activeFilter)
  )

  return (
    <section id="projects-grid" className="bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionLabel className="mb-4">LATEST PROPERTIES</SectionLabel>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] text-balance font-bold">Our Ongoing Projects</h2>

          {/* Filter tabs */}
          {!filteredProjects && (
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs font-sans font-medium px-4 py-2 rounded border transition-colors ${
                    activeFilter === f
                      ? 'bg-[#1A1A2E] text-white border-[#1A1A2E]'
                      : 'bg-white text-[#4A4A5A] border-[#E8ECF0] hover:border-[#1A1A2E]/40'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="font-sans text-xs text-[#6B6B6B] mb-8">
          Showing {displayProjects.length} project{displayProjects.length !== 1 ? 's' : ''}
        </p>

        {displayProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-[#6B6B6B] text-sm">No projects match your criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} featured={project.slug === 'bodhivriksha'} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
