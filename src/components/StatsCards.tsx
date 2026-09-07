import {
  FileText,
  FileX,
  Pencil,
  Printer,
  Files,
} from 'lucide-react'
import type { DashboardStats } from '@/types'

interface StatsCardsProps {
  stats: DashboardStats
}

const cards = [
  {
    key: 'total' as const,
    title: 'Toplam Kayıt',
    subtitle: 'Tüm kayıtlar',
    icon: Files,
    iconWrap: 'bg-blue-50 text-blue-600',
  },
  {
    key: 'inDesign' as const,
    title: 'Tasarım Aşamasında',
    subtitle: 'Devam eden',
    icon: Pencil,
    iconWrap: 'bg-amber-50 text-amber-600',
  },
  {
    key: 'inPrint' as const,
    title: 'Baskı Aşamasında',
    subtitle: 'Devam eden',
    icon: Printer,
    iconWrap: 'bg-emerald-50 text-emerald-600',
  },
  {
    key: 'invoiced' as const,
    title: 'Fatura Kesilen',
    subtitle: 'Tamamlanan',
    icon: FileText,
    iconWrap: 'bg-violet-50 text-violet-600',
  },
  {
    key: 'notInvoiced' as const,
    title: 'Fatura Kesilmeyen',
    subtitle: 'Bekleyen',
    icon: FileX,
    iconWrap: 'bg-red-50 text-red-600',
  },
]

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-text-muted">{card.title}</div>
              <div className="mt-2 text-3xl font-bold tracking-tight text-text">
                {stats[card.key]}
              </div>
              <div className="mt-1 text-xs text-text-muted">{card.subtitle}</div>
            </div>
            <div className={`rounded-lg p-2.5 ${card.iconWrap}`}>
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
