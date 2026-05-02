'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { supabase } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password is required'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const search = useSearchParams()
  const next = search.get('next') ?? '/admin/crm'
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    setSubmitting(false)
    if (error) {
      toast.error(error.message ?? 'Login failed')
      return
    }
    toast.success('Welcome back')
    window.location.assign(next)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF] px-4">
      <div className="w-full max-w-sm rounded-lg border border-[#E8ECF0] bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#CD0E12]">Shanta Sriram</p>
          <h1 className="mt-1 font-serif text-2xl text-[#1A1A2E]">Sales CRM</h1>
          <p className="mt-2 text-xs text-[#6B6B6B]">Sign in to manage leads and bookings.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[#6B6B6B]">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...register('email')} className="mt-1.5" />
            {errors.email && <p className="mt-1 text-xs text-[#CD0E12]">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="text-xs uppercase tracking-wider text-[#6B6B6B]">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" {...register('password')} className="mt-1.5" />
            {errors.password && <p className="mt-1 text-xs text-[#CD0E12]">{errors.password.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
          Authorised personnel only
        </p>
      </div>
    </div>
  )
}
