import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return a mock client during build time if environment variables are not set
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: {}, error: null }),
        signOut: async () => ({ error: null }),
        updateUser: async () => ({ data: {}, error: null }),
      },
      from: () => ({
        select: (fields, options) => {
          const chainObj = {
            eq: () => chainObj,
            maybeSingle: async () => ({ data: null, error: null }),
            single: async () => ({ data: null, error: null }),
            order: () => chainObj,
            limit: async () => ({ data: [], error: null }),
          };
          // For head query in stats overview
          if (options && options.count) {
            return Promise.resolve({ count: 0, data: null, error: null });
          }
          return chainObj;
        },
        update: () => ({
          eq: async () => ({ error: null }),
        }),
        delete: () => ({
          eq: async () => ({ error: null }),
        }),
        insert: async () => ({ error: null }),
      }),
    };
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
