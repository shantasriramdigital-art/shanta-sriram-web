import type { SourcePerformanceRow } from '@/types/crm'

// Ranked source list with gold brand bars. Uses the existing v_source_performance
// view (lifetime volume), so it is labelled by volume rather than a time window.
export function SourceBars({ rows }: { rows: SourcePerformanceRow[] }) {
  const ranked = [...rows].sort((a, b) => b.total_leads - a.total_leads).slice(0, 8)
  const max = Math.max(1, ...ranked.map((r) => r.total_leads))

  if (ranked.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[#E8ECF0] bg-[#F8F4EF] p-6 text-center font-sans text-sm text-[#6B6B6B]">
        No source data yet.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {ranked.map((r) => {
        const widthPct = (r.total_leads / max) * 100
        const conv = r.conversion_pct
        return (
          <div key={r.source} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 sm:grid-cols-[140px_1fr_auto]">
            <div className="truncate font-sans text-sm font-medium text-[#1A1A2E]" title={r.source}>
              {r.source}
            </div>
            <div className="relative h-7 rounded bg-[#EFE9E0]">
              <div
                className="absolute inset-y-0 left-0 rounded bg-[#C9A96E]"
                style={{ width: `${Math.max(3, widthPct)}%` }}
              />
              <div className="relative flex h-full items-center px-3 font-sans text-[11px] font-medium text-[#1A1A2E]">
                {r.total_leads} leads
              </div>
            </div>
            <div className="min-w-[64px] text-right font-sans text-xs text-[#6B6B6B]">
              {typeof conv === 'number' ? `${conv.toFixed(0)}% conv` : ''}
            </div>
          </div>
        )
      })}
    </div>
  )
}
