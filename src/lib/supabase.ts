import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export a flag to let other services know if we are in mock mode
export const isMockMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here';

if (isMockMode) {
  console.warn('Supabase credentials missing or invalid. Running in Mock Mode.');
}

export const supabase = createClient(
  !isMockMode ? supabaseUrl! : 'https://placeholder.supabase.co',
  !isMockMode ? supabaseAnonKey! : 'placeholder'
);
