import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Papa from 'papaparse'
import { createServerSupabase } from '@/utils/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CHUNK_SIZE = 500
// RFC-lite: something@something.tld with no whitespace.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  project_interest: string
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

export async function POST(req: NextRequest) {
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
  const prepared: PreparedLead[] = []
  let skipped_duplicates = 0

  // Duplicate detection: match on phone OR email against existing leads, and
  // also against rows already accepted earlier in this same file.
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { data: existing, error: existingErr } = await admin
    .from('leads')
    .select('phone, email')
  if (existingErr) {
    return NextResponse.json({ error: existingErr.message }, { status: 500 })
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
    const project = (row.project ?? '').trim()

    const missing = [
      !name && 'name',
      !phoneRaw && 'phone',
      !emailRaw && 'email',
      !project && 'project',
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

    if (seenPhones.has(phone) || seenEmails.has(email)) {
      skipped_duplicates += 1
      return
    }
    seenPhones.add(phone)
    seenEmails.add(email)

    prepared.push({
      name,
      phone,
      email,
      project_interest: project,
      source: 'csv_import',
      stage: 'new',
    })
  })

  // Batch insert in chunks, then force imported leads UNASSIGNED. The
  // round-robin trigger may set assigned_to on insert; we null it right after
  // (least-invasive bypass, no trigger changes). NOTE: the lead-created email
  // webhook still fires per insert, so disable that webhook before large
  // imports.
  let inserted = 0
  for (let start = 0; start < prepared.length; start += CHUNK_SIZE) {
    const chunk = prepared.slice(start, start + CHUNK_SIZE)
    const { data: insertedRows, error: insertErr } = await admin
      .from('leads')
      .insert(chunk)
      .select('id')
    if (insertErr) {
      return NextResponse.json(
        {
          error: `Insert failed after ${inserted} row(s): ${insertErr.message}`,
          inserted,
          skipped_duplicates,
          invalid_rows,
          total_processed: dataRows.length,
        },
        { status: 500 }
      )
    }
    const ids = (insertedRows ?? []).map((r) => r.id)
    if (ids.length > 0) {
      const { error: nullErr } = await admin
        .from('leads')
        .update({ assigned_to: null })
        .in('id', ids)
      if (nullErr) {
        return NextResponse.json(
          { error: `Imported rows could not be set unassigned: ${nullErr.message}` },
          { status: 500 }
        )
      }
    }
    inserted += ids.length
  }

  return NextResponse.json({
    inserted,
    skipped_duplicates,
    invalid_rows,
    total_processed: dataRows.length,
  })
}
