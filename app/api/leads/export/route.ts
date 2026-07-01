import { NextResponse } from 'next/server'
import Papa from 'papaparse'
import { createServerSupabase } from '@/utils/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Stable export column order. Header names follow the requested spec; the
// values are pulled from the real leads columns (project = project_interest,
// status = stage). There is no soft-delete column, so every row is exported.
const COLUMNS = [
  'id',
  'name',
  'phone',
  'email',
  'project',
  'status',
  'source',
  'assigned_to',
  'created_at',
] as const

export async function GET() {
  const supabase = await createServerSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agent } = await supabase
    .from('agents')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()
  if (agent?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, name, phone, email, project_interest, stage, source, assigned_to, created_at')
    .order('created_at', { ascending: false })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (leads ?? []).map((l) => ({
    id: l.id,
    name: l.name ?? '',
    phone: l.phone ?? '',
    email: l.email ?? '',
    project: l.project_interest ?? '',
    status: l.stage ?? '',
    source: l.source ?? '',
    assigned_to: l.assigned_to ?? '',
    created_at: l.created_at ?? '',
  }))

  // Papa.unparse handles all CSV escaping (quotes, commas, newlines).
  const csv = Papa.unparse({ fields: [...COLUMNS], data: rows })

  const today = new Date().toISOString().slice(0, 10)
  const filename = `leads-export-${today}.csv`

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
