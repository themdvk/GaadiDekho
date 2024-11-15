/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
    forceSwcTransforms: true,
  },
  // Optimize for dynamic routes
  reactStrictMode: true,
  swcMinify: false, // Temporarily disabled to resolve deployment issues
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable powered by header for security
  poweredByHeader: false,
  // Configure dynamic routes
  async headers() {
    return [
      {
        source: '/cars/add',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
