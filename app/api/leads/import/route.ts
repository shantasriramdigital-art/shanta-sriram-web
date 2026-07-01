import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Papa from 'papaparse'
import { createServerSupabase } from '@/utils/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CHUNK_SIZE = 500
// RFC-lite: something@something.tld with no whitespace.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// project_interest is a Postgres enum (project_slug). A value outside this set
// throws 22P02 on insert, and because rows go in as a single multi-row
// statement per chunk, one bad value fails the whole chunk. So we validate the
// project per row up front and reject unknowns as invalid rows.
const VALID_PROJECTS = [
  'bodhivriksha',
  'kalpavriksha',
  'pinnacle',
  'brookwoods',
  'skycity',
  'other',
] as const
type ProjectSlug = (typeof VALID_PROJECTS)[number]
const PROJECT_LOOKUP = new Map<string, ProjectSlug>(VALID_PROJECTS.map((p) => [p, p]))

interface ImportRow {
  name?: string
  phone?: string
  email?: string
  project?: string
}

interface InvalidRow {
  row_number: number
  reason: string
}

interface PreparedLead {
  name: string
  phone: string
  email: string
  project_interest: ProjectSlug
  source: 'csv_import'
  stage: 'new'
}

/**
 * Normalize a phone number.
 * - Strip spaces, dashes, parens (anything non-digit).
 * - Keep a leading + as a country-code marker.
 * - If exactly 10 digits and no country code, prefix +91.
 * - Reject (return null) if fewer than 10 digits remain after cleaning.
 */
function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim()
  const hasPlus = trimmed.startsWith('+')
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 10) return null
  if (hasPlus) return `+${digits}`
  if (digits.length === 10) return `+91${digits}`
  // More than 10 digits with no plus: assume a country code is embedded.
  return `+${digits}`
}

/** Flatten a Supabase/Postgres error into one readable line. */
function pgErr(
  e: { message?: string; details?: string | null; hint?: string | null; code?: string } | null
): string {
  if (!e) return 'Unknown database error'
  return [e.code && `[${e.code}]`, e.message, e.details, e.hint].filter(Boolean).join(' ')
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: agent } = await supabase
      .from('agents')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
    if (agent?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
    }

    const form = await req.formData().catch(() => null)
    const file = form?.get('file')
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No CSV file uploaded' }, { status: 400 })
    }

    const text = await file.text()
    const parsed = Papa.parse<ImportRow>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
    })
    if (parsed.errors.length > 0) {
      // Only fail hard on fatal delimiter errors; per-row issues are handled below.
      const fatal = parsed.errors.find((e) => e.type === 'Delimiter')
      if (fatal) {
        return NextResponse.json({ error: `Could not parse CSV: ${fatal.message}` }, { status: 400 })
      }
    }

    const dataRows = parsed.data ?? []
    const invalid_rows: InvalidRow[] = []
    const prepared: { row_number: number; lead: PreparedLead }[] = []
    let skipped_duplicates = 0

    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // Duplicate detection: match on phone OR email against existing leads, and
    // also against rows already accepted earlier in this same file.
    const { data: existing, error: existingErr } = await admin
      .from('leads')
      .select('phone, email')
    if (existingErr) {
      return NextResponse.json({ error: `Could not read existing leads: ${pgErr(existingErr)}` }, { status: 500 })
    }
    const seenPhones = new Set<string>()
    const seenEmails = new Set<string>()
    for (const r of existing ?? []) {
      if (r.phone) seenPhones.add(r.phone)
      if (r.email) seenEmails.add(String(r.email).toLowerCase())
    }

    dataRows.forEach((row, i) => {
      // File line number: header is line 1, first data row is line 2.
      const row_number = i + 2

      const name = (row.name ?? '').trim()
      const phoneRaw = (row.phone ?? '').trim()
      const emailRaw = (row.email ?? '').trim()
      const projectRaw = (row.project ?? '').trim()

      const missing = [
        !name && 'name',
        !phoneRaw && 'phone',
        !emailRaw && 'email',
        !projectRaw && 'project',
      ].filter(Boolean)
      if (missing.length > 0) {
        invalid_rows.push({ row_number, reason: `Missing required field(s): ${missing.join(', ')}` })
        return
      }

      const phone = normalizePhone(phoneRaw)
      if (!phone) {
        invalid_rows.push({ row_number, reason: 'Phone has fewer than 10 digits after cleaning' })
        return
      }

      const email = emailRaw.toLowerCase()
      if (!EMAIL_RE.test(email)) {
        invalid_rows.push({ row_number, reason: 'Invalid email format' })
        return
      }

      const project = PROJECT_LOOKUP.get(projectRaw.toLowerCase())
      if (!project) {
        invalid_rows.push({
          row_number,
          reason: `Unknown project "${projectRaw}". Must be one of: ${VALID_PROJECTS.join(', ')}`,
        })
        return
      }

      if (seenPhones.has(phone) || seenEmails.has(email)) {
        skipped_duplicates += 1
        return
      }
      seenPhones.add(phone)
      seenEmails.add(email)

      prepared.push({
        row_number,
        lead: {
          name,
          phone,
          email,
          project_interest: project,
          source: 'csv_import',
          stage: 'new',
        },
      })
    })

    // Batch insert in chunks. Imported leads are unassigned by default (there is
    // no assignment trigger). If a chunk insert fails, retry that chunk row by
    // row so valid rows still land and the offending row reports the real
    // Postgres error instead of failing the whole batch silently.
    let inserted = 0
    for (let start = 0; start < prepared.length; start += CHUNK_SIZE) {
      const chunk = prepared.slice(start, start + CHUNK_SIZE)
      const { data: rows, error: chunkErr } = await admin
        .from('leads')
        .insert(chunk.map((c) => c.lead))
        .select('id')

      if (!chunkErr) {
        inserted += rows?.length ?? chunk.length
        continue
      }

      for (const item of chunk) {
        const { error: rowErr } = await admin.from('leads').insert(item.lead).select('id')
        if (rowErr) {
          invalid_rows.push({ row_number: item.row_number, reason: `Insert failed: ${pgErr(rowErr)}` })
        } else {
          inserted += 1
        }
      }
    }

    invalid_rows.sort((a, b) => a.row_number - b.row_number)

    return NextResponse.json({
      inserted,
      skipped_duplicates,
      invalid_rows,
      total_processed: dataRows.length,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Import failed: ${message}` }, { status: 500 })
  }
}
