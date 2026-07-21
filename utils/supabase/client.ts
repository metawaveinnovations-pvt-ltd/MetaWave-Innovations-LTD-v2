import { createBrowserClient } from "@supabase/ssr";

// @ts-ignore
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
// @ts-ignore
const supabaseKey = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
