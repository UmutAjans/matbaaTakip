import { useEffect, useState } from 'react'
import { Save, X } from 'lucide-react'
import type { Company, Designer, Job, JobFormData } from '@/types'
import { Field, Input, Select, Textarea } from '@/components/ui/FormControls'
import { Button } from '@/components/ui/Button'
import {
  DESIGN_STATUS_LABELS,
  INVOICE_STATUS_LABELS,
  PRINT_STATUS_LABELS,
} from '@/utils/status'

interface JobDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  job?: Job | null
  companies: Company[]
  designers: Designer[]
  saving?: boolean
  onClose: () => void
  onSubmit: (data: JobFormData) => Promise<void>
}

const initialForm: JobFormData = {
  company_id: '',
  product_description: '',
  quantity: '',
  designer_id: '',
  design_status: 'baslanmadi',
  print_status: 'baslanmadi',
  price: '',
  invoice_status: 'kesilmedi',
  note: '',
}

export function JobDrawer({
  open,
  mode,
  job,
  companies,
  designers,
  saving = false,
  onClose,
  onSubmit,
}: JobDrawerProps) {
  const [form, setForm] = useState<JobFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof JobFormData, string>>>({})

  useEffect(() => {
    if (!open) return

    if (mode === 'edit' && job) {
      setForm({
        company_id: job.company_id,
        product_description: job.product_description,
        quantity: job.quantity,
        designer_id: job.designer_id,
        design_status: job.design_status,
        print_status: job.print_status,
        price: job.price !== null && job.price !== undefined ? String(job.price) : '',
        invoice_status: job.invoice_status,
        note: job.note ?? '',
      })
    } else {
      setForm(initialForm)
    }
    setErrors({})
  }, [open, mode, job])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const set = <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof JobFormData, string>> = {}
    if (!form.company_id) next.company_id = 'Firma seçimi zorunludur.'
    if (!form.product_description.trim()) {
      next.product_description = 'Ürün açıklaması zorunludur.'
    }
    if (!form.quantity.trim()) next.quantity = 'Adet zorunludur.'
    if (!form.designer_id) next.designer_id = 'Tasarımcı seçimi zorunludur.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(form)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Kapat"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-text">
            {mode === 'create' ? 'Yeni İş Kaydı' : 'İş Kaydını Düzenle'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <Field label="Firma" required error={errors.company_id}>
              <Select
                value={form.company_id}
                onChange={(e) => set('company_id', e.target.value)}
              >
                <option value="">Seçiniz</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Ürün Açıklaması" required error={errors.product_description}>
              <Input
                value={form.product_description}
                onChange={(e) => set('product_description', e.target.value)}
                placeholder="Örn. KADİFE KALEM"
              />
            </Field>

            <Field label="Adet" required error={errors.quantity}>
              <Input
                value={form.quantity}
                onChange={(e) => set('quantity', e.target.value)}
                placeholder="Örn. 1000 / 500 + 500 / 3000 X2"
              />
            </Field>

            <Field label="Tasarımcı" required error={errors.designer_id}>
              <Select
                value={form.designer_id}
                onChange={(e) => set('designer_id', e.target.value)}
              >
                <option value="">Seçiniz</option>
                {designers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Tasarım Aşaması">
              <Select
                value={form.design_status}
                onChange={(e) =>
                  set('design_status', e.target.value as JobFormData['design_status'])
                }
              >
                {Object.entries(DESIGN_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Baskı Aşaması">
              <Select
                value={form.print_status}
                onChange={(e) =>
                  set('print_status', e.target.value as JobFormData['print_status'])
                }
              >
                {Object.entries(PRINT_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Fiyat Bilgisi">
              <Input
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="Örn. 55000"
                inputMode="decimal"
              />
            </Field>

            <Field label="Fatura">
              <Select
                value={form.invoice_status}
                onChange={(e) =>
                  set('invoice_status', e.target.value as JobFormData['invoice_status'])
                }
              >
                {Object.entries(INVOICE_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Not">
              <Textarea
                value={form.note}
                onChange={(e) => set('note', e.target.value)}
                placeholder="Örn. Logolu üretim, Metal rozet..."
              />
            </Field>

            <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 text-xs text-blue-700">
              Dosya / logo yükleme bu sürümde yer almıyor. Not alanına özel üretim
              bilgilerini yazabilirsiniz.
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
            <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>
              Vazgeç
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </aside>
    </div>
  )
}
