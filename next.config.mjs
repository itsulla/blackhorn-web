import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/insights/news',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/news/:slug',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/insights/events',
        permanent: true,
      },
      {
        source: '/press',
        destination: '/insights/press',
        permanent: true,
      },
      {
        source: '/press/:slug',
        destination: '/insights/press/:slug',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
