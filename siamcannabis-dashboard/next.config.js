/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/partners',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;