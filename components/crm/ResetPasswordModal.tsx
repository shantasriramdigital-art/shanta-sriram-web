'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface ResetPasswordModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  userEmail: string
  userName?: string
  onSuccess?: () => void
}

export function ResetPasswordModal({
  isOpen,
  onOpenChange,
  userId,
  userEmail,
  userName,
  onSuccess,
}: ResetPasswordModalProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleResetPassword() {
    if (!newPassword || !confirmPassword) {
      toast.error('Both password fields are required')
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
      const res = await fetch('/api/admin/reset-user-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          new_password: newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to reset password')
        return
      }

      toast.success(`Password reset for ${userName || userEmail}`)
      setNewPassword('')
      setConfirmPassword('')
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      toast.error('An error occurred')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm text-[#6B6B6B]">
            Resetting password for: <strong>{userName || userEmail}</strong>
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
            Password must be at least 8 characters. Share this temporary password with the user.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
