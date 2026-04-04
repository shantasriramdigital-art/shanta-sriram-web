import SectionLabel from '@/components/ui/SectionLabel'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export default function Testimonials() {
  const top3 = TESTIMONIALS.slice(0, 3)

  return (
    <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <SectionLabel className="!text-[#C9A96E] mb-4">CLIENT TESTIMONIALS</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-white text-balance font-bold">
            What Our Homeowners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {top3.map((t, i) => (
            <div key={i} className="bg-white rounded-md p-6 flex flex-col">
              <div className="font-serif text-[#CD0E12] text-5xl leading-none mb-4 select-none">&ldquo;</div>
              <p className="quote-text text-[#4A4A5A] flex-1 mb-5" style={{ fontSize: '14px' }}>
                {t.text}
              </p>
              <div className="flex items-center gap-1 mb-4 text-[#CD0E12] text-sm">
                <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              </div>
              <div className="border-t border-[#E8ECF0] pt-4">
                <p className="font-serif text-[#1A1A2E] text-base font-bold">{t.name}</p>
                <p className="font-sans text-[#6B6B6B] text-xs mt-0.5">{t.profession}</p>
                <span className="inline-block mt-2 font-sans text-[10px] font-medium text-white bg-[#CD0E12] px-2.5 py-1 rounded-sm">
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)'
        }} />
      </div>
    </section>
  )
}
