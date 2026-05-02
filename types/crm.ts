export type LeadStage =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'visit_scheduled'
  | 'visited'
  | 'negotiation'
  | 'booked'
  | 'lost'

export const LEAD_STAGES: LeadStage[] = [
  'new',
  'contacted',
  'qualified',
  'visit_scheduled',
  'visited',
  'negotiation',
  'booked',
  'lost',
]

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  visit_scheduled: 'Visit Scheduled',
  visited: 'Visited',
  negotiation: 'Negotiation',
  booked: 'Booked',
  lost: 'Lost',
}

export type UserRole = 'admin' | 'sales' | 'viewer'

export type ActivityType =
  | 'call'
  | 'whatsapp'
  | 'email'
  | 'note'
  | 'stage_change'
  | 'visit_scheduled'
  | 'visit_completed'
  | 'booking_created'
  | 'assignment'
  | 'lead_created'

export type VisitStatus = 'scheduled' | 'completed' | 'no_show' | 'cancelled'

export type ProjectSlug =
  | 'bodhivriksha'
  | 'kalpavriksha'
  | 'pinnacle'
  | 'brookwoods'
  | 'skycity'
  | 'other'

export interface Agent {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at?: string
}

export interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  interest: string | null
  message: string | null
  source: string | null
  created_at: string
  updated_at: string | null
  stage: LeadStage
  assigned_to: string | null
  project_interest: ProjectSlug | string | null
  budget_min: number | null
  budget_max: number | null
  next_followup_at: string | null
  last_contacted_at: string | null
  lost_reason: string | null
}

export interface SiteVisit {
  id: string
  lead_id: string
  agent_id: string | null
  project: ProjectSlug | string
  scheduled_at: string
  status: VisitStatus
  feedback: string | null
  created_at?: string
}

export interface Booking {
  id: string
  lead_id: string
  agent_id: string | null
  project: ProjectSlug | string
  unit_number: string | null
  unit_type: string | null
  carpet_area: number | null
  total_value: number | null
  booking_amount: number | null
  booked_at: string
  notes: string | null
  created_at?: string
}

export interface LeadActivity {
  id: string
  lead_id: string
  agent_id: string | null
  activity_type: ActivityType
  content: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface LeadWithRelations extends Lead {
  agent: Agent | null
  activities: (LeadActivity & { agent: Pick<Agent, 'id' | 'full_name'> | null })[]
  visits: SiteVisit[]
  booking: Booking | null
}

export interface FunnelRow {
  stage: LeadStage
  lead_count: number
  pipeline_value: number | null
}

export interface AgentPerformanceRow {
  agent_id: string
  full_name: string
  total_leads: number
  visits_completed: number
  bookings_count: number
  total_revenue: number | null
  conversion_pct: number | null
}

export interface SourcePerformanceRow {
  source: string
  total_leads: number
  bookings_count: number
  conversion_pct: number | null
}
