import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { INSIGHTS } from '@/lib/data/insights'
import { format } from 'date-fns'

export default function InsightsPreview() {
  const featured = INSIGHTS.find((i) => i.featured) ?? INSIGHTS[0]
  const rest = INSIGHTS.filter((i) => !i.featured).slice(0, 3)

  return (
    <section className="bg-[#F4F7FC] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel className="mb-4">INSIGHTS</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] text-balance font-bold">
                Market Intelligence & Buyer Education
              </h2>
            </div>
          </div>

          {/* Featured post */}
          <div className="mb-8">
            <Link href={`/insights/${featured.slug}`}>
              <div className="bg-white border border-[#E8ECF0] rounded-md p-8 hover:border-[#CD0E12]/30 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#CD0E12] font-medium">{featured.category}</span>
                  <span className="text-[#E8ECF0]">·</span>
                  <span className="font-sans text-xs text-[#6B6B6B]">{format(new Date(featured.date), 'dd MMMM yyyy')}</span>
                  <span className="text-[#E8ECF0]">·</span>
                  <span className="font-sans text-xs text-[#6B6B6B]">{featured.readTime}</span>
                </div>
                <h3 className="font-serif text-[#1A1A2E] text-2xl md:text-3xl font-bold mb-3 text-balance group-hover:text-[#CD0E12] transition-colors">
                  {featured.title}
                </h3>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed line-clamp-2 max-w-2xl">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {rest.map((insight) => (
              <div
                key={insight.slug}
                className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden hover:border-[#CD0E12]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-[16/9] bg-[#F8F4EF] flex items-center justify-center">
                  <span className="font-serif text-[#1A1A2E]/20 text-base text-center px-4">{insight.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#CD0E12] font-medium">{insight.category}</span>
                    <span className="font-sans text-xs text-[#6B6B6B]">· {format(new Date(insight.date), 'MMM yyyy')}</span>
                  </div>
                  <h4 className="font-serif text-[#1A1A2E] text-lg font-medium mb-2 line-clamp-2 leading-snug">
                    {insight.title}
                  </h4>
                  <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed line-clamp-2 mb-4">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[#6B6B6B]">{insight.readTime}</span>
                    <Link href={`/insights/${insight.slug}`} className="font-sans text-sm font-medium text-[#CD0E12] hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/insights"
              className="inline-block font-sans text-sm font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors"
            >
              View All Insights
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
