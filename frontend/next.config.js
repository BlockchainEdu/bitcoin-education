const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'iq.wiki' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/subscribe", destination: "/blog", permanent: true },
      { source: "/clubs", destination: "/", permanent: true },
      { source: "/impact", destination: "/about", permanent: true },
      { source: "/programs", destination: "/jobs", permanent: true },
      { source: "/professors", destination: "/about", permanent: true },
      { source: "/learn", destination: "/", permanent: true },
      { source: "/retreats", destination: "/coliving", permanent: true },
      { source: "/ericeiraHouse", destination: "/coliving", permanent: true },
      { source: "/ibiza", destination: "/coliving", permanent: true },
      { source: "/get-involved", destination: "/jobs", permanent: true },
      { source: "/opportunities", destination: "/jobs", permanent: true },
      { source: "/join", destination: "/", permanent: true },
      { source: "/alumni", destination: "/team", permanent: true },
      { source: "/deductions", destination: "/donate", permanent: true },
      { source: "/get-funding", destination: "/", permanent: true },
      { source: "/volunteer", destination: "/jobs", permanent: true },
      { source: "/thank-you-donor", destination: "/donate", permanent: true },
      { source: "/thank-you", destination: "/", permanent: true },
    ];
  },
});
