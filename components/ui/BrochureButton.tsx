'use client'

import { useState } from 'react'
import BrochureGateModal from '@/components/ui/BrochureGateModal'

interface BrochureButtonProps {
  className?: string
  label?: string
  projectName: string
  brochureUrl: string
  supabaseSource: string
  heading?: string
  subheading?: string
}

export default function BrochureButton({
  className = '',
  label = 'Download Brochure',
  projectName,
  brochureUrl,
  supabaseSource,
  heading,
  subheading,
}: BrochureButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className || 'text-sm font-sans font-medium text-[#1A1A2E] border border-[#1A1A2E] px-6 py-3 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors'}
      >
        {label}
      </button>
      <BrochureGateModal
        open={open}
        onClose={() => setOpen(false)}
        projectName={projectName}
        brochureUrl={brochureUrl}
        supabaseSource={supabaseSource}
        heading={heading}
        subheading={subheading}
      />
    </>
  )
}
