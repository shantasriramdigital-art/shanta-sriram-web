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
    bio: 'Founded Shanta Sriram Constructions in 1995 with a singular vision: to build homes that stand the test of time. Under his leadership, the company has delivered 8,000+ homes across Hyderabad across 31 years, maintaining a zero-default record on delivery commitments.',
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
  { name: 'Belvedere Gardens Phase I and II', location: 'Padmarao Nagar, Secunderabad', type: 'Residential', area: '3,00,000 sft', units: '60 units', year: '2000-2004', image: null },
  { name: 'Aspen', location: 'Tarnaka, Secunderabad', type: 'Residential', area: '3,00,000 sft', units: '55 units', year: '2001-2005', image: null },
  { name: 'Studio Sycamore', location: 'Road No. 4, Banjara Hills', type: 'Residential', area: '1,25,000 sft', units: '20 units', year: '1999-2003', image: null },
  { name: 'Chippendale', location: 'Musheerabad, Hyderabad', type: 'Residential', area: '3,00,000 sft', units: '60 units', year: '2010-2014', image: null },
  { name: 'Satellite Township Blocks A to F', location: 'Petbasheerabad, Hyderabad', type: 'Township', area: '8,00,000 sft', units: '120 units', year: '1996-2016', image: null },
  { name: 'Harmony Heights', location: 'Namal Gundu, Secunderabad', type: 'Residential', area: '2,25,000 sft', units: '180 units', year: '2012-2017', image: null },
  { name: 'Padmanabha Residency', location: 'Padmarao Nagar, Secunderabad', type: 'Residential', area: '1,20,000 sft', units: '80 units', year: '2014-2018', image: null },
  { name: 'Amity Ville', location: 'Tarnaka, Secunderabad', type: 'Residential', area: '43,470 sft', units: '15 units', year: '2016-2019', image: null },
  { name: 'Blue Birds Habitat', location: 'Yousufguda, Hyderabad', type: 'Residential', area: '1,36,310 sft', units: '65 units', year: '2016-2022', image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/Blue%20Birds%20Habitat%20Yousufguda.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvQmx1ZSBCaXJkcyBIYWJpdGF0IFlvdXN1Zmd1ZGEuanBnIiwiaWF0IjoxNzc1MzY4NDM4LCJleHAiOjEwNDE1MzY4NDM4fQ.jLWBOxmBfVD8COpuOFAi7f2q6pLBE_oeZhDl7NVTlDM' },
  { name: 'Chalet Meadows', location: 'Musheerabad, Hyderabad', type: 'Residential', area: '1,25,840 sft', units: '60 units', year: '2019-2023', image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/Chalet%20Meaodws%20Musheerabad.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvQ2hhbGV0IE1lYW9kd3MgTXVzaGVlcmFiYWQuanBnIiwiaWF0IjoxNzc1MzY4NTI5LCJleHAiOjEwNDE1MzY4NTI5fQ.AcpOHCunhfDlADU9Y6nbwbP4ts58n_VIRErRffs0v8w' },
  { name: 'Spring Valley', location: 'Manikonda, Hyderabad', type: 'Villas', area: '1,96,845 sft', units: '36 villas', year: '2020-2023', image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/Entrance%20Gate%20Day%20View%20Spring%20Valley%20Manikonda.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvRW50cmFuY2UgR2F0ZSBEYXkgVmlldyBTcHJpbmcgVmFsbGV5IE1hbmlrb25kYS5qcGciLCJpYXQiOjE3NzUzNjg1OTYsImV4cCI6ODY1Nzc1MzY4NTk2fQ.uqhwIZPQcUf9a0YPRvR9csDII3RmtxxYfZoKkI84Yt0' },
  { name: 'Duke Galaxy', location: 'Road No. 13, Banjara Hills', type: 'Residential', area: null, units: '66 units', year: null, image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/Galaxy%20Road%20no%2013%20Banjara%20Hills.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvR2FsYXh5IFJvYWQgbm8gMTMgQmFuamFyYSBIaWxscy5qcGciLCJpYXQiOjE3NzUzNjg2MDMsImV4cCI6ODgxNzUzNjg2MDN9.tKUEDKBvr6y1kL6-INNCtYtoln-1sR_zwk39yIhYF1s' },
  { name: 'SS Tech Park', location: 'Gachibowli, Hyderabad', type: 'Commercial', area: '2,30,000 sft', units: '2 blocks', year: '2018-2022', image: null },
  { name: 'Oyster Mall', location: 'Begumpet, Secunderabad', type: 'Commercial', area: '1,38,600 sft', units: null, year: '2005-2008', image: null },
  { name: 'Lakshmi Palace (Neerus Emporium)', location: 'Road No. 36, Jubilee Hills', type: 'Commercial', area: '86,000 sft', units: null, year: '2001-2006', image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/NBR%20@%20Road.no.36,%20Jubilee%20Hills.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvTkJSIEAgUm9hZC5uby4zNiwgSnViaWxlZSBIaWxscy5qcGciLCJpYXQiOjE3NzUzNjg2MTksImV4cCI6ODgxNzUzNjg2MTl9.JFdXKux8kYnhBsVUo2huGuGx4n0qJ1BOGOJISbp33CM' },
  { name: 'Ozone', location: 'Panjagutta, Hyderabad', type: 'Commercial', area: '75,000 sft', units: null, year: '1999-2003', image: null },
  { name: 'Solitaire', location: 'Road No. 36, Jubilee Hills', type: 'Commercial', area: '43,000 sft', units: null, year: '1998-2000', image: null },
  { name: 'Blue Moon', location: 'Somajiguda, Hyderabad', type: 'Commercial', area: '64,810 sft', units: null, year: '1999-2023', image: null },
  { name: 'Silver Square', location: 'Road No. 36, Jubilee Hills', type: 'Commercial', area: '33,000 sft', units: null, year: '1999-2001', image: null },
  { name: 'Jagadish Mall', location: 'Road No. 36, Jubilee Hills', type: 'Commercial', area: '81,400 sft', units: null, year: '2011-2015', image: null },
  { name: 'Odeon Mall', location: 'RTC X Roads, Hyderabad', type: 'Commercial', area: '80,620 sft', units: null, year: '2020-2026', image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/Odean%20Mall%20RTC%20X%20Roads.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvT2RlYW4gTWFsbCBSVEMgWCBSb2Fkcy5qcGciLCJpYXQiOjE3NzUzNjg2MzAsImV4cCI6ODgxNzUzNjg2MzB9.Q5Lgod-RIOzlLbDjvy8vqY4YYv56vhRckSRHpU5sPzg' },
  { name: 'Dundoo Mall', location: 'Patny Circle, Secunderabad', type: 'Commercial', area: '22,25,620 sft', units: null, year: '2019-2024', image: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Delivered%20projects%20resources/Dundoo%20Mall%20Patny%20Circle.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0RlbGl2ZXJlZCBwcm9qZWN0cyByZXNvdXJjZXMvRHVuZG9vIE1hbGwgUGF0bnkgQ2lyY2xlLmpwZyIsImlhdCI6MTc3NTM2ODU1OSwiZXhwIjo4ODE3NTM2ODU1OX0.YvgvXmZdTL852JH2zn_lbcAeUXllHNhPCCS3lzUZgXY' },
]

const FILTERS = ['All', 'Residential', 'Commercial', 'Villas', 'Township'] as const

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
              { num: '23', label: 'Projects Delivered' },
              { num: '62L+', label: 'Square Feet' },
              { num: '800+', label: 'Homes Delivered' },
              { num: '31', label: 'Years Since 1995' },
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block', filter: 'contrast(1.05) brightness(1.02) saturate(1.05)' }}
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
            &ldquo;We have never missed a possession date. Not once. In 31 years.&rdquo;
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="legacy-grid">
            {filtered.map((project) => (
              <div key={project.name} style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden', transition: 'transform 0.25s ease' }}>
                {/* Image */}
                <div style={{ position: 'relative', width: '100%', paddingBottom: '60%', height: 0, overflow: 'hidden', backgroundColor: '#1A1A2E' }}>
                  {(project as any).image ? (
                    <img src={(project as any).image} alt={project.name} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)' }}>
                      <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '13px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '0 16px' }}>{project.name}</span>
                    </div>
                  )}
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: project.type === 'Residential' ? 'rgba(205,14,18,0.9)' : project.type === 'Villas' ? 'rgba(201,169,110,0.9)' : project.type === 'Township' ? 'rgba(45,122,79,0.9)' : 'rgba(26,26,46,0.9)', color: 'white', padding: '2px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{project.type}</span>
                  {(project as any).year && <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(45,122,79,0.9)', color: 'white', padding: '2px 10px', borderRadius: '100px', fontSize: '9px', letterSpacing: '0.05em' }}>Delivered</span>}
                </div>
                {/* Content */}
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '16px', fontWeight: 500, color: '#1A1A2E', margin: '0 0 4px 0', lineHeight: 1.3 }}>{project.name}</h3>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#888', margin: '0 0 12px 0' }}>{project.location}</p>
                  <div style={{ display: 'flex', gap: '16px', borderTop: '0.5px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
                    {project.area && (
                      <div>
                        <div style={{ fontSize: '8px', color: '#CD0E12', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Area</div>
                        <div style={{ fontSize: '12px', color: '#1A1A2E', fontWeight: 500 }}>{project.area}</div>
                      </div>
                    )}
                    {(project as any).units && (
                      <div>
                        <div style={{ fontSize: '8px', color: '#CD0E12', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Units</div>
                        <div style={{ fontSize: '12px', color: '#1A1A2E', fontWeight: 500 }}>{(project as any).units}</div>
                      </div>
                    )}
                  </div>
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
          .founder-card-about > div:first-child { width: 100% !important; height: 200px !important; }
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
