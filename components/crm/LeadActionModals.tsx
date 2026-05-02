'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  logActivity,
  scheduleVisit,
  createBooking,
  markLeadLost,
} from '@/lib/crm/mutations'
import type { ActivityType } from '@/types/crm'

interface AgentOpt { id: string; full_name: string }

export function LogActivityModal({
  open,
  onClose,
  leadId,
  type,
}: {
  open: boolean
  onClose: () => void
  leadId: string
  type: Extract<ActivityType, 'call' | 'note' | 'whatsapp' | 'email'>
}) {
  const [content, setContent] = useState('')
  const [pending, startTransition] = useTransition()

  function submit() {
    if (!content.trim()) {
      toast.error('Please add a summary first')
      return
    }
    startTransition(async () => {
      const result = await logActivity(leadId, type, content)
      if (result.ok) {
        toast.success('Activity logged')
        setContent('')
        onClose()
      } else {
        toast.error(result.error ?? 'Failed to save')
      }
    })
  }

  const labels: Record<typeof type, string> = {
    call: 'Log Call',
    note: 'Add Note',
    whatsapp: 'Log WhatsApp',
    email: 'Log Email',
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{labels[type]}</DialogTitle>
          <DialogDescription>What happened on this interaction?</DialogDescription>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Summary..."
          rows={5}
          className="mt-2"
        />
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={pending} className="bg-[#CD0E12] text-white hover:bg-[#a90a0e]">
            {pending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ScheduleVisitModal({
  open,
  onClose,
  leadId,
  agents,
  defaultProject,
}: {
  open: boolean
  onClose: () => void
  leadId: string
  agents: AgentOpt[]
  defaultProject?: string | null
}) {
  const [project, setProject] = useState(defaultProject ?? 'bodhivriksha')
  const [scheduledAt, setScheduledAt] = useState('')
  const [agentId, setAgentId] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [pending, startTransition] = useTransition()

  function submit() {
    if (!scheduledAt) {
      toast.error('Pick a date and time')
      return
    }
    startTransition(async () => {
      const result = await scheduleVisit({
        lead_id: leadId,
        project,
        scheduled_at: new Date(scheduledAt).toISOString(),
        agent_id: agentId || null,
        notes,
      })
      if (result.ok) {
        toast.success('Visit scheduled')
        setNotes('')
        setScheduledAt('')
        onClose()
      } else {
        toast.error(result.error ?? 'Failed to schedule')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Site Visit</DialogTitle>
          <DialogDescription>Book a slot for the customer.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Project</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bodhivriksha">Bodhivriksha</SelectItem>
                <SelectItem value="kalpavriksha">Kalpavriksha</SelectItem>
                <SelectItem value="pinnacle">Pinnacle</SelectItem>
                <SelectItem value="brookwoods">Brookwoods</SelectItem>
                <SelectItem value="skycity">Skycity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date and time</Label>
            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Assign agent (optional)</Label>
            <Select value={agentId} onValueChange={setAgentId}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Use current agent" /></SelectTrigger>
              <SelectContent>
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={pending} className="bg-[#CD0E12] text-white hover:bg-[#a90a0e]">
            {pending ? 'Saving...' : 'Schedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function MarkBookedModal({
  open,
  onClose,
  leadId,
  defaultProject,
}: {
  open: boolean
  onClose: () => void
  leadId: string
  defaultProject?: string | null
}) {
  const [project, setProject] = useState(defaultProject ?? 'bodhivriksha')
  const [unitNumber, setUnitNumber] = useState('')
  const [unitType, setUnitType] = useState('')
  const [carpetArea, setCarpetArea] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const [bookingAmount, setBookingAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [pending, startTransition] = useTransition()

  function submit() {
    startTransition(async () => {
      const result = await createBooking({
        lead_id: leadId,
        project,
        unit_number: unitNumber || undefined,
        unit_type: unitType || undefined,
        carpet_area: carpetArea ? Number(carpetArea) : undefined,
        total_value: totalValue ? Number(totalValue) : undefined,
        booking_amount: bookingAmount ? Number(bookingAmount) : undefined,
        notes: notes || undefined,
      })
      if (result.ok) {
        toast.success('Booking recorded')
        onClose()
      } else {
        toast.error(result.error ?? 'Failed to book')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as Booked</DialogTitle>
          <DialogDescription>Record the booking details for this lead.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Project</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bodhivriksha">Bodhivriksha</SelectItem>
                <SelectItem value="kalpavriksha">Kalpavriksha</SelectItem>
                <SelectItem value="pinnacle">Pinnacle</SelectItem>
                <SelectItem value="brookwoods">Brookwoods</SelectItem>
                <SelectItem value="skycity">Skycity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Unit number</Label>
            <Input value={unitNumber} onChange={(e) => setUnitNumber(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Unit type</Label>
            <Input value={unitType} onChange={(e) => setUnitType(e.target.value)} placeholder="e.g. 3BHK" className="mt-1" />
          </div>
          <div>
            <Label>Carpet area (sq ft)</Label>
            <Input type="number" value={carpetArea} onChange={(e) => setCarpetArea(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Total value (Rs)</Label>
            <Input type="number" value={totalValue} onChange={(e) => setTotalValue(e.target.value)} className="mt-1" />
          </div>
          <div className="col-span-2">
            <Label>Booking amount (Rs)</Label>
            <Input type="number" value={bookingAmount} onChange={(e) => setBookingAmount(e.target.value)} className="mt-1" />
          </div>
          <div className="col-span-2">
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="mt-1" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={pending} className="bg-[#CD0E12] text-white hover:bg-[#a90a0e]">
            {pending ? 'Saving...' : 'Confirm booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function MarkLostModal({
  open,
  onClose,
  leadId,
}: {
  open: boolean
  onClose: () => void
  leadId: string
}) {
  const [reason, setReason] = useState('')
  const [pending, startTransition] = useTransition()

  function submit() {
    if (!reason.trim()) {
      toast.error('Please add a reason')
      return
    }
    startTransition(async () => {
      const result = await markLeadLost(leadId, reason)
      if (result.ok) {
        toast.success('Lead marked as lost')
        setReason('')
        onClose()
      } else {
        toast.error(result.error ?? 'Failed to update')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark Lead as Lost</DialogTitle>
          <DialogDescription>Why is this lead no longer pursuing?</DialogDescription>
        </DialogHeader>
        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={4} placeholder="Reason..." />
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={pending} variant="destructive">
            {pending ? 'Saving...' : 'Mark lost'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
