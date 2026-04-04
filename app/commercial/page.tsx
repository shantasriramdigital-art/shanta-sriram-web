import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Commercial Projects | Shanta Sriram Constructions',
  description: 'Commercial and retail spaces across Hyderabad. Office spaces, tech parks, and mall properties.',
}

const ONGOING_COMMERCIAL = [
  { name: 'Dundoo Mall', location: 'Patny Circle, Secunderabad', type: 'Retail Mall', status: 'Under Construction' },
  { name: 'Odeon Mall', location: 'RTC Cross Roads, Hyderabad', type: 'Retail Mall', status: 'Under Construction' },
  { name: 'Sudharshan Mall', location: 'RTC Cross Roads, Hyderabad', type: 'Retail Mall', status: 'Under Construction' },
]

const COMPLETED_COMMERCIAL = [
  { name: 'SS Tech Park', location: 'Ameerpet', area: '3,50,000 sft' },
  { name: 'Oyster Mall', location: 'Somajiguda', area: '1,80,000 sft' },
  { name: 'Chippendale', location: 'Banjara Hills', area: '90,000 sft' },
  { name: 'Diamond Plaza', location: 'Begumpet', area: '2,40,000 sft' },
  { name: 'Crystal Plaza', location: 'Ameerpet', area: '1,60,000 sft' },
  { name: 'Platinum Square', location: 'Gachibowli', area: '2,80,000 sft' },
  { name: 'Golden Arcade', location: 'Abids', area: '1,20,000 sft' },
  { name: 'Ivory Towers', location: 'Banjara Hills', area: '2,10,000 sft' },
  { name: 'Onyx Complex', location: 'Himayatnagar', area: '1,90,000 sft' },
  { name: 'Zircon Plaza', location: 'Secunderabad', area: '1,75,000 sft' },
  { name: 'Alexandrite Complex', location: 'Hitech City', area: '2,60,000 sft' },
  { name: 'Sunstone Enclave', location: 'Patancheru', area: '1,40,000 sft' },
  { name: 'Larimar Heights', location: 'Shamshabad', area: '1,80,000 sft' },
]

export default function CommercialPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8 font-sans text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#CD0E12]">Home</Link>
            <span className="mx-2 text-[#CD0E12]">/</span>
            <span className="text-[#4A4A5A]">Commercial</span>
          </nav>
          <SectionLabel className="mb-4">COMMERCIAL PROJECTS</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Commercial and Retail Spaces</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">
            Office spaces, tech parks, and retail destinations built with the same quality and commitment that defines our residential portfolio.
          </p>
        </div>
      </section>

      {/* Ongoing */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">ONGOING</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Current Commercial Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ONGOING_COMMERCIAL.map((p) => (
              <div key={p.name} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.1em] font-medium text-white bg-[#1A1A2E] px-2.5 py-1">{p.type}</span>
                  <span className="font-sans text-[10px] text-amber-800 bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2.5 py-1 rounded-sm">{p.status}</span>
                </div>
                <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-1">{p.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CD0E12]" />
                  <span className="font-sans text-sm text-[#6B6B6B]">{p.location}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/malls" className="font-sans text-sm font-medium text-[#CD0E12] hover:underline">View all mall properties</Link>
          </div>
        </div>
      </section>

      {/* Completed */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">COMPLETED PORTFOLIO</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Delivered Commercial Projects</h2>
          <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                  <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Project</th>
                  <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Location</th>
                  <th className="text-right font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-6 py-4">Area</th>
                </tr>
              </thead>
              <tbody>
                {COMPLETED_COMMERCIAL.map((p, i) => (
                  <tr key={p.name} className={`border-b border-[#E8ECF0] last:border-0 ${i % 2 === 1 ? 'bg-[#F8F4EF]/40' : ''}`}>
                    <td className="font-sans text-sm text-[#1A1A2E] font-medium px-6 py-4">{p.name}</td>
                    <td className="font-sans text-sm text-[#4A4A5A] px-6 py-4">{p.location}</td>
                    <td className="font-sans text-sm text-[#CD0E12] font-medium px-6 py-4 text-right">{p.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F4EF] py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="font-sans text-[#4A4A5A] text-sm mb-4">Interested in commercial leasing or investment?</p>
          <Link href="/contact" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
            Contact Our Commercial Team
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
