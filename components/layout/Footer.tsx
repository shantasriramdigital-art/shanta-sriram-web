import Link from 'next/link'
import { BRAND } from '@/lib/data/brand'

const FOOTER_LINKS = {
  properties: [
    { label: 'Residential Apartments', href: '/residential' },
    { label: 'Villas', href: '/villas' },
    { label: 'Commercial', href: '/commercial' },
    { label: 'Mall Properties', href: '/malls' },
    { label: 'Legacy Projects', href: '/legacy' },
  ],
  buyers: [
    { label: 'NRI Guide', href: '/nri' },
    { label: 'Payment Plans', href: '/payment-plans' },
    { label: 'Book Site Visit', href: '/site-visit' },
  ],
  company: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Trust and Governance', href: '/trust' },
    { label: 'Insights', href: '/insights' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0F1A2E]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL2xvZ28ucG5nIiwiaWF0IjoxNzc1MzQzOTM0LCJleHAiOjg4MTc1MzQzOTM0fQ.J5Wi2db5qMp1FGyp9pB4Legm3BTl9U_9ktT72-kHY-E"
              alt="Shanta Sriram Constructions"
              data-logo=""
              style={{ height: '56px', width: 'auto', maxWidth: 'none', display: 'block', marginBottom: '16px' }}
            />
            <p className="font-serif text-white/60 italic text-base mb-5">{BRAND.tagline}</p>
            <Link
              href={BRAND.rera}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] font-sans uppercase tracking-[0.14em] text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1.5 rounded hover:border-[#C9A96E]/60 transition-colors"
            >
              TSRERA Registered
            </Link>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">Properties</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.properties.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">Company</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buyers + Legal */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">Buyer Resources</h3>
            <ul className="flex flex-col gap-2.5 mb-8">
              {FOOTER_LINKS.buyers.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-4">Legal</h3>
            <ul className="flex flex-col gap-2.5 mb-8">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-3">Contact</h3>
            <div className="flex flex-col gap-2 font-sans text-sm text-white/60">
              <p>{BRAND.phone}</p>
              <p>{BRAND.email}</p>
              <p className="text-white/35 text-xs">{BRAND.hours}</p>
            </div>
          </div>
        </div>
      </div>

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
