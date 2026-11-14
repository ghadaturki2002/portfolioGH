/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // images locales uniquement (public/) ; formats modernes servis automatiquement
    formats: ['image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // vidéos, posters et sous-titres : mis en cache longtemps
        source: '/:dir(videos|media)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig
