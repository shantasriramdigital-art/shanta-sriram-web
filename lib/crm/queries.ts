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

export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  const supabase = await createServerSupabase()
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400 * 1000).toISOString()
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 86400 * 1000).toISOString()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    totalRecent,
    totalPrior,
    pipeline,
    bookingsMonth,
    allLeads,
    bookedLeads,
  ] = await Promise.all([
    supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo),
    supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', sixtyDaysAgo)
      .lt('created_at', thirtyDaysAgo),
    supabase
      .from('leads')
      .select('budget_max')
      .not('stage', 'in', '("booked","lost")'),
    supabase
      .from('bookings')
      .select('total_value')
      .gte('booked_at', monthStart),
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('stage', 'booked'),
  ])

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

export async function getRecentActivity(limit = 10) {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('lead_activities')
    .select(
      `id, lead_id, activity_type, content, metadata, created_at,
       lead:leads(id, name),
       agent:agents(id, full_name)`
    )
    .order('created_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

export async function getTodaysFollowups() {
  const supabase = await createServerSupabase()
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const { data } = await supabase
    .from('leads')
    .select(
      `id, name, phone, stage, project_interest, next_followup_at,
       agent:agents!leads_assigned_to_fkey(id, full_name)`
    )
    .gte('next_followup_at', start.toISOString())
    .lte('next_followup_at', end.toISOString())
    .order('next_followup_at', { ascending: true })
  return data ?? []
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
