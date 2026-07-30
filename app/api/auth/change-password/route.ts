import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body || !body.current_password || !body.new_password) {
    return NextResponse.json(
      { error: 'Missing current_password or new_password' },
      { status: 400 }
    )
  }

  if (body.new_password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    )
  }

  // Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: body.current_password,
  })

  if (signInError) {
    return NextResponse.json(
      { error: 'Current password is incorrect' },
      { status: 401 }
    )
  }

  // Update to new password
  const { error: updateError } = await supabase.auth.updateUser({
    password: body.new_password,
  })

  if (updateError) {
    console.error('Password update error:', updateError)
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, message: 'Password changed successfully' })
}
