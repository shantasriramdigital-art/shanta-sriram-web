'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F4EF] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center animate-in fade-in duration-500">
        <div className="mb-8">
          <div className="text-9xl font-bold text-[#CD0E12]/20 mb-2">404</div>
          <h1 className="text-4xl font-serif font-bold text-[#1A1A2E] mb-4">Page Not Found</h1>
          <p className="font-sans text-[#4A4A5A] text-lg mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <button className="w-full px-6 py-3 bg-[#CD0E12] text-white rounded font-sans font-medium hover:bg-[#b50d10] transition-colors flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </Link>
          <Link href="/residential">
            <button className="w-full px-6 py-3 bg-white border border-[#E8ECF0] text-[#1A1A2E] rounded font-sans font-medium hover:bg-[#F4F7FC] transition-colors">
              View Residential Projects
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
