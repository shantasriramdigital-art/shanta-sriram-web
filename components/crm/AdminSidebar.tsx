'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  IndianRupee,
  BarChart3,
  UserCog,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/types/crm'

const navItems = [
  { href: '/admin/crm', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'sales', 'viewer'] as UserRole[] },
  { href: '/admin/crm/leads', label: 'Leads', icon: Users, roles: ['admin', 'sales', 'viewer'] as UserRole[] },
  { href: '/admin/crm/visits', label: 'Visits', icon: CalendarCheck, roles: ['admin', 'sales', 'viewer'] as UserRole[] },
  { href: '/admin/crm/bookings', label: 'Bookings', icon: IndianRupee, roles: ['admin', 'sales', 'viewer'] as UserRole[] },
  { href: '/admin/crm/reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'viewer'] as UserRole[] },
  { href: '/admin/crm/agents', label: 'Team', icon: UserCog, roles: ['admin'] as UserRole[] },
]

export function AdminSidebar({ role }: { role: UserRole | null }) {
  const pathname = usePathname()
  const items = navItems.filter((i) => !role || i.roles.includes(role))

  return (
    <>
      <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:border-[#E8ECF0] md:bg-white">
        <div className="px-6 py-5 border-b border-[#E8ECF0]">
          <Link href="/admin/crm" className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#CD0E12]">SSCPL</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A2E]">CRM</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin/crm' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition',
                  active
                    ? 'bg-[#CD0E12]/8 text-[#CD0E12] font-medium'
                    : 'text-[#4A4A5A] hover:bg-[#F4F7FC] hover:text-[#1A1A2E]'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-[#E8ECF0] bg-white">
        <ul className="flex">
          {items.slice(0, 5).map((item) => {
            const active = pathname === item.href || (item.href !== '/admin/crm' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 py-2 text-[10px]',
                    active ? 'text-[#CD0E12]' : 'text-[#6B6B6B]'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
