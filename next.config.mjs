/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'export',

  distDir: 'out',

  images: {
    unoptimized: true,
  },

  // Important for static hosting/subdomain assets
  assetPrefix: './',

  // Disable features incompatible with static export
  experimental: {
    optimizePackageImports: ['lenis'],
  },
};

export default nextConfig;