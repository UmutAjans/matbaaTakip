import { useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { isMockMode } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'

type ThemeMode = 'light' | 'system'

export function SettingsPage() {
  const { user, isMockAuth } = useAuth()
  const [theme, setTheme] = useState<ThemeMode>(
    () => (localStorage.getItem('matbaa_theme') as ThemeMode) || 'light',
  )

  const saveTheme = (value: ThemeMode) => {
    setTheme(value)
    localStorage.setItem('matbaa_theme', value)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold text-text">Ayarlar</h1>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-text">Profil</h2>
        <p className="mt-1 text-sm text-text-muted">Oturum bilgileriniz</p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <span className="text-text-muted">E-posta</span>
            <span className="font-medium text-text">{user?.email ?? '—'}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-border py-2">
            <span className="text-text-muted">Mod</span>
            <span className="font-medium text-text">
              {isMockAuth ? 'Demo (Mock)' : 'Supabase Auth'}
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-text">Tema</h2>
        <p className="mt-1 text-sm text-text-muted">
          İlk sürümde açık tema varsayılandır.
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            variant={theme === 'light' ? 'primary' : 'secondary'}
            onClick={() => saveTheme('light')}
          >
            Açık
          </Button>
          <Button
            variant={theme === 'system' ? 'primary' : 'secondary'}
            onClick={() => saveTheme('system')}
          >
            Sistem
          </Button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-text">Uygulama Bilgileri</h2>
        <div className="mt-4 space-y-2 text-sm">
          <InfoRow label="Uygulama" value="İş Takip Yönetim Paneli" />
          <InfoRow label="Sürüm" value="1.0.0" />
          <InfoRow label="Veri kaynağı" value={isMockMode ? 'Mock Data' : 'Supabase'} />
          <InfoRow label="Stack" value="React + Vite + Tailwind + Supabase" />
        </div>
      </section>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2 last:border-0">
      <span className="text-text-muted">{label}</span>
      <span className="text-right font-medium text-text">{value}</span>
    </div>
  )
}
