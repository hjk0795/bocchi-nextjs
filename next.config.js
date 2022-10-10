/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: [
      "images.freeimages.com",
      "img.freepik.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
};

// module.exports = {
//   staticPageGenerationTimeout: 1000,
// };

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // put the rest of config here
});
