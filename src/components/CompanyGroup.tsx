import { ChevronDown, List } from 'lucide-react'
import type { CompanyStats, Job } from '@/types'
import { JobTable } from '@/components/JobTable'

interface CompanyGroupProps {
  group: CompanyStats
  expanded: boolean
  onToggle: () => void
  onEdit: (job: Job) => void
  onDelete: (job: Job) => void
}

export function CompanyGroup({
  group,
  expanded,
  onToggle,
  onEdit,
  onDelete,
}: CompanyGroupProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col gap-3 px-4 py-3 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <ChevronDown
            className={`h-5 w-5 text-text-muted transition ${expanded ? '' : '-rotate-90'}`}
          />
          <span className="text-base font-bold text-text">{group.company.name}</span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            {group.total} iş
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pl-8 sm:pl-0">
          <SummaryPill label="Tasarımda" value={group.inDesign} tone="amber" />
          <SummaryPill label="Baskıda" value={group.inPrint} tone="blue" />
          <SummaryPill label="Tamamlanan" value={group.completed} tone="green" />
          <SummaryPill label="Kesilmeyen" value={group.notInvoiced} tone="red" />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border">
          <div className="flex gap-4 border-b border-border px-4">
            <div className="flex items-center gap-1.5 border-b-2 border-primary px-1 py-2.5 text-sm font-medium text-primary">
              <List className="h-4 w-4" />
              Listesi
            </div>
          </div>
          <JobTable jobs={group.jobs} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </div>
  )
}

function SummaryPill({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'amber' | 'blue' | 'green' | 'red'
}) {
  const tones = {
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium ${tones[tone]}`}>
      {label}: {value}
    </span>
  )
}
