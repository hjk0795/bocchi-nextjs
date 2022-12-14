/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com"
    ],
  },
  experimental: {
    allowMiddlewareResponseBody: true,
  },
};

