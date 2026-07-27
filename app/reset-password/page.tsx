'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailParam)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleDirectReset() {
    if (!email || !newPassword || !confirmPassword) {
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

    setLoading(true)
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          newPassword,
          action: 'direct-reset',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to reset password')
        return
      }

      toast.success('Password reset successfully. You can now log in.')
      setEmail('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => router.push('/admin/login'), 2000)
    } catch (error) {
      toast.error('An error occurred')
      console.error(error)
    } finally {
      setLoading(false)
    }
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <p className="text-xs text-[#6B6B6B]">
              Password must be at least 8 characters.
            </p>
            <Button
              onClick={handleDirectReset}
              disabled={loading}
              className="w-full bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
