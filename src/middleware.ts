import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const path = request.nextUrl.pathname;

  // Enforce 301 canonical host redirect: apex webvibez.com -> www.webvibez.com
  if (host === 'webvibez.com') {
    const canonicalUrl = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      'https://www.webvibez.com'
    );
    return NextResponse.redirect(canonicalUrl, { status: 301 });
  }
  
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
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)',
  ],
};
