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
    // Allow HTTP connections
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
