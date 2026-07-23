import { createBrowserClient } from '@supabase/ssr';

function createDummyClient() {
  const dummyQuery: any = {
    select: () => dummyQuery,
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
    update: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
    delete: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
    upsert: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
    eq: () => dummyQuery,
    neq: () => dummyQuery,
    gt: () => dummyQuery,
    gte: () => dummyQuery,
    lt: () => dummyQuery,
    lte: () => dummyQuery,
    like: () => dummyQuery,
    ilike: () => dummyQuery,
    is: () => dummyQuery,
    in: () => dummyQuery,
    contains: () => dummyQuery,
    order: () => dummyQuery,
    limit: () => dummyQuery,
    range: () => dummyQuery,
    single: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
    maybeSingle: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
    then: (onfulfilled: any) => Promise.resolve({ data: [], error: new Error('Supabase URL or API key is not configured.') }).then(onfulfilled),
  };

  return {
    from: () => dummyQuery,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase URL or API key is not configured.') }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase URL or API key is not configured.') }),
      signOut: () => Promise.resolve({ error: null }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase URL or API key is not configured.') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    }
  } as any;
}

export function createClient() {
  // @ts-ignore
  const url = (import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  // @ts-ignore
  const key = (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

  if (!url || !key || !url.startsWith('http')) {
    return createDummyClient();
  }

  try {
    return createBrowserClient(url, key);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return createDummyClient();
  }
}


