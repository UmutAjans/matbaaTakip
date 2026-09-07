import type { DesignStatus, InvoiceStatus, PrintStatus } from '@/types'
import {
  DESIGN_STATUS_LABELS,
  DESIGN_STATUS_STYLES,
  INVOICE_STATUS_LABELS,
  INVOICE_STATUS_STYLES,
  PRINT_STATUS_LABELS,
  PRINT_STATUS_STYLES,
} from '@/utils/status'

type BadgeKind = 'design' | 'print' | 'invoice'

interface StatusBadgeProps {
  kind: BadgeKind
  value: DesignStatus | PrintStatus | InvoiceStatus
}

export function StatusBadge({ kind, value }: StatusBadgeProps) {
  let label = ''
  let styles = ''

  if (kind === 'design') {
    label = DESIGN_STATUS_LABELS[value as DesignStatus]
    styles = DESIGN_STATUS_STYLES[value as DesignStatus]
  } else if (kind === 'print') {
    label = PRINT_STATUS_LABELS[value as PrintStatus]
    styles = PRINT_STATUS_STYLES[value as PrintStatus]
  } else {
    label = INVOICE_STATUS_LABELS[value as InvoiceStatus]
    styles = INVOICE_STATUS_STYLES[value as InvoiceStatus]
  }

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap ${styles}`}
    >
      {label}
    </span>
  )
}
