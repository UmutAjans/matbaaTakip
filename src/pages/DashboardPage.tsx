import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { StatsCards } from '@/components/StatsCards'
import { FilterBar } from '@/components/FilterBar'
import { CompanyGroup } from '@/components/CompanyGroup'
import { JobDrawer } from '@/components/JobDrawer'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingState } from '@/components/ui/LoadingState'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/contexts/toastContext'
import { fetchCompanies, fetchDesigners } from '@/services/companyService'
import {
  createJob,
  deleteJob,
  emptyFilters,
  fetchJobs,
  updateJob,
} from '@/services/jobService'
import type { Company, Designer, Job, JobFilters, JobFormData } from '@/types'
import { computeDashboardStats, groupJobsByCompany } from '@/utils/stats'

export function DashboardPage() {
  const { showToast } = useToast()
  const [jobs, setJobs] = useState<Job[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [designers, setDesigners] = useState<Designer[]>([])
  const [draftFilters, setDraftFilters] = useState<JobFilters>(emptyFilters)
  const [appliedFilters, setAppliedFilters] = useState<JobFilters>(emptyFilters)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingJob, setDeletingJob] = useState<Job | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const loadData = useCallback(async (filters: JobFilters) => {
    setLoading(true)
    setError(null)
    try {
      const [jobsData, companiesData, designersData] = await Promise.all([
        fetchJobs(filters),
        fetchCompanies(),
        fetchDesigners(),
      ])
      setJobs(jobsData)
      setCompanies(companiesData)
      setDesigners(designersData)

      setExpanded((prev) => {
        const next = { ...prev }
        for (const job of jobsData) {
          if (job.company_id && next[job.company_id] === undefined) {
            next[job.company_id] = true
          }
        }
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Veriler yüklenemedi.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData(appliedFilters)
  }, [appliedFilters, loadData])

  const stats = useMemo(() => computeDashboardStats(jobs), [jobs])
  const groups = useMemo(() => groupJobsByCompany(jobs), [jobs])

  const openCreate = () => {
    setDrawerMode('create')
    setEditingJob(null)
    setDrawerOpen(true)
  }

  const openEdit = (job: Job) => {
    setDrawerMode('edit')
    setEditingJob(job)
    setDrawerOpen(true)
  }

  const handleSubmit = async (form: JobFormData) => {
    setSaving(true)
    try {
      // Ensure company/designer lists stay fresh if new ones are needed later
      if (drawerMode === 'create') {
        await createJob(form)
        showToast('İş başarıyla oluşturuldu.')
      } else if (editingJob) {
        await updateJob(editingJob.id, form)
        showToast('İş başarıyla güncellendi.')
      }
      setDrawerOpen(false)
      await loadData(appliedFilters)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Kayıt başarısız.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingJob) return
    setDeleteLoading(true)
    try {
      await deleteJob(deletingJob.id)
      showToast('İş başarıyla silindi.')
      setDeletingJob(null)
      await loadData(appliedFilters)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Silme başarısız.', 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-text">İş Takip Listesi</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Yeni Kayıt Ekle
        </Button>
      </div>

      <StatsCards stats={stats} />

      <FilterBar
        filters={draftFilters}
        companies={companies}
        designers={designers}
        onChange={setDraftFilters}
        onApply={() => setAppliedFilters(draftFilters)}
        onClear={() => {
          setDraftFilters(emptyFilters)
          setAppliedFilters(emptyFilters)
        }}
      />

      {loading ? (
        <LoadingState message="İş kayıtları yükleniyor..." />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
          {error}
        </div>
      ) : groups.length === 0 ? (
        <EmptyState onAction={openCreate} />
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <CompanyGroup
              key={group.company.id}
              group={group}
              expanded={expanded[group.company.id] ?? true}
              onToggle={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [group.company.id]: !prev[group.company.id],
                }))
              }
              onEdit={openEdit}
              onDelete={setDeletingJob}
            />
          ))}
          <div className="flex items-center justify-between px-1 text-sm text-text-muted">
            <span>Toplam {jobs.length} kayıt gösteriliyor</span>
          </div>
        </div>
      )}

      <JobDrawer
        open={drawerOpen}
        mode={drawerMode}
        job={editingJob}
        companies={companies}
        designers={designers}
        saving={saving}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deletingJob)}
        title="İşi Sil"
        message="Bu işi silmek istediğinize emin misiniz?"
        loading={deleteLoading}
        onCancel={() => setDeletingJob(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  )
}
