import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dhgfbdxndsavbdneycnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZ2ZiZHhuZHNhdmJkbmV5Y252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjU2MTcsImV4cCI6MjA5MjU0MTYxN30.NUfILP9HBSeXn51kOWOWPacsDb5JyrJLjF5nrZNin38';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

// Export a flag to let other services know if we are in mock mode
export const isMockMode = false;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

