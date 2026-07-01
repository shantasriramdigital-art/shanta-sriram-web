import 'server-only'
import { createServerSupabase } from '@/utils/supabase/server'
import type {
  Agent,
  AgentPerformanceRow,
  Booking,
  FunnelRow,
  Lead,
  LeadActivity,
  LeadStage,
  LeadWithRelations,
  SiteVisit,
  SourcePerformanceRow,
  UserRole,
} from '@/types/crm'

export interface CurrentUser {
  id: string
  email: string
  agent: Agent | null
  role: UserRole | null
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: agent } = await supabase
    .from('agents')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()
  return {
    id: user.id,
    email: user.email ?? '',
    agent: (agent as Agent | null) ?? null,
    role: (agent?.role as UserRole | undefined) ?? null,
  }
}

export interface DashboardKPIs {
  totalLeads: number
  totalLeadsPrior: number
  pipelineValue: number
  bookingsThisMonth: number
  revenueThisMonth: number
  conversionPct: number
}

// When agentId is provided the metrics are scoped to that agent's own leads
// (used for the sales role). Omitting it returns team-wide numbers.
export async function getDashboardKPIs(agentId?: string | null): Promise<DashboardKPIs> {
  const supabase = await createServerSupabase()
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400 * 1000).toISOString()
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 86400 * 1000).toISOString()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  let qRecent = supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo)
  let qPrior = supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', sixtyDaysAgo)
    .lt('created_at', thirtyDaysAgo)
  let qPipeline = supabase
    .from('leads')
    .select('budget_max')
    .not('stage', 'in', '("booked","lost")')
  let qBookings = supabase.from('bookings').select('total_value').gte('booked_at', monthStart)
  let qAll = supabase.from('leads').select('id', { count: 'exact', head: true })
  let qBooked = supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('stage', 'booked')

  if (agentId) {
    qRecent = qRecent.eq('assigned_to', agentId)
    qPrior = qPrior.eq('assigned_to', agentId)
    qPipeline = qPipeline.eq('assigned_to', agentId)
    qBookings = qBookings.eq('agent_id', agentId)
    qAll = qAll.eq('assigned_to', agentId)
    qBooked = qBooked.eq('assigned_to', agentId)
  }

  const [totalRecent, totalPrior, pipeline, bookingsMonth, allLeads, bookedLeads] =
    await Promise.all([qRecent, qPrior, qPipeline, qBookings, qAll, qBooked])

  const pipelineValue = (pipeline.data ?? []).reduce(
    (sum, r) => sum + (r.budget_max ?? 0),
    0
  )
  const revenueThisMonth = (bookingsMonth.data ?? []).reduce(
    (sum, r) => sum + (r.total_value ?? 0),
    0
  )
  const bookingsThisMonth = bookingsMonth.data?.length ?? 0
  const totalLeads = totalRecent.count ?? 0
  const totalLeadsPrior = totalPrior.count ?? 0
  const allCount = allLeads.count ?? 0
  const bookedCount = bookedLeads.count ?? 0
  const conversionPct = allCount > 0 ? (bookedCount / allCount) * 100 : 0

  return {
    totalLeads,
    totalLeadsPrior,
    pipelineValue,
    bookingsThisMonth,
    revenueThisMonth,
    conversionPct,
  }
}

export async function getFunnelSummary(): Promise<FunnelRow[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.from('v_funnel_summary').select('*')
  if (error || !data) return []
  return data as FunnelRow[]
}

// agentId scopes the feed to activity on that agent's own leads (sales role).
export async function getRecentActivity(limit = 10, agentId?: string | null) {
  const supabase = await createServerSupabase()
  let leadIds: string[] | null = null
  if (agentId) {
    const { data: myLeads } = await supabase.from('leads').select('id').eq('assigned_to', agentId)
    leadIds = (myLeads ?? []).map((l) => l.id)
    if (leadIds.length === 0) return []
  }
  let query = supabase
    .from('lead_activities')
    .select(
      `id, lead_id, activity_type, content, metadata, created_at,
       lead:leads(id, name),
       agent:agents(id, full_name)`
    )
    .order('created_at', { ascending: false })
    .limit(limit)
  if (leadIds) query = query.in('lead_id', leadIds)
  const { data } = await query
  return data ?? []
}

export async function getTodaysFollowups(agentId?: string | null) {
  const supabase = await createServerSupabase()
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  let query = supabase
    .from('leads')
    .select(
      `id, name, phone, stage, project_interest, next_followup_at,
       agent:agents!leads_assigned_to_fkey(id, full_name)`
    )
    .gte('next_followup_at', start.toISOString())
    .lte('next_followup_at', end.toISOString())
    .order('next_followup_at', { ascending: true })
  if (agentId) query = query.eq('assigned_to', agentId)
  const { data } = await query
  return data ?? []
}

export interface OverdueFollowupRow {
  id: string
  name: string
  phone: string
  stage: LeadStage
  project_interest: string | null
  next_followup_at: string
  agent: { id: string; full_name: string } | { id: string; full_name: string }[] | null
}

export interface OverdueFollowups {
  rows: OverdueFollowupRow[]
  scheduledCount: number
}

// Leads whose follow-up date is in the past and are still active. Ordered
// oldest-overdue first. scheduledCount reports how many active leads have any
// follow-up date set at all, so the UI can tell "none overdue" apart from
// "no follow-ups scheduled". agentId scopes to a single agent (sales role).
export async function getOverdueFollowups(agentId?: string | null): Promise<OverdueFollowups> {
  const supabase = await createServerSupabase()
  const nowIso = new Date().toISOString()

  let listQuery = supabase
    .from('leads')
    .select(
      `id, name, phone, stage, project_interest, next_followup_at,
       agent:agents!leads_assigned_to_fkey(id, full_name)`
    )
    .not('next_followup_at', 'is', null)
    .lt('next_followup_at', nowIso)
    .not('stage', 'in', '("booked","lost")')
    .order('next_followup_at', { ascending: true })
    .limit(50)

  let scheduledQuery = supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .not('next_followup_at', 'is', null)
    .not('stage', 'in', '("booked","lost")')

  if (agentId) {
    listQuery = listQuery.eq('assigned_to', agentId)
    scheduledQuery = scheduledQuery.eq('assigned_to', agentId)
  }

  const [{ data }, { count }] = await Promise.all([listQuery, scheduledQuery])
  return { rows: (data ?? []) as OverdueFollowupRow[], scheduledCount: count ?? 0 }
}

export interface StaleLeadRow {
  id: string
  name: string
  phone: string
  stage: LeadStage
  created_at: string
  agent: { id: string; full_name: string } | { id: string; full_name: string }[] | null
}

export interface StaleLeads {
  rows: StaleLeadRow[]
  count: number
}

// Active leads older than 7 days that have had no activity logged in the last
// 7 days (untouched). agentId scopes to a single agent (sales role).
export async function getStaleLeads(agentId?: string | null): Promise<StaleLeads> {
  const supabase = await createServerSupabase()
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400 * 1000).toISOString()

  let candidateQuery = supabase
    .from('leads')
    .select(
      `id, name, phone, stage, created_at,
       agent:agents!leads_assigned_to_fkey(id, full_name)`
    )
    .not('stage', 'in', '("booked","lost")')
    .lt('created_at', sevenDaysAgo)
    .order('created_at', { ascending: true })
    .limit(200)
  if (agentId) candidateQuery = candidateQuery.eq('assigned_to', agentId)

  const { data: candidates } = await candidateQuery
  const cand = (candidates ?? []) as StaleLeadRow[]
  if (cand.length === 0) return { rows: [], count: 0 }

  const ids = cand.map((c) => c.id)
  const { data: recent } = await supabase
    .from('lead_activities')
    .select('lead_id')
    .in('lead_id', ids)
    .gte('created_at', sevenDaysAgo)
  const touched = new Set((recent ?? []).map((r) => r.lead_id))

  const stale = cand.filter((c) => !touched.has(c.id))
  return { rows: stale.slice(0, 8), count: stale.length }
}

// True last-30-days lead volume by source, for the dashboard source card only.
// Unlike the all-time v_source_performance view, this is date-bounded, so counts
// reflect the trailing 30 days. Returned in the SourcePerformanceRow shape with
// conversion_pct null (this is a volume breakdown, not a conversion report).
// agentId scopes to a single agent to match the rest of the dashboard, though
// the card is only shown to admin/manager/viewer (never sales).
export async function getSourceBreakdown30d(
  agentId?: string | null
): Promise<SourcePerformanceRow[]> {
  const supabase = await createServerSupabase()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400 * 1000).toISOString()

  let query = supabase.from('leads').select('source').gte('created_at', thirtyDaysAgo)
  if (agentId) query = query.eq('assigned_to', agentId)
  const { data } = await query

  const counts = new Map<string, number>()
  for (const r of data ?? []) {
    const src = r.source ?? 'unknown'
    counts.set(src, (counts.get(src) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([source, total_leads]) => ({
      source,
      total_leads,
      bookings_count: 0,
      conversion_pct: null,
    }))
    .sort((a, b) => b.total_leads - a.total_leads)
}

// Per-agent funnel, computed from the agent's own leads. The shared
// v_funnel_summary view cannot be filtered by agent, so sales uses this.
export async function getFunnelForAgent(agentId: string): Promise<FunnelRow[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('leads').select('stage, budget_max').eq('assigned_to', agentId)
  const map = new Map<LeadStage, FunnelRow>()
  for (const r of data ?? []) {
    const stage = r.stage as LeadStage
    const cur = map.get(stage) ?? { stage, lead_count: 0, pipeline_value: 0 }
    cur.lead_count += 1
    cur.pipeline_value = (cur.pipeline_value ?? 0) + (r.budget_max ?? 0)
    map.set(stage, cur)
  }
  return [...map.values()]
}

export interface LeadFilters {
  stages?: LeadStage[]
  project?: string
  assignedTo?: string
  source?: string
  search?: string
  fromDate?: string
  toDate?: string
  page?: number
  pageSize?: number
}

export async function getLeads(filters: LeadFilters = {}) {
  const supabase = await createServerSupabase()
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 50
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('leads')
    .select(
      `id, name, phone, email, source, stage, project_interest,
       budget_min, budget_max, assigned_to, created_at, updated_at,
       last_contacted_at, next_followup_at,
       agent:agents!leads_assigned_to_fkey(id, full_name)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters.stages?.length) query = query.in('stage', filters.stages)
  if (filters.project) query = query.eq('project_interest', filters.project)
  if (filters.assignedTo === 'unassigned') query = query.is('assigned_to', null)
  else if (filters.assignedTo) query = query.eq('assigned_to', filters.assignedTo)
  if (filters.source) query = query.eq('source', filters.source)
  if (filters.fromDate) query = query.gte('created_at', filters.fromDate)
  if (filters.toDate) query = query.lte('created_at', filters.toDate)
  if (filters.search) {
    const s = filters.search
    query = query.or(`name.ilike.%${s}%,phone.ilike.%${s}%,email.ilike.%${s}%`)
  }

  const { data, count } = await query
  return { rows: data ?? [], total: count ?? 0 }
}

export async function getLeadsForKanban() {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('leads')
    .select(
      `id, name, phone, stage, project_interest, budget_min, budget_max,
       assigned_to, created_at, updated_at,
       agent:agents!leads_assigned_to_fkey(id, full_name)`
    )
    .order('updated_at', { ascending: false })
  return data ?? []
}

export async function getLeadById(id: string): Promise<LeadWithRelations | null> {
  const supabase = await createServerSupabase()
  const { data: lead } = await supabase
    .from('leads')
    .select(
      `*, agent:agents!leads_assigned_to_fkey(id, full_name, email, phone, role, is_active)`
    )
    .eq('id', id)
    .maybeSingle()
  if (!lead) return null

  const [activitiesRes, visitsRes, bookingRes] = await Promise.all([
    supabase
      .from('lead_activities')
      .select(`id, lead_id, agent_id, activity_type, content, metadata, created_at,
               agent:agents(id, full_name)`)
      .eq('lead_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('site_visits')
      .select('*')
      .eq('lead_id', id)
      .order('scheduled_at', { ascending: false }),
    supabase
      .from('bookings')
      .select('*')
      .eq('lead_id', id)
      .maybeSingle(),
  ])

  return {
    ...(lead as Lead),
    agent: (lead.agent as Agent | null) ?? null,
    activities: (activitiesRes.data ?? []) as unknown as LeadWithRelations['activities'],
    visits: (visitsRes.data ?? []) as SiteVisit[],
    booking: (bookingRes.data as Booking | null) ?? null,
  }
}

export async function getAgents(): Promise<Agent[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('agents')
    .select('*')
    .order('full_name', { ascending: true })
  return (data ?? []) as Agent[]
}

export async function getAgentsWithStats() {
  const supabase = await createServerSupabase()
  const [agents, leadsRes, bookingsRes] = await Promise.all([
    supabase.from('agents').select('*').order('full_name'),
    supabase.from('leads').select('assigned_to'),
    supabase.from('bookings').select('agent_id'),
  ])
  const leadCounts = new Map<string, number>()
  for (const r of leadsRes.data ?? []) {
    if (!r.assigned_to) continue
    leadCounts.set(r.assigned_to, (leadCounts.get(r.assigned_to) ?? 0) + 1)
  }
  const bookingCounts = new Map<string, number>()
  for (const r of bookingsRes.data ?? []) {
    if (!r.agent_id) continue
    bookingCounts.set(r.agent_id, (bookingCounts.get(r.agent_id) ?? 0) + 1)
  }
  return ((agents.data ?? []) as Agent[]).map((a) => ({
    ...a,
    leads_count: leadCounts.get(a.id) ?? 0,
    bookings_count: bookingCounts.get(a.id) ?? 0,
  }))
}

export interface VisitFilters {
  status?: 'upcoming' | 'today' | 'completed' | 'all'
  agentId?: string
  project?: string
  fromDate?: string
  toDate?: string
}

export async function getVisits(filters: VisitFilters = {}) {
  const supabase = await createServerSupabase()
  let query = supabase
    .from('site_visits')
    .select(
      `id, lead_id, agent_id, project, scheduled_at, status, feedback, created_at,
       lead:leads(id, name, phone),
       agent:agents(id, full_name)`
    )
    .order('scheduled_at', { ascending: true })

  const now = new Date()
  if (filters.status === 'upcoming') {
    query = query.eq('status', 'scheduled').gte('scheduled_at', now.toISOString())
  } else if (filters.status === 'today') {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    query = query.gte('scheduled_at', start.toISOString()).lte('scheduled_at', end.toISOString())
  } else if (filters.status === 'completed') {
    query = query.eq('status', 'completed')
  }
  if (filters.agentId) query = query.eq('agent_id', filters.agentId)
  if (filters.project) query = query.eq('project', filters.project)
  if (filters.fromDate) query = query.gte('scheduled_at', filters.fromDate)
  if (filters.toDate) query = query.lte('scheduled_at', filters.toDate)

  const { data } = await query
  return data ?? []
}

export async function getBookings() {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('bookings')
    .select(
      `id, lead_id, agent_id, project, unit_number, unit_type, carpet_area,
       total_value, booking_amount, booked_at, notes,
       lead:leads(id, name, phone),
       agent:agents(id, full_name)`
    )
    .order('booked_at', { ascending: false })
  return data ?? []
}

export async function getAgentPerformance(): Promise<AgentPerformanceRow[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('v_agent_performance')
    .select('*')
    .order('total_revenue', { ascending: false, nullsFirst: false })
  return (data ?? []) as AgentPerformanceRow[]
}

export async function getSourcePerformance(): Promise<SourcePerformanceRow[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('v_source_performance')
    .select('*')
    .order('total_leads', { ascending: false })
  return (data ?? []) as SourcePerformanceRow[]
}

export async function getActivityForLead(leadId: string): Promise<LeadActivity[]> {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })
  return (data ?? []) as LeadActivity[]
}
