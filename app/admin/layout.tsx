import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { AdminSidebar } from '@/components/crm/AdminSidebar'
import { AdminTopbar } from '@/components/crm/AdminTopbar'
import { getCurrentUser } from '@/lib/crm/queries'

export const metadata: Metadata = {
  title: 'CRM | Shanta Sriram Constructions',
  robots: { index: false, follow: false },
}

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
