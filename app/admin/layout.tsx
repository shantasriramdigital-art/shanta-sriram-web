import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { AdminSidebar } from '@/components/crm/AdminSidebar'
import { AdminTopbar } from '@/components/crm/AdminTopbar'
import { SignOutButton } from '@/components/crm/SignOutButton'
import { getCurrentUser } from '@/lib/crm/queries'
import type { UserRole } from '@/types/crm'

export const metadata: Metadata = {
  title: 'CRM | Shanta Sriram Constructions',
  robots: { index: false, follow: false },
}

// A user is only allowed into the CRM if they carry a known role. A missing or
// unrecognized role (e.g. an auth user with no agents row) is treated as
// unauthorized, not as a permissive default.
const KNOWN_ROLES: UserRole[] = ['admin', 'manager', 'sales', 'viewer']

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F4EF]">
        <Toaster richColors position="top-right" />
        {children}
      </div>
    )
  }

  const provisioned = user.role != null && KNOWN_ROLES.includes(user.role)
  if (!provisioned) {
    return (
      <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center px-4">
        <Toaster richColors position="top-right" />
        <div className="w-full max-w-md rounded-lg border border-[#E8ECF0] bg-white p-8 text-center shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#CD0E12]">Shanta Sriram</p>
          <h1 className="mt-2 font-serif text-xl text-[#1A1A2E]">Account not provisioned</h1>
          <p className="mt-2 text-sm text-[#6B6B6B]">
            You are signed in as {user.email}, but your account has not been granted a CRM role
            yet. Please contact an administrator to get access.
          </p>
          <div className="mt-5 flex justify-center">
            <SignOutButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex">
      <Toaster richColors position="top-right" />
      <AdminSidebar role={user.role} />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminTopbar
          name={user.agent?.full_name ?? null}
          email={user.email}
          role={user.role}
        />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 pb-24 md:pb-8">{children}</main>
      </div>
    </div>
  )
}
