import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const isAdminPath = url.pathname.startsWith('/admin');
  const isAuthPage = url.pathname.includes('/admin/login') || url.pathname.includes('/admin/forgot-password');

  if (isAdminPath && !isAuthPage) {
    if (!user) {
      // User is not logged in, redirect to admin login
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    // Check if the user is in the admins table
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (error || !admin) {
      // Logged in user is not an approved admin. Force sign out and redirect.
      await supabase.auth.signOut();
      url.pathname = '/admin/login';
      const response = NextResponse.redirect(url);
      // Clear any session cookies
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      return response;
    }
  }

  // If logged in and on admin login page, redirect to admin dashboard
  if (user && isAuthPage) {
    // Check if they are admin
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();
      
    if (admin) {
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
