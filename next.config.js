const { withSentryConfig } = require("@sentry/nextjs");

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
      'app.kassandra.finance',
      'cdn.paraswap.io',
      'raw.githubusercontent.com',
      'snowtrace.io',
      'coin-images.coingecko.com'
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
            value: 'X-Requested-With, content-type, Authorization'
          }
        ]
      }
    ]
  }
}

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true
  },
);
