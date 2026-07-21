import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // @ts-ignore
  const url = import.meta.env.VITE_SUPABASE_URL || '';
  // @ts-ignore
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

  return createBrowserClient(url, key)
}

