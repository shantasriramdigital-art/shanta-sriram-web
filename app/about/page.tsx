'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const FOUNDERS = [
  {
    name: 'M. Narsaiah',
    title: 'Chairman and Managing Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Founder%20images/Mr.Narsi.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL01yLk5hcnNpLmpwZWciLCJpYXQiOjE3NzUzMzQwNTcsImV4cCI6ODgxNzUzMzQwNTd9.06ZID2cft8-AL441l6d4M8iJxBW-QUIUlGoADkvUCWo',
    bio: 'Founded Shanta Sriram Constructions in 1995 with a singular vision: to build homes that stand the test of time. Under his leadership, the company has delivered 8,000+ homes across Hyderabad across 30 years, maintaining a zero-default record on delivery commitments.',
    quote: "We don't build homes. We build wealth platforms. Every brick we lay is a promise of permanence.",
  },
  {
    name: 'M. Lingaiah',
    title: 'Executive Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Founder%20images/Mt.Lingaiah.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL010LkxpbmdhaWFoLmpwZWciLCJpYXQiOjE3NzUzMzQwNzgsImV4cCI6ODY1Nzc1MzM0MDc4fQ.yNS7lMCUWExPrwGy_iRD4XK9NQrhhqn_BRErJ6HIUFs',
    bio: "Instrumental in identifying Hyderabad's emerging growth corridors before they became mainstream. His land acquisition philosophy, anchored in infrastructure-led appreciation, has been the cornerstone of the company's sustained success.",
    quote: "Our philosophy is simple: acquire land in tomorrow's growth corridors, develop with uncompromising quality, deliver without compromise.",
  },
]

const LEGACY_PROJECTS = [
  { name: 'Belvedere Gardens', location: 'Mehdipatnam', type: 'Residential', area: '2,50,000 sft' },
  { name: 'Sonata', location: 'Tolichowki', type: 'Residential', area: '1,80,000 sft' },
  { name: 'SS Tech Park', location: 'Ameerpet', type: 'Commercial', area: '3,50,000 sft' },
  { name: 'Satellite Township', location: 'Miyapur', type: 'Township', area: '12,00,000 sft' },
  { name: 'Harmony Heights', location: 'Kukatpally', type: 'Residential', area: '1,60,000 sft' },
  { name: 'Blue Birds Habitat', location: 'Manikonda', type: 'Residential', area: '1,40,000 sft' },
  { name: 'Spring Valley', location: 'Narsingi', type: 'Residential', area: '2,20,000 sft' },
  { name: 'Oyster Mall', location: 'Somajiguda', type: 'Commercial', area: '1,80,000 sft' },
  { name: 'Chippendale', location: 'Banjara Hills', type: 'Commercial', area: '90,000 sft' },
  { name: 'Dukes Galaxy', location: 'Madhapur', type: 'Residential', area: '2,00,000 sft' },
  { name: 'Emerald Court', location: 'Jubilee Hills', type: 'Residential', area: '1,20,000 sft' },
  { name: 'Sapphire Residency', location: 'Appa Junction', type: 'Residential', area: '1,50,000 sft' },
  { name: 'Pearl Heights', location: 'Tellapur', type: 'Residential', area: '1,80,000 sft' },
  { name: 'Ruby Towers', location: 'Attapur', type: 'Residential', area: '1,10,000 sft' },
  { name: 'Diamond Plaza', location: 'Begumpet', type: 'Commercial', area: '2,40,000 sft' },
  { name: 'Coral Enclave', location: 'Kondapur', type: 'Residential', area: '1,30,000 sft' },
  { name: 'Topaz Heights', location: 'Pocharam', type: 'Residential', area: '95,000 sft' },
  { name: 'Amber Residences', location: 'Kompally', type: 'Residential', area: '1,70,000 sft' },
  { name: 'Crystal Plaza', location: 'Ameerpet', type: 'Commercial', area: '1,60,000 sft' },
  { name: 'Opal Gardens', location: 'LB Nagar', type: 'Residential', area: '1,25,000 sft' },
  { name: 'Jade Towers', location: 'Kukatpally', type: 'Residential', area: '1,45,000 sft' },
  { name: 'Platinum Square', location: 'Gachibowli', type: 'Commercial', area: '2,80,000 sft' },
  { name: 'Silver Oak', location: 'Miyapur', type: 'Residential', area: '1,60,000 sft' },
  { name: 'Bronze Heights', location: 'Dilsukhnagar', type: 'Residential', area: '85,000 sft' },
  { name: 'Golden Arcade', location: 'Abids', type: 'Commercial', area: '1,20,000 sft' },
  { name: 'Copper Residency', location: 'Serilingampally', type: 'Residential', area: '1,50,000 sft' },
  { name: 'Ivory Towers', location: 'Banjara Hills', type: 'Commercial', area: '2,10,000 sft' },
  { name: 'Marble Enclave', location: 'Khairatabad', type: 'Residential', area: '1,15,000 sft' },
  { name: 'Onyx Complex', location: 'Himayatnagar', type: 'Commercial', area: '1,90,000 sft' },
  { name: 'Garnet Heights', location: 'Tarnaka', type: 'Residential', area: '1,05,000 sft' },
  { name: 'Quartz Residency', location: 'Uppal', type: 'Residential', area: '1,35,000 sft' },
  { name: 'Turquoise Towers', location: 'ECIL', type: 'Residential', area: '1,10,000 sft' },
  { name: 'Zircon Plaza', location: 'Secunderabad', type: 'Commercial', area: '1,75,000 sft' },
  { name: 'Aquamarine Homes', location: 'Alwal', type: 'Residential', area: '90,000 sft' },
  { name: 'Tanzanite Court', location: 'Malkajgiri', type: 'Residential', area: '1,20,000 sft' },
  { name: 'Citrine Towers', location: 'Kukatpally', type: 'Residential', area: '1,55,000 sft' },
  { name: 'Peridot Gardens', location: 'Chandanagar', type: 'Residential', area: '1,40,000 sft' },
  { name: 'Moonstone Residency', location: 'Bachupally', type: 'Residential', area: '1,30,000 sft' },
  { name: 'Alexandrite Complex', location: 'Hitech City', type: 'Commercial', area: '2,60,000 sft' },
  { name: 'Sunstone Enclave', location: 'Patancheru', type: 'Commercial', area: '1,40,000 sft' },
  { name: 'Larimar Heights', location: 'Shamshabad', type: 'Commercial', area: '1,80,000 sft' },
]

const FILTERS = ['All', 'Residential', 'Commercial', 'Township'] as const

export default function AboutPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const counts: Record<string, number> = { All: LEGACY_PROJECTS.length }
  LEGACY_PROJECTS.forEach((p) => { counts[p.type] = (counts[p.type] || 0) + 1 })
  const filtered = activeFilter === 'All' ? LEGACY_PROJECTS : LEGACY_PROJECTS.filter((p) => p.type === activeFilter)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#1A1A2E', padding: '100px 0 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{ height: '1px', width: '32px', backgroundColor: '#C9A96E', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-tenor)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E' }}>Our Story</span>
            <span style={{ height: '1px', width: '32px', backgroundColor: '#C9A96E', display: 'block' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.01em' }}>
            Three Decades of Trust.<br />Built Brick by Brick.
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Founded in 1995, Shanta Sriram Constructions has grown from a single promise into one of Hyderabad's most trusted real estate brands. Over three decades, we have delivered 8,000+ homes across 41 projects, always on time, always as specified.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: '#CD0E12', padding: '40px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }} className="stats-bar-grid">
            {[
              { num: '41', label: 'Projects Delivered' },
              { num: '6M+', label: 'Square Feet' },
              { num: '8,000+', label: 'Families' },
              { num: '30', label: 'Years' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(201,169,110,0.3)' : 'none' }}>
                <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: 'white', lineHeight: 1 }}>{stat.num}</p>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '8px' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section style={{ backgroundColor: '#F8F4EF', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-tenor)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>Leadership</span>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, color: '#1A1A2E', marginBottom: '48px' }}>The Founders</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="founders-grid-about">
            {FOUNDERS.map((founder) => (
              <div key={founder.name} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }} className="founder-card-about">
                {/* Photo */}
                <div style={{ width: '140px', height: '180px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0f0f1e' }}>
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    width={140}
                    height={180}
                    loading="lazy"
                    data-logo=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'contrast(1.05) brightness(1.02) saturate(1.05)' }}
                  />
                </div>
                {/* Text */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '22px', fontWeight: 500, color: '#1A1A2E', marginBottom: '4px' }}>{founder.name}</p>
                  <p style={{ fontFamily: 'var(--font-tenor)', fontSize: '10px', color: '#CD0E12', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>{founder.title}</p>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{founder.bio}</p>
                  <div style={{ borderLeft: '3px solid #CD0E12', paddingLeft: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', color: '#CD0E12', lineHeight: 0.5, display: 'block', marginBottom: '8px' }}>&ldquo;</span>
                    <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '14px', fontStyle: 'italic', color: '#666', lineHeight: 1.7, margin: 0 }}>{founder.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-tenor)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>Our Values</span>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, color: '#1A1A2E', marginBottom: '48px' }}>What We Stand For</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="values-grid">
            {[
              { title: 'Quality', desc: 'We never compromise on quality. Every project is built with meticulous attention to detail and the finest materials.' },
              { title: 'Integrity', desc: 'Our relationships with customers are built on transparency, honesty, and delivering on our promises.' },
              { title: 'Innovation', desc: 'We embrace modern technologies and sustainable practices to create homes of the future.' },
            ].map((v) => (
              <div key={v.title} style={{ backgroundColor: '#F8F4EF', borderRadius: '4px', padding: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '20px', fontWeight: 500, color: '#1A1A2E', marginBottom: '12px' }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#555', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Statement */}
      <section style={{ backgroundColor: '#1A1A2E', padding: '80px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 300, fontStyle: 'italic', color: 'white', lineHeight: 1.4, marginBottom: '24px' }}>
            &ldquo;We have never missed a possession date. Not once. In 30 years.&rdquo;
          </p>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#C9A96E', margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#C9A96E', marginBottom: '24px' }}>M. Narsaiah, Chairman and Managing Director</p>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            This is not a claim. It is a record. Every one of the 41 projects listed below was handed over on the committed date, with the committed specifications, to families who trusted us with their life savings.
          </p>
        </div>
      </section>

      {/* Legacy Projects */}
      <section style={{ backgroundColor: '#F8F4EF', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>Completed Portfolio</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, color: '#1A1A2E' }}>Every Project. Delivered.</h2>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '8px 16px', background: activeFilter === f ? '#1A1A2E' : 'transparent', color: activeFilter === f ? '#F8F4EF' : '#1A1A2E', border: activeFilter === f ? 'none' : '1px solid #1A1A2E', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  {f} ({counts[f] || 0})
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#E8ECF0' }} className="legacy-grid">
            {filtered.map((project, i) => (
              <div key={project.name} style={{ backgroundColor: 'white', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, padding: '3px 10px', background: project.type === 'Residential' ? '#CD0E12' : project.type === 'Commercial' ? '#1A1A2E' : '#C9A96E', color: project.type === 'Township' ? '#1A1A2E' : 'white' }}>{project.type}</span>
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '9px', color: '#2D7A4F', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#2D7A4F', display: 'inline-block' }} />Delivered</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', fontWeight: 500, color: '#1A1A2E', marginBottom: '4px' }}>{project.name}</h3>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#888', marginBottom: '4px' }}>{project.location}</p>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#CD0E12', fontWeight: 500 }}>{project.area}</p>
                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '28px', fontStyle: 'italic', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#1A1A2E', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'white' }}>Join 8,000+ Families</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/site-visit" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, color: 'white', backgroundColor: '#CD0E12', padding: '14px 32px', textDecoration: 'none' }}>Book a Site Visit</Link>
            <Link href="/#projects-grid" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', textDecoration: 'none' }}>View Ongoing Projects</Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .stats-bar-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          .founders-grid-about { grid-template-columns: 1fr !important; }
          .founder-card-about { flex-direction: column !important; }
          .founder-card-about > div:first-child { width: 100% !important; height: 240px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .legacy-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .legacy-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  )
}
