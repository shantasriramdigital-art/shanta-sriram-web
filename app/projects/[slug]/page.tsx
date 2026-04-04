import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data/projects';
import LeadForm from '@/components/ui/LeadForm';
import { ArrowLeft, MapPin, Home, DollarSign, Building2, Shield, Ruler } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionLabel from '@/components/ui/SectionLabel';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const AMENITY_GROUPS: Record<string, { label: string; items: string[] }> = {
  bodhivriksha: {
    label: '',
    items: [],
  },
};

function getAmenityGroups(project: (typeof PROJECTS)[number]) {
  if (project.slug === 'bodhivriksha') {
    return [
      {
        label: 'Clubhouse Facilities',
        items: [
          '2 Clubhouses (4-level)',
          'Swimming pool',
          'Gymnasium',
          'Badminton court',
          'Tennis court',
          'Home Theatre',
          'Yoga studio',
          'Aerobics',
          'Banquet Hall',
        ],
      },
      {
        label: 'Work & Community',
        items: [
          'Co-working spaces',
          'Tuition rooms',
          'Board room',
          'Guest suites',
          'Business centre',
          'Retail space',
        ],
      },
      {
        label: 'Outdoor & Wellness',
        items: [
          'Children park',
          'Meditation area',
          'Reflexology path',
          'Maze garden',
          'Mini amphitheatre',
        ],
      },
    ];
  }
  return [{ label: 'Amenities', items: project.amenities }];
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const amenityGroups = getAmenityGroups(project);
  const hasSpecs = 'specifications' in project && project.specifications;
  const hasUnitTypes = 'unitTypes' in project && project.unitTypes;
  const hasTowers = 'towers' in project && project.towers;
  const hasTagline = 'tagline' in project && project.tagline;
  const hasSize = 'size' in project && project.size;
  const hasCert = 'certification' in project && project.certification;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F8F4EF] to-[#F4F7FC] py-20 md:py-28 border-b border-[#E8ECF0]">
          <div className="max-w-[1200px] mx-auto px-6">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 font-sans text-xs text-[#6B6B6B]">
                <li><Link href="/" className="hover:text-[#CD0E12]">Home</Link></li>
                <li className="text-[#E8ECF0]">/</li>
                <li><Link href="/" className="hover:text-[#CD0E12]">Projects</Link></li>
                <li className="text-[#E8ECF0]">/</li>
                <li className="text-[#4A4A5A]">{project.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-sm ${
                    project.status === 'Ready to Move'
                      ? 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20'
                      : 'bg-[#F59E0B]/10 text-amber-800 border border-[#F59E0B]/20'
                  }`}>
                    {project.status}
                  </span>
                  {hasCert && (
                    <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-sm bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20">
                      {(project as any).certification}
                    </span>
                  )}
                </div>

                <h1 className="text-h1 font-serif text-[#1A1A2E] mb-2">{project.name}</h1>
                {hasTagline && (
                  <p className="font-serif text-[#C9A96E] text-xl italic mb-4">{(project as any).tagline}</p>
                )}

                <div className="flex items-center gap-2 text-[#4A4A5A] mb-6">
                  <MapPin size={16} className="text-[#CD0E12]" />
                  <span className="font-sans text-sm">{project.location}</span>
                </div>

                <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#inquiry-form"
                    className="text-sm font-sans font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors"
                  >
                    Request Information
                  </a>
                  <Link
                    href="/contact#site-visit"
                    className="text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  >
                    Book Site Visit
                  </Link>
                </div>
              </div>

              {/* Key details card */}
              <div className="bg-white border border-[#E8ECF0] rounded-md p-6">
                <h3 className="font-serif text-[#1A1A2E] text-xl mb-6">Project Details</h3>
                <div className="flex flex-col gap-0">
                  {[
                    { label: 'Type', value: project.type },
                    { label: 'Configuration', value: project.units },
                    ...(hasSize ? [{ label: 'Sizes', value: (project as any).size }] : []),
                    { label: 'Status', value: project.status },
                    { label: 'Possession', value: project.possession },
                    { label: 'Price', value: project.priceRange },
                    ...(hasTowers ? [{ label: 'Towers', value: (project as any).towers.join(', ') }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-3 border-b border-[#E8ECF0] last:border-0">
                      <span className="font-sans text-sm text-[#6B6B6B]">{label}</span>
                      <span className="font-sans text-sm font-medium text-[#1A1A2E] text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-[#E8ECF0]">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[#2E7D32]" />
                    <span className="font-sans text-xs text-[#6B6B6B]">TSRERA Registration</span>
                  </div>
                  <p className="font-mono text-sm text-[#1A1A2E] font-medium mt-1">{project.rera}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="bg-white py-20 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionLabel className="mb-4">KEY HIGHLIGHTS</SectionLabel>
            <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Why {project.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                  <div className="w-6 h-6 rounded-sm bg-[#CD0E12]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-sans text-xs font-medium text-[#CD0E12]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="font-sans text-sm text-[#4A4A5A] leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unit Types */}
        {hasUnitTypes && (
          <section className="bg-[#F4F7FC] py-20 md:py-24">
            <div className="max-w-[1200px] mx-auto px-6">
              <SectionLabel className="mb-4">FLOOR PLANS</SectionLabel>
              <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Unit Types & Sizes</h2>
              <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                      <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Configuration</th>
                      <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Super Built-Up Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(project as any).unitTypes.map((unit: { config: string; size: string }, i: number) => (
                      <tr key={i} className={`border-b border-[#E8ECF0] last:border-0 ${i % 2 === 1 ? 'bg-[#F8F4EF]/40' : ''}`}>
                        <td className="font-sans text-sm text-[#1A1A2E] font-medium px-6 py-4">{unit.config}</td>
                        <td className="font-sans text-sm text-[#4A4A5A] px-6 py-4">{unit.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Amenities */}
        <section className="bg-white py-20 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionLabel className="mb-4">AMENITIES</SectionLabel>
            <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">World-Class Living</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {amenityGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-4">{group.label}</h3>
                  <div className="flex flex-col gap-0">
                    {group.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E8ECF0] last:border-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0" />
                        <span className="font-sans text-sm text-[#4A4A5A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications */}
        {hasSpecs && (
          <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
              <SectionLabel className="!text-[#C9A96E] mb-4">SPECIFICATIONS</SectionLabel>
              <h2 className="text-h2 font-serif text-white mb-10">Build Quality</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.entries((project as any).specifications).map(([key, value]) => (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-md p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-white/40 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="font-sans text-sm text-white/80 leading-relaxed">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
              <div className="w-full h-full" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
              }} />
            </div>
          </section>
        )}

        {/* Nearby */}
        <section className="bg-[#F4F7FC] py-20 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <SectionLabel className="mb-4">LOCATION ADVANTAGE</SectionLabel>
            <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Neighbourhood</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(project.nearby).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-4">
                    {category === 'itParks' ? 'IT Parks' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="flex flex-col gap-0">
                    {(items as string[]).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E8ECF0] last:border-0">
                        <MapPin size={14} className="text-[#CD0E12] flex-shrink-0" />
                        <span className="font-sans text-sm text-[#4A4A5A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RERA Banner */}
        <section className="bg-[#F8F4EF] py-12 border-y border-[#E8ECF0]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-[#2E7D32]" />
                <div>
                  <p className="font-sans text-xs text-[#6B6B6B]">TSRERA Registration Number</p>
                  <p className="font-mono text-base text-[#1A1A2E] font-medium">{project.rera}</p>
                </div>
              </div>
              <Link
                href="https://rera.telangana.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium text-[#CD0E12] hover:underline"
              >
                Verify on TSRERA Portal
              </Link>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="bg-white py-20 md:py-24">
          <div className="max-w-[600px] mx-auto px-6">
            <SectionLabel className="mb-4">ENQUIRE NOW</SectionLabel>
            <h2 className="text-h2 font-serif text-[#1A1A2E] mb-2">Interested in {project.name}?</h2>
            <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-8">
              Fill out the form below and our team will reach out to you shortly.
            </p>
            <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-8">
              <LeadForm compact={false} title="" subtitle="" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
