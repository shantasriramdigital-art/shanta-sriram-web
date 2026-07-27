'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { supabase } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RecoveryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetting, setResetting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleRecovery() {
      try {
        // Get the session from the URL fragment
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !data.session) {
          setError('Invalid or expired recovery link. Please request a new one.')
          setLoading(false)
          return
        }

        setLoading(false)
      } catch (err) {
        console.error('Recovery error:', err)
        setError('An error occurred. Please try again.')
        setLoading(false)
      }
    }

    handleRecovery()
  }, [])

  async function handleResetPassword() {
    if (!newPassword || !confirmPassword) {
      toast.error('All fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setResetting(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Password reset successfully!')
      setNewPassword('')
      setConfirmPassword('')

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/admin/login')
      }, 2000)
    } catch (err) {
      toast.error('Failed to reset password')
      console.error(err)
    } finally {
      setResetting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-[#6B6B6B]">Processing recovery link...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-[#E8ECF0] shadow-sm p-8 text-center">
            <h1 className="font-serif text-xl text-[#CD0E12] mb-4">Recovery Link Invalid</h1>
            <p className="text-[#6B6B6B] mb-6">{error}</p>
            <Button
              onClick={() => router.push('/reset-password')}
              className="w-full bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
            >
              Request New Link
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-[#E8ECF0] shadow-sm p-8">
          <div className="mb-8">
            <h1 className="font-serif text-2xl text-[#1A1A2E] text-center">Reset Password</h1>
            <p className="text-sm text-[#6B6B6B] text-center mt-2">
              Shanta Sriram CRM
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
                disabled={resetting}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                disabled={resetting}
              />
            </div>
            <p className="text-xs text-[#6B6B6B]">
              Password must be at least 8 characters.
            </p>
            <Button
              onClick={handleResetPassword}
              disabled={resetting}
              className="w-full bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
            >
              {resetting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E8ECF0]">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/login')}
              className="w-full text-[#6B6B6B] hover:text-[#1A1A2E]"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
