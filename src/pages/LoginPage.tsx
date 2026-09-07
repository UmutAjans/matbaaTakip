import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CheckSquare, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/authContext'
import { Field, Input } from '@/components/ui/FormControls'
import { Button } from '@/components/ui/Button'
import { isMockMode } from '@/lib/supabase'

export function LoginPage() {
  const { user, loading, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sidebar">
            <CheckSquare className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text">İş Takip Yönetim Paneli</h1>
          <p className="mt-2 text-sm text-text-muted">
            Devam etmek için hesabınıza giriş yapın
          </p>
        </div>

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-4">
            <Field label="E-posta" required>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                required
              />
            </Field>
            <Field label="Şifre" required>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Field>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" className="mt-6 w-full" disabled={submitting}>
            <LogIn className="h-4 w-4" />
            {submitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>

          {isMockMode && (
            <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
              Demo modu aktif. Herhangi bir e-posta ve şifre ile giriş yapabilirsiniz.
              Supabase bağlamak için <code>.env</code> dosyasını doldurun ve{' '}
              <code>VITE_USE_MOCK=false</code> yapın.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
