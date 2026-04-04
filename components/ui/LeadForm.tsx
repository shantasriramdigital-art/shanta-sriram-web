'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  interest: z.enum(['Home Buyer', 'Investor', 'Partner', 'Land Owner', 'Leasing Enquiry', 'Market Enquiry']),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface LeadFormProps {
  title?: string
  subtitle?: string
  compact?: boolean
  onDark?: boolean
}

export default function LeadForm({ title = 'Get In Touch', subtitle = 'Our sales team will contact you within 2 hours.', compact = false, onDark = false }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: 'Home Buyer' },
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      await new Promise((r) => setTimeout(r, 800))
      console.log('[v0] Lead form submitted:', data)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    }
  }

  const inputClass = `w-full bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] placeholder-[#6B6B6B] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition`

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="font-serif text-[#1A1A2E] text-xl mb-2">Thank you for reaching out.</p>
        <p className="font-sans text-[#4A4A5A] text-sm">Our team will contact you within 2 hours.</p>
      </div>
    )
  }

  return (
    <div>
      {!compact && (
        <div className="mb-6">
          <h3 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-1">{title}</h3>
          <p className="font-sans text-[#6B6B6B] text-sm">{subtitle}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input {...register('name')} placeholder="Your Name *" className={inputClass} />
          {errors.name && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('phone')} placeholder="Mobile Number *" className={inputClass} />
          {errors.phone && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.phone.message}</p>}
        </div>
        {!compact && (
          <>
            <div>
              <input {...register('email')} placeholder="Email Address (optional)" className={inputClass} />
            </div>
            <div>
              <select {...register('interest')} className={inputClass}>
                <option value="Home Buyer">Home Buyer</option>
                <option value="Investor">Investor</option>
                <option value="Partner">Partner</option>
                <option value="Land Owner">Land Owner</option>
                <option value="Leasing Enquiry">Leasing Enquiry</option>
                <option value="Market Enquiry">Market Enquiry</option>
              </select>
            </div>
            <div>
              <textarea
                {...register('message')}
                placeholder="Message (optional)"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </>
        )}
        {error && <p className="text-xs font-sans text-[#CD0E12]">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#CD0E12] text-white text-sm font-sans font-medium py-3 rounded hover:bg-[#b50d10] transition-colors disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
        </button>
      </form>
    </div>
  )
}
