// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**.localhost:3000",
      },
      {
        protocol: "https",
        hostname: "**.riverbase.org/*",
      },
      {
        protocol: "https",
        hostname: "ipfs.backend.riverbase.org/*",
      },
    ],
  },
};

export default nextConfig;
