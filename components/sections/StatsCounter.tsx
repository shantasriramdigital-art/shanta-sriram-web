import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const STATS = [
  { value: 30, suffix: '+', label: 'Years of Legacy', context: 'Since 1995' },
  { value: 8000, suffix: '+', label: 'Happy Homes', context: 'Across Hyderabad' },
  { value: 80, suffix: '+', label: 'Projects Delivered', context: '100% completion rate' },
  { value: 100, suffix: '%', label: 'RERA Compliant', context: 'All ongoing projects' },
]

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="stat-number text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-sans text-white/70 text-sm font-medium mb-1">{stat.label}</p>
              <p className="font-sans text-white/40 text-xs">{stat.context}</p>
            </div>
          ))}
        </div>
      </div>

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
