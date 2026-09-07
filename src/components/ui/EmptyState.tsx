import { ClipboardList } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  title = 'Henüz kayıt bulunmuyor.',
  description = 'İlk iş kaydınızı oluşturarak başlayabilirsiniz.',
  actionLabel = 'Yeni İş Ekle',
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary">
        <ClipboardList className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-text">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-text-muted">{description}</p>}
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
