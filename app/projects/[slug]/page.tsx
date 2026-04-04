import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data/projects';
import LeadForm from '@/components/ui/LeadForm';
import { MapPin, Shield, Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionLabel from '@/components/ui/SectionLabel';
import BrochureButton from '@/components/ui/BrochureButton';
import ProjectGallery from '@/components/ui/ProjectGallery';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getAmenityGroups(project: (typeof PROJECTS)[number]) {
  if (project.slug === 'bodhivriksha') {
    return [
      {
        label: 'Clubhouse Facilities',
        items: ['2 Clubhouses (4-level)', 'Swimming pool', 'Gymnasium', 'Badminton court', 'Tennis court', 'Home Theatre', 'Yoga studio', 'Aerobics', 'Banquet Hall'],
      },
      {
        label: 'Work & Community',
        items: ['Co-working spaces', 'Tuition rooms', 'Board room', 'Guest suites', 'Business centre', 'Retail space'],
      },
      {
        label: 'Outdoor & Wellness',
        items: ['Children park', 'Meditation area', 'Reflexology path', 'Maze garden', 'Mini amphitheatre'],
      },
    ];
  }
  if (project.slug === 'kalpavriksha') {
    return [
      {
        label: 'Community & Security',
        items: ['Gated community with 24hr security', 'Podium for every tower', 'Double height reception', 'Landscaped gardens', 'Natural water bodies', 'Jogging track'],
      },
      {
        label: 'Convenience & Retail',
        items: ['ATM on premises', 'Co-working space', 'Pharmacy', 'Milk booth', 'Supermarket'],
      },
      {
        label: 'Recreation & Wellness',
        items: ['Swimming pool', 'Gymnasium', 'Children play area', 'Conference hall', 'Juice bar and VR room', 'Two mini theatres', 'Meditation space'],
      },
    ];
  }
  return [{ label: 'Amenities', items: project.amenities }];
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const amenityGroups = getAmenityGroups(project);
  const p = project as any;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
        {/* Image Gallery */}
        {p.heroImages && (() => {
          const sections: { sectionLabel: string; heading: string; images: any[]; autoScrollInterval?: number; background?: string }[] = [];
          if (p.aerialImages?.length) sections.push({ sectionLabel: 'AERIAL VIEWS', heading: slug === 'kalpavriksha' ? '15.52 Acres of Thoughtful Planning' : 'Seen from Above', images: p.aerialImages, autoScrollInterval: 5000, background: 'bg-white' });
          if (p.towerImages?.length) sections.push({ sectionLabel: '10 TOWERS', heading: 'Every Tower. A World of Its Own.', images: p.towerImages, autoScrollInterval: 4000, background: 'bg-[#F8F4EF]' });
          if (p.landscapeImages?.length) sections.push({ sectionLabel: 'LANDSCAPE', heading: 'Where Nature Meets Architecture', images: p.landscapeImages, autoScrollInterval: 4000, background: 'bg-[#F8F4EF]' });
          if (p.podiumImages?.length) sections.push({ sectionLabel: 'PODIUM LIVING', heading: 'A Podium on Every Floor', images: p.podiumImages, autoScrollInterval: 4000, background: 'bg-white' });
          if (p.clubhouseImages?.length) sections.push({ sectionLabel: 'CLUBHOUSE', heading: 'Two World-Class Clubhouses', images: p.clubhouseImages, autoScrollInterval: 5000, background: 'bg-[#F8F4EF]' });
          if (p.amenityImages?.length) sections.push({ sectionLabel: 'AMENITIES', heading: slug === 'kalpavriksha' ? '40+ Amenities Across Every Tower' : 'Designed for Every Moment of Joy', images: p.amenityImages, autoScrollInterval: 3500, background: 'bg-white' });
          if (p.elevationImages?.length) sections.push({ sectionLabel: 'ELEVATIONS', heading: 'Three Towers. One Vision.', images: p.elevationImages, autoScrollInterval: 5000, background: 'bg-[#F8F4EF]' });
          return (
            <ProjectGallery
              heroImages={p.heroImages}
              sections={sections}
              projectName={project.name}
              location={project.location}
              rera={project.rera}
            />
          );
        })()}

        {/* Info Strip - for projects without gallery hero, show full hero; for projects with gallery, show compact strip */}
        {!p.heroImages && (
          <div style={{ position: 'relative', width: '100%', height: 'clamp(280px, 50vh, 500px)', overflow: 'hidden', backgroundColor: '#1A1A2E' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 4vw, 48px)' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <span style={{ display: 'inline-block', background: '#CD0E12', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>{project.status}</span>
                <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, color: 'white', lineHeight: 1.1, margin: '0 0 8px 0' }}>{project.name}</h1>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>{project.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Project Info Strip */}
        <section style={{ backgroundColor: 'white', borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="project-info-strip" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { label: 'Type', value: project.type },
              { label: 'RERA', value: project.rera },
              { label: 'Possession', value: project.possession },
              ...(p.siteArea ? [{ label: 'Site Area', value: p.siteArea }] : [{ label: 'Config', value: p.configuration || project.units }]),
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-tenor)', fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#1A1A2E', fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#F8F4EF] py-16 md:py-20">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div className="project-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
              {/* Main content */}
              <div>
                {p.tagline && <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '20px', fontStyle: 'italic', color: '#C9A96E', marginBottom: '16px' }}>{p.tagline}</p>}
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', color: '#4A4A5A', lineHeight: 1.8, marginBottom: '24px' }}>{project.description}</p>

                {/* Location Advantages */}
                {p.locationAdvantages && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ height: '1px', width: '16px', backgroundColor: '#CD0E12', display: 'block' }} />
                      <span style={{ fontFamily: 'var(--font-tenor)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CD0E12' }}>Location Advantages</span>
                      <span style={{ height: '1px', width: '16px', backgroundColor: '#CD0E12', display: 'block' }} />
                    </div>
                    <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '4px', paddingRight: '24px' }}>
                      {p.locationAdvantages.map((adv: { label: string; value: string }, i: number) => (
                        <div key={i} style={{ flexShrink: 0, minWidth: '90px', maxWidth: '130px', background: 'white', border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '10px 14px', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adv.label}</div>
                          <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '15px', color: '#1A1A2E', fontWeight: 400 }}>{adv.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px', fontWeight: 500, color: '#CD0E12', margin: 0 }}>{project.priceRange}</p>
                  {p.priceDisclaimer && <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#888', marginTop: '4px' }}>{p.priceDisclaimer}</p>}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="#inquiry-form" className="text-sm font-sans font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
                    Request Information
                  </a>
                  <Link href="/site-visit" className="text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors">
                    Book Site Visit
                  </Link>
                  {slug === 'bodhivriksha' && (
                    <BrochureButton
                      projectName="The Bodhivriksha"
                      brochureUrl="https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/PDFS/BODHIVRIKSHA%20FOR%20WHATSAPP.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQREZTL0JPREhJVlJJS1NIQSBGT1IgV0hBVFNBUFAucGRmIiwiaWF0IjoxNzc1MzI5ODU4LCJleHAiOjMxNzEzNTMyOTg1OH0.RoB_ZtL3jpu31kYib5CmjX3Q6tJ9ghiynAsOot4erUI"
                      supabaseSource="brochure-download-bodhivriksha"
                    />
                  )}
                  {slug === 'kalpavriksha' && (
                    <BrochureButton
                      label="Download Floor Plans"
                      projectName="The Kalpavriksha"
                      brochureUrl="https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/PDFS/Kalpavriksha%20Floor%20Plans%20(4).pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQREZTL0thbHBhdnJpa3NoYSBGbG9vciBQbGFucyAoNCkucGRmIiwiaWF0IjoxNzc1MzMwMjMzLCJleHAiOjMzMzExMzMwMjMzfQ.gCKq5mNG_cQavKwfKtbWZEWMtYVcvjTFGIKWFFuSduI"
                      supabaseSource="brochure-download-kalpavriksha"
                      heading="Get the Kalpavriksha Floor Plans"
                      subheading="Enter your details and we will send you the complete floor plans instantly"
                    />
                  )}
                  <Link href="/payment-plans" className="text-sm font-sans font-medium text-[#6B6B6B] hover:text-[#CD0E12] transition-colors py-3">
                    View Payment Plans
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="project-sidebar" style={{ position: 'sticky', top: '88px' }}>
                <div style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', fontWeight: 500, color: '#1A1A2E', marginBottom: '20px' }}>Project Details</h3>
                  {[
                    { label: 'Configuration', value: p.configuration || project.units },
                    ...(p.size ? [{ label: 'Sizes', value: p.size }] : []),
                    ...(p.blocks ? [{ label: 'Blocks', value: p.blocks }] : []),
                    ...(p.towers ? [{ label: 'Towers', value: p.towers.join(', ') }] : []),
                    { label: 'Status', value: project.status },
                    { label: 'Possession', value: project.possession },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#888' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#1A1A2E', fontWeight: 500, textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Shield size={14} style={{ color: '#2E7D32' }} />
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#888' }}>TSRERA Registration</span>
                    </div>
                    <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#1A1A2E', fontWeight: 500, margin: 0 }}>{project.rera}</p>
                  </div>
                  {p.contact && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
                      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#888', marginBottom: '4px' }}>Sales Enquiry</p>
                      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#1A1A2E', fontWeight: 500, margin: 0 }}>{p.contact}</p>
                    </div>
                  )}
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
        {p.unitTypes && (
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
                    {p.unitTypes.map((unit: { config: string; size: string }, i: number) => (
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
        {p.specifications && (
          <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
              <SectionLabel className="!text-[#C9A96E] mb-4">SPECIFICATIONS</SectionLabel>
              <h2 className="text-h2 font-serif text-white mb-10">Build Quality</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Object.entries(p.specifications).map(([key, value]) => (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-md p-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-white/40 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                    <p className="font-sans text-sm text-white/80 leading-relaxed">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
              <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)' }} />
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

        {/* Pricing Structure (Bodhivriksha) */}
        {p.basicPrice && p.additionalCharges && (
          <section className="bg-white py-20 md:py-24">
            <div className="max-w-[1200px] mx-auto px-6">
              <SectionLabel className="mb-4">PRICING</SectionLabel>
              <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4">{project.name} Pricing Structure</h2>
              <div className="mb-10">
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-2">Basic Price</p>
                <p className="font-serif text-[#CD0E12] text-3xl md:text-4xl font-bold">{p.basicPrice}</p>
              </div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-4">Additional Charges</h3>
              <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                        <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Item</th>
                        <th className="text-right font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.additionalCharges.map((charge: { item: string; rate: string }, i: number) => (
                        <tr key={i} className={`border-b border-[#E8ECF0] last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F4EF]/40'}`}>
                          <td className="font-sans text-sm text-[#4A4A5A] px-6 py-4">{charge.item}</td>
                          <td className="font-sans text-sm font-medium text-[#1A1A2E] px-6 py-4 text-right whitespace-nowrap">{charge.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="font-sans text-[10px] text-[#6B6B6B] mt-4 leading-relaxed">
                All prices are subject to change without prior notice. Contact our sales team for current pricing.
              </p>
            </div>
          </section>
        )}

        {/* Payment Schedule (Bodhivriksha) */}
        {p.paymentSchedule && (
          <section className="bg-[#F4F7FC] py-20 md:py-24">
            <div className="max-w-[1200px] mx-auto px-6">
              <SectionLabel className="mb-4">PAYMENT SCHEDULE</SectionLabel>
              <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Construction Linked Payment Plan</h2>
              <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden max-w-3xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                        <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4 w-10">#</th>
                        <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Stage</th>
                        <th className="text-right font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.paymentSchedule.map((row: { stage: string; amount: string }, i: number) => (
                        <tr key={i} className={`border-b border-[#E8ECF0] last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F4EF]/40'}`}>
                          <td className="font-sans text-xs text-[#6B6B6B] px-6 py-4">{String(i + 1).padStart(2, '0')}</td>
                          <td className="font-sans text-sm text-[#4A4A5A] px-6 py-4">{row.stage}</td>
                          <td className="font-sans text-sm font-medium text-[#1A1A2E] px-6 py-4 text-right whitespace-nowrap">{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {p.pricingNotes && p.pricingNotes.length > 0 && (
                <div className="mt-8 max-w-3xl">
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-4">Important Notes</h3>
                  <div className="flex flex-col gap-2">
                    {p.pricingNotes.map((note: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0 mt-2" />
                        <p className="font-sans text-xs text-[#4A4A5A] leading-relaxed">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
                  Get a Detailed Cost Sheet
                </Link>
                {p.contactForPricing && (
                  <p className="font-sans text-sm text-[#6B6B6B]">For more details: <span className="text-[#1A1A2E] font-medium">{p.contactForPricing}</span></p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Notes (Kalpavriksha and others without paymentSchedule) */}
        {p.pricingNotes && p.pricingNotes.length > 0 && !p.paymentSchedule && (
          <section className="bg-[#F8F4EF] py-20 md:py-24">
            <div className="max-w-[1200px] mx-auto px-6">
              <SectionLabel className="mb-4">PRICING INFORMATION</SectionLabel>
              <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Additional Charges</h2>
              <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden">
                {p.pricingNotes.map((note: string, i: number) => (
                  <div key={i} className={`flex items-start gap-3 px-6 py-4 border-b border-[#E8ECF0] last:border-0 ${i % 2 === 1 ? 'bg-[#F8F4EF]/40' : ''}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0 mt-2" />
                    <p className="font-sans text-sm text-[#4A4A5A]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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
              <Link href="https://rera.telangana.gov.in/" target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-medium text-[#CD0E12] hover:underline">
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
            <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-8">Fill out the form below and our team will reach out to you shortly.</p>
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
