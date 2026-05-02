'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { toast } from 'sonner'
import { LEAD_STAGES, LEAD_STAGE_LABELS, type LeadStage } from '@/types/crm'
import { LeadCard, type KanbanLead } from './LeadCard'
import { updateLeadStage } from '@/lib/crm/mutations'
import { formatINR } from '@/lib/crm/format'
import { cn } from '@/lib/utils'

interface Props {
  leads: KanbanLead[] & { stage?: LeadStage }[]
}

type LeadWithStage = KanbanLead & { stage: LeadStage }

export function LeadsKanban({ leads: initial }: { leads: LeadWithStage[] }) {
  const [leads, setLeads] = useState<LeadWithStage[]>(initial)
  const [dragId, setDragId] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const grouped = useMemo(() => {
    const map = new Map<LeadStage, LeadWithStage[]>()
    for (const s of LEAD_STAGES) map.set(s, [])
    for (const l of leads) map.get(l.stage)?.push(l)
    return map
  }, [leads])

  function onDragStart(e: DragStartEvent) {
    setDragId(String(e.active.id))
  }

  async function onDragEnd(e: DragEndEvent) {
    setDragId(null)
    const leadId = String(e.active.id)
    const newStage = e.over?.id as LeadStage | undefined
    if (!newStage || !LEAD_STAGES.includes(newStage)) return
    const lead = leads.find((l) => l.id === leadId)
    if (!lead || lead.stage === newStage) return

    const prev = lead.stage
    setLeads((cur) => cur.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l)))
    const result = await updateLeadStage(leadId, newStage)
    if (!result.ok) {
      setLeads((cur) => cur.map((l) => (l.id === leadId ? { ...l, stage: prev } : l)))
      toast.error(result.error ?? 'Failed to update stage')
    } else {
      toast.success(`Moved to ${LEAD_STAGE_LABELS[newStage]}`)
    }
  }

  const dragLead = dragId ? leads.find((l) => l.id === dragId) : null

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-4 lg:grid-cols-8 md:overflow-visible">
        {LEAD_STAGES.map((stage) => {
          const items = grouped.get(stage) ?? []
          const totalBudget = items.reduce((s, i) => s + (i.budget_max ?? 0), 0)
          return (
            <KanbanColumn
              key={stage}
              stage={stage}
              count={items.length}
              budgetSum={totalBudget}
            >
              {items.map((l) => (
                <KanbanItem key={l.id} lead={l} dragging={dragId === l.id} />
              ))}
            </KanbanColumn>
          )
        })}
      </div>
      <DragOverlay>{dragLead ? <LeadCard lead={dragLead} /> : null}</DragOverlay>
    </DndContext>
  )
}

function KanbanColumn({
  stage,
  count,
  budgetSum,
  children,
}: {
  stage: LeadStage
  count: number
  budgetSum: number
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex w-72 shrink-0 flex-col rounded-lg border bg-[#F4F7FC] p-2 md:w-auto',
        isOver ? 'border-[#CD0E12] bg-[#CD0E12]/5' : 'border-[#E8ECF0]'
      )}
    >
      <div className="px-2 pb-2 pt-1">
        <p className="text-[11px] uppercase tracking-wider text-[#1A1A2E] font-semibold">
          {LEAD_STAGE_LABELS[stage]}
        </p>
        <p className="mt-0.5 text-[11px] text-[#6B6B6B]">
          {count} leads · {formatINR(budgetSum)}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2 min-h-[120px]">{children}</div>
    </div>
  )
}

function KanbanItem({ lead, dragging }: { lead: LeadWithStage; dragging: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: lead.id })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn('touch-none', dragging && 'opacity-40')}
    >
      <LeadCard lead={lead} />
    </div>
  )
}
