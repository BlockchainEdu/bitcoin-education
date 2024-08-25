const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your other configurations go here
  async redirects() {
    return [
      {
        source: '/internship',
        destination: '/internships',
        permanent: true,
      },
    ];
  }
});
