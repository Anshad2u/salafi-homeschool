import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Role-based default pages
const ROLE_ROUTES: Record<string, string> = {
  admin: '/dashboard',
  teacher: '/today',
  student: '/myday',
};

// Paths that require authentication
const PROTECTED_PREFIXES = ['/dashboard', '/today', '/myday', '/planning', '/reports', '/settings', '/quran', '/skills', '/reading', '/stars'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check both development (HTTP) and production (HTTPS) NextAuth cookies
  const token = request.cookies.get('next-auth.session-token')?.value
    || request.cookies.get('__Secure-next-auth.session-token')?.value;

  // Check if the path is protected
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // If no token and trying to access protected route → redirect to /login
  if (!token && isProtected) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If at root '/' and has a token → decode and redirect to role's page
  if (pathname === '/' && token) {
    try {
      // Simple base64 JWT payload decode (no verification here — that's for API routes)
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(
          Buffer.from(parts[1], 'base64url').toString('utf-8')
        );
        const role = payload.role || payload.user?.role;
        if (role && ROLE_ROUTES[role]) {
          return NextResponse.redirect(new URL(ROLE_ROUTES[role], request.url));
        }
      }
      // Fallback: redirect to login if token is invalid
      return NextResponse.redirect(new URL('/login', request.url));
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If at root '/' and no token → redirect to /login
  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/today', '/myday', '/planning', '/reports', '/settings', '/quran', '/skills', '/reading', '/stars', '/onboarding'],
};
