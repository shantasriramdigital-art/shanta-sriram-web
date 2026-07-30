import { Suspense } from 'react'
import { LoginContent } from './login-content'

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF] px-4">
          <div className="w-full max-w-sm rounded-lg border border-[#E8ECF0] bg-white p-8 shadow-sm">
            <div className="text-center">
              <div className="inline-block animate-spin">
                <div className="h-8 w-8 border-4 border-[#CD0E12] border-t-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
