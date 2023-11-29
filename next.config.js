/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'm.media-amazon.com',
      'lh3.googleusercontent.com',
      'graph.facebook.com',
      'storage.googleapis.com',
    ],
  },
};

module.exports = nextConfig;
