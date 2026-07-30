import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabase } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user is admin
  const { data: agent } = await supabase
    .from('agents')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (agent?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  if (!body || !body.user_id || !body.new_password) {
    return NextResponse.json(
      { error: 'Missing user_id or new_password' },
      { status: 400 }
    )
  }

  if (body.new_password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    )
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json(
      { error: 'Service role key not configured' },
      { status: 500 }
    )
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Update user password
  const { error: updateError } = await admin.auth.admin.updateUserById(
    body.user_id,
    { password: body.new_password }
  )

  if (updateError) {
    console.error('Password update error:', updateError)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, message: 'Password reset successfully' })
}
