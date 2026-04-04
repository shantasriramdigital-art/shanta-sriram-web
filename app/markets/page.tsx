'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CORRIDORS = [
  {
    id: 'appa-junction',
    tab: 'Appa Junction Belt',
    label: 'APPA JUNCTION BELT',
    heading: "South Hyderabad's Rising Star",
    mapSrc: 'https://maps.google.com/maps?q=Appa+Junction+Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed',
    stats: [
      { label: 'Current Price', value: 'Rs 8,200 to Rs 9,500/sft' },
      { label: '1 Year Growth', value: '+9.2%' },
      { label: '3 Year Growth', value: '+12.9%' },
      { label: 'Rental Yield', value: '3 to 4%' },
    ],
    points: [
      'Direct ORR access via Exit 18 (Narsingi/TSPA), traffic-free corridor to entire city',
      'Airport in 20 minutes via PVNR Expressway',
      'Financial District and Gachibowli within 15 minutes',
      'Upcoming Narsingi metro station on Raidurg-Airport line by 2026',
    ],
    project: { name: 'The Bodhivriksha', location: 'Bandlaguda Jagir, near TSPA Junction', price: 'Starting from Rs 85L', href: '/projects/bodhivriksha' },
  },
  {
    id: 'kokapet',
    tab: 'Kokapet Corridor',
    label: 'KOKAPET CORRIDOR',
    heading: "Hyderabad's Most Premium Growth Zone",
    mapSrc: 'https://maps.google.com/maps?q=Kokapet+Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed',
    stats: [
      { label: 'Current Price', value: 'Rs 9,500 to Rs 12,700/sft' },
      { label: '5 Year Growth', value: '+100%' },
      { label: '10 Year Growth', value: '+198.7%' },
      { label: 'Rental Yield', value: '4 to 6%' },
    ],
    points: [
      'Known as the "next Gachibowli", Hyderabad\'s most premium western corridor',
      'Kokapet SEZ and Golden Mile Business District under development',
      'Land prices reached Rs 155 crore per acre in government auctions',
      'JLL India projects 20 to 30% land appreciation over next 5 years',
      'Metro Phase 2 Kokapet-Narsingi link will boost connectivity',
    ],
  },
  {
    id: 'orr-belt',
    tab: 'ORR Belt',
    label: 'OUTER RING ROAD BELT',
    heading: '158 km of Opportunity',
    mapSrc: 'https://maps.google.com/maps?q=Outer+Ring+Road+Hyderabad&t=&z=11&ie=UTF8&iwloc=&output=embed',
    stats: [
      { label: 'Kokapet (Exit 3)', value: '414% since 2010' },
      { label: 'Narsingi (Exit 4)', value: '329% since 2012' },
      { label: 'Tellapur (Exit 17)', value: '332% since 2013' },
      { label: 'ORR Premium', value: '40% within 2km' },
    ],
    points: [
      'Rs 50,000+ crore invested in real estate along ORR belt since 2018',
      '200+ new projects launched along corridor since 2018',
      'Regional Ring Road (RRR) at 340 km extending growth 30-40 km further',
      'Narsingi, Tellapur, Kollur: 5 to 6.5% rental yields',
      'Areas like Narsingi and Tellapur showing 25 to 35% annual growth',
    ],
  },
]

const NEWS = [
  { cat: 'Market Data', headline: 'Hyderabad property prices up 14% year-on-year in 2025', summary: 'Weighted average transaction prices grew 15% year-on-year in June 2025. Premium western zones command Rs 9,000 to Rs 15,000 per sft.', source: 'Sobha Research', date: 'June 2025' },
  { cat: 'Appreciation', headline: 'Kokapet sees 89% price surge in five years, from Rs 4,750 to Rs 9,000 per sft', summary: "Kokapet has emerged as India's second top-performing real estate market, with land values reaching Rs 155 crore per acre in government auctions.", source: 'MAK Projects Market Report', date: '2025' },
  { cat: 'Infrastructure', headline: 'Raidurg-Airport Metro line to add premium to Narsingi and Appa Junction belt', summary: 'The upcoming Narsingi metro station on the Raidurg-Airport Metro line is already triggering property value appreciation along the Appa Junction corridor.', source: 'RE/MAX Westside Realty', date: 'January 2026' },
  { cat: 'Investment', headline: 'ORR belt delivers 300 to 500% appreciation across key exits since 2010', summary: 'Kokapet (Exit 3) recorded 414% growth, Narsingi (Exit 4) saw 329% growth, and Tellapur (Exit 17) delivered 332% appreciation since their respective base years.', source: 'BuyRentSale ORR Guide', date: '2025' },
  { cat: 'Market Data', headline: 'Bandlaguda Jagir flat rates up 9.2% in one year, 21.3% over a decade', summary: 'Average flat prices in Bandlaguda Jagir now stand at Rs 6,550 per sft. Land rates appreciated 16.2% in the last year alone.', source: '99acres Price Trends', date: '2026' },
  { cat: 'Infrastructure', headline: 'Regional Ring Road to extend Hyderabad growth 30-40 km beyond ORR', summary: 'The 340-km RRR expressway connecting 40+ towns will create next-generation growth corridors, with areas along the route seeing 20 to 35% appreciation already.', source: 'Srigdha Real Estate Research', date: 'November 2025' },
  { cat: 'Investment', headline: 'JLL India projects 20 to 30% land appreciation in Kokapet over next 5 years', summary: "Kokapet's proximity to Financial District, ORR, and upcoming SEZ developments make it a high-conviction investment for institutional and retail buyers.", source: 'JLL India via Navanaami', date: '2025' },
  { cat: 'Market Data', headline: "Hyderabad residential prices up 80% over five years, outpacing all major Indian cities", summary: 'Property prices in Hyderabad have increased approximately 80% over five years. The Rangareddy district alone saw a 20% increase in residential values.', source: 'Homefleet Market Report', date: 'November 2025' },
  { cat: 'Infrastructure', headline: 'ORR properties command 40% premium within 2km of exits', summary: 'A clear 40% price premium exists for properties within 2km of any ORR exit, creating a strong case for location-first investment strategy in Hyderabad.', source: 'ORR Hyderabad Real Estate Guide', date: '2025' },
  { cat: 'Appreciation', headline: 'Tellapur positioned as next premium hub, 332% appreciation since 2013', summary: 'Spillover from saturated Gachibowli and Financial District is driving world-class gated community launches in Tellapur with 12 to 14% annual ROI projected.', source: 'Westside Realty Tellapur Report', date: 'January 2026' },
  { cat: 'Investment', headline: 'South Hyderabad emerges as next growth story for 2026', summary: 'Record land prices in Raidurg and Kokapet have pushed investor attention toward South Hyderabad zones including Appa Junction, Narsingi, and Bandlaguda belt.', source: 'Aditya Construction Market Review', date: 'January 2026' },
  { cat: 'Market Data', headline: 'Hyderabad records 42,000+ residential registrations in H1 2026', summary: 'Buyer confidence remains strong with over 42,000 unit registrations in H1 2026. Properties above Rs 1 crore constituted 18% of total registrations.', source: 'Auro Realty Market Intelligence', date: 'April 2026' },
]

const DOUBLED_NEWS = [...NEWS, ...NEWS]

function catColor(cat: string) {
  return cat === 'Market Data' ? { bg: '#CD0E12', color: 'white' } : { bg: '#1A1A2E', color: '#F8F4EF' }
}

export default function MarketsPage() {
  const [newsOffset, setNewsOffset] = useState(0)
  const newsHovered = useRef(false)
  const newsTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // News auto-scroll
  const stopNews = useCallback(() => { if (newsTimer.current) { clearInterval(newsTimer.current); newsTimer.current = null } }, [])
  const startNews = useCallback(() => {
    stopNews()
    newsTimer.current = setInterval(() => {
      if (newsHovered.current || document.hidden) return
      setNewsOffset((prev) => {
        const next = prev + 1
        return next >= NEWS.length ? 0 : next
      })
    }, 6000)
  }, [stopNews])

  useEffect(() => { startNews(); return stopNews }, [startNews, stopNews])

  const newsTranslate = -(newsOffset * 336)

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#1A1A2E', padding: '100px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ height: '1px', width: '32px', backgroundColor: '#C9A96E', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E' }}>Strategic Growth Corridors</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.01em' }}>We Build Where Hyderabad<br />Is Growing Next</h1>
          <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '600px', marginBottom: '48px' }}>
            Every Shanta Sriram project is positioned in a corridor identified for long-term infrastructure-led appreciation. Not where the market already peaked.
          </p>
          <div style={{ display: 'flex', gap: '0' }}>
            {[
              { num: '80%', label: 'Price appreciation in 5 years' },
              { num: '14%', label: 'Year-on-year growth in 2025' },
              { num: '158 km', label: 'ORR unlocking new corridors' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, paddingRight: i < 2 ? '24px' : 0, marginRight: i < 2 ? '24px' : 0, borderRight: i < 2 ? '1px solid rgba(201,169,110,0.3)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, color: 'white', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section header */}
      <section style={{ backgroundColor: '#F8F4EF', padding: '60px 0 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>Strategic Growth Corridors</span>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 500, color: '#1A1A2E', marginBottom: '16px' }}>We Build Where Hyderabad Is Growing Next</h2>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#C9A96E', margin: '0 auto' }} />
        </div>
      </section>

      {/* Stacked Corridors */}
      {CORRIDORS.map((c, idx) => {
        const bg = idx % 2 === 0 ? '#F8F4EF' : '#ffffff'
        const reversed = idx === 1
        const num = String(idx + 1).padStart(2, '0')

        const mapBlock = (
          <div style={{ overflow: 'hidden', borderRadius: '8px', border: '0.5px solid rgba(0,0,0,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <iframe src={c.mapSrc} width="100%" className="corridor-map" style={{ height: '420px', border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={c.label} />
          </div>
        )

        const dataBlock = (
          <div style={{ position: 'relative' }}>
            {/* Decorative number */}
            <span style={{ position: 'absolute', top: '-10px', left: 0, fontFamily: 'var(--font-playfair, serif)', fontSize: '100px', fontWeight: 300, color: 'rgba(205,14,18,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{num}</span>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>{c.label}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 500, color: '#1A1A2E', marginBottom: '16px' }}>{c.heading}</h2>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#C9A96E', marginBottom: '24px' }} />

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {c.stats.map((s) => (
                  <div key={s.label} style={{ backgroundColor: bg === '#F8F4EF' ? 'white' : '#F8F4EF', border: '0.5px solid #E8ECF0', borderRadius: '4px', padding: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-tenor, sans-serif)', fontSize: '10px', color: '#CD0E12', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '22px', fontWeight: 500, color: '#1A1A2E' }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {c.points.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#CD0E12', flexShrink: 0, marginTop: '7px' }} />
                    <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', color: '#4A4A5A', lineHeight: 1.8 }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* Project card */}
              {c.project && (
                <Link href={c.project.href}>
                  <div style={{ backgroundColor: bg === '#F8F4EF' ? 'white' : '#F8F4EF', border: '1px solid #E8ECF0', borderLeft: '3px solid #CD0E12', borderRadius: '4px', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.2s ease' }}>
                    <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '16px', fontWeight: 500, color: '#1A1A2E', marginBottom: '4px' }}>{c.project.name}</div>
                    <div style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '12px', color: '#888', marginBottom: '8px' }}>{c.project.location}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '16px', fontWeight: 500, color: '#CD0E12' }}>{c.project.price}</span>
                      <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '12px', color: '#CD0E12', fontWeight: 500 }}>View Project &rarr;</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )

        return (
          <div key={c.id}>
            <section style={{ backgroundColor: bg, padding: '80px 0' }}>
              <div className="corridor-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '55% 45%', gap: '48px', alignItems: 'center' }}>
                {reversed ? <>{dataBlock}{mapBlock}</> : <>{mapBlock}{dataBlock}</>}
              </div>
            </section>
            {idx < CORRIDORS.length - 1 && <div style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.06)' }} />}
          </div>
        )
      })}

      {/* News Carousel */}
      <section style={{ backgroundColor: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ height: '1px', width: '24px', backgroundColor: '#CD0E12', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CD0E12' }}>Market Intelligence</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 500, color: '#1A1A2E', marginBottom: '8px' }}>What the Market Is Saying</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '14px', color: '#888', marginBottom: '40px', maxWidth: '600px' }}>Sourced from leading real estate analysts, news publications, and market reports. Updated 2025-2026.</p>

          {/* Carousel */}
          <div
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseEnter={() => { newsHovered.current = true }}
            onMouseLeave={() => { newsHovered.current = false }}
          >
            {/* Fade edges */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to right, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to left, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            {/* Arrows */}
            <button onClick={() => setNewsOffset((p) => Math.max(0, p - 1))} aria-label="Previous" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#1A1A2E' }}>&#8249;</button>
            <button onClick={() => setNewsOffset((p) => Math.min(NEWS.length - 1, p + 1))} aria-label="Next" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#1A1A2E' }}>&#8250;</button>

            {/* Track */}
            <div style={{ display: 'flex', gap: '16px', transform: `translateX(${newsTranslate}px)`, transition: 'transform 0.5s ease', width: 'max-content' }}>
              {DOUBLED_NEWS.map((news, i) => {
                const colors = catColor(news.cat)
                return (
                  <div key={i} style={{ width: '320px', flexShrink: 0, backgroundColor: 'white', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '24px', borderTop: '3px solid #CD0E12' }}>
                    <span style={{ display: 'inline-block', fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '9px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: colors.bg, color: colors.color, padding: '3px 10px', borderRadius: '100px' }}>{news.cat}</span>
                    <h3 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '16px', fontWeight: 500, color: '#1A1A2E', lineHeight: 1.4, marginTop: '12px', marginBottom: '8px' }}>{news.headline}</h3>
                    <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: '#666', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{news.summary}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '11px', color: '#CD0E12' }}>{news.source}</span>
                      <span style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '11px', color: '#999' }}>{news.date}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ backgroundColor: '#F8F4EF', padding: '40px 24px' }}>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '12px', color: '#888', lineHeight: 1.7, textAlign: 'center' }}>
          Market data sourced from 99acres, Sobha Research, JLL India, RE/MAX Westside Realty, and other publicly available real estate market reports as of 2025-2026. Price appreciation figures represent historical trends and area averages. Individual project performance may vary. Shanta Sriram Constructions does not guarantee future returns. All investment decisions should be made after independent due diligence.
        </p>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#1A1A2E', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, color: 'white', marginBottom: '16px' }}>Invest Where Hyderabad Is Heading</h2>
          <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
            Our projects at Bodhivriksha and Kalpavriksha are positioned in two of these three growth corridors. Early movers in infrastructure-led corridors have consistently outperformed the market.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/site-visit" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: 'white', backgroundColor: '#CD0E12', padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 500 }}>Book a Site Visit</Link>
            <Link href="/#projects-grid" style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.05em' }}>View Our Projects</Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .corridor-grid { grid-template-columns: 1fr !important; }
          .corridor-map { height: 280px !important; }
        }
      `}</style>
    </main>
  )
}
