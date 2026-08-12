import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Lazily creates (and caches) the Supabase admin client.
 *
 * IMPORTANT: this is intentionally NOT executed at module import time.
 * Throwing during module import crashes the whole route module before
 * Next.js can send any response back, which is why the API was
 * returning an empty body instead of JSON. Throwing here instead means
 * the error happens *inside* the route handler's try/catch, so it can
 * always be turned into a proper JSON response.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) {
    return cachedClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase environment variables are missing. NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in a .env.local file located in the same folder as package.json (the Next.js project root), and the dev server must be restarted after adding them."
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedClient;
}