import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import { BRAND } from '@/lib/data/brand'

export const metadata = {
  title: 'NRI Buyers Guide | Shanta Sriram Constructions',
  description: 'Complete guide for NRI buyers investing in Hyderabad real estate. FEMA guidelines, NRI home loans, virtual site visits, and tax implications.',
}

export default function NRIPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">NRI BUYERS GUIDE</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Invest in Hyderabad from Anywhere in the World</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl mb-8">Complete guide for NRI buyers. Trusted by the Hyderabad diaspora since 1995.</p>
          <Link href="/contact" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
            Talk to Our NRI Desk
          </Link>
        </div>
      </section>

      {/* Why Hyderabad */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">INVESTMENT CASE</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Why Hyderabad Real Estate in 2026</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { value: '8,000+', label: 'Homes Delivered' },
              { value: '30+', label: 'Years Legacy' },
              { value: 'IGBC', label: 'Certified Projects' },
              { value: '100%', label: 'RERA Compliant' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-6 text-center">
                <p className="font-serif text-[#1A1A2E] text-2xl font-bold mb-1">{stat.value}</p>
                <p className="font-sans text-[#6B6B6B] text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed max-w-3xl">
            Hyderabad is India's fastest growing IT city. Strong rental yields of 3-4% annually. Capital appreciation consistently outpacing inflation. TSRERA registration protects every buyer.
          </p>
        </div>
      </section>

      {/* FEMA and RBI */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">LEGAL FRAMEWORK</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-8">Can NRIs Buy Property in India?</h2>
          <div className="bg-white border border-[#E8ECF0] rounded-md p-8 max-w-3xl">
            <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed mb-4">
              Yes, NRIs and OCIs can purchase residential and commercial property in India under FEMA regulations. No RBI approval is required for residential property.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                'Payment must be made through NRE, NRO, or FCNR accounts or through inward remittance',
                'Joint ownership with another NRI or resident Indian is permitted',
                'Up to 2 residential properties can be held without restriction',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0 mt-2" />
                  <span className="font-sans text-sm text-[#4A4A5A]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">BUYING PROCESS</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-12">5 Steps to Buy from Abroad</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Choose Property', desc: 'Choose your property and unit type via virtual tour or site visit during India visit' },
              { step: '02', title: 'Execute POA', desc: 'Execute Power of Attorney at nearest Indian Embassy or Consulate in your country' },
              { step: '03', title: 'Sign Agreement', desc: 'Your POA holder signs the Agreement for Sale and pays booking amount' },
              { step: '04', title: 'Apply for Loan', desc: 'Apply for NRI home loan through HDFC, SBI, or Axis NRI banking' },
              { step: '05', title: 'Registration', desc: 'Registration at Sub-Registrar office via POA holder. Keys handed over on possession.' },
            ].map((s) => (
              <div key={s.step} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                <div className="font-serif text-[#C9A96E]/40 text-3xl mb-3">{s.step}</div>
                <h3 className="font-serif text-[#1A1A2E] text-lg font-medium mb-2">{s.title}</h3>
                <p className="font-sans text-[#4A4A5A] text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NRI Home Loan Partners */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">FINANCING</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">NRI Home Loan Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'HDFC Bank NRI', desc: 'Up to 80% financing, competitive NRI rates, doorstep service' },
              { name: 'State Bank of India NRI', desc: 'Government-backed, maximum loan tenure 30 years' },
              { name: 'Axis Bank NRI', desc: 'Fast processing, dedicated NRI relationship manager' },
              { name: 'ICICI Bank NRI', desc: 'Digital-first NRI loan process, quick approvals' },
            ].map((bank) => (
              <div key={bank.name} className="bg-white border border-[#E8ECF0] rounded-md p-6">
                <h3 className="font-serif text-[#1A1A2E] text-lg font-medium mb-3">{bank.name}</h3>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed">{bank.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Implications */}
      <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <SectionLabel className="!text-[#C9A96E] mb-4">TAX GUIDE</SectionLabel>
          <h2 className="text-h2 font-serif text-white mb-10">Tax Implications for NRI Buyers</h2>
          <div className="flex flex-col gap-4">
            {[
              'TDS of 20% deducted on property sale by resident seller (buyer deducts)',
              'Capital gains tax applicable on sale: Short term if held under 2 years, long term at 20% with indexation',
              'Rental income taxable in India at 30% (TDS applicable)',
              'Double Taxation Avoidance Agreement (DTAA) benefits available for residents of USA, UK, UAE, Singapore, Australia, Canada',
              'Repatriation of sale proceeds permitted up to original investment amount through NRE account',
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-white/10 last:border-0">
                <div className="w-0.5 bg-[#CD0E12] self-stretch flex-shrink-0 rounded-full" style={{ minHeight: '20px' }} />
                <p className="font-sans text-white/80 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
          <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)' }} />
        </div>
      </section>

      {/* Virtual Site Visit */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">VISIT VIRTUALLY</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-6">Can't Visit in Person? We Come to You.</h2>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-2xl mb-8">
            Our sales team conducts live WhatsApp video walkthroughs of every project. See the exact unit, floor, and view before committing. Schedule a virtual tour at a time that works in your timezone.
          </p>
          <Link href="/site-visit" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
            Schedule a Virtual Tour
          </Link>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-6">Talk to Our NRI Desk</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Phone</p>
              <p className="font-sans text-[#1A1A2E] text-sm font-medium">{BRAND.phone}</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">WhatsApp</p>
              <Link href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="font-sans text-[#CD0E12] text-sm font-medium hover:underline">Chat with Us</Link>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Email</p>
              <p className="font-sans text-[#1A1A2E] text-sm font-medium">{BRAND.email}</p>
            </div>
          </div>
          <p className="font-sans text-xs text-[#6B6B6B]">We are available on WhatsApp from 8AM to 10PM IST, 7 days a week.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
