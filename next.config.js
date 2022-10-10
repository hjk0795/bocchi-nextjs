/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['images.freeimages.com', 'img.freepik.com', 'cdn-icons-png.flaticon.com'],
  },
}

module.exports = {
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 1000,
}