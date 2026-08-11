import { createClient } from '@supabase/supabase-js';

// Service role key bypasses Row Level Security - safe here because this file
// is only ever imported by server-side API routes, never sent to the browser.
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
