import type { CompanyStats, DashboardStats, Job } from '@/types'

export function computeDashboardStats(jobs: Job[]): DashboardStats {
  return {
    total: jobs.length,
    inDesign: jobs.filter((j) => j.design_status === 'devam_ediyor').length,
    inPrint: jobs.filter(
      (j) => j.print_status === 'uretimde' || j.print_status === 'baskida',
    ).length,
    invoiced: jobs.filter((j) => j.invoice_status === 'kesildi').length,
    notInvoiced: jobs.filter((j) => j.invoice_status === 'kesilmedi').length,
  }
}

export function groupJobsByCompany(jobs: Job[]): CompanyStats[] {
  const map = new Map<string, CompanyStats>()

  for (const job of jobs) {
    const company = job.company
    if (!company) continue

    let group = map.get(company.id)
    if (!group) {
      group = {
        company,
        total: 0,
        inDesign: 0,
        inPrint: 0,
        completed: 0,
        notInvoiced: 0,
        jobs: [],
      }
      map.set(company.id, group)
    }

    group.jobs.push(job)
    group.total += 1

    if (job.design_status === 'devam_ediyor') group.inDesign += 1
    if (job.print_status === 'uretimde' || job.print_status === 'baskida') {
      group.inPrint += 1
    }
    if (job.design_status === 'bitti' && job.print_status === 'bitti') {
      group.completed += 1
    }
    if (job.invoice_status === 'kesilmedi') group.notInvoiced += 1
  }

  return Array.from(map.values()).sort((a, b) =>
    a.company.name.localeCompare(b.company.name, 'tr'),
  )
}

export function getDesignerInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?'
}

export function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colors = [
    'bg-orange-500',
    'bg-blue-500',
    'bg-violet-500',
    'bg-emerald-500',
    'bg-rose-500',
    'bg-cyan-500',
  ]
  return colors[Math.abs(hash) % colors.length]
}
