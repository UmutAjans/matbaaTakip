import { Filter, RotateCcw, Search } from 'lucide-react'
import type { Company, Designer, JobFilters } from '@/types'
import {
  DESIGN_STATUS_LABELS,
  INVOICE_STATUS_LABELS,
  PRINT_STATUS_LABELS,
} from '@/utils/status'
import { Button } from '@/components/ui/Button'

interface FilterBarProps {
  filters: JobFilters
  companies: Company[]
  designers: Designer[]
  onChange: (filters: JobFilters) => void
  onApply: () => void
  onClear: () => void
}

export function FilterBar({
  filters,
  companies,
  designers,
  onChange,
  onApply,
  onClear,
}: FilterBarProps) {
  const set = (key: keyof JobFilters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-text-muted">Firma</span>
          <select
            value={filters.company_id}
            onChange={(e) => set('company_id', e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tümü</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block xl:col-span-1">
          <span className="mb-1 block text-xs font-medium text-text-muted">
            Ürün Açıklaması
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={filters.product_description}
              onChange={(e) => set('product_description', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onApply()
              }}
              placeholder="Ara..."
              className="w-full rounded-lg border border-border bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-text-muted">Tasarımcı</span>
          <select
            value={filters.designer_id}
            onChange={(e) => set('designer_id', e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tümü</option>
            {designers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-text-muted">
            Tasarım Aşaması
          </span>
          <select
            value={filters.design_status}
            onChange={(e) => set('design_status', e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tümü</option>
            {Object.entries(DESIGN_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-text-muted">
            Baskı Aşaması
          </span>
          <select
            value={filters.print_status}
            onChange={(e) => set('print_status', e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tümü</option>
            {Object.entries(PRINT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-text-muted">Fatura</span>
          <select
            value={filters.invoice_status}
            onChange={(e) => set('invoice_status', e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tümü</option>
            {Object.entries(INVOICE_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button onClick={onApply}>
          <Filter className="h-4 w-4" />
          Filtrele
        </Button>
        <Button variant="secondary" onClick={onClear}>
          <RotateCcw className="h-4 w-4" />
          Temizle
        </Button>
      </div>
    </div>
  )
}
