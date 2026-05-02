'use client'

import { useState, useTransition } from 'react'
import { Check, X, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { updateVisitStatus } from '@/lib/crm/mutations'
import type { VisitStatus } from '@/types/crm'

export function VisitRowActions({ visitId, status }: { visitId: string; status: VisitStatus }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [pending, startTransition] = useTransition()

  function set(s: VisitStatus, fb?: string) {
    startTransition(async () => {
      const result = await updateVisitStatus(visitId, s, fb)
      if (result.ok) toast.success(`Visit ${s.replace('_', ' ')}`)
      else toast.error(result.error ?? 'Failed')
    })
  }

  if (status === 'completed' || status === 'cancelled' || status === 'no_show') {
    return <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">{status.replace('_', ' ')}</span>
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <Button size="sm" variant="ghost" onClick={() => setFeedbackOpen(true)} disabled={pending} title="Mark completed with feedback">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => set('no_show')} disabled={pending} title="No show">
          <X className="h-3.5 w-3.5 text-amber-600" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => set('cancelled')} disabled={pending} title="Cancel">
          <X className="h-3.5 w-3.5 text-[#CD0E12]" />
        </Button>
      </div>
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visit feedback</DialogTitle>
          </DialogHeader>
          <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} placeholder="What happened on the visit?" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setFeedbackOpen(false)}>Cancel</Button>
            <Button
              onClick={() => { set('completed', feedback); setFeedbackOpen(false); setFeedback('') }}
              className="bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> Save and complete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
