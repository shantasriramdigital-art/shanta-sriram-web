'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/utils/supabase/client'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
  buyerType: z.string().min(1, 'Please select an option'),
})

type FormData = z.infer<typeof schema>

interface BrochureGateModalProps {
  open: boolean
  onClose: () => void
  projectName: string
  brochureUrl: string
  supabaseSource: string
  heading?: string
  subheading?: string
}

export default function BrochureGateModal({
  open,
  onClose,
  projectName,
  brochureUrl,
  supabaseSource,
  heading,
  subheading,
}: BrochureGateModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { buyerType: 'Self Use' },
  })

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setError('')
      reset()
    }, 300)
  }, [onClose, reset])

  useEffect(() => {
    if (!open) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, handleClose])

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const { error: dbError } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        interest: data.buyerType,
        message: `Requested ${projectName} brochure`,
        source: supabaseSource,
      })
      if (dbError) throw dbError
      setSubmitted(true)
      window.open(brochureUrl, '_blank')
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch {
      setError('Something went wrong. Please call us on 040 45656500')
    }
  }

  if (!open) return null

  const inputClass = 'w-full bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] placeholder-[#6B6B6B] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition'

  const displayHeading = heading || `Get the ${projectName} Brochure`
  const displaySubheading = subheading || 'Enter your details and we will send you the complete brochure instantly'

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-[480px] p-8 relative animate-in fade-in zoom-in-95 duration-300"
        style={{ borderRadius: '12px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#1A1A2E] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <p className="font-serif text-[#1A1A2E] text-xl mb-2">Your brochure is downloading...</p>
            <p className="font-sans text-[#4A4A5A] text-sm">Check your browser downloads. Our team will also reach out shortly.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-2">{displayHeading}</h2>
              <p className="font-sans text-[#6B6B6B] text-sm">{displaySubheading}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <input {...register('name')} placeholder="Full Name *" className={inputClass} />
                {errors.name && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('phone')} type="tel" placeholder="Phone Number *" className={inputClass} />
                {errors.phone && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.phone.message}</p>}
              </div>
              <div>
                <input {...register('email')} type="email" placeholder="Email Address *" className={inputClass} />
                {errors.email && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.email.message}</p>}
              </div>
              <div>
                <select {...register('buyerType')} className={inputClass}>
                  <option value="Self Use">Self Use</option>
                  <option value="Investment">Investment</option>
                  <option value="NRI Buyer">NRI Buyer</option>
                  <option value="Not decided yet">Not decided yet</option>
                </select>
              </div>
              {error && <p className="text-xs font-sans text-[#CD0E12]">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#CD0E12] text-white text-sm font-sans font-medium py-3 rounded hover:bg-[#b50d10] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Processing...' : 'Download Brochure'}
              </button>
              <p className="font-sans text-[10px] text-[#6B6B6B] text-center">
                Your details are safe. We do not spam.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
