import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin routes except /admin/login
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const session = request.cookies.get('webvibez_admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // If user is already logged in, don't let them see the login page again
  if (path === '/admin/login') {
    const session = request.cookies.get('webvibez_admin_session');
    if (session && session.value === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
