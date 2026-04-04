import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { BRAND } from '@/lib/data/brand'

export default function StatsCounter() {
  return (
    <section className="bg-[#1A1A2E] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <SectionLabel className="!text-[#C9A96E] mb-4">BY THE NUMBERS</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-white text-balance font-bold">
            A Legacy Built on Delivery
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {BRAND.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="font-serif text-white mb-2"
                style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.1 }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-sans text-white/50 text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A96E 0, #C9A96E 1px, transparent 1px, transparent 60px)',
          }}
        />
      </div>
    </section>
  )
}
