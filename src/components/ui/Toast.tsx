import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react'
import { useToast } from '@/contexts/toastContext'

export function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(100%-2rem,360px)] flex-col gap-2">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : toast.type === 'error' ? (
            <CircleAlert className="h-5 w-5 text-red-600" />
          ) : (
            <Info className="h-5 w-5 text-blue-600" />
          )

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-lg"
          >
            {icon}
            <p className="flex-1 text-sm text-text">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
