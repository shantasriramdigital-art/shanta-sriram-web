'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BRAND } from '@/lib/data/brand'
import { supabase } from '@/utils/supabase/client'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
})

type FormData = z.infer<typeof schema>

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('exitIntentShown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setVisible(true)
        sessionStorage.setItem('exitIntentShown', '1')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 30000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from('leads').insert({
      name: data.name,
      phone: data.phone,
      source: 'exit-popup',
    })
    if (error) {
      console.error('Failed to save lead:', error)
      return
    }
    setSubmitted(true)
  }

  return visible ? (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={() => setVisible(false)}
    >
      <div
        className="bg-white rounded-md w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#1A1A2E] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-center">
          <div className="font-serif text-[#1A1A2E] text-sm font-medium uppercase tracking-widest mb-3">
            {BRAND.company}
          </div>
          <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-2">Before You Go</h2>
          <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
            Get a callback from our sales team within 2 hours.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <p className="font-serif text-[#1A1A2E] text-lg mb-2">Thank you</p>
            <p className="font-sans text-[#4A4A5A] text-sm">
              Our team will call you within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input
                {...register('name')}
                placeholder="Your Name"
                className="w-full bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] placeholder-[#6B6B6B] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition"
              />
              {errors.name && (
                <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('phone')}
                placeholder="Mobile Number"
                className="w-full bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] placeholder-[#6B6B6B] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition"
              />
              {errors.phone && (
                <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.phone.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#CD0E12] text-white text-sm font-sans font-medium py-3 rounded hover:bg-[#b50d10] transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Request Callback'}
            </button>
          </form>
        )}
      </div>
    </div>
  ) : null
}
