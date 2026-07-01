'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function LeadsExportButton() {
  const [pending, setPending] = useState(false)

  async function exportCsv() {
    setPending(true)
    try {
      const res = await fetch('/api/leads/export')
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        toast.error(json.error ?? 'Export failed')
        return
      }
      const blob = await res.blob()
      const disposition = res.headers.get('Content-Disposition') ?? ''
      const match = disposition.match(/filename="?([^"]+)"?/)
      const filename = match?.[1] ?? `leads-export-${new Date().toISOString().slice(0, 10)}.csv`
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Export failed')
    } finally {
      setPending(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={exportCsv} disabled={pending}>
      <Download className="h-3.5 w-3.5 mr-1.5" /> {pending ? 'Exporting...' : 'Export CSV'}
    </Button>
  )
}
