'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, X, Menu, Phone } from 'lucide-react'
import { BRAND } from '@/lib/data/brand'

const PROPERTY_MENU = {
  residential: {
    label: 'Residential',
    links: [
      { label: 'All Apartments', href: '/residential' },
      { label: 'The Bodhivriksha', href: '/projects/bodhivriksha' },
      { label: 'The Kalpavriksha', href: '/projects/kalpavriksha' },
      { label: 'Shanta Sriram Pinnacle', href: '/projects/pinnacle' },
      { label: 'Skycity', href: '/projects/skycity' },
    ],
  },
  villas: {
    label: 'Villas',
    links: [
      { label: 'All Villas', href: '/villas' },
      { label: 'Brookwoods', href: '/projects/brookwoods' },
    ],
  },
  commercial: {
    label: 'Commercial',
    links: [
      { label: 'All Commercial', href: '/commercial' },
      { label: 'Dundoo Mall', href: '/malls' },
      { label: 'Odeon Mall', href: '/malls' },
      { label: 'Sudharshan Mall', href: '/malls' },
    ],
  },
  legacy: {
    label: 'Legacy',
    links: [
      { label: 'Completed Projects', href: '/legacy' },
    ],
    stats: ['41 Projects Delivered', '6M+ Sft'],
    note: '30 years of delivery',
  },
}

const BUYER_LINKS = [
  { label: 'NRI Guide', href: '/nri' },
  { label: 'Payment Plans', href: '/payment-plans' },
  { label: 'Book Site Visit', href: '/site-visit' },
]

const SIMPLE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Markets', href: '/markets' },
  { label: 'Trust', href: '/trust' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [propertiesOpen, setPropertiesOpen] = useState(false)
  const [buyersOpen, setBuyersOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const propertiesRef = useRef<HTMLDivElement>(null)
  const buyersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setPropertiesOpen(false)
    setBuyersOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href
  const isPropertyActive = pathname.startsWith('/projects') || pathname.startsWith('/residential') || pathname.startsWith('/villas') || pathname.startsWith('/commercial') || pathname.startsWith('/malls') || pathname === '/legacy'
  const isBuyerActive = pathname.startsWith('/nri') || pathname.startsWith('/payment-plans') || pathname.startsWith('/site-visit')

  const linkClass = (href: string) =>
    `nav-link font-medium transition-colors duration-150 relative ${isActive(href) ? 'text-[#CD0E12]' : 'text-[#4A4A5A] hover:text-[#1A1A2E]'}`

  return (
    <>
      {/* Top info bar */}
      <div
        className="hidden md:block bg-[#F4F7FC] border-b border-[#E8ECF0] transition-all duration-300"
        style={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1, overflow: 'hidden' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
          <span className="text-[11px] font-sans text-[#4A4A5A]">{BRAND.address}</span>
          <div className="flex items-center gap-6 text-[11px] font-sans text-[#4A4A5A]">
            <span>{BRAND.phone}</span>
            <span className="text-[#E8ECF0]">|</span>
            <span>{BRAND.email}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? '0 1px 8px rgba(26,26,46,0.06)' : 'none',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL2xvZ28ucG5nIiwiaWF0IjoxNzc1MzQzOTM0LCJleHAiOjg4MTc1MzQzOTM0fQ.J5Wi2db5qMp1FGyp9pB4Legm3BTl9U_9ktT72-kHY-E"
              alt="Shanta Sriram Constructions"
              data-logo=""
              style={{ height: '48px', width: 'auto', maxWidth: '220px', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            <Link href="/" className={linkClass('/')}>Home</Link>
            <Link href="/about" className={linkClass('/about')}>About</Link>

            {/* Properties mega-menu */}
            <div
              ref={propertiesRef}
              className="relative"
              onMouseEnter={() => setPropertiesOpen(true)}
              onMouseLeave={() => setPropertiesOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-sans font-medium transition-colors duration-150 ${isPropertyActive ? 'text-[#CD0E12]' : 'text-[#4A4A5A] hover:text-[#1A1A2E]'}`}>
                Properties
                <ChevronDown size={14} className={`transition-transform duration-200 ${propertiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {propertiesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-3">
                  <div className="bg-white border-t-[3px] border-t-[#CD0E12] shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-[680px] p-6"
                    style={{ animation: 'slideDown 0.2s ease' }}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {Object.entries(PROPERTY_MENU).map(([key, col]) => (
                        <div key={key}>
                          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#CD0E12] font-medium mb-3">{col.label}</p>
                          <div className="flex flex-col gap-1">
                            {col.links.map((link) => (
                              <Link
                                key={link.href + link.label}
                                href={link.href}
                                className="font-sans text-sm text-[#1A1A2E] hover:text-[#CD0E12] py-1.5 group flex items-center gap-1 transition-colors"
                              >
                                {link.label}
                                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#CD0E12]" />
                              </Link>
                            ))}
                          </div>
                          {'stats' in col && (
                            <div className="mt-3 pt-3 border-t border-[#E8ECF0]">
                              {(col as any).stats.map((s: string) => (
                                <p key={s} className="font-sans text-xs text-[#6B6B6B]">{s}</p>
                              ))}
                              <p className="font-sans text-[10px] text-[#6B6B6B] mt-1 italic">{(col as any).note}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/markets" className={linkClass('/markets')}>Markets</Link>

            {/* Buyers dropdown */}
            <div
              ref={buyersRef}
              className="relative"
              onMouseEnter={() => setBuyersOpen(true)}
              onMouseLeave={() => setBuyersOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-sans font-medium transition-colors duration-150 ${isBuyerActive ? 'text-[#CD0E12]' : 'text-[#4A4A5A] hover:text-[#1A1A2E]'}`}>
                Buyers
                <ChevronDown size={14} className={`transition-transform duration-200 ${buyersOpen ? 'rotate-180' : ''}`} />
              </button>
              {buyersOpen && (
                <div className="absolute top-full left-0 mt-0 pt-3">
                  <div className="bg-white border-t-[3px] border-t-[#CD0E12] shadow-[0_8px_40px_rgba(0,0,0,0.12)] w-48 py-2"
                    style={{ animation: 'slideDown 0.2s ease' }}
                  >
                    {BUYER_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 font-sans text-sm text-[#1A1A2E] hover:text-[#CD0E12] hover:bg-[#F8F4EF] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/trust" className={linkClass('/trust')}>Trust</Link>
            <Link href="/insights" className={linkClass('/insights')}>Insights</Link>
            <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:04045656500"
              className="flex items-center gap-1.5 text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-4 py-2 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors duration-200"
            >
              <Phone size={14} />
              040 4565 6500
            </a>
            <Link
              href="/site-visit"
              className="text-sm font-sans font-medium text-white bg-[#CD0E12] px-5 py-2.5 rounded hover:bg-[#b50d10] transition-colors duration-200"
            >
              Book Site Visit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-[#1A1A2E]" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={22} />
          </button>
        </div>

        {/* Dropdown animation */}
        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[60] bg-[#1A1A2E] flex flex-col">
          <div className="flex items-center justify-between px-6 h-[60px] border-b border-white/10">
            <img
              src="https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL2xvZ28ucG5nIiwiaWF0IjoxNzc1MzQzOTM0LCJleHAiOjg4MTc1MzQzOTM0fQ.J5Wi2db5qMp1FGyp9pB4Legm3BTl9U_9ktT72-kHY-E"
              alt="Shanta Sriram Constructions"
              data-logo=""
              style={{ height: '40px', width: 'auto', maxWidth: '180px', display: 'block', objectFit: 'contain' }}
            />
            <button onClick={() => setMobileOpen(false)} aria-label="Close navigation">
              <X size={22} className="text-white" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-0">
            {/* Simple links */}
            <Link href="/" className="block py-3.5 text-base font-sans font-medium text-white border-b border-white/10">Home</Link>
            <Link href="/about" className="block py-3.5 text-base font-sans font-medium text-white border-b border-white/10">About</Link>

            {/* Properties expandable */}
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'properties' ? null : 'properties')}
              className="flex items-center justify-between py-3.5 text-base font-sans font-medium text-white border-b border-white/10 w-full"
            >
              Properties
              <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'properties' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'properties' && (
              <div className="pl-4 pb-2 border-b border-white/10">
                {Object.entries(PROPERTY_MENU).map(([key, col]) => (
                  <div key={key} className="mb-3">
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#CD0E12] font-medium py-2">{col.label}</p>
                    {col.links.map((link) => (
                      <Link key={link.href + link.label} href={link.href} className="block py-2 font-sans text-sm text-white/70">{link.label}</Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <Link href="/markets" className="block py-3.5 text-base font-sans font-medium text-white border-b border-white/10">Markets</Link>

            {/* Buyers expandable */}
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'buyers' ? null : 'buyers')}
              className="flex items-center justify-between py-3.5 text-base font-sans font-medium text-white border-b border-white/10 w-full"
            >
              Buyers
              <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'buyers' ? 'rotate-180' : ''}`} />
            </button>
            {mobileExpanded === 'buyers' && (
              <div className="pl-4 pb-2 border-b border-white/10">
                {BUYER_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="block py-2 font-sans text-sm text-white/70">{link.label}</Link>
                ))}
              </div>
            )}

            <Link href="/trust" className="block py-3.5 text-base font-sans font-medium text-white border-b border-white/10">Trust</Link>
            <Link href="/insights" className="block py-3.5 text-base font-sans font-medium text-white border-b border-white/10">Insights</Link>
            <Link href="/contact" className="block py-3.5 text-base font-sans font-medium text-white border-b border-white/10">Contact</Link>
          </nav>

          <div className="px-6 pb-8 flex flex-col gap-3">
            <a href="tel:04045656500" className="text-center text-sm font-sans font-medium text-white border border-white/30 px-5 py-3 rounded">
              Call 040 4565 6500
            </a>
            <Link href="/site-visit" className="text-center text-sm font-sans font-medium text-white bg-[#CD0E12] px-5 py-3 rounded">
              Book Site Visit
            </Link>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
