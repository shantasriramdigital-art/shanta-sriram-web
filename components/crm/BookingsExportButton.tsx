'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BookingRow {
  booked_at: string
  lead_name: string | null
  project: string
  unit_number: string | null
  unit_type: string | null
  carpet_area: number | null
  total_value: number | null
  booking_amount: number | null
  agent_name: string | null
}

export function BookingsExportButton({ rows }: { rows: BookingRow[] }) {
  function exportCsv() {
    const header = ['Booked At', 'Lead', 'Project', 'Unit', 'Type', 'Carpet (sqft)', 'Total Value', 'Token', 'Agent']
    const lines = [header.join(',')]
    for (const r of rows) {
      const cells = [
        r.booked_at,
        r.lead_name ?? '',
        r.project,
        r.unit_number ?? '',
        r.unit_type ?? '',
        r.carpet_area ?? '',
        r.total_value ?? '',
        r.booking_amount ?? '',
        r.agent_name ?? '',
      ].map((c) => `"${String(c).replace(/"/g, '""')}"`)
      lines.push(cells.join(','))
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" size="sm" onClick={exportCsv}>
      <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
    </Button>
  )
}
