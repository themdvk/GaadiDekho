/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
  },
  // Disable static optimization for dynamic routes
  staticPageGenerationTimeout: 1000,
  compiler: {
    removeConsole: true,
  },
  // Optimize production build
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
