import type { Company, Designer, Job } from '@/types'

const now = new Date().toISOString()

export const mockCompanies: Company[] = [
  { id: 'c1', name: 'BAFURYA', created_at: now, updated_at: now },
  { id: 'c2', name: 'TEKNOMAT', created_at: now, updated_at: now },
  { id: 'c3', name: 'YEŞİL OFİS', created_at: now, updated_at: now },
]

export const mockDesigners: Designer[] = [
  { id: 'd1', name: 'Ayşe', created_at: now, updated_at: now },
  { id: 'd2', name: 'Can', created_at: now, updated_at: now },
  { id: 'd3', name: 'Elif', created_at: now, updated_at: now },
]

export const mockJobs: Job[] = [
  {
    id: 'j1',
    company_id: 'c1',
    product_description: 'KADİFE KALEM',
    quantity: '1.000',
    designer_id: 'd1',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 12500,
    invoice_status: 'kesilmedi',
    note: 'Logolu üretim',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j2',
    company_id: 'c1',
    product_description: 'ROZET',
    quantity: '500 + 500',
    designer_id: 'd2',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 8500,
    invoice_status: 'kesilmedi',
    note: 'Metal rozet',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j3',
    company_id: 'c1',
    product_description: 'DİPLOMAT ZARF',
    quantity: '2.000',
    designer_id: 'd1',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 4200,
    invoice_status: 'kesilmedi',
    note: 'Kabartmalı',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j4',
    company_id: 'c1',
    product_description: 'T BAYRAK',
    quantity: '50',
    designer_id: 'd2',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 9800,
    invoice_status: 'kesilmedi',
    note: 'Masa bayrağı',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j5',
    company_id: 'c1',
    product_description: 'KARTON BARDAK',
    quantity: '3000 X2',
    designer_id: 'd1',
    design_status: 'bitti',
    print_status: 'baskida',
    price: 15600,
    invoice_status: 'kesilmedi',
    note: '2 renk baskı',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j6',
    company_id: 'c1',
    product_description: 'PLASTİK BARDAK VE KPK.',
    quantity: '5.000',
    designer_id: 'd3',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 22000,
    invoice_status: 'kesilmedi',
    note: 'KPK dahil',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j7',
    company_id: 'c1',
    product_description: 'A5 DEFTER - ING.',
    quantity: '250',
    designer_id: 'd2',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 18750,
    invoice_status: 'kesilmedi',
    note: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j8',
    company_id: 'c1',
    product_description: 'ÜRÜN ETİKETİ',
    quantity: '10.000',
    designer_id: 'd1',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 6400,
    invoice_status: 'kesilmedi',
    note: 'Yapışkanlı',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j9',
    company_id: 'c1',
    product_description: 'KARTELA',
    quantity: '100',
    designer_id: 'd3',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 3200,
    invoice_status: 'kesilmedi',
    note: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j10',
    company_id: 'c2',
    product_description: 'KARTVİZİT',
    quantity: '1.000',
    designer_id: 'd1',
    design_status: 'devam_ediyor',
    print_status: 'baslanmadi',
    price: 2500,
    invoice_status: 'kesilmedi',
    note: 'Mat selefon',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j11',
    company_id: 'c2',
    product_description: 'BROŞÜR A4',
    quantity: '500',
    designer_id: 'd2',
    design_status: 'devam_ediyor',
    print_status: 'baslanmadi',
    price: 7800,
    invoice_status: 'kesilmedi',
    note: 'Çift taraflı',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j12',
    company_id: 'c2',
    product_description: 'ROLL UP BANNER',
    quantity: '3',
    designer_id: 'd3',
    design_status: 'bitti',
    print_status: 'uretimde',
    price: 4500,
    invoice_status: 'kesildi',
    note: null,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j13',
    company_id: 'c3',
    product_description: 'ANTETLİ KAĞIT',
    quantity: '2.000',
    designer_id: 'd1',
    design_status: 'devam_ediyor',
    print_status: 'baslanmadi',
    price: 5600,
    invoice_status: 'kesilmedi',
    note: '80gr',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j14',
    company_id: 'c3',
    product_description: 'SERTİFİKA',
    quantity: '100',
    designer_id: 'd2',
    design_status: 'bitti',
    print_status: 'bitti',
    price: 1800,
    invoice_status: 'kesildi',
    note: 'Kabartma damga',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'j15',
    company_id: 'c3',
    product_description: 'KUTU ETİKETİ',
    quantity: '5.000',
    designer_id: 'd3',
    design_status: 'bitti',
    print_status: 'baskida',
    price: 9200,
    invoice_status: 'kesilmedi',
    note: null,
    created_at: now,
    updated_at: now,
  },
]

function withRelations(job: Job): Job {
  return {
    ...job,
    company: mockCompanies.find((c) => c.id === job.company_id),
    designer: mockDesigners.find((d) => d.id === job.designer_id),
  }
}

let companiesStore = [...mockCompanies]
let designersStore = [...mockDesigners]
let jobsStore = [...mockJobs]

export const mockStore = {
  getCompanies: () => [...companiesStore].sort((a, b) => a.name.localeCompare(b.name, 'tr')),
  getDesigners: () => [...designersStore].sort((a, b) => a.name.localeCompare(b.name, 'tr')),
  getJobs: () => jobsStore.map(withRelations),

  createCompany: (name: string): Company => {
    const company: Company = {
      id: crypto.randomUUID(),
      name: name.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    companiesStore = [...companiesStore, company]
    return company
  },

  updateCompany: (id: string, name: string): Company => {
    companiesStore = companiesStore.map((c) =>
      c.id === id
        ? { ...c, name: name.trim(), updated_at: new Date().toISOString() }
        : c,
    )
    const updated = companiesStore.find((c) => c.id === id)
    if (!updated) throw new Error('Firma bulunamadı')
    return updated
  },

  deleteCompany: (id: string): void => {
    const hasJobs = jobsStore.some((j) => j.company_id === id)
    if (hasJobs) throw new Error('Bu firmaya bağlı işler var. Önce işleri silin.')
    companiesStore = companiesStore.filter((c) => c.id !== id)
  },

  createJob: (data: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'company' | 'designer'>): Job => {
    const job: Job = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    jobsStore = [...jobsStore, job]
    return withRelations(job)
  },

  updateJob: (
    id: string,
    data: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'company' | 'designer'>,
  ): Job => {
    jobsStore = jobsStore.map((j) =>
      j.id === id ? { ...j, ...data, updated_at: new Date().toISOString() } : j,
    )
    const updated = jobsStore.find((j) => j.id === id)
    if (!updated) throw new Error('İş bulunamadı')
    return withRelations(updated)
  },

  deleteJob: (id: string): void => {
    jobsStore = jobsStore.filter((j) => j.id !== id)
  },

  createDesigner: (name: string): Designer => {
    const designer: Designer = {
      id: crypto.randomUUID(),
      name: name.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    designersStore = [...designersStore, designer]
    return designer
  },
}
