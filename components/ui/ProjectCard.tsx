import Link from 'next/link'
import type { PROJECTS } from '@/lib/data/projects'

type Project = (typeof PROJECTS)[number]

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Ready to Move') {
    return (
      <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-sm bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20">
        {status}
      </span>
    )
  }
  return (
    <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-sm bg-[#F59E0B]/10 text-amber-800 border border-[#F59E0B]/20">
      {status}
    </span>
  )
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const p = project as any
  return (
    <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden hover:border-[#CD0E12]/30 transition-colors duration-200 flex flex-col hover:shadow-md">
      <div className="aspect-[4/3] bg-[#F8F4EF] flex items-center justify-center relative overflow-hidden">
        <span className="font-serif text-[#1A1A2E]/15 text-lg text-center px-4">{project.name}</span>
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-sm bg-[#F4F7FC] text-[#4A4A5A] border border-[#E8ECF0]">
            {project.type}
          </span>
          {featured && (
            <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-sm bg-[#C9A96E] text-white">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-1">{project.name}</h3>
        <p className="font-sans text-[#6B6B6B] text-sm mb-0.5">{project.location}</p>
        <p className="font-mono text-[10px] text-[#6B6B6B] mb-1">RERA: {project.rera}</p>
        <p className="font-sans text-[#6B6B6B] text-xs mb-3">{project.units}</p>
        <p className="font-sans text-[#4A4A5A] text-sm line-clamp-2 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <p className="font-serif text-[#CD0E12] text-lg font-medium">{project.priceRange}</p>
          {p.priceDisclaimer && (
            <p className="font-sans text-[9px] text-[#6B6B6B] mt-0.5">{p.priceDisclaimer}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E8ECF0]">
          <span className="font-sans text-xs text-[#6B6B6B]">Possession: {project.possession}</span>
          <Link
            href={`/projects/${project.slug}`}
            className="font-sans text-sm font-medium text-[#CD0E12] hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
