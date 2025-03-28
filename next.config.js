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
        hostname: 'admin.qwik.skin',
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
};

module.exports = nextConfig;
