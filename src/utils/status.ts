import type { DesignStatus, InvoiceStatus, PrintStatus } from '@/types'

export const DESIGN_STATUS_LABELS: Record<DesignStatus, string> = {
  baslanmadi: 'Başlanmadı',
  devam_ediyor: 'Devam Ediyor',
  bitti: 'Bitti',
}

export const PRINT_STATUS_LABELS: Record<PrintStatus, string> = {
  baslanmadi: 'Başlanmadı',
  uretimde: 'Üretimde',
  baskida: 'Baskıda',
  bitti: 'Bitti',
}

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  kesildi: 'Kesildi',
  kesilmedi: 'Kesilmedi',
}

export const DESIGN_STATUS_STYLES: Record<DesignStatus, string> = {
  baslanmadi: 'bg-slate-100 text-slate-600 border-slate-200',
  devam_ediyor: 'bg-amber-50 text-amber-700 border-amber-200',
  bitti: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export const PRINT_STATUS_STYLES: Record<PrintStatus, string> = {
  baslanmadi: 'bg-slate-100 text-slate-600 border-slate-200',
  uretimde: 'bg-orange-50 text-orange-700 border-orange-200',
  baskida: 'bg-blue-50 text-blue-700 border-blue-200',
  bitti: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export const INVOICE_STATUS_STYLES: Record<InvoiceStatus, string> = {
  kesildi: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  kesilmedi: 'bg-red-50 text-red-600 border-red-200',
}

export const DESIGNER_AVATAR_COLORS = [
  'bg-orange-500',
  'bg-blue-500',
  'bg-violet-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-cyan-500',
] as const
