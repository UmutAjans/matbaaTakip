import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/authContext'
import { LoadingState } from '@/components/ui/LoadingState'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <LoadingState message="Oturum kontrol ediliyor..." />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
