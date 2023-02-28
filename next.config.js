/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    AIRTABLE_API_TOKEN: process.env.AIRTABLE_API_TOKEN,
  },
}

module.exports = nextConfig