import { cn } from '@/lib/utils'

const PROJECT_LABELS: Record<string, string> = {
  bodhivriksha: 'Bodhivriksha',
  kalpavriksha: 'Kalpavriksha',
  pinnacle: 'Pinnacle',
  brookwoods: 'Brookwoods',
  skycity: 'Skycity',
  other: 'Other',
}

const PROJECT_COLORS: Record<string, string> = {
  bodhivriksha: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  kalpavriksha: 'bg-violet-50 text-violet-700 border-violet-200',
  pinnacle: 'bg-amber-50 text-amber-700 border-amber-200',
  brookwoods: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  skycity: 'bg-blue-50 text-blue-700 border-blue-200',
  other: 'bg-neutral-100 text-neutral-700 border-neutral-200',
}

export function ProjectBadge({
  project,
  className,
}: {
  project: string | null | undefined
  className?: string
}) {
  if (!project) {
    return (
      <span className={cn('inline-flex items-center rounded border border-dashed border-neutral-300 px-2 py-0.5 text-[11px] text-neutral-400', className)}>
        No project
      </span>
    )
  }
  const key = project.toLowerCase()
  const label = PROJECT_LABELS[key] ?? project
  const color = PROJECT_COLORS[key] ?? PROJECT_COLORS.other
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium',
        color,
        className
      )}
    >
      {label}
    </span>
  )
}
