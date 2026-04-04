import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import ProjectCard from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/data/projects'

export const metadata = {
  title: 'Residential Projects | Shanta Sriram Constructions',
  description: 'Premium 1, 2, 3 and 4 BHK apartments across Hyderabad. RERA registered, IGBC certified.',
}

export default function ResidentialPage() {
  const residential = PROJECTS.filter((p) => p.type === 'Apartments')

  return (
    <main>
      <Navbar />
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8 font-sans text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#CD0E12]">Home</Link>
            <span className="mx-2 text-[#CD0E12]">/</span>
            <span className="text-[#4A4A5A]">Residential</span>
          </nav>
          <SectionLabel className="mb-4">RESIDENTIAL PROJECTS</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Premium Apartments Across Hyderabad</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">
            Thoughtfully designed apartments in Hyderabad's most promising corridors. Every project is RERA registered and delivered with uncompromising quality.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-sans text-xs text-[#6B6B6B] mb-8">Showing {residential.length} projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residential.map((project) => (
              <ProjectCard key={project.slug} project={project} featured={project.slug === 'bodhivriksha'} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
