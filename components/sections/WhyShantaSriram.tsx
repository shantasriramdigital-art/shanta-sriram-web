'use client'

import SectionLabel from '@/components/ui/SectionLabel'
import { MotionStagger, MotionItem } from '@/components/ui/MotionWrapper'

const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'Fully Funded Before Construction',
    body: 'Every project we launch is 100% financially secured before a single brick is laid. No project delays due to funding gaps.',
  },
  {
    num: '02',
    title: '30 Years, Zero Defaults',
    body: 'Since 1995, Shanta Sriram has never defaulted on a delivery commitment. Every home promised has been delivered, on time, as specified.',
  },
  {
    num: '03',
    title: 'RERA Compliant Across All Projects',
    body: 'All ongoing projects are registered with TSRERA. Full transparency on construction progress, finances, and possession timelines, by law and by choice.',
  },
]

export default function WhyShantaSriram() {
  return (
    <section className="bg-[#F8F4EF] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel className="mb-4">WHY CHOOSE US</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] text-balance font-bold">
            Built Different. Delivered on Promise.
          </h2>
        </div>

        <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((d) => (
            <MotionItem
              key={d.num}
              className="bg-white border border-[#E8ECF0] border-l-2 border-l-[#CD0E12] rounded-md p-6"
            >
              <div className="w-8 h-8 bg-[#CD0E12]/10 rounded-sm flex items-center justify-center mb-4">
                <span className="font-sans text-xs font-medium text-[#CD0E12]">{d.num}</span>
              </div>
              <h3 className="font-serif text-[#1A1A2E] text-xl font-medium mb-3">{d.title}</h3>
              <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed">{d.body}</p>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  )
}
