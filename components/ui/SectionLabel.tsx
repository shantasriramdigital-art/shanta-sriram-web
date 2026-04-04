'use client'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-2 ${className}`}>
      {children}
    </p>
  )
}
