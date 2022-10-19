/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    loader: "default",
    domains: [
      "localhost",
      "images.freeimages.com",
      "img.freepik.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
};

