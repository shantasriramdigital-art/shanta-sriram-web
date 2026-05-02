'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@/utils/supabase/server'
import type { ActivityType, LeadStage, VisitStatus } from '@/types/crm'

async function currentAgentId(): Promise<string | null> {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user?.id ?? null
}

export async function updateLeadStage(leadId: string, stage: LeadStage) {
  const supabase = await createServerSupabase()
  const patch: Record<string, unknown> = { stage }
  if (stage === 'visited') patch.last_contacted_at = new Date().toISOString()
  const { error } = await supabase.from('leads').update(patch).eq('id', leadId)
  if (error) return { ok: false as const, error: error.message }
  revalidatePath('/admin/crm')
  revalidatePath('/admin/crm/leads')
  revalidatePath(`/admin/crm/leads/${leadId}`)
  return { ok: true as const }
}

export async function assignLead(leadId: string, agentId: string | null) {
  const supabase = await createServerSupabase()
  const { error } = await supabase
    .from('leads')
    .update({ assigned_to: agentId })
    .eq('id', leadId)
  if (error) return { ok: false as const, error: error.message }
  await logActivity(leadId, 'assignment', agentId ? 'Lead assigned' : 'Lead unassigned')
  revalidatePath('/admin/crm/leads')
  revalidatePath(`/admin/crm/leads/${leadId}`)
  return { ok: true as const }
}

export async function logActivity(
  leadId: string,
  type: ActivityType,
  content?: string | null,
  metadata?: Record<string, unknown> | null
) {
  const supabase = await createServerSupabase()
  const agentId = await currentAgentId()
  const { error } = await supabase.from('lead_activities').insert({
    lead_id: leadId,
    agent_id: agentId,
    activity_type: type,
    content: content ?? null,
    metadata: metadata ?? null,
  })
  if (error) return { ok: false as const, error: error.message }
  if (type === 'call' || type === 'whatsapp' || type === 'email') {
    await supabase
      .from('leads')
      .update({ last_contacted_at: new Date().toISOString() })
      .eq('id', leadId)
  }
  revalidatePath(`/admin/crm/leads/${leadId}`)
  return { ok: true as const }
}

export interface ScheduleVisitInput {
  lead_id: string
  agent_id?: string | null
  project: string
  scheduled_at: string
  notes?: string
}

export async function scheduleVisit(input: ScheduleVisitInput) {
  const supabase = await createServerSupabase()
  const agentId = input.agent_id ?? (await currentAgentId())
  const { data, error } = await supabase
    .from('site_visits')
    .insert({
      lead_id: input.lead_id,
      agent_id: agentId,
      project: input.project,
      scheduled_at: input.scheduled_at,
      status: 'scheduled' satisfies VisitStatus,
    })
    .select()
    .single()
  if (error) return { ok: false as const, error: error.message }
  await supabase.from('leads').update({ stage: 'visit_scheduled' }).eq('id', input.lead_id)
  await logActivity(input.lead_id, 'visit_scheduled', input.notes ?? `Visit scheduled at ${input.project}`, {
    visit_id: data.id,
  })
  revalidatePath('/admin/crm/visits')
  revalidatePath(`/admin/crm/leads/${input.lead_id}`)
  return { ok: true as const, visit: data }
}

export async function updateVisitStatus(
  visitId: string,
  status: VisitStatus,
  feedback?: string
) {
  const supabase = await createServerSupabase()
  const patch: Record<string, unknown> = { status }
  if (feedback) patch.feedback = feedback
  const { data, error } = await supabase
    .from('site_visits')
    .update(patch)
    .eq('id', visitId)
    .select('lead_id')
    .single()
  if (error) return { ok: false as const, error: error.message }
  if (status === 'completed' && data?.lead_id) {
    await supabase.from('leads').update({ stage: 'visited' }).eq('id', data.lead_id)
    await logActivity(data.lead_id, 'visit_completed', feedback ?? 'Visit completed')
  }
  revalidatePath('/admin/crm/visits')
  if (data?.lead_id) revalidatePath(`/admin/crm/leads/${data.lead_id}`)
  return { ok: true as const }
}

export interface CreateBookingInput {
  lead_id: string
  agent_id?: string | null
  project: string
  unit_number?: string
  unit_type?: string
  carpet_area?: number
  total_value?: number
  booking_amount?: number
  notes?: string
}

export async function createBooking(input: CreateBookingInput) {
  const supabase = await createServerSupabase()
  const agentId = input.agent_id ?? (await currentAgentId())
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      lead_id: input.lead_id,
      agent_id: agentId,
      project: input.project,
      unit_number: input.unit_number ?? null,
      unit_type: input.unit_type ?? null,
      carpet_area: input.carpet_area ?? null,
      total_value: input.total_value ?? null,
      booking_amount: input.booking_amount ?? null,
      booked_at: new Date().toISOString(),
      notes: input.notes ?? null,
    })
    .select()
    .single()
  if (error) return { ok: false as const, error: error.message }
  await supabase.from('leads').update({ stage: 'booked' }).eq('id', input.lead_id)
  await logActivity(input.lead_id, 'booking_created', `Unit ${input.unit_number ?? ''} booked`, {
    booking_id: data.id,
  })
  revalidatePath('/admin/crm')
  revalidatePath('/admin/crm/bookings')
  revalidatePath(`/admin/crm/leads/${input.lead_id}`)
  return { ok: true as const, booking: data }
}

export async function markLeadLost(leadId: string, reason: string) {
  const supabase = await createServerSupabase()
  const { error } = await supabase
    .from('leads')
    .update({ stage: 'lost', lost_reason: reason })
    .eq('id', leadId)
  if (error) return { ok: false as const, error: error.message }
  await logActivity(leadId, 'stage_change', `Marked lost: ${reason}`)
  revalidatePath('/admin/crm/leads')
  revalidatePath(`/admin/crm/leads/${leadId}`)
  return { ok: true as const }
}

export interface UpdateLeadPatch {
  project_interest?: string | null
  budget_min?: number | null
  budget_max?: number | null
  next_followup_at?: string | null
  email?: string | null
  interest?: string | null
}

export async function updateLead(leadId: string, patch: UpdateLeadPatch) {
  const supabase = await createServerSupabase()
  const { error } = await supabase.from('leads').update(patch).eq('id', leadId)
  if (error) return { ok: false as const, error: error.message }
  revalidatePath(`/admin/crm/leads/${leadId}`)
  return { ok: true as const }
}
