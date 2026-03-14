const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'iq.wiki' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "X-Powered-By", value: "" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com script.crazyegg.com connect.facebook.net www.google-analytics.com js.stripe.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' fonts.gstatic.com",
              "frame-src 'self' www.youtube.com www.youtube-nocookie.com embeds.beehiiv.com js.stripe.com player.vimeo.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co www.googletagmanager.com api.stripe.com https://*.google-analytics.com https://*.google.com https://script.crazyegg.com",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://js.stripe.com",
            ].join("; "),
          },
        ],
      },
      {
        source: "/images/ben-wire-details.pdf",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/subscribe",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/clubs",
        destination: "/",
        permanent: true,
      },
      {
        source: "/impact",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/programs",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/professors",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/learn",
        destination: "/",
        permanent: true,
      },
      {
        source: "/retreats",
        destination: "/coliving",
        permanent: true,
      },
      {
        source: "/ericeiraHouse",
        destination: "/coliving",
        permanent: true,
      },
      {
        source: "/ibiza",
        destination: "/coliving",
        permanent: true,
      },
      {
        source: "/get-involved",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/opportunities",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/join",
        destination: "/",
        permanent: true,
      },
      {
        source: "/alumni",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/deductions",
        destination: "/donate",
        permanent: true,
      },
      {
        source: "/get-funding",
        destination: "/",
        permanent: true,
      },
      {
        source: "/volunteer",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/thank-you-donor",
        destination: "/donate",
        permanent: true,
      },
      {
        source: "/thank-you",
        destination: "/",
        permanent: true,
      },
    ];
  },
});
