/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: ["365happyfamily.com", "shopwe.espocloud.eu"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "365happyfamily.com",
      },
      {
        protocol: "https",
        hostname: "shopwe.espocloud.eu",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "shopwe.xyz"],
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    return config;
  },
};

module.exports = nextConfig;
