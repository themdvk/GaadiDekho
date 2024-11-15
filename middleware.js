import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Force dynamic rendering for /cars/add route
    if (req.nextUrl.pathname === '/cars/add') {
      const response = NextResponse.next();
      response.headers.set('x-middleware-cache', 'no-store');
      response.headers.set('Cache-Control', 'no-store, max-age=0');
      return response;
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/cars/add',
    '/cars/:path*/edit',
    '/api/cars/:path*',
  ],
};
