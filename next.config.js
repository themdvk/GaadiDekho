/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
  },
  // Disable static optimization for specific routes
  unstable_runtimeJS: true,
  unstable_JsPreload: true,
  pageExtensions: ['js', 'jsx'],
  // Disable static optimization for /cars/add route
  async headers() {
    return [
      {
        source: '/cars/add',
        headers: [
          {
            key: 'x-middleware-cache',
            value: 'no-cache',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
