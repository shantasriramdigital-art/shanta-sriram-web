'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import { BRAND } from '@/lib/data/brand'
import { supabase } from '@/utils/supabase/client'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  interest: z.string().min(1, 'Select a project'),
  preferredDate: z.string().optional(),
  timeSlot: z.string().min(1, 'Select a time slot'),
  visitMode: z.enum(['in-person', 'virtual']),
  questions: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const PROJECT_OPTIONS = ['The Bodhivriksha', 'The Kalpavriksha', 'Shanta Sriram Pinnacle', 'Brookwoods', 'Skycity', 'Not decided yet']
const TIME_SLOTS = ['9AM to 1PM', '2PM to 6PM', 'Flexible']

export default function SiteVisitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: 'The Bodhivriksha', timeSlot: '9AM to 1PM', visitMode: 'in-person' },
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const { error: dbError } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        interest: data.interest,
        message: `Visit: ${data.visitMode} | Date: ${data.preferredDate || 'Flexible'} | Time: ${data.timeSlot} | Questions: ${data.questions || 'None'}`,
        source: 'site-visit',
      })
      if (dbError) throw dbError
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    }
  }

  const inputClass = 'w-full bg-white border border-[#E8ECF0] rounded px-4 py-3 text-sm font-sans text-[#4A4A5A] placeholder-[#6B6B6B] focus:border-[#CD0E12] focus:ring-1 focus:ring-[#CD0E12]/30 outline-none transition'

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-20 md:py-28 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">SITE VISIT</SectionLabel>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-6 max-w-2xl">Book a Site Visit</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-xl">See your future home in person or virtually. Our team will confirm within 2 hours.</p>
        </div>
      </section>

      {/* 3 Step Process */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', text: 'Choose your project and preferred time' },
              { step: '02', text: 'Submit your details below' },
              { step: '03', text: 'Our team confirms within 2 hours' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                <div className="w-8 h-8 bg-[#CD0E12]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-xs font-medium text-[#CD0E12]">{s.step}</span>
                </div>
                <p className="font-sans text-sm text-[#4A4A5A] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="max-w-[600px] mx-auto px-6">
          <SectionLabel className="mb-4">BOOK YOUR VISIT</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-8">Fill in Your Details</h2>

          {submitted ? (
            <div className="bg-white border border-[#E8ECF0] rounded-md p-8 text-center">
              <p className="font-serif text-[#1A1A2E] text-xl mb-2">Thank you.</p>
              <p className="font-sans text-[#4A4A5A] text-sm">Our team will call you within 2 hours to confirm your visit.</p>
            </div>
          ) : (
            <div className="bg-white border border-[#E8ECF0] rounded-md p-8">
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
                  <input {...register('email')} type="email" placeholder="Email Address (optional)" className={inputClass} />
                </div>
                <div>
                  <select {...register('interest')} className={inputClass}>
                    {PROJECT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <input {...register('preferredDate')} type="date" className={inputClass} />
                </div>
                <div>
                  <select {...register('timeSlot')} className={inputClass}>
                    {TIME_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                </div>
                <div>
                  <p className="font-sans text-xs text-[#6B6B6B] mb-2">Visit Mode</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 font-sans text-sm text-[#4A4A5A] cursor-pointer">
                      <input {...register('visitMode')} type="radio" value="in-person" className="accent-[#CD0E12]" />
                      In-person site visit
                    </label>
                    <label className="flex items-center gap-2 font-sans text-sm text-[#4A4A5A] cursor-pointer">
                      <input {...register('visitMode')} type="radio" value="virtual" className="accent-[#CD0E12]" />
                      Virtual video walkthrough
                    </label>
                  </div>
                </div>
                <div>
                  <textarea {...register('questions')} placeholder="Any specific questions (optional)" rows={3} className={`${inputClass} resize-none`} />
                </div>
                {error && <p className="text-xs font-sans text-[#CD0E12]">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#CD0E12] text-white text-sm font-sans font-medium py-3 rounded hover:bg-[#b50d10] transition-colors disabled:opacity-60">
                  {isSubmitting ? 'Sending...' : 'Book Site Visit'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">WHAT TO EXPECT</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-10">Your Visit Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {[
              'Our team calls to confirm within 2 hours of your submission',
              'Site visits available Monday to Saturday, 9AM to 6PM',
              'For virtual tours, we send a WhatsApp video call link at your preferred time',
              'Complimentary tea and project presentation at our sales office',
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0 mt-2" />
                <p className="font-sans text-sm text-[#4A4A5A] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="bg-[#F8F4EF] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel className="mb-4">SALES OFFICE</SectionLabel>
          <h2 className="text-h2 font-serif text-[#1A1A2E] mb-8">Visit Us</h2>
          <iframe
            src="https://maps.google.com/maps?q=Shalom+Skycity+Gachibowli+Hyderabad+500032&output=embed"
            width="100%"
            className="h-[250px] md:h-[350px]"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shanta Sriram Constructions Sales Office"
          />
          <p className="font-sans text-xs text-[#6B6B6B] mt-3 mb-6">Visit us Monday to Saturday, 9AM to 6PM. Complimentary parking available at Shalom Skycity.</p>
          <div className="bg-white border border-[#E8ECF0] rounded-md p-6 max-w-md">
            <div className="flex flex-col gap-3 font-sans text-sm text-[#4A4A5A]">
              <p className="leading-relaxed">{BRAND.address}</p>
              <p>Phone: {BRAND.phone}</p>
              <p className="text-[#6B6B6B] text-xs">{BRAND.hours}</p>
            </div>
            <a
              href="https://maps.app.goo.gl/gpiFANFng4D5gmsW6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sm font-medium text-[#CD0E12] hover:underline mt-4"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
