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
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  if (!body || !body.email || !body.full_name || !body.role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  if (!['admin', 'sales', 'viewer'].includes(body.role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(body.email, {
    data: { full_name: body.full_name },
  })
  if (inviteError || !invited?.user) {
    return NextResponse.json({ error: inviteError?.message ?? 'Invite failed' }, { status: 400 })
  }

  const { error: agentError } = await admin.from('agents').upsert({
    id: invited.user.id,
    email: body.email,
    full_name: body.full_name,
    phone: body.phone ?? null,
    role: body.role,
    is_active: true,
  })
  if (agentError) {
    return NextResponse.json({ error: agentError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, user_id: invited.user.id })
}
