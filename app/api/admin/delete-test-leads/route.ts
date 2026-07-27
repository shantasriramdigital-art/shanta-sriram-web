import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabase } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
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
    return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const confirm = body?.confirm === true

  if (!confirm) {
    return NextResponse.json({
      error: 'Confirmation required',
      message: 'Pass { confirm: true } to delete test leads',
      status: 400
    })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Get test leads first
  const { data: testLeads, error: selectError } = await admin
    .from('leads')
    .select('id, name, email')
    .or(
      `name.ilike.%test%,` +
      `name.ilike.%demo%,` +
      `email.ilike.%test%,` +
      `email.ilike.%demo%,` +
      `email.ilike.%@example.com,` +
      `email.ilike.%@test.com`
    )

  if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 })
  }

  if (!testLeads || testLeads.length === 0) {
    return NextResponse.json({
      deleted: 0,
      message: 'No test leads found'
    })
  }

  // Delete test leads
  const testLeadIds = testLeads.map(l => l.id)
  const { error: deleteError, count } = await admin
    .from('leads')
    .delete()
    .in('id', testLeadIds)

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 })
  }

  console.log(`Deleted ${count || 0} test leads:`, testLeads.map(l => `${l.name} (${l.email})`))

  return NextResponse.json({
    deleted: count || 0,
    leads: testLeads,
    message: `Successfully deleted ${count || 0} test leads`
  })
}

// GET endpoint to preview test leads
export async function GET(req: NextRequest) {
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
    return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Preview test leads
  const { data: testLeads, error: selectError } = await admin
    .from('leads')
    .select('id, name, email, phone, source, created_at')
    .or(
      `name.ilike.%test%,` +
      `name.ilike.%demo%,` +
      `email.ilike.%test%,` +
      `email.ilike.%demo%,` +
      `email.ilike.%@example.com,` +
      `email.ilike.%@test.com`
    )
    .order('created_at', { ascending: false })

  if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 })
  }

  return NextResponse.json({
    count: testLeads?.length || 0,
    leads: testLeads || [],
    message: `Found ${testLeads?.length || 0} test leads`
  })
}
