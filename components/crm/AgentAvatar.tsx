import { initials } from '@/lib/crm/format'
import { cn } from '@/lib/utils'

export function AgentAvatar({
  name,
  size = 'md',
  className,
}: {
  name: string | null | undefined
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const dim = size === 'sm' ? 'w-6 h-6 text-[10px]' : size === 'lg' ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs'
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-[#1A1A2E] text-white font-medium',
        dim,
        className
      )}
      title={name ?? 'Unassigned'}
    >
      {initials(name)}
    </span>
  )
}
