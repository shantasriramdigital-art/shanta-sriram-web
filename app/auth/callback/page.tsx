import { Suspense } from 'react'
import { CallbackContent } from './callback-content'

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#6B6B6B] mb-4">Loading...</p>
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-[#CD0E12] border-t-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
