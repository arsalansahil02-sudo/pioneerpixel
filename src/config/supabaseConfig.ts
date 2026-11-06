// Supabase Cloud Database Configuration
// Enter your Supabase Project URL and Anon Key below or via .env
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};
