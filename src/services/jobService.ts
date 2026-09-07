import { isMockMode, supabase } from '@/lib/supabase'
import { mockStore } from '@/lib/mockData'
import { parsePrice } from '@/utils/price'
import type { Job, JobFilters, JobFormData } from '@/types'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function applyClientFilters(jobs: Job[], filters: JobFilters): Job[] {
  return jobs.filter((job) => {
    if (filters.company_id && job.company_id !== filters.company_id) return false
    if (filters.designer_id && job.designer_id !== filters.designer_id) return false
    if (filters.design_status && job.design_status !== filters.design_status) return false
    if (filters.print_status && job.print_status !== filters.print_status) return false
    if (filters.invoice_status && job.invoice_status !== filters.invoice_status) return false
    if (filters.product_description) {
      const q = filters.product_description.toLocaleLowerCase('tr')
      if (!job.product_description.toLocaleLowerCase('tr').includes(q)) return false
    }
    return true
  })
}

function toJobPayload(form: JobFormData) {
  return {
    company_id: form.company_id,
    product_description: form.product_description.trim(),
    quantity: form.quantity.trim(),
    designer_id: form.designer_id,
    design_status: form.design_status,
    print_status: form.print_status,
    price: parsePrice(form.price),
    invoice_status: form.invoice_status,
    note: form.note.trim() || null,
  }
}

export async function fetchJobs(filters?: JobFilters): Promise<Job[]> {
  if (isMockMode) {
    await delay(250)
    const jobs = mockStore.getJobs()
    return filters ? applyClientFilters(jobs, filters) : jobs
  }

  let query = supabase!
    .from('jobs')
    .select('*, company:companies(*), designer:designers(*)')
    .order('created_at', { ascending: false })

  if (filters?.company_id) query = query.eq('company_id', filters.company_id)
  if (filters?.designer_id) query = query.eq('designer_id', filters.designer_id)
  if (filters?.design_status) query = query.eq('design_status', filters.design_status)
  if (filters?.print_status) query = query.eq('print_status', filters.print_status)
  if (filters?.invoice_status) query = query.eq('invoice_status', filters.invoice_status)
  if (filters?.product_description) {
    query = query.ilike('product_description', `%${filters.product_description}%`)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data as Job[]) ?? []
}

export async function createJob(form: JobFormData): Promise<Job> {
  const payload = toJobPayload(form)

  if (isMockMode) {
    await delay(250)
    return mockStore.createJob(payload)
  }

  const { data, error } = await supabase!
    .from('jobs')
    .insert(payload)
    .select('*, company:companies(*), designer:designers(*)')
    .single()

  if (error) throw new Error(error.message)
  return data as Job
}

export async function updateJob(id: string, form: JobFormData): Promise<Job> {
  const payload = toJobPayload(form)

  if (isMockMode) {
    await delay(250)
    return mockStore.updateJob(id, payload)
  }

  const { data, error } = await supabase!
    .from('jobs')
    .update(payload)
    .eq('id', id)
    .select('*, company:companies(*), designer:designers(*)')
    .single()

  if (error) throw new Error(error.message)
  return data as Job
}

export async function deleteJob(id: string): Promise<void> {
  if (isMockMode) {
    await delay(200)
    mockStore.deleteJob(id)
    return
  }

  const { error } = await supabase!.from('jobs').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export const emptyFilters: JobFilters = {
  company_id: '',
  product_description: '',
  designer_id: '',
  design_status: '',
  print_status: '',
  invoice_status: '',
}
