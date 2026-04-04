import SectionLabel from '@/components/ui/SectionLabel'
import LeadForm from '@/components/ui/LeadForm'
import { BRAND } from '@/lib/data/brand'

export default function ContactStrip() {
  return (
    <section className="bg-[#F8F4EF] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div>
            <SectionLabel className="mb-4">GET IN TOUCH</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] mb-8 text-balance font-bold">
              Visit Our Sales Office
            </h2>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Address</p>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed">{BRAND.address}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Phone</p>
                <p className="font-sans text-[#4A4A5A] text-sm">{BRAND.phone}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Email</p>
                <p className="font-sans text-[#4A4A5A] text-sm">{BRAND.email}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Working Hours</p>
                <p className="font-sans text-[#4A4A5A] text-sm">{BRAND.hours}</p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white border border-[#E8ECF0] rounded-md p-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
