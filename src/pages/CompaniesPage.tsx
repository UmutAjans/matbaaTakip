import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, Input } from '@/components/ui/FormControls'
import { LoadingState } from '@/components/ui/LoadingState'
import { useToast } from '@/contexts/toastContext'
import {
  createCompany,
  deleteCompany,
  fetchCompanies,
  updateCompany,
} from '@/services/companyService'
import { fetchJobs } from '@/services/jobService'
import type { Company, CompanyFormData, Job } from '@/types'

interface CompanyRowStats {
  company: Company
  total: number
  inProgress: number
  completed: number
  awaitingInvoice: number
}

export function CompaniesPage() {
  const { showToast } = useToast()
  const [rows, setRows] = useState<CompanyRowStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Company | null>(null)
  const [name, setName] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<Company | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [companies, jobs] = await Promise.all([fetchCompanies(), fetchJobs()])
      setRows(companies.map((company) => buildStats(company, jobs)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Firmalar yüklenemedi.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setName('')
    setFormError('')
    setDrawerOpen(true)
  }

  const openEdit = (company: Company) => {
    setEditing(company)
    setName(company.name)
    setFormError('')
    setDrawerOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setFormError('Firma adı zorunludur.')
      return
    }

    setSaving(true)
    try {
      const form: CompanyFormData = { name: name.trim() }
      if (editing) {
        await updateCompany(editing.id, form)
        showToast('Firma başarıyla güncellendi.')
      } else {
        await createCompany(form)
        showToast('Firma başarıyla eklendi.')
      }
      setDrawerOpen(false)
      await load()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'İşlem başarısız.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setDeleteLoading(true)
    try {
      await deleteCompany(deleting.id)
      showToast('Firma başarıyla silindi.')
      setDeleting(null)
      await load()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Silme başarısız.', 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-text">Firmalar</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Yeni Firma
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Firmalar yükleniyor..." />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
          {error}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title="Henüz firma yok."
          description="İlk firmanızı ekleyerek iş takibine başlayın."
          actionLabel="Yeni Firma"
          onAction={openCreate}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50 text-[11px] font-semibold tracking-wide text-text-muted uppercase">
                  <th className="px-4 py-3">Firma Adı</th>
                  <th className="px-4 py-3">Toplam İş</th>
                  <th className="px-4 py-3">Devam Eden</th>
                  <th className="px-4 py-3">Tamamlanan</th>
                  <th className="px-4 py-3">Fatura Bekleyen</th>
                  <th className="px-4 py-3 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.company.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold text-text">{row.company.name}</td>
                    <td className="px-4 py-3">{row.total}</td>
                    <td className="px-4 py-3">{row.inProgress}</td>
                    <td className="px-4 py-3">{row.completed}</td>
                    <td className="px-4 py-3">{row.awaitingInvoice}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(row.company)}
                          className="rounded-md p-1.5 text-primary hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(row.company)}
                          className="rounded-md p-1.5 text-danger hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold">
                {editing ? 'Firmayı Düzenle' : 'Yeni Firma'}
              </h2>
              <button type="button" onClick={() => setDrawerOpen(false)}>
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={(e) => void handleSave(e)} className="flex flex-1 flex-col">
              <div className="flex-1 px-5 py-4">
                <Field label="Firma Adı" required error={formError}>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn. BAFURYA"
                    autoFocus
                  />
                </Field>
              </div>
              <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDrawerOpen(false)}
                  disabled={saving}
                >
                  Vazgeç
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </aside>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Firmayı Sil"
        message="Bu firmayı silmek istediğinize emin misiniz? Bağlı işler varsa silme işlemi engellenir."
        loading={deleteLoading}
        onCancel={() => setDeleting(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  )
}

function buildStats(company: Company, jobs: Job[]): CompanyRowStats {
  const companyJobs = jobs.filter((j) => j.company_id === company.id)
  return {
    company,
    total: companyJobs.length,
    inProgress: companyJobs.filter(
      (j) =>
        j.design_status === 'devam_ediyor' ||
        j.print_status === 'uretimde' ||
        j.print_status === 'baskida',
    ).length,
    completed: companyJobs.filter(
      (j) => j.design_status === 'bitti' && j.print_status === 'bitti',
    ).length,
    awaitingInvoice: companyJobs.filter((j) => j.invoice_status === 'kesilmedi').length,
  }
}
