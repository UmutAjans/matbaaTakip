import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isMockMode =
  import.meta.env.VITE_USE_MOCK === 'true' ||
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.trim() === '' ||
  supabaseAnonKey.trim() === ''

export const supabase: SupabaseClient | null = isMockMode
  ? null
  : createClient(supabaseUrl!, supabaseAnonKey!)
