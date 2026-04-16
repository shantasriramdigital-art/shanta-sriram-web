export default function TrustBar() {
  return (
    <section className="bg-[#1A1A2E] py-6">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Stats */}
          <div className="flex items-center gap-0 w-full md:w-auto">
            <div className="flex-1 md:flex-none text-center md:pr-8">
              <p className="font-serif text-white text-2xl font-bold">8,000+</p>
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-wider">Homes Delivered</p>
            </div>
            <div className="w-px h-10 bg-white/15 hidden md:block" />
            <div className="flex-1 md:flex-none text-center md:px-8">
              <p className="font-serif text-white text-2xl font-bold">31</p>
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-wider">Years of Legacy</p>
            </div>
            <div className="w-px h-10 bg-white/15 hidden md:block" />
            <div className="flex-1 md:flex-none text-center md:pl-8">
              <p className="font-serif text-white text-2xl font-bold">80+</p>
              <p className="font-sans text-white/50 text-[10px] uppercase tracking-wider">Projects Completed</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#CD0E12] border border-[#CD0E12]/30 px-3 py-1.5 rounded-sm">
              TSRERA Registered
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#CD0E12] border border-[#CD0E12]/30 px-3 py-1.5 rounded-sm">
              IGBC Certified
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.12em] font-medium text-[#CD0E12] border border-[#CD0E12]/30 px-3 py-1.5 rounded-sm">
              Est. 1995
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
