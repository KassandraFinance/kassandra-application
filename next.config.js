module.exports = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'assets.coingecko.com',
      'cdn-images-1.medium.com',
      'tokens.1inch.io',
      'storage.cloud.google.com',
      'storage.googleapis.com',
      'app.kassandra.finance'
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-Requested-With, content-type, Authorization'
          }
        ]
      }
    ]
  }
}
