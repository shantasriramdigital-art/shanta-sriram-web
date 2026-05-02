import {
  Phone,
  MessageCircle,
  Mail,
  StickyNote,
  ArrowRightLeft,
  CalendarPlus,
  CheckCircle2,
  IndianRupee,
  UserPlus,
  Sparkles,
} from 'lucide-react'
import type { ActivityType } from '@/types/crm'
import { cn } from '@/lib/utils'

const map: Record<ActivityType, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  call: { icon: Phone, color: 'bg-emerald-100 text-emerald-700' },
  whatsapp: { icon: MessageCircle, color: 'bg-green-100 text-green-700' },
  email: { icon: Mail, color: 'bg-blue-100 text-blue-700' },
  note: { icon: StickyNote, color: 'bg-neutral-100 text-neutral-700' },
  stage_change: { icon: ArrowRightLeft, color: 'bg-[#CD0E12]/10 text-[#CD0E12]' },
  visit_scheduled: { icon: CalendarPlus, color: 'bg-[#C9A96E]/20 text-[#8a7240]' },
  visit_completed: { icon: CheckCircle2, color: 'bg-orange-100 text-orange-700' },
  booking_created: { icon: IndianRupee, color: 'bg-[#1A1A2E]/10 text-[#1A1A2E]' },
  assignment: { icon: UserPlus, color: 'bg-violet-100 text-violet-700' },
  lead_created: { icon: Sparkles, color: 'bg-cyan-100 text-cyan-700' },
}

export function ActivityIcon({ type, size = 'md' }: { type: ActivityType; size?: 'sm' | 'md' }) {
  const config = map[type] ?? map.note
  const Icon = config.icon
  const dim = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const iconDim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <span className={cn('inline-flex items-center justify-center rounded-full', dim, config.color)}>
      <Icon className={iconDim} />
    </span>
  )
}
