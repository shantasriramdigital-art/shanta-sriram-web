'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, X, Menu } from 'lucide-react'
import { BRAND } from '@/lib/data/brand'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Projects',
    href: '/projects',
    children: [
      { label: 'Residential', href: '/residential' },
      { label: 'Commercial', href: '/commercial' },
    ],
  },
  { label: 'Markets', href: '/markets' },
  { label: 'Trust', href: '/trust' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top info bar - desktop only */}
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
        className="sticky top-0 z-50 border-b border-[#E8ECF0] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)',
          backdropFilter: scrolled ? 'none' : 'blur(12px)',
          boxShadow: scrolled ? '0 1px 8px rgba(26,26,46,0.06)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cLl8N2uTwDKdXZp9PzuDPPhI3lvzzb.png"
              alt="Shanta Sriram Constructions"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                  <button className={`flex items-center gap-1 text-sm font-sans font-medium transition-colors duration-150 ${pathname.startsWith('/residential') || pathname.startsWith('/commercial') ? 'text-[#CD0E12]' : 'text-[#4A4A5A] hover:text-[#1A1A2E]'}`}>
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-[#E8ECF0] rounded shadow-sm py-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-sans text-[#4A4A5A] hover:text-[#CD0E12] hover:bg-[#F4F7FC] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-sans font-medium transition-colors duration-150 ${pathname === link.href ? 'text-[#CD0E12]' : 'text-[#4A4A5A] hover:text-[#1A1A2E]'}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-5 py-2.5 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors duration-200"
            >
              Enquiry Now
            </Link>
            <Link
              href="/contact#site-visit"
              className="text-sm font-sans font-medium text-white bg-[#CD0E12] px-5 py-2.5 rounded hover:bg-[#b50d10] transition-colors duration-200"
            >
              Book Site Visit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#1A1A2E]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#E8ECF0]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cLl8N2uTwDKdXZp9PzuDPPhI3lvzzb.png"
              alt="Shanta Sriram Constructions"
              className="h-10 w-auto"
            />
            <button onClick={() => setMobileOpen(false)} aria-label="Close navigation">
              <X size={22} className="text-[#1A1A2E]" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className={`block py-3 text-lg font-sans font-medium border-b border-[#E8ECF0] ${pathname === link.href ? 'text-[#CD0E12]' : 'text-[#1A1A2E]'}`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2.5 text-sm font-sans text-[#4A4A5A] border-b border-[#E8ECF0]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="px-6 pb-8 flex flex-col gap-3">
            <Link
              href="/contact"
              className="text-center text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-5 py-3 rounded"
            >
              Enquiry Now
            </Link>
            <Link
              href="/contact#site-visit"
              className="text-center text-sm font-sans font-medium text-white bg-[#CD0E12] px-5 py-3 rounded"
            >
              Book Site Visit
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
