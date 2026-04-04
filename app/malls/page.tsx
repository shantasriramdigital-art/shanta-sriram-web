import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Mall Properties | Shanta Sriram Constructions',
  description: 'Premium retail mall destinations in Hyderabad. Dundoo Mall, Odeon Mall, Sudharshan Mall.',
}

const MALLS = [
  {
    name: 'Dundoo Mall',
    location: 'Patny Circle, Secunderabad',
    type: 'Retail Mall',
    status: 'Under Construction',
    description: 'Premium retail destination at one of Secunderabad\'s busiest commercial intersections. Multi-level retail space designed for modern shopping experiences.',
  },
  {
    name: 'Odeon Mall',
    location: 'RTC Cross Roads, Hyderabad',
    type: 'Retail Mall',
    status: 'Under Construction',
    description: 'Located at the iconic RTC Cross Roads, one of Hyderabad\'s highest footfall zones. A landmark retail project in the heart of the city.',
  },
  {
    name: 'Sudharshan Mall',
    location: 'RTC Cross Roads, Hyderabad',
    type: 'Retail Mall',
    status: 'Under Construction',
    description: 'Adjacent to Odeon Mall at RTC Cross Roads, extending the retail ecosystem with complementary retail and entertainment spaces.',
  },
]

export default function MallsPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8 font-sans text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#CD0E12]">Home</Link>
            <span className="mx-2 text-[#CD0E12]">/</span>
            <Link href="/commercial" className="hover:text-[#CD0E12]">Commercial</Link>
            <span className="mx-2 text-[#CD0E12]">/</span>
            <span className="text-[#4A4A5A]">Malls</span>
          </nav>
          <SectionLabel className="mb-4">RETAIL AND MALL PROPERTIES</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Hyderabad's Premium Retail Destinations</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">
            Strategic retail properties at Hyderabad's highest footfall locations. Built for brands that demand visibility and quality.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-8">
            {MALLS.map((mall) => (
              <div key={mall.name} className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="font-sans text-[10px] uppercase tracking-[0.1em] font-medium text-white bg-[#1A1A2E] px-2.5 py-1">{mall.type}</span>
                  <span className="font-sans text-[10px] text-amber-800 bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2.5 py-1 rounded-sm">{mall.status}</span>
                </div>
                <h2 className="font-serif text-[#1A1A2E] text-2xl font-bold mb-2">{mall.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CD0E12]" />
                  <span className="font-sans text-sm text-[#6B6B6B]">{mall.location}</span>
                </div>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed max-w-2xl">{mall.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="font-sans text-[#4A4A5A] text-sm mb-4">Interested in retail leasing or investment?</p>
            <Link href="/contact" className="inline-block font-sans text-sm font-medium text-white bg-[#CD0E12] px-6 py-3 rounded hover:bg-[#b50d10] transition-colors">
              Contact Our Leasing Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
