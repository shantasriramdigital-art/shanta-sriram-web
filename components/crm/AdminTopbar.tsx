'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { supabase } from '@/utils/supabase/client'
import { AgentAvatar } from './AgentAvatar'
import { Button } from '@/components/ui/button'
import type { UserRole } from '@/types/crm'

export function AdminTopbar({
  name,
  email,
  role,
}: {
  name: string | null
  email: string
  role: UserRole | null
}) {
  const router = useRouter()
  const display = name ?? email

  async function signOut() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#E8ECF0] bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <span className="font-serif text-lg text-[#1A1A2E]">Shanta Sriram CRM</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm text-[#1A1A2E]">{display}</span>
          {role && (
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#CD0E12]">
              {role}
            </span>
          )}
        </div>
        <AgentAvatar name={display} size="md" />
        <Button variant="ghost" size="sm" onClick={signOut} className="text-[#6B6B6B]">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Sign out</span>
        </Button>
      </div>
    </header>
  )
}
