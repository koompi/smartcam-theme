// next.config.js
const nextConfig = {
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

module.exports = {
  ...nextConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
