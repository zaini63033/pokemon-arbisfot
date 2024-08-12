/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['raw.githubusercontent.com', 'static.tvmaze.com'],
  },
};

export default nextConfig;
