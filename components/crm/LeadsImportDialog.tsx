'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ImportSummary {
  inserted: number
  skipped_duplicates: number
  invalid_rows: { row_number: number; reason: string }[]
  total_processed: number
}

export function LeadsImportDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [pending, setPending] = useState(false)
  const [summary, setSummary] = useState<ImportSummary | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function reset() {
    setFile(null)
    setSummary(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function upload() {
    if (!file) {
      toast.error('Please choose a CSV file first')
      return
    }
    setPending(true)
    setSummary(null)
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/leads/import', { method: 'POST', body })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json.error ?? 'Import failed')
        if (typeof json.inserted === 'number') setSummary(json as ImportSummary)
        return
      }
      setSummary(json as ImportSummary)
      toast.success(`Imported ${json.inserted} lead(s)`)
      router.refresh()
    } catch {
      toast.error('Import failed')
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-3.5 w-3.5 mr-1.5" /> Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import leads from CSV</DialogTitle>
          <DialogDescription>
            Imported leads are added as unassigned with source csv_import. Rows that are
            missing required fields or duplicate an existing lead are skipped.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>CSV file</Label>
            <Input
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              className="mt-1"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null)
                setSummary(null)
              }}
            />
          </div>
          <p className="text-xs text-[#6B6B6B]">
            Required columns: name, phone, email, project.{' '}
            <a
              href="/leads-import-template.csv"
              download
              className="font-medium text-[#CD0E12] hover:underline"
            >
              Download template
            </a>
          </p>

          {summary && (
            <div className="rounded-md border border-[#E8ECF0] bg-[#FAFBFC] p-3 text-sm">
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span className="text-[#1A1A2E]">
                  Inserted: <strong>{summary.inserted}</strong>
                </span>
                <span className="text-[#1A1A2E]">
                  Skipped duplicates: <strong>{summary.skipped_duplicates}</strong>
                </span>
                <span className="text-[#1A1A2E]">
                  Invalid: <strong>{summary.invalid_rows.length}</strong>
                </span>
                <span className="text-[#6B6B6B]">
                  Processed: {summary.total_processed}
                </span>
              </div>

              {summary.invalid_rows.length > 0 && (
                <div className="mt-3 max-h-48 overflow-y-auto rounded border border-[#E8ECF0] bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Row</TableHead>
                        <TableHead>Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summary.invalid_rows.map((r) => (
                        <TableRow key={r.row_number}>
                          <TableCell className="font-mono text-xs">{r.row_number}</TableCell>
                          <TableCell className="text-xs text-[#6B6B6B]">{r.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            onClick={upload}
            disabled={pending || !file}
            className="bg-[#CD0E12] text-white hover:bg-[#a90a0e]"
          >
            {pending ? 'Importing...' : 'Upload and import'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
