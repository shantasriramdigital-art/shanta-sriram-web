import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { BRAND } from '@/lib/data/brand'

export default function AboutStrip() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left text */}
          <div>
            <SectionLabel className="mb-4">ABOUT US</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] mb-6 text-balance font-bold">
              Three Decades of Building Hyderabad&apos;s Future
            </h2>
            <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-4">
              Founded in 1995 by Chairman M. Narsaiah, Shanta Sriram Constructions has grown from a single promise into one of Hyderabad&apos;s most trusted real estate brands. Over three decades, we have delivered 8,000+ homes across 80+ projects, always on time, always as specified.
            </p>
            <p className="font-sans text-[#4A4A5A] text-base leading-relaxed mb-8">
              Our philosophy is rooted in a simple truth: the best marketing is a kept promise. Every project we launch is fully funded before construction begins. Every specification we commit to is delivered without compromise.
            </p>
            <div>
              <Link
                href="/about"
                className="font-sans text-sm font-medium text-[#CD0E12] hover:underline"
              >
                Know More about our story
              </Link>
            </div>
          </div>

          {/* Right: director cards */}
          <div className="flex flex-col gap-6">
            {BRAND.directors.map((director) => (
              <div
                key={director.name}
                className="bg-[#F8F4EF] rounded-md p-6 flex items-start gap-5"
              >
                <div className="w-12 h-12 bg-[#1A1A2E] rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-white text-sm font-medium">{director.initials}</span>
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <p className="font-serif text-[#1A1A2E] text-base font-medium">{director.name}</p>
                    <p className="font-sans text-[#6B6B6B] text-xs">{director.title}</p>
                  </div>
                  <p className="font-serif text-[#4A4A5A] text-sm italic leading-relaxed">
                    &ldquo;{director.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
