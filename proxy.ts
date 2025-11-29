import { NextResponse, NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  // Always create a mutable response
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (!user && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const redirectUrl = new URL('/admin/login', request.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);

    // IMPORTANT: return the modified cookies in redirects too
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
