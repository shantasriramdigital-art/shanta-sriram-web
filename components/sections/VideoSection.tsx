import SectionLabel from '@/components/ui/SectionLabel'

export default function VideoSection() {
  return (
    <section className="bg-[#F8F4EF] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel className="justify-center mb-4">OUR STORY</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] text-balance font-bold">
            See Our Legacy in Motion
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-lg shadow-lg"
          style={{ paddingBottom: '56.25%' }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/sXZ0_NY1_rU"
            title="Shanta Sriram Constructions"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
