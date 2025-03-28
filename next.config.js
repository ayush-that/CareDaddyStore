/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '365happyfamily.com',
      },
      {
        protocol: 'https',
        hostname: 'shopwe.espocloud.eu',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'shopwe.xyz'],
    },
  },
  webpack: (config, { isServer }) => {
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "upgrade-insecure-requests; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:; connect-src 'self' http: https:;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
