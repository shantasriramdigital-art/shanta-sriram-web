import Link from 'next/link'
import { BRAND } from '@/lib/data/brand'

const FOOTER_LINKS = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  properties: [
    { label: 'Markets', href: '/markets' },
    { label: 'Trust', href: '/trust' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0F1A2E]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cLl8N2uTwDKdXZp9PzuDPPhI3lvzzb.png"
                alt="Shanta Sriram Constructions"
                className="h-16 w-auto mb-4"
              />
            </div>
            <p className="font-serif text-white/60 italic text-base mb-6">{BRAND.tagline}</p>
            <Link
              href={BRAND.rera}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] font-sans uppercase tracking-[0.14em] text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1.5 rounded hover:border-[#C9A96E]/60 transition-colors"
            >
              TSRERA Registered
            </Link>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties & Markets */}
          <div>
            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.properties.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/60">
              <p className="leading-relaxed">{BRAND.address}</p>
              <p>{BRAND.phone}</p>
              <p>{BRAND.email}</p>
              <p className="text-white/40 text-xs">{BRAND.hours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/35">
            &copy; {new Date().getFullYear()} Shanta Sriram Constructions Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="font-sans text-xs text-white/25">
            All projects registered with Telangana RERA. Verify at rera.telangana.gov.in
          </p>
        </div>
      </div>
    </footer>
  )
}
