import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { AuthContext } from '@/contexts/authContext'
import { isMockMode, supabase } from '@/lib/supabase'

const MOCK_USER_KEY = 'matbaa_mock_user'

function createMockUser(email: string): User {
  return {
    id: 'mock-user-id',
    email,
    app_metadata: {},
    user_metadata: { full_name: email.split('@')[0] },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isMockMode) {
      const saved = localStorage.getItem(MOCK_USER_KEY)
      if (saved) {
        setUser(createMockUser(saved))
      }
      setLoading(false)
      return
    }

    let mounted = true

    supabase!.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase!.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setUser(next?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (isMockMode) {
      if (!email.trim() || !password.trim()) {
        throw new Error('E-posta ve şifre zorunludur.')
      }
      // Demo: any non-empty credentials work in mock mode
      localStorage.setItem(MOCK_USER_KEY, email.trim())
      setUser(createMockUser(email.trim()))
      return
    }

    const { data, error } = await supabase!.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
        throw new Error('E-posta veya şifre hatalı.')
      }
      if (msg.includes('email not confirmed')) {
        throw new Error(
          'E-posta henüz onaylanmamış. Supabase → Authentication → Providers → Email içinde "Confirm email" seçeneğini kapatın veya kullanıcıyı onaylayın.',
        )
      }
      if (msg.includes('invalid jwt') || msg.includes('unauthorized')) {
        throw new Error(
          'API anahtarı geçersiz. Supabase → Settings → API Keys içinden anon (eyJ...) anahtarını .env dosyasına yapıştırın.',
        )
      }
      throw new Error(error.message)
    }

    if (!data.session) {
      throw new Error(
        'Oturum oluşturulamadı. Supabase Auth ayarlarında e-posta onayını kapatıp tekrar deneyin.',
      )
    }

    setSession(data.session)
    setUser(data.session.user)
  }, [])

  const signOut = useCallback(async () => {
    if (isMockMode) {
      localStorage.removeItem(MOCK_USER_KEY)
      setUser(null)
      setSession(null)
      return
    }

    const { error } = await supabase!.auth.signOut()
    if (error) throw new Error(error.message)
  }, [])

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isMockAuth: isMockMode,
      signIn,
      signOut,
    }),
    [user, session, loading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
