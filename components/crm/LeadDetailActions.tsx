'use client'

import { useState, useTransition } from 'react'
import { Phone, MessageCircle, StickyNote, CalendarPlus, IndianRupee, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LEAD_STAGES, LEAD_STAGE_LABELS, type LeadStage } from '@/types/crm'
import {
  LogActivityModal,
  ScheduleVisitModal,
  MarkBookedModal,
  MarkLostModal,
} from './LeadActionModals'
import { updateLeadStage, assignLead, updateLead } from '@/lib/crm/mutations'

interface AgentOpt { id: string; full_name: string }

interface Props {
  leadId: string
  currentStage: LeadStage
  currentAgentId: string | null
  defaultProject: string | null
  agents: AgentOpt[]
  canReassign: boolean
  nextFollowupAt: string | null
}

export function LeadDetailActions({
  leadId,
  currentStage,
  currentAgentId,
  defaultProject,
  agents,
  canReassign,
  nextFollowupAt,
}: Props) {
  const [openCall, setOpenCall] = useState(false)
  const [openNote, setOpenNote] = useState(false)
  const [openVisit, setOpenVisit] = useState(false)
  const [openBooked, setOpenBooked] = useState(false)
  const [openLost, setOpenLost] = useState(false)
  const [pending, startTransition] = useTransition()

  function changeStage(stage: LeadStage) {
    if (stage === currentStage) return
    startTransition(async () => {
      const result = await updateLeadStage(leadId, stage)
      if (!result.ok) toast.error(result.error ?? 'Failed')
      else toast.success(`Moved to ${LEAD_STAGE_LABELS[stage]}`)
    })
  }

  function reassign(value: string) {
    const next = value === '__none__' ? null : value
    startTransition(async () => {
      const result = await assignLead(leadId, next)
      if (!result.ok) toast.error(result.error ?? 'Failed')
      else toast.success(next ? 'Reassigned' : 'Unassigned')
    })
  }

  function setFollowup(date: string) {
    startTransition(async () => {
      const result = await updateLead(leadId, { next_followup_at: date ? new Date(date).toISOString() : null })
      if (!result.ok) toast.error(result.error ?? 'Failed')
      else toast.success('Follow-up updated')
    })
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpenCall(true)}>
          <Phone className="h-3.5 w-3.5 mr-1.5" /> Log Call
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOpenNote(true)}>
          <StickyNote className="h-3.5 w-3.5 mr-1.5" /> Add Note
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOpenVisit(true)}>
          <CalendarPlus className="h-3.5 w-3.5 mr-1.5" /> Schedule Visit
        </Button>
        <Button
          size="sm"
          onClick={() => setOpenBooked(true)}
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <IndianRupee className="h-3.5 w-3.5 mr-1.5" /> Mark Booked
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOpenLost(true)} className="text-[#CD0E12]">
          <X className="h-3.5 w-3.5 mr-1.5" /> Mark Lost
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Stage</span>
          <Select value={currentStage} onValueChange={(v) => changeStage(v as LeadStage)} disabled={pending}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {LEAD_STAGES.map((s) => (
                <SelectItem key={s} value={s}>{LEAD_STAGE_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {canReassign && (
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Assigned</span>
            <Select value={currentAgentId ?? '__none__'} onValueChange={reassign} disabled={pending}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Unassigned" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">Unassigned</SelectItem>
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#6B6B6B]">Next follow-up</span>
          <input
            type="datetime-local"
            defaultValue={nextFollowupAt ? new Date(nextFollowupAt).toISOString().slice(0, 16) : ''}
            onChange={(e) => setFollowup(e.target.value)}
            disabled={pending}
            className="rounded border border-[#E8ECF0] px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      <LogActivityModal open={openCall} onClose={() => setOpenCall(false)} leadId={leadId} type="call" />
      <LogActivityModal open={openNote} onClose={() => setOpenNote(false)} leadId={leadId} type="note" />
      <ScheduleVisitModal
        open={openVisit}
        onClose={() => setOpenVisit(false)}
        leadId={leadId}
        agents={agents}
        defaultProject={defaultProject}
      />
      <MarkBookedModal
        open={openBooked}
        onClose={() => setOpenBooked(false)}
        leadId={leadId}
        defaultProject={defaultProject}
      />
      <MarkLostModal open={openLost} onClose={() => setOpenLost(false)} leadId={leadId} />
    </>
  )
}
