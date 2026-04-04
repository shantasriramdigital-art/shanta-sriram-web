'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SectionLabel from '@/components/ui/SectionLabel'
import { BRAND } from '@/lib/data/brand'
import { supabase } from '@/utils/supabase/client'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  interest: z.string().min(1, 'Select a project'),
})

type FormData = z.infer<typeof schema>

const PROJECT_OPTIONS = [
  'The Bodhivriksha',
  'The Kalpavriksha',
  'Shanta Sriram Pinnacle',
  'Brookwoods',
  'Skycity',
  'General Enquiry',
]

export default function ContactStrip() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: 'The Bodhivriksha' },
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const { error: dbError } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        interest: data.interest,
        source: 'homepage-strip',
      })
      if (dbError) throw dbError
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    }
  }

  const inputClass = 'w-full bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] placeholder-[#6B6B6B] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition'

  return (
    <section className="bg-[#F8F4EF] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div>
            <SectionLabel className="mb-4">GET IN TOUCH</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] mb-8 text-balance font-bold">
              Visit Our Sales Office
            </h2>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Address</p>
                <p className="font-sans text-[#4A4A5A] text-sm leading-relaxed">{BRAND.address}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Phone</p>
                <p className="font-sans text-[#4A4A5A] text-sm">{BRAND.phone}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Email</p>
                <p className="font-sans text-[#4A4A5A] text-sm">{BRAND.email}</p>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-1">Working Hours</p>
                <p className="font-sans text-[#4A4A5A] text-sm">{BRAND.hours}</p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white border border-[#E8ECF0] rounded-md p-8">
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-serif text-[#1A1A2E] text-xl mb-2">Thank you for reaching out.</p>
                <p className="font-sans text-[#4A4A5A] text-sm">Our team will contact you within 2 hours.</p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-1">Request a Callback</h3>
                  <p className="font-sans text-[#6B6B6B] text-sm">Our sales team will contact you within 2 hours.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div>
                    <input {...register('name')} placeholder="Your Name *" className={inputClass} />
                    {errors.name && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register('phone')} type="tel" placeholder="Mobile Number *" className={inputClass} />
                    {errors.phone && <p className="mt-1 text-xs font-sans text-[#CD0E12]">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <select {...register('interest')} className={inputClass}>
                      {PROJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  {error && <p className="text-xs font-sans text-[#CD0E12]">{error}</p>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#CD0E12] text-white text-sm font-sans font-medium py-3 rounded hover:bg-[#b50d10] transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Request a Callback'}
                  </button>
                  <p className="font-sans text-[10px] text-[#6B6B6B] text-center leading-relaxed">
                    Our team calls back within 2 hours. Monday to Saturday, 9AM to 6PM.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
