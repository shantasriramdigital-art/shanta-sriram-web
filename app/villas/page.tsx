import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import ProjectCard from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/data/projects'

export const metadata = {
  title: 'Villa Projects | Shanta Sriram Constructions',
  description: 'Exclusive villa communities in Hyderabad. Independent homes with private gardens and premium finishes.',
}

export default function VillasPage() {
  const villas = PROJECTS.filter((p) => p.type === 'Villas')

  return (
    <main>
      <Navbar />
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8 font-sans text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#CD0E12]">Home</Link>
            <span className="mx-2 text-[#CD0E12]">/</span>
            <span className="text-[#4A4A5A]">Villas</span>
          </nav>
          <SectionLabel className="mb-4">VILLA PROJECTS</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Exclusive Villa Communities</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">
            Independent homes designed for families who value space, privacy, and green living.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villas.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-12 bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-8 text-center">
            <p className="font-serif text-[#1A1A2E] text-xl mb-2">More villa projects coming soon</p>
            <p className="font-sans text-[#6B6B6B] text-sm">Register your interest and be the first to know about new villa launches.</p>
            <Link href="/contact" className="inline-block mt-4 font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
              Register Interest
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
