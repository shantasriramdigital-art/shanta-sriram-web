import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import {
  TRUST_STATS,
  GOVERNANCE_PILLARS,
  RERA_PROJECTS,
  CERTIFICATIONS,
  FINANCIAL_DISCIPLINE,
  DELIVERY_STATS,
  ETHICAL_QUOTE,
} from '@/lib/data/trust'
import { PROJECTS } from '@/lib/data/projects'

export const metadata = {
  title: 'Trust & Governance | Shanta Sriram Constructions',
  description: 'Transparency that builds confidence. 95% on-time delivery, 50+ RERA registered projects, zero abandoned projects.',
}

export default function TrustPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-xs text-[#6B6B6B]">
              <li><Link href="/" className="hover:text-[#CD0E12]">Home</Link></li>
              <li className="text-[#E8ECF0]">/</li>
              <li className="text-[#4A4A5A]">Trust</li>
            </ol>
          </nav>
          <SectionLabel className="mb-4">TRUST & GOVERNANCE</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 text-balance max-w-2xl">
            Transparency That Builds Confidence
          </h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">
            Our commitment to governance, compliance, and transparency has earned us the trust of over 8,000 families across three decades.
          </p>
        </div>
      </section>

      {/* Headline Stats */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">BY THE NUMBERS</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {TRUST_STATS.map((stat, i) => (
              <div key={i} className="bg-white border border-[#E8ECF0] rounded-md p-8 text-center">
                <div className="font-serif text-[#1A1A2E] mb-3" style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1 }}>
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-sans text-[#1A1A2E] text-sm font-medium mb-1">{stat.label}</p>
                <p className="font-sans text-[#6B6B6B] text-xs">{stat.benchmark}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Framework */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">GOVERNANCE FRAMEWORK</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4 text-balance">Our Trust Architecture</h2>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-12 max-w-xl">
            A comprehensive framework that ensures accountability, transparency, and ethical conduct at every level.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GOVERNANCE_PILLARS.map((pillar) => (
              <div key={pillar.title} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-6">
                <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-3">{pillar.title}</h3>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-4">{pillar.desc}</p>
                <span className="inline-block font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#1A1A2E] bg-[#F4F7FC] border border-[#E8ECF0] px-3 py-1.5 rounded-sm">
                  {pillar.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RERA Dashboard */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">RERA DASHBOARD</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4 text-balance">Project Registration Status</h2>
          <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-8">
            Verify any project registration directly on the TSRERA Portal.
          </p>
          <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                    <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Project Name</th>
                    <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Location</th>
                    <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">RERA Number</th>
                    <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RERA_PROJECTS.map((project, i) => (
                    <tr key={project.reraNo} className={`border-b border-[#E8ECF0] last:border-0 ${i % 2 === 1 ? 'bg-[#F8F4EF]/40' : ''}`}>
                      <td className="font-sans text-sm text-[#1A1A2E] font-medium px-6 py-4">{project.name}</td>
                      <td className="font-sans text-sm text-[#4A4A5A] px-6 py-4">{project.location}</td>
                      <td className="font-mono text-xs text-[#6B6B6B] px-6 py-4">{project.reraNo}</td>
                      <td className="px-6 py-4">
                        {project.status === 'Registered' ? (
                          <span className="font-sans text-xs font-medium text-[#2E7D32]">{project.status}</span>
                        ) : (
                          <span className="font-sans text-xs font-medium text-amber-700">{project.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5">
            <Link
              href="https://rera.telangana.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#CD0E12] hover:underline"
            >
              Verify on TSRERA Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">CERTIFICATIONS</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4 text-balance">Quality Assurance</h2>
          <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-12 max-w-xl">
            Independent certifications that validate our commitment to quality and sustainability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="bg-[#F4F7FC] border border-[#E8ECF0] rounded-md p-6 text-center">
                <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-2">{cert.name}</h3>
                <p className="font-sans text-[#4A4A5A] text-sm mb-2">{cert.desc}</p>
                <p className="font-sans text-[#6B6B6B] text-xs">{cert.since}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Discipline - dark navy */}
      <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <SectionLabel className="!text-[#C9A96E] mb-4">CAPITAL DISCIPLINE</SectionLabel>
          <h2 className="text-h2 font-serif text-white mb-4 text-balance">Conservative Financial Management</h2>
          <p className="font-sans text-white/65 text-base leading-relaxed mb-12 max-w-2xl">
            Our financial discipline ensures that every project is fully funded before launch. We do not rely on speculative capital or excessive debt.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-0">
              {FINANCIAL_DISCIPLINE.map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0">
                  <div className="w-0.5 bg-[#CD0E12] self-stretch flex-shrink-0 rounded-full" style={{ minHeight: '20px' }} />
                  <p className="font-sans text-white/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-serif text-white text-xl mb-4">Delivery Commitment</h3>
              <p className="font-sans text-white/65 text-sm leading-relaxed mb-8">
                95% of our projects have been delivered on or before the committed timeline. This track record reflects our conservative planning and disciplined execution.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {DELIVERY_STATS.map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-md p-5">
                    <div className="font-serif text-white text-3xl font-medium mb-1">{stat.value}</div>
                    <div className="font-sans text-white/50 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
          }} />
        </div>
      </section>

      {/* Ethical Commitment */}
      <section className="bg-[#F8F4EF] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-10">OUR COMMITMENT</SectionLabel>
          <div className="max-w-2xl mx-auto">
            <div className="border-t border-[#C9A96E] pt-8 pb-8 border-b">
              <div className="font-serif text-[#C9A96E] select-none mb-4" style={{ fontSize: '72px', lineHeight: 1 }}>&ldquo;</div>
              <p className="font-serif text-[#1A1A2E] italic leading-relaxed mb-6" style={{ fontSize: '24px', lineHeight: 1.5 }}>
                {ETHICAL_QUOTE.text}
              </p>
              <p className="font-sans text-[#6B6B6B] text-sm">- {ETHICAL_QUOTE.author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Experiences */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">PROJECT EXPERIENCES</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4 text-balance">The Communities We Have Built</h2>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-12 max-w-xl">
            Every project tells a story of a community formed, a promise kept, and a legacy created.
          </p>

          {/* Ongoing projects */}
          <div className="mb-8">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-5">Ongoing Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <div key={p.slug} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-[#1A1A2E] text-lg font-medium">{p.name}</h3>
                    <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-sm flex-shrink-0 ${p.status === 'Ready to Move' ? 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20' : 'bg-[#F59E0B]/10 text-amber-800 border border-[#F59E0B]/20'}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="font-sans text-[#6B6B6B] text-xs mb-1">{p.location}</p>
                  <p className="font-sans text-[#6B6B6B] text-xs mb-3">{p.type} · {p.units}</p>
                  <p className="font-sans text-[#4A4A5A] text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] text-[#6B6B6B]">TSRERA Registered</span>
                    <Link href={`/projects/${p.slug}`} className="font-sans text-xs font-medium text-[#CD0E12] hover:underline">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed portfolio */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-5">Completed Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {RERA_PROJECTS.map((p) => (
                <div key={p.reraNo} className="bg-[#F4F7FC] border border-[#E8ECF0] rounded-md p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-[#1A1A2E] text-lg font-medium">{p.name}</h3>
                    <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-sm flex-shrink-0 ${p.status === 'Registered' ? 'bg-[#1A4B8C]/10 text-[#1A4B8C] border border-[#1A4B8C]/20' : 'bg-[#F59E0B]/10 text-amber-800 border border-[#F59E0B]/20'}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="font-sans text-[#6B6B6B] text-xs mb-1">{p.location}</p>
                  <p className="font-mono text-[10px] text-[#6B6B6B]">RERA: {p.reraNo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
