export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/cars/:path*/edit',
    '/api/cars/:path*',
  ],
};
