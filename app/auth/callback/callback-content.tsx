'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'

export function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get the token from URL fragment or query
        const token = searchParams.get('token')
        const type = searchParams.get('type')

        if (!token || !type) {
          setError('Invalid confirmation link')
          setLoading(false)
          return
        }

        // Get the session from hash parameters (Supabase puts it there)
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')

        if (accessToken) {
          // Supabase sent us an access token - create a session
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: params.get('refresh_token') || '',
          })

          if (sessionError) {
            console.error('Session error:', sessionError)
            setError('Failed to confirm email')
            setLoading(false)
            return
          }

          // Email confirmed - redirect to login
          setTimeout(() => {
            router.push('/admin/login')
          }, 1500)
        } else if (type === 'email_change' || type === 'signup') {
          // Try to verify OTP for email confirmation
          const { error: otpError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: type as 'signup' | 'email_change' | 'phone_change' | 'recovery',
          })

          if (otpError) {
            console.error('OTP error:', otpError)
            setError('Failed to confirm email: ' + otpError.message)
            setLoading(false)
            return
          }

          // Email confirmed - redirect to login
          setTimeout(() => {
            router.push('/admin/login')
          }, 1500)
        } else {
          setError('Unknown confirmation type')
          setLoading(false)
        }
      } catch (err) {
        console.error('Callback error:', err)
        setError('An error occurred during email confirmation')
        setLoading(false)
      }
    }

    handleCallback()
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B6B6B] mb-4">Confirming your email...</p>
          <div className="inline-block animate-spin">
            <div className="h-8 w-8 border-4 border-[#CD0E12] border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-[#E8ECF0] shadow-sm p-8 text-center">
            <h1 className="font-serif text-xl text-[#CD0E12] mb-4">Confirmation Failed</h1>
            <p className="text-[#6B6B6B] mb-6">{error}</p>
            <a
              href="/admin/login"
              className="inline-block bg-[#CD0E12] text-white px-6 py-2 rounded hover:bg-[#a90a0e]"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#6B6B6B] mb-4">Email confirmed! Redirecting...</p>
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-[#CD0E12] border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
