'use client'

import { Button } from '@/components/ui/button'

export default function CrmError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-[#E8ECF0] bg-white p-8 text-center">
      <h2 className="font-serif text-xl text-[#1A1A2E]">Something broke</h2>
      <p className="mt-2 text-sm text-[#6B6B6B]">{error.message ?? 'An unexpected error occurred.'}</p>
      <Button onClick={reset} className="mt-4 bg-[#CD0E12] text-white hover:bg-[#a90a0e]">
        Try again
      </Button>
    </div>
  )
}
