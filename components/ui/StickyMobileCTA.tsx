'use client'

import Link from 'next/link'

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E8ECF0]/50">
      <div className="flex items-center gap-2 px-4 py-2" style={{ height: '56px' }}>
        <a
          href="tel:04045656500"
          className="flex-1 text-center text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] py-2.5 rounded transition-colors"
        >
          Call Now
        </a>
        <Link
          href="/site-visit"
          className="flex-1 text-center text-sm font-sans font-medium text-white bg-[#CD0E12] py-2.5 rounded hover:bg-[#b50d10] transition-colors"
        >
          Book Site Visit
        </Link>
      </div>
    </div>
  )
}
