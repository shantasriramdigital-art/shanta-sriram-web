import { Suspense } from 'react'
import { ResetContent } from './reset-content'

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg border border-[#E8ECF0] shadow-sm p-8">
              <div className="text-center">
                <div className="inline-block animate-spin">
                  <div className="h-8 w-8 border-4 border-[#CD0E12] border-t-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ResetContent />
    </Suspense>
  )
}
