export type DesignStatus = 'baslanmadi' | 'devam_ediyor' | 'bitti'
export type PrintStatus = 'baslanmadi' | 'uretimde' | 'baskida' | 'bitti'
export type InvoiceStatus = 'kesildi' | 'kesilmedi'

export interface Company {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Designer {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  company_id: string
  product_description: string
  quantity: string
  designer_id: string
  design_status: DesignStatus
  print_status: PrintStatus
  price: number | null
  invoice_status: InvoiceStatus
  note: string | null
  created_at: string
  updated_at: string
  company?: Company
  designer?: Designer
}

export interface JobFormData {
  company_id: string
  product_description: string
  quantity: string
  designer_id: string
  design_status: DesignStatus
  print_status: PrintStatus
  price: string
  invoice_status: InvoiceStatus
  note: string
}

export interface JobFilters {
  company_id: string
  product_description: string
  designer_id: string
  design_status: string
  print_status: string
  invoice_status: string
}

export interface CompanyStats {
  company: Company
  total: number
  inDesign: number
  inPrint: number
  completed: number
  notInvoiced: number
  jobs: Job[]
}

export interface DashboardStats {
  total: number
  inDesign: number
  inPrint: number
  invoiced: number
  notInvoiced: number
}

export interface CompanyFormData {
  name: string
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
}
