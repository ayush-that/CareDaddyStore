/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["365happyfamily.com", "shopwe.espocloud.eu"],
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
};

module.exports = nextConfig;
