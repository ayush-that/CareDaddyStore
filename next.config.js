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
    // If you need to make HTTPS requests to servers with self-signed certificates,
    // the proper solution is to add the certificates to your system's trust store
    // or configure the specific certificates in your application
    return config;
  },
};

module.exports = nextConfig;
