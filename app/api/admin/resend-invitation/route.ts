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
  if (!body || !body.agent_id) {
    return NextResponse.json({ error: 'Missing agent_id' }, { status: 400 })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Get agent email
  const { data: agentData, error: fetchError } = await admin
    .from('agents')
    .select('email, full_name')
    .eq('id', body.agent_id)
    .maybeSingle()

  if (fetchError || !agentData) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  // Resend invitation
  const { error: inviteError } = await admin.auth.admin.inviteUserByEmail(agentData.email, {
    data: { full_name: agentData.full_name },
  })

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
