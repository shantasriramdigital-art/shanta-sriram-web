import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Payment Plans | Shanta Sriram Constructions',
  description: 'Flexible construction-linked payment plans. Pre-approved by HDFC, SBI, Axis, and ICICI banks.',
}

const PAYMENT_STAGES = [
  { stage: 'Booking amount', pct: '10%' },
  { stage: 'Foundation completion', pct: '10%' },
  { stage: 'Slab completion per floor', pct: '20%' },
  { stage: 'Brickwork completion', pct: '20%' },
  { stage: 'Plastering completion', pct: '20%' },
  { stage: 'Flooring and fittings', pct: '10%' },
  { stage: 'Possession', pct: '10%' },
]

const BANKS = [
  { name: 'HDFC Bank', rate: 'Starting from 8.5% p.a.' },
  { name: 'State Bank of India', rate: 'Starting from 8.5% p.a.' },
  { name: 'Axis Bank', rate: 'Starting from 8.5% p.a.' },
  { name: 'ICICI Bank', rate: 'Starting from 8.5% p.a.' },
]

export default function PaymentPlansPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">PAYMENT PLANS</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Flexible Payment Plans</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">Designed for every stage of your investment journey</p>
        </div>
      </section>

      {/* Construction Linked Plan */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">PAYMENT STRUCTURE</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Construction Linked Payment Plan</h2>
          <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden max-w-2xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                  <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Construction Stage</th>
                  <th className="text-right font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Payment</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENT_STAGES.map((row, i) => (
                  <tr key={i} className={`border-b border-[#E8ECF0] ${i % 2 === 1 ? 'bg-[#F8F4EF]/40' : ''}`}>
                    <td className="font-sans text-sm text-[#1A1A2E] px-6 py-4">{row.stage}</td>
                    <td className="font-sans text-sm font-medium text-[#1A1A2E] px-6 py-4 text-right">{row.pct}</td>
                  </tr>
                ))}
                <tr className="bg-[#1A1A2E]">
                  <td className="font-sans text-sm font-medium text-white px-6 py-4">Total</td>
                  <td className="font-sans text-sm font-bold text-white px-6 py-4 text-right">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-sans text-[10px] text-[#6B6B6B] mt-4 max-w-2xl leading-relaxed">
            Payment plan is indicative. Final schedule is as per the registered Agreement for Sale. GST at 5% applicable on each instalment.
          </p>
        </div>
      </section>

      {/* Bodhivriksha Pricing Reference */}
      <section className="bg-[#F8F4EF] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white border border-[#E8ECF0] rounded-md p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-2">Featured Project</p>
              <h3 className="font-serif text-[#1A1A2E] text-2xl font-bold mb-1">The Bodhivriksha</h3>
              <p className="font-sans text-[#4A4A5A] text-sm">Bandlaguda Jagir, near TSPA Junction</p>
              <p className="font-serif text-[#CD0E12] text-2xl font-bold mt-3">Rs. 7,500 per sq. ft.</p>
              <p className="font-sans text-[10px] text-[#6B6B6B] mt-1">RERA: P02400003070</p>
            </div>
            <Link href="/projects/bodhivriksha" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors whitespace-nowrap">
              View Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Bank Partners */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">PRE-APPROVED FINANCING</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Our Projects Are Pre-Approved by Leading Banks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BANKS.map((bank) => (
              <div key={bank.name} className="bg-white border border-[#E8ECF0] rounded-md p-6">
                <h3 className="font-serif text-[#1A1A2E] text-lg font-medium mb-2">{bank.name}</h3>
                <span className="inline-block font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#CD0E12] border border-[#CD0E12]/30 px-2.5 py-1 rounded-sm mb-3">
                  Pre-approved project
                </span>
                <p className="font-sans text-[#4A4A5A] text-sm mb-4">{bank.rate}</p>
                <Link href="/contact" className="font-sans text-sm font-medium text-[#CD0E12] hover:underline">Apply Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Teaser */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4">Calculate Your Monthly Investment</h2>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-8 max-w-md mx-auto">Use our EMI calculator to plan your finances before you commit.</p>
          <Link href="/#emi-calculator" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
            Open EMI Calculator
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-4">Get a Personalised Payment Plan</h2>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-8 max-w-md mx-auto">Our sales team will walk you through the exact payment schedule for your chosen unit.</p>
          <Link href="/contact" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
            Talk to Sales Team
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
