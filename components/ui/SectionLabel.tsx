'use client'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <span className="block h-px w-6 flex-shrink-0" style={{ backgroundColor: '#CD0E12' }} />
      <span
        className="section-label"
        style={{
          color: '#CD0E12',
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
      <span className="block h-px w-6 flex-shrink-0" style={{ backgroundColor: '#CD0E12' }} />
    </div>
  )
}
