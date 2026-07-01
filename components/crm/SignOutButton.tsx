'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { supabase } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const router = useRouter()

  async function signOut() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={signOut} className="text-[#6B6B6B]">
      <LogOut className="h-4 w-4 mr-2" /> Sign out
    </Button>
  )
}
