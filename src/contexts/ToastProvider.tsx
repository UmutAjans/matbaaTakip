import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ToastContext,
  type ToastItem,
  type ToastType,
} from '@/contexts/toastContext'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, message, type }])
      window.setTimeout(() => dismissToast(id), 3200)
    },
    [dismissToast],
  )

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  )

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  )
}
