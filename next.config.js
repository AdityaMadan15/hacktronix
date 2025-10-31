/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/hacktronix',
  assetPrefix: '/hacktronix/',
}

module.exports = nextConfig