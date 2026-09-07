import { FileText, Pencil, Trash2 } from 'lucide-react'
import type { Job } from '@/types'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatPrice } from '@/utils/price'
import { formatQuantityDisplay } from '@/utils/quantity'
import { getAvatarColor, getDesignerInitial } from '@/utils/stats'

interface JobTableProps {
  jobs: Job[]
  onEdit: (job: Job) => void
  onDelete: (job: Job) => void
}

export function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[980px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-slate-50 text-[11px] font-semibold tracking-wide text-text-muted uppercase">
            <th className="px-3 py-2.5">Ürün Açıklaması</th>
            <th className="px-3 py-2.5">Adet</th>
            <th className="px-3 py-2.5">Tasarım Aşaması</th>
            <th className="px-3 py-2.5">Tasarımcı</th>
            <th className="px-3 py-2.5">Baskı Aşaması</th>
            <th className="px-3 py-2.5">Fiyat Bilgisi</th>
            <th className="px-3 py-2.5">Fatura</th>
            <th className="px-3 py-2.5">Not</th>
            <th className="px-3 py-2.5 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const designerName = job.designer?.name ?? '—'
            return (
              <tr
                key={job.id}
                className="border-b border-border last:border-0 hover:bg-slate-50/80"
              >
                <td className="px-3 py-2.5 font-semibold text-text">
                  {job.product_description}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-text">
                  {formatQuantityDisplay(job.quantity)}
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge kind="design" value={job.design_status} />
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(designerName)}`}
                    >
                      {getDesignerInitial(designerName)}
                    </span>
                    <span className="text-text">{designerName}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge kind="print" value={job.print_status} />
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap font-medium text-text">
                  {formatPrice(job.price)}
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge kind="invoice" value={job.invoice_status} />
                </td>
                <td className="px-3 py-2.5 max-w-[180px]">
                  {job.note ? (
                    <div className="flex items-center gap-1.5 text-text-muted">
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate" title={job.note}>
                        {job.note}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(job)}
                      className="rounded-md p-1.5 text-primary hover:bg-blue-50"
                      title="Düzenle"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(job)}
                      className="rounded-md p-1.5 text-danger hover:bg-red-50"
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
